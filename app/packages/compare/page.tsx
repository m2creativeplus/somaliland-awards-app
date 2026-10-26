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

export default function PackageComparisonPage() {
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

      <main className="flex-1 container py-10 space-y-8">
        <div className="flex items-center gap-2">
          <Button asChild variant="ghost" size="sm" className="h-8 gap-1.5 text-xs">
            <Link href="/providers">
              <ArrowLeft className="h-3.5 w-3.5" />
              <span>{lang === "so" ? "Dib ugu noqo Shirkadaha" : "Back to Directory"}</span>
            </Link>
          </Button>
        </div>

        <div className="space-y-2">
          <Badge className="bg-amber-600 text-white font-bold text-[10px]">
            {lang === "so" ? "Isbarbardhigga Rasmiga ah" : "Verified Comparison Matrix"}
          </Badge>
          <h1 className="text-3xl font-extrabold font-heading">{t.compareTitle}</h1>
          <p className="text-sm text-muted-foreground max-w-2xl">{t.compareSubtitle}</p>
        </div>

        <PackageComparisonTable providers={providers} lang={lang} />
      </main>

      <WeddingFooter />
    </div>
  )
}
