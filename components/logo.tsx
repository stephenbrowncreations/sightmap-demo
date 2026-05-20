interface LogoProps {
  variant?: 'dark' | 'light'
  className?: string
}

export function Logo({ variant = 'dark', className = '' }: LogoProps) {
  const wordmarkColor = variant === 'light' ? '#FFFFFF' : '#111418'

  return (
    <div className={`flex items-center gap-2.5 ${className}`}>
      <svg width="32" height="32" viewBox="0 0 32 32" fill="none" aria-hidden="true">
        <polygon points="16,2 30,10 16,18 2,10" fill="#111418" />
        <polygon points="2,10 16,18 16,30 2,22" fill="#2563EB" />
        <polygon points="30,10 16,18 16,30 30,22" fill="#2563EB" opacity="0.75" />
        <circle cx="16" cy="10" r="3" fill="white" />
        <circle cx="16" cy="10" r="1.2" fill="#111418" />
      </svg>
      <span
        className="text-[17px] font-semibold tracking-tight"
        style={{ color: wordmarkColor }}
      >
        SightMap<sup className="text-[9px] align-super">®</sup>
      </span>
    </div>
  )
}
