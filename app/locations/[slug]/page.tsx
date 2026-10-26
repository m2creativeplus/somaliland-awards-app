"use client"

import { useState, useEffect } from "react"
import { useParams } from "next/navigation"
import Link from "next/link"
import { WeddingHeader } from "@/components/weddings/wedding-header"
import { WeddingFooter } from "@/components/weddings/wedding-footer"
import { ProviderCard } from "@/components/weddings/provider-card"
import { WeddingStore } from "@/lib/weddings/store"
import { Provider } from "@/lib/weddings/types"
import { TRANSLATIONS } from "@/lib/weddings/translations"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { ArrowLeft, MapPin, ShieldCheck, CheckCircle2 } from "lucide-react"

export default function LocationDetailPage() {
  const params = useParams()
  const slug = (params?.slug as string) || "hargeisa"

  const [lang, setLang] = useState<"so" | "en">("so")
  const [providers, setProviders] = useState<Provider[]>([])

  useEffect(() => {
    setLang(WeddingStore.getLanguage())
    // Filter providers that match the city name or have service areas including it
    const all = WeddingStore.getProviders()
    const matched = all.filter(
      (p) =>
        p.city.toLowerCase() === slug.toLowerCase() ||
        p.serviceAreas.some((sa) => sa.toLowerCase() === slug.toLowerCase())
    )
    // If none matched, show all for demonstration
    setProviders(matched.length > 0 ? matched : all)

    const handleLang = () => setLang(WeddingStore.getLanguage())
    window.addEventListener("languagechange", handleLang)
    return () => window.removeEventListener("languagechange", handleLang)
  }, [slug])

  const t = TRANSLATIONS[lang]

  const locationData: Record<string, { en: string; so: string; descEn: string; descSo: string; districts: string[]; verifiedHalls: number }> = {
    hargeisa: {
      en: "Hargeisa — Capital Wedding Hub",
      so: "Hargeysa — Xarunta Guud ee Aroosyada",
      descEn: "Hargeisa represents the central marketplace for high-capacity banquet facilities, luxury bridal ateliers, and cinematic 4K production crews across Sha'ab, 26 June, and Ibrahim Koodbuur districts.",
      descSo: "Hargeysa waa caasimadda iyo xarunta ugu weyn ee xarumaha aroosyada, hoolalka waawayn ee Mansoor iyo Ambassador, iyo shirkadaha naqshadaynta masraxyada.",
      districts: ["Sha'ab", "26 June", "Ibrahim Koodbuur", "Ahmed Dhagax", "Ga'an Libah", "New Hargeisa"],
      verifiedHalls: 48,
    },
    borama: {
      en: "Borama — Awdal Regional Destination",
      so: "Boorama — Gobolka Awdal & Aroosyada Deegaanka",
      descEn: "Known for cooler climate garden weddings, regional university hall celebrations, and cross-border guest logistics.",
      descSo: "Waxaa lagu yaqaannaa goobaha cagaaran, hoolalka jaamacadaha, iyo aroosyada qoysaska ee gobolka Awdal.",
      districts: ["Sheekh Cali Jowhar", "Sheekh Cismaan", "Gargaar"],
      verifiedHalls: 12,
    },
    berbera: {
      en: "Berbera — Sahil Coastal Receptions",
      so: "Berbera — Aroosyada Xeebta Saaxil",
      descEn: "Seaside celebrations, beach-front photography sessions at sunset, and heritage port hotel venues with full air conditioning.",
      descSo: "Aroosyada quruxda badan ee xeebta Berbera, sawirrada qorrax-dhaca badda, iyo hoteellada taariikhiga ah.",
      districts: ["Darole", "Badda", "Marina"],
      verifiedHalls: 15,
    },
    burao: {
      en: "Burao — Togdheer Commercial Center",
      so: "Burco — Xarunta Ganacsiga Togdheer",
      descEn: "Centrally positioned for large family feasts, traditional mutton banquets, and prominent community gatherings.",
      descSo: "Xarunta ganacsiga ee gobolka Togdheer oo caan ku ah casumadaha waaweyn iyo aroosyada dhaqanka.",
      districts: ["Shacabka", "Maxamed Cali", "Oktoobar"],
      verifiedHalls: 10,
    },
  }

  const currentLoc = locationData[slug.toLowerCase()] || {
    en: `${slug.toUpperCase()} Regional Hub`,
    so: `${slug.toUpperCase()} Xarunta Gobolka`,
    descEn: `Verified wedding merchants and service providers operating in ${slug}.`,
    descSo: `Shirkadaha iyo adeegyada aroosyada ee ka diiwaangashan ${slug}.`,
    districts: ["Downtown", "City Center"],
    verifiedHalls: 5,
  }

  return (
    <div className="min-h-screen flex flex-col bg-background text-foreground">
      <WeddingHeader />

      <main className="flex-1 container py-8 sm:py-12 space-y-8">
        <div className="flex items-center gap-2">
          <Button asChild variant="ghost" size="sm" className="min-h-[44px] gap-1.5 text-xs font-semibold">
            <Link href="/locations">
              <ArrowLeft className="h-4 w-4" />
              <span>{lang === "so" ? "Ku noqo Magaalooyinka" : "Back to Locations"}</span>
            </Link>
          </Button>
        </div>

        {/* Location Banner */}
        <div className="rounded-3xl border border-amber-500/30 bg-gradient-to-br from-amber-500/10 via-amber-500/5 to-transparent p-6 sm:p-10 space-y-4">
          <div className="flex flex-wrap items-center gap-2">
            <Badge className="bg-amber-600 text-white font-bold text-[11px] tracking-wide flex items-center gap-1">
              <MapPin className="h-3 w-3" />
              <span>{lang === "so" ? "Magaalada La Kormeeray" : "Verified Municipality"}</span>
            </Badge>
            <Badge variant="outline" className="text-emerald-700 dark:text-emerald-400 border-emerald-500/40 text-[11px] font-bold flex items-center gap-1">
              <ShieldCheck className="h-3 w-3" />
              <span>{currentLoc.verifiedHalls} {lang === "so" ? "Goobood oo La Baaray" : "Audited Venues"}</span>
            </Badge>
          </div>

          <h1 className="text-3xl sm:text-4xl font-extrabold font-heading text-slate-900 dark:text-white">
            {lang === "so" ? currentLoc.so : currentLoc.en}
          </h1>

          <p className="text-sm sm:text-base text-slate-700 dark:text-slate-300 max-w-3xl leading-relaxed">
            {lang === "so" ? currentLoc.descSo : currentLoc.descEn}
          </p>

          <div className="pt-2">
            <div className="text-[11px] font-bold text-slate-500 dark:text-slate-400 uppercase tracking-wider mb-2">
              {lang === "so" ? "Xaafadaha & Degmooyinka Adeeggu Gaadho:" : "Active Districts & Service Zones:"}
            </div>
            <div className="flex flex-wrap gap-2">
              {currentLoc.districts.map((d) => (
                <span key={d} className="px-3 py-1 rounded-full bg-background border border-slate-200 dark:border-slate-800 text-xs font-semibold text-slate-800 dark:text-slate-200 shadow-xs">
                  {d}
                </span>
              ))}
            </div>
          </div>
        </div>

        {/* Active Providers in this location */}
        <div className="space-y-4">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 border-b border-slate-200 dark:border-slate-800 pb-3">
            <div>
              <h2 className="text-xl sm:text-2xl font-bold font-heading text-slate-900 dark:text-white">
                {lang === "so" ? "Shirkadaha Ka Shaqeeya Goobtan" : "Merchants Serving this Region"}
              </h2>
              <p className="text-xs text-slate-500">
                {lang === "so"
                  ? "Dhammaan shirkadahan waxaa xaqiijisay M2 Creative & SNPA."
                  : "All businesses physically audited for license, power redundancy, and quality."}
              </p>
            </div>
            <div className="text-xs font-bold text-slate-500">
              {providers.length} {lang === "so" ? "shirkadood ayaa la helay" : "providers found"}
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {providers.map((provider) => (
              <ProviderCard key={provider.id} provider={provider} />
            ))}
          </div>
        </div>
      </main>

      <WeddingFooter />
    </div>
  )
}
