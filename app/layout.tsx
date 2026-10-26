import type React from "react"
import type { Metadata, Viewport } from "next"
import { GeistSans } from "geist/font/sans"
import { GeistMono } from "geist/font/mono"
import { Analytics } from "@vercel/analytics/next"
import "./globals.css"
import { Toaster } from "@/components/ui/toaster"
import { ThemeProvider } from "@/components/theme-provider"

const siteUrl = process.env.NEXT_PUBLIC_SITE_URL || "https://weddings.m2creative.sl"

export const viewport: Viewport = {
  themeColor: "#0f172a",
  width: "device-width",
  initialScale: 1,
  maximumScale: 5,
}

export const metadata: Metadata = {
  metadataBase: new URL(siteUrl),
  title: {
    default: "Somaliland Weddings & Events — Premier Marketplace & Operating Platform",
    template: "%s | Somaliland Weddings & Events",
  },
  description:
    "The premier verified wedding marketplace and event operating platform in the Republic of Somaliland. Discover physically audited venues, 4K cinematographers, stage designers, and banquet caterers across Hargeisa, Borama, Berbera, and Burao. Powered by M2 Creative & Consulting.",
  applicationName: "Somaliland Weddings & Events",
  authors: [{ name: "M2 Creative & Consulting", url: "https://m2creative.site/" }],
  creator: "Mahmoud Mohamed Awaleh",
  publisher: "M2 Creative & Consulting",
  alternates: {
    canonical: "/",
    languages: {
      "so-SO": "/",
      "en-US": "/",
    },
  },
  openGraph: {
    title: "Somaliland Weddings & Events — Powered by M2 Creative",
    description:
      "Discover physically audited banquet ballrooms, 4K cinematographers, and luxury bridal services across Hargeisa, Republic of Somaliland.",
    url: siteUrl,
    siteName: "Somaliland Weddings & Events",
    locale: "so_SO",
    type: "website",
    images: [
      {
        url: "/somaliland-flag-with-green-white-red-stripes-and-s.jpg",
        width: 1200,
        height: 630,
        alt: "Somaliland Weddings & Events Official Cover",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "Somaliland Weddings & Events — Powered by M2 Creative",
    description:
      "The premier wedding marketplace & verified event operating platform in the Republic of Somaliland.",
    creator: "@m2creative",
    images: ["/somaliland-flag-with-green-white-red-stripes-and-s.jpg"],
  },
  icons: {
    icon: [
      { url: "/icon.svg", type: "image/svg+xml" },
      { url: "/icon-light-32x32.png", sizes: "32x32", type: "image/png" },
    ],
    apple: [{ url: "/apple-icon.png", sizes: "180x180", type: "image/png" }],
  },
  manifest: "/site.webmanifest",
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      "max-video-preview": -1,
      "max-image-preview": "large",
      "max-snippet": -1,
    },
  },
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  const jsonLd = {
    "@context": "https://schema.org",
    "@graph": [
      {
        "@type": "Organization",
        "@id": `${siteUrl}/#organization`,
        "name": "M2 Creative & Consulting",
        "url": "https://m2creative.site/",
        "logo": `${siteUrl}/icon.svg`,
        "founder": {
          "@type": "Person",
          "name": "Mahmoud Mohamed Awaleh",
          "url": "https://m2awaleh.vercel.app/",
        },
        "sameAs": [
          "https://twitter.com/m2creative",
          "https://linkedin.com/in/mahmoudawaleh",
        ],
      },
      {
        "@type": "WebSite",
        "@id": `${siteUrl}/#website`,
        "url": siteUrl,
        "name": "Somaliland Weddings & Events",
        "description": "The premier wedding marketplace and event operating platform in the Republic of Somaliland.",
        "publisher": {
          "@id": `${siteUrl}/#organization`,
        },
        "inLanguage": ["so", "en"],
        "potentialAction": {
          "@type": "SearchAction",
          "target": `${siteUrl}/search?q={search_term_string}`,
          "query-input": "required name=search_term_string",
        },
      },
    ],
  }

  return (
    <html lang="so" suppressHydrationWarning>
      <head>
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
        />
      </head>
      <body className={`font-sans antialiased ${GeistSans.variable} ${GeistMono.variable}`}>
        <ThemeProvider attribute="class" defaultTheme="light" enableSystem disableTransitionOnChange>
          {children}
          <Toaster />
          <Analytics />
        </ThemeProvider>
      </body>
    </html>
  )
}
