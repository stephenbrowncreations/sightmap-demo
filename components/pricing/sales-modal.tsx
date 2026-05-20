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
            Let&apos;s find time to talk.
          </DialogTitle>
          <DialogDescription>
            A SightMap specialist will walk you through setup, integrations, and what
            to expect in your first 30 days.
            {tier && (
              <span className="block mt-1 text-xs text-brand-blue font-medium">
                Inquiring about the {tier.displayName} plan
              </span>
            )}
          </DialogDescription>
        </DialogHeader>

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
