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
        <rect x="20"  y="20"  width="50" height="50" rx="3" fill="#1E3A5F" />
        <rect x="80"  y="20"  width="50" height="50" rx="3" fill="#1E3A5F" />
        <rect x="160" y="20"  width="50" height="50" rx="3" fill="#1E3A5F" />
        <rect x="20"  y="130" width="50" height="50" rx="3" fill="#1E3A5F" />
        <rect x="160" y="130" width="100" height="50" rx="3" fill="#2563EB" opacity="0.3" />
        <polyline
          points="45,130 45,80 185,80 185,130"
          fill="none"
          stroke="#2563EB"
          strokeWidth="2.5"
          strokeDasharray="6 3"
          strokeLinecap="round"
        />
        <circle cx="45" cy="155" r="6" fill="#4ADE80" />
        <text x="45" y="175" textAnchor="middle" fill="white" fontSize="8" opacity="0.5">Start</text>
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
