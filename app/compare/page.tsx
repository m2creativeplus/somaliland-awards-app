"use client"

import { useState, useEffect } from "react"
import Link from "next/link"
import { WeddingHeader } from "@/components/weddings/wedding-header"
import { WeddingFooter } from "@/components/weddings/wedding-footer"
import { PackageComparisonTable } from "@/components/weddings/package-comparison-table"
import { WeddingStore } from "@/lib/weddings/store"
import { Provider } from "@/lib/weddings/types"
import { TRANSLATIONS } from "@/lib/weddings/translations"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { ArrowLeft, Sparkles } from "lucide-react"

export default function CompareAliasPage() {
  const [lang, setLang] = useState<"so" | "en">("so")
  const [providers, setProviders] = useState<Provider[]>([])

  useEffect(() => {
    setLang(WeddingStore.getLanguage())
    setProviders(WeddingStore.getProviders())

    const handleLang = () => setLang(WeddingStore.getLanguage())
    window.addEventListener("languagechange", handleLang)
    return () => window.removeEventListener("languagechange", handleLang)
  }, [])

  const t = TRANSLATIONS[lang]

  return (
    <div className="min-h-screen flex flex-col bg-background text-foreground">
      <WeddingHeader />

      <main className="flex-1 container py-8 sm:py-12 space-y-8">
        <div className="flex items-center gap-2">
          <Button asChild variant="ghost" size="sm" className="min-h-[44px] gap-1.5 text-xs font-semibold">
            <Link href="/providers">
              <ArrowLeft className="h-4 w-4" />
              <span>{lang === "so" ? "Dib ugu noqo Shirkadaha" : "Back to Directory"}</span>
            </Link>
          </Button>
        </div>

        <div className="space-y-2.5">
          <Badge className="bg-amber-600 text-white font-bold text-[11px] tracking-wide">
            {lang === "so" ? "Isbarbardhigga Rasmiga ah ee Xirmooyinka" : "Verified Package Comparison"}
          </Badge>
          <h1 className="text-2xl sm:text-4xl font-extrabold font-heading text-slate-900 dark:text-white">
            {t.compareTitle}
          </h1>
          <p className="text-xs sm:text-sm text-slate-600 dark:text-slate-300 max-w-2xl leading-relaxed">
            {t.compareSubtitle}
          </p>
        </div>

        <PackageComparisonTable providers={providers} lang={lang} />
      </main>

      <WeddingFooter />
    </div>
  )
}
