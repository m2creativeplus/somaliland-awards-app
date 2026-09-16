import { SiteHeader } from "@/components/site-header"
import { SiteFooter } from "@/components/site-footer"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Progress } from "@/components/ui/progress"
import { Zap, Shield } from "lucide-react"

const rankings = [
  {
    rank: 1,
    title: "National Tourism Logo 2025",
    designer: "Ahmed Hassan",
    score: 98,
    breakdown: { creativity: 99, relevance: 98, execution: 97 },
    trend: "up",
  },
  {
    rank: 2,
    title: "Hargeisa Smart City Icon",
    designer: "Fatima Ali",
    score: 95,
    breakdown: { creativity: 94, relevance: 96, execution: 95 },
    trend: "same",
  },
  {
    rank: 3,
    title: "Somaliland Ports Authority Rebrand",
    designer: "Design Collective SL",
    score: 92,
    breakdown: { creativity: 90, relevance: 95, execution: 91 },
    trend: "up",
  },
  {
    rank: 4,
    title: "Agricultural Expo Poster",
    designer: "Mohamed Jama",
    score: 89,
    breakdown: { creativity: 92, relevance: 85, execution: 90 },
    trend: "down",
  },
  {
    rank: 5,
    title: "Digital ID App Interface",
    designer: "TechStars Hargeisa",
    score: 88,
    breakdown: { creativity: 88, relevance: 90, execution: 86 },
    trend: "same",
  },
]

export default function RankingsPage() {
  return (
    <div className="min-h-screen flex flex-col">
      <SiteHeader />

      <main className="flex-1 py-12 bg-muted/10">
        <div className="container">
          <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-8 gap-4">
            <div>
              <h1 className="text-3xl font-bold">AI Performance Rankings</h1>
              <p className="text-muted-foreground mt-2">
                Top-rated designs evaluated by our computer vision algorithms for technical compliance and aesthetic
                quality.
              </p>
            </div>
            <Badge variant="outline" className="px-4 py-2 text-sm bg-background">
              <Zap className="w-4 h-4 mr-2 text-yellow-500" />
              Last Updated: 1 hour ago
            </Badge>
          </div>

          <div className="grid gap-6 lg:grid-cols-3">
            <div className="lg:col-span-2 space-y-6">
              {rankings.map((item) => (
                <Card key={item.rank} className="hover:shadow-md transition-shadow">
                  <CardContent className="p-6">
                    <div className="flex items-center gap-4">
                      <div className="flex flex-col items-center justify-center w-12 h-12 bg-primary/10 rounded-lg flex-shrink-0">
                        <span className="text-xl font-bold text-primary">#{item.rank}</span>
                      </div>

                      <div className="flex-1 min-w-0">
                        <h3 className="text-lg font-semibold truncate">{item.title}</h3>
                        <p className="text-sm text-muted-foreground">{item.designer}</p>
                      </div>

                      <div className="text-right">
                        <div className="text-2xl font-bold text-primary">{item.score}</div>
                        <div className="text-xs text-muted-foreground">AI Score</div>
                      </div>
                    </div>

                    <div className="mt-6 grid grid-cols-3 gap-4">
                      <div className="space-y-1">
                        <div className="flex justify-between text-xs text-muted-foreground">
                          <span>Creativity</span>
                          <span>{item.breakdown.creativity}%</span>
                        </div>
                        <Progress value={item.breakdown.creativity} className="h-1.5" />
                      </div>
                      <div className="space-y-1">
                        <div className="flex justify-between text-xs text-muted-foreground">
                          <span>Relevance</span>
                          <span>{item.breakdown.relevance}%</span>
                        </div>
                        <Progress value={item.breakdown.relevance} className="h-1.5" />
                      </div>
                      <div className="space-y-1">
                        <div className="flex justify-between text-xs text-muted-foreground">
                          <span>Execution</span>
                          <span>{item.breakdown.execution}%</span>
                        </div>
                        <Progress value={item.breakdown.execution} className="h-1.5" />
                      </div>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>

            <div className="space-y-6">
              <Card className="bg-primary text-primary-foreground">
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <Shield className="w-5 h-5" />
                    How AI Scoring Works
                  </CardTitle>
                </CardHeader>
                <CardContent className="space-y-4 text-sm opacity-90">
                  <p>
                    Our proprietary algorithm analyzes submissions across 3 key dimensions to provide an objective
                    baseline score.
                  </p>
                  <ul className="space-y-2 list-disc list-inside">
                    <li>Color Palette Compliance</li>
                    <li>Shape Complexity & Scalability</li>
                    <li>Cultural Symbol Detection</li>
                  </ul>
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <CardTitle>Top Categories</CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="flex items-center justify-between">
                    <span className="text-sm font-medium">Logo Design</span>
                    <Badge variant="secondary">45 entries</Badge>
                  </div>
                  <div className="flex items-center justify-between">
                    <span className="text-sm font-medium">Public Posters</span>
                    <Badge variant="secondary">32 entries</Badge>
                  </div>
                  <div className="flex items-center justify-between">
                    <span className="text-sm font-medium">Digital Art</span>
                    <Badge variant="secondary">28 entries</Badge>
                  </div>
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
