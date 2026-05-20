'use client'

import { motion } from 'framer-motion'

interface FeatureRevealProps {
  id?: string
  eyebrow?: string
  headline: string
  body: string
  callout?: string
  imageLeft?: boolean
  illustration: React.ReactNode
}

export function FeatureReveal({
  id,
  eyebrow,
  headline,
  body,
  callout,
  imageLeft = false,
  illustration,
}: FeatureRevealProps) {
  const textCol = (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.5 }}
      className="flex flex-col justify-center"
    >
      {eyebrow && (
        <p className="text-brand-blue text-xs font-semibold tracking-widest uppercase mb-3">
          {eyebrow}
        </p>
      )}
      <h2 className="text-3xl font-bold text-brand-black tracking-tight mb-4">
        {headline}
      </h2>
      <p className="text-text-body text-lg leading-relaxed">
        {body}
      </p>
      {callout && (
        <p className="mt-4 text-sm text-text-body font-medium border-l-2 border-brand-blue pl-3">
          {callout}
        </p>
      )}
    </motion.div>
  )

  const imgCol = (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.5, delay: 0.1 }}
      className="flex justify-center"
    >
      {illustration}
    </motion.div>
  )

  return (
    <div
      id={id}
      className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center max-w-7xl mx-auto w-full px-6 lg:px-12 py-24"
    >
      {imageLeft ? (
        <>{imgCol}{textCol}</>
      ) : (
        <>{textCol}{imgCol}</>
      )}
    </div>
  )
}
