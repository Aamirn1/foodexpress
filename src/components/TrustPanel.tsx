'use client'

import { motion } from 'framer-motion'

const counters = [
  { value: '10,000+', label: 'Happy Customers' },
  { value: '50,000+', label: 'Orders Served' },
  { value: '15+', label: 'Years Experience' },
  { value: '99%', label: 'Satisfaction' },
]

export default function TrustPanel() {
  return (
    <section className="relative border-y border-border bg-secondary/50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10 md:py-14">
        {/* Counters Row */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-6 md:gap-8">
          {counters.map((counter, i) => (
            <motion.div
              key={counter.label}
              className="text-center"
              initial={{ opacity: 0, scale: 0.9 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: i * 0.1 }}
            >
              <div className="text-2xl md:text-3xl font-serif font-black text-fire-gradient">
                {counter.value}
              </div>
              <div className="text-muted-foreground text-sm mt-1">{counter.label}</div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  )
}
