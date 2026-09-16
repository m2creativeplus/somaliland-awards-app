"use client"

import { SiteHeader } from "@/components/site-header"
import { SiteFooter } from "@/components/site-footer"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { CalendarDays, MapPin, Trophy, Clock, Star, Users, ArrowRight, Award } from "lucide-react"
import Link from "next/link"

export default function AwardsPage() {
  const eventDetails = {
    date: "June 15, 2026",
    time: "7:00 PM – 10:00 PM EAT",
    venue: "Hargeisa Cultural Center",
    address: "Liberation Road, Hargeisa, Republic of Somaliland",
  }

  const categories = [
    {
      name: "Logo Design",
      description: "Outstanding logo and brand mark designs representing Somaliland institutions",
      prize: "$2,000",
      entries: 45,
    },
    {
      name: "Brand Identity",
      description: "Complete brand identity systems for government and private entities",
      prize: "$3,000",
      entries: 28,
    },
    {
      name: "Poster Design",
      description: "Creative poster and promotional designs celebrating Somaliland culture",
      prize: "$1,500",
      entries: 52,
    },
    {
      name: "Digital Graphics",
      description: "Web, social media, and interactive digital graphics",
      prize: "$1,500",
      entries: 31,
    },
    {
      name: "People's Choice",
      description: "Community's favorite design across all categories — voted by the public",
      prize: "$1,000",
      entries: 156,
    },
  ]

  const timeline = [
    {
      date: "January 1, 2026",
      title: "Submissions Open",
      description: "Call for entries begins across all five categories",
      status: "completed",
    },
    {
      date: "May 31, 2026",
      title: "Submission Deadline",
      description: "Final day to submit entries and complete payments",
      status: "current",
    },
    {
      date: "June 1–10, 2026",
      title: "Jury Evaluation",
      description: "Expert panel reviews and scores all submissions",
      status: "upcoming",
    },
    {
      date: "June 11–14, 2026",
      title: "Final Judging",
      description: "Final deliberations and winner selection",
      status: "upcoming",
    },
    {
      date: "June 15, 2026",
      title: "Awards Ceremony",
      description: "Winners announced at the grand ceremony in Hargeisa",
      status: "upcoming",
    },
  ]

  const sponsors = [
    { name: "Ministry of Information", tier: "Platinum" },
    { name: "Hargeisa Municipality", tier: "Gold" },
    { name: "Dahabshiil Group", tier: "Gold" },
    { name: "Telesom", tier: "Silver" },
    { name: "Somtel", tier: "Silver" },
  ]

  const tierColors: Record<string, string> = {
    Platinum: "bg-slate-100 text-slate-700 border-slate-300",
    Gold: "bg-amber-50 text-amber-700 border-amber-200",
    Silver: "bg-gray-50 text-gray-600 border-gray-200",
  }

  return (
    <div className="min-h-screen flex flex-col">
      <SiteHeader />

      <main className="flex-1">
        {/* Hero */}
        <section className="relative py-20 overflow-hidden bg-gradient-to-br from-[#1B5E20] via-[#2E7D32] to-[#1B5E20]">
          {/* Decorative elements */}
          <div className="absolute inset-0 opacity-10" style={{
            backgroundImage: "radial-gradient(circle at 20% 80%, #CFA93F 0%, transparent 50%), radial-gradient(circle at 80% 20%, #ffffff 0%, transparent 50%)"
          }} />
          <div className="container relative">
            <div className="max-w-3xl mx-auto text-center space-y-6 animate-fade-up">
              <Badge className="bg-[#CFA93F]/20 text-[#CFA93F] border-[#CFA93F]/30 border">
                <Award className="w-3 h-3 mr-1" />
                Somaliland Brand Awards 2026
              </Badge>
              <h1 className="text-4xl lg:text-6xl font-heading text-white">
                Celebrating Design Excellence in the{" "}
                <span className="text-[#CFA93F]">Republic of Somaliland</span>
              </h1>
              <p className="text-xl text-white/80">
                Recognizing the creative talent shaping our nation's visual identity and institutional heritage.
              </p>
              <div className="flex flex-col sm:flex-row items-center justify-center gap-4 pt-4">
                <Button size="lg" className="bg-[#CFA93F] hover:bg-[#B89230] text-black font-semibold shadow-lg" asChild>
                  <Link href="/submit">Submit Entry</Link>
                </Button>
                <Button size="lg" variant="outline" className="border-white/50 text-white hover:bg-white/10 bg-transparent" asChild>
                  <Link href="/vote">View Gallery</Link>
                </Button>
              </div>
            </div>
          </div>
        </section>

        {/* Event Details */}
        <section className="py-12 bg-muted/30">
          <div className="container">
            <div className="grid md:grid-cols-3 gap-6">
              {[
                { icon: CalendarDays, label: "Date", value: eventDetails.date },
                { icon: Clock, label: "Time", value: eventDetails.time },
                { icon: MapPin, label: "Venue", value: eventDetails.venue, sub: eventDetails.address },
              ].map(({ icon: Icon, label, value, sub }) => (
                <Card key={label} className="border-none shadow-md hover:shadow-lg transition-shadow">
                  <CardContent className="flex flex-col items-center text-center p-6 pt-8 space-y-2">
                    <Icon className="h-10 w-10 text-[#1B5E20] mb-2" />
                    <h3 className="font-semibold text-lg">{label}</h3>
                    <p className="text-muted-foreground font-medium">{value}</p>
                    {sub && <p className="text-sm text-muted-foreground/70">{sub}</p>}
                  </CardContent>
                </Card>
              ))}
            </div>
          </div>
        </section>

        {/* Categories */}
        <section className="py-20 container space-y-8">
          <div className="flex items-center justify-between">
            <div>
              <h2 className="text-3xl font-heading">Award Categories</h2>
              <p className="text-muted-foreground mt-1">Five categories, $9,000 in total prizes</p>
            </div>
            <Link href="/submit" className="text-[#1B5E20] hover:underline flex items-center gap-1 text-sm font-medium">
              See submission rules <ArrowRight className="h-4 w-4" />
            </Link>
          </div>
          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {categories.map((category) => (
              <Card key={category.name} className="overflow-hidden hover:shadow-lg transition-all hover:-translate-y-0.5 duration-200">
                <div className="h-1 bg-gradient-to-r from-[#1B5E20] to-[#CFA93F]" />
                <CardHeader>
                  <CardTitle className="flex items-center justify-between text-base">
                    {category.name}
                    <Trophy className="h-5 w-5 text-[#CFA93F]" />
                  </CardTitle>
                  <CardDescription>{category.description}</CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="flex justify-between items-center text-sm">
                    <div className="flex items-center gap-1 text-[#CFA93F] font-bold">
                      <Star className="h-4 w-4 fill-current" />
                      Prize: {category.prize}
                    </div>
                    <div className="text-muted-foreground flex items-center gap-1">
                      <Users className="h-4 w-4" />
                      {category.entries} Entries
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </section>

        {/* Timeline */}
        <section className="py-20 bg-muted/30">
          <div className="container space-y-8">
            <h2 className="text-3xl font-heading">Event Timeline</h2>
            <div className="relative border-l-2 border-[#1B5E20]/20 ml-4 space-y-8 py-4">
              {timeline.map((item, index) => (
                <div key={index} className="relative pl-8">
                  <div
                    className={`absolute -left-[9px] top-1 h-4 w-4 rounded-full border-2 border-white shadow-sm ${
                      item.status === "completed"
                        ? "bg-[#1B5E20]"
                        : item.status === "current"
                        ? "bg-[#CFA93F]"
                        : "bg-muted-foreground/30"
                    }`}
                  />
                  <div className="space-y-1">
                    <div className="flex items-center gap-2">
                      <span className="text-sm font-medium text-[#CFA93F]">{item.date}</span>
                      {item.status === "current" && (
                        <Badge variant="outline" className="text-xs border-[#CFA93F]/50 text-[#CFA93F]">Active</Badge>
                      )}
                    </div>
                    <h3 className="text-lg font-bold">{item.title}</h3>
                    <p className="text-muted-foreground">{item.description}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Sponsors */}
        <section className="py-16 container space-y-8 text-center border-t">
          <h2 className="text-2xl font-heading">Our Partners &amp; Sponsors</h2>
          <div className="flex flex-wrap justify-center items-center gap-4">
            {sponsors.map((sponsor) => (
              <div
                key={sponsor.name}
                className={`px-4 py-2 rounded-full border text-sm font-medium ${tierColors[sponsor.tier] || "bg-muted"}`}
              >
                {sponsor.name}
                <span className="ml-2 opacity-60 text-xs">{sponsor.tier}</span>
              </div>
            ))}
          </div>
        </section>

        {/* CTA */}
        <section className="py-16 bg-[#1B5E20] text-white text-center">
          <div className="container space-y-6">
            <h2 className="text-3xl font-heading">Ready to Compete?</h2>
            <p className="text-white/80 max-w-xl mx-auto">
              Join Somaliland's premier design awards and showcase your talent to the nation.
            </p>
            <Button size="lg" className="bg-[#CFA93F] hover:bg-[#B89230] text-black font-semibold" asChild>
              <Link href="/submit">Submit Your Design Now <ArrowRight className="ml-2 h-4 w-4" /></Link>
            </Button>
          </div>
        </section>
      </main>

      <SiteFooter />
    </div>
  )
}
