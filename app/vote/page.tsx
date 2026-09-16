"use client"

import { useState, useMemo, useEffect } from "react"
import { SiteHeader } from "@/components/site-header"
import { SiteFooter } from "@/components/site-footer"
import { VotingCard } from "@/components/voting-card"
import { Leaderboard } from "@/components/leaderboard"
import { Card, CardContent } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Input } from "@/components/ui/input"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import type { Submission } from "@/lib/types"
import { getApprovedSubmissions, getVotes, getUserVotes, castVote } from "@/lib/store"
import { Search, Info, Vote } from "lucide-react"

// Voting submissions — merged from store + extra mock entries
const extraSubmissions: Submission[] = [
  {
    id: "vote-001",
    asset_id: "asset-vote-001",
    entrant: { name: "Ahmed Hassan", email: "ahmed@example.com", organization: "Creative Studio SL", country: "Somaliland" },
    category: "logo-design",
    entry_fee_paid: true,
    files: { original: "/files/logo-design-1.ai", preview: "/placeholder.svg?key=vote1" },
    metadata: { title: "Modern Somaliland Tourism Logo", description: "A contemporary logo design that captures the essence of Somaliland's natural beauty.", inspiration: "Inspired by the Horn of Africa's landscape.", tools_used: ["Adobe Illustrator", "Adobe Photoshop"] },
    scorecard: { criteria: { creativity: { score: 0, weight: 25 }, functionality: { score: 0, weight: 20 }, execution: { score: 0, weight: 20 }, culture: { score: 0, weight: 15 }, impact: { score: 0, weight: 10 }, sustainability: { score: 0, weight: 10 } }, total_score: 0 },
    status: "approved", submitted_at: "2025-12-15T10:30:00Z",
  },
  {
    id: "vote-002",
    asset_id: "asset-vote-002",
    entrant: { name: "Fatima Ali", email: "fatima@example.com", organization: "Design Collective", country: "Somaliland" },
    category: "poster-design",
    entry_fee_paid: true,
    files: { original: "/files/poster-design-1.pdf", preview: "/placeholder.svg?key=vote2" },
    metadata: { title: "Independence Day Celebration Poster", description: "Commemorative poster celebrating Somaliland's independence.", inspiration: "Traditional Somali art meets modern design.", tools_used: ["Adobe InDesign", "Adobe Illustrator"] },
    scorecard: { criteria: { creativity: { score: 0, weight: 25 }, functionality: { score: 0, weight: 20 }, execution: { score: 0, weight: 20 }, culture: { score: 0, weight: 15 }, impact: { score: 0, weight: 10 }, sustainability: { score: 0, weight: 10 } }, total_score: 0 },
    status: "approved", submitted_at: "2025-12-14T14:20:00Z",
  },
  {
    id: "vote-003",
    asset_id: "asset-vote-003",
    entrant: { name: "Mohamed Jama", email: "mohamed@example.com", country: "Somaliland" },
    category: "brand-identity",
    entry_fee_paid: true,
    files: { original: "/files/brand-identity-1.zip", preview: "/placeholder.svg?key=vote3" },
    metadata: { title: "Hargeisa University Brand Identity", description: "Complete brand identity system for Hargeisa University.", inspiration: "Academic excellence combined with cultural pride.", tools_used: ["Figma", "Adobe Creative Suite"] },
    scorecard: { criteria: { creativity: { score: 0, weight: 25 }, functionality: { score: 0, weight: 20 }, execution: { score: 0, weight: 20 }, culture: { score: 0, weight: 15 }, impact: { score: 0, weight: 10 }, sustainability: { score: 0, weight: 10 } }, total_score: 0 },
    status: "approved", submitted_at: "2025-12-13T09:15:00Z",
  },
  {
    id: "vote-004",
    asset_id: "asset-vote-004",
    entrant: { name: "Sahra Omar", email: "sahra@example.com", organization: "Digital Arts SL", country: "Somaliland" },
    category: "digital-graphics",
    entry_fee_paid: true,
    files: { original: "/files/digital-graphics-1.zip", preview: "/placeholder.svg?key=vote4" },
    metadata: { title: "Social Media Campaign Graphics", description: "Cohesive social media graphics promoting Somaliland's cultural heritage.", inspiration: "Blending traditional patterns with modern digital aesthetics.", tools_used: ["Figma", "Adobe After Effects", "Canva"] },
    scorecard: { criteria: { creativity: { score: 0, weight: 25 }, functionality: { score: 0, weight: 20 }, execution: { score: 0, weight: 20 }, culture: { score: 0, weight: 15 }, impact: { score: 0, weight: 10 }, sustainability: { score: 0, weight: 10 } }, total_score: 0 },
    status: "approved", submitted_at: "2025-12-12T16:45:00Z",
  },
]

export default function VotePage() {
  const [votes, setVotes] = useState<Record<string, number>>(() => getVotes())
  const [userVotedIds, setUserVotedIds] = useState<Set<string>>(() => new Set(getUserVotes()))
  const [allSubmissions, setAllSubmissions] = useState<Submission[]>(extraSubmissions)
  const [filters, setFilters] = useState({ category: "all", search: "" })

  useEffect(() => {
    // Merge store submissions with extra mock ones (avoid duplicates)
    const stored = getApprovedSubmissions()
    const storedIds = new Set(stored.map((s) => s.id))
    const extras = extraSubmissions.filter((s) => !storedIds.has(s.id))
    setAllSubmissions([...extras, ...stored])
  }, [])

  const handleVote = async (submissionId: string) => {
    if (userVotedIds.has(submissionId)) return

    await new Promise((resolve) => setTimeout(resolve, 300))

    const success = castVote(submissionId)
    if (success) {
      setVotes((prev) => ({ ...prev, [submissionId]: (prev[submissionId] || 0) + 1 }))
      setUserVotedIds((prev) => new Set([...prev, submissionId]))
    }
  }

  const filteredSubmissions = useMemo(() => {
    return allSubmissions.filter((submission) => {
      if (filters.category !== "all" && submission.category !== filters.category) return false
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
  }, [filters, allSubmissions])

  const leaderboardData = useMemo(() => {
    return Object.entries(votes)
      .map(([submissionId, voteCount]) => {
        const submission = allSubmissions.find((s) => s.id === submissionId)
        return submission ? { submission, votes: voteCount, rank: 0 } : null
      })
      .filter(Boolean)
      .sort((a, b) => b!.votes - a!.votes)
      .map((entry, index) => ({ ...entry!, rank: index + 1 }))
  }, [votes, allSubmissions])

  const categoryLeaderboards = useMemo(() => {
    const categories = ["logo-design", "poster-design", "brand-identity", "digital-graphics"]
    return categories.reduce(
      (acc, category) => {
        const categoryEntries = leaderboardData.filter((entry) => entry.submission.category === category).slice(0, 5)
        acc[category] = categoryEntries
        return acc
      },
      {} as Record<string, typeof leaderboardData>,
    )
  }, [leaderboardData])

  const stats = {
    totalSubmissions: allSubmissions.length,
    totalVotes: Object.values(votes).reduce((sum, count) => sum + count, 0),
    userVotes: userVotedIds.size,
    daysLeft: 15,
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
                <Vote className="w-3 h-3 mr-1" />
                Public Voting Open
              </Badge>

              <h1 className="text-4xl lg:text-5xl font-bold">
                Vote for Your Favorite
                <span className="text-primary block">Somaliland Designs</span>
              </h1>

              <p className="text-xl text-muted-foreground">
                Help choose the People's Choice winners in the Somaliland Brand Awards 2025
              </p>

              <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mt-8">
                <div className="text-center">
                  <div className="text-2xl font-bold text-primary">{stats.totalSubmissions}</div>
                  <div className="text-sm text-muted-foreground">Submissions</div>
                </div>
                <div className="text-center">
                  <div className="text-2xl font-bold text-primary">{stats.totalVotes}</div>
                  <div className="text-sm text-muted-foreground">Total Votes</div>
                </div>
                <div className="text-center">
                  <div className="text-2xl font-bold text-primary">{stats.userVotes}</div>
                  <div className="text-sm text-muted-foreground">Your Votes</div>
                </div>
                <div className="text-center">
                  <div className="text-2xl font-bold text-primary">{stats.daysLeft}</div>
                  <div className="text-sm text-muted-foreground">Days Left</div>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Voting Rules */}
        <section className="py-8 border-b">
          <div className="container">
            <Card className="border-blue-200 bg-blue-50">
              <CardContent className="p-6">
                <div className="flex items-start gap-3">
                  <Info className="w-5 h-5 text-blue-600 mt-0.5 flex-shrink-0" />
                  <div>
                    <h3 className="font-semibold text-blue-800 mb-2">Voting Guidelines</h3>
                    <ul className="text-sm text-blue-700 space-y-1">
                      <li>• You can vote once per submission</li>
                      <li>• Voting closes on March 31, 2025</li>
                      <li>• People's Choice winners will be announced at the awards ceremony</li>
                      <li>• Vote based on creativity, cultural relevance, and visual impact</li>
                    </ul>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
        </section>

        <div className="container py-12">
          <Tabs defaultValue="gallery" className="space-y-8">
            <TabsList className="grid w-full grid-cols-2 max-w-md mx-auto">
              <TabsTrigger value="gallery">Gallery</TabsTrigger>
              <TabsTrigger value="leaderboard">Leaderboard</TabsTrigger>
            </TabsList>

            <TabsContent value="gallery" className="space-y-8">
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
                      </SelectContent>
                    </Select>
                  </div>
                </CardContent>
              </Card>

              {/* Submissions Grid */}
              <div className="space-y-6">
                <div className="flex items-center justify-between">
                  <h2 className="text-2xl font-bold">Submissions ({filteredSubmissions.length})</h2>
                  <Badge variant="outline">
                    {stats.userVotes} of {filteredSubmissions.length} voted
                  </Badge>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                  {filteredSubmissions.map((submission) => (
                    <VotingCard
                      key={submission.id}
                      submission={submission}
                      onVote={handleVote}
                      hasVoted={userVotedIds.has(submission.id)}
                      voteCount={votes[submission.id] || 0}
                      rank={leaderboardData.find((entry) => entry.submission.id === submission.id)?.rank}
                      showRanking={true}
                    />
                  ))}
                </div>

                {filteredSubmissions.length === 0 && (
                  <div className="text-center py-12">
                    <p className="text-muted-foreground text-lg">No submissions found matching your criteria.</p>
                    <Button
                      variant="outline"
                      className="mt-4 bg-transparent"
                      onClick={() => setFilters({ category: "all", search: "" })}
                    >
                      Clear Filters
                    </Button>
                  </div>
                )}
              </div>
            </TabsContent>

            <TabsContent value="leaderboard" className="space-y-8">
              <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                {/* Overall Leaderboard */}
                <div className="lg:col-span-2">
                  <Leaderboard entries={leaderboardData.slice(0, 10)} title="Overall Leaderboard" />
                </div>

                {/* Category Leaderboards */}
                {Object.entries(categoryLeaderboards).map(([category, entries]) => (
                  <Leaderboard
                    key={category}
                    entries={entries}
                    category={category}
                    title={`${category.replace("-", " ")} Leaders`}
                  />
                ))}
              </div>
            </TabsContent>
          </Tabs>
        </div>
      </main>

      <SiteFooter />
    </div>
  )
}
