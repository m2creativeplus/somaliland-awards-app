"use client"

import { useState, useEffect } from "react"
import Link from "next/link"
import { WeddingHeader } from "@/components/weddings/wedding-header"
import { WeddingFooter } from "@/components/weddings/wedding-footer"
import { WeddingStore } from "@/lib/weddings/store"
import { WeddingInquiry, Provider } from "@/lib/weddings/types"
import { TRANSLATIONS } from "@/lib/weddings/translations"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import {
  Calendar,
  Clock,
  DollarSign,
  ShieldCheck,
  CheckCircle2,
  Users,
  Store,
  Send,
  Layers,
  ArrowRight,
  TrendingUp,
  Award,
  Phone,
  Edit,
} from "lucide-react"

export default function ProviderDashboardPage() {
  const [lang, setLang] = useState<"so" | "en">("so")
  const [inquiries, setInquiries] = useState<WeddingInquiry[]>([])
  const [providers, setProviders] = useState<Provider[]>([])
  const [activeTab, setActiveTab] = useState<"leads" | "packages">("leads")
  const [quotingInquiryId, setQuotingInquiryId] = useState<string | null>(null)
  const [quotePrice, setQuotePrice] = useState<string>("2200")

  useEffect(() => {
    setLang(WeddingStore.getLanguage())
    setInquiries(WeddingStore.getInquiries())
    setProviders(WeddingStore.getProviders())

    const handleLang = () => setLang(WeddingStore.getLanguage())
    window.addEventListener("languagechange", handleLang)
    return () => window.removeEventListener("languagechange", handleLang)
  }, [])

  const t = TRANSLATIONS[lang]
  const currentProvider = providers[0] || null

  const handleSendQuote = (inquiryId: string) => {
    const price = parseFloat(quotePrice) || 2000
    WeddingStore.updateInquiryStatus(inquiryId, "quotation_sent", price)
    setInquiries(WeddingStore.getInquiries())
    setQuotingInquiryId(null)
  }

  const confirmedCount = inquiries.filter((i) => i.status === "confirmed").length
  const totalRevenueUsd = inquiries
    .filter((i) => i.status === "confirmed")
    .reduce((acc, i) => acc + (i.quotedPriceUsd || 0), 0)

  return (
    <div className="min-h-screen flex flex-col bg-background text-foreground">
      <WeddingHeader />

      <main className="flex-1 container py-8 sm:py-12 space-y-8">
        {/* Provider Profile Header */}
        <div className="p-6 sm:p-8 rounded-3xl bg-slate-900 text-white shadow-xl relative overflow-hidden flex flex-col md:flex-row md:items-center justify-between gap-6">
          <div className="space-y-3 relative z-10">
            <div className="flex flex-wrap items-center gap-2">
              <Badge className="bg-amber-600 text-white text-[11px] font-bold flex items-center gap-1">
                <Store className="h-3 w-3" />
                <span>{lang === "so" ? "Albaabka Ganacsadaha Meherka" : "Merchant Operator Portal"}</span>
              </Badge>
              <Badge variant="outline" className="border-emerald-500/40 text-emerald-300 text-[11px] font-bold flex items-center gap-1">
                <ShieldCheck className="h-3 w-3 text-emerald-400" />
                <span>{lang === "so" ? "La Xaqiijiyay: SNPA & M2 Audit" : "[VERIFIED] Audited by SNPA"}</span>
              </Badge>
            </div>

            <h1 className="text-2xl sm:text-3xl font-extrabold font-heading">
              {currentProvider
                ? lang === "so"
                  ? currentProvider.businessNameSo
                  : currentProvider.businessNameEn
                : "Mansoor Hotel Grand Ballroom"}
            </h1>

            <p className="text-xs sm:text-sm text-slate-300 max-w-2xl leading-relaxed">
              {lang === "so"
                ? "Maamul dalabyada macaamiisha, u dir xigashooyinka qiimaha rasmiga ah, oo la soco dakhliga ka soo gala qabanqaabada aroosyada Somaliland."
                : "Manage inbound qualified customer inquiries, generate binding quotation offers, update published packages, and track revenue pipeline."}
            </p>
          </div>

          <div className="relative z-10 flex flex-wrap gap-2">
            <Button asChild size="sm" className="min-h-[44px] bg-amber-600 hover:bg-amber-700 text-white font-bold text-xs gap-2">
              <Link href="/provider/packages">
                <Layers className="h-4 w-4" />
                <span>{lang === "so" ? "Maamul Xirmooyinka" : "Manage Packages"}</span>
              </Link>
            </Button>
            <Button asChild variant="outline" size="sm" className="min-h-[44px] border-slate-700 text-white hover:bg-slate-800 text-xs font-bold gap-2">
              <Link href={`/providers/${currentProvider?.slug || "mansoor-grand-ballroom"}`}>
                <span>{lang === "so" ? "Eeg Bogga Dadweynaha" : "View Storefront"}</span>
                <ArrowRight className="h-4 w-4" />
              </Link>
            </Button>
          </div>
        </div>

        {/* Commercial Pipeline Metrics */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
          <div className="p-4 sm:p-5 rounded-2xl border border-slate-200 dark:border-slate-800 bg-card shadow-xs space-y-1">
            <div className="text-xs text-slate-500 flex items-center justify-between">
              <span>{lang === "so" ? "Dalabyada Cusub" : "Inbound Inquiries"}</span>
              <Users className="h-4 w-4 text-amber-600" />
            </div>
            <div className="text-2xl font-bold font-heading text-slate-900 dark:text-white">
              {inquiries.length}
            </div>
            <div className="text-[11px] text-slate-500">
              {inquiries.filter((i) => i.status === "inquiry_submitted").length} {lang === "so" ? "u baahan jawaab" : "requiring quote"}
            </div>
          </div>

          <div className="p-4 sm:p-5 rounded-2xl border border-slate-200 dark:border-slate-800 bg-card shadow-xs space-y-1">
            <div className="text-xs text-slate-500 flex items-center justify-between">
              <span>{lang === "so" ? "Heshiisyada Xaqiiqsan" : "Confirmed Events"}</span>
              <ShieldCheck className="h-4 w-4 text-emerald-600" />
            </div>
            <div className="text-2xl font-bold font-heading text-emerald-600 dark:text-emerald-400">
              {confirmedCount}
            </div>
            <div className="text-[11px] text-slate-500">
              {lang === "so" ? "Qandaraasyo la saxiixay" : "Binding SLAs executed"}
            </div>
          </div>

          <div className="p-4 sm:p-5 rounded-2xl border border-slate-200 dark:border-slate-800 bg-card shadow-xs space-y-1">
            <div className="text-xs text-slate-500 flex items-center justify-between">
              <span>{lang === "so" ? "Dakhliga Sugan" : "Gross Contracted"}</span>
              <DollarSign className="h-4 w-4 text-amber-600" />
            </div>
            <div className="text-2xl font-bold font-heading text-slate-900 dark:text-white">
              ${totalRevenueUsd.toLocaleString()}
            </div>
            <div className="text-[11px] text-slate-500">
              ~{(totalRevenueUsd * 8500).toLocaleString()} SL Sh
            </div>
          </div>

          <div className="p-4 sm:p-5 rounded-2xl border border-slate-200 dark:border-slate-800 bg-card shadow-xs space-y-1">
            <div className="text-xs text-slate-500 flex items-center justify-between">
              <span>{lang === "so" ? "Heerka Jawaabta" : "Response Time"}</span>
              <TrendingUp className="h-4 w-4 text-blue-600" />
            </div>
            <div className="text-2xl font-bold font-heading text-slate-900 dark:text-white">
              {currentProvider?.leadResponseTimeHours || 2}h
            </div>
            <div className="text-[11px] text-emerald-600 dark:text-emerald-400 font-semibold">
              {lang === "so" ? "Top 5% Hargeysa" : "Top 5% in Hargeisa"}
            </div>
          </div>
        </div>

        {/* Inquiries and Leads Queue */}
        <div className="space-y-4">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 border-b border-slate-200 dark:border-slate-800 pb-3">
            <div>
              <h2 className="text-xl font-bold font-heading text-slate-900 dark:text-white flex items-center gap-2">
                <Users className="h-5 w-5 text-amber-600" />
                <span>{lang === "so" ? "Liiska Dalabyada & Macaamiisha" : "Inbound Lead Queue & Quotation Engine"}</span>
              </h2>
              <p className="text-xs text-slate-500">
                {lang === "so"
                  ? "Ka jawaab dalabyada meherka, deji qiimaha rasmiga ah, oo la xidhiidh macmiilka."
                  : "Review incoming client requirements, deliver itemized price proposals, and issue binding quotes."}
              </p>
            </div>
          </div>

          <div className="space-y-4">
            {inquiries.map((inq) => (
              <div
                key={inq.id}
                className="rounded-2xl border border-slate-200 dark:border-slate-800 bg-card p-5 sm:p-6 shadow-xs space-y-4"
              >
                <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 border-b border-slate-100 dark:border-slate-800 pb-3">
                  <div className="space-y-1">
                    <div className="flex flex-wrap items-center gap-2">
                      <h3 className="text-base font-bold text-slate-900 dark:text-white">
                        {inq.customerName}
                      </h3>
                      <Badge
                        className={`text-[11px] font-bold ${
                          inq.status === "confirmed"
                            ? "bg-emerald-600 text-white"
                            : inq.status === "quotation_sent"
                            ? "bg-blue-600 text-white"
                            : "bg-amber-100 text-amber-900 dark:bg-amber-950 dark:text-amber-300"
                        }`}
                      >
                        {inq.status.replace("_", " ").toUpperCase()}
                      </Badge>
                      <span className="text-[11px] font-mono text-slate-400">
                        Lead Ref: {inq.id}
                      </span>
                    </div>
                    <div className="text-xs text-slate-500">
                      {lang === "so" ? "Telefoonka:" : "Phone:"} <strong className="text-slate-800 dark:text-slate-200">{inq.customerPhone}</strong> • {inq.customerEmail}
                    </div>
                  </div>

                  <div className="text-right">
                    {inq.quotedPriceUsd ? (
                      <div>
                        <div className="text-lg font-bold text-amber-700 dark:text-amber-400 font-heading">
                          ${inq.quotedPriceUsd.toLocaleString()} USD
                        </div>
                        <div className="text-[11px] text-slate-500">
                          v{inq.quotationVersion} quote delivered
                        </div>
                      </div>
                    ) : (
                      <Badge variant="outline" className="text-amber-700 border-amber-500/40 text-xs">
                        {lang === "so" ? "U Baahan Qiimeyn" : "Quote Pending"}
                      </Badge>
                    )}
                  </div>
                </div>

                {/* Details */}
                <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 text-xs">
                  <div className="p-3 rounded-lg bg-slate-50 dark:bg-slate-900">
                    <span className="text-slate-500">{lang === "so" ? "Taariikhda:" : "Date:"}</span>
                    <div className="font-bold text-slate-900 dark:text-white mt-0.5">{inq.eventDate}</div>
                  </div>
                  <div className="p-3 rounded-lg bg-slate-50 dark:bg-slate-900">
                    <span className="text-slate-500">{lang === "so" ? "Martida:" : "Guest Count:"}</span>
                    <div className="font-bold text-slate-900 dark:text-white mt-0.5">{inq.guestCount} {lang === "so" ? "Qof" : "Guests"}</div>
                  </div>
                  <div className="p-3 rounded-lg bg-slate-50 dark:bg-slate-900">
                    <span className="text-slate-500">{lang === "so" ? "Xidhmo la xushay:" : "Package:"}</span>
                    <div className="font-bold text-slate-900 dark:text-white mt-0.5">{inq.packageName || "Standard Suite"}</div>
                  </div>
                  <div className="p-3 rounded-lg bg-slate-50 dark:bg-slate-900">
                    <span className="text-slate-500">{lang === "so" ? "Hormarka:" : "Deposit:"}</span>
                    <div className="font-bold text-emerald-600 dark:text-emerald-400 mt-0.5 uppercase">{inq.depositStatus}</div>
                  </div>
                </div>

                {/* Notes */}
                {inq.notes && (
                  <div className="p-3 rounded-lg bg-slate-50 dark:bg-slate-900 text-xs text-slate-700 dark:text-slate-300">
                    <strong className="text-slate-900 dark:text-white">{lang === "so" ? "Fariinta Macmiilka:" : "Client Notes:"}</strong> {inq.notes}
                  </div>
                )}

                {/* Quotation Editor Form Inline */}
                {quotingInquiryId === inq.id ? (
                  <div className="p-4 rounded-xl bg-amber-500/10 border border-amber-500/30 space-y-3 animate-in fade-in">
                    <div className="text-xs font-bold text-amber-900 dark:text-amber-300 flex items-center justify-between">
                      <span>{lang === "so" ? "U Dir Xigasho Qiime Rasmi ah" : "Send Binding Formal Quotation"}</span>
                      <span>v{inq.quotationVersion + 1}</span>
                    </div>

                    <div className="flex flex-col sm:flex-row items-center gap-3">
                      <div className="flex-1 w-full space-y-1">
                        <label className="text-[11px] font-semibold text-slate-600 dark:text-slate-400">
                          {lang === "so" ? "Qiimaha Ugu Danbeeya (USD $):" : "Quoted Amount (USD $):"}
                        </label>
                        <Input
                          type="number"
                          value={quotePrice}
                          onChange={(e) => setQuotePrice(e.target.value)}
                          className="min-h-[44px] bg-background text-sm font-bold"
                          placeholder="2200"
                        />
                      </div>

                      <div className="flex items-center gap-2 pt-5 w-full sm:w-auto">
                        <Button
                          onClick={() => handleSendQuote(inq.id)}
                          className="min-h-[44px] bg-amber-600 hover:bg-amber-700 text-white font-bold text-xs gap-1.5 flex-1 sm:flex-none"
                        >
                          <Send className="h-4 w-4" />
                          <span>{lang === "so" ? "Gudbi Xigashada" : "Deliver Quotation"}</span>
                        </Button>
                        <Button
                          variant="ghost"
                          onClick={() => setQuotingInquiryId(null)}
                          className="min-h-[44px] text-xs font-semibold"
                        >
                          {lang === "so" ? "Kani Jooji" : "Cancel"}
                        </Button>
                      </div>
                    </div>
                  </div>
                ) : (
                  <div className="pt-2 flex flex-wrap items-center justify-between gap-3 border-t border-slate-100 dark:border-slate-800">
                    <div className="text-xs text-slate-500">
                      {lang === "so" ? "Diiwaanka audit-ka ee dalabkan wuu xafidan yahay." : "Audited event trail recorded."}
                    </div>

                    <div className="flex items-center gap-2">
                      <Button
                        size="sm"
                        onClick={() => {
                          setQuotingInquiryId(inq.id)
                          setQuotePrice(String(inq.quotedPriceUsd || 2200))
                        }}
                        className="min-h-[44px] bg-slate-900 dark:bg-white text-white dark:text-slate-900 font-bold text-xs gap-1.5 px-4"
                      >
                        <Edit className="h-4 w-4" />
                        <span>{inq.quotedPriceUsd ? (lang === "so" ? "Wax Ka Beddel Qiimaha" : "Revise Quotation") : (lang === "so" ? "U Dir Qiime Rasmi ah" : "Create Formal Quote")}</span>
                      </Button>

                      <Button asChild variant="outline" size="sm" className="min-h-[44px] text-xs font-semibold">
                        <a href={`https://wa.me/${inq.customerPhone.replace(/[^0-9]/g, "")}?text=Hello%20${inq.customerName}`} target="_blank" rel="noopener noreferrer">
                          <Phone className="h-3.5 w-3.5 mr-1 text-emerald-600" />
                          <span>WhatsApp</span>
                        </a>
                      </Button>
                    </div>
                  </div>
                )}
              </div>
            ))}
          </div>
        </div>
      </main>

      <WeddingFooter />
    </div>
  )
}
