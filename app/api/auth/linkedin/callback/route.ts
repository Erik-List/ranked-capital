import { NextRequest, NextResponse } from 'next/server';
import { exchangeCodeForToken, getLinkedInProfile } from '@/lib/auth/utils';
import { PrismaClient } from '@prisma/client';

// Initialize Prisma outside of the handler
const prisma = new PrismaClient();

// Simple GET handler
export async function GET(req: NextRequest) {
  const baseUrl = process.env.NEXTAUTH_URL || 'http://localhost:3000';
  
  try {
    // Use the built-in NextRequest URL handling
    const code = req.nextUrl.searchParams.get('code');
    const error = req.nextUrl.searchParams.get('error');

    if (error || !code) {
      console.error('LinkedIn auth error:', error);
      return NextResponse.redirect(`${baseUrl}/rate?error=auth_failed`);
    }

    const { access_token } = await exchangeCodeForToken(code);
    if (!access_token) {
      console.error('Failed to exchange code for token');
      return NextResponse.redirect(`${baseUrl}/rate?error=token_failed`);
    }

    const profile = await getLinkedInProfile(access_token);
    if (!profile) {
      console.error('Failed to fetch LinkedIn profile');
      return NextResponse.redirect(`${baseUrl}/rate?error=profile_failed`);
    }

    const user = await prisma.user.upsert({
      where: { linkedin_url: profile.sub },
      update: { updated_at: new Date() },
      create: {
        linkedin_url: profile.sub,
        created_at: new Date(),
        updated_at: new Date()
      }
    }).finally(() => prisma.$disconnect());

    const response = NextResponse.redirect(`${baseUrl}/rate?success=true`);
    response.cookies.set('user_id', user.id, {
      httpOnly: true,
      secure: process.env.NODE_ENV === 'production',
      sameSite: 'lax',
      maxAge: 30 * 24 * 60 * 60
    });

    return response;
  } catch (error) {
    console.error('Auth error:', error);
    await prisma.$disconnect();
    return NextResponse.redirect(`${baseUrl}/rate?error=server_error`);
  }
} 