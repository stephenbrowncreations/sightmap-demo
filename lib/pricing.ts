export type TierSlug = 'essential' | 'growth' | 'scale' | 'enterprise'

export interface Tier {
  slug: TierSlug
  displayName: string
  units: string
  monthlyPrice: number
  setupFee: number
}

export const TIERS: Tier[] = [
  { slug: 'essential',  displayName: 'Essential',  units: '≤100',    monthlyPrice: 29,  setupFee: 175 },
  { slug: 'growth',     displayName: 'Growth',     units: '101–200', monthlyPrice: 49,  setupFee: 275 },
  { slug: 'scale',      displayName: 'Scale',      units: '201–500', monthlyPrice: 79,  setupFee: 375 },
  { slug: 'enterprise', displayName: 'Enterprise', units: '501+',    monthlyPrice: 99,  setupFee: 475 },
]

export function getTierBySlug(slug: string): Tier | undefined {
  return TIERS.find(t => t.slug === slug)
}

export const VALID_SLUGS = TIERS.map(t => t.slug)
