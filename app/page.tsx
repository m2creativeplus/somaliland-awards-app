import { SiteHeader } from "@/components/site-header"
import { SiteFooter } from "@/components/site-footer"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { ArrowRight, Award, Database, Users, Zap, Shield, BookOpen, Trophy } from "lucide-react"
import Link from "next/link"

export default function HomePage() {
  const features = [
    {
      icon: Database,
      title: "Asset Library",
      description: "Comprehensive collection of official Somaliland visual assets, logos, and brand materials.",
      href: "/library",
      color: "from-emerald-500/20 to-emerald-600/10",
      iconColor: "text-emerald-600",
    },
    {
      icon: Award,
      title: "Brand Awards",
      description: "Annual competition celebrating excellence in Somaliland brand design and visual identity.",
      href: "/awards",
      color: "from-amber-500/20 to-amber-600/10",
      iconColor: "text-amber-600",
    },
    {
      icon: Users,
      title: "Community Voting",
      description: "Public participation in selecting the most impactful designs through democratic voting.",
      href: "/vote",
      color: "from-blue-500/20 to-blue-600/10",
      iconColor: "text-blue-600",
    },
    {
      icon: Zap,
      title: "AI-Powered Scoring",
      description: "Advanced algorithms evaluate submissions based on creativity, functionality, and cultural relevance.",
      href: "/rankings",
      color: "from-purple-500/20 to-purple-600/10",
      iconColor: "text-purple-600",
    },
  ]

  const stats = [
    { label: "Visual Assets", value: "2,847", icon: Database },
    { label: "Award Submissions", value: "156", icon: Award },
    { label: "Community Votes", value: "12,394", icon: Users },
    { label: "Active Designers", value: "89", icon: Trophy },
  ]

  const highlights = [
    {
      icon: Shield,
      title: "Official Government Platform",
      description: "Endorsed by the Republic of Somaliland Ministry of Information",
    },
    {
      icon: BookOpen,
      title: "ISO-Compliant Assets",
      description: "All assets verified against international standards for proper use",
    },
    {
      icon: Trophy,
      title: "$9,000 in Prizes",
      description: "Annual awards across five design categories with cash prizes",
    },
  ]

  return (
    <div className="min-h-screen flex flex-col">
      <SiteHeader />

      <main className="flex-1">
        {/* ── Hero Section ── */}
        <section className="relative overflow-hidden bg-gradient-to-br from-[#1B5E20] via-[#2E7D32] to-[#1B5E20] py-24 lg:py-36">
          {/* Background decorations */}
          <div
            className="absolute inset-0 opacity-[0.07]"
            style={{
              backgroundImage:
                "radial-gradient(circle at 15% 85%, #CFA93F 0%, transparent 55%), radial-gradient(circle at 85% 10%, #ffffff 0%, transparent 55%), radial-gradient(circle at 50% 50%, #C62828 0%, transparent 70%)",
            }}
          />
          <div className="absolute inset-0 opacity-5" style={{ backgroundImage: "url(\"data:image/svg+xml,%3Csvg width='60' height='60' viewBox='0 0 60 60' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='none' fill-rule='evenodd'%3E%3Cg fill='%23ffffff' fill-opacity='1'%3E%3Cpath d='M36 34v-4h-2v4h-4v2h4v4h2v-4h4v-2h-4zm0-30V0h-2v4h-4v2h4v4h2V6h4V4h-4zM6 34v-4H4v4H0v2h4v4h2v-4h4v-2H6zM6 4V0H4v4H0v2h4v4h2V6h4V4H6z'/%3E%3C/g%3E%3C/g%3E%3C/svg%3E\")" }} />

          <div className="container relative">
            <div className="max-w-4xl mx-auto text-center space-y-8">
              <div className="animate-fade-up">
                <Badge className="bg-[#CFA93F]/20 text-[#CFA93F] border-[#CFA93F]/40 border mb-6 text-sm px-4 py-1.5">
                  <Shield className="w-3 h-3 mr-1.5" />
                  Official Government Platform — Republic of Somaliland
                </Badge>
              </div>

              <div className="animate-fade-up-delay-1">
                <h1 className="text-4xl lg:text-6xl xl:text-7xl font-heading text-white leading-tight">
                  Somaliland Visual Assets &amp;{" "}
                  <span className="text-[#CFA93F]">Brand Awards</span>
                </h1>
              </div>

              <div className="animate-fade-up-delay-2">
                <p className="text-xl text-white/75 text-pretty max-w-2xl mx-auto leading-relaxed">
                  The official repository of the Republic of Somaliland's visual identity. Discover, submit, and
                  celebrate the designs that represent our nation's heritage and future.
                </p>
              </div>

              <div className="flex flex-col sm:flex-row gap-4 justify-center animate-fade-up-delay-3">
                <Button
                  size="lg"
                  className="bg-[#CFA93F] hover:bg-[#B89230] text-black font-semibold shadow-lg hover:shadow-xl transition-all hover:-translate-y-0.5"
                  asChild
                >
                  <Link href="/library">
                    Explore Library
                    <ArrowRight className="ml-2 h-4 w-4" />
                  </Link>
                </Button>
                <Button
                  size="lg"
                  variant="outline"
                  className="border-white/40 text-white hover:bg-white/10 bg-transparent hover:-translate-y-0.5 transition-all"
                  asChild
                >
                  <Link href="/submit">Submit Your Design</Link>
                </Button>
              </div>
            </div>
          </div>

          {/* Bottom fade */}
          <div className="absolute bottom-0 left-0 right-0 h-16 bg-gradient-to-t from-background to-transparent" />
        </section>

        {/* ── Stats Section ── */}
        <section className="py-16 border-b bg-muted/20">
          <div className="container">
            <div className="grid grid-cols-2 lg:grid-cols-4 gap-8">
              {stats.map((stat, index) => (
                <div key={index} className="text-center space-y-2 animate-fade-up" style={{ animationDelay: `${index * 0.1}s` }}>
                  <div className="text-3xl lg:text-4xl font-heading text-[#1B5E20]">{stat.value}</div>
                  <div className="text-sm text-muted-foreground font-medium">{stat.label}</div>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* ── Features Section ── */}
        <section className="py-24">
          <div className="container">
            <div className="text-center space-y-4 mb-16">
              <Badge variant="outline" className="border-[#1B5E20]/30 text-[#1B5E20]">Platform Features</Badge>
              <h2 className="text-3xl lg:text-4xl font-heading">Everything in One Place</h2>
              <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
                Discover, contribute to, and celebrate Somaliland's visual identity through our unified platform.
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
              {features.map((feature, index) => (
                <Card
                  key={index}
                  className="group hover:shadow-xl transition-all duration-300 hover:-translate-y-1 overflow-hidden border"
                >
                  <div className={`h-1 bg-gradient-to-r from-[#1B5E20] to-[#CFA93F]`} />
                  <CardHeader className="pb-3">
                    <div
                      className={`h-12 w-12 rounded-xl bg-gradient-to-br ${feature.color} flex items-center justify-center mb-4 group-hover:scale-110 transition-transform duration-200`}
                    >
                      <feature.icon className={`h-6 w-6 ${feature.iconColor}`} />
                    </div>
                    <CardTitle className="text-lg">{feature.title}</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <CardDescription className="mb-4 leading-relaxed">{feature.description}</CardDescription>
                    <Button variant="ghost" size="sm" asChild className="p-0 h-auto group/btn">
                      <Link href={feature.href} className="text-[#1B5E20] hover:text-[#1B5E20]/80 flex items-center">
                        Learn more{" "}
                        <ArrowRight className="ml-1 h-3 w-3 group-hover/btn:translate-x-1 transition-transform" />
                      </Link>
                    </Button>
                  </CardContent>
                </Card>
              ))}
            </div>
          </div>
        </section>

        {/* ── Highlights / Why Us ── */}
        <section className="py-16 bg-muted/30 border-y">
          <div className="container">
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              {highlights.map((item, index) => (
                <div key={index} className="flex items-start gap-4">
                  <div className="h-10 w-10 rounded-lg bg-[#1B5E20]/10 flex items-center justify-center flex-shrink-0">
                    <item.icon className="h-5 w-5 text-[#1B5E20]" />
                  </div>
                  <div>
                    <h3 className="font-semibold mb-1">{item.title}</h3>
                    <p className="text-sm text-muted-foreground leading-relaxed">{item.description}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* ── CTA Section ── */}
        <section className="py-24 bg-gradient-to-br from-[#1B5E20] to-[#2E7D32] text-white overflow-hidden relative">
          <div
            className="absolute inset-0 opacity-10"
            style={{ backgroundImage: "radial-gradient(circle at 80% 50%, #CFA93F 0%, transparent 60%)" }}
          />
          <div className="container text-center space-y-8 relative">
            <h2 className="text-3xl lg:text-4xl font-heading">Ready to Contribute?</h2>
            <p className="text-xl text-white/80 max-w-2xl mx-auto">
              Join designers, government officials, and citizens shaping Somaliland's visual future.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Button
                size="lg"
                className="bg-[#CFA93F] hover:bg-[#B89230] text-black font-semibold shadow-lg"
                asChild
              >
                <Link href="/submit">Submit Your Design <ArrowRight className="ml-2 h-4 w-4" /></Link>
              </Button>
              <Button
                size="lg"
                variant="outline"
                className="border-white/40 text-white hover:bg-white/10 bg-transparent"
                asChild
              >
                <Link href="/awards">View Awards</Link>
              </Button>
            </div>
          </div>
        </section>
      </main>

      <SiteFooter />
    </div>
  )
}
