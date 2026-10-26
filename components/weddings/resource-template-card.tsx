"use client"

import { useState } from "react"
import { ResourceTemplate } from "@/lib/weddings/types"
import { TRANSLATIONS } from "@/lib/weddings/translations"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Download, FileText, CheckCircle2, ShieldCheck } from "lucide-react"

interface TemplateCardProps {
  template: ResourceTemplate
  lang?: "so" | "en"
}

export function ResourceTemplateCard({ template, lang = "so" }: TemplateCardProps) {
  const t = TRANSLATIONS[lang]
  const [downloaded, setDownloaded] = useState(false)

  const title = lang === "so" ? template.titleSo : template.titleEn
  const desc = lang === "so" ? template.descriptionSo : template.descriptionEn
  const points = lang === "so" ? template.previewPointsSo : template.previewPointsEn

  const handleDownload = () => {
    // Generate simulated downloadable asset with structured content
    let content = ""
    let mime = "text/plain"
    let ext = "txt"

    if (template.format === "CSV") {
      mime = "text/csv"
      ext = "csv"
      content = `Category,Item,Estimated USD,Actual USD,Vendor,Notes\nVenue,Mansoor Grand Ballroom,2500,2500,Mansoor Hotel,Deposit 30% paid\nMedia,Guryo-Samo 4K Cinema,1200,1200,Guryo-Samo,Full day coverage\nDecor,Xariir Emerald Stage,1500,1450,Xariir Luxury,Stage + tables\nCatering,Royal Feast 400p,2200,2250,Hargeisa Royal,Goat roast & saffron rice\nBridal,Boqorad Henna & Hair,550,550,Boqorad Lounge,VIP Suite\nCoordination,Aroos-Doon Logistics,550,500,Aroos-Doon,Run sheet & lead`
    } else {
      content = `# ${title}\nVersion: ${template.version}\nLast Updated: ${template.lastUpdated}\nLicense: ${template.license}\n\n## Description\n${desc}\n\n## Key Deliverables & Guidelines\n` + points.map((p, i) => `${i + 1}. ${p}`).join("\n") + "\n\nPowered by M2 Creative & Consulting (Hargeisa, Republic of Somaliland)"
    }

    const blob = new Blob([content], { type: mime })
    const url = URL.createObjectURL(blob)
    const a = document.createElement("a")
    a.href = url
    a.download = `${template.slug}-v${template.version}.${ext}`
    document.body.appendChild(a)
    a.click()
    a.remove()
    URL.revokeObjectURL(url)

    setDownloaded(true)
    setTimeout(() => setDownloaded(false), 3000)
  }

  return (
    <div className="rounded-xl border bg-card text-card-foreground p-5 shadow-sm hover:shadow-md transition-shadow flex flex-col justify-between space-y-4">
      <div className="space-y-3">
        <div className="flex items-center justify-between gap-2">
          <Badge variant="outline" className="text-[10px] uppercase font-semibold font-mono">
            {template.format} · {template.fileSize}
          </Badge>
          <span className="text-[11px] text-muted-foreground">
            {template.downloadCount.toLocaleString()} {t.downloadCountLabel}
          </span>
        </div>

        <div>
          <h3 className="font-heading font-bold text-base text-foreground leading-snug">
            {title}
          </h3>
          <p className="text-xs text-muted-foreground mt-1 line-clamp-2 leading-relaxed">
            {desc}
          </p>
        </div>

        <div className="space-y-1.5 pt-1 text-xs">
          {points.map((pt, idx) => (
            <div key={idx} className="flex items-start gap-1.5 text-muted-foreground">
              <CheckCircle2 className="h-3.5 w-3.5 text-amber-600 shrink-0 mt-0.5" />
              <span className="line-clamp-1">{pt}</span>
            </div>
          ))}
        </div>
      </div>

      <div className="pt-3 border-t flex items-center justify-between gap-3">
        <div className="text-[10px] text-muted-foreground">
          v{template.version} · {template.lastUpdated}
        </div>

        <Button
          size="sm"
          onClick={handleDownload}
          className={`text-xs h-8 gap-1.5 font-semibold ${
            downloaded
              ? "bg-emerald-600 hover:bg-emerald-700 text-white"
              : "bg-amber-600 hover:bg-amber-700 text-white"
          }`}
        >
          <Download className="h-3.5 w-3.5" />
          <span>{downloaded ? (lang === "so" ? "Waa La Degsaday!" : "Downloaded!") : t.btnDownload}</span>
        </Button>
      </div>
    </div>
  )
}
