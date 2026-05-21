'use client'

import { useState } from 'react'
import { useRouter } from 'next/navigation'
import { TIERS, type Tier } from '@/lib/pricing'
import { SalesModal } from './sales-modal'

export function PricingMatrix() {
  const router = useRouter()
  const [modalOpen, setModalOpen] = useState(false)
  const [selectedTier, setSelectedTier] = useState<Tier | null>(null)

  function handleGetStarted(tier: Tier) {
    router.push(`/confirm/${tier.slug}`)
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
          {/* Header row */}
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

          {/* Monthly subscription */}
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

          {/* One-time setup */}
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
