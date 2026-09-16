import Link from "next/link"
import { Award } from "lucide-react"

const currentYear = new Date().getFullYear()

export function SiteFooter() {
  return (
    <footer className="border-t bg-[#0f1f0f] text-white/80">
      {/* Somaliland flag bar at top of footer */}
      <div className="sl-flag-bar" />

      <div className="container py-12">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          {/* Brand */}
          <div className="md:col-span-1 space-y-4">
            <div className="flex items-center gap-2.5">
              <div className="h-8 w-8 rounded-lg bg-gradient-to-br from-[#1B5E20] to-[#2E7D32] flex items-center justify-center shadow-sm">
                <Award className="h-4 w-4 text-white" />
              </div>
              <div>
                <div className="font-heading text-sm text-white leading-none">Somaliland</div>
                <div className="text-[10px] text-white/50 leading-none mt-0.5 tracking-wide uppercase">Brand Awards</div>
              </div>
            </div>
            <p className="text-sm text-white/50 leading-relaxed">
              Official repository of the Republic of Somaliland's visual assets and national brand awards platform.
            </p>
            <div className="text-xs text-white/30 font-medium uppercase tracking-wider">
              Hargeisa · Republic of Somaliland
            </div>
          </div>

          {/* Platform */}
          <div className="space-y-4">
            <h4 className="font-semibold text-white text-sm uppercase tracking-wide">Platform</h4>
            <ul className="space-y-2 text-sm">
              {[
                { label: "Asset Library", href: "/library" },
                { label: "Submit a Design", href: "/submit" },
                { label: "Vote", href: "/vote" },
                { label: "Rankings", href: "/rankings" },
                { label: "Awards", href: "/awards" },
              ].map((link) => (
                <li key={link.href}>
                  <Link href={link.href} className="text-white/50 hover:text-[#CFA93F] transition-colors">
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Resources */}
          <div className="space-y-4">
            <h4 className="font-semibold text-white text-sm uppercase tracking-wide">Resources</h4>
            <ul className="space-y-2 text-sm">
              {[
                { label: "Brand Guidelines", href: "/guidelines" },
                { label: "Help Center", href: "/help" },
                { label: "About the Awards", href: "/about" },
                { label: "Jury Panel", href: "/jury" },
              ].map((link) => (
                <li key={link.href}>
                  <Link href={link.href} className="text-white/50 hover:text-[#CFA93F] transition-colors">
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Legal / Government */}
          <div className="space-y-4">
            <h4 className="font-semibold text-white text-sm uppercase tracking-wide">Government</h4>
            <ul className="space-y-2 text-sm">
              {[
                { label: "About SNPA", href: "/about" },
                { label: "Contact", href: "/contact" },
                { label: "Privacy Policy", href: "/privacy" },
                { label: "Terms of Use", href: "/terms" },
              ].map((link) => (
                <li key={link.href}>
                  <Link href={link.href} className="text-white/50 hover:text-[#CFA93F] transition-colors">
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>
        </div>

        <div className="mt-10 pt-8 border-t border-white/10 flex flex-col md:flex-row items-center justify-between gap-4 text-xs text-white/30">
          <p>© {currentYear} Somaliland National Planning Authority. All rights reserved.</p>
          <p className="text-white/20">Republic of Somaliland — Est. 1991</p>
        </div>
      </div>
    </footer>
  )
}
