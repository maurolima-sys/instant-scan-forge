# QR Pro — QR Code Generation Micro-SaaS

> A functional prototype of a complete SaaS architecture: authentication, Stripe billing, multi-tenant RLS, and plan-based feature gating. Built with AI-assisted programming to validate the end-to-end cycle of a subscription product.

🔗 **Demo:** [instant-scan-forge.lovable.app](https://instant-scan-forge.lovable.app)

---

## About the Project

**QR Pro** is a personal project aimed at exercising the end-to-end architecture of a real micro-SaaS. While the visible surface is a QR code generator, the core focus is on the backend infrastructure: authentication, data isolation per user via Row Level Security (RLS), subscription tiers with feature gating, and Stripe integration for checkout.

I built this project to practice the same multi-tenancy, RLS, and billing patterns I apply in the **Monitore System** (my main product), but within a smaller, controlled scope.

This repository is an **architectural prototype**, not a market-validated product.

## Key Features

### Product Layer (Generator)
- Real-time QR code generation with debounce.
- Customization: size, margin, colors, error correction level (L/M/Q/H).
- Export to PNG and SVG, direct copy to clipboard.
- Local persistence of user preferences.

### SaaS Layer (Core Focus)
- **Auth:** Email/password + Google OAuth.
- **Multi-tenant with RLS:** Each user only sees their own QR codes and scans, enforced at the database level via Row Level Security policies.
- **Feature Gating by Plan:** Resources like dynamic QR codes, analytics, and custom logos are gated by tier.
- **Billing:** Stripe integration for Pro and Business plan checkouts.
- **Authenticated Dashboard:** QR code history, scan counts, and dynamic link management.

## Pricing Model

| Plan | Price | Scope |
|-------|-------|--------|
| Free | £0/month | Personal use — Static QRs, PNG/SVG |
| Pro | £29/month | Dynamic QRs, Logo, Basic Analytics, History |
| Business | £79/month | Advanced Analytics, API, Batch Generation |

## Technical Stack

- **Frontend:** React 18 + Vite 5 + TypeScript 5
- **UI:** Tailwind CSS + shadcn/ui
- **Backend:** Supabase (Auth, Postgres, Edge Functions, RLS)
- **Payments:** Stripe
- **Authentication:** Email/password + Google OAuth
- **QR Engine:** `qrcode` library

## Data Model (Summary)

- `qr_codes` — QR codes per user, including `is_dynamic`, `short_code`, `scan_count`, with RLS enforced by `user_id`.
- `qr_scans` — Scan events associated with a `qr_code_id`, restricted to the owner via RLS.

## Getting Started

Prerequisites: **Node.js** and **npm**.

```sh
git clone https://github.com/maurolima-sys/instant-scan-forge.git
cd instant-scan-forge
npm install
npm run dev
```

The app will be available at `http://localhost:8080`.


## Environment Variables

Configure these variables in your local `.env` file and in your deployment provider before running the app:

| Variable | Required | Description |
|----------|----------|-------------|
| `VITE_SUPABASE_URL` | Optional | Supabase project URL used by the browser client; defaults to this project URL when omitted. |
| `VITE_SUPABASE_PUBLISHABLE_KEY` | Required for auth | Supabase publishable client key used by the browser client. |
| `VITE_SUPABASE_ANON_KEY` | Optional | Backwards-compatible alias used only when `VITE_SUPABASE_PUBLISHABLE_KEY` is not set. |

The app defaults the Supabase URL from the checked-in project ID when `VITE_SUPABASE_URL` is not present. If both supported key variables are missing, the public QR generator still loads while authentication actions return a clear configuration error until the deployment environment is fixed.

## Project Structure

```
src/
├── components/     # QRGenerator + UI components (shadcn)
├── pages/          # Landing, Auth, Dashboard, Index
├── hooks/          # useAuth, useDebounce
├── integrations/   # Backend client (Supabase)
└── index.css       # Design system
```

## Transparency Notes

- Built with **AI-assisted programming** — the goal was to validate architecture and iterate quickly.
- This is a portfolio prototype; there are no real users or revenue associated with this specific repository.

---

© 2026 QR Pro — Portfolio Project by Mauro Frank Lima.
