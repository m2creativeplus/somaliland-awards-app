"use client"

import { useState } from "react"
import { MARKET_INTELLIGENCE_METRICS } from "@/lib/weddings/mock-data"
import { MarketObservationMetric } from "@/lib/weddings/types"
import { TRANSLATIONS } from "@/lib/weddings/translations"
import { Badge } from "@/components/ui/badge"
import { ShieldCheck, TrendingUp, HelpCircle, Database, FileCheck } from "lucide-react"

interface MarketIntelligenceProps {
  lang?: "so" | "en"
}

export function MarketIntelligenceDashboard({ lang = "so" }: MarketIntelligenceProps) {
  const t = TRANSLATIONS[lang]
  const metrics = MARKET_INTELLIGENCE_METRICS

  const getConfidenceBadge = (confidence: MarketObservationMetric["confidence"]) => {
    switch (confidence) {
      case "VERIFIED":
        return (
          <Badge className="bg-emerald-600/90 text-white font-semibold text-[10px] gap-1 shadow-sm">
            <ShieldCheck className="h-3 w-3" />
            [VERIFIED] Direct Evidence
          </Badge>
        )
      case "HIGH-CONFIDENCE ESTIMATE":
        return (
          <Badge className="bg-amber-600/90 text-white font-semibold text-[10px] gap-1 shadow-sm">
            <TrendingUp className="h-3 w-3" />
            [HIGH-CONFIDENCE ESTIMATE]
          </Badge>
        )
      case "LOW-CONFIDENCE ESTIMATE":
        return (
          <Badge variant="outline" className="text-amber-700 dark:text-amber-400 border-amber-600/40 text-[10px] gap-1">
            <HelpCircle className="h-3 w-3" />
            [LOW-CONFIDENCE ESTIMATE]
          </Badge>
        )
      default:
        return <Badge variant="secondary">[UNVERIFIED]</Badge>
    }
  }

  return (
    <div className="space-y-6">
      {/* Transparency declaration alert */}
      <div className="p-4 rounded-xl border border-amber-500/30 bg-amber-500/10 text-xs text-amber-950 dark:text-amber-200 space-y-1.5">
        <div className="font-bold flex items-center gap-1.5 text-sm">
          <Database className="h-4 w-4 text-amber-700 dark:text-amber-400" />
          <span>{lang === "so" ? "Hab-raaca Xogta & Hufnaanta M2 Intelligence" : "M2 Intelligence Methodology & Evidence Protocol"}</span>
        </div>
        <p className="leading-relaxed">
          {lang === "so"
            ? "Dhammaan tirakoobyada halkan ku yaalla waxay si adag u kala soocaan xogta tooska ah ee la xaqiijiyay iyo qiyaasaha guud ee suuqa. Waxaan diidannahay in xog kooban loo bixiyo 'tirakoob qaran' iyadoo aan caddayn buuxda la hayn."
            : "Every published metric rigorously distinguishes direct platform observations from broader macroeconomic projections. Data points are labeled with exact sample sizes, dates, and empirical sources."}
        </p>
      </div>

      {/* Metrics Cards Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {metrics.map((metric) => (
          <div
            key={metric.id}
            className="rounded-xl border bg-card text-card-foreground p-5 shadow-sm hover:shadow-md transition-shadow flex flex-col justify-between space-y-4"
          >
            <div className="space-y-2">
              <div className="flex items-center justify-between gap-2">
                {getConfidenceBadge(metric.confidence)}
                <span className="text-[10px] text-muted-foreground font-mono">{metric.reportingPeriod}</span>
              </div>

              <h3 className="font-heading font-bold text-sm text-foreground pt-1">
                {lang === "so" ? metric.titleSo : metric.titleEn}
              </h3>

              <div className="text-3xl font-extrabold font-heading text-foreground tracking-tight">
                {metric.metricValue}
              </div>

              <div className="text-xs text-emerald-600 dark:text-emerald-400 font-medium">
                {lang === "so" ? metric.changeLabelSo : metric.changeLabelEn}
              </div>
            </div>

            <div className="pt-3 border-t text-[11px] space-y-1.5 text-muted-foreground">
              <div className="flex justify-between">
                <span className="font-medium text-foreground">{t.sampleSizeLabel}:</span>
                <span>{metric.sampleSize}</span>
              </div>
              <div className="flex justify-between">
                <span className="font-medium text-foreground">Source:</span>
                <span className="truncate max-w-[180px]" title={metric.source}>{metric.source}</span>
              </div>
              <div className="pt-1.5 text-[10px] text-muted-foreground/80 leading-relaxed italic border-t border-dashed">
                {lang === "so" ? metric.methodologySo : metric.methodologyEn}
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  )
}
