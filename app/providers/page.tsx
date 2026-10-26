"use client"

import { useState, useEffect } from "react"
import { WeddingHeader } from "@/components/weddings/wedding-header"
import { WeddingFooter } from "@/components/weddings/wedding-footer"
import { ProviderCard } from "@/components/weddings/provider-card"
import { WeddingStore } from "@/lib/weddings/store"
import { Provider, ProviderCategory } from "@/lib/weddings/types"
import { TRANSLATIONS } from "@/lib/weddings/translations"
import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Search, Filter, ShieldCheck, MapPin } from "lucide-react"

export default function ProvidersDirectoryPage() {
  const [lang, setLang] = useState<"so" | "en">("so")
  const [providers, setProviders] = useState<Provider[]>([])
  const [selectedCat, setSelectedCat] = useState<string>("all")
  const [search, setSearch] = useState("")
  const [verifiedOnly, setVerifiedOnly] = useState(false)

  useEffect(() => {
    setLang(WeddingStore.getLanguage())
    setProviders(WeddingStore.getProviders())

    const handleLang = () => setLang(WeddingStore.getLanguage())
    window.addEventListener("languagechange", handleLang)
    return () => window.removeEventListener("languagechange", handleLang)
  }, [])

  const t = TRANSLATIONS[lang]

  const categories = [
    { id: "all", label: t.catAll },
    { id: "venues", label: t.catVenues },
    { id: "photography", label: t.catPhotography },
    { id: "decor", label: t.catDecor },
    { id: "catering", label: t.catCatering },
    { id: "bridal", label: t.catBridal },
    { id: "planners", label: t.catPlanners },
  ]

  const filtered = providers.filter((p) => {
    const matchCat = selectedCat === "all" || p.category === selectedCat
    const name = lang === "so" ? p.businessNameSo : p.businessNameEn
    const matchSearch =
      search === "" ||
      name.toLowerCase().includes(search.toLowerCase()) ||
      p.district.toLowerCase().includes(search.toLowerCase())
    const matchVerified = !verifiedOnly || p.verificationStatus === "VERIFIED"
    return matchCat && matchSearch && matchVerified
  })

  return (
    <div className="min-h-screen flex flex-col bg-background text-foreground">
      <WeddingHeader />

      <main className="flex-1 container py-10 space-y-8">
        <div className="space-y-2">
          <Badge className="bg-amber-600 text-white font-bold text-[10px]">
            {lang === "so" ? "Hageha Shirkadaha" : "Provider Directory"}
          </Badge>
          <h1 className="text-3xl font-extrabold font-heading">{t.directoryTitle}</h1>
          <p className="text-sm text-muted-foreground max-w-2xl">{t.directorySubtitle}</p>
        </div>

        {/* Filter and Search Bar */}
        <div className="flex flex-col md:flex-row gap-3 items-center justify-between p-4 rounded-xl border bg-card">
          <div className="relative w-full md:w-80">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
            <Input
              placeholder={t.searchPlaceholder}
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              className="pl-9 h-9 text-xs"
            />
          </div>

          <div className="flex flex-wrap items-center gap-2 w-full md:w-auto">
            {categories.map((c) => (
              <Button
                key={c.id}
                variant={selectedCat === c.id ? "default" : "outline"}
                size="sm"
                onClick={() => setSelectedCat(c.id)}
                className={`text-xs h-8 ${
                  selectedCat === c.id ? "bg-amber-600 hover:bg-amber-700 text-white font-semibold" : ""
                }`}
              >
                {c.label}
              </Button>
            ))}

            <Button
              variant={verifiedOnly ? "default" : "outline"}
              size="sm"
              onClick={() => setVerifiedOnly(!verifiedOnly)}
              className={`text-xs h-8 gap-1.5 ${
                verifiedOnly ? "bg-emerald-600 hover:bg-emerald-700 text-white font-semibold" : ""
              }`}
            >
              <ShieldCheck className="h-3.5 w-3.5" />
              <span>{t.filterVerifiedOnly}</span>
            </Button>
          </div>
        </div>

        {/* Results Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filtered.map((provider) => (
            <ProviderCard key={provider.id} provider={provider} lang={lang} />
          ))}
        </div>

        {filtered.length === 0 && (
          <div className="p-12 text-center rounded-xl border bg-muted/20 space-y-2">
            <div className="text-base font-semibold">
              {lang === "so" ? "Shirkad lama helin" : "No providers found"}
            </div>
            <p className="text-xs text-muted-foreground">
              {lang === "so" ? "Isku day inaad beddesho erayada aad raadinayso ama qaybaha." : "Try adjusting your search keywords or category filters."}
            </p>
          </div>
        )}
      </main>

      <WeddingFooter />
    </div>
  )
}
