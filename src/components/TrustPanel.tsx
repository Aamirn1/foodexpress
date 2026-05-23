'use client'

import { motion } from 'framer-motion'
import { Leaf, Truck, Award, Clock } from 'lucide-react'

const trustItems = [
  { icon: Leaf, label: 'Fresh Ingredients', color: 'text-green-400' },
  { icon: Truck, label: 'Fast Delivery', color: 'text-primary' },
  { icon: Award, label: 'Award Winning Taste', color: 'text-accent' },
  { icon: Clock, label: '24/7 Service', color: 'text-blue-400' },
]

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
        {/* Trust Icons Row */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-6 md:gap-8">
          {trustItems.map((item, i) => (
            <motion.div
              key={item.label}
              className="flex flex-col items-center gap-3 text-center"
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: i * 0.1 }}
            >
              <div className="w-12 h-12 rounded-full bg-background flex items-center justify-center border border-border">
                <item.icon className={`w-6 h-6 ${item.color}`} />
              </div>
              <span className="text-foreground/80 text-sm font-medium">{item.label}</span>
            </motion.div>
          ))}
        </div>

        {/* Divider */}
        <div className="my-8 h-px bg-border" />

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
