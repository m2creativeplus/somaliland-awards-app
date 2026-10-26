"use client"

import { useState, useEffect } from "react"
import Link from "next/link"
import { WeddingHeader } from "@/components/weddings/wedding-header"
import { WeddingFooter } from "@/components/weddings/wedding-footer"
import { WeddingStore } from "@/lib/weddings/store"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { MapPin, ArrowRight, ShieldCheck, CheckCircle2 } from "lucide-react"

export default function ServiceLocationsPage() {
  const [lang, setLang] = useState<"so" | "en">("so")

  useEffect(() => {
    setLang(WeddingStore.getLanguage())
    const handleLang = () => setLang(WeddingStore.getLanguage())
    window.addEventListener("languagechange", handleLang)
    return () => window.removeEventListener("languagechange", handleLang)
  }, [])

  const cities = [
    {
      slug: "hargeisa",
      nameEn: "Hargeisa (Capital)",
      nameSo: "Hargeysa (Caasimadda)",
      descEn: "Primary launch market with 48 physically verified banquet halls, 4K cinema studios, and floral decorators across Sha'ab, 26 June, and Koodbuur districts.",
      descSo: "Suuqa ugu weyn ee leh 48 shirkadood oo la kormeeray: Hoolalka Mansoor & Ambassador, Guryo-Samo Visuals, iyo Xariir Décor.",
      status: "ACTIVE & AUDITED",
      providersCount: 48,
      districts: ["Sha'ab", "26 June", "Ibrahim Koodbuur", "Ahmed Dhagax", "Ga'an Libah", "New Hargeisa"],
    },
    {
      slug: "borama",
      nameEn: "Borama (Awdal)",
      nameSo: "Boorama (Awdal)",
      descEn: "Verified coverage for destination garden weddings, university halls, and regional photography crews.",
      descSo: "Adeegyada aroosyada ee gobolka Awdal, hoolalka jaamacadaha, iyo sawir-qaadayaasha gobolka.",
      status: "REGIONAL COVERAGE",
      providersCount: 12,
      districts: ["Sh. Cali Jowhar", "Sh. Cismaan", "Gargaar"],
    },
    {
      slug: "berbera",
      nameEn: "Berbera (Sahil Coast)",
      nameSo: "Berbera (Xeebta Saaxil)",
      descEn: "Coastal seaside wedding receptions, beach photography sessions, and heritage port hotel venues.",
      descSo: "Aroosyada xeebta Berbera, sawirrada qorrax-dhaca badda, iyo hoolalka hoteellada taariikhiga ah.",
      status: "ACTIVE COVERAGE",
      providersCount: 15,
      districts: ["Darole", "Badda", "Marina"],
    },
    {
      slug: "burao",
      nameEn: "Burao (Togdheer)",
      nameSo: "Burco (Togdheer)",
      descEn: "Central wedding commercial hub with expanding coverage for traditional feasts and large tribal celebrations.",
      descSo: "Xarunta ganacsiga ee gobolka Togdheer oo leh adeegyada cuntada, hoolalka waaweyn, iyo dhaqanka.",
      status: "EXPANDING PILOT",
      providersCount: 10,
      districts: ["Shacabka", "Maxamed Cali", "Oktoobar"],
    },
  ]

  return (
    <div className="min-h-screen flex flex-col bg-background text-foreground">
      <WeddingHeader />

      <main className="flex-1 container py-8 sm:py-12 space-y-8">
        <div className="space-y-2.5">
          <Badge className="bg-amber-600 text-white font-bold text-[11px] tracking-wide">
            {lang === "so" ? "Gobollada & Magaalooyinka" : "Service Coverage Areas"}
          </Badge>
          <h1 className="text-3xl sm:text-4xl font-extrabold font-heading text-slate-900 dark:text-white">
            {lang === "so" ? "Magaalooyinka Somaliland ee Adeegyadu Ka Shaqeeyaan" : "Verified Wedding Service Areas Across Somaliland"}
          </h1>
          <p className="text-xs sm:text-sm text-slate-600 dark:text-slate-300 max-w-2xl leading-relaxed">
            {lang === "so"
              ? "Kala dooro magaaladaada si aad u hesho shirkadaha u dhow goobtaada iyo xirmooyinka kharashka safarku ku jiro."
              : "Explore audited merchants by municipality with verified travel policies and local venue networks."}
          </p>
        </div>

        {/* Cities Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {cities.map((city) => (
            <div
              key={city.slug}
              className="rounded-2xl border border-slate-200 dark:border-slate-800 bg-card p-6 sm:p-7 shadow-xs hover:shadow-md transition-all flex flex-col justify-between space-y-4"
            >
              <div className="space-y-3">
                <div className="flex items-center justify-between gap-2">
                  <div className="flex items-center gap-2">
                    <div className="h-9 w-9 rounded-lg bg-amber-500/15 text-amber-700 dark:text-amber-400 flex items-center justify-center shrink-0">
                      <MapPin className="h-5 w-5" aria-hidden="true" />
                    </div>
                    <h2 className="text-xl font-bold font-heading text-slate-900 dark:text-white">
                      {lang === "so" ? city.nameSo : city.nameEn}
                    </h2>
                  </div>

                  <Badge className="bg-emerald-600 text-white text-[10px] font-bold">
                    {city.status}
                  </Badge>
                </div>

                <p className="text-xs sm:text-sm text-slate-600 dark:text-slate-300 leading-relaxed">
                  {lang === "so" ? city.descSo : city.descEn}
                </p>

                <div className="pt-2">
                  <div className="text-[11px] font-bold text-slate-400 uppercase tracking-wider mb-2">
                    {lang === "so" ? "Xaafadaha Ugu Muhiimsan:" : "Districts & Neighborhoods:"}
                  </div>
                  <div className="flex flex-wrap gap-1.5">
                    {city.districts.map((d) => (
                      <span key={d} className="px-2.5 py-1 rounded-md bg-slate-100 dark:bg-slate-800 text-[11px] font-semibold text-slate-700 dark:text-slate-200">
                        {d}
                      </span>
                    ))}
                  </div>
                </div>
              </div>

              <div className="pt-4 border-t border-slate-100 dark:border-slate-800 flex items-center justify-between gap-2">
                <div className="text-xs text-slate-500">
                  <strong className="text-slate-900 dark:text-white">{city.providersCount}</strong> {lang === "so" ? "shirkadood oo la baaray" : "audited merchants"}
                </div>

                <Button asChild size="sm" className="min-h-[44px] bg-amber-600 hover:bg-amber-700 text-white text-xs font-bold gap-1 px-4">
                  <Link href={`/providers?city=${city.slug}`}>
                    <span>{lang === "so" ? "Eeg Shirkadaha" : "View Providers"}</span>
                    <ArrowRight className="h-3.5 w-3.5" />
                  </Link>
                </Button>
              </div>
            </div>
          ))}
        </div>
      </main>

      <WeddingFooter />
    </div>
  )
}
