"use client"

import { useState } from "react"
import { useRouter } from "next/navigation"
import Link from "next/link"
import { SiteHeader } from "@/components/site-header"
import { SiteFooter } from "@/components/site-footer"
import { SubmissionForm } from "@/components/submission-form"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { useToast } from "@/hooks/use-toast"
import type { Submission } from "@/lib/types"
import { addSubmission } from "@/lib/actions"
import { CheckCircle, Award, Calendar, Users } from "lucide-react"

export default function SubmitPage() {
  const [isSubmitted, setIsSubmitted] = useState(false)
  const [submissionId, setSubmissionId] = useState<string>("")
  const { toast } = useToast()
  const router = useRouter()

  const handleSubmission = async (submission: Partial<Submission>) => {
    const saved = await addSubmission(submission)
    setSubmissionId(saved.id)
    setIsSubmitted(true)
    toast({
      title: "🎉 Design Submitted!",
      description: `Your entry (ID: ${saved.id}) has been received and is under review.`,
    })
  }

  const currentCompetition = {
    name: "Somaliland Brand Awards 2025",
    deadline: "March 31, 2025",
    categories: 5,
    totalPrize: "$10,000",
    participants: 156,
  }

  if (isSubmitted) {
    return (
      <div className="min-h-screen flex flex-col">
        <SiteHeader />

        <main className="flex-1 py-12">
          <div className="container max-w-2xl mx-auto text-center space-y-8">
            <div className="space-y-4">
              <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mx-auto">
                <CheckCircle className="w-8 h-8 text-green-600" />
              </div>
              <h1 className="text-3xl font-bold">Submission Successful!</h1>
              <p className="text-muted-foreground text-lg">
                Your design has been submitted to the Somaliland Brand Awards 2025
              </p>
            </div>

            <Card>
              <CardHeader>
                <CardTitle>Submission Details</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="flex items-center justify-between">
                  <span className="text-muted-foreground">Submission ID:</span>
                  <Badge variant="outline" className="font-mono">
                    {submissionId}
                  </Badge>
                </div>
                <div className="flex items-center justify-between">
                  <span className="text-muted-foreground">Status:</span>
                  <Badge variant="secondary">Under Review</Badge>
                </div>
                <div className="flex items-center justify-between">
                  <span className="text-muted-foreground">Submitted:</span>
                  <span>{new Date().toLocaleDateString()}</span>
                </div>
              </CardContent>
            </Card>

            <div className="space-y-4">
              <h3 className="text-xl font-semibold">What happens next?</h3>
              <div className="text-left space-y-3">
                <div className="flex items-start gap-3">
                  <div className="w-6 h-6 bg-primary/10 rounded-full flex items-center justify-center flex-shrink-0 mt-0.5">
                    <span className="text-xs font-bold text-primary">1</span>
                  </div>
                  <div>
                    <p className="font-medium">Initial Review</p>
                    <p className="text-sm text-muted-foreground">
                      Our team will review your submission for completeness and compliance (2-3 business days)
                    </p>
                  </div>
                </div>
                <div className="flex items-start gap-3">
                  <div className="w-6 h-6 bg-primary/10 rounded-full flex items-center justify-center flex-shrink-0 mt-0.5">
                    <span className="text-xs font-bold text-primary">2</span>
                  </div>
                  <div>
                    <p className="font-medium">Jury Evaluation</p>
                    <p className="text-sm text-muted-foreground">
                      Expert jury panel will score your design based on creativity, functionality, and cultural
                      relevance
                    </p>
                  </div>
                </div>
                <div className="flex items-start gap-3">
                  <div className="w-6 h-6 bg-primary/10 rounded-full flex items-center justify-center flex-shrink-0 mt-0.5">
                    <span className="text-xs font-bold text-primary">3</span>
                  </div>
                  <div>
                    <p className="font-medium">Public Voting</p>
                    <p className="text-sm text-muted-foreground">
                      Community members can vote for their favorite designs in the People's Choice category
                    </p>
                  </div>
                </div>
                <div className="flex items-start gap-3">
                  <div className="w-6 h-6 bg-primary/10 rounded-full flex items-center justify-center flex-shrink-0 mt-0.5">
                    <span className="text-xs font-bold text-primary">4</span>
                  </div>
                  <div>
                    <p className="font-medium">Results Announcement</p>
                    <p className="text-sm text-muted-foreground">
                      Winners will be announced at the awards ceremony on April 15, 2025
                    </p>
                  </div>
                </div>
              </div>
            </div>

            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Button variant="outline" asChild>
                <Link href="/vote">View Gallery &amp; Vote</Link>
              </Button>
              <Button onClick={() => { setIsSubmitted(false); setSubmissionId("") }}>
                Submit Another Entry
              </Button>
            </div>
          </div>
        </main>

        <SiteFooter />
      </div>
    )
  }

  return (
    <div className="min-h-screen flex flex-col">
      <SiteHeader />

      <main className="flex-1">
        {/* Hero Section */}
        <section className="py-12 bg-gradient-to-br from-primary/5 to-accent/5">
          <div className="container">
            <div className="max-w-3xl mx-auto text-center space-y-6">
              <Badge variant="secondary" className="mb-4">
                Now Open for Submissions
              </Badge>

              <h1 className="text-4xl lg:text-5xl font-bold">
                Submit Your Design to the
                <span className="text-primary block">Somaliland Brand Awards 2025</span>
              </h1>

              <p className="text-xl text-muted-foreground">
                Showcase your creativity and compete for recognition in Somaliland's premier design competition
              </p>

              <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mt-8">
                <div className="text-center">
                  <div className="text-2xl font-bold text-primary">{currentCompetition.categories}</div>
                  <div className="text-sm text-muted-foreground">Categories</div>
                </div>
                <div className="text-center">
                  <div className="text-2xl font-bold text-primary">{currentCompetition.totalPrize}</div>
                  <div className="text-sm text-muted-foreground">Total Prizes</div>
                </div>
                <div className="text-center">
                  <div className="text-2xl font-bold text-primary">{currentCompetition.participants}</div>
                  <div className="text-sm text-muted-foreground">Participants</div>
                </div>
                <div className="text-center">
                  <div className="text-2xl font-bold text-primary">Mar 31</div>
                  <div className="text-sm text-muted-foreground">Deadline</div>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Competition Info */}
        <section className="py-8 border-b">
          <div className="container">
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              <Card>
                <CardContent className="p-6 text-center">
                  <Award className="w-8 h-8 text-primary mx-auto mb-3" />
                  <h3 className="font-semibold mb-2">Expert Jury</h3>
                  <p className="text-sm text-muted-foreground">Evaluated by renowned designers and cultural experts</p>
                </CardContent>
              </Card>

              <Card>
                <CardContent className="p-6 text-center">
                  <Users className="w-8 h-8 text-primary mx-auto mb-3" />
                  <h3 className="font-semibold mb-2">Public Voting</h3>
                  <p className="text-sm text-muted-foreground">Community choice awards decided by popular vote</p>
                </CardContent>
              </Card>

              <Card>
                <CardContent className="p-6 text-center">
                  <Calendar className="w-8 h-8 text-primary mx-auto mb-3" />
                  <h3 className="font-semibold mb-2">Awards Ceremony</h3>
                  <p className="text-sm text-muted-foreground">Winners announced April 15, 2025 in Hargeisa</p>
                </CardContent>
              </Card>
            </div>
          </div>
        </section>

        {/* Submission Form */}
        <section className="py-12">
          <div className="container">
            <SubmissionForm onSubmit={handleSubmission} />
          </div>
        </section>
      </main>

      <SiteFooter />
    </div>
  )
}
