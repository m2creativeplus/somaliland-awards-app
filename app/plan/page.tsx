"use client"

import { useState, useEffect } from "react"
import { WeddingHeader } from "@/components/weddings/wedding-header"
import { WeddingFooter } from "@/components/weddings/wedding-footer"
import { EventPlannerWorkspace } from "@/components/weddings/event-planner-workspace"
import { WeddingStore } from "@/lib/weddings/store"
import { TRANSLATIONS } from "@/lib/weddings/translations"
import { Badge } from "@/components/ui/badge"

export default function EventPlanningPage() {
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
          <Badge className="bg-amber-600 text-white font-bold text-[10px]">
            {lang === "so" ? "Qorshaynta Arooska" : "Planning Workspace"}
          </Badge>
          <h1 className="text-3xl font-extrabold font-heading">{t.plannerTitle}</h1>
          <p className="text-sm text-muted-foreground max-w-2xl">{t.plannerSubtitle}</p>
        </div>

        <EventPlannerWorkspace lang={lang} />
      </main>

      <WeddingFooter />
    </div>
  )
}
