'use client'

import { motion } from 'framer-motion'
import { ShieldCheck, ChefHat, Zap } from 'lucide-react'

const features = [
  {
    icon: ShieldCheck,
    title: 'Quality First',
    description: 'We source only the finest ingredients from trusted local suppliers for every dish we serve.',
    color: 'text-primary',
  },
  {
    icon: ChefHat,
    title: 'Made Fresh',
    description: 'Every order is prepared fresh to guarantee the best taste and quality in every bite.',
    color: 'text-accent',
  },
  {
    icon: Zap,
    title: 'Fast Service',
    description: 'Lightning-fast preparation without compromising quality — hot food, delivered fast.',
    color: 'text-blue-400',
  },
]

export default function AboutSection() {
  return (
    <section id="about" className="py-16 md:py-24">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid lg:grid-cols-2 gap-12 lg:gap-16 items-center">
          {/* Left - Text */}
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.7 }}
          >
            <h2 className="font-serif text-3xl md:text-4xl lg:text-5xl font-black">
              Our Story{' '}
              <span className="text-fire-gradient">Since 2009</span>
            </h2>
            <div className="w-20 h-1 bg-fire-gradient rounded-full mt-4 mb-6" />

            <p className="text-foreground/70 leading-relaxed mb-4">
              Food Express was born from a simple belief: fast food doesn&apos;t have to
              mean compromise. Founded in 2009, we set out to redefine what quick-service
              dining could be — bold flavors, premium ingredients, and an experience
              that keeps you coming back.
            </p>
            <p className="text-foreground/70 leading-relaxed mb-8">
              From our flame-grilled burgers to our wood-fired pizzas, every dish is crafted
              with passion and precision. We believe that great food should be accessible,
              fast, and absolutely delicious. That&apos;s the Food Express promise.
            </p>

            {/* Feature Cards */}
            <div className="space-y-4">
              {features.map((feature, i) => (
                <motion.div
                  key={feature.title}
                  className="flex items-start gap-4 p-4 rounded-xl border border-border bg-card/50 card-glow"
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.5, delay: i * 0.1 }}
                >
                  <div className="w-10 h-10 rounded-lg bg-background flex items-center justify-center border border-border shrink-0">
                    <feature.icon className={`w-5 h-5 ${feature.color}`} />
                  </div>
                  <div>
                    <h3 className="font-serif font-bold text-foreground">{feature.title}</h3>
                    <p className="text-muted-foreground text-sm mt-1">{feature.description}</p>
                  </div>
                </motion.div>
              ))}
            </div>
          </motion.div>

          {/* Right - Decorative */}
          <motion.div
            className="relative hidden lg:flex items-center justify-center"
            initial={{ opacity: 0, x: 30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.7 }}
          >
            <div className="relative w-80 h-80">
              {/* Decorative circles */}
              <div className="absolute inset-0 rounded-full border-2 border-primary/20" />
              <div className="absolute inset-4 rounded-full border border-accent/15" />
              <div className="absolute inset-8 rounded-full border border-primary/10" />
              {/* Center flame icon */}
              <div className="absolute inset-0 flex items-center justify-center">
                <div className="text-center">
                  <div className="text-8xl mb-2" style={{ animation: 'fire-flicker 1s ease-in-out infinite' }}>
                    🔥
                  </div>
                  <span className="text-fire-gradient font-serif font-black text-3xl">15+</span>
                  <p className="text-muted-foreground text-sm mt-1">Years of Flavor</p>
                </div>
              </div>
              {/* Floating dots */}
              <motion.div
                className="absolute top-4 right-4 w-3 h-3 rounded-full bg-primary"
                animate={{ y: [0, -10, 0] }}
                transition={{ duration: 3, repeat: Infinity, ease: 'easeInOut' }}
              />
              <motion.div
                className="absolute bottom-8 left-8 w-2 h-2 rounded-full bg-accent"
                animate={{ y: [0, -8, 0] }}
                transition={{ duration: 4, repeat: Infinity, ease: 'easeInOut', delay: 1 }}
              />
              <motion.div
                className="absolute top-1/2 -right-2 w-2 h-2 rounded-full bg-primary/60"
                animate={{ y: [0, -6, 0] }}
                transition={{ duration: 2.5, repeat: Infinity, ease: 'easeInOut', delay: 0.5 }}
              />
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  )
}
