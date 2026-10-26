"use client"

import { useState, useEffect, Suspense } from "react"
import { useSearchParams } from "next/navigation"
import Link from "next/link"
import { WeddingHeader } from "@/components/weddings/wedding-header"
import { WeddingFooter } from "@/components/weddings/wedding-footer"
import { ProviderCard } from "@/components/weddings/provider-card"
import { WeddingStore } from "@/lib/weddings/store"
import { Provider } from "@/lib/weddings/types"
import { TRANSLATIONS } from "@/lib/weddings/translations"
import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Search, Filter, ShieldCheck, MapPin, DollarSign, Calendar, Users, RefreshCw } from "lucide-react"

function SearchContent() {
  const searchParams = useSearchParams()
  const initialQuery = searchParams.get("q") || ""

  const [lang, setLang] = useState<"so" | "en">("so")
  const [providers, setProviders] = useState<Provider[]>([])
  const [query, setQuery] = useState(initialQuery)
  const [selectedCity, setSelectedCity] = useState("all")
  const [selectedCat, setSelectedCat] = useState("all")
  const [maxBudget, setMaxBudget] = useState(5000)
  const [verifiedOnly, setVerifiedOnly] = useState(false)

  useEffect(() => {
    setLang(WeddingStore.getLanguage())
    setProviders(WeddingStore.getProviders())

    const handleLang = () => setLang(WeddingStore.getLanguage())
    window.addEventListener("languagechange", handleLang)
    return () => window.removeEventListener("languagechange", handleLang)
  }, [])

  const t = TRANSLATIONS[lang]

  const filtered = providers.filter((p) => {
    const name = lang === "so" ? p.businessNameSo : p.businessNameEn
    const matchQuery =
      query === "" ||
      name.toLowerCase().includes(query.toLowerCase()) ||
      p.district.toLowerCase().includes(query.toLowerCase()) ||
      p.category.toLowerCase().includes(query.toLowerCase())
    const matchCity = selectedCity === "all" || p.city.toLowerCase() === selectedCity.toLowerCase()
    const matchCat = selectedCat === "all" || p.category === selectedCat
    const matchBudget = p.startingPriceUsd <= maxBudget
    const matchVerified = !verifiedOnly || p.verificationStatus === "VERIFIED"

    return matchQuery && matchCity && matchCat && matchBudget && matchVerified
  })

  return (
    <main className="flex-1 container py-8 sm:py-12 space-y-8">
      <div className="space-y-2.5">
        <Badge className="bg-amber-600 text-white font-bold text-[11px] tracking-wide">
          {lang === "so" ? "Natiijada Raadinta" : "Marketplace Search Engine"}
        </Badge>
        <h1 className="text-3xl sm:text-4xl font-extrabold font-heading text-slate-900 dark:text-white">
          {lang === "so" ? "Raadi Shirkadaha & Xirmooyinka Hargeysa" : "Search Hargeisa Wedding Providers & Packages"}
        </h1>
        <p className="text-xs sm:text-sm text-slate-600 dark:text-slate-300 max-w-2xl leading-relaxed">
          {lang === "so"
            ? "Ku shaandhee magaalada, qaybta, miisaaniyadda, iyo heerka hubinta si aad u hesho adeegga kugu habboon."
            : "Filter by city, category, guest budget, and in-person verification status."}
        </p>
      </div>

      {/* Search Controls Card */}
      <div className="p-6 rounded-2xl border border-slate-200 dark:border-slate-800 bg-card shadow-xs space-y-4">
        <div className="relative">
          <Search className="absolute left-3.5 top-1/2 -translate-y-1/2 h-4 w-4 text-slate-400" />
          <Input
            type="search"
            placeholder={t.searchPlaceholder}
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            className="pl-10 h-12 text-sm rounded-xl border-slate-300 dark:border-slate-700"
          />
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-3 text-xs">
          {/* City */}
          <div className="space-y-1.5">
            <label className="font-semibold text-slate-700 dark:text-slate-300">{lang === "so" ? "Magaalada" : "City"}</label>
            <select
              value={selectedCity}
              onChange={(e) => setSelectedCity(e.target.value)}
              className="w-full min-h-[44px] rounded-lg border border-slate-300 dark:border-slate-700 bg-background px-3 text-xs"
            >
              <option value="all">{lang === "so" ? "Dhammaan Magaalooyinka" : "All Cities"}</option>
              <option value="hargeisa">Hargeisa (Caasimadda)</option>
              <option value="borama">Borama</option>
              <option value="berbera">Berbera</option>
              <option value="burao">Burao</option>
            </select>
          </div>

          {/* Category */}
          <div className="space-y-1.5">
            <label className="font-semibold text-slate-700 dark:text-slate-300">{lang === "so" ? "Qaybta" : "Category"}</label>
            <select
              value={selectedCat}
              onChange={(e) => setSelectedCat(e.target.value)}
              className="w-full min-h-[44px] rounded-lg border border-slate-300 dark:border-slate-700 bg-background px-3 text-xs"
            >
              <option value="all">{lang === "so" ? "Dhammaan Qaybaha" : "All Categories"}</option>
              <option value="venues">{t.catVenues}</option>
              <option value="photography">{t.catPhotography}</option>
              <option value="decor">{t.catDecor}</option>
              <option value="catering">{t.catCatering}</option>
              <option value="bridal">{t.catBridal}</option>
              <option value="planners">{t.catPlanners}</option>
            </select>
          </div>

          {/* Max Budget */}
          <div className="space-y-1.5">
            <div className="flex justify-between font-semibold text-slate-700 dark:text-slate-300">
              <span>{lang === "so" ? "Kharashka Ugu Badan" : "Max Starting Budget"}</span>
              <span className="text-amber-600">${maxBudget}</span>
            </div>
            <input
              type="range"
              min="300"
              max="5000"
              step="100"
              value={maxBudget}
              onChange={(e) => setMaxBudget(parseInt(e.target.value))}
              className="w-full accent-amber-600 cursor-pointer min-h-[44px]"
            />
          </div>

          {/* Verified Only Toggle */}
          <div className="space-y-1.5 flex flex-col justify-end">
            <Button
              variant={verifiedOnly ? "default" : "outline"}
              onClick={() => setVerifiedOnly(!verifiedOnly)}
              className={`min-h-[44px] text-xs font-bold gap-1.5 w-full ${
                verifiedOnly ? "bg-emerald-600 hover:bg-emerald-700 text-white" : ""
              }`}
            >
              <ShieldCheck className="h-4 w-4" />
              <span>{lang === "so" ? "La Xaqiijiyay Keliya" : "Verified Merchants Only"}</span>
            </Button>
          </div>
        </div>
      </div>

      {/* Results Info Bar */}
      <div className="flex items-center justify-between text-xs text-slate-600 dark:text-slate-400">
        <span>
          {lang === "so" ? "Waxaa la helay" : "Showing"}{" "}
          <strong className="text-slate-900 dark:text-white font-bold">{filtered.length}</strong>{" "}
          {lang === "so" ? "shirkadood oo la xaqiijiyay" : "verified merchants matching criteria"}
        </span>

        {(query || selectedCity !== "all" || selectedCat !== "all" || verifiedOnly) && (
          <Button
            variant="ghost"
            size="sm"
            onClick={() => {
              setQuery("")
              setSelectedCity("all")
              setSelectedCat("all")
              setVerifiedOnly(false)
              setMaxBudget(5000)
            }}
            className="min-h-[44px] text-xs text-amber-600 hover:text-amber-700 gap-1"
          >
            <RefreshCw className="h-3.5 w-3.5" />
            <span>{lang === "so" ? "Dib u celi shaandhada" : "Reset Filters"}</span>
          </Button>
        )}
      </div>

      {/* Results Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {filtered.map((provider) => (
          <ProviderCard key={provider.id} provider={provider} lang={lang} />
        ))}
      </div>

      {filtered.length === 0 && (
        <div className="p-12 text-center rounded-2xl border border-dashed border-slate-300 dark:border-slate-800 space-y-3">
          <p className="text-base font-semibold text-slate-700 dark:text-slate-300">
            {lang === "so" ? "Shirkad kuma habboona shaandhadaada" : "No providers matched your search filters"}
          </p>
          <p className="text-xs text-slate-500">
            {lang === "so" ? "Fadlan kordhi miisaaniyadda ama ka saar magaalada." : "Try expanding your budget range or removing location constraints."}
          </p>
        </div>
      )}
    </main>
  )
}

export default function GlobalSearchPage() {
  return (
    <div className="min-h-screen flex flex-col bg-background text-foreground">
      <WeddingHeader />
      <Suspense fallback={<div className="container py-12 text-center text-sm text-slate-500">Loading verified providers...</div>}>
        <SearchContent />
      </Suspense>
      <WeddingFooter />
    </div>
  )
}
