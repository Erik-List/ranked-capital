"use client";

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { Button } from '@/components/ui/button';
import { BarChart3, Activity, Star } from 'lucide-react';

export function NavBar() {
  const pathname = usePathname();

  const isActive = (path: string) => {
    return pathname === path;
  };

  return (
    <header className="border-b">
      <div className="container mx-auto px-4 py-4 flex justify-between items-center">
        <Link href="/" className="text-2xl font-bold flex items-center gap-2">
          <Star className="h-6 w-6" />
          <span>ranked capital</span>
        </Link>
        <nav className="flex items-center gap-6">
          <Link 
            href="/leaderboard" 
            className={`flex items-center gap-2 ${
              isActive('/leaderboard') 
                ? 'text-foreground font-medium' 
                : 'text-muted-foreground hover:text-foreground transition-colors'
            }`}
          >
            <BarChart3 className="h-4 w-4" />
            <span>Leaderboard</span>
          </Link>
          <Link 
            href="/logs" 
            className={`flex items-center gap-2 ${
              isActive('/logs') 
                ? 'text-foreground font-medium' 
                : 'text-muted-foreground hover:text-foreground transition-colors'
            }`}
          >
            <Activity className="h-4 w-4" />
            <span>Logs</span>
          </Link>
          <Button asChild>
            <Link href="/rate">Rate an Investor</Link>
          </Button>
        </nav>
      </div>
    </header>
  );
}