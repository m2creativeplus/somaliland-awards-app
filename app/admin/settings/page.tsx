"use client"

import { useEffect, useState } from "react"
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { Badge } from "@/components/ui/badge"
import { Save, CheckCircle2, Shield, Settings2, Building, Scale, Sparkles } from "lucide-react"

import { AdminWeddingsControlPlane } from "@/components/weddings/admin-weddings-control-plane"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"

export default function AdminSettingsPage() {
  const [loading, setLoading] = useState(true)
  const [saving, setSaving] = useState(false)
  const [savedSuccess, setSavedSuccess] = useState(false)
  const [activeSuite, setActiveSuite] = useState("weddings")

  const [form, setForm] = useState({
    siteName: "Somaliland Visual Assets & Awards",
    primaryColor: "#1B5E20",
    accentColor: "#CFA93F",
    competitionName: "Somaliland Brand Awards 2026",
    totalPrize: "$10,000",
    ceremonyVenue: "Hargeisa Cultural Centre",
    contactEmail: "info@somalilandassets.gov.sl",
    secretariatAddress: "Sha'ab Area, Near Ministry Complex, Hargeisa, Republic of Somaliland",
    workingHours: "Sunday – Thursday: 08:00 – 15:00 (EAT)",
    termsTitle: "Terms of Use & Submission Agreement",
    termsSummary: "Standard operating agreement for designers, voters, and participating institutions across the Republic of Somaliland Brand Awards platform.",
    privacyTitle: "Privacy & Data Protection Policy",
    privacySummary: "Promulgated under the authority of the National Planning Authority, Republic of Somaliland.",
    guidelinesTitle: "Somaliland Brand Guidelines",
    guidelinesSummary: "Standardized design principles, official color systems, typography specifications, and heraldic emblem protocols governing all national design submissions and institutional assets.",
  })

  useEffect(() => {
    async function loadSettings() {
      try {
        const res = await fetch("/api/settings")
        if (res.ok) {
          const data = await res.json()
          setForm({
            siteName: data.branding?.siteName || "Somaliland Visual Assets & Awards",
            primaryColor: data.branding?.primaryColor || "#1B5E20",
            accentColor: data.branding?.accentColor || "#CFA93F",
            competitionName: data.competition?.name || "Somaliland Brand Awards 2026",
            totalPrize: data.competition?.totalPrize || "$10,000",
            ceremonyVenue: data.competition?.ceremonyVenue || "Hargeisa Cultural Centre",
            contactEmail: data.contact?.email || "info@somalilandassets.gov.sl",
            secretariatAddress: data.governance?.secretariatAddress || "Sha'ab Area, Near Ministry Complex, Hargeisa, Republic of Somaliland",
            workingHours: data.governance?.workingHours || "Sunday – Thursday: 08:00 – 15:00 (EAT)",
            termsTitle: data.governance?.termsTitle || "Terms of Use & Submission Agreement",
            termsSummary: data.governance?.termsSummary || "Standard operating agreement for designers, voters, and participating institutions across the Republic of Somaliland Brand Awards platform.",
            privacyTitle: data.governance?.privacyTitle || "Privacy & Data Protection Policy",
            privacySummary: data.governance?.privacySummary || "Promulgated under the authority of the National Planning Authority, Republic of Somaliland.",
            guidelinesTitle: data.governance?.guidelinesTitle || "Somaliland Brand Guidelines",
            guidelinesSummary: data.governance?.guidelinesSummary || "Standardized design principles, official color systems, typography specifications, and heraldic emblem protocols governing all national design submissions and institutional assets.",
          })
        }
      } catch (e) {
        console.error("Error loading settings:", e)
      } finally {
        setLoading(false)
      }
    }
    loadSettings()
  }, [])

  const handleSave = async (e: React.FormEvent) => {
    e.preventDefault()
    setSaving(true)
    setSavedSuccess(false)

    try {
      const payload = {
        branding: {
          siteName: form.siteName,
          primaryColor: form.primaryColor,
          accentColor: form.accentColor,
        },
        competition: {
          name: form.competitionName,
          totalPrize: form.totalPrize,
          ceremonyVenue: form.ceremonyVenue,
        },
        contact: {
          email: form.contactEmail,
        },
        governance: {
          termsTitle: form.termsTitle,
          termsSummary: form.termsSummary,
          privacyTitle: form.privacyTitle,
          privacySummary: form.privacySummary,
          guidelinesTitle: form.guidelinesTitle,
          guidelinesSummary: form.guidelinesSummary,
          secretariatAddress: form.secretariatAddress,
          workingHours: form.workingHours,
        },
      }

      const res = await fetch("/api/settings", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload),
      })

      if (res.ok) {
        setSavedSuccess(true)
        setTimeout(() => setSavedSuccess(false), 4000)
      }
    } catch (err) {
      console.error("Save error:", err)
    } finally {
      setSaving(false)
    }
  }

  if (loading) {
    return (
      <div className="py-12 text-center text-muted-foreground">
        Loading visual control plane configuration...
      </div>
    )
  }

  return (
    <div className="space-y-8 max-w-5xl">
      {/* Page Header */}
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 border-b pb-6">
        <div>
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-primary/10 text-primary text-xs font-semibold mb-2">
            <Settings2 className="w-3.5 h-3.5" /> Visual Control Plane
          </div>
          <h1 className="text-3xl font-heading font-bold tracking-tight">Platform Configuration</h1>
          <p className="text-muted-foreground text-sm mt-1">
            Configure global brand tokens, competition variables, governance legal texts, and secretariat metadata without code.
          </p>
        </div>
        <Button
          onClick={handleSave}
          disabled={saving}
          className="bg-[#1B5E20] hover:bg-[#2E7D32] text-white flex items-center gap-2"
        >
          {saving ? <Sparkles className="w-4 h-4 animate-spin" /> : <Save className="w-4 h-4" />}
          {saving ? "Publishing Changes..." : "Save Configuration"}
        </Button>
      </div>

      {savedSuccess && (
        <div className="p-4 rounded-lg bg-green-500/10 border border-green-500/30 text-green-700 dark:text-green-300 flex items-center gap-3 animate-fade-up">
          <CheckCircle2 className="w-5 h-5 flex-shrink-0" />
          <span className="text-sm font-medium">
            Platform configuration committed to database and synchronized across all public routes!
          </span>
        </div>
      )}

      <Tabs value={activeSuite} onValueChange={setActiveSuite} className="space-y-6">
        <TabsList className="grid grid-cols-2 max-w-md h-10 p-1">
          <TabsTrigger value="weddings" className="text-xs font-semibold">
            Weddings & Events Suite
          </TabsTrigger>
          <TabsTrigger value="governance" className="text-xs font-semibold">
            Awards Governance
          </TabsTrigger>
        </TabsList>

        <TabsContent value="weddings" className="space-y-6">
          <AdminWeddingsControlPlane />
        </TabsContent>

        <TabsContent value="governance" className="space-y-6">
          <form onSubmit={handleSave} className="space-y-8">
        {/* Branding & Brand Tokens */}
        <Card>
          <CardHeader>
            <CardTitle className="text-lg flex items-center gap-2">
              <Sparkles className="w-5 h-5 text-primary" /> Branding & Tokens
            </CardTitle>
            <CardDescription>Visual identity parameters applied across client views.</CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="grid gap-4 sm:grid-cols-3">
              <div className="space-y-2">
                <Label htmlFor="siteName">Site Name</Label>
                <Input
                  id="siteName"
                  value={form.siteName}
                  onChange={(e) => setForm({ ...form, siteName: e.target.value })}
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="primaryColor">Primary Brand Color</Label>
                <div className="flex gap-2">
                  <Input
                    id="primaryColor"
                    value={form.primaryColor}
                    onChange={(e) => setForm({ ...form, primaryColor: e.target.value })}
                  />
                  <div
                    className="w-10 h-10 rounded border flex-shrink-0"
                    style={{ backgroundColor: form.primaryColor }}
                  />
                </div>
              </div>
              <div className="space-y-2">
                <Label htmlFor="accentColor">Accent Gold Color</Label>
                <div className="flex gap-2">
                  <Input
                    id="accentColor"
                    value={form.accentColor}
                    onChange={(e) => setForm({ ...form, accentColor: e.target.value })}
                  />
                  <div
                    className="w-10 h-10 rounded border flex-shrink-0"
                    style={{ backgroundColor: form.accentColor }}
                  />
                </div>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Competition & Awards Parameters */}
        <Card>
          <CardHeader>
            <CardTitle className="text-lg flex items-center gap-2">
              <Shield className="w-5 h-5 text-primary" /> Competition Parameters
            </CardTitle>
            <CardDescription>Active event metadata and awards ceremony scheduling.</CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="grid gap-4 sm:grid-cols-3">
              <div className="space-y-2">
                <Label htmlFor="competitionName">Competition Title</Label>
                <Input
                  id="competitionName"
                  value={form.competitionName}
                  onChange={(e) => setForm({ ...form, competitionName: e.target.value })}
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="totalPrize">Total Prize Pool</Label>
                <Input
                  id="totalPrize"
                  value={form.totalPrize}
                  onChange={(e) => setForm({ ...form, totalPrize: e.target.value })}
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="ceremonyVenue">Ceremony Venue</Label>
                <Input
                  id="ceremonyVenue"
                  value={form.ceremonyVenue}
                  onChange={(e) => setForm({ ...form, ceremonyVenue: e.target.value })}
                />
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Governance & Legal Content Configuration */}
        <Card>
          <CardHeader>
            <CardTitle className="text-lg flex items-center gap-2">
              <Scale className="w-5 h-5 text-primary" /> Governance & Legal Texts
            </CardTitle>
            <CardDescription>
              Dynamic legal copy rendered on `/terms`, `/privacy`, and `/guidelines`.
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-6">
            <div className="space-y-2">
              <Label htmlFor="termsTitle">Terms of Service Title</Label>
              <Input
                id="termsTitle"
                value={form.termsTitle}
                onChange={(e) => setForm({ ...form, termsTitle: e.target.value })}
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="termsSummary">Terms Summary Rationale</Label>
              <Textarea
                id="termsSummary"
                rows={3}
                value={form.termsSummary}
                onChange={(e) => setForm({ ...form, termsSummary: e.target.value })}
              />
            </div>

            <div className="pt-4 border-t space-y-4">
              <div className="space-y-2">
                <Label htmlFor="privacyTitle">Privacy Policy Title</Label>
                <Input
                  id="privacyTitle"
                  value={form.privacyTitle}
                  onChange={(e) => setForm({ ...form, privacyTitle: e.target.value })}
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="privacySummary">Privacy Policy Statement</Label>
                <Textarea
                  id="privacySummary"
                  rows={3}
                  value={form.privacySummary}
                  onChange={(e) => setForm({ ...form, privacySummary: e.target.value })}
                />
              </div>
            </div>

            <div className="pt-4 border-t space-y-4">
              <div className="space-y-2">
                <Label htmlFor="guidelinesTitle">Brand Guidelines Heading</Label>
                <Input
                  id="guidelinesTitle"
                  value={form.guidelinesTitle}
                  onChange={(e) => setForm({ ...form, guidelinesTitle: e.target.value })}
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="guidelinesSummary">Brand Guidelines Scope</Label>
                <Textarea
                  id="guidelinesSummary"
                  rows={3}
                  value={form.guidelinesSummary}
                  onChange={(e) => setForm({ ...form, guidelinesSummary: e.target.value })}
                />
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Secretariat & Operations */}
        <Card>
          <CardHeader>
            <CardTitle className="text-lg flex items-center gap-2">
              <Building className="w-5 h-5 text-primary" /> Secretariat & Communications
            </CardTitle>
            <CardDescription>Public contact details and working office hours.</CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="grid gap-4 sm:grid-cols-2">
              <div className="space-y-2">
                <Label htmlFor="contactEmail">Official Contact Email</Label>
                <Input
                  id="contactEmail"
                  value={form.contactEmail}
                  onChange={(e) => setForm({ ...form, contactEmail: e.target.value })}
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="workingHours">Working Hours</Label>
                <Input
                  id="workingHours"
                  value={form.workingHours}
                  onChange={(e) => setForm({ ...form, workingHours: e.target.value })}
                />
              </div>
            </div>
            <div className="space-y-2">
              <Label htmlFor="secretariatAddress">Secretariat Physical Address</Label>
              <Textarea
                id="secretariatAddress"
                rows={2}
                value={form.secretariatAddress}
                onChange={(e) => setForm({ ...form, secretariatAddress: e.target.value })}
              />
            </div>
          </CardContent>
        </Card>

        {/* Action Button */}
        <div className="flex justify-end gap-4">
          <Button
            type="submit"
            disabled={saving}
            className="bg-[#1B5E20] hover:bg-[#2E7D32] text-white px-8"
          >
            {saving ? "Publishing..." : "Save & Publish Configuration"}
          </Button>
        </div>
      </form>
      </TabsContent>
    </Tabs>
  </div>
)
}
