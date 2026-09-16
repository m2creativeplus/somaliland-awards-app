export interface Asset {
  id: string
  name_en: string
  name_so: string
  type: "logo" | "map" | "emblem" | "poster" | "banner" | "icon"
  owner: string
  date_created: string
  colors: string[]
  palette_tokens: string[]
  fonts: string[]
  svg_url?: string
  png_url?: string
  tags: string[]
  description_en: string
  description_so: string
  source_links: string[]
  iso_compliance: string[]
  awards_history: Award[]
  license: "public" | "restricted" | "commercial"
  public_visibility: boolean
  metrics: {
    views: number
    likes: number
    downloads: number
  }
  verification: {
    verified_by?: string
    verified_date?: string
  }
}

export interface Submission {
  id: string
  asset_id: string
  entrant: {
    name: string
    email: string
    organization?: string
    country: string
  }
  category: string
  entry_fee_paid: boolean
  files: {
    original: string
    preview: string
    variants?: string[]
  }
  metadata: {
    title: string
    description: string
    inspiration: string
    tools_used: string[]
  }
  scorecard: Scorecard
  status: "pending" | "under_review" | "approved" | "rejected"
  submitted_at: string
}

export interface Scorecard {
  criteria: {
    creativity: { score: number; weight: number; notes?: string }
    functionality: { score: number; weight: number; notes?: string }
    execution: { score: number; weight: number; notes?: string }
    culture: { score: number; weight: number; notes?: string }
    impact: { score: number; weight: number; notes?: string }
    sustainability: { score: number; weight: number; notes?: string }
  }
  total_score: number
  jury_notes?: string
  scored_by?: string
  scored_at?: string
}

export interface Jury {
  id: string
  name: string
  role: string
  country: string
  bio: string
  avatar?: string
  expertise: string[]
  votes: {
    submission_id: string
    scores: Scorecard
    timestamp: string
  }[]
}

export interface Award {
  id: string
  title: string
  category: string
  year: number
  winner_id: string
  description: string
  prize?: string
}

export interface Transaction {
  id: string
  type: "entry_fee" | "sponsorship" | "workshop" | "merchandise"
  amount: number
  currency: "USD" | "SOS"
  provider: "stripe" | "paypal" | "bank_transfer"
  status: "pending" | "completed" | "failed" | "refunded"
  user_id: string
  submission_id?: string
  created_at: string
}
