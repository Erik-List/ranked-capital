import { NextResponse } from 'next/server';
import { generateState } from '@/lib/auth/utils';

export async function GET() {
  const state = generateState();
  
  const linkedInAuthUrl = new URL('https://www.linkedin.com/oauth/v2/authorization');
  linkedInAuthUrl.searchParams.append('response_type', 'code');
  linkedInAuthUrl.searchParams.append('client_id', process.env.LINKEDIN_CLIENT_ID!);
  linkedInAuthUrl.searchParams.append('redirect_uri', process.env.LINKEDIN_REDIRECT_URI!);
  linkedInAuthUrl.searchParams.append('state', state);
  linkedInAuthUrl.searchParams.append('scope', 'openid profile');

  console.log('Auth URL:', linkedInAuthUrl.toString());  // Debug log
  console.log('Redirect URI:', process.env.LINKEDIN_REDIRECT_URI);  // Debug log

  return NextResponse.json({ 
    url: linkedInAuthUrl.toString(),
    state 
  });
} 