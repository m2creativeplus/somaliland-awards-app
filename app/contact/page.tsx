"use client"

import { useState } from "react"
import { SiteHeader } from "@/components/site-header"
import { SiteFooter } from "@/components/site-footer"
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Building2, Mail, Phone, MapPin, Send, CheckCircle2, Clock } from "lucide-react"

export default function ContactPage() {
  const [submitted, setSubmitted] = useState(false)
  const [loading, setLoading] = useState(false)
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    organization: "",
    subject: "",
    message: "",
  })

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setLoading(true)
    // Simulate API dispatch
    await new Promise((resolve) => setTimeout(resolve, 800))
    setLoading(false)
    setSubmitted(true)
  }

  return (
    <div className="min-h-screen flex flex-col bg-background">
      <SiteHeader />

      <main className="flex-1 py-12 bg-muted/10">
        <div className="container max-w-5xl space-y-12">
          {/* Header */}
          <div className="space-y-4">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-primary/10 text-primary text-xs font-semibold">
              <Building2 className="w-3.5 h-3.5" /> Official Communications
            </div>
            <h1 className="text-3xl md:text-5xl font-heading font-bold text-foreground tracking-tight">
              Contact Secretariat
            </h1>
            <p className="text-muted-foreground text-base md:text-lg max-w-2xl leading-relaxed">
              Connect with the National Planning Authority and the Brand Awards Steering Committee in Hargeisa.
            </p>
          </div>

          <div className="grid gap-8 lg:grid-cols-3">
            {/* Contact Form */}
            <div className="lg:col-span-2">
              <Card className="border-border/80 shadow-xs">
                <CardHeader>
                  <CardTitle className="text-xl font-heading">Direct Inquiry Form</CardTitle>
                  <CardDescription>
                    Submit questions regarding official asset downloads, award partnerships, or technical assistance.
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  {submitted ? (
                    <div className="py-12 text-center space-y-4 animate-fade-up">
                      <div className="w-14 h-14 bg-green-500/10 text-green-600 rounded-full flex items-center justify-center mx-auto">
                        <CheckCircle2 className="w-8 h-8" />
                      </div>
                      <h3 className="text-xl font-heading font-bold text-foreground">Message Dispatched</h3>
                      <p className="text-sm text-muted-foreground max-w-md mx-auto">
                        Thank you for reaching out. The Awards Secretariat has logged your inquiry under reference ID{" "}
                        <span className="font-mono font-semibold text-primary">SL-SEC-{Math.floor(1000 + Math.random() * 9000)}</span>.
                        A representative will reply within 1-2 business days.
                      </p>
                      <Button
                        variant="outline"
                        onClick={() => {
                          setSubmitted(false)
                          setFormData({ name: "", email: "", organization: "", subject: "", message: "" })
                        }}
                      >
                        Send Another Inquiry
                      </Button>
                    </div>
                  ) : (
                    <form onSubmit={handleSubmit} className="space-y-4">
                      <div className="grid gap-4 sm:grid-cols-2">
                        <div className="space-y-2">
                          <Label htmlFor="name">Full Name *</Label>
                          <Input
                            id="name"
                            required
                            placeholder="e.g. Ahmed Jama"
                            value={formData.name}
                            onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                          />
                        </div>
                        <div className="space-y-2">
                          <Label htmlFor="email">Official Email *</Label>
                          <Input
                            id="email"
                            type="email"
                            required
                            placeholder="e.g. ahmed@example.com"
                            value={formData.email}
                            onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                          />
                        </div>
                      </div>

                      <div className="grid gap-4 sm:grid-cols-2">
                        <div className="space-y-2">
                          <Label htmlFor="organization">Organization / Ministry</Label>
                          <Input
                            id="organization"
                            placeholder="e.g. Ministry of Commerce or Freelance"
                            value={formData.organization}
                            onChange={(e) => setFormData({ ...formData, organization: e.target.value })}
                          />
                        </div>
                        <div className="space-y-2">
                          <Label htmlFor="subject">Subject *</Label>
                          <Input
                            id="subject"
                            required
                            placeholder="e.g. Asset Licensing Request"
                            value={formData.subject}
                            onChange={(e) => setFormData({ ...formData, subject: e.target.value })}
                          />
                        </div>
                      </div>

                      <div className="space-y-2">
                        <Label htmlFor="message">Message *</Label>
                        <Textarea
                          id="message"
                          required
                          rows={5}
                          placeholder="Please provide details about your inquiry or feedback..."
                          value={formData.message}
                          onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                        />
                      </div>

                      <Button
                        type="submit"
                        disabled={loading}
                        className="w-full bg-[#1B5E20] hover:bg-[#2E7D32] text-white"
                      >
                        {loading ? (
                          "Dispatching Message..."
                        ) : (
                          <span className="flex items-center gap-2">
                            <Send className="w-4 h-4" /> Send Inquiry
                          </span>
                        )}
                      </Button>
                    </form>
                  )}
                </CardContent>
              </Card>
            </div>

            {/* Secretariat Information */}
            <div className="space-y-6">
              <Card className="border-border/80">
                <CardHeader>
                  <CardTitle className="text-base font-semibold">Headquarters</CardTitle>
                </CardHeader>
                <CardContent className="space-y-4 text-sm">
                  <div className="flex items-start gap-3">
                    <MapPin className="w-5 h-5 text-primary flex-shrink-0 mt-0.5" />
                    <div>
                      <p className="font-semibold text-foreground">National Planning Authority (SNPA)</p>
                      <p className="text-muted-foreground text-xs mt-0.5">
                        Sha'ab Area, Near Ministry Complex<br />
                        Hargeisa, Republic of Somaliland
                      </p>
                    </div>
                  </div>

                  <div className="flex items-start gap-3 pt-2 border-t border-border/50">
                    <Mail className="w-5 h-5 text-primary flex-shrink-0 mt-0.5" />
                    <div>
                      <p className="font-semibold text-foreground">Secretariat Inquiries</p>
                      <p className="text-muted-foreground text-xs mt-0.5 font-mono">
                        awards@somaliland-gov.org
                      </p>
                    </div>
                  </div>

                  <div className="flex items-start gap-3 pt-2 border-t border-border/50">
                    <Clock className="w-5 h-5 text-primary flex-shrink-0 mt-0.5" />
                    <div>
                      <p className="font-semibold text-foreground">Working Hours</p>
                      <p className="text-muted-foreground text-xs mt-0.5">
                        Sunday – Thursday: 08:00 – 15:00 (EAT)<br />
                        Friday – Saturday: Closed
                      </p>
                    </div>
                  </div>
                </CardContent>
              </Card>

              <Card className="bg-gradient-to-br from-[#1B5E20]/10 via-background to-[#CFA93F]/10 border-border/80">
                <CardContent className="p-5 space-y-2">
                  <h4 className="font-semibold text-sm">Government & Media Inquiries</h4>
                  <p className="text-xs text-muted-foreground leading-relaxed">
                    Official press releases and high-resolution ministerial media kits are available on demand for verified news outlets.
                  </p>
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
