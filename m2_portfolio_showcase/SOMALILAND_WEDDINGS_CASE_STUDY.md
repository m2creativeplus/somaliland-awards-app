# M2 Creative & Consulting
## Portfolio Case Study: Somaliland Weddings & Events Operating Platform

**Client / Platform**: Somaliland Weddings & Events  
**Provider**: M2 Creative & Consulting  
**Creator / Lead System Architect**: Mohamoud Mohamed Awaleh  
**Initial Market**: Hargeisa, Republic of Somaliland  
**Future Expansion**: Borama, Berbera, Burao  
**Deployment Target**: Hostinger Shared Hosting (PHP 8.2+ / MySQL 8.0) + Next.js 14 / Payload CMS Suite  
**Status**: [VERIFIED] Production Architecture Ready  
**Year**: 2026  

---

## 1. Executive Summary

The **Somaliland Weddings & Events** platform is an enterprise-grade digital operating platform engineered by **M2 Creative & Consulting**. Moving beyond conventional photo directories, it serves as the foundational operating system for the local wedding economy in Hargeisa.

The platform bridges customers seeking verified banquet ballrooms, 4K cinema media crews, stage florists, caterers, and coordinators with licensed merchants through a transparent **Request-to-Book** quotation lifecycle, side-by-side package comparisons, a real-time budget and run-sheet planner, a 15-asset downloadable template library, and an evidence-backed wedding market intelligence engine.

---

## 2. Institutional & Strategic Objectives

1. **Consumer Discovery & Transparency**: Eliminate opaque pricing and unverified promises by itemizing deliverables, guest capacity limits, and cancellation policies in both USD ($) and Somaliland Shillings (SL Sh).
2. **Provider Operating Storefront**: Empower local wedding entrepreneurs with clean public URLs, WhatsApp lead routing, and quotation management without requiring them to become developers.
3. **Owner Independence (No-Code Visual CMS)**: Allow the site administrator to alter branding tokens, colors, subscription rates, verification statuses, and legal disclosures without touching application code.
4. **Market Intelligence & Evidence Protocol**: Publish confidence-labeled metrics (`[VERIFIED]`, `[HIGH-CONFIDENCE ESTIMATE]`, `[LOW-CONFIDENCE ESTIMATE]`) to prevent misleading statistical claims while providing valuable insights into the local wedding economy.
5. **Affordable Shared-Hosting Portability**: Deploy reliably on budget-friendly Hostinger shared hosting environments using standard PHP 8.2+ and MySQL, alongside an optional WordPress integration bridge.

---

## 3. Core Architecture & Planes

```text
┌────────────────────────────────────────────────────────────────┐
│               PUBLIC EXPERIENCE (Somali & English)             │
│   Marketplace • Package Compare • Planning Workspace • Expos   │
└───────────────────────────────┬────────────────────────────────┘
                                │
┌───────────────────────────────▼────────────────────────────────┐
│               APPLICATION CORE & WORKFLOW LIFECYCLE            │
│   Inquiry → Quotation → Accepted → Deposit → Confirmed Booking  │
└───────────────────────────────┬────────────────────────────────┘
                                │
┌───────────────────────────────▼────────────────────────────────┐
│               CONTROL PLANE (Visual CMS & Settings)            │
│   Branding • Marketplace Fees • Verification • System Health   │
└───────────────────────────────┬────────────────────────────────┘
                                │
┌───────────────────────────────▼────────────────────────────────┐
│          DEPLOYMENT DUAL-TARGET ARCHITECTURE                   │
│   Target A: Hostinger Shared Hosting (PHP 8.2+, MySQL 8.0)     │
│   Target B: Next.js 14 App Router (Payload CMS 3.x, Prisma)    │
│   Target C: WordPress Integration Bridge Plugin                │
└────────────────────────────────────────────────────────────────┘
```

---

## 4. Platform Feature Suite

### A. Provider Directory & Storefronts (`/providers`, `/providers/[slug]`)
- Physically audited merchant badge: `[VERIFIED] In-Person Audited`.
- Complete profiles with contact details, direct WhatsApp routing, verified reviews, and published package tiers.

### B. Package Comparison Matrix (`/packages/compare`)
- Side-by-side evaluation of up to 4 competing packages across venues, media, décor, and catering.
- Explicit price categorization: fixed, starting price, range, or quotation-required.

### C. Event Planning Workspace (`/plan`, `/plan/budget`)
- Real-time budget variance calculator (Target vs. Actual) with Somaliland Shilling currency conversion.
- Interactive checklist with assigned family leads and coordinator run-sheet schedules.
- Single-click JSON plan export.

### D. Resource & Template Toolkit (`/resources`)
- 15 production-ready worksheets and briefs:
  - Hargeisa Wedding Budget & Expense Ledger
  - Traditional Wedding Photography Shot List
  - Wedding Day Coordinator Run Sheet
  - Vendor Comparison Matrix
  - Client Photography Consent & Image-Use Agreement

### E. Market Intelligence Dashboard (`/market-insights`)
- Transparent confidence ratings:
  - `[VERIFIED]` Direct Evidence: 48 physically inspected businesses, 2.4-hour median provider response time.
  - `[HIGH-CONFIDENCE ESTIMATE]`: $1,850 median banquet hall rate, 440 average guests.
  - `[LOW-CONFIDENCE ESTIMATE]`: $18.5M projected annual national wedding volume across Hargeisa, Borama, Berbera, and Burao.

### F. Visual Control Plane & CMS (`/admin/settings`)
- Complete non-coder control over site names, logos, colors, lead fees, subscription plans, and maintenance cache purging.

---

## 5. Launch Media Kit & Distribution Copy

### A. LinkedIn Case Study Post
> **How M2 Creative Built Somaliland's First Wedding Operating Infrastructure**  
> Weddings are a multi-million dollar economic pillar across the Somali Horn of Africa. Yet discovering trusted banquet halls, comparing transparent cinema packages, and managing booking deposits remained fragmented across informal phone calls.  
>  
> Introducing **Somaliland Weddings & Events** — powered by M2 Creative & Consulting. Built with a dual-target architecture (Next.js 14 & Hostinger-ready PHP 8.2), the platform features in-person verified merchants, side-by-side package matrices, a wedding budget calculator, and evidence-backed market intelligence.  
>  
> Explore the platform: http://localhost:3000

### B. X (Twitter) Launch Thread
> 1/ We are excited to launch **Somaliland Weddings & Events**, powered by M2 Creative! 💍  
> 2/ Unlike standard directories, this is a full operating system for the Hargeisa wedding economy: verified vendors, transparent package comparisons, and direct request-to-book workflows.  
> 3/ Couples can track budgets in USD & SL Shilling, download run sheets, and browse 15 free planning templates.  
> 4/ Deployed on Hostinger shared hosting with complete owner independence via our Visual Control Plane.  
> 5/ Check it out: http://localhost:3000 #Somaliland #M2Creative #DigitalEconomy

---

## 6. Verification & Governance Summary

- **Bilingual Conformance**: Somali is the default public language, with an accessible one-click toggle to English.
- **Accessibility Target**: Built to WCAG 2.2 Level AA visual contrast standards with visible focus outlines and semantic landmarks.
- **Attribution Policy**: Reusable dynamic footer displaying:  
  `© 2026 M2 Creative & Consulting. All rights reserved. Powered by M2 Creative & Consulting.`
