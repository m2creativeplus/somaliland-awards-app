"use client"

import { useState, useEffect } from "react"
import Link from "next/link"
import { WeddingHeader } from "@/components/weddings/wedding-header"
import { WeddingFooter } from "@/components/weddings/wedding-footer"
import { WeddingStore } from "@/lib/weddings/store"
import { ProviderPackage, Provider } from "@/lib/weddings/types"
import { TRANSLATIONS } from "@/lib/weddings/translations"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import {
  Layers,
  Plus,
  DollarSign,
  CheckCircle2,
  ArrowLeft,
  Trash2,
  Edit,
  ShieldCheck,
  Package,
} from "lucide-react"

export default function ProviderPackagesPage() {
  const [lang, setLang] = useState<"so" | "en">("so")
  const [packages, setPackages] = useState<ProviderPackage[]>([])
  const [providers, setProviders] = useState<Provider[]>([])
  const [showAddForm, setShowAddForm] = useState(false)
  const [newTitleEn, setNewTitleEn] = useState("")
  const [newTitleSo, setNewTitleSo] = useState("")
  const [newPriceUsd, setNewPriceUsd] = useState("1800")
  const [newDeliverables, setNewDeliverables] = useState("Dedicated banquet hall setup\nAudiovisual rigging and sound system\nBackup generator backup guarantee")

  useEffect(() => {
    setLang(WeddingStore.getLanguage())
    const provs = WeddingStore.getProviders()
    setProviders(provs)
    if (provs.length > 0) {
      setPackages(provs[0].packages)
    }

    const handleLang = () => setLang(WeddingStore.getLanguage())
    window.addEventListener("languagechange", handleLang)
    return () => window.removeEventListener("languagechange", handleLang)
  }, [])

  const t = TRANSLATIONS[lang]

  const handleAddPackage = (e: React.FormEvent) => {
    e.preventDefault()
    if (!newTitleEn) return

    const price = parseFloat(newPriceUsd) || 1500
    const deliverablesList = newDeliverables.split("\n").filter((d) => d.trim().length > 0)

    const newPkg: ProviderPackage = {
      id: `pkg-${Date.now()}`,
      providerId: providers[0]?.id || "prov-1",
      titleEn: newTitleEn,
      titleSo: newTitleSo || newTitleEn,
      slug: newTitleEn.toLowerCase().replace(/[^a-z0-9]/g, "-"),
      category: "venues",
      priceType: "fixed",
      priceUsd: price,
      priceSlSh: price * 8500,
      deliverablesEn: deliverablesList,
      deliverablesSo: deliverablesList,
    }

    setPackages([newPkg, ...packages])
    setShowAddForm(false)
    setNewTitleEn("")
    setNewTitleSo("")
  }

  return (
    <div className="min-h-screen flex flex-col bg-background text-foreground">
      <WeddingHeader />

      <main className="flex-1 container py-8 sm:py-12 space-y-8">
        <div className="flex items-center gap-2">
          <Button asChild variant="ghost" size="sm" className="min-h-[44px] gap-1.5 text-xs font-semibold">
            <Link href="/provider/dashboard">
              <ArrowLeft className="h-4 w-4" />
              <span>{lang === "so" ? "Ku noqo Xarunta Ganacsadaha" : "Back to Provider Portal"}</span>
            </Link>
          </Button>
        </div>

        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-slate-200 dark:border-slate-800 pb-4">
          <div className="space-y-1">
            <Badge className="bg-amber-600 text-white font-bold text-[11px] tracking-wide flex items-center gap-1 w-fit">
              <Layers className="h-3 w-3" />
              <span>{lang === "so" ? "Maamulka Xirmooyinka" : "Package Catalogue Management"}</span>
            </Badge>
            <h1 className="text-3xl font-extrabold font-heading text-slate-900 dark:text-white">
              {lang === "so" ? "Xirmooyinka Meherka ee La Daabacay" : "Published Wedding Service Packages"}
            </h1>
            <p className="text-xs sm:text-sm text-slate-600 dark:text-slate-300 max-w-2xl">
              {lang === "so"
                ? "Ku dar, wax ka beddel, ama daabac xirmooyinka adeeggaaga si ay uga dhex muuqdaan suuqa guud iyo is-barbardhigga."
                : "Configure pricing tiers, deliverables, guest capacity, and inclusions displayed on public directory and comparison tables."}
            </p>
          </div>

          <Button
            onClick={() => setShowAddForm(!showAddForm)}
            className="min-h-[44px] bg-amber-600 hover:bg-amber-700 text-white font-bold text-xs gap-2"
          >
            <Plus className="h-4 w-4" />
            <span>{lang === "so" ? "Abuur Xidhmo Cusub" : "Create New Package"}</span>
          </Button>
        </div>

        {/* Create form drawer */}
        {showAddForm && (
          <form
            onSubmit={handleAddPackage}
            className="p-6 rounded-2xl border border-amber-500/30 bg-card shadow-lg space-y-4 animate-in fade-in"
          >
            <div className="text-base font-bold text-slate-900 dark:text-white">
              {lang === "so" ? "Xidhmo Cusub oo Meherka ah" : "New Service Package Configuration"}
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
              <div className="space-y-1">
                <label className="text-xs font-semibold text-slate-700 dark:text-slate-300">
                  {lang === "so" ? "Magaca Xidhmada (English):" : "Package Title (English):"}
                </label>
                <Input
                  required
                  placeholder="e.g. VIP Reception Package"
                  value={newTitleEn}
                  onChange={(e) => setNewTitleEn(e.target.value)}
                  className="min-h-[44px] bg-background text-sm"
                />
              </div>

              <div className="space-y-1">
                <label className="text-xs font-semibold text-slate-700 dark:text-slate-300">
                  {lang === "so" ? "Magaca Xidhmada (Soomaali):" : "Package Title (Somali):"}
                </label>
                <Input
                  placeholder="t.t. Xidhmada Boqortooyada"
                  value={newTitleSo}
                  onChange={(e) => setNewTitleSo(e.target.value)}
                  className="min-h-[44px] bg-background text-sm"
                />
              </div>

              <div className="space-y-1">
                <label className="text-xs font-semibold text-slate-700 dark:text-slate-300">
                  {lang === "so" ? "Qiimaha (USD $):" : "Price (USD $):"}
                </label>
                <Input
                  required
                  type="number"
                  placeholder="1800"
                  value={newPriceUsd}
                  onChange={(e) => setNewPriceUsd(e.target.value)}
                  className="min-h-[44px] bg-background text-sm font-bold"
                />
              </div>
            </div>

            <div className="space-y-1">
              <label className="text-xs font-semibold text-slate-700 dark:text-slate-300">
                {lang === "so" ? "Adeegyada Ku Jira (Hal xariiq midkiiba):" : "Deliverables Included (One per line):"}
              </label>
              <textarea
                rows={3}
                value={newDeliverables}
                onChange={(e) => setNewDeliverables(e.target.value)}
                className="w-full rounded-xl border border-input bg-background p-3 text-xs focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-amber-500"
              />
            </div>

            <div className="flex items-center gap-2">
              <Button type="submit" className="min-h-[44px] bg-amber-600 hover:bg-amber-700 text-white font-bold text-xs">
                {lang === "so" ? "Keydi & Daabac Xidhmada" : "Save & Publish Package"}
              </Button>
              <Button type="button" variant="ghost" onClick={() => setShowAddForm(false)} className="min-h-[44px] text-xs font-semibold">
                {lang === "so" ? "Jooji" : "Cancel"}
              </Button>
            </div>
          </form>
        )}

        {/* Existing Packages List */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {packages.map((pkg) => (
            <div
              key={pkg.id}
              className="rounded-2xl border border-slate-200 dark:border-slate-800 bg-card p-6 shadow-xs flex flex-col justify-between space-y-4"
            >
              <div className="space-y-3">
                <div className="flex items-center justify-between gap-2">
                  <Badge className="bg-slate-900 text-white dark:bg-white dark:text-slate-900 text-[10px] font-bold uppercase tracking-wider">
                    {pkg.category}
                  </Badge>
                  <Badge variant="outline" className="text-emerald-700 dark:text-emerald-400 border-emerald-500/40 text-[10px] font-bold">
                    Active & Listed
                  </Badge>
                </div>

                <h3 className="text-lg font-bold font-heading text-slate-900 dark:text-white">
                  {lang === "so" ? pkg.titleSo : pkg.titleEn}
                </h3>

                <div className="p-3 rounded-xl bg-amber-500/10 border border-amber-500/20">
                  <div className="text-2xl font-black text-amber-700 dark:text-amber-400 font-heading">
                    ${pkg.priceUsd.toLocaleString()} USD
                  </div>
                  <div className="text-[11px] text-slate-500">
                    ~{pkg.priceSlSh.toLocaleString()} SL Sh
                  </div>
                </div>

                <div className="space-y-2 pt-2">
                  <div className="text-[11px] font-bold text-slate-400 uppercase tracking-wider">
                    {lang === "so" ? "Waxyaabaha Ku Jira:" : "Deliverables Included:"}
                  </div>
                  <ul className="space-y-1.5 text-xs text-slate-600 dark:text-slate-300">
                    {(lang === "so" ? pkg.deliverablesSo : pkg.deliverablesEn).map((d, i) => (
                      <li key={i} className="flex items-start gap-1.5">
                        <CheckCircle2 className="h-3.5 w-3.5 text-amber-600 shrink-0 mt-0.5" />
                        <span>{d}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              </div>

              <div className="pt-4 border-t border-slate-100 dark:border-slate-800 flex items-center justify-between gap-2">
                <span className="text-[11px] font-mono text-slate-400">{pkg.id}</span>
                <div className="flex items-center gap-1.5">
                  <Button asChild size="sm" variant="outline" className="min-h-[44px] text-xs font-semibold">
                    <Link href={`/packages/compare`}>
                      <Edit className="h-3.5 w-3.5 mr-1" />
                      <span>{lang === "so" ? "Isbarbardhig" : "Compare"}</span>
                    </Link>
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
