"use client"

import { useEffect, useState } from "react"
import { SiteHeader } from "@/components/site-header"
import { SiteFooter } from "@/components/site-footer"
import { Card, CardContent } from "@/components/ui/card"
import { ShieldCheck, Lock, Eye, FileText, CheckCircle2 } from "lucide-react"

export default function PrivacyPage() {
  const [governance, setGovernance] = useState({
    privacyTitle: "Privacy & Data Protection Policy",
    privacySummary: "Promulgated under the authority of the National Planning Authority, Republic of Somaliland.",
  })

  useEffect(() => {
    async function loadPrivacy() {
      try {
        const res = await fetch("/api/settings")
        if (res.ok) {
          const data = await res.json()
          if (data.governance?.privacyTitle) {
            setGovernance({
              privacyTitle: data.governance.privacyTitle,
              privacySummary: data.governance.privacySummary || governance.privacySummary,
            })
          }
        }
      } catch (err) {
        // Fallback
      }
    }
    loadPrivacy()
  }, [])

  return (
    <div className="min-h-screen flex flex-col bg-background">
      <SiteHeader />

      <main className="flex-1 py-12 bg-muted/10">
        <div className="container max-w-4xl space-y-10">
          {/* Header */}
          <div className="space-y-4">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-primary/10 text-primary text-xs font-semibold">
              <ShieldCheck className="w-3.5 h-3.5" /> Official Governance Document
            </div>
            <h1 className="text-3xl md:text-5xl font-heading font-bold text-foreground tracking-tight">
              {governance.privacyTitle}
            </h1>
            <p className="text-muted-foreground text-sm md:text-base leading-relaxed">
              {governance.privacySummary}
            </p>
          </div>

          {/* Policy Body */}
          <Card className="border-border/80 shadow-xs">
            <CardContent className="p-8 md:p-10 space-y-8 text-foreground/90 leading-relaxed text-sm">
              <section className="space-y-3">
                <h2 className="text-xl font-heading font-bold text-foreground flex items-center gap-2">
                  <Lock className="w-5 h-5 text-primary" /> 1. Commitment to Creator Privacy
                </h2>
                <p>
                  The Republic of Somaliland Brand Awards platform is committed to safeguarding the personal data and intellectual submissions of all designers, citizens, and institutions. This Privacy Policy details how personal information, uploaded visual assets, and voting ballots are collected, processed, and safeguarded.
                </p>
              </section>

              <section className="space-y-3">
                <h2 className="text-xl font-heading font-bold text-foreground flex items-center gap-2">
                  <Eye className="w-5 h-5 text-primary" /> 2. Information We Collect
                </h2>
                <ul className="space-y-2 list-disc list-inside text-muted-foreground">
                  <li><strong>Entrant Identity:</strong> Full name, verified email, phone contact, residency/diaspora status, and professional affiliations.</li>
                  <li><strong>Creative Assets:</strong> Master SVG/PNG files, design rationale, historical references, and tools utilized in creation.</li>
                  <li><strong>Voter Ballots:</strong> Anonymized cryptographic hashes and session tokens to ensure one-vote-per-citizen integrity without storing personal browser histories.</li>
                  <li><strong>System Logs:</strong> Standard server timestamps, IP addresses for rate limiting and DDoS prevention, and HTTP user-agent headers.</li>
                </ul>
              </section>

              <section className="space-y-3">
                <h2 className="text-xl font-heading font-bold text-foreground flex items-center gap-2">
                  <FileText className="w-5 h-5 text-primary" /> 3. Utilization of Data
                </h2>
                <p>
                  Collected data is utilized strictly for the administration of the National Brand Awards, including:
                </p>
                <ul className="space-y-2 list-disc list-inside text-muted-foreground">
                  <li>Evaluation of entries by official Ministerial and Creative Jury Panels.</li>
                  <li>Public display of approved designs in the National Asset Library for civic education.</li>
                  <li>Issuance of verified digital certificates and ceremonial awards for finalists.</li>
                  <li>Audit trails for tamper-proof public ballot calculations.</li>
                </ul>
              </section>

              <section className="space-y-3">
                <h2 className="text-xl font-heading font-bold text-foreground flex items-center gap-2">
                  <CheckCircle2 className="w-5 h-5 text-primary" /> 4. Non-Disclosure & Security
                </h2>
                <p>
                  We never monetize, rent, or sell personal participant data to third-party advertisers or private brokers. All entry records and voting hashes are stored in encrypted databases protected by strict role-based access control (RBAC).
                </p>
              </section>

              <section className="space-y-3 pt-4 border-t border-border/60">
                <h2 className="text-lg font-heading font-semibold text-foreground">
                  5. Contact Data Protection Officer
                </h2>
                <p className="text-muted-foreground">
                  Inquiries regarding data retention, rectification, or deletion requests should be addressed to the Data Compliance Officer, National Planning Authority, Hargeisa, Somaliland at <span className="font-mono text-primary">privacy@somaliland-gov.org</span>.
                </p>
              </section>
            </CardContent>
          </Card>
        </div>
      </main>

      <SiteFooter />
    </div>
  )
}
