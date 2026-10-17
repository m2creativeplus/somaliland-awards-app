# Somaliland Visual Assets Library & Brand Awards
## Production Platform — M2 Creative & Consulting

---

## Architecture Overview

| Layer | Technology | Purpose |
|---|---|---|
| Frontend | Next.js 14 (App Router) | SSR/SSG public pages |
| CMS | Payload CMS v2 | Visual admin panel, RBAC, content editing |
| Database | SQLite (via Payload/Prisma) | Local production DB |
| API | Next.js API Routes | REST endpoints for all features |
| Auth | Payload built-in (JWT) | Role-based access control |
| Media | Payload Upload | Media management system |
| Styling | Tailwind CSS (OKLCH brand tokens) | Design system |

---

## Roles

| Role | Can Do |
|---|---|
| `admin` | Full access: manage users, approve submissions, edit settings, view audit logs |
| `jury` | Score submissions, view all entries |
| `moderator` | Approve/reject submissions, manage media |
| `public` | View approved assets/submissions, vote, submit entries |

---

## Quick Start

```bash
# 1. Install dependencies
npm install --legacy-peer-deps

# 2. Set environment variables
cp .env.example .env.local

# 3. Initialize database
npx prisma db push

# 4. Start development server
npm run dev
```

Visit `http://localhost:3000` for the public site.  
Visit `http://localhost:3000/cms/admin` for the Payload CMS admin panel.

---

## Environment Variables

```env
# Required
PAYLOAD_SECRET=your-strong-secret-key-here

# Public app URL (for CORS)
NEXT_PUBLIC_APP_URL=http://localhost:3000

# Optional: Email notifications
SMTP_HOST=
SMTP_PORT=587
SMTP_USER=
SMTP_PASS=

# Optional: Analytics
NEXT_PUBLIC_GA_ID=
```

---

## API Reference

| Method | Endpoint | Auth | Description |
|---|---|---|---|
| GET | `/api/submissions` | Public | List approved submissions |
| POST | `/api/submissions` | Public | Create new submission |
| POST | `/api/vote` | Public | Cast a vote |
| GET | `/api/assets` | Public | List public assets |
| GET | `/api/settings` | Public | Get site configuration |
| GET | `/cms/api` | Admin token | Full Payload REST API |
| POST | `/cms/api/users/login` | — | Authenticate admin |

---

## CMS Admin Panel

Access the visual admin panel at `/cms/admin`.

**Collections:**
- `Users` — Manage staff with roles (admin, jury, moderator)
- `Submissions` — Review, score, approve/reject design entries
- `Assets` — Manage the visual library with full metadata
- `Media` — Upload SVG, PNG, PDF files with auto-thumbnail generation
- `Audit Logs` — Read-only log of all admin actions

**Globals (Site-wide Config):**
- `Site Settings` — Branding, competition dates, contact info, SEO defaults, notification settings

All content is fully editable without code changes.

---

## Deployment: Hostinger VPS

```bash
# 1. SSH into your VPS
ssh user@your-vps-ip

# 2. Clone the repository
git clone your-repo-url
cd somaliland-awards-app

# 3. Install Node.js 18+
nvm install 18 && nvm use 18

# 4. Install dependencies
npm install --legacy-peer-deps

# 5. Set environment variables
nano .env.local

# 6. Build the application
npm run build

# 7. Start with PM2
npm install -g pm2
pm2 start npm --name "sl-awards" -- start
pm2 save
pm2 startup

# 8. Configure Nginx reverse proxy
# Point your domain → localhost:3000
```

---

## Deployment: Vercel (Alternative)

```bash
# Install Vercel CLI
npm install -g vercel

# Deploy
vercel --prod

# Set environment variables in Vercel dashboard:
# PAYLOAD_SECRET, NEXT_PUBLIC_APP_URL
```

---

## Production Checklist

- [ ] Set strong `PAYLOAD_SECRET`
- [ ] Change default admin password
- [ ] Configure SMTP for email notifications
- [ ] Upload brand assets via CMS
- [ ] Set competition deadline and dates in Site Settings
- [ ] Configure Google Analytics ID
- [ ] Set domain in `NEXT_PUBLIC_APP_URL`
- [ ] Enable HTTPS on server
- [ ] Set up database backups (`/prisma/awards.db`)
- [ ] Review and test all RBAC roles

---

## Technology Choices & Rationale

**Why Payload CMS over WordPress?**
- API-first: all content accessible via REST and GraphQL
- Native TypeScript: no plugin conflicts
- Built-in auth with JWT: no WP plugin needed
- Runs inside Next.js: single deployment unit
- SQLite: zero external database cost for local/VPS hosting

**Why SQLite?**
- Zero-config, serverless
- Perfect for single-server VPS deployment
- Can migrate to PostgreSQL by changing the Payload adapter

---

*Prepared by: M2 Creative & Consulting — Hargeisa, Somaliland*  
*Platform Engineer: M2 AI Workforce*
