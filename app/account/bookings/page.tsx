"use client"

import { useState, useEffect } from "react"
import Link from "next/link"
import { WeddingHeader } from "@/components/weddings/wedding-header"
import { WeddingFooter } from "@/components/weddings/wedding-footer"
import { WeddingStore } from "@/lib/weddings/store"
import { WeddingInquiry } from "@/lib/weddings/types"
import { TRANSLATIONS } from "@/lib/weddings/translations"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import {
  Calendar,
  Clock,
  DollarSign,
  ShieldCheck,
  CheckCircle2,
  ArrowLeft,
  FileText,
  AlertCircle,
  Phone,
  MessageSquare,
} from "lucide-react"

export default function CustomerBookingsPage() {
  const [lang, setLang] = useState<"so" | "en">("so")
  const [inquiries, setInquiries] = useState<WeddingInquiry[]>([])

  useEffect(() => {
    setLang(WeddingStore.getLanguage())
    setInquiries(WeddingStore.getInquiries())

    const handleLang = () => setLang(WeddingStore.getLanguage())
    window.addEventListener("languagechange", handleLang)
    return () => window.removeEventListener("languagechange", handleLang)
  }, [])

  const t = TRANSLATIONS[lang]

  // Filter confirmed or deposit pending bookings
  const bookings = inquiries.filter(
    (i) => i.status === "confirmed" || i.status === "deposit_pending" || i.status === "accepted_by_customer"
  )

  return (
    <div className="min-h-screen flex flex-col bg-background text-foreground">
      <WeddingHeader />

      <main className="flex-1 container py-8 sm:py-12 space-y-8">
        <div className="flex items-center gap-2">
          <Button asChild variant="ghost" size="sm" className="min-h-[44px] gap-1.5 text-xs font-semibold">
            <Link href="/account">
              <ArrowLeft className="h-4 w-4" />
              <span>{lang === "so" ? "Ku noqo Xaruntaada" : "Back to Account"}</span>
            </Link>
          </Button>
        </div>

        <div className="space-y-2">
          <Badge className="bg-emerald-600 text-white font-bold text-[11px] tracking-wide flex items-center gap-1 w-fit">
            <ShieldCheck className="h-3 w-3" />
            <span>{lang === "so" ? "Heshiisyada Meherka ee Sugan" : "Verified Booking Records"}</span>
          </Badge>
          <h1 className="text-3xl sm:text-4xl font-extrabold font-heading text-slate-900 dark:text-white">
            {lang === "so" ? "Heshiisyadayda & Qandaraasyada Meherka" : "My Confirmed Wedding Bookings"}
          </h1>
          <p className="text-xs sm:text-sm text-slate-600 dark:text-slate-300 max-w-2xl leading-relaxed">
            {lang === "so"
              ? "Halkan waxaad ka maamuli kartaa qandaraasyada aad la gashay hoolalka, sawir-qaadayaasha, iyo qurxinta, oo aad la socon kartaa marxalad kasta."
              : "Track verified contracts, stage milestones, deposit statuses, and communication records with your booked event merchants."}
          </p>
        </div>

        {bookings.length === 0 ? (
          <div className="rounded-2xl border border-dashed border-slate-300 dark:border-slate-800 p-8 sm:p-12 text-center space-y-4">
            <AlertCircle className="h-10 w-10 text-slate-400 mx-auto" />
            <div className="space-y-1">
              <h3 className="text-base font-bold text-slate-900 dark:text-white">
                {lang === "so" ? "Weli Ma Jirto Heshiis La Xaqiijiyay" : "No Confirmed Bookings Yet"}
              </h3>
              <p className="text-xs text-slate-500 max-w-md mx-auto">
                {lang === "so"
                  ? "Marka aad hesho qiimaha shirkaddu kuu soo dirto oo aad aqbasho, waxay si toos ah uga soo muuqan doontaa halkan."
                  : "When you accept an official merchant quotation in your inquiries inbox, it will become an active booking record here."}
              </p>
            </div>
            <Button asChild size="sm" className="min-h-[44px] bg-amber-600 hover:bg-amber-700 text-white font-bold text-xs">
              <Link href="/providers">
                {lang === "so" ? "Baadh Shirkadaha Meherka" : "Explore Wedding Providers"}
              </Link>
            </Button>
          </div>
        ) : (
          <div className="space-y-6">
            {bookings.map((b) => (
              <div
                key={b.id}
                className="rounded-2xl border border-slate-200 dark:border-slate-800 bg-card p-6 sm:p-7 shadow-xs space-y-6"
              >
                <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 border-b border-slate-100 dark:border-slate-800 pb-4">
                  <div className="space-y-1">
                    <div className="flex items-center gap-2">
                      <h2 className="text-lg font-bold font-heading text-slate-900 dark:text-white">
                        {b.providerName}
                      </h2>
                      <Badge className="bg-emerald-600 text-white text-[11px] font-bold">
                        {lang === "so" ? "Heshiis Sugan" : "Confirmed"}
                      </Badge>
                    </div>
                    <div className="text-xs text-slate-500">
                      Booking Ref: <span className="font-mono font-semibold">{b.id}</span> • Version: v{b.quotationVersion}
                    </div>
                  </div>

                  <div className="text-right">
                    <div className="text-xl font-black text-amber-700 dark:text-amber-400 font-heading">
                      ${b.quotedPriceUsd?.toLocaleString() || "1,800"} USD
                    </div>
                    <div className="text-[11px] text-slate-500">
                      ~{((b.quotedPriceUsd || 1800) * 8500).toLocaleString()} SL Sh
                    </div>
                  </div>
                </div>

                {/* Grid Info */}
                <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 text-xs">
                  <div className="p-3.5 rounded-xl bg-slate-50 dark:bg-slate-900 space-y-1">
                    <span className="text-slate-500 font-medium">{lang === "so" ? "Taariikhda Meherka:" : "Event Date:"}</span>
                    <div className="font-bold text-slate-900 dark:text-white flex items-center gap-1.5">
                      <Calendar className="h-4 w-4 text-amber-600" />
                      <span>{b.eventDate}</span>
                    </div>
                  </div>

                  <div className="p-3.5 rounded-xl bg-slate-50 dark:bg-slate-900 space-y-1">
                    <span className="text-slate-500 font-medium">{lang === "so" ? "Tirada Martida:" : "Guest Count:"}</span>
                    <div className="font-bold text-slate-900 dark:text-white flex items-center gap-1.5">
                      <Clock className="h-4 w-4 text-amber-600" />
                      <span>{b.guestCount} {lang === "so" ? "Qof" : "Guests"}</span>
                    </div>
                  </div>

                  <div className="p-3.5 rounded-xl bg-slate-50 dark:bg-slate-900 space-y-1">
                    <span className="text-slate-500 font-medium">{lang === "so" ? "Xaaladda Hormarka:" : "Deposit Status:"}</span>
                    <div className="font-bold text-emerald-600 dark:text-emerald-400 flex items-center gap-1.5">
                      <ShieldCheck className="h-4 w-4 text-emerald-600" />
                      <span>{b.depositStatus === "deposit_recorded" ? (lang === "so" ? "Hormar La Diiwaangeliyay" : "Deposit Recorded") : (lang === "so" ? "Lacag-bixin Diyaar ah" : "Payment Ready")}</span>
                    </div>
                  </div>
                </div>

                {/* Milestone Progress bar */}
                <div className="space-y-3">
                  <div className="text-xs font-bold text-slate-900 dark:text-white uppercase tracking-wider">
                    {lang === "so" ? "Heerarka Shaqada & Kormeerka:" : "Milestone Progression & Verification:"}
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-5 gap-2">
                    {b.milestones.map((m, idx) => (
                      <div
                        key={idx}
                        className={`p-3 rounded-xl border text-center space-y-1 text-xs transition-all ${
                          m.status === "completed"
                            ? "bg-emerald-500/10 border-emerald-500/30 text-emerald-900 dark:text-emerald-300"
                            : m.status === "current"
                            ? "bg-amber-500/10 border-amber-500/50 text-amber-900 dark:text-amber-300 font-bold"
                            : "bg-slate-50 dark:bg-slate-900/50 border-slate-200 dark:border-slate-800 text-slate-400"
                        }`}
                      >
                        <div className="flex items-center justify-center gap-1">
                          {m.status === "completed" && <CheckCircle2 className="h-3.5 w-3.5 text-emerald-600" />}
                          <span className="font-mono text-[10px]">0{idx + 1}</span>
                        </div>
                        <div className="text-[11px] leading-tight">
                          {lang === "so" ? m.titleSo : m.titleEn}
                        </div>
                        {m.timestamp && (
                          <div className="text-[9px] text-slate-400">{m.timestamp}</div>
                        )}
                      </div>
                    ))}
                  </div>
                </div>

                {/* Quick actions */}
                <div className="pt-2 flex flex-wrap items-center justify-between gap-3 border-t border-slate-100 dark:border-slate-800">
                  <div className="text-xs text-slate-500 flex items-center gap-1.5">
                    <ShieldCheck className="h-4 w-4 text-emerald-600" />
                    <span>{lang === "so" ? "Dammaanad qaadka qandaraaska: SNPA & M2 Creative" : "Protected by M2 Merchant Verification"}</span>
                  </div>

                  <div className="flex items-center gap-2">
                    <Button asChild variant="outline" size="sm" className="min-h-[44px] text-xs font-semibold">
                      <Link href="/resources">
                        <FileText className="h-3.5 w-3.5 mr-1" />
                        <span>{lang === "so" ? "Soo Deji Qandaraaska (PDF)" : "Download Contract (PDF)"}</span>
                      </Link>
                    </Button>
                    <Button asChild size="sm" className="min-h-[44px] bg-amber-600 hover:bg-amber-700 text-white text-xs font-bold">
                      <Link href="/plan">
                        <span>{lang === "so" ? "Ku Dar Jadwalka Meherka" : "Add to Run Sheet"}</span>
                      </Link>
                    </Button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}
      </main>

      <WeddingFooter />
    </div>
  )
}
