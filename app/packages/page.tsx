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

export default function PackagesDirectoryPage() {
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
        <div className="space-y-2">
          <Badge className="bg-amber-600 text-white font-bold text-[10px]">
            {lang === "so" ? "Xirmooyinka Aroosyada" : "Wedding Packages"}
          </Badge>
          <h1 className="text-3xl font-extrabold font-heading">
            {lang === "so" ? "Xirmooyinka La Xaqiijiyay ee Hargeysa" : "Verified Wedding Packages in Hargeisa"}
          </h1>
          <p className="text-sm text-muted-foreground max-w-2xl">
            {lang === "so"
              ? "Kala dooro xirmooyinka ay soo bandhigeen hoolalka, sawir-qaadayaasha, iyo cunto-kariyeyaasha."
              : "Explore fixed-rate, transparent packages with itemized deliverables, capacity limits, and verified deposits."}
          </p>
        </div>

        <PackageComparisonTable providers={providers} lang={lang} />
      </main>

      <WeddingFooter />
    </div>
  )
}
