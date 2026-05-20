import { Nav } from '@/components/nav'
import { PricingMatrix } from '@/components/pricing/pricing-matrix'
import { TrustStrip } from '@/components/pricing/trust-strip'
import { FaqAccordion } from '@/components/pricing/faq-accordion'

export default function PricingPage() {
  return (
    <>
      <Nav />
      <main className="pt-16 min-h-screen bg-white">
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

        <section className="max-w-7xl mx-auto px-6 lg:px-12 pb-8">
          <PricingMatrix />
        </section>

        <section className="max-w-7xl mx-auto px-6 lg:px-12 pb-12">
          <TrustStrip />
        </section>

        <section className="max-w-7xl mx-auto px-6 lg:px-12 pb-24">
          <FaqAccordion />
        </section>
      </main>
    </>
  )
}
