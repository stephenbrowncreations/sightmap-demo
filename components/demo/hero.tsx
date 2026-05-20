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
      <rect width="340" height="280" rx="12" fill="#0F1F3D" />
      <rect x="120" y="110" width="100" height="70" fill="#0A1A2E" opacity="0.6" />
      <text x="170" y="150" textAnchor="middle" fill="white" fontSize="10" opacity="0.4">HALL</text>
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
