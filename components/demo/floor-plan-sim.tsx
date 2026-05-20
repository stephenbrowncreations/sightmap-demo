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
          aria-label="Interactive floor plan"
        >
          <rect width="430" height="280" rx="8" fill="#0F1F3D" />
          <rect x="110" y="95" width="100" height="85" fill="#091626" />
          <text x="160" y="142" textAnchor="middle" fill="white" fontSize="9" opacity="0.3" fontWeight="500">
            HALLWAY
          </text>

          {UNITS.map(unit => (
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
