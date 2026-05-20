# SightMap Demo + Pricing Site — Design Spec
*Date: 2026-05-20 | Author: Stephen Brown, Head of GTM Engineering*

---

## Overview

A standalone Next.js marketing site demonstrating SightMap's self-service GTM motion. Two-page flow: a demo/landing page that tells the product story and simulates the experience, routing to a pricing page where visitors self-select a tier and get started without sales involvement.

**Day 1 prototype — no system integrations.** No Stripe, no Calendly, no HubSpot, no PMS. All CTAs resolve to placeholder UI.

---

## Goals

- Demonstrate that SightMap can be bought without a sales conversation
- Make pricing transparent and self-selectable
- De-emphasize sales path without removing it entirely
- Deploy to Vercel; shareable URL by end of session

---

## Tech Stack

| Layer | Choice |
|---|---|
| Framework | Next.js 15 App Router |
| Styling | Tailwind CSS + CSS custom properties |
| Components | shadcn/ui |
| Animation | Framer Motion |
| Deployment | Vercel |
| Language | TypeScript |

---

## Brand Tokens

```css
--brand-blue:       #2563EB;
--brand-blue-hover: #1D4FCC;
--brand-black:      #111418;
--brand-white:      #FFFFFF;
--surface-dark:     #0A1A2E;
--text-primary:     #111418;
--text-body:        #1F2937;
--border-default:   #E5E7EB;
--radius-button:    6px;
--font-family:      'Inter', -apple-system, system-ui, sans-serif;
```

Typography: Inter. Headlines 600–700 weight, tight tracking, verb-first, terminal period. Body 400 weight, loose line-height. Buttons use sentence case.

---

## Routes

| Route | Description |
|---|---|
| `/` | Demo/landing page |
| `/pricing` | Pricing page |
| `/confirm/[tier]` | Confirmation screen (no Stripe) |

---

## Page 1: Demo Page (`/`)

### Nav
- Logo left (wordmark + isometric glyph lockup, dark-on-light variant)
- Vertical divider rule
- Center links: "Pricing" | "Features" (placeholder anchor)
- Right: "Get Started" pill button, brand blue

### Hero Section
- Dark navy background (`--surface-dark`: `#0A1A2E`)
- White-on-dark logo variant
- Left column (50%): headline, subhead, CTAs
- Right column (50%): animated floor plan mockup
- **Headline**: *"Lease smarter with SightMap."* (600–700 weight, white, tight tracking)
- **Subhead**: *"Replace your static PDF site plan with an interactive map that shows live availability, real-time pricing, and turn-by-turn navigation — embedded directly on your property website."*
- **CTA pair**: "Explore pricing" (brand blue fill) + "Learn about pathfinding" (outline: white fill, blue text + border)
- Animated map: SVG floor plan, units pulse between available (blue) and unavailable (gray) states on a loop

### Feature Reveal Sections (3)
Scroll-triggered fade+slide. Alternating layout (image left / image right).

1. **Interactive map** — *"Renters explore. You close."* Animated illustration of a user clicking units on a map.
2. **Real-time availability** — *"Live from your property management system."* Units toggle states. Callout: "Connects to Yardi, RealPage, Entrata."
3. **Pathfinding** — *"Turn-by-turn navigation inside the community."* Animated path drawing across a community map. Eyebrow: "New — launched March 2026."

### Live Simulation Section
- Label: *"Try a live map."* in small caps eyebrow style
- Clickable SVG floor plan: ~10 units
- Click a unit → popover appears showing: unit number, mock price ($1,450/mo), availability badge (Available / Waitlist), floor plan thumbnail placeholder, "View floor plan" button (non-functional)
- Dark navy card container with subtle rounded corners (matches brand video plate aesthetic)

### Social Proof Bar
- Eyebrow: *"Trusted by leaders in property management"*
- Logo placeholders: Greystar · Venterra · Griffis Residential · Extra Space Storage
- Text treatment only (no actual logo files needed for prototype)

### Bottom CTA Band
- Dark navy background
- Headline: *"Pricing that scales with your portfolio."*
- Single CTA: "See pricing →" (brand blue pill button)
- Routes to `/pricing`

---

## Page 2: Pricing Page (`/pricing`)

### Nav
Same as demo page.

### Header
- White background
- Eyebrow: *"Pricing"* (small caps, `--text-body` gray)
- **Headline**: *"Scale your portfolio without scaling your costs."*
- **Subhead**: *"Per property, per month. Paid annually. No per-seat fees, no long-term contracts."*

### Pricing Matrix
Matches the reference design exactly.

| | ≤100 | 101–200 | 201–500 | 501+ |
|---|---|---|---|---|
| **Apartment units** | ≤100 | 101–200 | 201–500 | 501+ |
| **Monthly subscription** | **$29**/mo | **$49**/mo | **$79**/mo | **$99**/mo |
| **One-time setup** | $175 | $275 | $375 | $475 |

- Card container: white, `#E5E7EB` border, `8px` radius
- Row dividers: `1px` `#E5E7EB`
- Monthly price: large bold type (~36–40px), `/mo` at reduced weight
- Setup fee: regular weight body

**Caption below table**: *"Monthly subscription prices are per property and paid annually."*

### Per-Tier CTAs
Each column footer:
- **"Get Started"** — brand blue fill, white text, full-width within column, `6px` radius (primary)
- **"Need to speak with a sales rep?"** — `text-sm`, `#6B7280` gray, no button chrome, text link centered below primary button

Clicking "Get Started" → navigates to `/confirm/[tier]` using these slugs:

| Units | Slug | Display name |
|---|---|---|
| ≤100 | `essential` | Essential |
| 101–200 | `growth` | Growth |
| 201–500 | `scale` | Scale |
| 501+ | `enterprise` | Enterprise |
Clicking "Need to speak with a sales rep?" → opens a modal with a calendar placeholder UI (styled, non-functional).

### Trust Strip
Three inline items below the table:
*No long-term contracts · Cancel anytime · Onboarding included*

### FAQ Accordion
Three items (shadcn Accordion component):
1. *What's included in the one-time setup?*
2. *Can I manage multiple properties under one account?*
3. *What property management systems do you connect to?*

Answers: 2–3 sentences each, informational but not commitment-binding.

---

## Page 3: Confirmation Screen (`/confirm/[tier]`)

- White background, centered layout
- Checkmark icon (brand blue)
- **Headline**: *"You're on your way."*
- **Subhead**: *"You selected the [Display Name] plan (e.g. 'Growth'). Our team will reach out within 1 business day to get your map live."*
- Secondary CTA: "Back to pricing" (text link)
- Prototype note: no form submission, no email capture, no Stripe

---

## Sales Rep Modal

Triggered by "Need to speak with a sales rep?" on any pricing tier.

- shadcn Dialog component
- **Headline**: *"Let's find time to talk."*
- Body: *"A SightMap specialist will walk you through setup, integrations, and what to expect in your first 30 days."*
- Placeholder calendar UI: a simple week grid (Mon–Fri, 3 time slots each), visually styled but non-interactive
- CTA: "Book a time" (brand blue button, non-functional in prototype)
- Close X top-right

---

## Animation Notes

- Scroll reveals: `framer-motion` `whileInView` with `once: true`, `y: 20 → 0`, `opacity: 0 → 1`, `duration: 0.5`
- Map unit pulse: CSS keyframe animation, 3s loop, opacity 0.4 → 1 → 0.4
- Popover: `framer-motion` scale + fade, `0.15s`
- No parallax, no heavy 3D transforms — keep it snappy

---

## Out of Scope (Day 1)

- Stripe checkout
- Calendly embed
- HubSpot form submission
- Email capture
- Analytics / event tracking
- Auth / account creation
- Real PMS data
- Actual SightMap embed
- Real logo assets (text placeholders only)
