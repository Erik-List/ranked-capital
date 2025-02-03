import Link from 'next/link';
import { Button } from '@/components/ui/button';
import { Search, Shield, Star } from 'lucide-react';
import { formatDistanceToNow } from 'date-fns';
import { createClient } from '@/utils/supabase/server';
import { cookies } from 'next/headers';
import { Log } from '@/types/supabase';

async function getLatestActivity(): Promise<Log | null> {
  const cookieStore = cookies();
  const supabase = createClient(cookieStore);
  
  const { data, error } = await supabase
    .from('Log')
    .select(`
      *,
      rating:Rating (
        created_at,
        stage_of_company,
        position_of_founder
      )
    `)
    .eq('status', 'approved')
    .order('timestamp', { ascending: false })
    .limit(1)
    .single();

  if (error) {
    console.error('Error fetching latest activity:', error);
    return null;
  }

  return {
    ...data,
    stage_of_company: data.rating.stage_of_company,
    position_of_founder: data.rating.position_of_founder,
    rating_created_at: data.rating.created_at
  };
}

export default async function Home() {
  const latestActivity = await getLatestActivity();

  return (
    <div className="min-h-screen bg-background">
      <main>
        <section className="py-20 px-4">
          <div className="container mx-auto text-center">
            <h1 className="text-5xl font-bold mb-6">
              Transparent Investor Rankings
            </h1>
            <p className="text-xl text-muted-foreground mb-8 max-w-2xl mx-auto">
              Help fellow founders make better decisions by rating investors on your cap table.
              Your feedback shapes the future of venture capital.
            </p>
            <div className="flex justify-center gap-4">
              <Button asChild size="lg">
                <Link href="/rate">Rate Your Investors</Link>
              </Button>
              <Button asChild size="lg" variant="outline">
                <Link href="/leaderboard">View Rankings</Link>
              </Button>
            </div>
          </div>
        </section>

        <section className="py-20 bg-muted">
          <div className="container mx-auto px-4">
            <div className="grid md:grid-cols-3 gap-8">
              <div className="text-center">
                <div className="mb-4 flex justify-center">
                  <Star className="h-12 w-12 text-primary" />
                </div>
                <h3 className="text-xl font-semibold mb-2">Merit-Based Rankings</h3>
                <p className="text-muted-foreground">
                  Transparent rankings based on real founder experiences
                </p>
              </div>
              <div className="text-center">
                <div className="mb-4 flex justify-center">
                  <Search className="h-12 w-12 text-primary" />
                </div>
                <h3 className="text-xl font-semibold mb-2">Insightful Data</h3>
                <p className="text-muted-foreground">
                  Make informed decisions with comprehensive investor profiles
                </p>
              </div>
              <div className="text-center">
                <div className="mb-4 flex justify-center">
                  <Shield className="h-12 w-12 text-primary" />
                </div>
                <h3 className="text-xl font-semibold mb-2">Verified Reviews</h3>
                <p className="text-muted-foreground">
                  LinkedIn-verified founder ratings you can trust
                </p>
              </div>
            </div>
          </div>
        </section>

        <section className="py-20">
          <div className="container mx-auto px-4">
            <h2 className="text-3xl font-bold text-center mb-12">Latest Activity</h2>
            <div className="max-w-2xl mx-auto">
              <div className="space-y-4">
                {latestActivity ? (
                  <div className="p-4 rounded-lg border">
                    <div className="flex items-center justify-between">
                      <div>
                        <p className="text-sm text-muted-foreground">
                          {latestActivity.stage_of_company} Stage • {latestActivity.position_of_founder}
                        </p>
                        <p className="font-medium">New rating submitted</p>
                      </div>
                      <span className="text-sm text-muted-foreground">
                        {formatDistanceToNow(new Date(latestActivity.timestamp), { addSuffix: true })}
                      </span>
                    </div>
                  </div>
                ) : (
                  <div className="text-center text-muted-foreground">
                    No activity to show yet
                  </div>
                )}
              </div>
            </div>
          </div>
        </section>
      </main>

      <footer className="border-t py-8">
        <div className="container mx-auto px-4">
          <div className="text-center text-sm text-muted-foreground">
            © 2025 ranked capital. All rights reserved.
          </div>
        </div>
      </footer>
    </div>
  );
}