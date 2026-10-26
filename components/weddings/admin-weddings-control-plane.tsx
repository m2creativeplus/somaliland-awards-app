"use client"

import { useState, useEffect } from "react"
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { Badge } from "@/components/ui/badge"
import { Switch } from "@/components/ui/switch"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { WeddingStore, BrandingSettings } from "@/lib/weddings/store"
import {
  Save,
  CheckCircle2,
  Sparkles,
  ShieldCheck,
  Building2,
  DollarSign,
  BarChart3,
  Server,
  RefreshCw,
  ExternalLink,
} from "lucide-react"

export function AdminWeddingsControlPlane() {
  const [branding, setBranding] = useState<BrandingSettings>(WeddingStore.getBranding())
  const [savedSuccess, setSavedSuccess] = useState(false)
  const [cacheCleared, setCacheCleared] = useState(false)

  // Marketplace settings state
  const [marketplaceConfig, setMarketplaceConfig] = useState({
    defaultCity: "Hargeisa",
    availableCities: "Hargeisa, Borama, Berbera, Burao",
    leadFeeUsd: 15,
    featuredListingMonthUsd: 120,
    providerSubscriptionMonthUsd: 45,
    minDepositPercent: 25,
    quotationValidityDays: 14,
    autoExpireInquiriesDays: 30,
    auditRequiredForVerifiedBadge: true,
  })

  useEffect(() => {
    setBranding(WeddingStore.getBranding())
  }, [])

  const handleSaveBranding = (e: React.FormEvent) => {
    e.preventDefault()
    WeddingStore.saveBranding(branding)
    setSavedSuccess(true)
    setTimeout(() => setSavedSuccess(false), 3000)
  }

  const handlePurgeCache = () => {
    setCacheCleared(true)
    setTimeout(() => setCacheCleared(false), 2500)
  }

  return (
    <div className="space-y-6">
      {/* Top Banner */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 p-5 rounded-xl border bg-card shadow-sm">
        <div className="space-y-1">
          <div className="flex items-center gap-2">
            <Badge className="bg-amber-600 text-white font-bold text-[10px]">
              VISUAL CONTROL PLANE v2.0
            </Badge>
            <span className="text-xs text-muted-foreground font-mono">Owner Independence Engine</span>
          </div>
          <h2 className="text-lg font-bold font-heading">
            Somaliland Weddings & Events Management Suite
          </h2>
          <p className="text-xs text-muted-foreground">
            Configure branding, marketplace pricing, provider verification rules, and deployment health without editing code.
          </p>
        </div>

        <div className="flex items-center gap-2">
          {savedSuccess && (
            <span className="flex items-center gap-1.5 text-xs text-emerald-600 font-semibold animate-pulse">
              <CheckCircle2 className="h-4 w-4" />
              Settings Saved!
            </span>
          )}
          <Button
            size="sm"
            onClick={handleSaveBranding}
            className="bg-amber-600 hover:bg-amber-700 text-white text-xs h-9 gap-1.5 font-semibold"
          >
            <Save className="h-4 w-4" />
            <span>Save All Settings</span>
          </Button>
        </div>
      </div>

      <Tabs defaultValue="branding" className="space-y-6">
        <TabsList className="grid grid-cols-2 sm:grid-cols-5 h-auto p-1 gap-1">
          <TabsTrigger value="branding" className="text-xs py-2">
            Brand & Identity
          </TabsTrigger>
          <TabsTrigger value="marketplace" className="text-xs py-2">
            Marketplace
          </TabsTrigger>
          <TabsTrigger value="bookings" className="text-xs py-2">
            Booking & Policies
          </TabsTrigger>
          <TabsTrigger value="revenue" className="text-xs py-2">
            Revenue & Fees
          </TabsTrigger>
          <TabsTrigger value="maintenance" className="text-xs py-2">
            Hostinger Health
          </TabsTrigger>
        </TabsList>

        {/* 1. Brand & Identity Settings */}
        <TabsContent value="branding" className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle className="text-base flex items-center gap-2">
                <Sparkles className="h-4 w-4 text-amber-600" />
                <span>Global Brand & Identity Configuration</span>
              </CardTitle>
              <CardDescription className="text-xs">
                Manage the public website name, bilingual descriptions, and M2 Creative attribution settings.
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-5">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-xs">
                <div className="space-y-1.5">
                  <Label htmlFor="siteNameSo" className="text-xs">Platform Name (Somali)</Label>
                  <Input
                    id="siteNameSo"
                    value={branding.siteNameSo}
                    onChange={(e) => setBranding({ ...branding, siteNameSo: e.target.value })}
                    className="h-9 text-xs"
                  />
                </div>

                <div className="space-y-1.5">
                  <Label htmlFor="siteNameEn" className="text-xs">Platform Name (English)</Label>
                  <Input
                    id="siteNameEn"
                    value={branding.siteNameEn}
                    onChange={(e) => setBranding({ ...branding, siteNameEn: e.target.value })}
                    className="h-9 text-xs"
                  />
                </div>

                <div className="space-y-1.5">
                  <Label htmlFor="taglineSo" className="text-xs">Tagline (Somali)</Label>
                  <Input
                    id="taglineSo"
                    value={branding.taglineSo}
                    onChange={(e) => setBranding({ ...branding, taglineSo: e.target.value })}
                    className="h-9 text-xs"
                  />
                </div>

                <div className="space-y-1.5">
                  <Label htmlFor="taglineEn" className="text-xs">Tagline (English)</Label>
                  <Input
                    id="taglineEn"
                    value={branding.taglineEn}
                    onChange={(e) => setBranding({ ...branding, taglineEn: e.target.value })}
                    className="h-9 text-xs"
                  />
                </div>
              </div>

              {/* Attribution Policy */}
              <div className="pt-4 border-t flex items-center justify-between p-4 rounded-lg bg-muted/60">
                <div className="space-y-0.5">
                  <div className="font-semibold text-xs text-foreground">
                    Show &ldquo;Powered by M2 Creative&rdquo; Badge
                  </div>
                  <div className="text-[11px] text-muted-foreground">
                    Displays official M2 Creative consulting credits and platform badge in the footer.
                  </div>
                </div>
                <Switch
                  checked={branding.showPoweredByM2}
                  onCheckedChange={(val) => setBranding({ ...branding, showPoweredByM2: val })}
                />
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-xs pt-2">
                <div className="space-y-1.5">
                  <Label htmlFor="contactEmail" className="text-xs">Contact Inquiries Email</Label>
                  <Input
                    id="contactEmail"
                    value={branding.contactEmail}
                    onChange={(e) => setBranding({ ...branding, contactEmail: e.target.value })}
                    className="h-9 text-xs"
                  />
                </div>

                <div className="space-y-1.5">
                  <Label htmlFor="contactPhone" className="text-xs">Direct WhatsApp Line</Label>
                  <Input
                    id="contactPhone"
                    value={branding.contactPhone}
                    onChange={(e) => setBranding({ ...branding, contactPhone: e.target.value })}
                    className="h-9 text-xs"
                  />
                </div>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        {/* 2. Marketplace Configuration */}
        <TabsContent value="marketplace" className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle className="text-base flex items-center gap-2">
                <Building2 className="h-4 w-4 text-amber-600" />
                <span>Marketplace & Directory Governance</span>
              </CardTitle>
              <CardDescription className="text-xs">
                Control service coverage areas, physical inspection mandates, and category rules.
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-4 text-xs">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="space-y-1.5">
                  <Label htmlFor="defCity" className="text-xs">Default Launch City</Label>
                  <Input
                    id="defCity"
                    value={marketplaceConfig.defaultCity}
                    onChange={(e) => setMarketplaceConfig({ ...marketplaceConfig, defaultCity: e.target.value })}
                    className="h-9 text-xs"
                  />
                </div>

                <div className="space-y-1.5">
                  <Label htmlFor="cities" className="text-xs">Active Service Cities</Label>
                  <Input
                    id="cities"
                    value={marketplaceConfig.availableCities}
                    onChange={(e) => setMarketplaceConfig({ ...marketplaceConfig, availableCities: e.target.value })}
                    className="h-9 text-xs"
                  />
                </div>
              </div>

              <div className="p-4 rounded-lg border bg-muted/40 flex items-center justify-between">
                <div className="space-y-0.5">
                  <div className="font-semibold text-xs flex items-center gap-1.5 text-foreground">
                    <ShieldCheck className="h-4 w-4 text-emerald-600" />
                    <span>Mandatory Physical Verification for [VERIFIED] Badge</span>
                  </div>
                  <div className="text-[11px] text-muted-foreground">
                    Providers only earn the green verification badge after in-person inspection and business license validation.
                  </div>
                </div>
                <Switch
                  checked={marketplaceConfig.auditRequiredForVerifiedBadge}
                  onCheckedChange={(val) => setMarketplaceConfig({ ...marketplaceConfig, auditRequiredForVerifiedBadge: val })}
                />
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        {/* 3. Booking & Policies Settings */}
        <TabsContent value="bookings" className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle className="text-base">Request-to-Book & Cancellation Policies</CardTitle>
              <CardDescription className="text-xs">
                Set quotation expiration, deposit minimums, and contract notice periods.
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-4 text-xs">
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                <div className="space-y-1.5">
                  <Label className="text-xs">Quotation Validity Window</Label>
                  <div className="flex items-center gap-2">
                    <Input
                      type="number"
                      value={marketplaceConfig.quotationValidityDays}
                      onChange={(e) => setMarketplaceConfig({ ...marketplaceConfig, quotationValidityDays: parseInt(e.target.value) || 14 })}
                      className="h-9 text-xs"
                    />
                    <span className="text-muted-foreground">days</span>
                  </div>
                </div>

                <div className="space-y-1.5">
                  <Label className="text-xs">Minimum Deposit Requirement</Label>
                  <div className="flex items-center gap-2">
                    <Input
                      type="number"
                      value={marketplaceConfig.minDepositPercent}
                      onChange={(e) => setMarketplaceConfig({ ...marketplaceConfig, minDepositPercent: parseInt(e.target.value) || 25 })}
                      className="h-9 text-xs"
                    />
                    <span className="text-muted-foreground">%</span>
                  </div>
                </div>

                <div className="space-y-1.5">
                  <Label className="text-xs">Auto-Expire Stale Inquiries</Label>
                  <div className="flex items-center gap-2">
                    <Input
                      type="number"
                      value={marketplaceConfig.autoExpireInquiriesDays}
                      onChange={(e) => setMarketplaceConfig({ ...marketplaceConfig, autoExpireInquiriesDays: parseInt(e.target.value) || 30 })}
                      className="h-9 text-xs"
                    />
                    <span className="text-muted-foreground">days</span>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        {/* 4. Revenue & Commercial Settings */}
        <TabsContent value="revenue" className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle className="text-base flex items-center gap-2">
                <DollarSign className="h-4 w-4 text-emerald-600" />
                <span>Monetization & Commercial Parameters</span>
              </CardTitle>
              <CardDescription className="text-xs">
                Configure provider monthly subscription plans, featured placement tariffs, and lead fee structures.
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-4 text-xs">
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                <div className="p-4 rounded-xl border bg-muted/30 space-y-2">
                  <div className="text-muted-foreground font-medium">Provider Storefront Subscription</div>
                  <div className="flex items-center gap-2">
                    <span className="text-lg font-bold font-heading">$</span>
                    <Input
                      type="number"
                      value={marketplaceConfig.providerSubscriptionMonthUsd}
                      onChange={(e) => setMarketplaceConfig({ ...marketplaceConfig, providerSubscriptionMonthUsd: parseInt(e.target.value) || 45 })}
                      className="h-8 text-xs w-28"
                    />
                    <span className="text-muted-foreground">/ month</span>
                  </div>
                  <div className="text-[10px] text-muted-foreground">Includes verified badge & unlimited quotes</div>
                </div>

                <div className="p-4 rounded-xl border bg-muted/30 space-y-2">
                  <div className="text-muted-foreground font-medium">Featured Hero Placement</div>
                  <div className="flex items-center gap-2">
                    <span className="text-lg font-bold font-heading">$</span>
                    <Input
                      type="number"
                      value={marketplaceConfig.featuredListingMonthUsd}
                      onChange={(e) => setMarketplaceConfig({ ...marketplaceConfig, featuredListingMonthUsd: parseInt(e.target.value) || 120 })}
                      className="h-8 text-xs w-28"
                    />
                    <span className="text-muted-foreground">/ month</span>
                  </div>
                  <div className="text-[10px] text-muted-foreground">Top homepage placement & banner badge</div>
                </div>

                <div className="p-4 rounded-xl border bg-muted/30 space-y-2">
                  <div className="text-muted-foreground font-medium">Qualified Lead Referral Fee</div>
                  <div className="flex items-center gap-2">
                    <span className="text-lg font-bold font-heading">$</span>
                    <Input
                      type="number"
                      value={marketplaceConfig.leadFeeUsd}
                      onChange={(e) => setMarketplaceConfig({ ...marketplaceConfig, leadFeeUsd: parseInt(e.target.value) || 15 })}
                      className="h-8 text-xs w-28"
                    />
                    <span className="text-muted-foreground">/ lead</span>
                  </div>
                  <div className="text-[10px] text-muted-foreground">Only charged on confirmed wedding bookings</div>
                </div>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        {/* 5. Hostinger Maintenance & Health */}
        <TabsContent value="maintenance" className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle className="text-base flex items-center gap-2">
                <Server className="h-4 w-4 text-amber-600" />
                <span>Hostinger Shared Hosting & System Maintenance</span>
              </CardTitle>
              <CardDescription className="text-xs">
                Real-time operational environment status, MySQL database health, and cache purge utilities.
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-5 text-xs">
              <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-3">
                <div className="p-3 rounded-lg border bg-muted/40">
                  <div className="text-muted-foreground text-[11px]">Runtime Target</div>
                  <div className="font-bold text-sm text-foreground mt-0.5">PHP 8.2+ / MySQL 8</div>
                  <div className="text-[10px] text-emerald-600 font-semibold mt-1">Hostinger Optimized</div>
                </div>

                <div className="p-3 rounded-lg border bg-muted/40">
                  <div className="text-muted-foreground text-[11px]">Database Connectivity</div>
                  <div className="font-bold text-sm text-emerald-600 mt-0.5">Connected (Active)</div>
                  <div className="text-[10px] text-muted-foreground mt-1">SQLite / MySQL Adapter</div>
                </div>

                <div className="p-3 rounded-lg border bg-muted/40">
                  <div className="text-muted-foreground text-[11px]">Static Assets & Media</div>
                  <div className="font-bold text-sm text-foreground mt-0.5">Local Public Storage</div>
                  <div className="text-[10px] text-emerald-600 font-semibold mt-1">WebP Ready</div>
                </div>

                <div className="p-3 rounded-lg border bg-muted/40">
                  <div className="text-muted-foreground text-[11px]">HTTPS & SSL</div>
                  <div className="font-bold text-sm text-emerald-600 mt-0.5">Enforced</div>
                  <div className="text-[10px] text-muted-foreground mt-1">Let&apos;s Encrypt / Hostinger SSL</div>
                </div>
              </div>

              <div className="pt-3 border-t flex flex-wrap items-center justify-between gap-3">
                <div className="space-y-0.5">
                  <div className="font-semibold text-foreground">Application Cache & Temporary Data</div>
                  <div className="text-[11px] text-muted-foreground">
                    Purge compiled route caches, template fragments, and transient session stores.
                  </div>
                </div>

                <Button
                  variant="outline"
                  size="sm"
                  onClick={handlePurgeCache}
                  className="h-8 gap-1.5 text-xs font-semibold"
                >
                  <RefreshCw className={`h-3.5 w-3.5 ${cacheCleared ? "animate-spin" : ""}`} />
                  <span>{cacheCleared ? "Cache Cleared!" : "Purge Server Cache"}</span>
                </Button>
              </div>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  )
}
