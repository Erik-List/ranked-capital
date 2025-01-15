"use client";

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from '@/components/ui/card';
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from '@/components/ui/form';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import { Textarea } from '@/components/ui/textarea';
import { Slider } from '@/components/ui/slider';
import { mockVCs } from '@/lib/mock-data';
import { zodResolver } from '@hookform/resolvers/zod';
import { useForm } from 'react-hook-form';
import * as z from 'zod';
import { Linkedin, Search } from 'lucide-react';

// Define the Investor type based on mockVCs structure
type Investor = typeof mockVCs[0];

const formSchema = z.object({
  investorId: z.string().min(1, 'Please select an investor'),
  integrityScore: z.number().min(1).max(10),
  operationalSupportScore: z.number().min(1).max(10),
  fundraisingSupportScore: z.number().min(1).max(10),
  responsivenessScore: z.number().min(1).max(10),
  comments: z.string().min(10, 'Please provide more detailed feedback'),
  stageOfCompany: z.string().min(1, 'Please select your company stage'),
  positionOfFounder: z.string().min(1, 'Please select your position'),
});

export default function RatePage() {
  const router = useRouter();
  const [searchQuery, setSearchQuery] = useState('');
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [selectedInvestor, setSelectedInvestor] = useState<Investor | null>(null);

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      integrityScore: 5,
      operationalSupportScore: 5,
      fundraisingSupportScore: 5,
      responsivenessScore: 5,
      comments: '',
    },
  });

  const filteredInvestors = mockVCs.filter(investor =>
    investor.name.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const handleLinkedInAuth = () => {
    setIsAuthenticated(true);
  };

  const onSubmit = (values: z.infer<typeof formSchema>) => {
    if (!selectedInvestor || !isAuthenticated) return;

    // Calculate overall rating
    const overallRating = (
      values.integrityScore +
      values.operationalSupportScore +
      values.fundraisingSupportScore +
      values.responsivenessScore
    ) / 4;

    // Create new log entry
    const newLog = {
      id: Date.now(), // Use timestamp as temporary ID
      timestamp: new Date().toISOString(),
      stageOfCompany: values.stageOfCompany,
      positionOfFounder: values.positionOfFounder,
      approvalStatus: 'pending',
      logMessage: `New rating submitted for ${selectedInvestor.name}`,
    };

    // Store in localStorage for demo purposes
    window.localStorage.setItem('lastLog', JSON.stringify(newLog));

    // Update investor ratings
    const updatedRating = {
      overall: overallRating,
      totalRatings: selectedInvestor.rating.totalRatings + 1,
      breakdown: {
        integrity: values.integrityScore,
        operationalSupport: values.operationalSupportScore,
        fundraisingSupport: values.fundraisingSupportScore,
        responsiveness: values.responsivenessScore,
      },
    };

    // Store the updated rating in localStorage
    window.localStorage.setItem('lastRating', JSON.stringify(updatedRating));

    router.push('/logs');
  };

  return (
    <div className="min-h-screen bg-background">
      <div className="container mx-auto px-4 py-8">
        <div className="max-w-2xl mx-auto">
          <h1 className="text-4xl font-bold mb-8">Rate an Investor</h1>

          <Card className="mb-8">
            <CardHeader>
              <CardTitle>LinkedIn Authentication</CardTitle>
              <CardDescription>
                Verify your identity to submit ratings
              </CardDescription>
            </CardHeader>
            <CardContent>
              <Button 
                onClick={handleLinkedInAuth} 
                variant={isAuthenticated ? "secondary" : "default"}
                className="w-full"
                size="lg"
                disabled={isAuthenticated}
              >
                <Linkedin className="mr-2 h-5 w-5" />
                {isAuthenticated ? "Authenticated with LinkedIn" : "Continue with LinkedIn"}
              </Button>
            </CardContent>
          </Card>

          <Card className="mb-8">
            <CardHeader>
              <CardTitle>Select Investor</CardTitle>
              <CardDescription>
                Search for the investor you want to rate
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="relative">
                <Search className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" />
                <Input
                  placeholder="Search investors..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="pl-9"
                />
              </div>
              {searchQuery && (
                <div className="mt-4 space-y-2">
                  {filteredInvestors.map((investor) => (
                    <div
                      key={investor.id}
                      className={`flex items-center gap-3 p-3 rounded-lg hover:bg-accent cursor-pointer ${
                        selectedInvestor?.id === investor.id ? 'bg-accent' : ''
                      }`}
                      onClick={() => {
                        setSelectedInvestor(investor);
                        form.setValue('investorId', String(investor.id));
                      }}
                    >
                      <img
                        src={investor.logoUrl}
                        alt={investor.name}
                        className="w-8 h-8 rounded-full"
                      />
                      <div>
                        <div className="font-medium">{investor.name}</div>
                        <div className="text-sm text-muted-foreground">
                          {investor.hqLocation}
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              )}
            </CardContent>
          </Card>

          <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
              <FormField
                control={form.control}
                name="integrityScore"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Integrity & Conviction</FormLabel>
                    <FormControl>
                      <div className="space-y-3">
                        <Slider
                          min={1}
                          max={10}
                          step={1}
                          value={[field.value]}
                          onValueChange={(value) => field.onChange(value[0])}
                        />
                        <div className="text-center font-medium">
                          {field.value} / 10
                        </div>
                      </div>
                    </FormControl>
                    <FormDescription>
                      Rate the investor's integrity and conviction in supporting portfolio companies
                    </FormDescription>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <FormField
                control={form.control}
                name="operationalSupportScore"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Operational Support</FormLabel>
                    <FormControl>
                      <div className="space-y-3">
                        <Slider
                          min={1}
                          max={10}
                          step={1}
                          value={[field.value]}
                          onValueChange={(value) => field.onChange(value[0])}
                        />
                        <div className="text-center font-medium">
                          {field.value} / 10
                        </div>
                      </div>
                    </FormControl>
                    <FormDescription>
                      Rate the quality of operational support and guidance provided
                    </FormDescription>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <FormField
                control={form.control}
                name="fundraisingSupportScore"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Fundraising Support</FormLabel>
                    <FormControl>
                      <div className="space-y-3">
                        <Slider
                          min={1}
                          max={10}
                          step={1}
                          value={[field.value]}
                          onValueChange={(value) => field.onChange(value[0])}
                        />
                        <div className="text-center font-medium">
                          {field.value} / 10
                        </div>
                      </div>
                    </FormControl>
                    <FormDescription>
                      Rate the investor's support in subsequent fundraising efforts
                    </FormDescription>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <FormField
                control={form.control}
                name="responsivenessScore"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Responsiveness</FormLabel>
                    <FormControl>
                      <div className="space-y-3">
                        <Slider
                          min={1}
                          max={10}
                          step={1}
                          value={[field.value]}
                          onValueChange={(value) => field.onChange(value[0])}
                        />
                        <div className="text-center font-medium">
                          {field.value} / 10
                        </div>
                      </div>
                    </FormControl>
                    <FormDescription>
                      Rate how responsive and accessible the investor is
                    </FormDescription>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <FormField
                control={form.control}
                name="comments"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Comments</FormLabel>
                    <FormControl>
                      <Textarea
                        placeholder="Share your experience working with this investor..."
                        className="min-h-[100px]"
                        {...field}
                      />
                    </FormControl>
                    <FormDescription>
                      Provide detailed feedback about your experience
                    </FormDescription>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <FormField
                control={form.control}
                name="stageOfCompany"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Company Stage</FormLabel>
                    <Select onValueChange={field.onChange} defaultValue={field.value}>
                      <FormControl>
                        <SelectTrigger>
                          <SelectValue placeholder="Select your company stage" />
                        </SelectTrigger>
                      </FormControl>
                      <SelectContent>
                        <SelectItem value="pre-seed">Pre-seed</SelectItem>
                        <SelectItem value="seed">Seed</SelectItem>
                        <SelectItem value="series a">Series A</SelectItem>
                        <SelectItem value="series b">Series B</SelectItem>
                        <SelectItem value="other">Other</SelectItem>
                      </SelectContent>
                    </Select>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <FormField
                control={form.control}
                name="positionOfFounder"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Your Position</FormLabel>
                    <Select onValueChange={field.onChange} defaultValue={field.value}>
                      <FormControl>
                        <SelectTrigger>
                          <SelectValue placeholder="Select your position" />
                        </SelectTrigger>
                      </FormControl>
                      <SelectContent>
                        <SelectItem value="CEO">CEO</SelectItem>
                        <SelectItem value="CTO">CTO</SelectItem>
                        <SelectItem value="COO">COO</SelectItem>
                        <SelectItem value="other">Other</SelectItem>
                      </SelectContent>
                    </Select>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <Button 
                type="submit" 
                size="lg" 
                className="w-full"
                disabled={!selectedInvestor || !isAuthenticated}
              >
                Submit Rating
              </Button>
            </form>
          </Form>
        </div>
      </div>
    </div>
  );
}