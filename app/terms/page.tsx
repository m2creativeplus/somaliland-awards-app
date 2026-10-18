"use client"

import { useEffect, useState } from "react"
import { SiteHeader } from "@/components/site-header"
import { SiteFooter } from "@/components/site-footer"
import { Card, CardContent } from "@/components/ui/card"
import { Scale, CheckCircle2, ShieldAlert, Award, FileText } from "lucide-react"

export default function TermsPage() {
  const [governance, setGovernance] = useState({
    termsTitle: "Terms of Use & Submission Agreement",
    termsSummary: "Standard operating agreement for designers, voters, and participating institutions across the Republic of Somaliland Brand Awards platform.",
  })

  useEffect(() => {
    async function loadTerms() {
      try {
        const res = await fetch("/api/settings")
        if (res.ok) {
          const data = await res.json()
          if (data.governance?.termsTitle) {
            setGovernance({
              termsTitle: data.governance.termsTitle,
              termsSummary: data.governance.termsSummary || governance.termsSummary,
            })
          }
        }
      } catch (err) {
        // Graceful fallback
      }
    }
    loadTerms()
  }, [])

  return (
    <div className="min-h-screen flex flex-col bg-background">
      <SiteHeader />

      <main className="flex-1 py-12 bg-muted/10">
        <div className="container max-w-4xl space-y-10">
          {/* Header */}
          <div className="space-y-4">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-primary/10 text-primary text-xs font-semibold">
              <Scale className="w-3.5 h-3.5" /> Legal Terms of Service
            </div>
            <h1 className="text-3xl md:text-5xl font-heading font-bold text-foreground tracking-tight">
              {governance.termsTitle}
            </h1>
            <p className="text-muted-foreground text-sm md:text-base leading-relaxed">
              {governance.termsSummary}
            </p>
          </div>

          {/* Terms Content */}
          <Card className="border-border/80 shadow-xs">
            <CardContent className="p-8 md:p-10 space-y-8 text-foreground/90 leading-relaxed text-sm">
              <section className="space-y-3">
                <h2 className="text-xl font-heading font-bold text-foreground flex items-center gap-2">
                  <FileText className="w-5 h-5 text-primary" /> 1. Acceptance of Platform Terms
                </h2>
                <p>
                  By accessing, submitting artwork to, or casting votes upon this platform, you agree to be bound by these Terms of Use and all applicable laws and regulations of the Republic of Somaliland. If you disagree with any portion of these terms, you are prohibited from utilizing this system.
                </p>
              </section>

              <section className="space-y-3">
                <h2 className="text-xl font-heading font-bold text-foreground flex items-center gap-2">
                  <CheckCircle2 className="w-5 h-5 text-primary" /> 2. Submission Authenticity & Originality
                </h2>
                <p>
                  All designers submitting creative works certify and warrant that:
                </p>
                <ul className="space-y-2 list-disc list-inside text-muted-foreground">
                  <li>The submitted design is an original creation conceived and produced by the entrant.</li>
                  <li>The artwork does not infringe upon third-party trademarks, international copyrights, or proprietary visual properties.</li>
                  <li>No unauthorized proprietary imagery or stolen vector libraries have been incorporated.</li>
                  <li>Any AI-assisted tools utilized during conception have been transparently declared in the submission metadata.</li>
                </ul>
              </section>

              <section className="space-y-3">
                <h2 className="text-xl font-heading font-bold text-foreground flex items-center gap-2">
                  <Award className="w-5 h-5 text-primary" /> 3. Intellectual Property & State Licensing
                </h2>
                <p>
                  Creators retain original authorship of their submitted designs. In consideration of participation in the National Brand Awards, entrants grant the Government of the Republic of Somaliland and the National Planning Authority a non-exclusive, perpetual, royalty-free worldwide license to:
                </p>
                <ul className="space-y-2 list-disc list-inside text-muted-foreground">
                  <li>Publicly display the work in the National Brand Library, state exhibitions, and civic publications.</li>
                  <li>Include the asset in archival educational compilations showcasing Somaliland cultural heritage.</li>
                  <li>Reproduce winning entries across official ministry communications with prominent creator attribution.</li>
                </ul>
              </section>

              <section className="space-y-3">
                <h2 className="text-xl font-heading font-bold text-foreground flex items-center gap-2">
                  <ShieldAlert className="w-5 h-5 text-primary" /> 4. Integrity of Voting & Disqualification
                </h2>
                <p>
                  Any attempt to manipulate the public voting system via automated bots, proxy farming, ballot stuffing, or unauthorized API scripts will result in immediate disqualification of the associated entry and forfeiture of any accrued scores. The Steering Committee reserves the right to audit and invalidate suspect ballot tallies.
                </p>
              </section>

              <section className="space-y-3 pt-4 border-t border-border/60">
                <h2 className="text-lg font-heading font-semibold text-foreground">
                  5. Governing Jurisdiction
                </h2>
                <p className="text-muted-foreground">
                  These Terms of Use shall be governed by and construed in accordance with the laws and civil statutes of the Republic of Somaliland. Any disputes arising from participation shall be resolved under the jurisdiction of the competent courts in Hargeisa.
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
