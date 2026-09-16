"use client"

import Link from "next/link"
import { usePathname } from "next/navigation"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Sheet, SheetContent, SheetHeader, SheetTitle, SheetTrigger } from "@/components/ui/sheet"
import { Search, Menu, Award } from "lucide-react"
import { useState } from "react"

const navigation = [
  { name: "Home", href: "/", name_so: "Guriga" },
  { name: "Library", href: "/library", name_so: "Maktabadda" },
  { name: "Submit", href: "/submit", name_so: "Gudbi" },
  { name: "Rankings", href: "/rankings", name_so: "Qiimeyn" },
  { name: "Vote", href: "/vote", name_so: "Codbixin" },
  { name: "Awards", href: "/awards", name_so: "Abaalmarinta" },
  { name: "About", href: "/about", name_so: "Nagu Saabsan" },
]

export function SiteHeader() {
  const pathname = usePathname()
  const [mobileOpen, setMobileOpen] = useState(false)

  return (
    <header className="sticky top-0 z-50 w-full">
      {/* Somaliland flag bar — 4px stripe green/white/red */}
      <div className="sl-flag-bar" />

      <div className="border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
        <div className="container flex h-16 items-center justify-between">
          {/* Logo */}
          <div className="flex items-center gap-6">
            <Link href="/" className="flex items-center gap-2.5 group">
              <div className="h-9 w-9 rounded-lg bg-gradient-to-br from-[#1B5E20] to-[#2E7D32] flex items-center justify-center shadow-sm group-hover:shadow-md transition-shadow">
                <Award className="h-5 w-5 text-white" />
              </div>
              <div className="hidden sm:block">
                <div className="font-heading text-sm leading-none text-foreground">Somaliland</div>
                <div className="text-[10px] text-muted-foreground leading-none mt-0.5 tracking-wide uppercase">Brand Awards</div>
              </div>
            </Link>

            {/* Desktop Nav */}
            <nav className="hidden lg:flex items-center gap-1">
              {navigation.map((item) => {
                const isActive = pathname === item.href
                return (
                  <Link
                    key={item.href}
                    href={item.href}
                    className={`px-3 py-1.5 rounded-md text-sm font-medium transition-colors ${
                      isActive
                        ? "bg-primary/10 text-primary"
                        : "text-muted-foreground hover:text-foreground hover:bg-muted"
                    }`}
                  >
                    {item.name}
                  </Link>
                )
              })}
            </nav>
          </div>

          {/* Right side */}
          <div className="flex items-center gap-3">
            <div className="hidden md:flex items-center gap-2">
              <div className="relative">
                <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-3.5 w-3.5 text-muted-foreground" />
                <Input placeholder="Search assets..." className="pl-9 w-56 h-9 text-sm" />
              </div>
            </div>

            <Button size="sm" className="hidden sm:inline-flex bg-[#1B5E20] hover:bg-[#2E7D32] text-white" asChild>
              <Link href="/admin">Admin</Link>
            </Button>

            {/* Mobile hamburger — uses Sheet (drawer), not overflow div */}
            <Sheet open={mobileOpen} onOpenChange={setMobileOpen}>
              <SheetTrigger asChild>
                <Button variant="ghost" size="sm" className="lg:hidden" aria-label="Open navigation menu">
                  <Menu className="h-5 w-5" />
                </Button>
              </SheetTrigger>
              <SheetContent side="right" className="w-72 p-0">
                <SheetHeader className="px-6 py-4 border-b">
                  <SheetTitle className="flex items-center gap-2 text-left">
                    <div className="h-7 w-7 rounded bg-[#1B5E20] flex items-center justify-center">
                      <Award className="h-4 w-4 text-white" />
                    </div>
                    Somaliland Brand Awards
                  </SheetTitle>
                </SheetHeader>
                <nav className="flex flex-col py-4">
                  {navigation.map((item) => {
                    const isActive = pathname === item.href
                    return (
                      <Link
                        key={item.href}
                        href={item.href}
                        onClick={() => setMobileOpen(false)}
                        className={`flex items-center gap-3 px-6 py-3 text-sm font-medium transition-colors ${
                          isActive
                            ? "bg-primary/10 text-primary border-r-2 border-primary"
                            : "text-muted-foreground hover:text-foreground hover:bg-muted"
                        }`}
                      >
                        {item.name}
                        <span className="text-xs text-muted-foreground/60 ml-auto">{item.name_so}</span>
                      </Link>
                    )
                  })}
                  <div className="px-6 pt-4 border-t mt-2">
                    <Button className="w-full bg-[#1B5E20] hover:bg-[#2E7D32] text-white" size="sm" asChild>
                      <Link href="/admin" onClick={() => setMobileOpen(false)}>Admin Panel</Link>
                    </Button>
                  </div>
                </nav>
              </SheetContent>
            </Sheet>
          </div>
        </div>
      </div>
    </header>
  )
}
