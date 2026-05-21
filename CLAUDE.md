# SightMap Demo + Pricing — Project Context

## What This Is

A standalone Next.js 15 prototype demonstrating SightMap's self-service GTM motion.
Two-page marketing site: a demo/landing page and a pricing page. **Day 1 prototype — zero backend integrations.** No Stripe, no Calendly, no HubSpot, no database, no API routes.

SightMap (by Engrain) is an interactive 2D/3D property map embedded on apartment community websites. It replaces static PDF site plans with live availability, real-time pricing, and turn-by-turn navigation.

## Tech Stack

| Layer | Choice |
|---|---|
| Framework | Next.js 15 App Router |
| Language | TypeScript (strict) |
| Styling | Tailwind CSS + CSS custom properties |
| Components | shadcn/ui (already initialized) |
| Animation | Framer Motion 11 |
| Font | Inter via `next/font/google` |
| Deployment | Vercel |

## Routes

| Route | File | Description |
|---|---|---|
| `/` | `app/page.tsx` | Demo/landing page |
| `/pricing` | `app/pricing/page.tsx` | Pricing page |
| `/confirm/[tier]` | `app/confirm/[tier]/page.tsx` | Confirmation screen |

## File Structure

```
sightmap-demo/
├── app/
│   ├── layout.tsx                    # Root layout: Inter font, metadata
│   ├── globals.css                   # Brand tokens, Tailwind base, keyframe animations
│   ├── page.tsx                      # Demo/landing page
│   ├── pricing/page.tsx              # Pricing page
│   └── confirm/[tier]/page.tsx       # Confirmation screen
├── components/
│   ├── nav.tsx                       # Shared nav
│   ├── logo.tsx                      # SVG logo (dark + light variants)
│   ├── demo/
│   │   ├── hero.tsx                  # Dark hero + animated SVG floor plan
│   │   ├── feature-reveal.tsx        # Scroll-triggered feature section
│   │   ├── floor-plan-sim.tsx        # Clickable SVG floor plan + popover
│   │   ├── social-proof.tsx          # Social proof text bar
│   │   └── cta-band.tsx              # Bottom dark CTA band
│   └── pricing/
│       ├── pricing-matrix.tsx        # 4-column pricing table
│       ├── sales-modal.tsx           # shadcn Dialog with calendar placeholder
│       ├── trust-strip.tsx           # Trust signals
│       └── faq-accordion.tsx         # shadcn Accordion FAQ
├── lib/
│   └── pricing.ts                    # Tier data: slugs, names, prices
└── docs/
    └── superpowers/
        ├── specs/2026-05-20-sightmap-demo-pricing-design.md
        └── plans/2026-05-20-sightmap-demo-pricing.md
```

## Brand Design Tokens

```css
--brand-blue:        #2563EB   /* Primary CTAs, brand emphasis */
--brand-blue-hover:  #1D4FCC   /* Hover state */
--brand-black:       #111418   /* Headlines, logo wordmark */
--brand-white:       #FFFFFF   /* Page background */
--surface-dark:      #0A1A2E   /* Hero section, dark bands */
--text-primary:      #111418
--text-body:         #1F2937
--border-default:    #E5E7EB
--radius-button:     6px
--font-family:       'Inter', -apple-system, system-ui, sans-serif
```

Tailwind extensions: `bg-brand-blue`, `text-brand-black`, `bg-surface-dark`, `text-text-body`, `border-border-default`.

## Design Conventions

- **Headlines**: verb-first, terminal period, 600–700 weight, tight tracking
- **Buttons**: sentence case ("Get Started", "Explore pricing"), `6px` radius, NOT fully rounded
- **CTAs**: primary = brand blue fill + white text; secondary = white fill + brand blue text + blue border
- **Nav**: logo-left → vertical divider → center links → right CTA
- **Sections**: small-caps eyebrow text above content blocks
- **Dark surfaces**: `#0A1A2E` background with white/70 body text

## Pricing Tiers

```typescript
// From lib/pricing.ts
{ slug: 'essential',  displayName: 'Essential',  units: '≤100',    monthlyPrice: 29,  setupFee: 175 }
{ slug: 'growth',     displayName: 'Growth',     units: '101–200', monthlyPrice: 49,  setupFee: 275 }
{ slug: 'scale',      displayName: 'Scale',       units: '201–500', monthlyPrice: 79,  setupFee: 375 }
{ slug: 'enterprise', displayName: 'Enterprise',  units: '501+',    monthlyPrice: 99,  setupFee: 475 }
```

## CTA Behavior (Prototype)

- **"Get Started"** on any tier → navigates to `/confirm/[tier-slug]`
- **"Need to speak with a sales rep?"** → opens `SalesModal` (shadcn Dialog, non-functional calendar)
- **"Book a time"** in modal → closes modal (non-functional)
- Confirmation page: displays tier name + price summary, "Back to pricing" link

## Hard Rules

1. **No integrations** — no API calls, no form submissions, no external embeds
2. **No new routes or pages** beyond the three defined above
3. **No new dependencies** beyond what's already installed (next, tailwind, shadcn, framer-motion)
4. Follow the file structure exactly — don't create new files outside the plan
5. All components are Client Components (`'use client'`) if they use state or Framer Motion
6. Server Components are fine for static pages like `/pricing/page.tsx` and `/confirm/[tier]/page.tsx`

## Development Commands

```bash
npm run dev      # Start dev server at http://localhost:3000
npm run build    # Production build
npm run lint     # ESLint
npx tsc --noEmit # TypeScript check
```

## Status — SHIPPED ✓

**As of 2026-05-21 — All tasks complete. Prototype is live.**

**Live URL:** https://sightmap-demo-blush.vercel.app

All routes:
- `/` — dark hero, animated floor plan, feature reveals, interactive floor plan sim, CTA band
- `/pricing` — 4-column pricing matrix, trust strip, FAQ accordion, sales modal
- `/confirm/[tier]` — plan summary (essential / growth / scale / enterprise → 200; invalid → 404)

TypeScript clean, lint clean, production build clean. Dev server: `npm run dev`.

Full plan: `docs/superpowers/plans/2026-05-20-sightmap-demo-pricing.md`
Full spec: `docs/superpowers/specs/2026-05-20-sightmap-demo-pricing-design.md`
