import { SiteHeader } from "@/components/site-header"
import { SiteFooter } from "@/components/site-footer"
import { Badge } from "@/components/ui/badge"

export default function AboutPage() {
  return (
    <div className="min-h-screen flex flex-col">
      <SiteHeader />

      <main className="flex-1 py-12">
        <div className="container max-w-4xl">
          <div className="space-y-8">
            <div className="text-center space-y-4">
              <Badge variant="secondary">About Us</Badge>
              <h1 className="text-4xl font-bold">Preserving Heritage, Inspiring Innovation</h1>
              <p className="text-xl text-muted-foreground">
                The Somaliland Visual Assets Library is a digital initiative by the Ministry of Information and National
                Guidance to standardize, preserve, and promote our national identity.
              </p>
            </div>

            <div className="grid md:grid-cols-2 gap-12 py-12">
              <div className="space-y-4">
                <h2 className="text-2xl font-bold">Our Mission</h2>
                <p className="text-muted-foreground leading-relaxed">
                  Our mission is to create a centralized, accessible repository of high-quality visual assets that
                  represent Somaliland's rich culture and sovereign identity. We aim to empower government agencies,
                  businesses, and designers with the tools they need to communicate consistently and professionally.
                </p>
              </div>
              <div className="space-y-4">
                <h2 className="text-2xl font-bold">The Awards</h2>
                <p className="text-muted-foreground leading-relaxed">
                  The Somaliland Brand Awards celebrate the creativity of our local and diaspora talent. By recognizing
                  excellence in design, we encourage a new generation of artists to contribute to our nation's visual
                  narrative.
                </p>
              </div>
            </div>

            <div className="bg-muted p-8 rounded-xl">
              <h2 className="text-2xl font-bold mb-4">Contact Us</h2>
              <div className="grid md:grid-cols-2 gap-8">
                <div>
                  <h3 className="font-semibold mb-2">General Inquiries</h3>
                  <p className="text-muted-foreground">info@somalilandassets.gov.sl</p>
                  <p className="text-muted-foreground">+252 63 4000000</p>
                </div>
                <div>
                  <h3 className="font-semibold mb-2">Location</h3>
                  <p className="text-muted-foreground">Ministry of Information HQ</p>
                  <p className="text-muted-foreground">Hargeisa, Somaliland</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </main>

      <SiteFooter />
    </div>
  )
}
