# Changelog

All notable changes to this project are documented in this file.

The format is based on [Keep a Changelog](https://keepachangelog.com/en/1.0.0/).

## [2.0.0] - 2026-10-26

### Added
- **Somaliland Weddings & Events Marketplace Suite**:
  - Full marketplace provider directory, verified storefronts, and category landing pages.
  - Multi-criteria search engine with budget sliders, municipality filters, and `<Suspense>` boundary integration.
  - Interactive package comparison table with deliverable matrices and real-time USD / SL Sh price calculations (~8,500 SL Sh / $1 USD).
  - Event planning workspace featuring real-time budget variance calculator, interactive milestone run sheets, and JSON/print export.
  - 15 downloadable business and event planning templates with instant client-side file generation.
  - Market intelligence dashboard displaying empirical metrics with explicit evidence confidence labels (`[VERIFIED]`, `[HIGH-CONFIDENCE ESTIMATE]`, `[LOW-CONFIDENCE ESTIMATE]`).
  - Customer workspace (`/account`, `/account/bookings`, `/account/inquiries`) with quotation versioning and binding acceptances.
  - Merchant operator portal (`/provider/dashboard`, `/provider/packages`) with lead management and quote generation.
  - Affiliate partner dashboard (`/affiliate/dashboard`) featuring custom referral links, click attribution tracking, and a 5% commission ledger.
- **Standalone Hostinger PHP & MySQL Distribution**:
  - Modular native PHP 8.2+ MVC framework located in `somaliland-weddings/`.
  - 13 relational MySQL database tables with foreign keys and indexes.
  - WordPress integration bridge plugin in `somaliland-weddings/wordpress-plugin/`.
- **Technical SEO & Canonical Identity**:
  - Machine-readable `m2-identity.json` root specification.
  - Dynamic XML sitemap generator (`app/sitemap.ts`) and static pre-rendered XML (`public/sitemap.xml`).
  - Crawler policy protocol (`app/robots.ts` and `public/robots.txt`).
  - Web application manifest (`public/site.webmanifest`) and AI discovery manifest (`public/llms.txt`).
  - XML market intelligence feed API (`/api/export/insights.xml`).
  - Canonical M2 attribution footer linking directly to `https://m2creative.site/`.

### Fixed
- Resolved Next.js CSR bailout error by wrapping `useSearchParams()` in a `<Suspense>` boundary on `/search`.
- Fixed mobile interactive touch targets to enforce a minimum of 44px (`min-h-[44px]`) satisfying WCAG 2.2 AA.
- Fixed unauthenticated access vulnerabilities via middleware redirection on `/admin/settings`.
