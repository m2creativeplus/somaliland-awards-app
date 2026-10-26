"use client"

import { useState, useEffect } from "react"
import Link from "next/link"
import { WeddingHeader } from "@/components/weddings/wedding-header"
import { WeddingFooter } from "@/components/weddings/wedding-footer"
import { WeddingStore } from "@/lib/weddings/store"
import { TRANSLATIONS } from "@/lib/weddings/translations"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import {
  Share2,
  DollarSign,
  TrendingUp,
  Copy,
  CheckCircle2,
  ShieldCheck,
  ArrowRight,
  ExternalLink,
  Users,
  Wallet,
} from "lucide-react"

export default function AffiliateDashboardPage() {
  const [lang, setLang] = useState<"so" | "en">("so")
  const [copied, setCopied] = useState(false)
  const [affiliateTag, setAffiliateTag] = useState("hargeisa_bridal_guide")

  useEffect(() => {
    setLang(WeddingStore.getLanguage())
    const handleLang = () => setLang(WeddingStore.getLanguage())
    window.addEventListener("languagechange", handleLang)
    return () => window.removeEventListener("languagechange", handleLang)
  }, [])

  const t = TRANSLATIONS[lang]
  const referralUrl = `https://weddings.m2creative.sl/?ref=${affiliateTag}`

  const handleCopy = () => {
    navigator.clipboard.writeText(referralUrl)
    setCopied(true)
    setTimeout(() => setCopied(false), 2500)
  }

  // Sample conversions ledger
  const conversions = [
    {
      id: "conv-101",
      date: "2026-10-22",
      merchant: "Mansoor Hotel Grand Ballroom",
      service: "Royal Evening Reception Package",
      customer: "A. Xasan (Hargeisa)",
      bookingValueUsd: 2500,
      commissionUsd: 125,
      commissionSlSh: 1062500,
      status: "APPROVED_PAYOUT",
    },
    {
      id: "conv-102",
      date: "2026-10-18",
      merchant: "Guryo-Samo Visuals & Cinema",
      service: "4K Cinematic Wedding Production",
      customer: "M. Jaamac (Sha'ab)",
      bookingValueUsd: 1200,
      commissionUsd: 60,
      commissionSlSh: 510000,
      status: "APPROVED_PAYOUT",
    },
    {
      id: "conv-103",
      date: "2026-10-14",
      merchant: "Xariir Floral & Stage Décor",
      service: "Royal Bridal Stage & Fresh Flowers",
      customer: "F. Cilmi (26 June)",
      bookingValueUsd: 1400,
      commissionUsd: 70,
      commissionSlSh: 595000,
      status: "ESCROW_CLEARED",
    },
  ]

  const totalEarnedUsd = conversions.reduce((acc, c) => acc + c.commissionUsd, 0)

  return (
    <div className="min-h-screen flex flex-col bg-background text-foreground">
      <WeddingHeader />

      <main className="flex-1 container py-8 sm:py-12 space-y-8">
        {/* Banner */}
        <div className="p-6 sm:p-8 rounded-3xl bg-slate-900 text-white shadow-xl relative overflow-hidden flex flex-col md:flex-row md:items-center justify-between gap-6">
          <div className="space-y-3 relative z-10">
            <div className="flex flex-wrap items-center gap-2">
              <Badge className="bg-amber-600 text-white text-[11px] font-bold flex items-center gap-1">
                <Share2 className="h-3 w-3" />
                <span>{lang === "so" ? "Xarunta Xidhiidhiyaha & Suuqgeynta" : "Affiliate & Partner Portal"}</span>
              </Badge>
              <Badge variant="outline" className="border-emerald-500/40 text-emerald-300 text-[11px] font-bold">
                5% Commission Tier
              </Badge>
            </div>

            <h1 className="text-2xl sm:text-3xl font-extrabold font-heading">
              {lang === "so" ? "Barnaamijka Dakhli-Wadaagga ee Aroosyada" : "Wedding Affiliate & Revenue Share Program"}
            </h1>

            <p className="text-xs sm:text-sm text-slate-300 max-w-2xl leading-relaxed">
              {lang === "so"
                ? "La wadaag xidhiidhkaaga gaarka ah qoysaska guur-doonka ah, influencers-ka, iyo qabanqaabiyaasha meherka. Hel 5% komishan qandaraas kasta oo lagu xaqiijiyo suuqa."
                : "Earn guaranteed commissions by referring couples, event planners, and families to audited wedding providers across Somaliland."}
            </p>
          </div>

          <div className="relative z-10 flex flex-wrap gap-2">
            <Button asChild size="sm" className="min-h-[44px] bg-amber-600 hover:bg-amber-700 text-white font-bold text-xs gap-2">
              <Link href="/resources">
                <span>{lang === "so" ? "Qoraallada Suuqgeynta" : "Marketing Assets"}</span>
                <ArrowRight className="h-4 w-4" />
              </Link>
            </Button>
          </div>
        </div>

        {/* Affiliate KPI Grid */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
          <div className="p-4 sm:p-5 rounded-2xl border border-slate-200 dark:border-slate-800 bg-card shadow-xs space-y-1">
            <div className="text-xs text-slate-500 flex items-center justify-between">
              <span>{lang === "so" ? "Gujiyeeyasha Linkiga" : "Referral Clicks"}</span>
              <TrendingUp className="h-4 w-4 text-blue-600" />
            </div>
            <div className="text-2xl font-bold font-heading text-slate-900 dark:text-white">
              1,428
            </div>
            <div className="text-[11px] text-emerald-600 dark:text-emerald-400 font-semibold">
              +14% this month
            </div>
          </div>

          <div className="p-4 sm:p-5 rounded-2xl border border-slate-200 dark:border-slate-800 bg-card shadow-xs space-y-1">
            <div className="text-xs text-slate-500 flex items-center justify-between">
              <span>{lang === "so" ? "Dalabyada Loo Gudbiyay" : "Attributed Inquiries"}</span>
              <Users className="h-4 w-4 text-amber-600" />
            </div>
            <div className="text-2xl font-bold font-heading text-slate-900 dark:text-white">
              24
            </div>
            <div className="text-[11px] text-slate-500">
              {lang === "so" ? "12.5% heerka wareejinta" : "12.5% conversion rate"}
            </div>
          </div>

          <div className="p-4 sm:p-5 rounded-2xl border border-slate-200 dark:border-slate-800 bg-card shadow-xs space-y-1">
            <div className="text-xs text-slate-500 flex items-center justify-between">
              <span>{lang === "so" ? "Heshiisyada Xaqiiqsan" : "Confirmed Bookings"}</span>
              <ShieldCheck className="h-4 w-4 text-emerald-600" />
            </div>
            <div className="text-2xl font-bold font-heading text-emerald-600 dark:text-emerald-400">
              {conversions.length}
            </div>
            <div className="text-[11px] text-slate-500">
              {lang === "so" ? "Lacagahoodii la xaqiijiyay" : "SLA & deposit cleared"}
            </div>
          </div>

          <div className="p-4 sm:p-5 rounded-2xl border border-slate-200 dark:border-slate-800 bg-card shadow-xs space-y-1">
            <div className="text-xs text-slate-500 flex items-center justify-between">
              <span>{lang === "so" ? "Dakhliga Komishanka" : "Total Commission"}</span>
              <Wallet className="h-4 w-4 text-amber-600" />
            </div>
            <div className="text-2xl font-bold font-heading text-amber-700 dark:text-amber-400">
              ${totalEarnedUsd.toLocaleString()} USD
            </div>
            <div className="text-[11px] text-slate-500">
              ~{(totalEarnedUsd * 8500).toLocaleString()} SL Sh
            </div>
          </div>
        </div>

        {/* Link Generator Tool */}
        <div className="p-6 rounded-2xl border border-amber-500/30 bg-card shadow-xs space-y-4">
          <div className="space-y-1">
            <h2 className="text-lg font-bold font-heading text-slate-900 dark:text-white flex items-center gap-2">
              <Share2 className="h-5 w-5 text-amber-600" />
              <span>{lang === "so" ? "Samee Linkigaaga Gaarka ah ee Suuqgeynta" : "Referral Link Generator & Attribution Engine"}</span>
            </h2>
            <p className="text-xs text-slate-500">
              {lang === "so"
                ? "Geli magaca ololahaaga si loo raadraaco booqdayaashaada iyo macaamiisha kuu goysa heshiisyada."
                : "Generate custom campaign tracking links with 30-day attribution cookies for social media and messaging channels."}
            </p>
          </div>

          <div className="flex flex-col sm:flex-row items-center gap-3">
            <div className="w-full sm:w-64 space-y-1">
              <label className="text-[11px] font-semibold text-slate-600 dark:text-slate-400">
                {lang === "so" ? "Magaca Ololaha (Tag):" : "Campaign Tag:"}
              </label>
              <Input
                value={affiliateTag}
                onChange={(e) => setAffiliateTag(e.target.value.toLowerCase().replace(/[^a-z0-9_-]/g, ""))}
                className="min-h-[44px] bg-background text-xs font-mono"
              />
            </div>

            <div className="w-full flex-1 space-y-1">
              <label className="text-[11px] font-semibold text-slate-600 dark:text-slate-400">
                {lang === "so" ? "Linkigaaga Buuxa ee Suuqgeynta:" : "Your Trackable URL:"}
              </label>
              <div className="flex items-center gap-2">
                <Input
                  readOnly
                  value={referralUrl}
                  className="min-h-[44px] bg-slate-50 dark:bg-slate-900 font-mono text-xs flex-1"
                />
                <Button
                  onClick={handleCopy}
                  className="min-h-[44px] bg-amber-600 hover:bg-amber-700 text-white font-bold text-xs gap-1.5 shrink-0 px-4"
                >
                  {copied ? (
                    <>
                      <CheckCircle2 className="h-4 w-4" />
                      <span>{lang === "so" ? "Waa La Qubiyay!" : "Copied!"}</span>
                    </>
                  ) : (
                    <>
                      <Copy className="h-4 w-4" />
                      <span>{lang === "so" ? "Koobiyeey" : "Copy Link"}</span>
                    </>
                  )}
                </Button>
              </div>
            </div>
          </div>
        </div>

        {/* Commission Ledger Table */}
        <div className="space-y-4">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 border-b border-slate-200 dark:border-slate-800 pb-3">
            <div>
              <h2 className="text-xl font-bold font-heading text-slate-900 dark:text-white flex items-center gap-2">
                <Wallet className="h-5 w-5 text-emerald-600" />
                <span>{lang === "so" ? "Diiwaanka Komishanka & Lacag-bixinta" : "Verified Commission Ledger & Payouts"}</span>
              </h2>
              <p className="text-xs text-slate-500">
                {lang === "so"
                  ? "Lacagaha la bixiyo waxaa lagu wareejiyaa Zaad Service, e-Dahab, ama Akoonka Bangiga ee Somaliland."
                  : "All approved commissions are disbursed via Zaad Service, e-Dahab, or Somaliland commercial banks."}
              </p>
            </div>
          </div>

          <div className="overflow-x-auto rounded-2xl border border-slate-200 dark:border-slate-800 bg-card">
            <table className="w-full text-left text-xs">
              <thead className="bg-slate-50 dark:bg-slate-900 border-b border-slate-200 dark:border-slate-800 text-slate-500 font-bold uppercase tracking-wider">
                <tr>
                  <th className="p-3.5">Ref ID</th>
                  <th className="p-3.5">{lang === "so" ? "Taariikh" : "Date"}</th>
                  <th className="p-3.5">{lang === "so" ? "Shirkadda" : "Merchant"}</th>
                  <th className="p-3.5">{lang === "so" ? "Xidhmo" : "Package"}</th>
                  <th className="p-3.5">{lang === "so" ? "Qiimaha Heshiiska" : "Booking Value"}</th>
                  <th className="p-3.5">{lang === "so" ? "Komishanka (5%)" : "Commission"}</th>
                  <th className="p-3.5">{lang === "so" ? "Xaaladda" : "Status"}</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-100 dark:divide-slate-800">
                {conversions.map((conv) => (
                  <tr key={conv.id} className="hover:bg-slate-50/50 dark:hover:bg-slate-900/50">
                    <td className="p-3.5 font-mono font-semibold text-slate-500">{conv.id}</td>
                    <td className="p-3.5 text-slate-600 dark:text-slate-300">{conv.date}</td>
                    <td className="p-3.5 font-bold text-slate-900 dark:text-white">{conv.merchant}</td>
                    <td className="p-3.5 text-slate-600 dark:text-slate-300">{conv.service}</td>
                    <td className="p-3.5 font-semibold text-slate-900 dark:text-white">${conv.bookingValueUsd.toLocaleString()} USD</td>
                    <td className="p-3.5 font-bold text-amber-700 dark:text-amber-400">
                      ${conv.commissionUsd} USD
                      <div className="text-[10px] text-slate-400 font-normal">~{conv.commissionSlSh.toLocaleString()} SL Sh</div>
                    </td>
                    <td className="p-3.5">
                      <Badge className="bg-emerald-600 text-white font-bold text-[10px]">
                        {conv.status.replace("_", " ")}
                      </Badge>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </main>

      <WeddingFooter />
    </div>
  )
}
