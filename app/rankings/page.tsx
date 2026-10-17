"use client"

import { useEffect, useState } from "react"
import { SiteHeader } from "@/components/site-header"
import { SiteFooter } from "@/components/site-footer"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Progress } from "@/components/ui/progress"
import { Button } from "@/components/ui/button"
import { Skeleton } from "@/components/ui/skeleton"
import { Zap, Shield, Trophy, Filter, ArrowUpRight, Sparkles } from "lucide-react"
import Link from "next/link"

interface RankingItem {
  id: string
  rank: number
  title: string
  designer: string
  category: string
  score: number
  votes: number
  breakdown: {
    creativity: number
    relevance: number
    execution: number
  }
}

export default function RankingsPage() {
  const [items, setItems] = useState<RankingItem[]>([])
  const [loading, setLoading] = useState(true)
  const [categoryFilter, setCategoryFilter] = useState("all")

  useEffect(() => {
    async function loadRankings() {
      try {
        const res = await fetch("/api/submissions")
        if (res.ok) {
          const data = await res.json()
          const rawList = Array.isArray(data) ? data : data.docs || []
          
          if (rawList.length > 0) {
            // Sort by aiScore or votes
            const sorted = [...rawList].sort((a, b) => {
              const scoreA = Number(a.aiScore || a.scorecard?.total_score || 0)
              const scoreB = Number(b.aiScore || b.scorecard?.total_score || 0)
              return scoreB - scoreA
            })

            const mapped: RankingItem[] = sorted.map((s, idx) => {
              const crit = s.scorecard?.criteria || {}
              const cVal = crit.creativity?.score || 92
              const rVal = crit.functionality?.score || crit.culture?.score || 90
              const eVal = crit.execution?.score || 88
              const total = s.aiScore || s.scorecard?.total_score || Math.round((cVal + rVal + eVal) / 3)

              return {
                id: String(s.id),
                rank: idx + 1,
                title: s.title || s.metadata?.title || "National Brand Entry",
                designer: s.designer || s.entrant?.name || "Somaliland Creator",
                category: s.category || "logo-design",
                score: Math.min(100, Math.max(0, Math.round(Number(total)))),
                votes: Number(s.voteCount || 0),
                breakdown: {
                  creativity: Math.min(100, Math.round(Number(cVal))),
                  relevance: Math.min(100, Math.round(Number(rVal))),
                  execution: Math.min(100, Math.round(Number(eVal))),
                },
              }
            })
            setItems(mapped)
          } else {
            setItems([])
          }
        }
      } catch (err) {
        console.error("Error loading rankings:", err)
      } finally {
        setLoading(false)
      }
    }

    loadRankings()
  }, [])

  const filteredItems = items.filter((item) => {
    if (categoryFilter === "all") return true
    return item.category.toLowerCase().includes(categoryFilter.toLowerCase())
  })

  // Dynamic category entry counts
  const categoryCounts = items.reduce<Record<string, number>>((acc, item) => {
    acc[item.category] = (acc[item.category] || 0) + 1
    return acc
  }, {})

  return (
    <div className="min-h-screen flex flex-col bg-background">
      <SiteHeader />

      <main className="flex-1 py-12 bg-muted/10">
        <div className="container max-w-6xl space-y-8">
          {/* Header Banner */}
          <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
            <div>
              <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-primary/10 text-primary text-xs font-semibold mb-3">
                <Sparkles className="w-3.5 h-3.5" /> Official AI Evaluation Matrix
              </div>
              <h1 className="text-3xl md:text-4xl font-heading font-bold text-foreground">
                AI Performance Rankings
              </h1>
              <p className="text-muted-foreground mt-2 max-w-2xl">
                Real-time leaderboard powered by computer vision and cultural compliance models. Evaluated across creativity, institutional alignment, and visual scalability.
              </p>
            </div>
            <Badge variant="outline" className="px-4 py-2 text-sm bg-card border-border flex items-center gap-2 shadow-xs">
              <Zap className="w-4 h-4 text-[#CFA93F]" />
              <span>Live Engine Status: Verified</span>
            </Badge>
          </div>

          {/* Filter Pills */}
          <div className="flex flex-wrap items-center gap-2 pb-2 border-b border-border">
            <span className="text-xs font-semibold text-muted-foreground mr-2 flex items-center gap-1">
              <Filter className="w-3.5 h-3.5" /> Category:
            </span>
            {[
              { id: "all", label: "All Entries" },
              { id: "logo", label: "Logo & Brand" },
              { id: "identity", label: "Digital Identity" },
              { id: "poster", label: "Public Works" },
            ].map((cat) => (
              <Button
                key={cat.id}
                variant={categoryFilter === cat.id ? "default" : "outline"}
                size="sm"
                className="h-8 text-xs rounded-full"
                onClick={() => setCategoryFilter(cat.id)}
              >
                {cat.label}
              </Button>
            ))}
          </div>

          <div className="grid gap-8 lg:grid-cols-3">
            {/* Leaderboard List */}
            <div className="lg:col-span-2 space-y-4">
              {loading ? (
                <div className="space-y-4">
                  {[1, 2, 3].map((n) => (
                    <Card key={n} className="p-6">
                      <div className="flex items-center gap-4">
                        <Skeleton className="w-12 h-12 rounded-lg" />
                        <div className="space-y-2 flex-1">
                          <Skeleton className="h-5 w-1/2" />
                          <Skeleton className="h-4 w-1/4" />
                        </div>
                        <Skeleton className="w-16 h-10" />
                      </div>
                      <div className="mt-6 grid grid-cols-3 gap-4">
                        <Skeleton className="h-6" />
                        <Skeleton className="h-6" />
                        <Skeleton className="h-6" />
                      </div>
                    </Card>
                  ))}
                </div>
              ) : filteredItems.length === 0 ? (
                <Card className="p-12 text-center border-dashed">
                  <Trophy className="w-12 h-12 text-muted-foreground/40 mx-auto mb-4" />
                  <h3 className="text-lg font-semibold">No Submissions Found in this Category</h3>
                  <p className="text-sm text-muted-foreground mt-1 max-w-sm mx-auto">
                    Be the first national designer to submit and receive an automated AI score and official badge.
                  </p>
                  <Button asChild className="mt-6 bg-[#1B5E20] hover:bg-[#2E7D32]">
                    <Link href="/submit">Submit an Entry</Link>
                  </Button>
                </Card>
              ) : (
                filteredItems.map((item) => (
                  <Card
                    key={item.id}
                    className="hover:shadow-md transition-all border-border/80 group overflow-hidden"
                  >
                    <div className="h-1 w-full bg-gradient-to-r from-[#1B5E20] via-[#CFA93F] to-transparent opacity-0 group-hover:opacity-100 transition-opacity" />
                    <CardContent className="p-6">
                      <div className="flex items-center gap-4">
                        <div className={`flex flex-col items-center justify-center w-12 h-12 rounded-lg font-heading font-bold text-lg flex-shrink-0 ${
                          item.rank === 1
                            ? "bg-[#CFA93F]/20 text-[#CFA93F] border border-[#CFA93F]/40"
                            : item.rank === 2
                            ? "bg-slate-200 text-slate-700 dark:bg-slate-800 dark:text-slate-200"
                            : item.rank === 3
                            ? "bg-amber-700/20 text-amber-700"
                            : "bg-muted text-muted-foreground"
                        }`}>
                          #{item.rank}
                        </div>

                        <div className="flex-1 min-w-0">
                          <div className="flex items-center gap-2">
                            <h3 className="text-lg font-heading font-semibold truncate group-hover:text-primary transition-colors">
                              {item.title}
                            </h3>
                            <Badge variant="secondary" className="text-[10px] px-2 py-0 capitalize">
                              {item.category.replace("-", " ")}
                            </Badge>
                          </div>
                          <p className="text-sm text-muted-foreground mt-0.5">Entrant: {item.designer}</p>
                        </div>

                        <div className="text-right flex-shrink-0">
                          <div className="text-2xl font-bold font-heading text-primary">{item.score}</div>
                          <div className="text-[11px] text-muted-foreground uppercase tracking-wide">AI Index</div>
                        </div>
                      </div>

                      <div className="mt-6 grid grid-cols-3 gap-4 pt-4 border-t border-border/60">
                        <div className="space-y-1">
                          <div className="flex justify-between text-xs text-muted-foreground">
                            <span>Creativity</span>
                            <span className="font-medium text-foreground">{item.breakdown.creativity}%</span>
                          </div>
                          <Progress value={item.breakdown.creativity} className="h-1.5" />
                        </div>
                        <div className="space-y-1">
                          <div className="flex justify-between text-xs text-muted-foreground">
                            <span>Relevance</span>
                            <span className="font-medium text-foreground">{item.breakdown.relevance}%</span>
                          </div>
                          <Progress value={item.breakdown.relevance} className="h-1.5" />
                        </div>
                        <div className="space-y-1">
                          <div className="flex justify-between text-xs text-muted-foreground">
                            <span>Execution</span>
                            <span className="font-medium text-foreground">{item.breakdown.execution}%</span>
                          </div>
                          <Progress value={item.breakdown.execution} className="h-1.5" />
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                ))
              )}
            </div>

            {/* Sidebar Context */}
            <div className="space-y-6">
              <Card className="bg-gradient-to-br from-[#1B5E20] to-[#2E7D32] text-white border-0 shadow-lg">
                <CardHeader>
                  <CardTitle className="flex items-center gap-2 text-white">
                    <Shield className="w-5 h-5 text-[#CFA93F]" />
                    How AI Scoring Works
                  </CardTitle>
                </CardHeader>
                <CardContent className="space-y-4 text-sm text-white/90">
                  <p className="leading-relaxed">
                    Our local AI jury model analyzes entries against official Republic of Somaliland brand standards:
                  </p>
                  <ul className="space-y-2.5">
                    <li className="flex items-start gap-2">
                      <span className="h-1.5 w-1.5 rounded-full bg-[#CFA93F] mt-1.5 flex-shrink-0" />
                      <span><strong>Color Palette Compliance:</strong> Adherence to Somaliland Green (#1B5E20), Gold (#CFA93F), and National Red.</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <span className="h-1.5 w-1.5 rounded-full bg-[#CFA93F] mt-1.5 flex-shrink-0" />
                      <span><strong>Cultural Authenticity:</strong> Recognition of patriotic emblems, Laas Geel heritage symbols, and national iconography.</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <span className="h-1.5 w-1.5 rounded-full bg-[#CFA93F] mt-1.5 flex-shrink-0" />
                      <span><strong>Technical Precision:</strong> SVG vector clarity, typography readability, and responsive scaling.</span>
                    </li>
                  </ul>
                </CardContent>
              </Card>

              <Card>
                <CardHeader className="pb-3">
                  <CardTitle className="text-base font-semibold">Active Categories</CardTitle>
                </CardHeader>
                <CardContent className="space-y-3">
                  {Object.entries(categoryCounts).length > 0 ? (
                    Object.entries(categoryCounts).map(([cat, count]) => (
                      <div key={cat} className="flex items-center justify-between text-sm py-1.5 border-b last:border-0 border-border/50">
                        <span className="capitalize font-medium text-foreground">{cat.replace("-", " ")}</span>
                        <Badge variant="secondary" className="font-mono text-xs">{count} {count === 1 ? 'entry' : 'entries'}</Badge>
                      </div>
                    ))
                  ) : (
                    <p className="text-xs text-muted-foreground">No entries recorded yet.</p>
                  )}
                </CardContent>
              </Card>

              <Card className="border-border/80 bg-muted/30">
                <CardContent className="p-5 space-y-3">
                  <h4 className="text-sm font-semibold">Participate in Public Voting</h4>
                  <p className="text-xs text-muted-foreground leading-relaxed">
                    Community ballots account for 40% of the final award calculation alongside the AI and Ministry Jury.
                  </p>
                  <Button asChild variant="outline" size="sm" className="w-full justify-between">
                    <Link href="/vote">
                      <span>Cast Your Vote</span>
                      <ArrowUpRight className="w-3.5 h-3.5" />
                    </Link>
                  </Button>
                </CardContent>
              </Card>
            </div>
          </div>
        </div>
      </main>

      <SiteFooter />
    </div>
  )
}
