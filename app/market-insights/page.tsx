"use client"

import { useState, useEffect } from "react"
import { WeddingHeader } from "@/components/weddings/wedding-header"
import { WeddingFooter } from "@/components/weddings/wedding-footer"
import { MarketIntelligenceDashboard } from "@/components/weddings/market-intelligence-dashboard"
import { WeddingStore } from "@/lib/weddings/store"
import { TRANSLATIONS } from "@/lib/weddings/translations"
import { Badge } from "@/components/ui/badge"

export default function MarketInsightsPage() {
  const [lang, setLang] = useState<"so" | "en">("so")

  useEffect(() => {
    setLang(WeddingStore.getLanguage())
    const handleLang = () => setLang(WeddingStore.getLanguage())
    window.addEventListener("languagechange", handleLang)
    return () => window.removeEventListener("languagechange", handleLang)
  }, [])

  const t = TRANSLATIONS[lang]

  return (
    <div className="min-h-screen flex flex-col bg-background text-foreground">
      <WeddingHeader />

      <main className="flex-1 container py-10 space-y-8">
        <div className="space-y-2">
          <Badge className="bg-emerald-600 text-white font-bold text-[10px]">
            {lang === "so" ? "Xogta & Tirakoobka Rasmiga ah" : "Empirical Intelligence"}
          </Badge>
          <h1 className="text-3xl font-extrabold font-heading">{t.insightsTitle}</h1>
          <p className="text-sm text-muted-foreground max-w-2xl">{t.insightsSubtitle}</p>
        </div>

        <MarketIntelligenceDashboard lang={lang} />
      </main>

      <WeddingFooter />
    </div>
  )
}
