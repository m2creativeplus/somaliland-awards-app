"use client"

import { useState } from "react"
import { Provider, ProviderPackage, ProviderCategory } from "@/lib/weddings/types"
import { TRANSLATIONS } from "@/lib/weddings/translations"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Check, ShieldCheck, ArrowRight, HelpCircle } from "lucide-react"
import { InquiryModal } from "./inquiry-modal"

interface PackageComparisonProps {
  providers: Provider[]
  lang?: "so" | "en"
}

export function PackageComparisonTable({ providers, lang = "so" }: PackageComparisonProps) {
  const t = TRANSLATIONS[lang]
  const [selectedCat, setSelectedCat] = useState<string>("all")
  const [selectedInquiryTarget, setSelectedInquiryTarget] = useState<{
    provider: Provider
    packageItem: ProviderPackage
  } | null>(null)

  const categories = [
    { id: "all", label: t.catAll },
    { id: "venues", label: t.catVenues },
    { id: "photography", label: t.catPhotography },
    { id: "decor", label: t.catDecor },
    { id: "catering", label: t.catCatering },
    { id: "bridal", label: t.catBridal },
    { id: "planners", label: t.catPlanners },
  ]

  // Flatten all packages with their parent provider
  const allItems: { provider: Provider; pkg: ProviderPackage }[] = []
  providers.forEach((prov) => {
    prov.packages.forEach((pkg) => {
      if (selectedCat === "all" || pkg.category === selectedCat) {
        allItems.push({ provider: prov, pkg })
      }
    })
  })

  return (
    <div className="space-y-6">
      {/* Category Pills */}
      <div className="flex flex-wrap items-center gap-2">
        {categories.map((cat) => (
          <Button
            key={cat.id}
            variant={selectedCat === cat.id ? "default" : "outline"}
            size="sm"
            onClick={() => setSelectedCat(cat.id)}
            className={`text-xs h-8 ${
              selectedCat === cat.id ? "bg-amber-600 hover:bg-amber-700 text-white font-semibold" : ""
            }`}
          >
            {cat.label}
          </Button>
        ))}
      </div>

      {/* Comparison Table */}
      <div className="rounded-xl border bg-card shadow-sm overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full text-left text-xs">
            <thead className="bg-muted/80 text-muted-foreground font-semibold border-b">
              <tr>
                <th className="p-4 min-w-[220px]">{t.tableColProvider}</th>
                <th className="p-4 min-w-[120px]">{t.tableColCategory}</th>
                <th className="p-4 min-w-[140px]">{t.tableColPriceUsd}</th>
                <th className="p-4 min-w-[260px]">{t.tableColDeliverables}</th>
                <th className="p-4 min-w-[140px]">{t.tableColCoverage}</th>
                <th className="p-4 min-w-[120px]">{t.tableColDeposit}</th>
                <th className="p-4 min-w-[120px] text-right">{t.tableColAction}</th>
              </tr>
            </thead>
            <tbody className="divide-y">
              {allItems.map(({ provider, pkg }) => {
                const provName = lang === "so" ? provider.businessNameSo : provider.businessNameEn
                const pkgTitle = lang === "so" ? pkg.titleSo : pkg.titleEn
                const deliverables = lang === "so" ? pkg.deliverablesSo : pkg.deliverablesEn

                return (
                  <tr key={pkg.id} className="hover:bg-muted/50 transition-colors">
                    <td className="p-4 align-top">
                      <div className="font-bold text-foreground text-sm">{pkgTitle}</div>
                      <div className="text-muted-foreground flex items-center gap-1.5 mt-0.5">
                        <span>{provName}</span>
                        {provider.verificationStatus === "VERIFIED" && (
                          <ShieldCheck className="h-3 w-3 text-emerald-600 inline" />
                        )}
                      </div>
                      <div className="text-[11px] text-muted-foreground/80 mt-1">
                        {provider.district}, {provider.city}
                      </div>
                    </td>

                    <td className="p-4 align-top">
                      <Badge variant="outline" className="text-[10px] uppercase font-medium">
                        {pkg.category}
                      </Badge>
                    </td>

                    <td className="p-4 align-top">
                      <div className="font-bold text-sm text-foreground">
                        ${pkg.priceUsd.toLocaleString()} USD
                      </div>
                      <div className="text-[11px] text-muted-foreground mt-0.5">
                        ~{pkg.priceSlSh.toLocaleString()} SL Sh
                      </div>
                      <div className="text-[10px] text-amber-700 dark:text-amber-400 font-medium capitalize mt-1">
                        {pkg.priceType.replace("_", " ")}
                      </div>
                    </td>

                    <td className="p-4 align-top">
                      <ul className="space-y-1.5">
                        {deliverables.map((item, idx) => (
                          <li key={idx} className="flex items-start gap-1.5 text-foreground leading-snug">
                            <Check className="h-3.5 w-3.5 text-emerald-600 shrink-0 mt-0.5" />
                            <span>{item}</span>
                          </li>
                        ))}
                      </ul>
                    </td>

                    <td className="p-4 align-top text-muted-foreground">
                      <div className="font-medium text-foreground">{pkg.durationCoverage}</div>
                      {pkg.guestCapacityLimit && (
                        <div className="text-[11px] mt-0.5">
                          {pkg.guestCapacityLimit} {lang === "so" ? "marti ah" : "guests cap"}
                        </div>
                      )}
                    </td>

                    <td className="p-4 align-top">
                      <div className="font-semibold text-foreground">
                        {pkg.depositRequirementPercent}% {lang === "so" ? "hormar" : "deposit"}
                      </div>
                      <div className="text-[10px] text-muted-foreground mt-1 line-clamp-2" title={lang === "so" ? pkg.cancellationPolicySo : pkg.cancellationPolicyEn}>
                        {lang === "so" ? pkg.cancellationPolicySo : pkg.cancellationPolicyEn}
                      </div>
                    </td>

                    <td className="p-4 align-top text-right">
                      <Button
                        size="sm"
                        className="bg-amber-600 hover:bg-amber-700 text-white text-xs h-8 font-semibold gap-1"
                        onClick={() => setSelectedInquiryTarget({ provider, packageItem: pkg })}
                      >
                        <span>{t.tableColAction}</span>
                        <ArrowRight className="h-3 w-3" />
                      </Button>
                    </td>
                  </tr>
                )
              })}
            </tbody>
          </table>
        </div>
      </div>

      {selectedInquiryTarget && (
        <InquiryModal
          isOpen={true}
          onClose={() => setSelectedInquiryTarget(null)}
          provider={selectedInquiryTarget.provider}
          packageItem={selectedInquiryTarget.packageItem}
          lang={lang}
        />
      )}
    </div>
  )
}
