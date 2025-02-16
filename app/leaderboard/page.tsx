import { createClient } from '@/utils/supabase/server';
import { cookies } from 'next/headers';
import type { Database } from '@/types/supabase';
import { LeaderboardTable } from '@/components/leaderboard/leaderboard-table';

type Investor = Database['public']['Tables']['Investor']['Row'];

async function getInitialInvestors(): Promise<Investor[]> {
  const cookieStore = cookies();
  const supabase = createClient(cookieStore);
  
  const { data, error } = await supabase
    .from('Investor')
    .select()
    .eq('status', 'APPROVED')
    .order('created_at', { ascending: false })
    .limit(50);

  if (error) {
    console.error('Error fetching investors:', error);
    return [];
  }

  return data || [];
}

export default async function LeaderboardPage() {
  const initialInvestors = await getInitialInvestors();

  return (
    <div className="container mx-auto py-8 px-4">
      <h1 className="text-4xl font-bold mb-8">Investor Rankings</h1>
      <LeaderboardTable initialInvestors={initialInvestors} />
    </div>
  );
}