"use client"

import Link from "next/link"
import { usePathname } from "next/navigation"
import { useState, useEffect } from "react"
import { Button } from "@/components/ui/button"
import { Sheet, SheetContent, SheetHeader, SheetTitle, SheetTrigger } from "@/components/ui/sheet"
import {
  Menu,
  Globe,
  Sparkles,
  Building2,
  Calendar,
  FileText,
  BarChart3,
  ShieldCheck,
  Search,
  User,
  Store,
  Layers,
  MapPin,
  Share2,
} from "lucide-react"
import { WeddingStore, BrandingSettings } from "@/lib/weddings/store"
import { TRANSLATIONS } from "@/lib/weddings/translations"

export function WeddingHeader() {
  const pathname = usePathname()
  const [lang, setLang] = useState<"so" | "en">("so")
  const [branding, setBranding] = useState<BrandingSettings | null>(null)
  const [mobileOpen, setMobileOpen] = useState(false)

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

  const toggleLanguage = () => {
    const nextLang = lang === "so" ? "en" : "so"
    WeddingStore.setLanguage(nextLang)
    setLang(nextLang)
    if (typeof document !== "undefined") {
      document.documentElement.lang = nextLang
    }
  }

  const navItems = [
    { name: t.navHome, href: "/" },
    { name: t.navProviders, href: "/providers" },
    { name: lang === "so" ? "Qaybaha" : "Categories", href: "/categories" },
    { name: lang === "so" ? "Magaalooyinka" : "Locations", href: "/locations" },
    { name: t.navPackages, href: "/packages" },
    { name: t.navCompare, href: "/compare" },
    { name: t.navPlanner, href: "/plan" },
    { name: t.navEvents, href: "/events" },
    { name: t.navTemplates, href: "/resources" },
    { name: t.navInsights, href: "/market-insights" },
  ]

  const siteTitle = branding
    ? lang === "so"
      ? branding.siteNameSo
      : branding.siteNameEn
    : t.brandTitle

  return (
    <header className="sticky top-0 z-50 w-full border-b border-slate-200 dark:border-slate-800 bg-background/95 backdrop-blur-md supports-[backdrop-filter]:bg-background/80">
      {/* Somaliland tri-color national bar */}
      <div className="h-1 w-full bg-gradient-to-r from-[#1B5E20] via-[#FFFFFF] to-[#C62828]" />

      <div className="container flex h-16 sm:h-20 items-center justify-between gap-4">
        {/* Brand identity */}
        <Link
          href="/"
          className="flex items-center gap-3 group shrink-0 focus-visible:outline-hidden focus-visible:ring-2 focus-visible:ring-amber-500 rounded-lg p-1"
          aria-label={`${siteTitle} Home`}
        >
          <div className="h-10 w-10 sm:h-11 sm:w-11 rounded-xl bg-gradient-to-br from-amber-600 to-amber-700 flex items-center justify-center text-white shadow-md group-hover:scale-105 transition-transform">
            <Sparkles className="h-5 w-5 sm:h-6 sm:w-6" aria-hidden="true" />
          </div>
          <div>
            <div className="font-heading text-sm sm:text-base font-extrabold text-foreground leading-none">
              {siteTitle}
            </div>
            <div className="text-[10px] text-amber-700 dark:text-amber-400 font-bold uppercase tracking-wider mt-1">
              Powered by M2 Creative
            </div>
          </div>
        </Link>

        {/* Desktop Navigation */}
        <nav className="hidden 2xl:flex items-center gap-1" aria-label="Main Navigation">
          {navItems.map((item) => {
            const isActive = pathname === item.href
            return (
              <Link
                key={item.href}
                href={item.href}
                className={`px-3 py-2 rounded-lg text-xs font-semibold transition-colors focus-visible:outline-hidden focus-visible:ring-2 focus-visible:ring-amber-500 ${
                  isActive
                    ? "bg-amber-500/15 text-amber-800 dark:text-amber-300 font-bold"
                    : "text-slate-600 dark:text-slate-300 hover:text-foreground hover:bg-slate-100 dark:hover:bg-slate-800"
                }`}
              >
                {item.name}
              </Link>
            )
          })}
        </nav>

        {/* Secondary Portal Links & Controls */}
        <div className="flex items-center gap-2 sm:gap-2.5">
          {/* Global Search Button */}
          <Button
            variant="ghost"
            size="sm"
            className="h-10 w-10 p-0 text-slate-600 dark:text-slate-300 hover:text-foreground"
            asChild
          >
            <Link href="/search" aria-label="Search Marketplace">
              <Search className="h-4 w-4" />
            </Link>
          </Button>

          {/* Accessible language toggle (min 44px tap target) */}
          <Button
            variant="outline"
            size="sm"
            onClick={toggleLanguage}
            className="min-h-[44px] px-3 gap-1.5 text-xs font-bold border-amber-600/30 hover:bg-amber-500/10 text-slate-800 dark:text-slate-200"
            aria-label={`Current language: ${lang === "so" ? "Soomaali" : "English"}. Click to switch.`}
          >
            <Globe className="h-4 w-4 text-amber-600" aria-hidden="true" />
            <span>{lang === "so" ? "English" : "Soomaali"}</span>
          </Button>

          {/* Workspaces Menu for Desktop */}
          <div className="hidden lg:flex items-center gap-1.5">
            <Button
              variant="ghost"
              size="sm"
              className="min-h-[44px] text-xs font-semibold text-slate-700 dark:text-slate-300 hover:text-foreground gap-1.5"
              asChild
            >
              <Link href="/account">
                <User className="h-3.5 w-3.5" />
                <span>{lang === "so" ? "Akoonkayga" : "Account"}</span>
              </Link>
            </Button>

            <Button
              variant="outline"
              size="sm"
              className="min-h-[44px] text-xs font-semibold border-slate-300 dark:border-slate-700 gap-1.5"
              asChild
            >
              <Link href="/provider/dashboard">
                <Store className="h-3.5 w-3.5 text-amber-600" />
                <span>{lang === "so" ? "Portal-ka Shirkadaha" : "Vendor Portal"}</span>
              </Link>
            </Button>

            <Button
              size="sm"
              className="min-h-[44px] bg-amber-600 hover:bg-amber-700 text-white text-xs font-bold px-3.5 shadow-xs"
              asChild
            >
              <Link href="/admin/settings">Control Plane</Link>
            </Button>
          </div>

          {/* Mobile Drawer Trigger (accessible 44px tap area) */}
          <Sheet open={mobileOpen} onOpenChange={setMobileOpen}>
            <SheetTrigger asChild>
              <Button
                variant="ghost"
                size="default"
                className="2xl:hidden min-h-[44px] min-w-[44px] p-2 text-foreground"
                aria-label="Fur liiska hagidda / Open navigation menu"
              >
                <Menu className="h-6 w-6" aria-hidden="true" />
              </Button>
            </SheetTrigger>
            <SheetContent side="right" className="w-[85vw] max-w-sm p-0 flex flex-col">
              <SheetHeader className="px-6 py-5 border-b text-left">
                <SheetTitle className="flex items-center gap-2.5">
                  <div className="h-9 w-9 rounded-lg bg-amber-600 flex items-center justify-center text-white shrink-0">
                    <Sparkles className="h-5 w-5" />
                  </div>
                  <div>
                    <div className="text-base font-extrabold font-heading leading-tight">{siteTitle}</div>
                    <div className="text-xs text-amber-600 font-semibold">Hargeisa, Republic of Somaliland</div>
                  </div>
                </SheetTitle>
              </SheetHeader>

              {/* Mobile Drawer Content */}
              <div className="p-4 flex-1 overflow-y-auto space-y-6">
                {/* Search in Drawer */}
                <div className="pt-1">
                  <Button asChild variant="outline" className="w-full justify-start min-h-[44px] text-xs gap-2 text-muted-foreground">
                    <Link href="/search" onClick={() => setMobileOpen(false)}>
                      <Search className="h-4 w-4" />
                      <span>{t.searchPlaceholder}</span>
                    </Link>
                  </Button>
                </div>

                {/* Primary Navigation */}
                <div className="space-y-1">
                  <div className="text-[11px] font-bold text-slate-400 uppercase tracking-wider px-3 mb-2">
                    {lang === "so" ? "Bogagga Guud" : "Marketplace"}
                  </div>
                  {navItems.map((item) => {
                    const isActive = pathname === item.href
                    return (
                      <Link
                        key={item.href}
                        href={item.href}
                        onClick={() => setMobileOpen(false)}
                        className={`flex items-center px-4 py-3 rounded-lg text-sm font-semibold transition-colors min-h-[44px] ${
                          isActive
                            ? "bg-amber-500/15 text-amber-800 dark:text-amber-300 font-bold"
                            : "text-slate-700 dark:text-slate-200 hover:bg-slate-100 dark:hover:bg-slate-800"
                        }`}
                      >
                        {item.name}
                      </Link>
                    )
                  })}
                </div>

                {/* Portals & Workspaces */}
                <div className="space-y-1 pt-3 border-t">
                  <div className="text-[11px] font-bold text-slate-400 uppercase tracking-wider px-3 mb-2">
                    {lang === "so" ? "Xafiisyada & Qorshaynta" : "Portals & Workspaces"}
                  </div>
                  <Link
                    href="/account"
                    onClick={() => setMobileOpen(false)}
                    className="flex items-center gap-2.5 px-4 py-3 rounded-lg text-sm font-semibold text-slate-700 dark:text-slate-200 hover:bg-slate-100 dark:hover:bg-slate-800 min-h-[44px]"
                  >
                    <User className="h-4 w-4 text-amber-600" />
                    <span>{lang === "so" ? "Xafiiska Macmiilka (Account)" : "Customer Workspace"}</span>
                  </Link>

                  <Link
                    href="/provider/dashboard"
                    onClick={() => setMobileOpen(false)}
                    className="flex items-center gap-2.5 px-4 py-3 rounded-lg text-sm font-semibold text-slate-700 dark:text-slate-200 hover:bg-slate-100 dark:hover:bg-slate-800 min-h-[44px]"
                  >
                    <Store className="h-4 w-4 text-amber-600" />
                    <span>{lang === "so" ? "Xafiiska Shirkadaha (Vendor Portal)" : "Provider Portal"}</span>
                  </Link>

                  <Link
                    href="/affiliate/dashboard"
                    onClick={() => setMobileOpen(false)}
                    className="flex items-center gap-2.5 px-4 py-3 rounded-lg text-sm font-semibold text-slate-700 dark:text-slate-200 hover:bg-slate-100 dark:hover:bg-slate-800 min-h-[44px]"
                  >
                    <Share2 className="h-4 w-4 text-emerald-600" />
                    <span>{lang === "so" ? "Barnaamijka Wadaaga (Affiliate)" : "Affiliate Portal"}</span>
                  </Link>
                </div>

                {/* Actions & Language Switcher */}
                <div className="pt-4 border-t space-y-2.5">
                  <Button
                    variant="outline"
                    onClick={() => {
                      toggleLanguage()
                      setMobileOpen(false)
                    }}
                    className="w-full justify-center gap-2 min-h-[44px] text-xs font-bold"
                  >
                    <Globe className="h-4 w-4 text-amber-600" />
                    <span>{lang === "so" ? "Switch to English" : "U beddel Af-Soomaali"}</span>
                  </Button>

                  <Button
                    className="w-full min-h-[44px] bg-amber-600 hover:bg-amber-700 text-white text-xs font-bold"
                    asChild
                  >
                    <Link href="/admin/settings" onClick={() => setMobileOpen(false)}>
                      Control Plane (Visual CMS)
                    </Link>
                  </Button>
                </div>
              </div>
            </SheetContent>
          </Sheet>
        </div>
      </div>
    </header>
  )
}
