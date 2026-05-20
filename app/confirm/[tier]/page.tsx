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
          <div className="w-16 h-16 rounded-full bg-brand-blue/10 flex items-center justify-center mx-auto mb-6">
            <svg className="w-8 h-8 text-brand-blue" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
            </svg>
          </div>

          <h1 className="text-3xl font-bold text-brand-black tracking-tight mb-4">
            You&apos;re on your way.
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
