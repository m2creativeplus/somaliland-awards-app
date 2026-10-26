"use client"

import Link from "next/link"
import { useState, useEffect } from "react"
import { Sparkles, ShieldCheck, Heart, MapPin, Mail, Phone, ExternalLink } from "lucide-react"
import { WeddingStore, BrandingSettings } from "@/lib/weddings/store"
import { TRANSLATIONS } from "@/lib/weddings/translations"

export function WeddingFooter() {
  const [lang, setLang] = useState<"so" | "en">("so")
  const [branding, setBranding] = useState<BrandingSettings | null>(null)
  const currentYear = new Date().getFullYear()

  useEffect(() => {
    setLang(WeddingStore.getLanguage())
    setBranding(WeddingStore.getBranding())

    const handleLangChange = () => {
      setLang(WeddingStore.getLanguage())
    }
    window.addEventListener("languagechange", handleLangChange)
    return () => window.removeEventListener("languagechange", handleLangChange)
  }, [])

  const t = TRANSLATIONS[lang]
  const showPoweredBy = branding ? branding.showPoweredByM2 : true

  return (
    <footer className="border-t border-slate-900 bg-slate-950 text-slate-300" aria-labelledby="footer-heading">
      <h2 id="footer-heading" className="sr-only">Footer</h2>

      {/* Somaliland tri-color national bar */}
      <div className="h-1 w-full bg-gradient-to-r from-[#1B5E20] via-[#FFFFFF] to-[#C62828]" />

      <div className="container py-12 lg:py-16">
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-8 lg:gap-10">
          {/* Brand info */}
          <div className="sm:col-span-2 lg:col-span-2 space-y-4">
            <Link href="/" className="flex items-center gap-2.5 inline-flex focus-visible:outline-hidden focus-visible:ring-2 focus-visible:ring-amber-500 rounded-lg">
              <div className="h-9 w-9 rounded-xl bg-gradient-to-br from-amber-600 to-amber-700 flex items-center justify-center text-white shadow-md">
                <Sparkles className="h-4 w-4" aria-hidden="true" />
              </div>
              <div>
                <div className="font-heading text-base font-extrabold text-white leading-none">
                  {branding ? (lang === "so" ? branding.siteNameSo : branding.siteNameEn) : t.brandTitle}
                </div>
                <div className="text-[10px] text-amber-400 font-bold tracking-wide uppercase mt-1">
                  Republic of Somaliland · Hargeisa
                </div>
              </div>
            </Link>

            <p className="text-xs sm:text-sm text-slate-300 leading-relaxed max-w-sm">
              {t.footerDesc}
            </p>

            <div className="space-y-2 text-xs text-slate-300 pt-1">
              <div className="flex items-center gap-2">
                <MapPin className="h-3.5 w-3.5 text-amber-400 shrink-0" aria-hidden="true" />
                <span>Sha&apos;ab District, Hargeisa, Republic of Somaliland</span>
              </div>
              <div className="flex items-center gap-2">
                <Mail className="h-3.5 w-3.5 text-amber-400 shrink-0" aria-hidden="true" />
                <a href={`mailto:${branding?.contactEmail || "weddings@m2creative.sl"}`} className="hover:text-amber-400 transition-colors">
                  {branding?.contactEmail || "weddings@m2creative.sl"}
                </a>
              </div>
              <div className="flex items-center gap-2">
                <Phone className="h-3.5 w-3.5 text-amber-400 shrink-0" aria-hidden="true" />
                <a href={`tel:${branding?.contactPhone || "+252634400111"}`} className="hover:text-amber-400 transition-colors">
                  {branding?.contactPhone || "+252 63 4400111"}
                </a>
              </div>
            </div>

            <div className="pt-2">
              <div className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full bg-emerald-950/80 border border-emerald-500/30 text-emerald-300 text-xs font-semibold">
                <ShieldCheck className="h-4 w-4 text-emerald-400" aria-hidden="true" />
                <span>{lang === "so" ? "100% Kormeer Dhab ah oo Goobta ah" : "100% In-Person Physical Provider Audits"}</span>
              </div>
            </div>
          </div>

          {/* Column 1: Marketplace */}
          <div className="space-y-3">
            <h3 className="font-bold text-white text-xs uppercase tracking-wider">
              {t.footerPlatform}
            </h3>
            <ul className="space-y-2 text-xs sm:text-sm text-slate-300">
              <li>
                <Link href="/providers" className="hover:text-amber-400 transition-colors py-1 block">
                  {t.navProviders}
                </Link>
              </li>
              <li>
                <Link href="/categories" className="hover:text-amber-400 transition-colors py-1 block">
                  {lang === "so" ? "Qaybaha Ganacsiga" : "All Categories"}
                </Link>
              </li>
              <li>
                <Link href="/locations" className="hover:text-amber-400 transition-colors py-1 block">
                  {lang === "so" ? "Magaalooyinka" : "Service Areas"}
                </Link>
              </li>
              <li>
                <Link href="/packages" className="hover:text-amber-400 transition-colors py-1 block">
                  {t.navPackages}
                </Link>
              </li>
              <li>
                <Link href="/compare" className="hover:text-amber-400 transition-colors py-1 block">
                  {t.navCompare}
                </Link>
              </li>
            </ul>
          </div>

          {/* Column 2: Planning & Events */}
          <div className="space-y-3">
            <h3 className="font-bold text-white text-xs uppercase tracking-wider">
              {lang === "so" ? "Qorshaynta" : "Planning Tools"}
            </h3>
            <ul className="space-y-2 text-xs sm:text-sm text-slate-300">
              <li>
                <Link href="/plan" className="hover:text-amber-400 transition-colors py-1 block">
                  {t.navPlanner}
                </Link>
              </li>
              <li>
                <Link href="/plan/budget" className="hover:text-amber-400 transition-colors py-1 block">
                  {lang === "so" ? "Xisaabiyaha Miisaaniyadda" : "Budget Calculator"}
                </Link>
              </li>
              <li>
                <Link href="/events" className="hover:text-amber-400 transition-colors py-1 block">
                  {t.navEvents}
                </Link>
              </li>
              <li>
                <Link href="/resources" className="hover:text-amber-400 transition-colors py-1 block">
                  {t.navTemplates} (15)
                </Link>
              </li>
              <li>
                <Link href="/market-insights" className="hover:text-amber-400 transition-colors py-1 block">
                  {t.navInsights}
                </Link>
              </li>
            </ul>
          </div>

          {/* Column 3: Workspaces */}
          <div className="space-y-3">
            <h3 className="font-bold text-white text-xs uppercase tracking-wider">
              {lang === "so" ? "Xafiisyada" : "Workspaces"}
            </h3>
            <ul className="space-y-2 text-xs sm:text-sm text-slate-300">
              <li>
                <Link href="/account" className="hover:text-amber-400 transition-colors py-1 block">
                  {lang === "so" ? "Xafiiska Macmiilka" : "Customer Portal"}
                </Link>
              </li>
              <li>
                <Link href="/provider/dashboard" className="hover:text-amber-400 transition-colors py-1 block">
                  {lang === "so" ? "Xafiiska Shirkadaha" : "Provider Portal"}
                </Link>
              </li>
              <li>
                <Link href="/affiliate/dashboard" className="hover:text-amber-400 transition-colors py-1 block">
                  {lang === "so" ? "Barnaamijka Wadaaga" : "Affiliate Portal"}
                </Link>
              </li>
              <li>
                <Link href="/admin/settings" className="hover:text-amber-400 transition-colors py-1 block text-amber-400 font-semibold">
                  {lang === "so" ? "Control Plane (CMS)" : "Visual Control Plane"}
                </Link>
              </li>
            </ul>
          </div>

          {/* Column 4: Governance & Legal */}
          <div className="space-y-3">
            <h3 className="font-bold text-white text-xs uppercase tracking-wider">
              {lang === "so" ? "Sharciga & Xeerarka" : "Governance"}
            </h3>
            <ul className="space-y-2 text-xs sm:text-sm text-slate-300">
              <li>
                <Link href="/privacy" className="hover:text-amber-400 transition-colors py-1 block">
                  {lang === "so" ? "Ilaalinta Xogta" : "Privacy Policy"}
                </Link>
              </li>
              <li>
                <Link href="/terms" className="hover:text-amber-400 transition-colors py-1 block">
                  {lang === "so" ? "Shuruudaha Isticmaalka" : "Terms of Service"}
                </Link>
              </li>
              <li>
                <Link href="/guidelines" className="hover:text-amber-400 transition-colors py-1 block">
                  {lang === "so" ? "Xeerarka Shirkadaha" : "Merchant Standards"}
                </Link>
              </li>
              <li>
                <Link href="/contact" className="hover:text-amber-400 transition-colors py-1 block">
                  {lang === "so" ? "Nala Soo Xiriir" : "Contact & Support"}
                </Link>
              </li>
              <li>
                <Link href="/about" className="hover:text-amber-400 transition-colors py-1 block">
                  {lang === "so" ? "Ku Saabsan Madasha" : "About M2 Platform"}
                </Link>
              </li>
            </ul>
          </div>
        </div>

        {/* Bottom copyright and attribution bar */}
        <div className="mt-12 pt-6 border-t border-slate-900 flex flex-col sm:flex-row items-center justify-between gap-4 text-xs text-slate-400">
          <p>© {currentYear} M2 Creative &amp; Consulting. All rights reserved.</p>

          {showPoweredBy && (
            <div className="flex items-center gap-2">
              <span className="text-slate-400">Built by</span>
              <a
                href="https://m2creative.site/"
                target="_blank"
                rel="noopener noreferrer"
                title="M2 Creative &amp; Consulting — Strategy. Research. Project Development."
                className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-md bg-slate-900 border border-slate-800 text-amber-400 hover:text-amber-300 hover:border-amber-500/40 transition-all font-bold text-xs shadow-xs focus-visible:outline-hidden focus-visible:ring-2 focus-visible:ring-amber-500 min-h-[44px]"
              >
                <Sparkles className="h-3.5 w-3.5 text-amber-400" aria-hidden="true" />
                <span>M2 Creative &amp; Consulting</span>
              </a>
            </div>
          )}
        </div>
      </div>
    </footer>
  )
}
