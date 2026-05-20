# SightMap Demo + Pricing Site Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Build a two-page Next.js 15 prototype demonstrating SightMap's self-service GTM motion: a demo/landing page and a pricing page, deployable to Vercel with no backend integrations.

**Architecture:** Three routes (`/`, `/pricing`, `/confirm/[tier]`) with a shared Nav. All interactivity is client-side only — no API routes, no database. Components organized by page context (`components/demo/`, `components/pricing/`) with shared tier data in `lib/pricing.ts`.

**Tech Stack:** Next.js 15 (App Router), TypeScript, Tailwind CSS v4, shadcn/ui (Accordion + Dialog), Framer Motion 11, Inter font via `next/font/google`.

---

## File Map

```
sightmap-demo/
├── app/
│   ├── layout.tsx                    # Root layout: Inter font, CSS vars, metadata
│   ├── globals.css                   # Brand tokens, Tailwind base, keyframe animations
│   ├── page.tsx                      # Demo/landing page (/)
│   ├── pricing/
│   │   └── page.tsx                  # Pricing page (/pricing)
│   └── confirm/
│       └── [tier]/
│           └── page.tsx              # Confirmation screen (/confirm/[tier])
├── components/
│   ├── nav.tsx                       # Shared nav (logo-left, links-center, CTA-right)
│   ├── logo.tsx                      # SVG logo component (dark + light variants)
│   ├── demo/
│   │   ├── hero.tsx                  # Dark hero + animated SVG floor plan
│   │   ├── feature-reveal.tsx        # Single scroll-triggered feature section
│   │   ├── floor-plan-sim.tsx        # Clickable SVG floor plan with popover
│   │   ├── social-proof.tsx          # Social proof text bar
│   │   └── cta-band.tsx              # Bottom dark CTA band
│   └── pricing/
│       ├── pricing-matrix.tsx        # 4-column pricing table
│       ├── sales-modal.tsx           # shadcn Dialog with calendar placeholder
│       ├── trust-strip.tsx           # Trust signal row
│       └── faq-accordion.tsx         # shadcn Accordion FAQ
├── lib/
│   └── pricing.ts                    # Tier data: slugs, names, prices
├── tailwind.config.ts                # Brand color extensions
├── next.config.ts
└── package.json
```

---

## Task 1: Scaffold the Next.js project

**Files:**
- Create: `package.json`, `next.config.ts`, `tsconfig.json`, `tailwind.config.ts`, `app/globals.css`, `app/layout.tsx`

- [ ] **Step 1: Scaffold inside the existing directory**

```bash
cd ~/sightmap-demo
npx create-next-app@latest . --typescript --tailwind --eslint --app --no-src-dir --import-alias="@/*" --yes
```

Expected: Next.js 15 project created. You'll see files like `app/`, `package.json`, `next.config.ts`, `tailwind.config.ts` added to the directory. The existing `docs/` folder is preserved.

- [ ] **Step 2: Install Framer Motion**

```bash
npm install framer-motion
```

Expected: `framer-motion` appears in `package.json` dependencies.

- [ ] **Step 3: Initialize shadcn/ui**

```bash
npx shadcn@latest init --defaults
```

When prompted, accept defaults. This adds `components/ui/`, updates `globals.css`, and adds `tailwind.config.ts` extensions.

- [ ] **Step 4: Add shadcn Accordion and Dialog components**

```bash
npx shadcn@latest add accordion dialog
```

Expected: `components/ui/accordion.tsx` and `components/ui/dialog.tsx` created.

- [ ] **Step 5: Verify dev server starts**

```bash
npm run dev
```

Expected: Server starts on `http://localhost:3000`. Default Next.js page renders. Kill with Ctrl+C.

- [ ] **Step 6: Commit**

```bash
git add -A
git commit -m "feat: scaffold Next.js 15 with shadcn and framer-motion"
```

---

## Task 2: Brand tokens and global styles

**Files:**
- Modify: `app/globals.css`
- Modify: `tailwind.config.ts`
- Modify: `app/layout.tsx`

- [ ] **Step 1: Replace `app/globals.css` with brand tokens + animations**

```css
@tailwind base;
@tailwind components;
@tailwind utilities;

@layer base {
  :root {
    --brand-blue: #2563EB;
    --brand-blue-hover: #1D4FCC;
    --brand-black: #111418;
    --brand-white: #FFFFFF;
    --surface-dark: #0A1A2E;
    --text-primary: #111418;
    --text-body: #1F2937;
    --border-default: #E5E7EB;
    --radius-button: 6px;
  }

  * {
    border-color: var(--border-default);
  }

  body {
    color: var(--text-primary);
    background: var(--brand-white);
    font-family: 'Inter', -apple-system, system-ui, sans-serif;
    -webkit-font-smoothing: antialiased;
  }
}

@keyframes unit-pulse {
  0%, 100% { opacity: 0.45; }
  50% { opacity: 1; }
}

.unit-available {
  animation: unit-pulse 3s ease-in-out infinite;
}
```

> **Note:** If `create-next-app` generated Tailwind v4 syntax (`@import "tailwindcss"`), keep that import and add the `@layer base` block below it. Tailwind v4 uses `@theme` instead of `tailwind.config.ts` — move color tokens to `@theme { --color-brand-blue: #2563EB; ... }` and the config file approach won't be needed.

- [ ] **Step 2: Extend Tailwind config with brand colors**

Open `tailwind.config.ts` and replace the `theme.extend` block:

```typescript
import type { Config } from 'tailwindcss'

const config: Config = {
  darkMode: ['class'],
  content: [
    './pages/**/*.{ts,tsx}',
    './components/**/*.{ts,tsx}',
    './app/**/*.{ts,tsx}',
  ],
  theme: {
    extend: {
      colors: {
        'brand-blue': '#2563EB',
        'brand-blue-hover': '#1D4FCC',
        'brand-black': '#111418',
        'surface-dark': '#0A1A2E',
        'text-body': '#1F2937',
        'border-default': '#E5E7EB',
      },
      fontFamily: {
        sans: ['Inter', '-apple-system', 'system-ui', 'sans-serif'],
      },
      borderRadius: {
        button: '6px',
      },
    },
  },
  plugins: [require('tailwindcss-animate')],
}

export default config
```

- [ ] **Step 3: Update `app/layout.tsx` with Inter font and metadata**

```typescript
import type { Metadata } from 'next'
import { Inter } from 'next/font/google'
import './globals.css'

const inter = Inter({ subsets: ['latin'], variable: '--font-inter' })

export const metadata: Metadata = {
  title: 'SightMap — Interactive Property Maps',
  description: 'Replace your static PDF site plan with an interactive map that shows live availability, real-time pricing, and turn-by-turn navigation.',
}

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en" className={inter.variable}>
      <body className="font-sans antialiased">{children}</body>
    </html>
  )
}
```

- [ ] **Step 4: Verify styles load**

```bash
npm run dev
```

Open `http://localhost:3000`. Body background should be white with Inter font. No console errors. Kill with Ctrl+C.

- [ ] **Step 5: Commit**

```bash
git add app/globals.css tailwind.config.ts app/layout.tsx
git commit -m "feat: add brand tokens and global styles"
```

---

## Task 3: Pricing data

**Files:**
- Create: `lib/pricing.ts`

- [ ] **Step 1: Create `lib/pricing.ts`**

```typescript
export type TierSlug = 'essential' | 'growth' | 'scale' | 'enterprise'

export interface Tier {
  slug: TierSlug
  displayName: string
  units: string
  monthlyPrice: number
  setupFee: number
}

export const TIERS: Tier[] = [
  { slug: 'essential', displayName: 'Essential', units: '≤100', monthlyPrice: 29, setupFee: 175 },
  { slug: 'growth',    displayName: 'Growth',    units: '101–200', monthlyPrice: 49, setupFee: 275 },
  { slug: 'scale',     displayName: 'Scale',     units: '201–500', monthlyPrice: 79, setupFee: 375 },
  { slug: 'enterprise',displayName: 'Enterprise',units: '501+',    monthlyPrice: 99, setupFee: 475 },
]

export function getTierBySlug(slug: string): Tier | undefined {
  return TIERS.find(t => t.slug === slug)
}

export const VALID_SLUGS = TIERS.map(t => t.slug)
```

- [ ] **Step 2: Commit**

```bash
git add lib/pricing.ts
git commit -m "feat: add pricing tier data"
```

---

## Task 4: Logo and Nav components

**Files:**
- Create: `components/logo.tsx`
- Create: `components/nav.tsx`

- [ ] **Step 1: Create `components/logo.tsx`**

Two variants: `dark` (black wordmark on white) and `light` (white wordmark on dark).

```typescript
interface LogoProps {
  variant?: 'dark' | 'light'
  className?: string
}

export function Logo({ variant = 'dark', className = '' }: LogoProps) {
  const wordmarkColor = variant === 'light' ? '#FFFFFF' : '#111418'
  const cubeTopColor = '#111418'
  const cubeBottomColor = '#2563EB'

  return (
    <div className={`flex items-center gap-2.5 ${className}`}>
      {/* Isometric cube glyph */}
      <svg width="32" height="32" viewBox="0 0 32 32" fill="none" aria-hidden="true">
        {/* Top face */}
        <polygon points="16,2 30,10 16,18 2,10" fill={cubeTopColor} />
        {/* Bottom-left face */}
        <polygon points="2,10 16,18 16,30 2,22" fill={cubeBottomColor} />
        {/* Bottom-right face */}
        <polygon points="30,10 16,18 16,30 30,22" fill={cubeBottomColor} opacity="0.75" />
        {/* Map pin on top face */}
        <circle cx="16" cy="10" r="3" fill="white" />
        <circle cx="16" cy="10" r="1.2" fill={cubeTopColor} />
      </svg>
      {/* Wordmark */}
      <span
        className="text-[17px] font-semibold tracking-tight"
        style={{ color: wordmarkColor }}
      >
        SightMap<sup className="text-[9px] align-super">®</sup>
      </span>
    </div>
  )
}
```

- [ ] **Step 2: Create `components/nav.tsx`**

```typescript
'use client'

import Link from 'next/link'
import { usePathname } from 'next/navigation'
import { Logo } from './logo'

export function Nav() {
  const pathname = usePathname()
  const isDark = pathname === '/'

  return (
    <nav
      className={`fixed top-0 left-0 right-0 z-50 flex items-center h-16 px-6 lg:px-12 ${
        isDark ? 'bg-surface-dark' : 'bg-white border-b border-border-default'
      }`}
    >
      {/* Logo */}
      <Logo variant={isDark ? 'light' : 'dark'} />

      {/* Divider */}
      <div
        className={`mx-6 h-5 w-px ${isDark ? 'bg-white/20' : 'bg-border-default'}`}
        aria-hidden="true"
      />

      {/* Center links */}
      <div className="flex items-center gap-6 flex-1">
        <Link
          href="/pricing"
          className={`text-sm font-medium transition-colors ${
            isDark
              ? 'text-white/70 hover:text-white'
              : 'text-text-body hover:text-brand-black'
          }`}
        >
          Pricing
        </Link>
        <Link
          href="#features"
          className={`text-sm font-medium transition-colors ${
            isDark
              ? 'text-white/70 hover:text-white'
              : 'text-text-body hover:text-brand-black'
          }`}
        >
          Features
        </Link>
      </div>

      {/* CTA */}
      <Link
        href="/pricing"
        className="text-sm font-medium text-white bg-brand-blue hover:bg-brand-blue-hover px-4 py-2 transition-colors"
        style={{ borderRadius: 'var(--radius-button)' }}
      >
        Get Started
      </Link>
    </nav>
  )
}
```

- [ ] **Step 3: Verify no TypeScript errors**

```bash
npx tsc --noEmit
```

Expected: No errors. (If `usePathname` causes a module error, ensure `next` is installed — it's a built-in Next.js hook.)

- [ ] **Step 4: Commit**

```bash
git add components/logo.tsx components/nav.tsx
git commit -m "feat: add Logo and Nav components"
```

---

## Task 5: Hero section

**Files:**
- Create: `components/demo/hero.tsx`

- [ ] **Step 1: Create `components/demo/hero.tsx`**

```typescript
'use client'

import Link from 'next/link'
import { motion } from 'framer-motion'

function AnimatedFloorPlan() {
  const units = [
    { id: 'A101', x: 40,  y: 40,  w: 80, h: 60, available: true  },
    { id: 'A102', x: 130, y: 40,  w: 80, h: 60, available: false },
    { id: 'A103', x: 220, y: 40,  w: 80, h: 60, available: true  },
    { id: 'A104', x: 40,  y: 120, w: 80, h: 60, available: true  },
    { id: 'A105', x: 220, y: 120, w: 80, h: 60, available: false },
    { id: 'A106', x: 40,  y: 200, w: 80, h: 60, available: true  },
    { id: 'A107', x: 130, y: 200, w: 80, h: 60, available: true  },
    { id: 'A108', x: 220, y: 200, w: 80, h: 60, available: false },
  ]

  return (
    <svg viewBox="0 0 340 280" className="w-full max-w-md" aria-label="Animated floor plan">
      {/* Background */}
      <rect width="340" height="280" rx="12" fill="#0F1F3D" />
      {/* Hallway */}
      <rect x="120" y="110" width="100" height="70" fill="#0A1A2E" opacity="0.6" />
      <text x="170" y="150" textAnchor="middle" fill="white" fontSize="10" opacity="0.4">HALL</text>
      {/* Units */}
      {units.map((u, i) => (
        <g key={u.id}>
          <rect
            x={u.x} y={u.y} width={u.w} height={u.h}
            rx="4"
            fill={u.available ? '#2563EB' : '#374151'}
            opacity={u.available ? undefined : 0.5}
            className={u.available ? 'unit-available' : undefined}
            style={u.available ? { animationDelay: `${i * 0.4}s` } : undefined}
          />
          <text
            x={u.x + u.w / 2} y={u.y + u.h / 2 + 4}
            textAnchor="middle"
            fill="white"
            fontSize="11"
            fontWeight="500"
          >
            {u.id}
          </text>
          {u.available && (
            <circle cx={u.x + u.w - 10} cy={u.y + 10} r="4" fill="#4ADE80" />
          )}
        </g>
      ))}
      {/* Legend */}
      <circle cx="24" cy="264" r="4" fill="#2563EB" />
      <text x="32" y="268" fill="white" fontSize="10" opacity="0.6">Available</text>
      <circle cx="100" cy="264" r="4" fill="#374151" />
      <text x="108" y="268" fill="white" fontSize="10" opacity="0.6">Leased</text>
    </svg>
  )
}

export function Hero() {
  return (
    <section className="min-h-screen bg-surface-dark flex flex-col pt-16">
      <div className="flex-1 flex items-center max-w-7xl mx-auto w-full px-6 lg:px-12 py-20">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center w-full">
          {/* Left: copy */}
          <motion.div
            initial={{ opacity: 0, y: 24 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
          >
            <p className="text-brand-blue text-sm font-semibold tracking-widest uppercase mb-4">
              Interactive Property Maps
            </p>
            <h1 className="text-4xl lg:text-5xl font-bold text-white tracking-tight leading-tight mb-6">
              Lease smarter with SightMap.
            </h1>
            <p className="text-white/70 text-lg leading-relaxed mb-10 max-w-lg">
              Replace your static PDF site plan with an interactive map that shows live
              availability, real-time pricing, and turn-by-turn navigation — embedded
              directly on your property website.
            </p>
            <div className="flex flex-wrap gap-3">
              <Link
                href="/pricing"
                className="px-6 py-3 text-sm font-medium text-white bg-brand-blue hover:bg-brand-blue-hover transition-colors"
                style={{ borderRadius: 'var(--radius-button)' }}
              >
                Explore pricing
              </Link>
              <a
                href="#pathfinding"
                className="px-6 py-3 text-sm font-medium text-brand-blue bg-white border border-brand-blue hover:bg-blue-50 transition-colors"
                style={{ borderRadius: 'var(--radius-button)' }}
              >
                Learn about pathfinding
              </a>
            </div>
          </motion.div>

          {/* Right: animated map */}
          <motion.div
            initial={{ opacity: 0, scale: 0.96 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.7, delay: 0.15 }}
            className="flex justify-center lg:justify-end"
          >
            <AnimatedFloorPlan />
          </motion.div>
        </div>
      </div>
    </section>
  )
}
```

- [ ] **Step 2: Commit**

```bash
git add components/demo/hero.tsx
git commit -m "feat: add hero section with animated floor plan"
```

---

## Task 6: Feature reveal sections

**Files:**
- Create: `components/demo/feature-reveal.tsx`

- [ ] **Step 1: Create `components/demo/feature-reveal.tsx`**

```typescript
'use client'

import { motion } from 'framer-motion'

interface FeatureRevealProps {
  eyebrow?: string
  headline: string
  body: string
  callout?: string
  imageLeft?: boolean
  illustration: React.ReactNode
}

export function FeatureReveal({
  eyebrow,
  headline,
  body,
  callout,
  imageLeft = false,
  illustration,
}: FeatureRevealProps) {
  const textCol = (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.5 }}
      className="flex flex-col justify-center"
    >
      {eyebrow && (
        <p className="text-brand-blue text-xs font-semibold tracking-widest uppercase mb-3">
          {eyebrow}
        </p>
      )}
      <h2 className="text-3xl font-bold text-brand-black tracking-tight mb-4">
        {headline}
      </h2>
      <p className="text-text-body text-lg leading-relaxed">
        {body}
      </p>
      {callout && (
        <p className="mt-4 text-sm text-text-body font-medium border-l-2 border-brand-blue pl-3">
          {callout}
        </p>
      )}
    </motion.div>
  )

  const imgCol = (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.5, delay: 0.1 }}
      className="flex justify-center"
    >
      {illustration}
    </motion.div>
  )

  return (
    <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center max-w-7xl mx-auto w-full px-6 lg:px-12 py-24">
      {imageLeft ? (
        <>{imgCol}{textCol}</>
      ) : (
        <>{textCol}{imgCol}</>
      )}
    </div>
  )
}
```

- [ ] **Step 2: Commit**

```bash
git add components/demo/feature-reveal.tsx
git commit -m "feat: add scroll-triggered feature reveal component"
```

---

## Task 7: Interactive floor plan simulation

**Files:**
- Create: `components/demo/floor-plan-sim.tsx`

- [ ] **Step 1: Create `components/demo/floor-plan-sim.tsx`**

```typescript
'use client'

import { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'

interface Unit {
  id: string
  x: number
  y: number
  w: number
  h: number
  price: string
  status: 'Available' | 'Waitlist' | 'Leased'
  bed: string
}

const UNITS: Unit[] = [
  { id: 'A101', x: 20,  y: 20,  w: 90, h: 65, price: '$1,450/mo', status: 'Available', bed: '1 bed / 1 bath' },
  { id: 'A102', x: 120, y: 20,  w: 90, h: 65, price: '$1,650/mo', status: 'Waitlist',  bed: '2 bed / 1 bath' },
  { id: 'A103', x: 220, y: 20,  w: 90, h: 65, price: '$1,450/mo', status: 'Available', bed: '1 bed / 1 bath' },
  { id: 'A104', x: 320, y: 20,  w: 90, h: 65, price: '$1,850/mo', status: 'Leased',    bed: '2 bed / 2 bath' },
  { id: 'A105', x: 20,  y: 105, w: 90, h: 65, price: '$1,550/mo', status: 'Available', bed: '1 bed / 1 bath' },
  { id: 'A106', x: 220, y: 105, w: 90, h: 65, price: '$1,950/mo', status: 'Available', bed: '2 bed / 2 bath' },
  { id: 'A107', x: 320, y: 105, w: 90, h: 65, price: '$1,450/mo', status: 'Waitlist',  bed: '1 bed / 1 bath' },
  { id: 'A108', x: 20,  y: 190, w: 90, h: 65, price: '$2,150/mo', status: 'Available', bed: '3 bed / 2 bath' },
  { id: 'A109', x: 120, y: 190, w: 90, h: 65, price: '$1,650/mo', status: 'Leased',    bed: '2 bed / 1 bath' },
  { id: 'A110', x: 220, y: 190, w: 90, h: 65, price: '$1,450/mo', status: 'Available', bed: '1 bed / 1 bath' },
]

const statusColor: Record<Unit['status'], string> = {
  Available: '#2563EB',
  Waitlist:  '#F59E0B',
  Leased:    '#374151',
}

const statusBadge: Record<Unit['status'], string> = {
  Available: 'bg-blue-100 text-blue-700',
  Waitlist:  'bg-amber-100 text-amber-700',
  Leased:    'bg-gray-100 text-gray-500',
}

export function FloorPlanSim() {
  const [selected, setSelected] = useState<Unit | null>(null)

  return (
    <div className="relative bg-[#0A1A2E] rounded-2xl p-6 w-full max-w-2xl mx-auto">
      <p className="text-xs font-semibold tracking-widest uppercase text-white/40 mb-4">
        Try a live map.
      </p>

      <div className="relative">
        <svg
          viewBox="0 0 430 280"
          className="w-full"
          style={{ cursor: 'default' }}
          aria-label="Interactive floor plan"
        >
          {/* Background */}
          <rect width="430" height="280" rx="8" fill="#0F1F3D" />

          {/* Hallway */}
          <rect x="110" y="95" width="100" height="85" fill="#091626" />
          <text x="160" y="142" textAnchor="middle" fill="white" fontSize="9" opacity="0.3" fontWeight="500">
            HALLWAY
          </text>

          {units.map(unit => (
            <g
              key={unit.id}
              onClick={() => setSelected(selected?.id === unit.id ? null : unit)}
              style={{ cursor: 'pointer' }}
            >
              <rect
                x={unit.x} y={unit.y} width={unit.w} height={unit.h}
                rx="4"
                fill={statusColor[unit.status]}
                opacity={unit.status === 'Leased' ? 0.35 : selected?.id === unit.id ? 1 : 0.8}
                stroke={selected?.id === unit.id ? 'white' : 'transparent'}
                strokeWidth={2}
              />
              <text
                x={unit.x + unit.w / 2}
                y={unit.y + unit.h / 2 + 4}
                textAnchor="middle"
                fill="white"
                fontSize="10"
                fontWeight="600"
              >
                {unit.id}
              </text>
            </g>
          ))}
        </svg>

        {/* Popover */}
        <AnimatePresence>
          {selected && (
            <motion.div
              initial={{ opacity: 0, scale: 0.92 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.92 }}
              transition={{ duration: 0.15 }}
              className="absolute top-2 right-2 w-56 bg-white rounded-xl shadow-2xl p-4 z-10"
            >
              <div className="flex items-start justify-between mb-2">
                <div>
                  <p className="font-semibold text-brand-black text-sm">{selected.id}</p>
                  <p className="text-xs text-text-body mt-0.5">{selected.bed}</p>
                </div>
                <button
                  onClick={() => setSelected(null)}
                  className="text-gray-400 hover:text-gray-600 text-lg leading-none mt-0.5"
                  aria-label="Close"
                >
                  ×
                </button>
              </div>
              <p className="text-xl font-bold text-brand-black mb-2">{selected.price}</p>
              <span className={`text-xs font-medium px-2 py-0.5 rounded-full ${statusBadge[selected.status]}`}>
                {selected.status}
              </span>
              {/* Floor plan thumbnail placeholder */}
              <div className="mt-3 bg-gray-100 rounded-lg h-20 flex items-center justify-center">
                <p className="text-xs text-gray-400">Floor plan</p>
              </div>
              <button
                className="mt-3 w-full text-xs text-brand-blue font-medium hover:underline"
                onClick={() => {}}
              >
                View floor plan
              </button>
            </motion.div>
          )}
        </AnimatePresence>
      </div>

      {/* Legend */}
      <div className="flex gap-4 mt-4">
        {(['Available', 'Waitlist', 'Leased'] as Unit['status'][]).map(s => (
          <div key={s} className="flex items-center gap-1.5">
            <div className="w-2.5 h-2.5 rounded-full" style={{ backgroundColor: statusColor[s] }} />
            <span className="text-xs text-white/50">{s}</span>
          </div>
        ))}
      </div>
    </div>
  )
}
```

> **Note:** The variable name `units` is used inside the SVG map — change `{units.map(...)}` to `{UNITS.map(...)}` in the SVG block. The outer constant is `UNITS`.

- [ ] **Step 2: Fix the variable reference** — in the SVG, `{units.map(unit =>` should be `{UNITS.map(unit =>`.

- [ ] **Step 3: Commit**

```bash
git add components/demo/floor-plan-sim.tsx
git commit -m "feat: add interactive floor plan simulation with click-to-popover"
```

---

## Task 8: Social proof bar and bottom CTA band

**Files:**
- Create: `components/demo/social-proof.tsx`
- Create: `components/demo/cta-band.tsx`

- [ ] **Step 1: Create `components/demo/social-proof.tsx`**

```typescript
'use client'

import { motion } from 'framer-motion'

const LOGOS = ['Greystar', 'Venterra', 'Griffis Residential', 'Extra Space Storage']

export function SocialProof() {
  return (
    <section className="py-16 border-y border-border-default">
      <div className="max-w-7xl mx-auto px-6 lg:px-12 text-center">
        <p className="text-xs font-semibold tracking-widest uppercase text-text-body mb-8">
          Trusted by leaders in property management
        </p>
        <div className="flex flex-wrap justify-center items-center gap-8 lg:gap-16">
          {LOGOS.map((name, i) => (
            <motion.span
              key={name}
              initial={{ opacity: 0 }}
              whileInView={{ opacity: 1 }}
              viewport={{ once: true }}
              transition={{ duration: 0.4, delay: i * 0.1 }}
              className="text-lg font-semibold text-gray-300 tracking-tight"
            >
              {name}
            </motion.span>
          ))}
        </div>
      </div>
    </section>
  )
}
```

- [ ] **Step 2: Create `components/demo/cta-band.tsx`**

```typescript
import Link from 'next/link'

export function CtaBand() {
  return (
    <section className="bg-surface-dark py-24 text-center">
      <div className="max-w-2xl mx-auto px-6">
        <h2 className="text-3xl font-bold text-white tracking-tight mb-4">
          Pricing that scales with your portfolio.
        </h2>
        <p className="text-white/60 text-lg mb-10">
          Simple per-property pricing. No sales call required.
        </p>
        <Link
          href="/pricing"
          className="inline-flex items-center gap-2 px-8 py-3.5 text-sm font-medium text-white bg-brand-blue hover:bg-brand-blue-hover transition-colors"
          style={{ borderRadius: 'var(--radius-button)' }}
        >
          See pricing →
        </Link>
      </div>
    </section>
  )
}
```

- [ ] **Step 3: Commit**

```bash
git add components/demo/social-proof.tsx components/demo/cta-band.tsx
git commit -m "feat: add social proof bar and CTA band"
```

---

## Task 9: Assemble demo page

**Files:**
- Modify: `app/page.tsx`

- [ ] **Step 1: Replace `app/page.tsx`**

```typescript
import { Nav } from '@/components/nav'
import { Hero } from '@/components/demo/hero'
import { FeatureReveal } from '@/components/demo/feature-reveal'
import { FloorPlanSim } from '@/components/demo/floor-plan-sim'
import { SocialProof } from '@/components/demo/social-proof'
import { CtaBand } from '@/components/demo/cta-band'

function MapIllustration() {
  return (
    <div className="w-full max-w-sm bg-gray-50 rounded-2xl border border-border-default flex items-center justify-center h-64">
      <div className="text-center">
        <div className="w-12 h-12 rounded-full bg-brand-blue/10 flex items-center justify-center mx-auto mb-3">
          <svg className="w-6 h-6 text-brand-blue" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M9 20l-5.447-2.724A1 1 0 013 16.382V5.618a1 1 0 011.447-.894L9 7m0 13l6-3m-6 3V7m6 10l4.553 2.276A1 1 0 0021 18.382V7.618a1 1 0 00-.553-.894L15 4m0 13V4m0 0L9 7" />
          </svg>
        </div>
        <p className="text-sm text-gray-400 font-medium">Interactive Map</p>
      </div>
    </div>
  )
}

function AvailabilityIllustration() {
  return (
    <div className="w-full max-w-sm space-y-2">
      {[
        { id: 'Unit 4A', status: 'Available', color: 'bg-brand-blue' },
        { id: 'Unit 4B', status: 'Leased',    color: 'bg-gray-300' },
        { id: 'Unit 4C', status: 'Available', color: 'bg-brand-blue' },
        { id: 'Unit 4D', status: 'Waitlist',  color: 'bg-amber-400' },
        { id: 'Unit 5A', status: 'Available', color: 'bg-brand-blue' },
      ].map(u => (
        <div key={u.id} className="flex items-center gap-3 bg-white rounded-lg border border-border-default px-4 py-3">
          <div className={`w-2.5 h-2.5 rounded-full ${u.color}`} />
          <span className="text-sm font-medium text-brand-black">{u.id}</span>
          <span className="ml-auto text-xs text-text-body">{u.status}</span>
        </div>
      ))}
    </div>
  )
}

function PathfindingIllustration() {
  return (
    <div className="w-full max-w-sm bg-surface-dark rounded-2xl p-6">
      <svg viewBox="0 0 280 200" aria-label="Pathfinding illustration">
        <rect width="280" height="200" rx="8" fill="#0F1F3D" />
        {/* Buildings */}
        <rect x="20"  y="20"  width="50" height="50" rx="3" fill="#1E3A5F" />
        <rect x="80"  y="20"  width="50" height="50" rx="3" fill="#1E3A5F" />
        <rect x="160" y="20"  width="50" height="50" rx="3" fill="#1E3A5F" />
        <rect x="20"  y="130" width="50" height="50" rx="3" fill="#1E3A5F" />
        <rect x="160" y="130" width="100" height="50" rx="3" fill="#2563EB" opacity="0.3" />
        {/* Path */}
        <polyline
          points="45,130 45,80 185,80 185,130"
          fill="none"
          stroke="#2563EB"
          strokeWidth="2.5"
          strokeDasharray="6 3"
          strokeLinecap="round"
        />
        {/* Start dot */}
        <circle cx="45" cy="155" r="6" fill="#4ADE80" />
        <text x="45" y="175" textAnchor="middle" fill="white" fontSize="8" opacity="0.5">Start</text>
        {/* End dot */}
        <circle cx="185" cy="155" r="6" fill="#2563EB" />
        <text x="205" y="175" textAnchor="middle" fill="white" fontSize="8" opacity="0.5">Unit 7C</text>
      </svg>
    </div>
  )
}

export default function DemoPage() {
  return (
    <>
      <Nav />
      <main>
        <Hero />

        <SocialProof />

        <section id="features" className="py-4">
          <FeatureReveal
            headline="Renters explore. You close."
            body="Give prospective residents an interactive map of your actual community — not a static image. They filter by unit, view availability, and make decisions on their own timeline. No leasing agent required for the discovery step."
            illustration={<MapIllustration />}
          />

          <FeatureReveal
            eyebrow="Real-time data"
            headline="Live from your property management system."
            body="SightMap pulls availability and pricing directly from your PMS — the map reflects what's actually available, right now. No manual updates, no stale data shown to prospective residents."
            callout="Connects to Yardi, RealPage, and Entrata."
            imageLeft
            illustration={<AvailabilityIllustration />}
          />

          <FeatureReveal
            id="pathfinding"
            eyebrow="New — launched March 2026"
            headline="Turn-by-turn navigation inside the community."
            body="Residents and guests can navigate your property with step-by-step directions from the entrance to any unit. The same pathfinding SDK is available to partners building on top of SightMap."
            illustration={<PathfindingIllustration />}
          />
        </section>

        <section className="py-16 bg-gray-50">
          <div className="max-w-7xl mx-auto px-6 lg:px-12">
            <FloorPlanSim />
          </div>
        </section>

        <CtaBand />
      </main>
    </>
  )
}
```

> **Note:** The `FeatureReveal` component doesn't accept an `id` prop yet. Either remove `id="pathfinding"` from the third `FeatureReveal` call or add `id?: string` to the `FeatureRevealProps` interface and spread it onto the section element in `feature-reveal.tsx`.

- [ ] **Step 2: Add `id` prop to FeatureReveal** — open `components/demo/feature-reveal.tsx`, add `id?: string` to `FeatureRevealProps`, and add `id={id}` to the `<div>` wrapper.

- [ ] **Step 3: Verify the demo page renders**

```bash
npm run dev
```

Open `http://localhost:3000`. Verify: dark hero loads, animated map pulses, scroll reveals fire on the feature sections, floor plan sim is clickable. Kill with Ctrl+C.

- [ ] **Step 4: Commit**

```bash
git add app/page.tsx components/demo/feature-reveal.tsx
git commit -m "feat: assemble demo landing page"
```

---

## Task 10: Pricing matrix component

**Files:**
- Create: `components/pricing/pricing-matrix.tsx`

- [ ] **Step 1: Create `components/pricing/pricing-matrix.tsx`**

```typescript
'use client'

import { useState } from 'react'
import { TIERS, type Tier } from '@/lib/pricing'
import { SalesModal } from './sales-modal'

export function PricingMatrix() {
  const [modalOpen, setModalOpen] = useState(false)
  const [selectedTier, setSelectedTier] = useState<Tier | null>(null)

  function handleGetStarted(tier: Tier) {
    window.location.href = `/confirm/${tier.slug}`
  }

  function handleSalesClick(tier: Tier) {
    setSelectedTier(tier)
    setModalOpen(true)
  }

  return (
    <>
      <div className="w-full overflow-x-auto">
        <div
          className="min-w-[640px] rounded-2xl border border-border-default overflow-hidden bg-white"
          style={{ boxShadow: '0 1px 4px 0 rgba(0,0,0,0.06)' }}
        >
          {/* Header row: unit tiers */}
          <div className="grid grid-cols-5 border-b border-border-default">
            <div className="px-6 py-5 text-sm text-text-body font-medium">
              Apartment units
            </div>
            {TIERS.map(tier => (
              <div
                key={tier.slug}
                className="px-6 py-5 text-center text-sm font-semibold text-brand-black border-l border-border-default"
              >
                {tier.units}
              </div>
            ))}
          </div>

          {/* Monthly subscription row */}
          <div className="grid grid-cols-5 border-b border-border-default">
            <div className="px-6 py-6 text-sm text-text-body font-medium flex items-center">
              Monthly subscription
            </div>
            {TIERS.map(tier => (
              <div
                key={tier.slug}
                className="px-6 py-6 text-center border-l border-border-default flex items-baseline justify-center gap-0.5"
              >
                <span className="text-4xl font-bold text-brand-black tracking-tight">
                  ${tier.monthlyPrice}
                </span>
                <span className="text-sm text-text-body font-normal">/mo</span>
              </div>
            ))}
          </div>

          {/* One-time setup row */}
          <div className="grid grid-cols-5">
            <div className="px-6 py-6 text-sm text-text-body font-medium flex items-center">
              One-time setup
            </div>
            {TIERS.map(tier => (
              <div
                key={tier.slug}
                className="px-6 py-6 text-center border-l border-border-default text-base font-semibold text-brand-black"
              >
                ${tier.setupFee}
              </div>
            ))}
          </div>

          {/* CTA row */}
          <div className="grid grid-cols-5 border-t border-border-default bg-gray-50/50">
            <div className="px-6 py-6" />
            {TIERS.map(tier => (
              <div
                key={tier.slug}
                className="px-4 py-6 flex flex-col items-center gap-3 border-l border-border-default"
              >
                <button
                  onClick={() => handleGetStarted(tier)}
                  className="w-full px-4 py-2.5 text-sm font-medium text-white bg-brand-blue hover:bg-brand-blue-hover transition-colors"
                  style={{ borderRadius: 'var(--radius-button)' }}
                >
                  Get Started
                </button>
                <button
                  onClick={() => handleSalesClick(tier)}
                  className="text-xs text-gray-400 hover:text-gray-600 transition-colors"
                >
                  Need to speak with a sales rep?
                </button>
              </div>
            ))}
          </div>
        </div>
      </div>

      <p className="text-center text-sm text-text-body mt-6">
        Monthly subscription prices are per property and paid annually.
      </p>

      <SalesModal
        open={modalOpen}
        onClose={() => setModalOpen(false)}
        tier={selectedTier}
      />
    </>
  )
}
```

- [ ] **Step 2: Commit**

```bash
git add components/pricing/pricing-matrix.tsx
git commit -m "feat: add pricing matrix component"
```

---

## Task 11: Sales rep modal

**Files:**
- Create: `components/pricing/sales-modal.tsx`

- [ ] **Step 1: Create `components/pricing/sales-modal.tsx`**

```typescript
'use client'

import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
} from '@/components/ui/dialog'
import type { Tier } from '@/lib/pricing'

const DAYS = ['Mon', 'Tue', 'Wed', 'Thu', 'Fri']
const TIMES = ['9:00 AM', '11:00 AM', '2:00 PM']

interface SalesModalProps {
  open: boolean
  onClose: () => void
  tier: Tier | null
}

export function SalesModal({ open, onClose, tier }: SalesModalProps) {
  return (
    <Dialog open={open} onOpenChange={onClose}>
      <DialogContent className="sm:max-w-md">
        <DialogHeader>
          <DialogTitle className="text-xl font-bold text-brand-black">
            Let's find time to talk.
          </DialogTitle>
          <DialogDescription className="text-text-body">
            A SightMap specialist will walk you through setup, integrations, and what
            to expect in your first 30 days.
            {tier && (
              <span className="block mt-1 text-xs text-brand-blue font-medium">
                Inquiring about the {tier.displayName} plan
              </span>
            )}
          </DialogDescription>
        </DialogHeader>

        {/* Calendar placeholder */}
        <div className="mt-4">
          <p className="text-xs font-semibold tracking-widest uppercase text-text-body mb-3">
            Select a time
          </p>
          <div className="grid grid-cols-5 gap-1 mb-1">
            {DAYS.map(day => (
              <div
                key={day}
                className="text-center text-xs font-semibold text-text-body py-1"
              >
                {day}
              </div>
            ))}
          </div>
          {TIMES.map(time => (
            <div key={time} className="grid grid-cols-5 gap-1 mb-1">
              {DAYS.map(day => (
                <div
                  key={`${day}-${time}`}
                  className="rounded-md border border-border-default py-2 text-center text-xs text-gray-400 cursor-not-allowed"
                  title="Available in the live product"
                >
                  {time.split(' ')[0]}
                </div>
              ))}
            </div>
          ))}
          <p className="text-xs text-gray-400 text-center mt-2">
            Times shown in your local timezone
          </p>
        </div>

        <button
          className="mt-2 w-full px-4 py-2.5 text-sm font-medium text-white bg-brand-blue hover:bg-brand-blue-hover transition-colors"
          style={{ borderRadius: 'var(--radius-button)' }}
          onClick={onClose}
        >
          Book a time
        </button>
      </DialogContent>
    </Dialog>
  )
}
```

- [ ] **Step 2: Commit**

```bash
git add components/pricing/sales-modal.tsx
git commit -m "feat: add sales rep modal with calendar placeholder"
```

---

## Task 12: Trust strip and FAQ accordion

**Files:**
- Create: `components/pricing/trust-strip.tsx`
- Create: `components/pricing/faq-accordion.tsx`

- [ ] **Step 1: Create `components/pricing/trust-strip.tsx`**

```typescript
const SIGNALS = [
  'No long-term contracts',
  'Cancel anytime',
  'Onboarding included',
]

export function TrustStrip() {
  return (
    <div className="flex flex-wrap justify-center items-center gap-2 py-8">
      {SIGNALS.map((signal, i) => (
        <span key={signal} className="flex items-center gap-2 text-sm text-text-body">
          {i > 0 && <span className="text-border-default">·</span>}
          <svg className="w-4 h-4 text-brand-blue" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
          </svg>
          {signal}
        </span>
      ))}
    </div>
  )
}
```

- [ ] **Step 2: Create `components/pricing/faq-accordion.tsx`**

```typescript
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from '@/components/ui/accordion'

const FAQS = [
  {
    q: 'What\'s included in the one-time setup?',
    a: 'Setup covers the initial build of your interactive property map, including floor plan digitization, unit configuration, and embed code for your website. Our team coordinates directly with your web team or property management software provider to get you live.',
  },
  {
    q: 'Can I manage multiple properties under one account?',
    a: 'Yes. Each property is priced and billed separately based on its unit count. Your account dashboard lets you manage maps across your entire portfolio from a single login.',
  },
  {
    q: 'What property management systems do you connect to?',
    a: 'SightMap integrates natively with Yardi, RealPage, and Entrata — the three largest PMS platforms in multifamily. Additional integrations are available; contact us if your PMS isn\'t listed.',
  },
]

export function FaqAccordion() {
  return (
    <div className="max-w-2xl mx-auto w-full">
      <h3 className="text-lg font-semibold text-brand-black mb-6 text-center">
        Common questions
      </h3>
      <Accordion type="single" collapsible className="w-full">
        {FAQS.map((faq, i) => (
          <AccordionItem key={i} value={`item-${i}`}>
            <AccordionTrigger className="text-left text-sm font-medium text-brand-black">
              {faq.q}
            </AccordionTrigger>
            <AccordionContent className="text-sm text-text-body leading-relaxed">
              {faq.a}
            </AccordionContent>
          </AccordionItem>
        ))}
      </Accordion>
    </div>
  )
}
```

- [ ] **Step 3: Commit**

```bash
git add components/pricing/trust-strip.tsx components/pricing/faq-accordion.tsx
git commit -m "feat: add trust strip and FAQ accordion"
```

---

## Task 13: Assemble pricing page

**Files:**
- Create: `app/pricing/page.tsx`

- [ ] **Step 1: Create `app/pricing/page.tsx`**

```typescript
import { Nav } from '@/components/nav'
import { PricingMatrix } from '@/components/pricing/pricing-matrix'
import { TrustStrip } from '@/components/pricing/trust-strip'
import { FaqAccordion } from '@/components/pricing/faq-accordion'

export default function PricingPage() {
  return (
    <>
      <Nav />
      <main className="pt-16 min-h-screen bg-white">
        {/* Header */}
        <section className="max-w-7xl mx-auto px-6 lg:px-12 pt-20 pb-12">
          <p className="text-xs font-semibold tracking-widest uppercase text-text-body mb-4">
            Pricing
          </p>
          <h1 className="text-4xl font-bold text-brand-black tracking-tight mb-4">
            Scale your portfolio without scaling your costs.
          </h1>
          <p className="text-lg text-text-body max-w-xl">
            Per property, per month. Paid annually. No per-seat fees, no long-term contracts.
          </p>
        </section>

        {/* Pricing table */}
        <section className="max-w-7xl mx-auto px-6 lg:px-12 pb-8">
          <PricingMatrix />
        </section>

        {/* Trust strip */}
        <section className="max-w-7xl mx-auto px-6 lg:px-12 pb-12">
          <TrustStrip />
        </section>

        {/* FAQ */}
        <section className="max-w-7xl mx-auto px-6 lg:px-12 pb-24">
          <FaqAccordion />
        </section>
      </main>
    </>
  )
}
```

- [ ] **Step 2: Verify pricing page renders**

```bash
npm run dev
```

Open `http://localhost:3000/pricing`. Verify: pricing table renders with 4 tiers, "Get Started" buttons are blue, "Need to speak with a sales rep?" is a small gray text link, FAQ accordion opens/closes, modal appears when clicking sales link. Kill with Ctrl+C.

- [ ] **Step 3: Commit**

```bash
git add app/pricing/page.tsx
git commit -m "feat: assemble pricing page"
```

---

## Task 14: Confirmation page

**Files:**
- Create: `app/confirm/[tier]/page.tsx`

- [ ] **Step 1: Create `app/confirm/[tier]/page.tsx`**

```typescript
import Link from 'next/link'
import { Nav } from '@/components/nav'
import { getTierBySlug, VALID_SLUGS } from '@/lib/pricing'
import { notFound } from 'next/navigation'

interface Props {
  params: Promise<{ tier: string }>
}

export default async function ConfirmPage({ params }: Props) {
  const { tier: slug } = await params
  const tier = getTierBySlug(slug)

  if (!tier) notFound()

  return (
    <>
      <Nav />
      <main className="pt-16 min-h-screen bg-white flex items-center justify-center">
        <div className="max-w-md mx-auto px-6 text-center py-24">
          {/* Checkmark */}
          <div className="w-16 h-16 rounded-full bg-brand-blue/10 flex items-center justify-center mx-auto mb-6">
            <svg className="w-8 h-8 text-brand-blue" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
            </svg>
          </div>

          <h1 className="text-3xl font-bold text-brand-black tracking-tight mb-4">
            You're on your way.
          </h1>
          <p className="text-text-body text-lg leading-relaxed mb-8">
            You selected the <strong className="text-brand-black">{tier.displayName}</strong> plan.
            Our team will reach out within 1 business day to get your map live.
          </p>

          <div className="bg-gray-50 rounded-xl border border-border-default p-5 text-left mb-8">
            <p className="text-xs font-semibold tracking-widest uppercase text-text-body mb-3">
              Your plan summary
            </p>
            <div className="flex justify-between text-sm mb-2">
              <span className="text-text-body">Monthly subscription</span>
              <span className="font-semibold text-brand-black">${tier.monthlyPrice}/mo</span>
            </div>
            <div className="flex justify-between text-sm">
              <span className="text-text-body">One-time setup</span>
              <span className="font-semibold text-brand-black">${tier.setupFee}</span>
            </div>
            <p className="text-xs text-text-body mt-3 pt-3 border-t border-border-default">
              {tier.units} apartment units · Billed annually
            </p>
          </div>

          <Link
            href="/pricing"
            className="text-sm text-text-body hover:text-brand-black transition-colors"
          >
            ← Back to pricing
          </Link>
        </div>
      </main>
    </>
  )
}

export function generateStaticParams() {
  return VALID_SLUGS.map(tier => ({ tier }))
}
```

- [ ] **Step 2: Verify all confirmation routes work**

```bash
npm run dev
```

Open each in sequence:
- `http://localhost:3000/confirm/essential` — shows "Essential plan"
- `http://localhost:3000/confirm/growth` — shows "Growth plan"
- `http://localhost:3000/confirm/scale` — shows "Scale plan"
- `http://localhost:3000/confirm/enterprise` — shows "Enterprise plan"
- `http://localhost:3000/confirm/invalid` — returns 404

Kill with Ctrl+C.

- [ ] **Step 3: Commit**

```bash
git add app/confirm/
git commit -m "feat: add confirmation page for each pricing tier"
```

---

## Task 15: Responsive and visual QA pass

**Files:**
- Modify as needed based on QA findings

- [ ] **Step 1: Run TypeScript check**

```bash
npx tsc --noEmit
```

Expected: No errors. Fix any type errors before continuing.

- [ ] **Step 2: Run ESLint**

```bash
npm run lint
```

Expected: No errors. Fix any lint errors.

- [ ] **Step 3: Mobile QA**

```bash
npm run dev
```

Open Chrome DevTools → toggle device toolbar → iPhone 14 (390×844). Check each route:
- `/` — Hero stacks vertically, CTA buttons are full-width readable, floor plan sim fits
- `/pricing` — Table scrolls horizontally (has `overflow-x-auto`), no content clipped
- `/confirm/growth` — Centered layout, plan summary card readable

- [ ] **Step 4: Build check**

```bash
npm run build
```

Expected: Build completes with no errors. Note any warnings and fix if they indicate broken imports or missing types.

- [ ] **Step 5: Commit any fixes**

```bash
git add -A
git commit -m "fix: responsive and QA pass"
```

---

## Task 16: Deploy to Vercel

**Files:** None — deployment only.

- [ ] **Step 1: Create GitHub repo and push**

You'll need to do these steps (requires your GitHub credentials):
```bash
gh repo create sightmap-demo --public --source=. --remote=origin --push
```

Or manually:
1. Create a new repo at github.com named `sightmap-demo`
2. Then run:
```bash
git remote add origin https://github.com/YOUR_USERNAME/sightmap-demo.git
git push -u origin main
```

- [ ] **Step 2: Deploy to Vercel**

```bash
npx vercel --prod --yes
```

Follow prompts to link/create a Vercel project. When asked about the framework, select Next.js. Accept all defaults.

- [ ] **Step 3: Verify live URL**

Vercel will output a production URL (e.g. `https://sightmap-demo.vercel.app`). Open it and verify:
- `/` loads with dark hero
- `/pricing` loads pricing matrix
- `/confirm/growth` loads confirmation screen
- `/pricing` "Get Started" button on Growth tier routes to `/confirm/growth`
- "Need to speak with a sales rep?" opens the modal

- [ ] **Step 4: Share the URL**

The site is live and shareable. No further steps required for Day 1 prototype.
