"use client"

import { useState, useEffect } from "react"
import { useParams } from "next/navigation"
import Link from "next/link"
import { WeddingHeader } from "@/components/weddings/wedding-header"
import { WeddingFooter } from "@/components/weddings/wedding-footer"
import { WeddingStore } from "@/lib/weddings/store"
import { PublicEvent } from "@/lib/weddings/types"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Calendar, Clock, MapPin, ArrowLeft, Ticket, ExternalLink, Share2 } from "lucide-react"

export default function SinglePublicEventPage() {
  const params = useParams()
  const slug = params?.slug as string

  const [lang, setLang] = useState<"so" | "en">("so")
  const [event, setEvent] = useState<PublicEvent | undefined>(undefined)

  useEffect(() => {
    setLang(WeddingStore.getLanguage())
    const found = WeddingStore.getPublicEvents().find((e) => e.slug === slug)
    setEvent(found)

    const handleLang = () => setLang(WeddingStore.getLanguage())
    window.addEventListener("languagechange", handleLang)
    return () => window.removeEventListener("languagechange", handleLang)
  }, [slug])

  if (!event) {
    return (
      <div className="min-h-screen flex flex-col bg-background text-foreground">
        <WeddingHeader />
        <div className="flex-1 container py-20 text-center space-y-4">
          <h1 className="text-2xl font-bold font-heading">
            {lang === "so" ? "Munaasabadda Lama Helin" : "Event Not Found"}
          </h1>
          <Button asChild variant="outline">
            <Link href="/events">{lang === "so" ? "Dib ugu noqo Xafladaha" : "Back to Events"}</Link>
          </Button>
        </div>
        <WeddingFooter />
      </div>
    )
  }

  const title = lang === "so" ? event.titleSo : event.titleEn
  const desc = lang === "so" ? event.descriptionSo : event.descriptionEn

  return (
    <div className="min-h-screen flex flex-col bg-background text-foreground">
      <WeddingHeader />

      <main className="flex-1 container py-10 space-y-8 max-w-4xl">
        <div className="flex items-center gap-2">
          <Button asChild variant="ghost" size="sm" className="h-8 gap-1.5 text-xs">
            <Link href="/events">
              <ArrowLeft className="h-3.5 w-3.5" />
              <span>{lang === "so" ? "Dib ugu noqo Xafladaha" : "Back to All Events"}</span>
            </Link>
          </Button>
        </div>

        <div className="rounded-2xl border bg-card overflow-hidden shadow-sm space-y-6">
          <div className="aspect-[16/8] w-full bg-muted overflow-hidden">
            <img src={event.posterUrl} alt={title} className="h-full w-full object-cover" />
          </div>

          <div className="p-6 md:p-8 space-y-6">
            <div className="space-y-2">
              <div className="flex items-center gap-2">
                <Badge className="bg-amber-600 text-white text-[10px]">
                  {event.organizer}
                </Badge>
                {event.isFeatured && (
                  <Badge variant="outline" className="border-amber-600 text-amber-600 text-[10px]">
                    Featured Event
                  </Badge>
                )}
              </div>
              <h1 className="text-3xl font-extrabold font-heading text-foreground">{title}</h1>
              <div className="flex flex-wrap items-center gap-4 text-xs text-muted-foreground pt-2">
                <span className="flex items-center gap-1.5">
                  <Calendar className="h-4 w-4 text-amber-600" />
                  {event.eventDate}
                </span>
                <span className="flex items-center gap-1.5">
                  <Clock className="h-4 w-4 text-amber-600" />
                  {event.time}
                </span>
                <span className="flex items-center gap-1.5">
                  <MapPin className="h-4 w-4 text-amber-600" />
                  {event.venue}, {event.location}
                </span>
              </div>
            </div>

            <div className="prose dark:prose-invert text-sm text-muted-foreground leading-relaxed pt-4 border-t">
              <p>{desc}</p>
            </div>

            <div className="pt-6 border-t flex flex-wrap items-center justify-between gap-4">
              <div className="text-xs text-muted-foreground">
                Verified Community Event · Hargeisa, Somaliland
              </div>

              {event.ticketLink && (
                <Button size="lg" className="bg-amber-600 hover:bg-amber-700 text-white font-semibold text-xs h-10 gap-2" asChild>
                  <a href={event.ticketLink} target="_blank" rel="noopener noreferrer">
                    <Ticket className="h-4 w-4" />
                    <span>{lang === "so" ? "Qabso Kaadhka Hadda" : "Get Tickets / Register"}</span>
                    <ExternalLink className="h-3.5 w-3.5" />
                  </a>
                </Button>
              )}
            </div>
          </div>
        </div>
      </main>

      <WeddingFooter />
    </div>
  )
}
