"use client"

import { useState, useEffect } from "react"
import { WeddingHeader } from "@/components/weddings/wedding-header"
import { WeddingFooter } from "@/components/weddings/wedding-footer"
import { ResourceTemplateCard } from "@/components/weddings/resource-template-card"
import { WeddingStore } from "@/lib/weddings/store"
import { ResourceTemplate } from "@/lib/weddings/types"
import { TRANSLATIONS } from "@/lib/weddings/translations"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Search, Download, FileText, Sparkles } from "lucide-react"

export default function ResourceLibraryPage() {
  const [lang, setLang] = useState<"so" | "en">("so")
  const [templates, setTemplates] = useState<ResourceTemplate[]>([])
  const [selectedCat, setSelectedCat] = useState<string>("all")
  const [search, setSearch] = useState("")

  useEffect(() => {
    setLang(WeddingStore.getLanguage())
    setTemplates(WeddingStore.getTemplates())

    const handleLang = () => setLang(WeddingStore.getLanguage())
    window.addEventListener("languagechange", handleLang)
    return () => window.removeEventListener("languagechange", handleLang)
  }, [])

  const t = TRANSLATIONS[lang]

  const categories = [
    { id: "all", label: lang === "so" ? "Dhammaan (15)" : "All Templates" },
    { id: "budget", label: lang === "so" ? "Miisaaniyad" : "Budget & Spend" },
    { id: "checklist", label: lang === "so" ? "Liisaska Sawirrada" : "Photo Shot Lists" },
    { id: "timeline", label: lang === "so" ? "Jadwalka Saacadaha" : "Run Sheets" },
    { id: "vendor_mgmt", label: lang === "so" ? "Shirkadaha" : "Vendor Matrices" },
    { id: "legal_guide", label: lang === "so" ? "Sharci & Xog" : "Legal & Consent" },
  ]

  const filtered = templates.filter((tpl) => {
    const matchCat = selectedCat === "all" || tpl.category === selectedCat
    const title = lang === "so" ? tpl.titleSo : tpl.titleEn
    const matchSearch = search === "" || title.toLowerCase().includes(search.toLowerCase())
    return matchCat && matchSearch
  })

  return (
    <div className="min-h-screen flex flex-col bg-background text-foreground">
      <WeddingHeader />

      <main className="flex-1 container py-10 space-y-8">
        <div className="space-y-2">
          <Badge className="bg-amber-600 text-white font-bold text-[10px]">
            {lang === "so" ? "Maktabadda Kheyraadka" : "Templates & Toolkits"}
          </Badge>
          <h1 className="text-3xl font-extrabold font-heading">{t.resourcesTitle}</h1>
          <p className="text-sm text-muted-foreground max-w-2xl">{t.resourcesSubtitle}</p>
        </div>

        {/* Filter bar */}
        <div className="flex flex-col md:flex-row gap-3 items-center justify-between p-4 rounded-xl border bg-card">
          <div className="relative w-full md:w-80">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
            <Input
              placeholder={lang === "so" ? "Raadi foomam, jadwallo..." : "Search templates, briefs..."}
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              className="pl-9 h-9 text-xs"
            />
          </div>

          <div className="flex flex-wrap items-center gap-2 w-full md:w-auto">
            {categories.map((c) => (
              <Button
                key={c.id}
                variant={selectedCat === c.id ? "default" : "outline"}
                size="sm"
                onClick={() => setSelectedCat(c.id)}
                className={`text-xs h-8 ${
                  selectedCat === c.id ? "bg-amber-600 hover:bg-amber-700 text-white font-semibold" : ""
                }`}
              >
                {c.label}
              </Button>
            ))}
          </div>
        </div>

        {/* Grid of Downloadable Templates */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filtered.map((tpl) => (
            <ResourceTemplateCard key={tpl.id} template={tpl} lang={lang} />
          ))}
        </div>
      </main>

      <WeddingFooter />
    </div>
  )
}
