"use client"

import { useState, useEffect } from "react"
import Link from "next/link"
import { WeddingHeader } from "@/components/weddings/wedding-header"
import { WeddingFooter } from "@/components/weddings/wedding-footer"
import { WeddingStore } from "@/lib/weddings/store"
import { WeddingInquiry, BookingStatus } from "@/lib/weddings/types"
import { TRANSLATIONS } from "@/lib/weddings/translations"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import {
  Calendar,
  Clock,
  DollarSign,
  MessageSquare,
  ShieldCheck,
  CheckCircle2,
  ArrowLeft,
  FileCheck,
  Phone,
  Sparkles,
} from "lucide-react"

export default function CustomerInquiriesPage() {
  const [lang, setLang] = useState<"so" | "en">("so")
  const [inquiries, setInquiries] = useState<WeddingInquiry[]>([])
  const [acceptedId, setAcceptedId] = useState<string | null>(null)

  useEffect(() => {
    setLang(WeddingStore.getLanguage())
    setInquiries(WeddingStore.getInquiries())

    const handleLang = () => setLang(WeddingStore.getLanguage())
    window.addEventListener("languagechange", handleLang)
    return () => window.removeEventListener("languagechange", handleLang)
  }, [])

  const t = TRANSLATIONS[lang]

  const handleAcceptQuotation = (id: string) => {
    WeddingStore.updateInquiryStatus(id, "confirmed")
    setInquiries(WeddingStore.getInquiries())
    setAcceptedId(id)
    setTimeout(() => setAcceptedId(null), 3000)
  }

  const getStatusBadge = (status: BookingStatus) => {
    switch (status) {
      case "inquiry_submitted":
        return <Badge variant="secondary" className="bg-amber-100 text-amber-900 dark:bg-amber-950/50 dark:text-amber-300 font-semibold text-[11px]">{lang === "so" ? "Dalabka La Diray" : "Inquiry Sent"}</Badge>
      case "quotation_sent":
        return <Badge className="bg-blue-600 text-white font-semibold text-[11px]">{lang === "so" ? "Qiimeyn La Helay" : "Quotation Received"}</Badge>
      case "accepted_by_customer":
        return <Badge className="bg-indigo-600 text-white font-semibold text-[11px]">{lang === "so" ? "La Aqbalay" : "Offer Accepted"}</Badge>
      case "deposit_pending":
        return <Badge className="bg-purple-600 text-white font-semibold text-[11px]">{lang === "so" ? "Sugaya Hormar" : "Deposit Pending"}</Badge>
      case "confirmed":
        return <Badge className="bg-emerald-600 text-white font-semibold text-[11px]">{lang === "so" ? "Heshiis Sugan" : "Booking Confirmed"}</Badge>
      default:
        return <Badge variant="outline">{status}</Badge>
    }
  }

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
          <Badge className="bg-amber-600 text-white font-bold text-[11px] tracking-wide flex items-center gap-1 w-fit">
            <MessageSquare className="h-3 w-3" />
            <span>{lang === "so" ? "Xafiiska Dalabyada & Xigashada" : "Inquiries & Quotations Inbox"}</span>
          </Badge>
          <h1 className="text-3xl sm:text-4xl font-extrabold font-heading text-slate-900 dark:text-white">
            {lang === "so" ? "Dalabyada Meherka & Xigashooyinka Rasmiga ah" : "Wedding Inquiries & Quotations"}
          </h1>
          <p className="text-xs sm:text-sm text-slate-600 dark:text-slate-300 max-w-2xl leading-relaxed">
            {lang === "so"
              ? "Halkan kala soco jawaabaha ay shirkaduhu kasoo bixiyeen codsiyadaadii, eeg nuqulada qiimaha (Quotation Versions), oo aqbal heshiisyada kugu habboon."
              : "Review formal merchant responses, versioned price offers, terms of service, and execute binding booking acceptances."}
          </p>
        </div>

        {acceptedId && (
          <div className="p-4 rounded-xl bg-emerald-500/10 border border-emerald-500/30 text-emerald-800 dark:text-emerald-200 text-sm font-semibold flex items-center gap-2 animate-in fade-in">
            <CheckCircle2 className="h-5 w-5 text-emerald-600 shrink-0" />
            <span>
              {lang === "so"
                ? "Heshiiska si guul leh ayaa loo aqbalay! Waxaa loo gudbiyay diiwaanka rasmiga ah."
                : "Quotation officially accepted! Transferred to confirmed bookings register with audit trail."}
            </span>
          </div>
        )}

        <div className="space-y-4">
          {inquiries.map((inq) => (
            <div
              key={inq.id}
              className="rounded-2xl border border-slate-200 dark:border-slate-800 bg-card p-6 shadow-xs space-y-4"
            >
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 border-b border-slate-100 dark:border-slate-800 pb-3">
                <div className="space-y-1">
                  <div className="flex flex-wrap items-center gap-2">
                    <h2 className="text-lg font-bold font-heading text-slate-900 dark:text-white">
                      {inq.providerName}
                    </h2>
                    {getStatusBadge(inq.status)}
                    <span className="text-[11px] font-mono text-slate-400">
                      Ref: {inq.id} (v{inq.quotationVersion})
                    </span>
                  </div>
                  <div className="text-xs text-slate-500">
                    {lang === "so" ? "Xidhmo la xulay:" : "Requested package:"} <strong className="text-slate-700 dark:text-slate-300">{inq.packageName || "Custom Wedding Suite"}</strong>
                  </div>
                </div>

                <div className="text-right">
                  {inq.quotedPriceUsd ? (
                    <div>
                      <div className="text-xl font-bold font-heading text-amber-700 dark:text-amber-400">
                        ${inq.quotedPriceUsd.toLocaleString()} USD
                      </div>
                      <div className="text-[11px] text-slate-500">
                        ~{(inq.quotedPriceUsd * 8500).toLocaleString()} SL Sh
                      </div>
                    </div>
                  ) : (
                    <span className="text-xs text-slate-400 italic">
                      {lang === "so" ? "Qiimayntu waxay ku jirtaa dib-u-eegis" : "Quotation under review"}
                    </span>
                  )}
                </div>
              </div>

              {/* Inquiry details */}
              <div className="grid grid-cols-1 sm:grid-cols-4 gap-3 text-xs">
                <div className="p-3 rounded-lg bg-slate-50 dark:bg-slate-900">
                  <div className="text-slate-500">{lang === "so" ? "Taariikhda Meherka:" : "Event Date:"}</div>
                  <div className="font-semibold text-slate-900 dark:text-white mt-0.5">{inq.eventDate}</div>
                </div>
                <div className="p-3 rounded-lg bg-slate-50 dark:bg-slate-900">
                  <div className="text-slate-500">{lang === "so" ? "Tirada Martida:" : "Guest Count:"}</div>
                  <div className="font-semibold text-slate-900 dark:text-white mt-0.5">{inq.guestCount} {lang === "so" ? "Qof" : "Guests"}</div>
                </div>
                <div className="p-3 rounded-lg bg-slate-50 dark:bg-slate-900">
                  <div className="text-slate-500">{lang === "so" ? "Xilliga Dalabka:" : "Submitted Date:"}</div>
                  <div className="font-semibold text-slate-900 dark:text-white mt-0.5">{inq.createdAt.slice(0, 10)}</div>
                </div>
                <div className="p-3 rounded-lg bg-slate-50 dark:bg-slate-900">
                  <div className="text-slate-500">{lang === "so" ? "Xaaladda Hormarka:" : "Deposit Status:"}</div>
                  <div className="font-semibold text-amber-600 dark:text-amber-400 mt-0.5 uppercase">{inq.depositStatus}</div>
                </div>
              </div>

              {/* Message from customer / special requirements */}
              {inq.notes && (
                <div className="p-3.5 rounded-xl bg-amber-500/5 border border-amber-500/20 text-xs space-y-1">
                  <div className="font-bold text-amber-900 dark:text-amber-300">
                    {lang === "so" ? "Fariinta & Shuruudaha Gaarka ah:" : "Special Requirements & Notes:"}
                  </div>
                  <p className="text-slate-700 dark:text-slate-300 leading-relaxed">{inq.notes}</p>
                </div>
              )}

              {/* Action buttons */}
              <div className="pt-2 flex flex-wrap items-center justify-between gap-3 border-t border-slate-100 dark:border-slate-800">
                <div className="text-[11px] text-slate-500 flex items-center gap-1.5">
                  <ShieldCheck className="h-3.5 w-3.5 text-emerald-600" />
                  <span>
                    {lang === "so" ? "Xigashadu waxay leedahay qiime go'an oo damaanad leh" : "Binding price guarantee supported by M2 platform"}
                  </span>
                </div>

                <div className="flex items-center gap-2">
                  {inq.status === "quotation_sent" ? (
                    <Button
                      onClick={() => handleAcceptQuotation(inq.id)}
                      className="min-h-[44px] bg-emerald-600 hover:bg-emerald-700 text-white font-bold text-xs gap-1.5 px-4"
                    >
                      <CheckCircle2 className="h-4 w-4" />
                      <span>{lang === "so" ? "Aqbal Qiimahan Rasmiga ah" : "Accept Formal Quotation"}</span>
                    </Button>
                  ) : inq.status === "confirmed" ? (
                    <Button asChild variant="outline" className="min-h-[44px] text-xs font-semibold text-emerald-700 border-emerald-500/30">
                      <Link href="/account/bookings">
                        <CheckCircle2 className="h-4 w-4 mr-1 text-emerald-600" />
                        <span>{lang === "so" ? "Eeg Qandaraaska Buuxa" : "View Booking Details"}</span>
                      </Link>
                    </Button>
                  ) : null}

                  <Button asChild variant="outline" className="min-h-[44px] text-xs font-semibold">
                    <a href={`https://wa.me/252634420000?text=Hello%20regarding%20inquiry%20${inq.id}`} target="_blank" rel="noopener noreferrer">
                      <Phone className="h-3.5 w-3.5 mr-1" />
                      <span>{lang === "so" ? "La Hadal Shirkadda" : "WhatsApp Merchant"}</span>
                    </a>
                  </Button>
                </div>
              </div>
            </div>
          ))}
        </div>
      </main>

      <WeddingFooter />
    </div>
  )
}
