"use client"

import { useState, useEffect } from "react"
import { useParams } from "next/navigation"
import Link from "next/link"
import { WeddingHeader } from "@/components/weddings/wedding-header"
import { WeddingFooter } from "@/components/weddings/wedding-footer"
import { InquiryModal } from "@/components/weddings/inquiry-modal"
import { WeddingStore } from "@/lib/weddings/store"
import { Provider, ProviderPackage } from "@/lib/weddings/types"
import { TRANSLATIONS } from "@/lib/weddings/translations"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import {
  ShieldCheck,
  Star,
  MapPin,
  Clock,
  Phone,
  Mail,
  MessageCircle,
  Check,
  Calendar,
  Share2,
  ArrowLeft,
  DollarSign,
} from "lucide-react"

export default function ProviderStorefrontPage() {
  const params = useParams()
  const slug = params?.slug as string

  const [lang, setLang] = useState<"so" | "en">("so")
  const [provider, setProvider] = useState<Provider | undefined>(undefined)
  const [selectedPackage, setSelectedPackage] = useState<ProviderPackage | undefined>(undefined)
  const [inquiryModalOpen, setInquiryModalOpen] = useState(false)
  const [copied, setCopied] = useState(false)

  useEffect(() => {
    setLang(WeddingStore.getLanguage())
    setProvider(WeddingStore.getProviderBySlug(slug))

    const handleLang = () => setLang(WeddingStore.getLanguage())
    window.addEventListener("languagechange", handleLang)
    return () => window.removeEventListener("languagechange", handleLang)
  }, [slug])

  const t = TRANSLATIONS[lang]

  if (!provider) {
    return (
      <div className="min-h-screen flex flex-col bg-background text-foreground">
        <WeddingHeader />
        <div className="flex-1 container py-20 text-center space-y-4">
          <h1 className="text-2xl font-bold font-heading">
            {lang === "so" ? "Shirkadda Lama Helin" : "Provider Not Found"}
          </h1>
          <p className="text-sm text-muted-foreground">
            {lang === "so" ? "Shirkadda aad raadinayso ma jirto ama waa la saaray." : "The provider profile you requested does not exist."}
          </p>
          <Button asChild variant="outline">
            <Link href="/providers">{lang === "so" ? "Dib ugu noqo Liiska" : "Back to Directory"}</Link>
          </Button>
        </div>
        <WeddingFooter />
      </div>
    )
  }

  const name = lang === "so" ? provider.businessNameSo : provider.businessNameEn
  const desc = lang === "so" ? provider.descriptionSo : provider.descriptionEn

  const handleShare = () => {
    if (typeof window !== "undefined") {
      navigator.clipboard.writeText(window.location.href)
      setCopied(true)
      setTimeout(() => setCopied(false), 2000)
    }
  }

  return (
    <div className="min-h-screen flex flex-col bg-background text-foreground">
      <WeddingHeader />

      <main className="flex-1 pb-16">
        {/* Breadcrumb & Navigation */}
        <div className="border-b bg-muted/30 py-3">
          <div className="container flex items-center justify-between text-xs">
            <Link href="/providers" className="flex items-center gap-1.5 text-muted-foreground hover:text-foreground">
              <ArrowLeft className="h-3.5 w-3.5" />
              <span>{lang === "so" ? "Dib ugu noqo Shirkadaha" : "Back to Providers"}</span>
            </Link>
            <Button variant="ghost" size="sm" onClick={handleShare} className="h-7 gap-1.5 text-xs">
              <Share2 className="h-3 w-3" />
              <span>{copied ? (lang === "so" ? "Link-ga Waa La Koobiyay!" : "Link Copied!") : (lang === "so" ? "La Wadaag" : "Share Profile")}</span>
            </Button>
          </div>
        </div>

        {/* Hero Banner with Portfolio Gallery */}
        <section className="py-8 bg-muted/10">
          <div className="container space-y-6">
            <div className="grid grid-cols-1 md:grid-cols-3 gap-3 rounded-2xl overflow-hidden border max-h-[440px]">
              <div className="md:col-span-2 relative aspect-[16/10] md:aspect-auto overflow-hidden bg-muted">
                <img
                  src={provider.portfolioImages[0] || "https://images.unsplash.com/photo-1519741497674-611481863552?auto=format&fit=crop&w=1200&q=80"}
                  alt={name}
                  className="h-full w-full object-cover"
                />
              </div>
              <div className="hidden md:grid grid-rows-2 gap-3">
                <div className="overflow-hidden bg-muted">
                  <img
                    src={provider.portfolioImages[1] || provider.portfolioImages[0]}
                    alt={`${name} gallery 2`}
                    className="h-full w-full object-cover"
                  />
                </div>
                <div className="overflow-hidden bg-muted">
                  <img
                    src={provider.portfolioImages[2] || provider.portfolioImages[0]}
                    alt={`${name} gallery 3`}
                    className="h-full w-full object-cover"
                  />
                </div>
              </div>
            </div>

            {/* Business Header Info */}
            <div className="flex flex-col md:flex-row md:items-start justify-between gap-6 pt-2">
              <div className="space-y-2">
                <div className="flex flex-wrap items-center gap-2">
                  <Badge variant="outline" className="uppercase text-[10px] font-semibold">
                    {provider.category}
                  </Badge>
                  {provider.verificationStatus === "VERIFIED" && (
                    <Badge className="bg-emerald-600 text-white gap-1 text-[11px] font-semibold">
                      <ShieldCheck className="h-3.5 w-3.5" />
                      [VERIFIED] In-Person Audited
                    </Badge>
                  )}
                  <Badge variant="secondary" className="text-[11px]">
                    {provider.priceTier} Tier
                  </Badge>
                </div>

                <h1 className="text-3xl md:text-4xl font-extrabold font-heading text-foreground">
                  {name}
                </h1>

                <div className="flex flex-wrap items-center gap-4 text-xs text-muted-foreground pt-1">
                  <span className="flex items-center gap-1">
                    <MapPin className="h-3.5 w-3.5 text-amber-600" />
                    {provider.address}
                  </span>
                  <span className="flex items-center gap-1">
                    <Star className="h-3.5 w-3.5 fill-amber-400 text-amber-400" />
                    <strong className="text-foreground">{provider.rating}</strong> ({provider.reviewCount} {lang === "so" ? "qiimaynood" : "verified reviews"})
                  </span>
                  <span className="flex items-center gap-1">
                    <Clock className="h-3.5 w-3.5 text-muted-foreground" />
                    {provider.leadResponseTimeHours}h {lang === "so" ? "jawaab celin ah" : "lead time"}
                  </span>
                </div>
              </div>

              {/* Direct Actions Card */}
              <div className="flex flex-wrap sm:flex-nowrap gap-2 shrink-0">
                <Button
                  size="lg"
                  className="bg-amber-600 hover:bg-amber-700 text-white font-semibold text-sm gap-2 shadow-md w-full sm:w-auto"
                  onClick={() => {
                    setSelectedPackage(undefined)
                    setInquiryModalOpen(true)
                  }}
                >
                  <MessageCircle className="h-4 w-4" />
                  <span>{t.requestQuote}</span>
                </Button>
                <Button
                  variant="outline"
                  size="lg"
                  className="gap-2 text-xs h-11 w-full sm:w-auto"
                  asChild
                >
                  <a href={`https://wa.me/${provider.whatsapp.replace(/[^0-9]/g, "")}`} target="_blank" rel="noopener noreferrer">
                    <Phone className="h-4 w-4 text-emerald-600" />
                    <span>WhatsApp</span>
                  </a>
                </Button>
              </div>
            </div>
          </div>
        </section>

        {/* Detailed Content: Services, Packages, and Reviews */}
        <section className="py-10">
          <div className="container grid grid-cols-1 lg:grid-cols-3 gap-10">
            {/* Left Column: Description & Published Packages */}
            <div className="lg:col-span-2 space-y-8">
              {/* About Provider */}
              <div className="space-y-3">
                <h2 className="text-xl font-bold font-heading">
                  {lang === "so" ? "Ku Saabsan Shirkadda" : "About the Business"}
                </h2>
                <p className="text-sm text-muted-foreground leading-relaxed whitespace-pre-line">
                  {desc}
                </p>
                <div className="pt-2 flex flex-wrap gap-2 text-xs">
                  <span className="font-semibold text-foreground">{lang === "so" ? "Luqadaha:" : "Languages:"}</span>
                  {provider.languages.map((l) => (
                    <Badge key={l} variant="secondary" className="text-[11px]">
                      {l}
                    </Badge>
                  ))}
                </div>
              </div>

              {/* Published Packages */}
              <div className="space-y-4 pt-4 border-t">
                <div className="flex items-center justify-between">
                  <h2 className="text-xl font-bold font-heading">
                    {lang === "so" ? "Xirmooyinka La Daabacay" : "Published Packages & Rates"}
                  </h2>
                  <span className="text-xs text-muted-foreground">
                    {provider.packages.length} {lang === "so" ? "xirmo" : "packages available"}
                  </span>
                </div>

                <div className="space-y-4">
                  {provider.packages.map((pkg) => {
                    const pkgTitle = lang === "so" ? pkg.titleSo : pkg.titleEn
                    const deliverables = lang === "so" ? pkg.deliverablesSo : pkg.deliverablesEn
                    const travel = lang === "so" ? pkg.travelOvertimeTermsSo : pkg.travelOvertimeTermsEn
                    const cancel = lang === "so" ? pkg.cancellationPolicySo : pkg.cancellationPolicyEn

                    return (
                      <div key={pkg.id} className="p-5 rounded-xl border bg-card shadow-xs space-y-4">
                        <div className="flex flex-col sm:flex-row sm:items-start justify-between gap-3">
                          <div>
                            <h3 className="text-lg font-bold font-heading">{pkgTitle}</h3>
                            <div className="text-xs text-muted-foreground mt-0.5">
                              {pkg.durationCoverage}
                              {pkg.guestCapacityLimit && ` · Up to ${pkg.guestCapacityLimit} guests`}
                            </div>
                          </div>
                          <div className="text-left sm:text-right shrink-0">
                            <div className="text-2xl font-extrabold font-heading text-foreground">
                              ${pkg.priceUsd.toLocaleString()} USD
                            </div>
                            <div className="text-xs text-muted-foreground">
                              ~{pkg.priceSlSh.toLocaleString()} SL Sh
                            </div>
                          </div>
                        </div>

                        {/* Deliverables list */}
                        <div className="space-y-2 pt-2 border-t">
                          <div className="text-xs font-semibold text-foreground">
                            {lang === "so" ? "Adeegyada Ku Jira:" : "Included Deliverables:"}
                          </div>
                          <ul className="grid grid-cols-1 sm:grid-cols-2 gap-2 text-xs">
                            {deliverables.map((item, i) => (
                              <li key={i} className="flex items-start gap-2 text-muted-foreground">
                                <Check className="h-3.5 w-3.5 text-emerald-600 shrink-0 mt-0.5" />
                                <span>{item}</span>
                              </li>
                            ))}
                          </ul>
                        </div>

                        {/* Terms row */}
                        <div className="pt-2 border-t flex flex-wrap gap-4 text-[11px] text-muted-foreground">
                          <div>
                            <span className="font-semibold text-foreground">{lang === "so" ? "Hormarka:" : "Deposit:"}</span> {pkg.depositRequirementPercent}%
                          </div>
                          <div>
                            <span className="font-semibold text-foreground">{lang === "so" ? "Kansalashada:" : "Cancellation:"}</span> {cancel}
                          </div>
                        </div>

                        <div className="pt-2 flex justify-end">
                          <Button
                            size="sm"
                            className="bg-amber-600 hover:bg-amber-700 text-white text-xs font-semibold"
                            onClick={() => {
                              setSelectedPackage(pkg)
                              setInquiryModalOpen(true)
                            }}
                          >
                            {lang === "so" ? "Dalbo Xirmadan" : "Request This Package"}
                          </Button>
                        </div>
                      </div>
                    )
                  })}
                </div>
              </div>

              {/* Verified Reviews */}
              <div className="space-y-4 pt-4 border-t">
                <h2 className="text-xl font-bold font-heading">
                  {lang === "so" ? "Faallooyinka Macaamiisha" : "Verified Customer Reviews"}
                </h2>

                <div className="space-y-3">
                  {provider.reviews.map((rev) => (
                    <div key={rev.id} className="p-4 rounded-xl border bg-muted/20 space-y-2">
                      <div className="flex items-center justify-between">
                        <div className="font-semibold text-xs text-foreground flex items-center gap-2">
                          <span>{rev.customerName}</span>
                          {rev.bookingVerified && (
                            <Badge className="bg-emerald-600/90 text-white text-[9px] font-medium">
                              Verified Booking
                            </Badge>
                          )}
                        </div>
                        <div className="flex items-center gap-1 text-amber-500">
                          {Array.from({ length: rev.rating }).map((_, i) => (
                            <Star key={i} className="h-3 w-3 fill-amber-500" />
                          ))}
                        </div>
                      </div>
                      <p className="text-xs text-muted-foreground leading-relaxed italic">
                        &ldquo;{rev.comment}&rdquo;
                      </p>
                      <div className="text-[10px] text-muted-foreground/60">
                        {rev.date}
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>

            {/* Right Column: Contact card & verification badge */}
            <div className="space-y-6">
              <div className="p-5 rounded-xl border bg-card shadow-sm space-y-4">
                <h3 className="font-heading font-bold text-base">
                  {lang === "so" ? "Xogta Shirkadda" : "Business Details"}
                </h3>

                <div className="space-y-3 text-xs">
                  <div className="flex items-start gap-2.5">
                    <MapPin className="h-4 w-4 text-amber-600 shrink-0 mt-0.5" />
                    <div>
                      <div className="font-semibold text-foreground">{lang === "so" ? "Cinwaanka:" : "Address:"}</div>
                      <div className="text-muted-foreground">{provider.address}</div>
                    </div>
                  </div>

                  <div className="flex items-start gap-2.5">
                    <Phone className="h-4 w-4 text-amber-600 shrink-0 mt-0.5" />
                    <div>
                      <div className="font-semibold text-foreground">{lang === "so" ? "Telefoonka:" : "Phone:"}</div>
                      <div className="text-muted-foreground">{provider.phone}</div>
                    </div>
                  </div>

                  <div className="flex items-start gap-2.5">
                    <Mail className="h-4 w-4 text-amber-600 shrink-0 mt-0.5" />
                    <div>
                      <div className="font-semibold text-foreground">Email:</div>
                      <div className="text-muted-foreground">{provider.email}</div>
                    </div>
                  </div>
                </div>

                <div className="pt-3 border-t space-y-2">
                  <div className="text-[11px] text-muted-foreground font-semibold">
                    {lang === "so" ? "Gobollada Ay Ka Shaqeeyaan:" : "Service Coverage:"}
                  </div>
                  <div className="flex flex-wrap gap-1.5">
                    {provider.serviceAreas.map((area) => (
                      <Badge key={area} variant="secondary" className="text-[10px]">
                        {area}
                      </Badge>
                    ))}
                  </div>
                </div>

                <div className="pt-3 border-t">
                  <Button
                    className="w-full bg-amber-600 hover:bg-amber-700 text-white font-semibold text-xs h-9"
                    onClick={() => {
                      setSelectedPackage(undefined)
                      setInquiryModalOpen(true)
                    }}
                  >
                    {t.requestQuote}
                  </Button>
                </div>
              </div>

              {/* Physical Audit Seal */}
              <div className="p-4 rounded-xl border border-emerald-500/30 bg-emerald-500/10 text-xs space-y-2 text-emerald-950 dark:text-emerald-200">
                <div className="font-bold flex items-center gap-1.5 text-emerald-800 dark:text-emerald-300">
                  <ShieldCheck className="h-4 w-4" />
                  <span>M2 Physical Verification Guarantee</span>
                </div>
                <p className="text-[11px] leading-relaxed">
                  Verified by: <strong>{provider.verifiedBy}</strong> on {provider.lastVerifiedDate}. Includes premises visit, trade license, and zero fictitious claims.
                </p>
              </div>
            </div>
          </div>
        </section>
      </main>

      <InquiryModal
        isOpen={inquiryModalOpen}
        onClose={() => setInquiryModalOpen(false)}
        provider={provider}
        packageItem={selectedPackage}
        lang={lang}
      />

      <WeddingFooter />
    </div>
  )
}
