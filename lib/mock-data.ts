import { User, Investor, Rating, Log } from '@/prisma/types'

export const mockUsers: User[] = [
  {
    id: "123e4567-e89b-12d3-a456-426614174000",
    linkedin_url: "https://linkedin.com/in/johndoe",
    created_at: "2024-01-15T10:00:00Z",
    updated_at: "2024-01-15T10:00:00Z"
  },
  {
    id: "223e4567-e89b-12d3-a456-426614174001",
    linkedin_url: "https://linkedin.com/in/janedoe",
    created_at: "2024-01-15T11:00:00Z",
    updated_at: "2024-01-15T11:00:00Z"
  },
  {
    id: "323e4567-e89b-12d3-a456-426614174010",
    linkedin_url: "https://linkedin.com/in/sarahsmith",
    created_at: "2024-01-16T09:00:00Z",
    updated_at: "2024-01-16T09:00:00Z"
  },
  {
    id: "423e4567-e89b-12d3-a456-426614174011",
    linkedin_url: "https://linkedin.com/in/michaelwilson",
    created_at: "2024-01-17T14:30:00Z",
    updated_at: "2024-01-17T14:30:00Z"
  },
  {
    id: "523e4567-e89b-12d3-a456-426614174012",
    linkedin_url: "https://linkedin.com/in/emilybrown",
    created_at: "2024-01-18T11:15:00Z",
    updated_at: "2024-01-18T11:15:00Z"
  }
];

export const mockInvestors: Investor[] = [
  {
    id: "623e4567-e89b-12d3-a456-426614174002",
    name: "Horizon Ventures",
    slug: "horizon-ventures",
    logo_url: "https://images.unsplash.com/photo-1560179707-f14e90ef3623?w=128&h=128&fit=crop",
    partners: ["Sarah Chen", "Michael Zhang", "David Park"],
    aum: "$2.5B",
    funds_info: [
      { name: "Horizon I", size: "$500M" },
      { name: "Horizon II", size: "$1B" },
      { name: "Horizon Growth", size: "$1B" }
    ],
    hq_location: "San Francisco, CA",
    other_locations: ["New York", "London"],
    investment_stage: "Series A, B",
    investment_geo: ["North America", "Europe"],
    investment_focus: ["AI/ML", "Enterprise SaaS", "Fintech"],
    investment_style: "Data-driven, founder-first",
    history: "Founded in 2012, Horizon Ventures focuses on transformative technology companies.",
    investment_concept: "Combines deep technical expertise with operational experience to help founders scale.",
    notable_investments: [
      { company: "TechCo", note: "AI platform, IPO 2022" },
      { company: "DataFlow", note: "Enterprise data platform, $200M exit" },
      { company: "FinanceAI", note: "Series C, $2B valuation" }
    ],
    investor_type: "VC",
    created_at: "2024-01-15T12:00:00Z",
    updated_at: "2024-01-15T12:00:00Z",
    status: "APPROVED"
  },
  {
    id: "723e4567-e89b-12d3-a456-426614174003",
    name: "Berlin Digital Ventures",
    slug: "berlin-digital-ventures",
    logo_url: "https://images.unsplash.com/photo-1501504905252-473c47e087f8?w=128&h=128&fit=crop",
    partners: ["Anna Schmidt", "Klaus Weber", "Marie Bauer"],
    aum: "€800M",
    funds_info: [
      { name: "BDV I", size: "€300M" },
      { name: "BDV II", size: "€500M" }
    ],
    hq_location: "Berlin, Germany",
    other_locations: ["Munich"],
    investment_stage: "Seed, Series A",
    investment_geo: ["Germany", "DACH Region", "Europe"],
    investment_focus: ["Digital Health", "Climate Tech", "B2B SaaS"],
    investment_style: "Hands-on, sustainable growth",
    history: "Established in 2015 to support the growing German tech ecosystem.",
    investment_concept: "Focus on sustainable technology solutions with positive societal impact.",
    notable_investments: [
      { company: "HealthTech GmbH", note: "Digital health platform, Series B" },
      { company: "GreenEnergy", note: "Climate tech leader, €100M exit" }
    ],
    investor_type: "VC",
    created_at: "2024-01-16T10:00:00Z",
    updated_at: "2024-01-16T10:00:00Z",
    status: "APPROVED"
  },
  {
    id: "823e4567-e89b-12d3-a456-426614174004",
    name: "Munich Tech Capital",
    slug: "munich-tech-capital",
    logo_url: "https://images.unsplash.com/photo-1620288627223-53302f4e8c74?w=128&h=128&fit=crop",
    partners: ["Thomas Mueller", "Lisa Wagner"],
    aum: "€600M",
    funds_info: [
      { name: "MTC Fund I", size: "€250M" },
      { name: "MTC Growth", size: "€350M" }
    ],
    hq_location: "Munich, Germany",
    other_locations: ["Berlin", "Vienna"],
    investment_stage: "Series A, B",
    investment_geo: ["Germany", "Austria", "Switzerland"],
    investment_focus: ["Industry 4.0", "IoT", "Enterprise Software"],
    investment_style: "Industry-focused, technical expertise",
    history: "Founded by industry veterans to bridge traditional industry with modern tech.",
    investment_concept: "Deep industry expertise combined with technological innovation.",
    notable_investments: [
      { company: "IndustryAI", note: "Manufacturing AI platform, €80M exit" },
      { company: "SmartFactory", note: "IoT platform, Series C" }
    ],
    investor_type: "VC",
    created_at: "2024-01-17T09:00:00Z",
    updated_at: "2024-01-17T09:00:00Z",
    status: "APPROVED"
  },
  {
    id: "923e4567-e89b-12d3-a456-426614174005",
    name: "Thames Valley Capital",
    slug: "thames-valley-capital",
    logo_url: "https://images.unsplash.com/photo-1520333789090-1afc82db536a?w=128&h=128&fit=crop",
    partners: ["James Wilson", "Emma Thompson", "Oliver Brown"],
    aum: "£1.2B",
    funds_info: [
      { name: "TVC Early Stage", size: "£400M" },
      { name: "TVC Growth", size: "£800M" }
    ],
    hq_location: "London, UK",
    other_locations: ["Cambridge", "Edinburgh"],
    investment_stage: "Series A, B, C",
    investment_geo: ["UK", "Europe"],
    investment_focus: ["Fintech", "Deep Tech", "Cybersecurity"],
    investment_style: "Research-driven, patient capital",
    history: "Established in 2010 with focus on deep technology innovations.",
    investment_concept: "Supporting breakthrough technologies with patient, long-term capital.",
    notable_investments: [
      { company: "SecureAI", note: "Cybersecurity platform, IPO 2023" },
      { company: "QuantumTech", note: "Quantum computing, Series D" }
    ],
    investor_type: "VC",
    created_at: "2024-01-18T09:00:00Z",
    updated_at: "2024-01-18T09:00:00Z",
    status: "APPROVED"
  },
  {
    id: "a23e4567-e89b-12d3-a456-426614174006",
    name: "Manhattan Innovation Fund",
    slug: "manhattan-innovation-fund",
    logo_url: "https://images.unsplash.com/photo-1522071820081-009f0129c71c?w=128&h=128&fit=crop",
    partners: ["Rachel Cohen", "Daniel Martinez", "Alex Kim"],
    aum: "$1.8B",
    funds_info: [
      { name: "MIF Early", size: "$600M" },
      { name: "MIF Growth", size: "$1.2B" }
    ],
    hq_location: "New York, NY",
    other_locations: ["Boston", "Miami"],
    investment_stage: "Series A, B",
    investment_geo: ["North America", "Europe"],
    investment_focus: ["Consumer Tech", "Media", "Commerce"],
    investment_style: "Consumer-focused, brand-building",
    history: "Founded in 2014 to back the next generation of consumer brands.",
    investment_concept: "Building iconic consumer brands through technology and community.",
    notable_investments: [
      { company: "StyleTech", note: "Fashion marketplace, $300M exit" },
      { company: "FoodFlow", note: "D2C food platform, Series C" }
    ],
    investor_type: "VC",
    created_at: "2024-01-19T09:00:00Z",
    updated_at: "2024-01-19T09:00:00Z",
    status: "APPROVED"
  }
];

export const mockRatings: Rating[] = [
  {
    id: "923e4567-e89b-12d3-a456-426614174004",
    user_id: "123e4567-e89b-12d3-a456-426614174000",
    investor_id: "623e4567-e89b-12d3-a456-426614174002",
    score: {
      support: 4,
      expertise: 5,
      network: 4,
      terms: 4
    },
    comments: {
      support: "Excellent operational support",
      expertise: "Deep industry knowledge",
      network: "Strong connections in enterprise",
      terms: "Fair and founder-friendly terms"
    },
    stage_of_company: "Series A",
    position_of_founder: "CEO",
    status: "APPROVED",
    created_at: "2024-01-15T14:00:00Z",
    updated_at: "2024-01-15T14:00:00Z"
  },
  {
    id: "a23e4567-e89b-12d3-a456-426614174005",
    user_id: "223e4567-e89b-12d3-a456-426614174001",
    investor_id: "723e4567-e89b-12d3-a456-426614174003",
    score: {
      support: 5,
      expertise: 5,
      network: 5,
      terms: 4
    },
    comments: {
      support: "Great support in German market",
      expertise: "Deep healthcare knowledge",
      network: "Strong DACH connections",
      terms: "Standard terms but fair"
    },
    stage_of_company: "Seed",
    position_of_founder: "CTO",
    status: "APPROVED",
    created_at: "2024-01-16T15:00:00Z",
    updated_at: "2024-01-16T15:00:00Z"
  }
];

export const mockLogs: Log[] = [
  {
    id: "b23e4567-e89b-12d3-a456-426614174006",
    rating_id: "923e4567-e89b-12d3-a456-426614174004",
    timestamp: "2024-01-15T14:00:00Z",
    log_type: "NEW",
    log_message: "rating submitted for captable investors",
    stage_of_company: "Series A",
    position_of_founder: "CEO",
    status: "APPROVED"
  },
  {
    id: "c23e4567-e89b-12d3-a456-426614174007",
    rating_id: "a23e4567-e89b-12d3-a456-426614174005",
    timestamp: "2024-01-16T15:00:00Z",
    log_type: "NEW",
    log_message: "rating submitted for multiple investors",
    stage_of_company: "Seed",
    position_of_founder: "CTO",
    status: "APPROVED"
  },
  {
    id: "d23e4567-e89b-12d3-a456-426614174008",
    rating_id: "923e4567-e89b-12d3-a456-426614174004",
    timestamp: "2024-01-17T09:30:00Z",
    log_type: "UPDATE",
    log_message: "rating updated for Horizon Ventures",
    stage_of_company: "Series A",
    position_of_founder: "CEO",
    status: "PENDING_APPROVAL"
  },
  {
    id: "e23e4567-e89b-12d3-a456-426614174009",
    rating_id: "a23e4567-e89b-12d3-a456-426614174005",
    timestamp: "2024-01-18T11:45:00Z",
    log_type: "UPDATE",
    log_message: "rating updated for Berlin Digital Ventures",
    stage_of_company: "Seed",
    position_of_founder: "CTO",
    status: "APPROVED"
  },
  {
    id: "f23e4567-e89b-12d3-a456-426614174010",
    rating_id: "923e4567-e89b-12d3-a456-426614174004",
    timestamp: "2024-01-19T16:20:00Z",
    log_type: "DELETION",
    log_message: "rating deleted for all investors",
    stage_of_company: "Series A",
    position_of_founder: "CEO",
    status: "APPROVED"
  }
];