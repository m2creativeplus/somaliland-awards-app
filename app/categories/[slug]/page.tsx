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
import { ArrowLeft, ShieldCheck } from "lucide-react"

export default function CategoryLandingPage() {
  const params = useParams()
  const slug = params?.slug as string

  const [lang, setLang] = useState<"so" | "en">("so")
  const [providers, setProviders] = useState<Provider[]>([])

  useEffect(() => {
    setLang(WeddingStore.getLanguage())
    setProviders(WeddingStore.getProviders().filter((p) => p.category === slug))

    const handleLang = () => setLang(WeddingStore.getLanguage())
    window.addEventListener("languagechange", handleLang)
    return () => window.removeEventListener("languagechange", handleLang)
  }, [slug])

  const t = TRANSLATIONS[lang]

  const categoryTitles: Record<string, { en: string; so: string; descEn: string; descSo: string }> = {
    venues: {
      en: "Venues & Grand Ballrooms",
      so: "Hoolalka & Goobaha Aroosyada ee Hargeysa",
      descEn: "Top-rated banquet ballrooms with verified capacity up to 600 guests, VIP suites, and power generators.",
      descSo: "Hoolalka ugu caansan uguna ballaadhan Hargeysa oo leh qaboojiye, qolalka VIP-da, iyo ammaan sugan.",
    },
    photography: {
      en: "Wedding Photography & 4K Cinema",
      so: "Sawirrada & Duubista Filimada 4K",
      descEn: "Verified wedding cinematographers, licensed drone aerial operators, and traditional portrait artists.",
      descSo: "Xirfadlayaasha sawirrada iyo filimada 4K ee Hargeysa, duubista diyaaradaha yar-yar, iyo meherka.",
    },
    decor: {
      en: "Stage Décor & Fresh Florals",
      so: "Naqshadda Masraxa & Ubaxa Dabiiciga ah",
      descEn: "Bespoke stage styling, royal loveseats, and fresh floral arches in Hargeisa.",
      descSo: "Naqshadaynta masraxyada boqortooyada, kuraasta xariirta ah, iyo ubaxa cusub.",
    },
    catering: {
      en: "Catering & Banquet Feasts",
      so: "Cuntada & Casumadaha Sharafta Leh",
      descEn: "Traditional Somali mutton banquets, saffron rice, and full service waitstaff.",
      descSo: "Cuntada macaan ee aroosyada: hilib ari oo duban, bariis saffron, iyo shaqaale xirfad leh.",
    },
    bridal: {
      en: "Bridal Henna & Beauty Glamour",
      so: "Xennaanta & Qurxinta Aroosadda",
      descEn: "Private bridal suites, organic henna artists, and hair styling in Hargeisa.",
      descSo: "Xarunta diyaarinta aroosadda, xennaanta dabiiciga ah, iyo qurxinta casriga ah.",
    },
    planners: {
      en: "Wedding Planners & Coordinators",
      so: "Qabanqaabada & Maamulka Munaasabadaha",
      descEn: "Full-day wedding coordination, run sheets, and vendor management.",
      descSo: "Qabanqaabada buuxda ee maalinta arooska, samaynta jadwalka saacadaha, iyo xallinta wax kasta.",
    },
  }

  const catMeta = categoryTitles[slug] || {
    en: slug.toUpperCase(),
    so: slug.toUpperCase(),
    descEn: "Verified providers in this category.",
    descSo: "Shirkadaha la xaqiijiyay ee qaybtan.",
  }

  const title = lang === "so" ? catMeta.so : catMeta.en
  const desc = lang === "so" ? catMeta.descSo : catMeta.descEn

  return (
    <div className="min-h-screen flex flex-col bg-background text-foreground">
      <WeddingHeader />

      <main className="flex-1 container py-8 sm:py-12 space-y-8">
        <div className="flex items-center gap-2">
          <Button asChild variant="ghost" size="sm" className="min-h-[44px] gap-1.5 text-xs font-semibold">
            <Link href="/categories">
              <ArrowLeft className="h-4 w-4" />
              <span>{lang === "so" ? "Dib ugu noqo Qaybaha" : "Back to Categories"}</span>
            </Link>
          </Button>
        </div>

        <div className="space-y-2.5">
          <div className="flex items-center gap-2">
            <Badge className="bg-amber-600 text-white font-bold text-[11px] uppercase">
              {slug}
            </Badge>
            <Badge variant="outline" className="border-emerald-600/40 text-emerald-700 dark:text-emerald-400 font-semibold text-[11px] gap-1">
              <ShieldCheck className="h-3.5 w-3.5" />
              <span>{providers.length} {lang === "so" ? "La Xaqiijiyay" : "Verified Merchants"}</span>
            </Badge>
          </div>

          <h1 className="text-2xl sm:text-4xl font-extrabold font-heading text-slate-900 dark:text-white">
            {title}
          </h1>

          <p className="text-xs sm:text-sm text-slate-600 dark:text-slate-300 max-w-2xl leading-relaxed">
            {desc}
          </p>
        </div>

        {/* Providers Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 pt-2">
          {providers.map((prov) => (
            <ProviderCard key={prov.id} provider={prov} lang={lang} />
          ))}
        </div>

        {providers.length === 0 && (
          <div className="p-12 text-center rounded-2xl border border-dashed border-slate-300 dark:border-slate-800 space-y-3">
            <p className="text-sm font-semibold text-slate-700 dark:text-slate-300">
              {lang === "so" ? "Shirkado cusub ayaa hadda ku jira baaritaan goobeed." : "New merchants in this category are undergoing in-person verification."}
            </p>
            <Button asChild variant="outline" className="min-h-[44px]">
              <Link href="/providers">{lang === "so" ? "Eeg Dhammaan Shirkadaha" : "Browse All Providers"}</Link>
            </Button>
          </div>
        )}
      </main>

      <WeddingFooter />
    </div>
  )
}
