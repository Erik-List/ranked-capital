export type LogType = 'NEW' | 'UPDATE' | 'DELETION'
export type Status = 'PENDING_APPROVAL' | 'APPROVED' | 'REJECTED' | 'NULL'

export interface Log {
  id: string
  rating_id: string
  timestamp: string
  log_type: LogType
  log_message: string
  stage_of_company: string | null
  position_of_founder: string | null
  status: Status
  investor_name?: string // Added from join
}

export interface Rating {
  id: string
  user_id: string
  investor_id: string
  score: {
    support: number
    expertise: number
    network: number
    terms: number
  }
  comments: {
    support: string
    expertise: string
    network: string
    terms: string
  }
  stage_of_company: string | null
  position_of_founder: string | null
  status: Status
  created_at: string
  updated_at: string
}

export interface Investor {
  id: string
  name: string
  slug: string
  logo_url: string | null
  partners: string[] | null
  aum: string | null
  funds_info: Array<{ name: string, size: string }> | null
  hq_location: string | null
  other_locations: string[] | null
  investment_stage: string | null
  investment_geo: string[] | null
  investment_focus: string[] | null
  investment_style: string | null
  history: string | null
  investment_concept: string | null
  notable_investments: Array<{ company: string, note: string }> | null
  investor_type: string | null
  created_at: string
  updated_at: string
  status: Status
}
