"use client"

import { PublicEvent } from "@/lib/weddings/types"
import { TRANSLATIONS } from "@/lib/weddings/translations"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Calendar, Clock, MapPin, ExternalLink, Ticket } from "lucide-react"

interface PublicEventCardProps {
  event: PublicEvent
  lang?: "so" | "en"
}

export function PublicEventCard({ event, lang = "so" }: PublicEventCardProps) {
  const t = TRANSLATIONS[lang]
  const title = lang === "so" ? event.titleSo : event.titleEn
  const desc = lang === "so" ? event.descriptionSo : event.descriptionEn

  return (
    <div className="rounded-xl border bg-card text-card-foreground shadow-sm hover:shadow-md transition-shadow overflow-hidden flex flex-col md:flex-row">
      <div className="relative md:w-72 aspect-[16/10] md:aspect-auto shrink-0 bg-muted">
        <img
          src={event.posterUrl}
          alt={title}
          className="h-full w-full object-cover"
          loading="lazy"
        />
        {event.isFeatured && (
          <Badge className="absolute top-3 left-3 bg-amber-600 text-white text-[10px] font-bold">
            FEATURED EVENT
          </Badge>
        )}
      </div>

      <div className="p-5 flex-1 flex flex-col justify-between space-y-4">
        <div className="space-y-2">
          <div className="flex items-center gap-2 text-xs text-amber-700 dark:text-amber-400 font-semibold">
            <span>{event.organizer}</span>
          </div>

          <h3 className="font-heading font-bold text-lg text-foreground leading-snug">
            {title}
          </h3>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 text-xs text-muted-foreground pt-1">
            <span className="flex items-center gap-1.5">
              <Calendar className="h-3.5 w-3.5 text-amber-600" />
              {event.eventDate}
            </span>
            <span className="flex items-center gap-1.5">
              <Clock className="h-3.5 w-3.5 text-amber-600" />
              {event.time}
            </span>
            <span className="flex items-center gap-1.5 sm:col-span-2">
              <MapPin className="h-3.5 w-3.5 text-amber-600 shrink-0" />
              {event.venue}, {event.location}
            </span>
          </div>

          <p className="text-xs text-muted-foreground line-clamp-2 leading-relaxed pt-1">
            {desc}
          </p>
        </div>

        <div className="pt-3 border-t flex items-center justify-between gap-3">
          <Badge variant="outline" className="text-[10px] text-emerald-600 border-emerald-600/30">
            Open Registration
          </Badge>

          {event.ticketLink ? (
            <Button
              size="sm"
              className="bg-amber-600 hover:bg-amber-700 text-white text-xs h-8 gap-1.5 font-semibold"
              asChild
            >
              <a href={event.ticketLink} target="_blank" rel="noopener noreferrer">
                <Ticket className="h-3.5 w-3.5" />
                <span>{lang === "so" ? "Qabso Kaadhka / Booska" : "Register / Tickets"}</span>
                <ExternalLink className="h-3 w-3" />
              </a>
            </Button>
          ) : (
            <Button size="sm" variant="outline" className="text-xs h-8">
              {lang === "so" ? "Xog Dheeraad ah" : "Event Details"}
            </Button>
          )}
        </div>
      </div>
    </div>
  )
}
