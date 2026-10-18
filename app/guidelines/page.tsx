"use client"

import { useEffect, useState } from "react"
import { SiteHeader } from "@/components/site-header"
import { SiteFooter } from "@/components/site-footer"
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { BookOpen, Palette, Type, Shield, Download, CheckCircle2, AlertTriangle, Layers } from "lucide-react"
import Link from "next/link"

const colorSwatches = [
  { name: "Somaliland National Green", hex: "#1B5E20", rgb: "RGB(27, 94, 32)", role: "Primary / Sovereignty & Prosperity" },
  { name: "Presidential Gold", hex: "#CFA93F", rgb: "RGB(207, 169, 63)", role: "Accent / Heritage & Honor" },
  { name: "National White", hex: "#FFFFFF", rgb: "RGB(255, 255, 255)", role: "Neutral / Peace & Purity" },
  { name: "National Red", hex: "#C62828", rgb: "RGB(198, 40, 40)", role: "Flag Accent / Sacrifices of Nationhood" },
  { name: "Deep Charcoal Ink", hex: "#0F1F0F", rgb: "RGB(15, 31, 15)", role: "Typography & Official Seals" },
]

const typographySpecs = [
  { element: "Primary Heading Font", family: "Playfair Display / Serif", usage: "Official Certificates, Award Plaques, Government Charters" },
  { element: "Interface & Body Font", family: "Inter / Sans-Serif", usage: "Digital Portals, Legal Clauses, Metadata & Specifications" },
  { element: "Data & Serial Numbers", family: "JetBrains Mono / Monospace", usage: "Asset Registry Numbers, AI Scoring Indices, Ballot IDs" },
]

export default function GuidelinesPage() {
  const [governance, setGovernance] = useState({
    guidelinesTitle: "Somaliland Brand Guidelines",
    guidelinesSummary: "Standardized design principles, official color systems, typography specifications, and heraldic emblem protocols governing all national design submissions and institutional assets.",
  })

  useEffect(() => {
    async function loadGuidelines() {
      try {
        const res = await fetch("/api/settings")
        if (res.ok) {
          const data = await res.json()
          if (data.governance?.guidelinesTitle) {
            setGovernance({
              guidelinesTitle: data.governance.guidelinesTitle,
              guidelinesSummary: data.governance.guidelinesSummary || governance.guidelinesSummary,
            })
          }
        }
      } catch (err) {
        // Fallback
      }
    }
    loadGuidelines()
  }, [])

  return (
    <div className="min-h-screen flex flex-col bg-background">
      <SiteHeader />

      <main className="flex-1 py-12 bg-muted/10">
        <div className="container max-w-5xl space-y-12">
          {/* Hero Header */}
          <div className="space-y-4">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-primary/10 text-primary text-xs font-semibold">
              <BookOpen className="w-3.5 h-3.5" /> Official Gazette Specification
            </div>
            <h1 className="text-3xl md:text-5xl font-heading font-bold text-foreground tracking-tight">
              {governance.guidelinesTitle}
            </h1>
            <p className="text-muted-foreground text-base md:text-lg max-w-3xl leading-relaxed">
              {governance.guidelinesSummary}
            </p>
          </div>

          {/* Color Palette Section */}
          <section className="space-y-6">
            <div className="flex items-center gap-2">
              <Palette className="w-5 h-5 text-primary" />
              <h2 className="text-2xl font-heading font-bold">1. Official National Palette</h2>
            </div>
            <p className="text-sm text-muted-foreground">
              All submissions in the National Logo, Public Works, and Heritage categories must strictly adhere to or harmoniously complement the standardized state palette.
            </p>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
              {colorSwatches.map((color) => (
                <Card key={color.hex} className="overflow-hidden border-border/80 hover:shadow-md transition-shadow">
                  <div
                    className="h-24 w-full flex items-end p-3 border-b"
                    style={{ backgroundColor: color.hex }}
                  >
                    <span className={`text-xs font-mono font-bold px-2 py-0.5 rounded ${
                      color.hex === "#FFFFFF" ? "bg-black/10 text-black" : "bg-black/40 text-white"
                    }`}>
                      {color.hex}
                    </span>
                  </div>
                  <CardContent className="p-4 space-y-1">
                    <h3 className="font-semibold text-sm text-foreground">{color.name}</h3>
                    <p className="text-xs text-muted-foreground font-mono">{color.rgb}</p>
                    <p className="text-xs text-primary/80 pt-1 font-medium">{color.role}</p>
                  </CardContent>
                </Card>
              ))}
            </div>
          </section>

          {/* Typography Standards */}
          <section className="space-y-6">
            <div className="flex items-center gap-2">
              <Type className="w-5 h-5 text-primary" />
              <h2 className="text-2xl font-heading font-bold">2. Typography Standards</h2>
            </div>
            <div className="grid gap-4 md:grid-cols-3">
              {typographySpecs.map((spec) => (
                <Card key={spec.element} className="p-5 border-border/80">
                  <h3 className="text-xs uppercase font-semibold text-muted-foreground tracking-wider mb-2">
                    {spec.element}
                  </h3>
                  <div className="text-lg font-heading font-bold text-foreground mb-2">
                    {spec.family}
                  </div>
                  <p className="text-xs text-muted-foreground leading-relaxed">
                    {spec.usage}
                  </p>
                </Card>
              ))}
            </div>
          </section>

          {/* Heraldry & Emblem Protocols */}
          <section className="space-y-6">
            <div className="flex items-center gap-2">
              <Shield className="w-5 h-5 text-primary" />
              <h2 className="text-2xl font-heading font-bold">3. National Emblems & Coat of Arms Usage</h2>
            </div>
            <div className="grid gap-6 md:grid-cols-2">
              <Card className="border-green-600/30 bg-green-500/5">
                <CardHeader>
                  <CardTitle className="text-base text-green-700 dark:text-green-400 flex items-center gap-2">
                    <CheckCircle2 className="w-5 h-5" /> Permitted Design Practices
                  </CardTitle>
                </CardHeader>
                <CardContent className="space-y-3 text-sm text-foreground/80">
                  <ul className="space-y-2 list-disc list-inside">
                    <li>Stylized abstractions inspired by Laas Geel cave paintings and nomadic traditions.</li>
                    <li>Geometric patterns referencing the Somali star, scales of justice, and coffee-pot motifs.</li>
                    <li>Clean SVG vector files with transparent backgrounds and CMYK/Pantone color callouts.</li>
                    <li>Modern, accessible UI systems for public services and municipal portals.</li>
                  </ul>
                </CardContent>
              </Card>

              <Card className="border-destructive/30 bg-destructive/5">
                <CardHeader>
                  <CardTitle className="text-base text-destructive flex items-center gap-2">
                    <AlertTriangle className="w-5 h-5" /> Prohibited Practices
                  </CardTitle>
                </CardHeader>
                <CardContent className="space-y-3 text-sm text-foreground/80">
                  <ul className="space-y-2 list-disc list-inside">
                    <li>Direct alteration or distortion of the official National Coat of Arms or State Seal.</li>
                    <li>Inversion or unauthorized recoloring of the Somaliland National Flag stripes.</li>
                    <li>Incorporation of unauthorized commercial trademarks or copyrighted third-party assets.</li>
                    <li>Submission of unvectorized low-resolution raster graphics under 300 DPI.</li>
                  </ul>
                </CardContent>
              </Card>
            </div>
          </section>

          {/* Asset Export Checklist */}
          <section className="space-y-6">
            <div className="flex items-center gap-2">
              <Layers className="w-5 h-5 text-primary" />
              <h2 className="text-2xl font-heading font-bold">4. Submission File Requirements</h2>
            </div>
            <Card className="p-6 border-border/80">
              <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
                <div className="space-y-1">
                  <span className="text-xs font-semibold text-muted-foreground uppercase">Format</span>
                  <p className="font-semibold text-sm">SVG + High-Res PNG</p>
                  <p className="text-xs text-muted-foreground">Vector master file required</p>
                </div>
                <div className="space-y-1">
                  <span className="text-xs font-semibold text-muted-foreground uppercase">Resolution</span>
                  <p className="font-semibold text-sm">300 DPI Minimum</p>
                  <p className="text-xs text-muted-foreground">Print-ready master export</p>
                </div>
                <div className="space-y-1">
                  <span className="text-xs font-semibold text-muted-foreground uppercase">Color Space</span>
                  <p className="font-semibold text-sm">sRGB (Web) & CMYK</p>
                  <p className="text-xs text-muted-foreground">Dual color profile mapping</p>
                </div>
                <div className="space-y-1">
                  <span className="text-xs font-semibold text-muted-foreground uppercase">Max File Size</span>
                  <p className="font-semibold text-sm">50 MB per Asset</p>
                  <p className="text-xs text-muted-foreground">Zip archives accepted</p>
                </div>
              </div>
            </Card>
          </section>

          {/* Action Callout */}
          <Card className="bg-gradient-to-r from-[#1B5E20] to-[#2E7D32] text-white p-8 border-0 shadow-xl">
            <div className="flex flex-col md:flex-row items-center justify-between gap-6">
              <div className="space-y-2 text-center md:text-left">
                <h3 className="text-xl md:text-2xl font-heading font-bold">Ready to Submit Your Design?</h3>
                <p className="text-sm text-white/80 max-w-xl">
                  Inspect the asset repository to see accepted government works, or proceed to the official entry portal.
                </p>
              </div>
              <div className="flex flex-wrap gap-3">
                <Button asChild variant="outline" className="bg-white/10 hover:bg-white/20 text-white border-white/30">
                  <Link href="/library">Browse Library</Link>
                </Button>
                <Button asChild className="bg-[#CFA93F] hover:bg-[#b89535] text-slate-900 font-semibold">
                  <Link href="/submit">Submit Entry</Link>
                </Button>
              </div>
            </div>
          </Card>
        </div>
      </main>

      <SiteFooter />
    </div>
  )
}
