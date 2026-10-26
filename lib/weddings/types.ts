export type ProviderCategory =
  | "venues"
  | "photography"
  | "videography"
  | "decor"
  | "catering"
  | "bridal"
  | "planners"
  | "sound_lighting"
  | "traditional_music"

export type VerificationStatus = "VERIFIED" | "PENDING" | "UNVERIFIED"

export type PriceType = "fixed" | "starting_at" | "range" | "quotation_required"

export interface ProviderPackage {
  id: string
  providerId: string
  titleEn: string
  titleSo: string
  slug: string
  category: ProviderCategory
  priceType: PriceType
  priceUsd: number
  priceSlSh: number
  deliverablesEn: string[]
  deliverablesSo: string[]
  durationCoverage: string
  guestCapacityLimit?: number
  travelOvertimeTermsEn: string
  travelOvertimeTermsSo: string
  depositRequirementPercent: number
  cancellationPolicyEn: string
  cancellationPolicySo: string
  availabilityStatus: "available" | "inquiry_required" | "booked_out"
  lastUpdated: string
}

export interface ProviderReview {
  id: string
  customerName: string
  rating: number // 1-5
  comment: string
  bookingVerified: boolean
  date: string
}

export interface Provider {
  id: string
  slug: string
  businessNameEn: string
  businessNameSo: string
  category: ProviderCategory
  descriptionEn: string
  descriptionSo: string
  city: string
  district: string
  address: string
  phone: string
  whatsapp: string
  email: string
  serviceAreas: string[]
  verificationStatus: VerificationStatus
  lastVerifiedDate: string
  verifiedBy?: string
  rating: number
  reviewCount: number
  priceTier: "$" | "$$" | "$$$" | "$$$$"
  startingPriceUsd: number
  isFeatured: boolean
  languages: string[]
  portfolioImages: string[]
  packages: ProviderPackage[]
  reviews: ProviderReview[]
  leadResponseTimeHours: number
}

export type BookingStatus =
  | "draft"
  | "inquiry_submitted"
  | "quotation_sent"
  | "accepted"
  | "pending_confirmation"
  | "confirmed"
  | "in_progress"
  | "completed"
  | "declined"
  | "cancelled"
  | "disputed"

export interface BookingMilestone {
  titleEn: string
  titleSo: string
  status: "completed" | "current" | "upcoming"
  timestamp?: string
}

export interface WeddingInquiry {
  id: string
  providerId: string
  providerName: string
  customerName: string
  customerEmail: string
  customerPhone: string
  eventType: "wedding" | "nikah" | "engagement" | "reception" | "gala"
  eventDate: string
  eventLocation: string
  estimatedGuestCount: number
  packageId?: string
  packageName?: string
  customNotes?: string
  quotedPriceUsd?: number
  quotationVersion: number
  depositStatus: "unpaid" | "deposit_recorded" | "fully_paid"
  status: BookingStatus
  createdAt: string
  updatedAt: string
  milestones: BookingMilestone[]
}

export interface EventTask {
  id: string
  titleEn: string
  titleSo: string
  category: "venue" | "attire" | "media" | "catering" | "program" | "logistics"
  dueDate: string
  assignedTo: string
  isCompleted: boolean
}

export interface EventExpense {
  id: string
  categoryEn: string
  categorySo: string
  allocatedUsd: number
  actualUsd: number
  isPaid: boolean
  vendorName?: string
}

export interface WeddingEventPlan {
  id: string
  coupleNames: string
  eventDate: string
  city: string
  guestCount: number
  totalBudgetUsd: number
  tasks: EventTask[]
  expenses: EventExpense[]
  runSheet: { time: string; activityEn: string; activitySo: string; responsible: string }[]
}

export interface PublicEvent {
  id: string
  slug: string
  titleEn: string
  titleSo: string
  organizer: string
  eventDate: string
  time: string
  location: string
  venue: string
  descriptionEn: string
  descriptionSo: string
  posterUrl: string
  ticketLink?: string
  isApproved: boolean
  isFeatured: boolean
}

export interface ResourceTemplate {
  id: string
  slug: string
  titleEn: string
  titleSo: string
  category: "budget" | "timeline" | "brief" | "checklist" | "legal_guide" | "vendor_mgmt"
  descriptionEn: string
  descriptionSo: string
  format: "PDF" | "DOCX" | "CSV" | "JSON" | "PRINT"
  downloadCount: number
  version: string
  lastUpdated: string
  license: string
  fileSize: string
  downloadUrl?: string
  previewPointsEn: string[]
  previewPointsSo: string[]
}

export interface MarketObservationMetric {
  id: string
  titleEn: string
  titleSo: string
  metricValue: string
  changeLabelEn: string
  changeLabelSo: string
  confidence: "VERIFIED" | "HIGH-CONFIDENCE ESTIMATE" | "LOW-CONFIDENCE ESTIMATE" | "UNVERIFIED"
  sampleSize: string
  reportingPeriod: string
  source: string
  methodologyEn: string
  methodologySo: string
}
