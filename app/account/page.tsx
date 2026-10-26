"use client"

import { useState, useEffect } from "react"
import Link from "next/link"
import { WeddingHeader } from "@/components/weddings/wedding-header"
import { WeddingFooter } from "@/components/weddings/wedding-footer"
import { WeddingStore } from "@/lib/weddings/store"
import { WeddingInquiry, WeddingEventPlan } from "@/lib/weddings/types"
import { TRANSLATIONS } from "@/lib/weddings/translations"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import {
  Calendar,
  Clock,
  DollarSign,
  Heart,
  MessageSquare,
  ShieldCheck,
  CheckCircle2,
  ArrowRight,
  User,
  Sparkles,
  FileText,
  PhoneCall,
  ExternalLink,
} from "lucide-react"

export default function CustomerAccountOverviewPage() {
  const [lang, setLang] = useState<"so" | "en">("so")
  const [inquiries, setInquiries] = useState<WeddingInquiry[]>([])
  const [plan, setPlan] = useState<WeddingEventPlan | null>(null)

  useEffect(() => {
    setLang(WeddingStore.getLanguage())
    setInquiries(WeddingStore.getInquiries())
    setPlan(WeddingStore.getEventPlan())

    const handleLang = () => setLang(WeddingStore.getLanguage())
    window.addEventListener("languagechange", handleLang)
    return () => window.removeEventListener("languagechange", handleLang)
  }, [])

  const t = TRANSLATIONS[lang]

  // Status badge helper
  const getStatusBadge = (status: string) => {
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

  const completedTasks = plan ? plan.tasks.filter((tk) => tk.isCompleted).length : 0
  const totalTasks = plan ? plan.tasks.length : 0
  const totalBudget = plan ? plan.budgetItems.reduce((acc, b) => acc + b.estimatedUsd, 0) : 0
  const actualSpent = plan ? plan.budgetItems.reduce((acc, b) => acc + b.actualUsd, 0) : 0

  return (
    <div className="min-h-screen flex flex-col bg-background text-foreground">
      <WeddingHeader />

      <main className="flex-1 container py-8 sm:py-12 space-y-8">
        {/* Welcome Header */}
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 p-6 sm:p-8 rounded-3xl bg-slate-900 text-white shadow-xl relative overflow-hidden">
          <div className="relative z-10 space-y-2">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-amber-500/20 text-amber-300 text-xs font-semibold">
              <User className="h-3.5 w-3.5" />
              <span>{lang === "so" ? "Xarunta Macmiilka" : "Customer Workspace"}</span>
            </div>
            <h1 className="text-2xl sm:text-3xl font-extrabold font-heading">
              {lang === "so" ? "Kusoo Dhawoow, Sahra & Ahmed" : "Welcome Back, Sahra & Ahmed"}
            </h1>
            <p className="text-xs sm:text-sm text-slate-300 max-w-xl">
              {lang === "so"
                ? "Maamul dalabyadaada, eeg qiimayaasha ay shirkaduhu kuu soo direen, xisaabi miisaaniyadda, oo xaqiiji ballamahaaga meherka."
                : "Manage your wedding bookings, evaluate incoming merchant quotations, monitor event tasks, and track payment milestones in one verified workspace."}
            </p>
          </div>

          <div className="relative z-10 flex flex-wrap gap-2">
            <Button asChild size="sm" className="min-h-[44px] bg-amber-600 hover:bg-amber-700 text-white font-bold text-xs gap-2">
              <Link href="/plan">
                <Sparkles className="h-4 w-4" />
                <span>{lang === "so" ? "Qabanqaabiyaha Munaasabadda" : "Event Planner"}</span>
              </Link>
            </Button>
            <Button asChild variant="outline" size="sm" className="min-h-[44px] border-slate-700 text-white hover:bg-slate-800 text-xs font-bold gap-2">
              <Link href="/providers">
                <span>{lang === "so" ? "Baadh Shirkado Kale" : "Browse More Merchants"}</span>
                <ArrowRight className="h-4 w-4" />
              </Link>
            </Button>
          </div>
        </div>

        {/* Quick KPI Overview Cards */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
          <div className="p-4 sm:p-5 rounded-2xl border border-slate-200 dark:border-slate-800 bg-card shadow-xs space-y-1.5">
            <div className="flex items-center justify-between text-slate-500 text-xs">
              <span>{lang === "so" ? "Dalabyada Socda" : "Active Inquiries"}</span>
              <MessageSquare className="h-4 w-4 text-amber-600" />
            </div>
            <div className="text-2xl font-bold font-heading text-slate-900 dark:text-white">
              {inquiries.length}
            </div>
            <div className="text-[11px] text-slate-500">
              {inquiries.filter((i) => i.status === "quotation_sent").length} {lang === "so" ? "qiimayn sugaya" : "awaiting review"}
            </div>
          </div>

          <div className="p-4 sm:p-5 rounded-2xl border border-slate-200 dark:border-slate-800 bg-card shadow-xs space-y-1.5">
            <div className="flex items-center justify-between text-slate-500 text-xs">
              <span>{lang === "so" ? "Heshiisyada Xaqiiqsan" : "Confirmed Bookings"}</span>
              <ShieldCheck className="h-4 w-4 text-emerald-600" />
            </div>
            <div className="text-2xl font-bold font-heading text-slate-900 dark:text-white">
              {inquiries.filter((i) => i.status === "confirmed").length}
            </div>
            <div className="text-[11px] text-emerald-600 dark:text-emerald-400 font-semibold">
              {lang === "so" ? "Qandaraasyo damaanad leh" : "Audited merchant SLA"}
            </div>
          </div>

          <div className="p-4 sm:p-5 rounded-2xl border border-slate-200 dark:border-slate-800 bg-card shadow-xs space-y-1.5">
            <div className="flex items-center justify-between text-slate-500 text-xs">
              <span>{lang === "so" ? "Hawlaha Qabanqaabada" : "Planning Progress"}</span>
              <CheckCircle2 className="h-4 w-4 text-blue-600" />
            </div>
            <div className="text-2xl font-bold font-heading text-slate-900 dark:text-white">
              {completedTasks}/{totalTasks}
            </div>
            <div className="text-[11px] text-slate-500">
              {totalTasks > 0 ? Math.round((completedTasks / totalTasks) * 100) : 0}% {lang === "so" ? "dhammaystiran" : "completed"}
            </div>
          </div>

          <div className="p-4 sm:p-5 rounded-2xl border border-slate-200 dark:border-slate-800 bg-card shadow-xs space-y-1.5">
            <div className="flex items-center justify-between text-slate-500 text-xs">
              <span>{lang === "so" ? "Miisaaniyadda La Bixiyay" : "Budget Committed"}</span>
              <DollarSign className="h-4 w-4 text-amber-600" />
            </div>
            <div className="text-2xl font-bold font-heading text-slate-900 dark:text-white">
              ${actualSpent.toLocaleString()}
            </div>
            <div className="text-[11px] text-slate-500">
              {lang === "so" ? "Qorshuhu wuxuu ahaa" : "Estimated"} ${totalBudget.toLocaleString()}
            </div>
          </div>
        </div>

        {/* Inquiries & Quotation Inbox */}
        <div className="space-y-4">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 border-b border-slate-200 dark:border-slate-800 pb-3">
            <div>
              <h2 className="text-xl font-bold font-heading text-slate-900 dark:text-white flex items-center gap-2">
                <MessageSquare className="h-5 w-5 text-amber-600" />
                <span>{lang === "so" ? "Dalabyada & Xigashooyinka Qiimaha" : "Inquiries & Merchant Quotations"}</span>
              </h2>
              <p className="text-xs text-slate-500">
                {lang === "so"
                  ? "Eeg xaaladda dalabyadaada meherka iyo qiimayaasha rasmiga ah ee shirkadaha."
                  : "Review provider response times, accepted price versions, and booking status transitions."}
              </p>
            </div>

            <Button asChild variant="outline" size="sm" className="min-h-[44px] text-xs font-semibold">
              <Link href="/account/inquiries">
                <span>{lang === "so" ? "Eeg Dhammaan Dalabyada" : "View All Inquiries"}</span>
                <ArrowRight className="h-3.5 w-3.5 ml-1" />
              </Link>
            </Button>
          </div>

          <div className="divide-y divide-slate-100 dark:divide-slate-800 rounded-2xl border border-slate-200 dark:border-slate-800 bg-card overflow-hidden">
            {inquiries.map((inq) => (
              <div key={inq.id} className="p-4 sm:p-5 flex flex-col sm:flex-row sm:items-center justify-between gap-4 hover:bg-slate-50/50 dark:hover:bg-slate-900/50 transition-colors">
                <div className="space-y-1.5 flex-1">
                  <div className="flex flex-wrap items-center gap-2">
                    <h3 className="text-sm font-bold text-slate-900 dark:text-white">
                      {inq.providerName}
                    </h3>
                    {getStatusBadge(inq.status)}
                    <span className="text-[11px] text-slate-400">
                      ID: {inq.id}
                    </span>
                  </div>

                  <div className="flex flex-wrap items-center gap-4 text-xs text-slate-600 dark:text-slate-300">
                    <span className="flex items-center gap-1">
                      <Calendar className="h-3.5 w-3.5 text-slate-400" />
                      <strong>{lang === "so" ? "Taariikhda:" : "Date:"}</strong> {inq.eventDate}
                    </span>
                    <span className="flex items-center gap-1">
                      <Clock className="h-3.5 w-3.5 text-slate-400" />
                      <strong>{lang === "so" ? "Martida:" : "Guests:"}</strong> {inq.guestCount}
                    </span>
                    {inq.quotedPriceUsd ? (
                      <span className="font-bold text-amber-700 dark:text-amber-400">
                        {lang === "so" ? "Qiimaha Shirkadda:" : "Quoted:"} ${inq.quotedPriceUsd.toLocaleString()} USD
                      </span>
                    ) : (
                      <span className="text-slate-400 italic">
                        {lang === "so" ? "Sugaya qiimaha shirkadda" : "Awaiting merchant quote"}
                      </span>
                    )}
                  </div>
                </div>

                <div className="flex items-center gap-2 shrink-0">
                  {inq.status === "quotation_sent" && (
                    <Button
                      size="sm"
                      onClick={() => {
                        WeddingStore.updateInquiryStatus(inq.id, "confirmed")
                        setInquiries(WeddingStore.getInquiries())
                      }}
                      className="min-h-[44px] bg-emerald-600 hover:bg-emerald-700 text-white text-xs font-bold px-4"
                    >
                      <CheckCircle2 className="h-4 w-4 mr-1.5" />
                      <span>{lang === "so" ? "Aqbal & Xaqiiji" : "Accept & Confirm"}</span>
                    </Button>
                  )}
                  <Button asChild variant="outline" size="sm" className="min-h-[44px] text-xs font-semibold px-3">
                    <Link href={`/account/inquiries`}>
                      <span>{lang === "so" ? "Faahfaahin" : "Details"}</span>
                    </Link>
                  </Button>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Quick Nav Grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <Link
            href="/account/bookings"
            className="p-5 rounded-2xl border border-slate-200 dark:border-slate-800 bg-card hover:border-amber-500/50 transition-all flex items-center justify-between group"
          >
            <div className="space-y-1">
              <div className="font-bold text-slate-900 dark:text-white text-sm group-hover:text-amber-600 transition-colors">
                {lang === "so" ? "Ballamahaaga Rasmiga ah" : "Confirmed Bookings"}
              </div>
              <div className="text-xs text-slate-500">
                {lang === "so" ? "Kormeer heshiisyada iyo lacagaha la qabtay" : "Milestones, deposit receipts, SLA"}
              </div>
            </div>
            <ArrowRight className="h-4 w-4 text-slate-400 group-hover:text-amber-600 group-hover:translate-x-0.5 transition-all" />
          </Link>

          <Link
            href="/plan"
            className="p-5 rounded-2xl border border-slate-200 dark:border-slate-800 bg-card hover:border-amber-500/50 transition-all flex items-center justify-between group"
          >
            <div className="space-y-1">
              <div className="font-bold text-slate-900 dark:text-white text-sm group-hover:text-amber-600 transition-colors">
                {lang === "so" ? "Jadwalka & Hawlaha Meherka" : "Wedding Run Sheet & Tasks"}
              </div>
              <div className="text-xs text-slate-500">
                {lang === "so" ? "Jadwalka daqiiqad-daqiiqad ah ee habeenka" : "Minute-by-minute reception timeline"}
              </div>
            </div>
            <ArrowRight className="h-4 w-4 text-slate-400 group-hover:text-amber-600 group-hover:translate-x-0.5 transition-all" />
          </Link>

          <Link
            href="/resources"
            className="p-5 rounded-2xl border border-slate-200 dark:border-slate-800 bg-card hover:border-amber-500/50 transition-all flex items-center justify-between group"
          >
            <div className="space-y-1">
              <div className="font-bold text-slate-900 dark:text-white text-sm group-hover:text-amber-600 transition-colors">
                {lang === "so" ? "Qoraallada & Shuruucda Meherka" : "Resource Templates & Forms"}
              </div>
              <div className="text-xs text-slate-500">
                {lang === "so" ? "15 heshiisyo xaqiijsan oo PDF/DOC ah" : "15 verified checklists, budget sheets & contracts"}
              </div>
            </div>
            <ArrowRight className="h-4 w-4 text-slate-400 group-hover:text-amber-600 group-hover:translate-x-0.5 transition-all" />
          </Link>
        </div>
      </main>

      <WeddingFooter />
    </div>
  )
}
