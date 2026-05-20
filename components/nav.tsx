'use client'

import Link from 'next/link'
import { usePathname } from 'next/navigation'
import { Logo } from './logo'

export function Nav() {
  const pathname = usePathname()
  const isDark = pathname === '/'

  return (
    <nav
      className={`fixed top-0 left-0 right-0 z-50 flex items-center h-16 px-6 lg:px-12 ${
        isDark ? 'bg-surface-dark' : 'bg-white border-b border-border-default'
      }`}
    >
      <Logo variant={isDark ? 'light' : 'dark'} />

      <div
        className={`mx-6 h-5 w-px ${isDark ? 'bg-white/20' : 'bg-border-default'}`}
        aria-hidden="true"
      />

      <div className="flex items-center gap-6 flex-1">
        <Link
          href="/pricing"
          className={`text-sm font-medium transition-colors ${
            isDark
              ? 'text-white/70 hover:text-white'
              : 'text-text-body hover:text-brand-black'
          }`}
        >
          Pricing
        </Link>
        <Link
          href="#features"
          className={`text-sm font-medium transition-colors ${
            isDark
              ? 'text-white/70 hover:text-white'
              : 'text-text-body hover:text-brand-black'
          }`}
        >
          Features
        </Link>
      </div>

      <Link
        href="/pricing"
        className="text-sm font-medium text-white bg-brand-blue hover:bg-brand-blue-hover px-4 py-2 transition-colors"
        style={{ borderRadius: 'var(--radius-button)' }}
      >
        Get Started
      </Link>
    </nav>
  )
}
