'use client'

import { motion } from 'framer-motion'

const LOGOS = ['Greystar', 'Venterra', 'Griffis Residential', 'Extra Space Storage']

export function SocialProof() {
  return (
    <section className="py-16 border-y border-border-default">
      <div className="max-w-7xl mx-auto px-6 lg:px-12 text-center">
        <p className="text-xs font-semibold tracking-widest uppercase text-text-body mb-8">
          Trusted by leaders in property management
        </p>
        <div className="flex flex-wrap justify-center items-center gap-8 lg:gap-16">
          {LOGOS.map((name, i) => (
            <motion.span
              key={name}
              initial={{ opacity: 0 }}
              whileInView={{ opacity: 1 }}
              viewport={{ once: true }}
              transition={{ duration: 0.4, delay: i * 0.1 }}
              className="text-lg font-semibold text-gray-300 tracking-tight"
            >
              {name}
            </motion.span>
          ))}
        </div>
      </div>
    </section>
  )
}
