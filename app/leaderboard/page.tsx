"use client";

import { useState } from 'react';
import Link from 'next/link';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/table';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import { mockVCs } from '@/lib/mock-data';
import { Search, ArrowUpDown, TrendingUp, TrendingDown, Star } from 'lucide-react';

export default function LeaderboardPage() {
  const [searchQuery, setSearchQuery] = useState('');
  const [aiQuery, setAiQuery] = useState('');
  const [stage, setStage] = useState('all');
  const [geography, setGeography] = useState('all');

  const filteredInvestors = mockVCs
    .filter(investor => {
      if (stage !== 'all' && !investor.investmentStage.toLowerCase().includes(stage)) {
        return false;
      }
      if (geography !== 'all' && !investor.investmentGeo.some(geo => 
        geo.toLowerCase().includes(geography.toLowerCase())
      )) {
        return false;
      }
      if (searchQuery) {
        const query = searchQuery.toLowerCase();
        return (
          investor.name.toLowerCase().includes(query) ||
          investor.hqLocation.toLowerCase().includes(query) ||
          investor.investmentFocus.some(focus => focus.toLowerCase().includes(query))
        );
      }
      return true;
    })
    .sort((a, b) => b.rating.overall - a.rating.overall);

  return (
    <div className="min-h-screen bg-background">
      <div className="container mx-auto px-4 py-8">
        <h1 className="text-4xl font-bold mb-8">Investor Leaderboard</h1>
        
        <div className="grid gap-6 mb-8">
          <div className="flex flex-col md:flex-row gap-4">
            <div className="flex-1">
              <div className="relative">
                <Search className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" />
                <Input
                  placeholder="Search investors..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="pl-9"
                />
              </div>
            </div>
            <div className="flex-1">
              <div className="relative">
                <Search className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" />
                <Input
                  placeholder="AI Search (e.g., 'Best Series A investor in Europe')"
                  value={aiQuery}
                  onChange={(e) => setAiQuery(e.target.value)}
                  className="pl-9"
                />
              </div>
            </div>
          </div>

          <div className="flex flex-wrap gap-4">
            <Select value={stage} onValueChange={setStage}>
              <SelectTrigger className="w-[180px]">
                <SelectValue placeholder="Investment Stage" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">All Stages</SelectItem>
                <SelectItem value="seed">Seed</SelectItem>
                <SelectItem value="series a">Series A</SelectItem>
                <SelectItem value="series b">Series B</SelectItem>
                <SelectItem value="growth">Growth</SelectItem>
              </SelectContent>
            </Select>

            <Select value={geography} onValueChange={setGeography}>
              <SelectTrigger className="w-[180px]">
                <SelectValue placeholder="Geography" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">All Regions</SelectItem>
                <SelectItem value="north america">North America</SelectItem>
                <SelectItem value="europe">Europe</SelectItem>
                <SelectItem value="asia">Asia</SelectItem>
              </SelectContent>
            </Select>
          </div>
        </div>

        <div className="rounded-lg border bg-card">
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead className="w-[80px]">Rank</TableHead>
                <TableHead>Name</TableHead>
                <TableHead>Rating</TableHead>
                <TableHead>Location</TableHead>
                <TableHead>Stage</TableHead>
                <TableHead>Last Investment</TableHead>
                <TableHead>Style</TableHead>
                <TableHead className="text-right">AUM</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {filteredInvestors.map((investor, index) => (
                <TableRow key={investor.id}>
                  <TableCell className="font-medium">
                    <div className="flex items-center gap-2">
                      {index + 1}
                      {Math.random() > 0.5 ? (
                        <TrendingUp className="h-4 w-4 text-green-500" />
                      ) : (
                        <TrendingDown className="h-4 w-4 text-red-500" />
                      )}
                    </div>
                  </TableCell>
                  <TableCell>
                    <Link 
                      href={`/investor/${investor.slug}`}
                      className="flex items-center gap-3 hover:text-primary"
                    >
                      <img
                        src={investor.logoUrl}
                        alt={investor.name}
                        className="w-8 h-8 rounded-full"
                      />
                      <span className="font-medium">{investor.name}</span>
                    </Link>
                  </TableCell>
                  <TableCell>
                    <div className="flex items-center gap-2">
                      <Star className="h-4 w-4 fill-primary text-primary" />
                      <span className="font-medium">{investor.rating.overall.toFixed(1)}</span>
                      <span className="text-sm text-muted-foreground">
                        ({investor.rating.totalRatings})
                      </span>
                    </div>
                  </TableCell>
                  <TableCell>{investor.hqLocation}</TableCell>
                  <TableCell>{investor.investmentStage}</TableCell>
                  <TableCell>
                    <div className="text-sm">
                      <div>{investor.lastInvestment.company}</div>
                      <div className="text-muted-foreground">
                        {investor.lastInvestment.stage} • {investor.lastInvestment.amount}
                      </div>
                    </div>
                  </TableCell>
                  <TableCell>{investor.investmentStyle}</TableCell>
                  <TableCell className="text-right">{investor.aum}</TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </div>
      </div>
    </div>
  );
}