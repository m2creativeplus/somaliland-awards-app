"use client"

import { useState, useEffect } from "react"
import Link from "next/link"
import { WeddingHeader } from "@/components/weddings/wedding-header"
import { WeddingFooter } from "@/components/weddings/wedding-footer"
import { EventPlannerWorkspace } from "@/components/weddings/event-planner-workspace"
import { WeddingStore } from "@/lib/weddings/store"
import { TRANSLATIONS } from "@/lib/weddings/translations"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { ArrowLeft } from "lucide-react"

export default function BudgetPlanningPage() {
  const [lang, setLang] = useState<"so" | "en">("so")

  useEffect(() => {
    setLang(WeddingStore.getLanguage())
    const handleLang = () => setLang(WeddingStore.getLanguage())
    window.addEventListener("languagechange", handleLang)
    return () => window.removeEventListener("languagechange", handleLang)
  }, [])

  return (
    <div className="min-h-screen flex flex-col bg-background text-foreground">
      <WeddingHeader />

      <main className="flex-1 container py-10 space-y-8">
        <div className="flex items-center gap-2">
          <Button asChild variant="ghost" size="sm" className="h-8 gap-1.5 text-xs">
            <Link href="/plan">
              <ArrowLeft className="h-3.5 w-3.5" />
              <span>{lang === "so" ? "Dib ugu noqo Qorshaha" : "Back to Planning Overview"}</span>
            </Link>
          </Button>
        </div>

        <div className="space-y-2">
          <Badge className="bg-amber-600 text-white font-bold text-[10px]">
            {lang === "so" ? "Xisaabiyaha Miisaaniyadda" : "Budget Calculator"}
          </Badge>
          <h1 className="text-3xl font-extrabold font-heading">
            {lang === "so" ? "Xisaabiyaha Miisaaniyadda Arooska ee Hargeysa" : "Hargeisa Wedding Budget & Expense Ledger"}
          </h1>
          <p className="text-sm text-muted-foreground max-w-2xl">
            {lang === "so"
              ? "Xisaabi oo kormeero qarashaadka dhabta ah ee hoolka, sawirrada, cuntada, iyo heshiisyada shirkadaha."
              : "Track target vs actual expenses, convert between USD and Somaliland Shilling, and avoid budget overruns."}
          </p>
        </div>

        <EventPlannerWorkspace lang={lang} />
      </main>

      <WeddingFooter />
    </div>
  )
}
