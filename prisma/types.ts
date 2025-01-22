export interface User {
  id: string;
  linkedin_url: string;
  created_at: string;
  updated_at: string;
}

export interface Investor {
  id: string;
  name: string;
  slug: string;
  logo_url: string;
  partners: string[];
  aum: string;
  funds_info: any;
  hq_location: string;
  other_locations: string[];
  investment_stage: string;
  investment_geo: string[];
  investment_focus: string[];
  investment_style: string;
  history: string;
  investment_concept: string;
  notable_investments: any;
  investor_type: string;
  created_at: string;
  updated_at: string;
  status: string;
}

export interface Rating {
  id: string;
  user_id: string;
  investor_id: string;
  score: Record<string, number>;
  comments: Record<string, string>;
  stage_of_company: string;
  position_of_founder: string;
  status: string;
  created_at: string;
  updated_at: string;
}

export interface Log {
  id: string;
  rating_id: string;
  timestamp: string;
  log_type: string;
  log_message: string;
  stage_of_company: string;
  position_of_founder: string;
  status: string;
} 