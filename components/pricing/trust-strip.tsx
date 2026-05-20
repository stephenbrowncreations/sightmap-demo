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
