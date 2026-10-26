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
  LogIn,
  User,
  Store,
  Share2,
  ShieldAlert,
  ArrowRight,
  ShieldCheck,
  CheckCircle2,
} from "lucide-react"

export default function LoginPage() {
  const router = useRouter()
  const [lang, setLang] = useState<"so" | "en">("so")
  const [role, setRole] = useState<"customer" | "provider" | "affiliate" | "admin">("customer")
  const [email, setEmail] = useState("sahra.wedding@gmail.com")
  const [password, setPassword] = useState("••••••••••••")

  useEffect(() => {
    setLang(WeddingStore.getLanguage())
    const handleLang = () => setLang(WeddingStore.getLanguage())
    window.addEventListener("languagechange", handleLang)
    return () => window.removeEventListener("languagechange", handleLang)
  }, [])

  const t = TRANSLATIONS[lang]

  const handleRoleSelect = (selectedRole: "customer" | "provider" | "affiliate" | "admin") => {
    setRole(selectedRole)
    if (selectedRole === "customer") setEmail("sahra.wedding@gmail.com")
    if (selectedRole === "provider") setEmail("events@mansoorhotel.sl")
    if (selectedRole === "affiliate") setEmail("partner@hargeisabridal.com")
    if (selectedRole === "admin") setEmail("admin@m2creative.sl")
  }

  const handleLogin = (e: React.FormEvent) => {
    e.preventDefault()
    if (role === "customer") router.push("/account")
    else if (role === "provider") router.push("/provider/dashboard")
    else if (role === "affiliate") router.push("/affiliate/dashboard")
    else if (role === "admin") router.push("/admin/settings")
  }

  return (
    <div className="min-h-screen flex flex-col bg-background text-foreground">
      <WeddingHeader />

      <main className="flex-1 container py-12 flex items-center justify-center">
        <div className="w-full max-w-md space-y-6">
          <div className="text-center space-y-2">
            <Badge className="bg-amber-600 text-white font-bold text-[11px] tracking-wide">
              {lang === "so" ? "Gelitaanka Nidaamka" : "Secure Portal Access"}
            </Badge>
            <h1 className="text-2xl sm:text-3xl font-extrabold font-heading text-slate-900 dark:text-white">
              {lang === "so" ? "Gal Koontadaada Meherka" : "Sign In to Your Workspace"}
            </h1>
            <p className="text-xs sm:text-sm text-slate-500">
              {lang === "so"
                ? "Dooro nooca koontadaada si aad toos ugu gasho maamulkaaga."
                : "Select your role to access your dedicated verified workspace."}
            </p>
          </div>

          {/* Quick Role Selector */}
          <div className="grid grid-cols-4 gap-1.5 p-1.5 rounded-2xl bg-slate-100 dark:bg-slate-900 border border-slate-200 dark:border-slate-800">
            <button
              type="button"
              onClick={() => handleRoleSelect("customer")}
              className={`p-2 rounded-xl text-center transition-all ${
                role === "customer"
                  ? "bg-background text-slate-900 dark:text-white shadow-xs font-bold"
                  : "text-slate-500 hover:text-slate-900 dark:hover:text-white"
              }`}
            >
              <User className="h-4 w-4 mx-auto mb-1 text-amber-600" />
              <div className="text-[10px] leading-tight">{lang === "so" ? "Macmiil" : "Customer"}</div>
            </button>

            <button
              type="button"
              onClick={() => handleRoleSelect("provider")}
              className={`p-2 rounded-xl text-center transition-all ${
                role === "provider"
                  ? "bg-background text-slate-900 dark:text-white shadow-xs font-bold"
                  : "text-slate-500 hover:text-slate-900 dark:hover:text-white"
              }`}
            >
              <Store className="h-4 w-4 mx-auto mb-1 text-blue-600" />
              <div className="text-[10px] leading-tight">{lang === "so" ? "Shirkad" : "Provider"}</div>
            </button>

            <button
              type="button"
              onClick={() => handleRoleSelect("affiliate")}
              className={`p-2 rounded-xl text-center transition-all ${
                role === "affiliate"
                  ? "bg-background text-slate-900 dark:text-white shadow-xs font-bold"
                  : "text-slate-500 hover:text-slate-900 dark:hover:text-white"
              }`}
            >
              <Share2 className="h-4 w-4 mx-auto mb-1 text-emerald-600" />
              <div className="text-[10px] leading-tight">{lang === "so" ? "Partner" : "Affiliate"}</div>
            </button>

            <button
              type="button"
              onClick={() => handleRoleSelect("admin")}
              className={`p-2 rounded-xl text-center transition-all ${
                role === "admin"
                  ? "bg-background text-slate-900 dark:text-white shadow-xs font-bold"
                  : "text-slate-500 hover:text-slate-900 dark:hover:text-white"
              }`}
            >
              <ShieldAlert className="h-4 w-4 mx-auto mb-1 text-rose-600" />
              <div className="text-[10px] leading-tight">Admin CMS</div>
            </button>
          </div>

          <form
            onSubmit={handleLogin}
            className="p-6 sm:p-7 rounded-3xl border border-slate-200 dark:border-slate-800 bg-card shadow-lg space-y-4"
          >
            <div className="space-y-1">
              <label className="text-xs font-semibold text-slate-700 dark:text-slate-300">
                {lang === "so" ? "Email-ka ama Telefoonka:" : "Email or Phone Number:"}
              </label>
              <Input
                type="text"
                required
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="min-h-[44px] bg-background text-sm"
              />
            </div>

            <div className="space-y-1">
              <div className="flex items-center justify-between">
                <label className="text-xs font-semibold text-slate-700 dark:text-slate-300">
                  {lang === "so" ? "Furaha Sirta ah (Password):" : "Password:"}
                </label>
                <Link href="#" className="text-[11px] text-amber-600 hover:underline">
                  {lang === "so" ? "Ma ilowday?" : "Forgot password?"}
                </Link>
              </div>
              <Input
                type="password"
                required
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="min-h-[44px] bg-background text-sm"
              />
            </div>

            <Button
              type="submit"
              className="w-full min-h-[44px] bg-amber-600 hover:bg-amber-700 text-white font-bold text-xs gap-2"
            >
              <LogIn className="h-4 w-4" />
              <span>
                {role === "customer" && (lang === "so" ? "Gal Xarunta Macmiilka" : "Sign In as Customer")}
                {role === "provider" && (lang === "so" ? "Gal Albaabka Ganacsadaha" : "Sign In to Provider Portal")}
                {role === "affiliate" && (lang === "so" ? "Gal Xarunta Partner-ka" : "Sign In to Affiliate Portal")}
                {role === "admin" && "Access Admin Control Plane"}
              </span>
            </Button>

            <div className="pt-2 text-center text-xs text-slate-500">
              {lang === "so" ? "Weli akoon ma lihid?" : "Don't have an account yet?"}{" "}
              <Link href="/register" className="font-bold text-amber-600 hover:underline">
                {lang === "so" ? "Isku diiwaangeli halkan" : "Register here"}
              </Link>
            </div>
          </form>
        </div>
      </main>

      <WeddingFooter />
    </div>
  )
}
