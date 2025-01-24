import Link from 'next/link';
import { notFound } from 'next/navigation';
import { Button } from '@/components/ui/button';
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { mockInvestors } from '@/lib/mock-data';
import { Building2, Globe2, Briefcase, TrendingUp, Users, Star } from 'lucide-react';

export function generateStaticParams() {
  return mockInvestors.map((investor) => ({
    slug: investor.slug,
  }));
}

export default function InvestorProfilePage({ params }: { params: { slug: string } }) {
  const investor = mockInvestors.find(v => v.slug === params.slug);

  if (!investor) {
    notFound();
  }

  return (
    <div className="min-h-screen bg-background">
      <div className="container mx-auto px-4 py-8">
        <div className="mb-8">
          <Link href="/leaderboard" className="text-muted-foreground hover:text-foreground">
            ← Back to Leaderboard
          </Link>
        </div>

        <div className="grid gap-6 md:grid-cols-3">
          <div className="md:col-span-2 space-y-6">
            <Card>
              <CardHeader className="flex flex-row items-center gap-4">
                <img
                  src={investor.logo_url}
                  alt={investor.name}
                  className="w-16 h-16 rounded-lg"
                />
                <div className="flex-1">
                  <CardTitle className="text-2xl">{investor.name}</CardTitle>
                  <CardDescription className="flex items-center gap-2">
                    <Building2 className="h-4 w-4" />
                    {investor.hq_location}
                  </CardDescription>
                </div>
                <div className="text-right">
                  <div className="flex items-center gap-2 mb-1">
                    <Star className="h-5 w-5 fill-primary text-primary" />
                    <span className="text-2xl font-bold">4.5</span>
                  </div>
                  <div className="text-sm text-muted-foreground">
                    10 ratings
                  </div>
                </div>
              </CardHeader>
              <CardContent>
                <div className="grid gap-4">
                  <div>
                    <h3 className="font-semibold mb-2">About</h3>
                    <p className="text-muted-foreground">{investor.history}</p>
                    <p className="text-muted-foreground mt-2">{investor.investment_concept}</p>
                  </div>

                  <div>
                    <h3 className="font-semibold mb-2">Investment Focus</h3>
                    <div className="flex flex-wrap gap-2">
                      {investor.investment_focus.map((focus) => (
                        <Badge key={focus} variant="secondary">
                          {focus}
                        </Badge>
                      ))}
                    </div>
                  </div>

                  <div className="grid md:grid-cols-2 gap-4">
                    <div>
                      <h3 className="font-semibold mb-2">Investment Stage</h3>
                      <p className="text-muted-foreground">{investor.investment_stage}</p>
                    </div>
                    <div>
                      <h3 className="font-semibold mb-2">Investment Style</h3>
                      <p className="text-muted-foreground">{investor.investment_style}</p>
                    </div>
                  </div>

                  <div>
                    <h3 className="font-semibold mb-2">Geographic Focus</h3>
                    <div className="flex items-center gap-2">
                      <Globe2 className="h-4 w-4 text-muted-foreground" />
                      <span className="text-muted-foreground">
                        {investor.investment_geo.join(', ')}
                      </span>
                    </div>
                  </div>

                  <div>
                    <h3 className="font-semibold mb-2">Rating Breakdown</h3>
                    <div className="grid grid-cols-2 gap-4">
                      <div>
                        <div className="text-sm text-muted-foreground mb-1">Support</div>
                        <div className="flex items-center gap-2">
                          <Star className="h-4 w-4 fill-primary text-primary" />
                          <span className="font-medium">4.5</span>
                        </div>
                      </div>
                      <div>
                        <div className="text-sm text-muted-foreground mb-1">Expertise</div>
                        <div className="flex items-center gap-2">
                          <Star className="h-4 w-4 fill-primary text-primary" />
                          <span className="font-medium">4.8</span>
                        </div>
                      </div>
                      <div>
                        <div className="text-sm text-muted-foreground mb-1">Network</div>
                        <div className="flex items-center gap-2">
                          <Star className="h-4 w-4 fill-primary text-primary" />
                          <span className="font-medium">4.3</span>
                        </div>
                      </div>
                      <div>
                        <div className="text-sm text-muted-foreground mb-1">Terms</div>
                        <div className="flex items-center gap-2">
                          <Star className="h-4 w-4 fill-primary text-primary" />
                          <span className="font-medium">4.6</span>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle className="text-xl">Notable Investments</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {investor.notable_investments.map((investment: { company: string; note: string }, index: number) => (
                    <div key={index} className="flex items-start gap-4">
                      <TrendingUp className="h-5 w-5 text-muted-foreground mt-1" />
                      <div>
                        <h4 className="font-medium">{investment.company}</h4>
                        <p className="text-sm text-muted-foreground">
                          {investment.note}
                        </p>
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </div>

          <div className="space-y-6">
            <Card>
              <CardHeader>
                <CardTitle>Fund Information</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  <div>
                    <div className="text-sm text-muted-foreground">Assets Under Management</div>
                    <div className="text-2xl font-bold">{investor.aum}</div>
                  </div>
                  <div className="space-y-2">
                    {investor.funds_info.map((fund: { name: string; size: string }, index: number) => (
                      <div key={index} className="flex justify-between items-center">
                        <span className="font-medium">{fund.name}</span>
                        <span className="text-muted-foreground">{fund.size}</span>
                      </div>
                    ))}
                  </div>
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>Key Partners</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {investor.partners.map((partner, index) => (
                    <div key={index} className="flex items-center gap-3">
                      <Users className="h-5 w-5 text-muted-foreground" />
                      <span>{partner}</span>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>

            <Button asChild className="w-full" size="lg">
              <Link href="/rate">Rate this Investor</Link>
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
}