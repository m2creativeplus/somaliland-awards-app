"use client"

import { useState, useEffect } from "react"
import { WeddingHeader } from "@/components/weddings/wedding-header"
import { WeddingFooter } from "@/components/weddings/wedding-footer"
import { PublicEventCard } from "@/components/weddings/public-event-card"
import { WeddingStore } from "@/lib/weddings/store"
import { PublicEvent } from "@/lib/weddings/types"
import { TRANSLATIONS } from "@/lib/weddings/translations"
import { Badge } from "@/components/ui/badge"

export default function PublicEventsPage() {
  const [lang, setLang] = useState<"so" | "en">("so")
  const [events, setEvents] = useState<PublicEvent[]>([])

  useEffect(() => {
    setLang(WeddingStore.getLanguage())
    setEvents(WeddingStore.getPublicEvents())

    const handleLang = () => setLang(WeddingStore.getLanguage())
    window.addEventListener("languagechange", handleLang)
    return () => window.removeEventListener("languagechange", handleLang)
  }, [])

  return (
    <div className="min-h-screen flex flex-col bg-background text-foreground">
      <WeddingHeader />

      <main className="flex-1 container py-10 space-y-8">
        <div className="space-y-2">
          <Badge className="bg-amber-600 text-white font-bold text-[10px]">
            {lang === "so" ? "Xafladaha & Bandhigyada Guud" : "Public Event Directory"}
          </Badge>
          <h1 className="text-3xl font-extrabold font-heading">
            {lang === "so" ? "Bandhigyada Aroosyada & Munaasabadaha Hargeysa" : "Somaliland Wedding Expos & Bridal Showcases"}
          </h1>
          <p className="text-sm text-muted-foreground max-w-2xl">
            {lang === "so"
              ? "Kala soco bandhigyada waaweyn ee aroosyada, habeenka dhaqanka, iyo fursadaha aad kula kulmayso shirkadaha ugu sarreeya."
              : "Discover authorized bridal exhibitions, cultural henna showcases, and merchant expos in Hargeisa and across Somaliland."}
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          {events.map((event) => (
            <PublicEventCard key={event.id} event={event} lang={lang} />
          ))}
        </div>
      </main>

      <WeddingFooter />
    </div>
  )
}
