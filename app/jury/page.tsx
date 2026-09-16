"use client"

import { useState, useMemo } from "react"
import { SiteHeader } from "@/components/site-header"
import { SiteFooter } from "@/components/site-footer"
import { JurySubmissionCard } from "@/components/jury-submission-card"
import { ScoringCard } from "@/components/scoring-card"
import { Card, CardContent } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Input } from "@/components/ui/input"
import type { Submission, Scorecard } from "@/lib/types"
import { ArrowLeft, Search, Award, Clock, CheckCircle, Users } from "lucide-react"

// Mock data for jury dashboard
const mockSubmissions: Submission[] = [
  {
    id: "sub-001",
    asset_id: "asset-001",
    entrant: {
      name: "Ahmed Hassan",
      email: "ahmed@example.com",
      organization: "Creative Studio SL",
      country: "Somaliland",
    },
    category: "logo-design",
    entry_fee_paid: true,
    files: {
      original: "/files/logo-design-1.ai",
      preview: "/placeholder.svg?key=jury1",
    },
    metadata: {
      title: "Modern Somaliland Tourism Logo",
      description:
        "A contemporary logo design that captures the essence of Somaliland's natural beauty and cultural heritage, designed for the national tourism board.",
      inspiration: "Inspired by the Horn of Africa's landscape and traditional Somali patterns.",
      tools_used: ["Adobe Illustrator", "Adobe Photoshop"],
    },
    scorecard: {
      criteria: {
        creativity: { score: 0, weight: 25 },
        functionality: { score: 0, weight: 20 },
        execution: { score: 0, weight: 20 },
        culture: { score: 0, weight: 15 },
        impact: { score: 0, weight: 10 },
        sustainability: { score: 0, weight: 10 },
      },
      total_score: 0,
    },
    status: "under_review",
    submitted_at: "2024-12-15T10:30:00Z",
  },
  {
    id: "sub-002",
    asset_id: "asset-002",
    entrant: {
      name: "Fatima Ali",
      email: "fatima@example.com",
      organization: "Design Collective",
      country: "Somaliland",
    },
    category: "poster-design",
    entry_fee_paid: true,
    files: {
      original: "/files/poster-design-1.pdf",
      preview: "/placeholder.svg?key=jury2",
    },
    metadata: {
      title: "Independence Day Celebration Poster",
      description:
        "Commemorative poster celebrating Somaliland's independence with vibrant colors and cultural symbols.",
      inspiration: "Traditional Somali art meets modern design principles.",
      tools_used: ["Adobe InDesign", "Adobe Illustrator"],
    },
    scorecard: {
      criteria: {
        creativity: { score: 8.5, weight: 25 },
        functionality: { score: 7.0, weight: 20 },
        execution: { score: 9.0, weight: 20 },
        culture: { score: 9.5, weight: 15 },
        impact: { score: 8.0, weight: 10 },
        sustainability: { score: 7.5, weight: 10 },
      },
      total_score: 82.5,
    },
    status: "under_review",
    submitted_at: "2024-12-14T14:20:00Z",
  },
  {
    id: "sub-003",
    asset_id: "asset-003",
    entrant: {
      name: "Mohamed Jama",
      email: "mohamed@example.com",
      country: "Somalia",
    },
    category: "brand-identity",
    entry_fee_paid: true,
    files: {
      original: "/files/brand-identity-1.zip",
      preview: "/placeholder.svg?key=jury3",
    },
    metadata: {
      title: "Hargeisa University Brand Identity",
      description:
        "Complete brand identity system for Hargeisa University including logo, typography, and brand guidelines.",
      inspiration: "Academic excellence combined with cultural pride.",
      tools_used: ["Figma", "Adobe Creative Suite"],
    },
    scorecard: {
      criteria: {
        creativity: { score: 0, weight: 25 },
        functionality: { score: 0, weight: 20 },
        execution: { score: 0, weight: 20 },
        culture: { score: 0, weight: 15 },
        impact: { score: 0, weight: 10 },
        sustainability: { score: 0, weight: 10 },
      },
      total_score: 0,
    },
    status: "pending",
    submitted_at: "2024-12-13T09:15:00Z",
  },
]

export default function JuryPage() {
  const [selectedSubmission, setSelectedSubmission] = useState<string | null>(null)
  const [scores, setScores] = useState<Record<string, Scorecard>>({
    "sub-002": mockSubmissions[1].scorecard,
  })
  const [filters, setFilters] = useState({
    category: "all",
    status: "all",
    search: "",
  })

  const filteredSubmissions = useMemo(() => {
    return mockSubmissions.filter((submission) => {
      if (filters.category !== "all" && submission.category !== filters.category) return false
      if (filters.status !== "all") {
        const isScored = scores[submission.id]?.total_score > 0
        if (filters.status === "scored" && !isScored) return false
        if (filters.status === "unscored" && isScored) return false
      }
      if (filters.search) {
        const searchLower = filters.search.toLowerCase()
        return (
          submission.metadata.title.toLowerCase().includes(searchLower) ||
          submission.entrant.name.toLowerCase().includes(searchLower) ||
          submission.metadata.description.toLowerCase().includes(searchLower)
        )
      }
      return true
    })
  }, [filters, scores])

  const handleScoreSubmit = (submissionId: string, scorecard: Scorecard) => {
    setScores((prev) => ({ ...prev, [submissionId]: scorecard }))
    setSelectedSubmission(null)
  }

  const stats = {
    total: mockSubmissions.length,
    scored: Object.keys(scores).length,
    pending: mockSubmissions.length - Object.keys(scores).length,
    avgScore:
      Object.values(scores).reduce((sum, score) => sum + score.total_score, 0) / Object.keys(scores).length || 0,
  }

  if (selectedSubmission) {
    const submission = mockSubmissions.find((s) => s.id === selectedSubmission)
    if (!submission) return null

    return (
      <div className="min-h-screen flex flex-col">
        <SiteHeader />
        <main className="flex-1">
          <div className="container py-8">
            <div className="mb-6">
              <Button variant="ghost" onClick={() => setSelectedSubmission(null)} className="mb-4">
                <ArrowLeft className="w-4 h-4 mr-2" />
                Back to Dashboard
              </Button>
              <h1 className="text-2xl font-bold">Review Submission</h1>
            </div>
            <ScoringCard
              submission={submission}
              onScoreSubmit={handleScoreSubmit}
              existingScore={scores[selectedSubmission]}
            />
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
        <div className="container py-8">
          {/* Header */}
          <div className="space-y-6">
            <div>
              <h1 className="text-3xl font-bold">Jury Dashboard</h1>
              <p className="text-muted-foreground">Review and score submissions for Somaliland Brand Awards 2025</p>
            </div>

            {/* Stats Cards */}
            <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
              <Card>
                <CardContent className="p-6">
                  <div className="flex items-center gap-4">
                    <div className="w-12 h-12 bg-primary/10 rounded-lg flex items-center justify-center">
                      <Award className="w-6 h-6 text-primary" />
                    </div>
                    <div>
                      <div className="text-2xl font-bold">{stats.total}</div>
                      <div className="text-sm text-muted-foreground">Total Submissions</div>
                    </div>
                  </div>
                </CardContent>
              </Card>

              <Card>
                <CardContent className="p-6">
                  <div className="flex items-center gap-4">
                    <div className="w-12 h-12 bg-green-100 rounded-lg flex items-center justify-center">
                      <CheckCircle className="w-6 h-6 text-green-600" />
                    </div>
                    <div>
                      <div className="text-2xl font-bold">{stats.scored}</div>
                      <div className="text-sm text-muted-foreground">Scored</div>
                    </div>
                  </div>
                </CardContent>
              </Card>

              <Card>
                <CardContent className="p-6">
                  <div className="flex items-center gap-4">
                    <div className="w-12 h-12 bg-yellow-100 rounded-lg flex items-center justify-center">
                      <Clock className="w-6 h-6 text-yellow-600" />
                    </div>
                    <div>
                      <div className="text-2xl font-bold">{stats.pending}</div>
                      <div className="text-sm text-muted-foreground">Pending Review</div>
                    </div>
                  </div>
                </CardContent>
              </Card>

              <Card>
                <CardContent className="p-6">
                  <div className="flex items-center gap-4">
                    <div className="w-12 h-12 bg-blue-100 rounded-lg flex items-center justify-center">
                      <Users className="w-6 h-6 text-blue-600" />
                    </div>
                    <div>
                      <div className="text-2xl font-bold">{stats.avgScore.toFixed(1)}</div>
                      <div className="text-sm text-muted-foreground">Avg Score</div>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </div>

            {/* Filters */}
            <Card>
              <CardContent className="p-6">
                <div className="flex flex-col md:flex-row gap-4">
                  <div className="relative flex-1">
                    <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                    <Input
                      placeholder="Search submissions..."
                      value={filters.search}
                      onChange={(e) => setFilters((prev) => ({ ...prev, search: e.target.value }))}
                      className="pl-10"
                    />
                  </div>

                  <Select
                    value={filters.category}
                    onValueChange={(value) => setFilters((prev) => ({ ...prev, category: value }))}
                  >
                    <SelectTrigger className="w-full md:w-48">
                      <SelectValue placeholder="All Categories" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="all">All Categories</SelectItem>
                      <SelectItem value="logo-design">Logo Design</SelectItem>
                      <SelectItem value="brand-identity">Brand Identity</SelectItem>
                      <SelectItem value="poster-design">Poster Design</SelectItem>
                      <SelectItem value="digital-graphics">Digital Graphics</SelectItem>
                      <SelectItem value="government-assets">Government Assets</SelectItem>
                    </SelectContent>
                  </Select>

                  <Select
                    value={filters.status}
                    onValueChange={(value) => setFilters((prev) => ({ ...prev, status: value }))}
                  >
                    <SelectTrigger className="w-full md:w-48">
                      <SelectValue placeholder="All Status" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="all">All Status</SelectItem>
                      <SelectItem value="scored">Scored</SelectItem>
                      <SelectItem value="unscored">Unscored</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
              </CardContent>
            </Card>

            {/* Submissions Grid */}
            <div className="space-y-4">
              <div className="flex items-center justify-between">
                <h2 className="text-xl font-semibold">Submissions ({filteredSubmissions.length})</h2>
                <div className="flex items-center gap-2">
                  <Badge variant="outline">{stats.scored} scored</Badge>
                  <Badge variant="outline">{stats.pending} pending</Badge>
                </div>
              </div>

              <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                {filteredSubmissions.map((submission) => (
                  <JurySubmissionCard
                    key={submission.id}
                    submission={submission}
                    onReview={setSelectedSubmission}
                    currentScore={scores[submission.id]?.total_score}
                    isScored={!!scores[submission.id] && scores[submission.id].total_score > 0}
                  />
                ))}
              </div>

              {filteredSubmissions.length === 0 && (
                <div className="text-center py-12">
                  <p className="text-muted-foreground text-lg">No submissions found matching your criteria.</p>
                  <Button
                    variant="outline"
                    className="mt-4 bg-transparent"
                    onClick={() => setFilters({ category: "all", status: "all", search: "" })}
                  >
                    Clear Filters
                  </Button>
                </div>
              )}
            </div>
          </div>
        </div>
      </main>

      <SiteFooter />
    </div>
  )
}
