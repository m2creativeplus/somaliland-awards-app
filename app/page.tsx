"use client"

import { useState, useEffect } from "react"
import Link from "next/link"
import { WeddingHeader } from "@/components/weddings/wedding-header"
import { WeddingFooter } from "@/components/weddings/wedding-footer"
import { ProviderCard } from "@/components/weddings/provider-card"
import { PublicEventCard } from "@/components/weddings/public-event-card"
import { ResourceTemplateCard } from "@/components/weddings/resource-template-card"
import { MarketIntelligenceDashboard } from "@/components/weddings/market-intelligence-dashboard"
import { WeddingStore, BrandingSettings } from "@/lib/weddings/store"
import { HARGEISA_PROVIDERS, PUBLIC_EVENTS, RESOURCE_TEMPLATES } from "@/lib/weddings/mock-data"
import { TRANSLATIONS } from "@/lib/weddings/translations"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Badge } from "@/components/ui/badge"
import {
  Search,
  Sparkles,
  ShieldCheck,
  CheckCircle2,
  Calendar,
  Users,
  DollarSign,
  ArrowRight,
  Building2,
  Camera,
  Palette,
  UtensilsCrossed,
  Crown,
  ClipboardList,
  Flame,
  Award,
} from "lucide-react"

export default function WeddingsHomePage() {
  const [lang, setLang] = useState<"so" | "en">("so")
  const [branding, setBranding] = useState<BrandingSettings | null>(null)
  const [selectedCategory, setSelectedCategory] = useState<string>("all")
  const [searchQuery, setSearchQuery] = useState("")

  useEffect(() => {
    setLang(WeddingStore.getLanguage())
    setBranding(WeddingStore.getBranding())

    const handleLangChange = () => {
      setLang(WeddingStore.getLanguage())
    }
    window.addEventListener("languagechange", handleLangChange)
    return () => window.removeEventListener("languagechange", handleLangChange)
  }, [])

  const t = TRANSLATIONS[lang]
  const providers = HARGEISA_PROVIDERS

  const categoryChips = [
    { id: "all", label: t.catAll, icon: Sparkles },
    { id: "venues", label: t.catVenues, icon: Building2 },
    { id: "photography", label: t.catPhotography, icon: Camera },
    { id: "decor", label: t.catDecor, icon: Palette },
    { id: "catering", label: t.catCatering, icon: UtensilsCrossed },
    { id: "bridal", label: t.catBridal, icon: Crown },
    { id: "planners", label: t.catPlanners, icon: ClipboardList },
  ]

  const filteredProviders = providers.filter((p) => {
    const matchesCat = selectedCategory === "all" || p.category === selectedCategory
    const name = lang === "so" ? p.businessNameSo : p.businessNameEn
    const matchesSearch =
      searchQuery === "" ||
      name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      p.district.toLowerCase().includes(searchQuery.toLowerCase())
    return matchesCat && matchesSearch
  })

  return (
    <div className="min-h-screen flex flex-col bg-background text-foreground">
      <WeddingHeader />

      <main className="flex-1">
        {/* Government / Awards Platform Integration Banner */}
        <div className="bg-emerald-950 text-emerald-100 text-xs py-2 px-4 border-b border-emerald-900/50">
          <div className="container flex flex-wrap items-center justify-between gap-2">
            <div className="flex items-center gap-2">
              <span className="h-2 w-2 rounded-full bg-emerald-400 animate-pulse" />
              <span>
                {lang === "so"
                  ? "Madasha Rasmiga ah ee Aroosyada Somaliland · Waxaa Maamula M2 Creative"
                  : "Official Somaliland Weddings Platform · Operated by M2 Creative & Consulting"}
              </span>
            </div>
            <div className="flex items-center gap-3">
              <Link href="/library" className="underline hover:text-emerald-300 font-medium flex items-center gap-1">
                <Award className="h-3 w-3" />
                <span>{lang === "so" ? "Maktabadda Hiddaha & Naqshadaha" : "National Brand Awards & Assets"}</span>
              </Link>
            </div>
          </div>
        </div>

        {/* Hero Section */}
        <section className="relative overflow-hidden py-16 md:py-24 bg-gradient-to-b from-amber-500/10 via-background to-background">
          <div className="container relative z-10 max-w-5xl text-center space-y-6">
            <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-amber-500/15 border border-amber-500/30 text-amber-800 dark:text-amber-300 text-xs font-semibold shadow-xs">
              <Sparkles className="h-3.5 w-3.5 text-amber-600" />
              <span>{t.heroBadge}</span>
            </div>

            <h1 className="text-4xl md:text-6xl font-extrabold font-heading tracking-tight text-foreground leading-[1.15]">
              {t.heroTitle}
            </h1>

            <p className="text-base md:text-lg text-muted-foreground max-w-2xl mx-auto leading-relaxed">
              {t.heroSubtitle}
            </p>

            {/* Quick Action CTAs */}
            <div className="flex flex-wrap items-center justify-center gap-3 pt-2">
              <Button asChild size="lg" className="bg-amber-600 hover:bg-amber-700 text-white font-semibold text-sm shadow-md gap-2">
                <Link href="/providers">
                  <span>{t.heroCtaFind}</span>
                  <ArrowRight className="h-4 w-4" />
                </Link>
              </Button>
              <Button asChild variant="outline" size="lg" className="text-sm font-semibold border-amber-600/30 hover:bg-amber-500/10 gap-2">
                <Link href="/packages/compare">
                  <span>{t.heroCtaCompare}</span>
                </Link>
              </Button>
              <Button asChild variant="secondary" size="lg" className="text-sm font-semibold gap-2">
                <Link href="/plan">
                  <ClipboardList className="h-4 w-4 text-amber-600" />
                  <span>{t.heroCtaPlan}</span>
                </Link>
              </Button>
            </div>

            {/* Live Search Bar */}
            <div className="pt-8 max-w-3xl mx-auto">
              <div className="p-2 sm:p-3 rounded-2xl border bg-card/90 backdrop-blur shadow-lg flex flex-col sm:flex-row gap-2">
                <div className="relative flex-1">
                  <Search className="absolute left-3.5 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                  <Input
                    placeholder={t.searchPlaceholder}
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                    className="pl-10 h-11 text-xs sm:text-sm border-0 bg-transparent focus-visible:ring-0"
                  />
                </div>
                <Button className="bg-amber-600 hover:bg-amber-700 text-white h-11 px-6 font-semibold shrink-0 gap-2">
                  <Search className="h-4 w-4" />
                  <span>{lang === "so" ? "Raadi" : "Search"}</span>
                </Button>
              </div>
            </div>

            {/* Stats row */}
            <div className="pt-10 grid grid-cols-2 md:grid-cols-4 gap-4 max-w-4xl mx-auto text-left">
              <div className="p-4 rounded-xl border bg-card shadow-xs">
                <div className="text-2xl font-bold font-heading text-foreground">48</div>
                <div className="text-xs text-muted-foreground mt-0.5">{t.statProviders}</div>
              </div>
              <div className="p-4 rounded-xl border bg-card shadow-xs">
                <div className="text-2xl font-bold font-heading text-foreground">6</div>
                <div className="text-xs text-muted-foreground mt-0.5">{t.statCategories}</div>
              </div>
              <div className="p-4 rounded-xl border bg-card shadow-xs">
                <div className="text-2xl font-bold font-heading text-foreground">2.4h</div>
                <div className="text-xs text-muted-foreground mt-0.5">{t.statAvgLeadTime}</div>
              </div>
              <div className="p-4 rounded-xl border bg-card shadow-xs">
                <div className="text-2xl font-bold font-heading text-emerald-600 flex items-center gap-1">
                  <ShieldCheck className="h-5 w-5" />
                  <span>100%</span>
                </div>
                <div className="text-xs text-muted-foreground mt-0.5">{t.statVerifiedBadge}</div>
              </div>
            </div>
          </div>
        </section>

        {/* Category Pills & Verified Directory Showcase */}
        <section className="py-12 border-t bg-muted/20">
          <div className="container space-y-8">
            <div className="flex flex-col md:flex-row md:items-end justify-between gap-4">
              <div className="space-y-1">
                <Badge variant="outline" className="text-amber-700 dark:text-amber-400 border-amber-600/30 text-[11px] font-semibold">
                  {lang === "so" ? "Shirkadaha La Hubiyay" : "Verified Merchants"}
                </Badge>
                <h2 className="text-2xl md:text-3xl font-bold font-heading">
                  {t.directoryTitle}
                </h2>
                <p className="text-xs md:text-sm text-muted-foreground">
                  {t.directorySubtitle}
                </p>
              </div>

              <Button asChild variant="outline" size="sm" className="text-xs h-9 gap-1 font-semibold">
                <Link href="/providers">
                  <span>{lang === "so" ? "Eeg Dhammaan Shirkadaha" : "Browse All Providers"}</span>
                  <ArrowRight className="h-3.5 w-3.5" />
                </Link>
              </Button>
            </div>

            {/* Category selection */}
            <div className="flex flex-wrap items-center gap-2">
              {categoryChips.map((chip) => {
                const Icon = chip.icon
                const isSelected = selectedCategory === chip.id
                return (
                  <Button
                    key={chip.id}
                    variant={isSelected ? "default" : "outline"}
                    size="sm"
                    onClick={() => setSelectedCategory(chip.id)}
                    className={`h-9 gap-2 text-xs font-medium ${
                      isSelected
                        ? "bg-amber-600 hover:bg-amber-700 text-white font-semibold shadow-xs"
                        : "hover:bg-muted text-muted-foreground"
                    }`}
                  >
                    <Icon className="h-3.5 w-3.5" />
                    <span>{chip.label}</span>
                  </Button>
                )
              })}
            </div>

            {/* Providers Grid */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {filteredProviders.slice(0, 6).map((provider) => (
                <ProviderCard key={provider.id} provider={provider} lang={lang} />
              ))}
            </div>
          </div>
        </section>

        {/* Featured Public Events Showcase */}
        <section className="py-12 border-t">
          <div className="container space-y-6">
            <div className="flex flex-col md:flex-row md:items-end justify-between gap-4">
              <div className="space-y-1">
                <Badge className="bg-amber-600 text-white text-[10px] font-bold">
                  {lang === "so" ? "Xafladaha & Bandhigyada Guud" : "Public Expos & Showcases"}
                </Badge>
                <h2 className="text-2xl font-bold font-heading">
                  {lang === "so" ? "Bandhigyada Aroosyada ee Hargeysa" : "Upcoming Somaliland Wedding Expos"}
                </h2>
                <p className="text-xs text-muted-foreground">
                  {lang === "so" ? "Munaasabadaha guud ee lagu barto shirkadaha laguna helo qiimo dhimista gaarka ah." : "Meet verified merchants, watch live bridal runway shows, and access exclusive platform booking discounts."}
                </p>
              </div>

              <Button asChild variant="outline" size="sm" className="text-xs h-9">
                <Link href="/events">{lang === "so" ? "Dhammaan Xafladaha" : "View All Events"}</Link>
              </Button>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
              {PUBLIC_EVENTS.map((evt) => (
                <PublicEventCard key={evt.id} event={evt} lang={lang} />
              ))}
            </div>
          </div>
        </section>

        {/* Free Reusable Wedding Templates */}
        <section className="py-12 border-t bg-muted/20">
          <div className="container space-y-6">
            <div className="flex flex-col md:flex-row md:items-end justify-between gap-4">
              <div className="space-y-1">
                <Badge variant="outline" className="text-amber-700 dark:text-amber-400 border-amber-600/30 text-[10px] font-bold">
                  {lang === "so" ? "Foomam & Xisaabiyeyaal Bilaash ah" : "Free Planning Assets"}
                </Badge>
                <h2 className="text-2xl font-bold font-heading">{t.resourcesTitle}</h2>
                <p className="text-xs text-muted-foreground">{t.resourcesSubtitle}</p>
              </div>

              <Button asChild variant="outline" size="sm" className="text-xs h-9">
                <Link href="/resources">{lang === "so" ? "Eeg Dhammaan Kheyraadka (15)" : "Browse All 15 Templates"}</Link>
              </Button>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {RESOURCE_TEMPLATES.slice(0, 3).map((template) => (
                <ResourceTemplateCard key={template.id} template={template} lang={lang} />
              ))}
            </div>
          </div>
        </section>

        {/* Market Intelligence Preview */}
        <section className="py-12 border-t">
          <div className="container space-y-6">
            <div className="space-y-1">
              <Badge className="bg-emerald-600 text-white text-[10px] font-bold">
                {lang === "so" ? "Xogta & Tirakoobka Rasmiga ah" : "Market Intelligence"}
              </Badge>
              <h2 className="text-2xl font-bold font-heading">{t.insightsTitle}</h2>
              <p className="text-xs text-muted-foreground">{t.insightsSubtitle}</p>
            </div>

            <MarketIntelligenceDashboard lang={lang} />
          </div>
        </section>

        {/* Provider Onboarding CTA */}
        <section className="py-16 border-t bg-gradient-to-r from-amber-700 via-amber-600 to-amber-800 text-white">
          <div className="container max-w-4xl text-center space-y-5">
            <Badge className="bg-white/20 text-white border-0 text-xs font-semibold backdrop-blur">
              {lang === "so" ? "Ma leedahay Hool, Sawir-qaade, ama Cunto-kariye?" : "Are You a Wedding Service Provider?"}
            </Badge>
            <h2 className="text-3xl md:text-4xl font-extrabold font-heading">
              {lang === "so"
                ? "Diiwaangeli Ganacsigaaga oo Hel Macaamiil La Xaqiijiyay"
                : "List Your Business & Receive Qualified Wedding Inquiries"}
            </h2>
            <p className="text-sm md:text-base text-amber-100 max-w-2xl mx-auto leading-relaxed">
              {lang === "so"
                ? "Ku biir madasha koowaad ee aroosyada Somaliland. Hel bog gaar ah, soo bandhig xirmooyinkaaga, kuna hel dalabaadka tooska ah WhatsApp-kaaga."
                : "Join Somaliland's premier wedding ecosystem. Claim your professional storefront, publish packages, and manage bookings with complete independence."}
            </p>
            <div className="pt-2 flex flex-wrap justify-center gap-3">
              <Button asChild size="lg" className="bg-white text-amber-900 hover:bg-amber-50 font-bold text-sm shadow-md">
                <Link href="/admin/settings">{lang === "so" ? "Ku Biir Ganacsi Ahaan" : "Register Your Business"}</Link>
              </Button>
              <Button asChild variant="outline" size="lg" className="border-white/40 text-white hover:bg-white/10 text-sm font-semibold">
                <Link href="/guidelines">{lang === "so" ? "Akhriso Xeerarka" : "View Merchant Standards"}</Link>
              </Button>
            </div>
          </div>
        </section>
      </main>

      <WeddingFooter />
    </div>
  )
}
