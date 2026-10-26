"use client"

import {
  HARGEISA_PROVIDERS,
  RESOURCE_TEMPLATES,
  PUBLIC_EVENTS,
  MARKET_INTELLIGENCE_METRICS,
  SAMPLE_INQUIRIES,
  SAMPLE_EVENT_PLAN,
} from "./mock-data"
import {
  Provider,
  ProviderPackage,
  WeddingInquiry,
  WeddingEventPlan,
  ResourceTemplate,
  PublicEvent,
  MarketObservationMetric,
  BookingStatus,
} from "./types"

const STORAGE_KEYS = {
  PROVIDERS: "m2_sl_weddings_providers_v1",
  INQUIRIES: "m2_sl_weddings_inquiries_v1",
  PLAN: "m2_sl_weddings_plan_v1",
  BRANDING: "m2_sl_weddings_branding_v1",
  LANGUAGE: "m2_sl_language_pref",
}

export interface BrandingSettings {
  siteNameEn: string
  siteNameSo: string
  taglineEn: string
  taglineSo: string
  primaryColor: string
  accentColor: string
  showPoweredByM2: boolean
  defaultCity: string
  contactEmail: string
  contactPhone: string
}

export const DEFAULT_BRANDING: BrandingSettings = {
  siteNameEn: "Somaliland Weddings & Events",
  siteNameSo: "Aroosyada & Munaasabadaha Somaliland",
  taglineEn: "The Premier Wedding Marketplace & Operating Platform for Somaliland",
  taglineSo: "Suuqa Koowaad ee Qabanqaabada Aroosyada & Munaasabadaha Somaliland",
  primaryColor: "#0f172a", // Charcoal slate
  accentColor: "#d97706", // Amber / Warm Gold
  showPoweredByM2: true,
  defaultCity: "Hargeisa",
  contactEmail: "weddings@m2creative.sl",
  contactPhone: "+252 63 4400111",
}

export class WeddingStore {
  static getProviders(): Provider[] {
    if (typeof window === "undefined") return HARGEISA_PROVIDERS
    try {
      const stored = localStorage.getItem(STORAGE_KEYS.PROVIDERS)
      return stored ? JSON.parse(stored) : HARGEISA_PROVIDERS
    } catch {
      return HARGEISA_PROVIDERS
    }
  }

  static getProviderBySlug(slug: string): Provider | undefined {
    const list = this.getProviders()
    return list.find((p) => p.slug === slug)
  }

  static getAllPackages(): ProviderPackage[] {
    const providers = this.getProviders()
    const pkgs: ProviderPackage[] = []
    providers.forEach((prov) => {
      prov.packages.forEach((pkg) => {
        pkgs.push(pkg)
      })
    })
    return pkgs
  }

  static getPackageById(id: string): ProviderPackage | undefined {
    const pkgs = this.getAllPackages()
    return pkgs.find((p) => p.id === id)
  }

  static getInquiries(): WeddingInquiry[] {
    if (typeof window === "undefined") return SAMPLE_INQUIRIES
    try {
      const stored = localStorage.getItem(STORAGE_KEYS.INQUIRIES)
      return stored ? JSON.parse(stored) : SAMPLE_INQUIRIES
    } catch {
      return SAMPLE_INQUIRIES
    }
  }

  static createInquiry(data: Omit<WeddingInquiry, "id" | "createdAt" | "updatedAt" | "quotationVersion" | "depositStatus" | "status" | "milestones">): WeddingInquiry {
    const current = this.getInquiries()
    const newInquiry: WeddingInquiry = {
      ...data,
      id: `inq-${Date.now().toString().slice(-4)}`,
      status: "inquiry_submitted",
      quotationVersion: 1,
      depositStatus: "unpaid",
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString(),
      milestones: [
        {
          titleEn: "Inquiry Submitted",
          titleSo: "Dalabka La Diray",
          status: "completed",
          timestamp: new Date().toISOString().replace("T", " ").slice(0, 16),
        },
        {
          titleEn: "Awaiting Provider Quotation",
          titleSo: "Waxaa La Sugayaa Qiimaha Shirkadda",
          status: "current",
        },
        {
          titleEn: "Customer Review & Acceptance",
          titleSo: "Aqbalaadda Macmiilka",
          status: "upcoming",
        },
        {
          titleEn: "Deposit Recording",
          titleSo: "Diiwaangelinta Hormarka",
          status: "upcoming",
        },
        {
          titleEn: "Booking Confirmed",
          titleSo: "Heshiiska Oo La Xaqiijiyay",
          status: "upcoming",
        },
      ],
    }

    const updated = [newInquiry, ...current]
    if (typeof window !== "undefined") {
      localStorage.setItem(STORAGE_KEYS.INQUIRIES, JSON.stringify(updated))
    }
    return newInquiry
  }

  static updateInquiryStatus(id: string, newStatus: BookingStatus, quotedPrice?: number): WeddingInquiry | null {
    const current = this.getInquiries()
    const index = current.findIndex((i) => i.id === id)
    if (index === -1) return null

    const item = { ...current[index] }
    item.status = newStatus
    item.updatedAt = new Date().toISOString()
    if (quotedPrice !== undefined) {
      item.quotedPriceUsd = quotedPrice
      item.quotationVersion += 1
    }

    if (newStatus === "confirmed") {
      item.depositStatus = "deposit_recorded"
    }

    current[index] = item
    if (typeof window !== "undefined") {
      localStorage.setItem(STORAGE_KEYS.INQUIRIES, JSON.stringify(current))
    }
    return item
  }

  static getEventPlan(): WeddingEventPlan {
    if (typeof window === "undefined") return SAMPLE_EVENT_PLAN
    try {
      const stored = localStorage.getItem(STORAGE_KEYS.PLAN)
      return stored ? JSON.parse(stored) : SAMPLE_EVENT_PLAN
    } catch {
      return SAMPLE_EVENT_PLAN
    }
  }

  static toggleTask(taskId: string): WeddingEventPlan {
    const plan = this.getEventPlan()
    const updatedTasks = plan.tasks.map((t) =>
      t.id === taskId ? { ...t, isCompleted: !t.isCompleted } : t
    )
    const updatedPlan = { ...plan, tasks: updatedTasks }
    if (typeof window !== "undefined") {
      localStorage.setItem(STORAGE_KEYS.PLAN, JSON.stringify(updatedPlan))
    }
    return updatedPlan
  }

  static getTemplates(): ResourceTemplate[] {
    return RESOURCE_TEMPLATES
  }

  static getPublicEvents(): PublicEvent[] {
    return PUBLIC_EVENTS
  }

  static getMarketMetrics(): MarketObservationMetric[] {
    return MARKET_INTELLIGENCE_METRICS
  }

  static getBranding(): BrandingSettings {
    if (typeof window === "undefined") return DEFAULT_BRANDING
    try {
      const stored = localStorage.getItem(STORAGE_KEYS.BRANDING)
      return stored ? JSON.parse(stored) : DEFAULT_BRANDING
    } catch {
      return DEFAULT_BRANDING
    }
  }

  static saveBranding(settings: BrandingSettings): void {
    if (typeof window !== "undefined") {
      localStorage.setItem(STORAGE_KEYS.BRANDING, JSON.stringify(settings))
    }
  }

  static getLanguage(): "so" | "en" {
    if (typeof window === "undefined") return "so"
    try {
      return (localStorage.getItem(STORAGE_KEYS.LANGUAGE) as "so" | "en") || "so"
    } catch {
      return "so"
    }
  }

  static setLanguage(lang: "so" | "en"): void {
    if (typeof window !== "undefined") {
      localStorage.setItem(STORAGE_KEYS.LANGUAGE, lang)
      window.dispatchEvent(new Event("languagechange"))
    }
  }
}
