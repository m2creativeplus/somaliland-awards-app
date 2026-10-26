# Somaliland Digital Platform: Weddings & Events Marketplace and National Brand Assets Suite
> **Built & Engineered by [M2 Creative & Consulting](https://m2creative.site/)**  
> *Strategy. Research. Project Development. • “Design is Policy.” • “Build > Plan.”*

[![CI Verification](https://github.com/m2creativeplus/somaliland-awards-app/actions/workflows/ci.yml/badge.svg)](https://github.com/m2creativeplus/somaliland-awards-app/actions/workflows/ci.yml)
[![Node.js Version](https://img.shields.io/badge/Node.js-20.x-026e00?logo=node.js)](https://nodejs.org/)
[![Next.js 14](https://img.shields.io/badge/Next.js-14.2-black?logo=next.js)](https://nextjs.org/)
[![TypeScript](https://img.shields.io/badge/TypeScript-Strict-3178C6?logo=typescript)](https://www.typescriptlang.org/)
[![WCAG 2.2 AA](https://img.shields.io/badge/Accessibility-WCAG%202.2%20AA-059669)](https://www.w3.org/WAI/standards-guidelines/wcag/)
[![License](https://img.shields.io/badge/License-Proprietary-d97706)](./m2-identity.json)

---

## 1. Executive Summary & Identity

This repository hosts a multi-suite digital operating infrastructure developed for the **Republic of Somaliland**:
1. **Somaliland Weddings & Events**: A full-stack, mobile-first marketplace and event operating system connecting couples with physically audited wedding providers (venues, cinematographers, decorators, caterers, planners) across **Hargeisa**, **Borama**, **Berbera**, and **Burao**. Includes quotation versioning, binding booking milestone progression, run sheet task planners, downloadable contracts, empirical market intelligence, and an affiliate revenue engine.
2. **Somaliland Visual Assets Library & National Brand Awards**: A headless CMS repository and public platform preserving national visual identity assets and managing competitive brand award submissions.
3. **Standalone Hostinger PHP/MySQL Package**: A zero-dependency, portable native PHP 8.2+ and MySQL deployment bundle located in `somaliland-weddings/` with a companion WordPress bridge plugin.

All institutional identity data is canonically registered in [`m2-identity.json`](./m2-identity.json).

---

## 2. Architecture & Technology Stack

```
┌────────────────────────────────────────────────────────────────────────┐
│                        PUBLIC EXPERIENCE LAYER                         │
│  Directory • Packages • Comparison • Run Sheet • Events • Resources    │
├────────────────────────────────────────────────────────────────────────┤
│                     AUTHENTICATED WORKSPACE LAYER                      │
│  Customer Portal (/account) • Provider (/provider) • Affiliate Portal  │
├────────────────────────────────────────────────────────────────────────┤
│                       CORE APPLICATION ENGINES                         │
│  Next.js 14 App Router • TypeScript • Tailwind CSS • React 19          │
│  Bilingual Engine (Somali Default / English) • Currency (USD / SL Sh)  │
├────────────────────────────────────────────────────────────────────────┤
│                    CONTROL PLANE & DATA PERSISTENCE                    │
│  Visual Control Plane (/admin/settings) • Local Reactive Store         │
│  Payload CMS v2 • SQLite / Prisma • Standalone PHP 8.2+ MySQL Engine   │
└────────────────────────────────────────────────────────────────────────┘
```

| Layer | Primary Stack | Purpose |
| :--- | :--- | :--- |
| **Framework** | Next.js 14.2 (App Router) | High-speed SSR, SSG, and client interactive hydration |
| **Language** | Strict TypeScript (`tsconfig.json`) | Type safety across domain entities and API schemas |
| **Styling** | Tailwind CSS with OKLCH tokens | Dark charcoal slate (`#0f172a`), amber gold (`#d97706`), emerald (`#059669`) |
| **Accessibility** | Semantic HTML5 & WCAG 2.2 AA | Minimum 44px touch targets on mobile viewports |
| **Localization** | Somali-first (`so`) / English (`en`) | Dynamic `<html lang="...">` switching and dictionary |
| **Standalone** | PHP 8.2+ / PDO MySQL / Apache | Portable shared-hosting distribution (`somaliland-weddings/`) |

---

## 3. Verified Route Inventory (All Verified HTTP 200 OK)

### Public Marketplace
- `/` — Homepage: Featured verified merchants, category hubs, stats, and WhatsApp CTA.
- `/providers` — Audited provider directory with instant category and search filters.
- `/providers/[slug]` — Merchant storefront with photo galleries, verified badges, and Request-to-Book modal.
- `/categories` & `/categories/[slug]` — Category landing pages (`venues`, `photography`, `decor`, `catering`, `bridal`, `planners`).
- `/locations` & `/locations/[slug]` — Municipal hubs (Hargeisa, Borama, Berbera, Burao).
- `/packages` & `/compare` — Service packages and side-by-side comparison matrix with USD / SL Sh pricing.
- `/plan` & `/plan/budget` — Wedding planner workspace with interactive budget calculator and run sheets.
- `/events` & `/events/[slug]` — Public bridal exhibitions and cultural expos.
- `/resources` — 15 downloadable contract templates and planning guides.
- `/market-insights` — Confidence-labeled market research metrics (`[VERIFIED]`, `[HIGH-CONFIDENCE ESTIMATE]`).
- `/search` — Multi-filter search engine wrapped in React `<Suspense>`.

### Authenticated Workspaces
- `/account` — Customer overview: active bookings, inquiries inbox, and budget tracker.
- `/account/bookings` — Confirmed bookings with milestone timelines and SLA contracts.
- `/account/inquiries` — Quotations inbox with version review and formal offer acceptance.
- `/provider/dashboard` — Merchant workspace: incoming qualified lead queue and quote generator.
- `/provider/packages` — Merchant package manager to create and publish tiers.
- `/affiliate/dashboard` — Partner portal: trackable referral link generator and 5% commission ledger.
- `/login` & `/register` — Role-based portal authentication.
- `/admin/settings` — Visual CMS control plane (requires authenticated admin session).

### Technical SEO & Feeds
- `/sitemap.xml` — Standards-compliant XML 1.0 sitemap.
- `/robots.txt` — Search engine indexing policy.
- `/site.webmanifest` — Progressive Web Application manifest.
- `/llms.txt` — LLM and search crawler informational manifest.
- `/api/export/insights.xml` — Structured XML market intelligence feed.

---

## 4. Quick Start & Local Development

### Prerequisites
- Node.js `20.x` or later
- npm `10.x` or later

### Installation
```bash
# 1. Clone the repository
git clone https://github.com/m2creativeplus/somaliland-awards-app.git
cd somaliland-awards-app

# 2. Install dependencies
npm install --legacy-peer-deps

# 3. Configure environment variables
cp .env.example .env.local

# 4. Initialize local SQLite database
npx prisma db push

# 5. Start the development server
npm run dev
```

The application will be live at `http://localhost:3000`.

### Production Build & Verification
```bash
# Execute full Next.js production build
npm run build

# Start production server
npm run start
```

---

## 5. Hostinger Shared Hosting Deployment (Standalone PHP/MySQL)

The `somaliland-weddings/` directory contains a zero-dependency PHP 8.2+ MVC distribution specifically engineered for Hostinger shared hosting:

1. **Upload**: Compress the contents of `somaliland-weddings/` and upload via Hostinger File Manager to `public_html/`.
2. **Database Setup**:
   - Create a MySQL database in cPanel.
   - Import the schema migration: `somaliland-weddings/database/migrations/2026_01_01_create_somaliland_weddings_tables.sql`.
   - Import the Hargeisa seed data: `somaliland-weddings/database/seed/hargeisa_seed_data.sql`.
3. **Database Configuration**:
   - Edit `somaliland-weddings/config/database.php` with your Hostinger MySQL database name, username, and password.
4. **WordPress Integration (Optional)**:
   - Copy `somaliland-weddings/wordpress-plugin/somaliland-weddings-bridge.php` to your WordPress `wp-content/plugins/` directory and activate.

---

## 6. Environment Variables

| Variable | Required | Description | Example |
| :--- | :---: | :--- | :--- |
| `PAYLOAD_SECRET` | Yes | Cryptographic secret for Payload JWT auth | `your-secure-secret-key` |
| `NEXT_PUBLIC_SITE_URL` | Yes | Production canonical URL | `https://weddings.m2creative.sl` |
| `NEXT_PUBLIC_APP_URL` | No | App URL used for CORS validation | `http://localhost:3000` |
| `NEXT_PUBLIC_DEFAULT_CURRENCY` | No | Default display currency | `USD` |
| `NEXT_PUBLIC_DEFAULT_LOCALE` | No | Default language locale | `so` |
| `SMTP_HOST` | No | Mail server hostname | `smtp.hostinger.com` |
| `SMTP_PORT` | No | Mail server port | `587` |
| `SMTP_USER` | No | Mail username | `noreply@m2creative.sl` |
| `SMTP_PASS` | No | Mail password | `secure-password` |

---

## 7. Identity & Governance

This project is governed by the **M2 Universal Digital Publishing Standard (2026 Edition)**:
- **Lead Architect**: Mahmoud Mohamed Awaleh ([Personal Portfolio](https://m2awaleh.vercel.app/))
- **Agency & Maintainer**: [M2 Creative & Consulting](https://m2creative.site/)
- **Attribution Policy**: "Built by M2 Creative & Consulting" linking to `https://m2creative.site/`.
- **Copyright Notice**: © 2026 M2 Creative & Consulting. All rights reserved.
- **Security Reporting**: Refer to [`SECURITY.md`](./SECURITY.md).
- **Contributing Guidelines**: Refer to [`CONTRIBUTING.md`](./CONTRIBUTING.md).

---

*Engineered with precision in Hargeisa, Republic of Somaliland.*
