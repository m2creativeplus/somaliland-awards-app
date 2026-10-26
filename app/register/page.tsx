"use client"

import { useState, useEffect } from "react"
import Link from "next/link"
import { useRouter } from "next/navigation"
import { WeddingHeader } from "@/components/weddings/wedding-header"
import { WeddingFooter } from "@/components/weddings/wedding-footer"
import { WeddingStore } from "@/lib/weddings/store"
import { TRANSLATIONS } from "@/lib/weddings/translations"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import {
  UserPlus,
  User,
  Store,
  Share2,
  CheckCircle2,
  ShieldCheck,
} from "lucide-react"

export default function RegisterPage() {
  const router = useRouter()
  const [lang, setLang] = useState<"so" | "en">("so")
  const [accountType, setAccountType] = useState<"customer" | "provider" | "affiliate">("customer")
  const [fullName, setFullName] = useState("")
  const [email, setEmail] = useState("")
  const [phone, setPhone] = useState("")
  const [businessName, setBusinessName] = useState("")
  const [city, setCity] = useState("Hargeisa")

  useEffect(() => {
    setLang(WeddingStore.getLanguage())
    const handleLang = () => setLang(WeddingStore.getLanguage())
    window.addEventListener("languagechange", handleLang)
    return () => window.removeEventListener("languagechange", handleLang)
  }, [])

  const t = TRANSLATIONS[lang]

  const handleRegister = (e: React.FormEvent) => {
    e.preventDefault()
    if (accountType === "customer") router.push("/account")
    else if (accountType === "provider") router.push("/provider/dashboard")
    else if (accountType === "affiliate") router.push("/affiliate/dashboard")
  }

  return (
    <div className="min-h-screen flex flex-col bg-background text-foreground">
      <WeddingHeader />

      <main className="flex-1 container py-12 flex items-center justify-center">
        <div className="w-full max-w-lg space-y-6">
          <div className="text-center space-y-2">
            <Badge className="bg-amber-600 text-white font-bold text-[11px] tracking-wide">
              {lang === "so" ? "Diiwaangelinta Meherka" : "New Account Registration"}
            </Badge>
            <h1 className="text-2xl sm:text-3xl font-extrabold font-heading text-slate-900 dark:text-white">
              {lang === "so" ? "Ku Biir Suuqa Meherka Somaliland" : "Join Somaliland Weddings & Events"}
            </h1>
            <p className="text-xs sm:text-sm text-slate-500">
              {lang === "so"
                ? "Diiwaangeli qoyskaaga, shirkaddaada, ama akoonkaaga suuqgeynta."
                : "Register as a planning couple, verified merchant, or affiliate partner."}
            </p>
          </div>

          {/* Account Type Toggle */}
          <div className="grid grid-cols-3 gap-2 p-1.5 rounded-2xl bg-slate-100 dark:bg-slate-900 border border-slate-200 dark:border-slate-800">
            <button
              type="button"
              onClick={() => setAccountType("customer")}
              className={`p-3 rounded-xl text-center transition-all ${
                accountType === "customer"
                  ? "bg-background text-slate-900 dark:text-white shadow-xs font-bold"
                  : "text-slate-500 hover:text-slate-900 dark:hover:text-white"
              }`}
            >
              <User className="h-4 w-4 mx-auto mb-1 text-amber-600" />
              <div className="text-xs">{lang === "so" ? "Qoys / Macmiil" : "Couple / Client"}</div>
            </button>

            <button
              type="button"
              onClick={() => setAccountType("provider")}
              className={`p-3 rounded-xl text-center transition-all ${
                accountType === "provider"
                  ? "bg-background text-slate-900 dark:text-white shadow-xs font-bold"
                  : "text-slate-500 hover:text-slate-900 dark:hover:text-white"
              }`}
            >
              <Store className="h-4 w-4 mx-auto mb-1 text-blue-600" />
              <div className="text-xs">{lang === "so" ? "Shirkad Meher" : "Merchant / Venue"}</div>
            </button>

            <button
              type="button"
              onClick={() => setAccountType("affiliate")}
              className={`p-3 rounded-xl text-center transition-all ${
                accountType === "affiliate"
                  ? "bg-background text-slate-900 dark:text-white shadow-xs font-bold"
                  : "text-slate-500 hover:text-slate-900 dark:hover:text-white"
              }`}
            >
              <Share2 className="h-4 w-4 mx-auto mb-1 text-emerald-600" />
              <div className="text-xs">{lang === "so" ? "Xidhiidhiye" : "Affiliate / Partner"}</div>
            </button>
          </div>

          <form
            onSubmit={handleRegister}
            className="p-6 sm:p-8 rounded-3xl border border-slate-200 dark:border-slate-800 bg-card shadow-lg space-y-4"
          >
            <div className="space-y-1">
              <label className="text-xs font-semibold text-slate-700 dark:text-slate-300">
                {lang === "so" ? "Magacaaga Oo Buuxa:" : "Full Name:"}
              </label>
              <Input
                type="text"
                required
                placeholder="Sahra Maxamed Cali"
                value={fullName}
                onChange={(e) => setFullName(e.target.value)}
                className="min-h-[44px] bg-background text-sm"
              />
            </div>

            {accountType === "provider" && (
              <div className="space-y-1 animate-in fade-in">
                <label className="text-xs font-semibold text-slate-700 dark:text-slate-300">
                  {lang === "so" ? "Magaca Ganacsiga / Hoolka / Istuudiyaha:" : "Business / Venue / Studio Name:"}
                </label>
                <Input
                  type="text"
                  required
                  placeholder="Guryo-Samo Visuals"
                  value={businessName}
                  onChange={(e) => setBusinessName(e.target.value)}
                  className="min-h-[44px] bg-background text-sm"
                />
              </div>
            )}

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div className="space-y-1">
                <label className="text-xs font-semibold text-slate-700 dark:text-slate-300">
                  {lang === "so" ? "Email:" : "Email Address:"}
                </label>
                <Input
                  type="email"
                  required
                  placeholder="name@example.com"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className="min-h-[44px] bg-background text-sm"
                />
              </div>

              <div className="space-y-1">
                <label className="text-xs font-semibold text-slate-700 dark:text-slate-300">
                  {lang === "so" ? "Telefoonka (WhatsApp):" : "Phone (WhatsApp):"}
                </label>
                <Input
                  type="tel"
                  required
                  placeholder="+252 63 ..."
                  value={phone}
                  onChange={(e) => setPhone(e.target.value)}
                  className="min-h-[44px] bg-background text-sm"
                />
              </div>
            </div>

            <div className="space-y-1">
              <label className="text-xs font-semibold text-slate-700 dark:text-slate-300">
                {lang === "so" ? "Magaalada Somaliland:" : "Somaliland Municipality:"}
              </label>
              <select
                value={city}
                onChange={(e) => setCity(e.target.value)}
                className="w-full min-h-[44px] rounded-xl border border-input bg-background px-3 text-sm focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-amber-500"
              >
                <option value="Hargeisa">Hargeisa (Caasimadda)</option>
                <option value="Borama">Borama (Awdal)</option>
                <option value="Berbera">Berbera (Xeebta Saaxil)</option>
                <option value="Burao">Burao (Togdheer)</option>
              </select>
            </div>

            <Button
              type="submit"
              className="w-full min-h-[44px] bg-amber-600 hover:bg-amber-700 text-white font-bold text-xs gap-2 mt-2"
            >
              <UserPlus className="h-4 w-4" />
              <span>
                {accountType === "customer" && (lang === "so" ? "Abuur Akoonka Meherka" : "Create Planning Account")}
                {accountType === "provider" && (lang === "so" ? "Gudbi Diiwaanka Shirkadda" : "Submit Merchant Application")}
                {accountType === "affiliate" && (lang === "so" ? "Ku Biir Barnaamijka Komishanka" : "Register as Affiliate")}
              </span>
            </Button>

            <div className="text-[11px] text-slate-500 text-center">
              {lang === "so"
                ? "Markaad isdiiwaangeliso waxaad oggolaatay shuruucda iyo ilaalinta xogta meherka."
                : "By registering you agree to our Terms of Service & Privacy Policy."}
            </div>

            <div className="pt-2 text-center text-xs text-slate-500 border-t border-slate-100 dark:border-slate-800">
              {lang === "so" ? "Hore ma u lahayd akoon?" : "Already have an account?"}{" "}
              <Link href="/login" className="font-bold text-amber-600 hover:underline">
                {lang === "so" ? "Halkan ka gal" : "Sign in here"}
              </Link>
            </div>
          </form>
        </div>
      </main>

      <WeddingFooter />
    </div>
  )
}
