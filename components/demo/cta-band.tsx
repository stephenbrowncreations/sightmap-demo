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
