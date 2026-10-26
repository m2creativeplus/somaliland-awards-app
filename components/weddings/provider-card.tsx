"use client"

import Link from "next/link"
import { useState } from "react"
import { Provider } from "@/lib/weddings/types"
import { TRANSLATIONS } from "@/lib/weddings/translations"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { ShieldCheck, Star, MapPin, Clock, ArrowRight, MessageCircle, Phone } from "lucide-react"
import { InquiryModal } from "./inquiry-modal"

interface ProviderCardProps {
  provider: Provider
  lang?: "so" | "en"
}

export function ProviderCard({ provider, lang = "so" }: ProviderCardProps) {
  const t = TRANSLATIONS[lang]
  const [inquiryOpen, setInquiryOpen] = useState(false)
  const [imageError, setImageError] = useState(false)

  const name = lang === "so" ? provider.businessNameSo : provider.businessNameEn
  const desc = lang === "so" ? provider.descriptionSo : provider.descriptionEn

  // Clean WhatsApp number for direct link
  const cleanPhone = provider.whatsapp.replace(/[^0-9]/g, "")
  const whatsappMessage = encodeURIComponent(
    lang === "so"
      ? `Asc ${name}, waxaan idinka soo xiriiray Madasha Aroosyada Somaliland (somalilandweddings.sl). Waxaan doonayaa xog iyo qiimo ku saabsan adeegyadiinna.`
      : `Hello ${name}, I found your business on Somaliland Weddings & Events. I would like to inquire about your services and availability.`
  )

  return (
    <>
      <article
        className="group rounded-2xl border border-slate-200 dark:border-slate-800 bg-card text-card-foreground shadow-xs hover:shadow-lg transition-all duration-300 flex flex-col overflow-hidden focus-within:ring-2 focus-within:ring-amber-500"
        aria-labelledby={`prov-title-${provider.id}`}
      >
        {/* Cover image & verification banner */}
        <div className="relative aspect-[16/10] sm:aspect-[16/9] w-full overflow-hidden bg-slate-100 dark:bg-slate-900">
          {!imageError ? (
            <img
              src={provider.portfolioImages[0] || "https://images.unsplash.com/photo-1519741497674-611481863552?auto=format&fit=crop&w=800&q=80"}
              alt={`${name} - ${provider.category} in ${provider.city}`}
              className="h-full w-full object-cover group-hover:scale-105 transition-transform duration-500"
              loading="lazy"
              onError={() => setImageError(true)}
            />
          ) : (
            <div className="h-full w-full flex flex-col items-center justify-center bg-gradient-to-br from-amber-600/20 to-slate-900 text-amber-500 p-4 text-center">
              <span className="text-3xl mb-1">💍</span>
              <span className="text-xs font-semibold">{name}</span>
            </div>
          )}

          {/* Top badges bar */}
          <div className="absolute top-3 left-3 right-3 flex items-center justify-between gap-2 pointer-events-none">
            <div className="flex items-center gap-1.5 flex-wrap">
              {provider.verificationStatus === "VERIFIED" && (
                <Badge
                  className="bg-emerald-600 hover:bg-emerald-700 text-white gap-1 text-[11px] font-bold tracking-wide shadow-md backdrop-blur pointer-events-auto"
                  title="Direct in-person physical premises inspection and trade license audit by M2 Creative & SNPA"
                >
                  <ShieldCheck className="h-3.5 w-3.5" aria-hidden="true" />
                  <span>{t.verifiedTag}</span>
                </Badge>
              )}
              <Badge variant="secondary" className="bg-white/95 dark:bg-slate-900/90 text-slate-800 dark:text-slate-100 text-[11px] font-bold shadow-xs backdrop-blur pointer-events-auto">
                {provider.priceTier}
              </Badge>
            </div>

            <span className="inline-flex items-center gap-1 px-2.5 py-1 rounded-full bg-slate-950/85 text-amber-300 text-xs font-bold shadow-md backdrop-blur pointer-events-auto">
              <Star className="h-3.5 w-3.5 fill-amber-400 text-amber-400" aria-hidden="true" />
              <span>{provider.rating.toFixed(1)}</span>
              <span className="text-[10px] text-amber-200/80 font-normal">({provider.reviewCount})</span>
            </span>
          </div>
        </div>

        {/* Content body */}
        <div className="p-5 sm:p-6 flex-1 flex flex-col justify-between space-y-4">
          <div className="space-y-2.5">
            <div className="flex items-start justify-between gap-2">
              <Link
                href={`/providers/${provider.slug}`}
                className="hover:text-amber-600 dark:hover:text-amber-400 transition-colors focus-visible:outline-hidden focus-visible:underline"
              >
                <h3 id={`prov-title-${provider.id}`} className="font-heading font-bold text-base sm:text-lg text-slate-900 dark:text-white line-clamp-1 leading-snug">
                  {name}
                </h3>
              </Link>
            </div>

            <div className="flex flex-wrap items-center gap-x-4 gap-y-1.5 text-xs text-slate-600 dark:text-slate-300 font-medium">
              <span className="flex items-center gap-1">
                <MapPin className="h-3.5 w-3.5 text-amber-600 shrink-0" aria-hidden="true" />
                <span>{provider.district}, {provider.city}</span>
              </span>
              <span className="flex items-center gap-1">
                <Clock className="h-3.5 w-3.5 text-slate-400 shrink-0" aria-hidden="true" />
                <span>{provider.leadResponseTimeHours}h {lang === "so" ? "jawaab celin" : "lead time"}</span>
              </span>
            </div>

            <p className="text-xs text-slate-600 dark:text-slate-300 line-clamp-2 leading-relaxed">
              {desc}
            </p>
          </div>

          <div className="pt-3 border-t border-slate-100 dark:border-slate-800 space-y-3.5">
            <div className="flex items-baseline justify-between text-xs">
              <span className="text-slate-500 dark:text-slate-400 font-medium">{t.startingFrom}:</span>
              <div className="text-right">
                <span className="font-extrabold text-base text-slate-900 dark:text-white">
                  ${provider.startingPriceUsd.toLocaleString()} USD
                </span>
                <span className="block text-[10px] text-slate-500 font-mono">
                  ~{(provider.startingPriceUsd * 8500).toLocaleString()} SL Sh
                </span>
              </div>
            </div>

            {/* Accessible Action Buttons (min 44px touch targets on mobile) */}
            <div className="flex flex-col sm:flex-row gap-2 pt-1">
              <Button
                variant="outline"
                size="default"
                className="min-h-[44px] text-xs font-semibold w-full sm:flex-1 border-slate-300 dark:border-slate-700 hover:bg-slate-100 dark:hover:bg-slate-800"
                asChild
              >
                <Link
                  href={`/providers/${provider.slug}`}
                  aria-label={`${lang === "so" ? "Eeg profile-ka" : "View profile of"} ${name}`}
                >
                  {t.viewProfile}
                </Link>
              </Button>

              <Button
                size="default"
                className="min-h-[44px] bg-amber-600 hover:bg-amber-700 text-white text-xs font-bold gap-1.5 w-full sm:flex-1 shadow-xs"
                onClick={() => setInquiryOpen(true)}
                aria-label={`${lang === "so" ? "Dalbo qiimo ka" : "Request quotation from"} ${name}`}
              >
                <MessageCircle className="h-4 w-4" aria-hidden="true" />
                <span>{t.requestQuote}</span>
                <ArrowRight className="h-3.5 w-3.5" aria-hidden="true" />
              </Button>

              {/* Direct WhatsApp Quick Action Button */}
              <a
                href={`https://wa.me/${cleanPhone}?text=${whatsappMessage}`}
                target="_blank"
                rel="noopener noreferrer"
                className="min-h-[44px] px-3 rounded-lg border border-emerald-500/30 bg-emerald-50 hover:bg-emerald-100 dark:bg-emerald-950/40 dark:hover:bg-emerald-900/60 text-emerald-700 dark:text-emerald-300 inline-flex items-center justify-center transition-colors shrink-0"
                aria-label={`WhatsApp ${name}`}
                title={`Chat with ${name} on WhatsApp`}
              >
                <Phone className="h-4 w-4" aria-hidden="true" />
                <span className="sr-only">WhatsApp</span>
              </a>
            </div>
          </div>
        </div>
      </article>

      <InquiryModal
        isOpen={inquiryOpen}
        onClose={() => setInquiryOpen(false)}
        provider={provider}
        lang={lang}
      />
    </>
  )
}
