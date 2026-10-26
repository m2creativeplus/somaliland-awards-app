"use client"

import { useState, useEffect } from "react"
import Link from "next/link"
import { WeddingHeader } from "@/components/weddings/wedding-header"
import { WeddingFooter } from "@/components/weddings/wedding-footer"
import { WeddingStore } from "@/lib/weddings/store"
import { TRANSLATIONS } from "@/lib/weddings/translations"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import {
  Building2,
  Camera,
  Palette,
  UtensilsCrossed,
  Crown,
  ClipboardList,
  Volume2,
  Music,
  ArrowRight,
  ShieldCheck,
} from "lucide-react"

export default function AllCategoriesPage() {
  const [lang, setLang] = useState<"so" | "en">("so")

  useEffect(() => {
    setLang(WeddingStore.getLanguage())
    const handleLang = () => setLang(WeddingStore.getLanguage())
    window.addEventListener("languagechange", handleLang)
    return () => window.removeEventListener("languagechange", handleLang)
  }, [])

  const categories = [
    {
      slug: "venues",
      titleEn: "Venues & Grand Ballrooms",
      titleSo: "Hoolalka & Goobaha Aroosyada",
      descEn: "Luxury climate-controlled wedding halls with VIP suites, generator backup, and banquet seating up to 600 guests.",
      descSo: "Hoolalka ugu casrisan Hargeysa oo leh qaboojiyeyaal, qolalka VIP-da, matoorro xooggan, iyo fadhi ilaa 600 qof ah.",
      icon: Building2,
      count: 14,
      startingPrice: "$1,400",
    },
    {
      slug: "photography",
      titleEn: "Photography & 4K Cinema",
      titleSo: "Sawirrada & Duubista Filimada 4K",
      descEn: "Licensed drone operators, 4K documentary crews, and traditional Nikah & couple golden hour portrait specialists.",
      descSo: "Muuqaal-duubeyaal 4K ah, diyaaradaha drone-ka ee shatiga leh, iyo sawir-qaadeyaal ku xeel-dheer meherka iyo dhaqanka.",
      icon: Camera,
      count: 18,
      startingPrice: "$650",
    },
    {
      slug: "decor",
      titleEn: "Stage Décor & Fresh Florals",
      titleSo: "Naqshadda Masraxa & Ubaxa Dabiiciga ah",
      descEn: "Custom royal loveseats, illuminated monogram stages, mirror carpet walkways, and cascading imported florals.",
      descSo: "Masraxyada boqortooyada, kuraasta xariirta ah, dhabiilaha muraayadda ah ee ifaya, iyo ubaxyada dabiiciga ah.",
      icon: Palette,
      count: 11,
      startingPrice: "$800",
    },
    {
      slug: "catering",
      titleEn: "Catering & Banquet Feasts",
      titleSo: "Cuntada & Casumadaha Sharafta Leh",
      descEn: "Traditional roasted Somali goat, spiced saffron rice, camel milk dessert bars, and uniformed banquet staff.",
      descSo: "Hilib ari oo jilicsan oo duban, bariis saffron udgoon, macmacaan caano geel, iyo shaqaale suxuumada u adeega.",
      icon: UtensilsCrossed,
      count: 9,
      startingPrice: "$1,200",
    },
    {
      slug: "bridal",
      titleEn: "Bridal Henna & Beauty Glamour",
      titleSo: "Xennaanta & Qurxinta Aroosadda",
      descEn: "Private bridal preparation suites, organic henna artistry, Gulf couture veils, and luxury hairstyling.",
      descSo: "Qolalka gaarka ah ee diyaarinta aroosadda, xennaanta dabiiciga ah, timo-habaynta boqortooyada, iyo dharka arooska.",
      icon: Crown,
      count: 12,
      startingPrice: "$350",
    },
    {
      slug: "planners",
      titleEn: "Wedding Planners & Coordinators",
      titleSo: "Qabanqaabada & Maamulka Maalinta",
      descEn: "Turnkey wedding management, minute-by-minute run-sheets, family VIP protocol, and day-of vendor supervision.",
      descSo: "Maamulka buuxa ee arooska, samaynta jadwalka saacadaha, soo gelinta martida sharafta leh, iyo kormeerka shirkadaha.",
      icon: ClipboardList,
      count: 6,
      startingPrice: "$500",
    },
  ]

  return (
    <div className="min-h-screen flex flex-col bg-background text-foreground">
      <WeddingHeader />

      <main className="flex-1 container py-8 sm:py-12 space-y-8">
        <div className="space-y-2.5">
          <Badge className="bg-amber-600 text-white font-bold text-[11px] tracking-wide">
            {lang === "so" ? "Qaybaha Adeegyada Arooska" : "Service Category Directory"}
          </Badge>
          <h1 className="text-3xl sm:text-4xl font-extrabold font-heading text-slate-900 dark:text-white">
            {lang === "so" ? "Dhammaan Qaybaha Ganacsiga ee Aroosyada" : "All Wedding Service Categories in Hargeisa"}
          </h1>
          <p className="text-xs sm:text-sm text-slate-600 dark:text-slate-300 max-w-2xl leading-relaxed">
            {lang === "so"
              ? "Kala dooro qayb kasta si aad u hesho shirkadaha la xaqiijiyay, barbar-dhigto xirmooyinkooda, uguna dirto dalab qiimo dhimis toos ah."
              : "Discover physically verified wedding vendors organized by industry specialization with transparent starting rates."}
          </p>
        </div>

        {/* Categories Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {categories.map((cat) => {
            const Icon = cat.icon
            const title = lang === "so" ? cat.titleSo : cat.titleEn
            const desc = lang === "so" ? cat.descSo : cat.descEn

            return (
              <div
                key={cat.slug}
                className="rounded-2xl border border-slate-200 dark:border-slate-800 bg-card p-6 shadow-xs hover:shadow-md transition-all flex flex-col justify-between space-y-4"
              >
                <div className="space-y-3">
                  <div className="flex items-center justify-between">
                    <div className="h-12 w-12 rounded-xl bg-amber-500/15 text-amber-700 dark:text-amber-400 flex items-center justify-center">
                      <Icon className="h-6 w-6" aria-hidden="true" />
                    </div>
                    <Badge variant="secondary" className="text-xs font-semibold">
                      {cat.count} {lang === "so" ? "Shirkadood" : "Providers"}
                    </Badge>
                  </div>

                  <h2 className="text-xl font-bold font-heading text-slate-900 dark:text-white">
                    {title}
                  </h2>

                  <p className="text-xs text-slate-600 dark:text-slate-300 leading-relaxed">
                    {desc}
                  </p>
                </div>

                <div className="pt-4 border-t border-slate-100 dark:border-slate-800 flex items-center justify-between gap-2">
                  <div className="text-xs">
                    <span className="text-slate-500">{lang === "so" ? "Ka bilaabanta:" : "Starting at:"} </span>
                    <strong className="text-slate-900 dark:text-white font-bold">{cat.startingPrice}</strong>
                  </div>

                  <Button asChild size="sm" className="min-h-[44px] bg-amber-600 hover:bg-amber-700 text-white text-xs font-bold gap-1 px-4">
                    <Link href={`/categories/${cat.slug}`}>
                      <span>{lang === "so" ? "Eeg Shirkadaha" : "View Vendors"}</span>
                      <ArrowRight className="h-3.5 w-3.5" />
                    </Link>
                  </Button>
                </div>
              </div>
            )
          })}
        </div>
      </main>

      <WeddingFooter />
    </div>
  )
}
