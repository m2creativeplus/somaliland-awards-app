import { SiteHeader } from "@/components/site-header"
import { SiteFooter } from "@/components/site-footer"
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { HelpCircle, FileCheck, Vote, ShieldCheck, Mail, ArrowRight, MessageSquare, AlertCircle } from "lucide-react"
import Link from "next/link"

export const metadata = {
  title: "Help Center & FAQ | Somaliland Brand Awards",
  description: "Frequently asked questions and support guides for entrants, voters, government institutions, and jury members.",
}

const faqSections = [
  {
    category: "Submissions & Eligibility",
    icon: FileCheck,
    items: [
      {
        q: "Who is eligible to participate in the National Brand Awards?",
        a: "Participation is open to all Somaliland citizens residing in the country or abroad (Diaspora), as well as registered creative agencies, independent studios, and university design students.",
      },
      {
        q: "Are entry fees required for public submissions?",
        a: "No. Under the National Planning Authority directive, entry into the Somaliland Brand Awards is 100% free of charge to promote broad creative participation.",
      },
      {
        q: "What file formats must be uploaded?",
        a: "Entrants must supply an SVG vector master file or high-resolution PNG (minimum 300 DPI) alongside their concept rationale in English or Somali.",
      },
    ],
  },
  {
    category: "Voting & Public Ballots",
    icon: Vote,
    items: [
      {
        q: "How does the public voting system prevent duplicate votes?",
        a: "The voting engine enforces one ballot per device per category using localized session fingerprinting and cryptographic vote hashing.",
      },
      {
        q: "What weight does public voting hold in the final score?",
        a: "Final winners are determined via a weighted index: 40% Public Community Vote, 35% Ministerial Jury Evaluation, and 25% AI Brand Compliance Matrix.",
      },
      {
        q: "Can I alter my vote after submission?",
        a: "Once cast, public votes are irrevocably committed to ensure election integrity and tamper-proof tabulation.",
      },
    ],
  },
  {
    category: "Copyright, Rights & Licensing",
    icon: ShieldCheck,
    items: [
      {
        q: "Who retains ownership of the submitted artwork?",
        a: "The designer retains intellectual ownership of their concept. Selected winning entries grant the Republic of Somaliland a perpetual, non-exclusive license for state and civic usage.",
      },
      {
        q: "Can commercial brands download assets from the repository?",
        a: "Assets marked with 'Government Public Domain' or 'Open State License' may be used for editorial and non-commercial educational purposes with proper attribution.",
      },
    ],
  },
]

export default function HelpPage() {
  return (
    <div className="min-h-screen flex flex-col bg-background">
      <SiteHeader />

      <main className="flex-1 py-12 bg-muted/10">
        <div className="container max-w-5xl space-y-12">
          {/* Header */}
          <div className="space-y-4">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-primary/10 text-primary text-xs font-semibold">
              <HelpCircle className="w-3.5 h-3.5" /> Support & Knowledge Base
            </div>
            <h1 className="text-3xl md:text-5xl font-heading font-bold text-foreground tracking-tight">
              Help Center & FAQ
            </h1>
            <p className="text-muted-foreground text-base md:text-lg max-w-2xl leading-relaxed">
              Find answers to common inquiries regarding entry submissions, voting procedures, licensing, and award criteria.
            </p>
          </div>

          {/* FAQ Sections */}
          <div className="space-y-10">
            {faqSections.map((sec) => (
              <div key={sec.category} className="space-y-4">
                <div className="flex items-center gap-2 pb-2 border-b border-border">
                  <sec.icon className="w-5 h-5 text-primary" />
                  <h2 className="text-xl font-heading font-bold text-foreground">{sec.category}</h2>
                </div>

                <div className="grid gap-4 md:grid-cols-1">
                  {sec.items.map((item, idx) => (
                    <Card key={idx} className="border-border/80">
                      <CardHeader className="pb-2">
                        <CardTitle className="text-base font-semibold text-foreground">
                          {item.q}
                        </CardTitle>
                      </CardHeader>
                      <CardContent>
                        <p className="text-sm text-muted-foreground leading-relaxed">
                          {item.a}
                        </p>
                      </CardContent>
                    </Card>
                  ))}
                </div>
              </div>
            ))}
          </div>

          {/* Need More Assistance Banner */}
          <Card className="bg-muted/40 border-border p-8">
            <div className="flex flex-col md:flex-row items-start md:items-center justify-between gap-6">
              <div className="space-y-2">
                <h3 className="text-lg font-heading font-bold text-foreground flex items-center gap-2">
                  <MessageSquare className="w-5 h-5 text-primary" /> Still Need Assistance?
                </h3>
                <p className="text-sm text-muted-foreground max-w-lg">
                  Our Secretariat team in Hargeisa is available Sunday through Thursday to assist with design entries, technical inquiries, or ministerial licensing.
                </p>
              </div>
              <Button asChild className="bg-[#1B5E20] hover:bg-[#2E7D32] text-white">
                <Link href="/contact" className="flex items-center gap-2">
                  <span>Contact Secretariat</span>
                  <ArrowRight className="w-4 h-4" />
                </Link>
              </Button>
            </div>
          </Card>
        </div>
      </main>

      <SiteFooter />
    </div>
  )
}
