'use client'

import { useState, useEffect } from 'react'
import { motion } from 'framer-motion'
import Image from 'next/image'
import { Clock, Flame } from 'lucide-react'
import { Button } from '@/components/ui/button'
import { Badge } from '@/components/ui/badge'

export default function SpecialsSection() {
  const [timeLeft, setTimeLeft] = useState({ hours: 5, minutes: 42, seconds: 18 })

  useEffect(() => {
    const timer = setInterval(() => {
      setTimeLeft((prev) => {
        let { hours, minutes, seconds } = prev
        seconds--
        if (seconds < 0) {
          seconds = 59
          minutes--
        }
        if (minutes < 0) {
          minutes = 59
          hours--
        }
        if (hours < 0) {
          hours = 23
          minutes = 59
          seconds = 59
        }
        return { hours, minutes, seconds }
      })
    }, 1000)
    return () => clearInterval(timer)
  }, [])

  const pad = (n: number) => n.toString().padStart(2, '0')

  return (
    <section id="specials" className="py-16 md:py-24 relative overflow-hidden">
      {/* Background gradient */}
      <div className="absolute inset-0 bg-gradient-to-r from-background via-secondary/50 to-background" />
      <div
        className="absolute inset-0 opacity-5"
        style={{
          backgroundImage: 'radial-gradient(circle at 20% 50%, hsl(18 100% 60% / 0.3), transparent 50%), radial-gradient(circle at 80% 50%, hsl(43 100% 50% / 0.2), transparent 50%)',
        }}
      />

      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid md:grid-cols-2 gap-8 md:gap-12 items-center">
          {/* Left - Image */}
          <motion.div
            className="relative"
            initial={{ opacity: 0, x: -40 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.7 }}
          >
            <div className="relative w-full max-w-md mx-auto aspect-square">
              <div className="absolute -inset-4 bg-fire-gradient rounded-2xl opacity-20 blur-2xl" />
              <div className="relative w-full h-full overflow-hidden rounded-2xl border border-border">
                <Image
                  src="/images/product-double-smash-burger.png"
                  alt="Double Smash Burger"
                  fill
                  className="object-cover"
                  sizes="(max-width: 768px) 100vw, 50vw"
                  priority
                />
              </div>
            </div>
          </motion.div>

          {/* Right - Content */}
          <motion.div
            initial={{ opacity: 0, x: 40 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.7 }}
          >
            <Badge className="bg-fire-gradient text-primary-foreground border-0 mb-4">
              <Flame className="w-3 h-3 mr-1" />
              Today&apos;s Special
            </Badge>

            <h2 className="font-serif text-3xl md:text-4xl lg:text-5xl font-black text-foreground">
              Double Smash Burger
            </h2>

            <div className="flex items-center gap-3 mt-4">
              <span className="text-3xl font-black text-fire-gradient">Rs. 1,200</span>
              <span className="text-xl text-muted-foreground line-through">Rs. 1,500</span>
              <Badge variant="outline" className="border-primary text-primary">
                Save Rs. 300
              </Badge>
            </div>

            <p className="text-foreground/70 mt-4 leading-relaxed">
              Two smashed beef patties, double American cheese, caramelized onions,
              pickles, and our smoky house sauce on a toasted brioche bun. Limited time only!
            </p>

            {/* Countdown */}
            <div className="mt-6">
              <div className="flex items-center gap-2 text-muted-foreground text-sm mb-3">
                <Clock className="w-4 h-4 text-primary" />
                Offer ends in:
              </div>
              <div className="flex gap-3">
                {[
                  { value: pad(timeLeft.hours), label: 'HRS' },
                  { value: pad(timeLeft.minutes), label: 'MIN' },
                  { value: pad(timeLeft.seconds), label: 'SEC' },
                ].map((t) => (
                  <div key={t.label} className="bg-card border border-border rounded-lg px-3 py-2 text-center min-w-[60px]">
                    <div className="text-2xl font-black text-fire-gradient">{t.value}</div>
                    <div className="text-xs text-muted-foreground">{t.label}</div>
                  </div>
                ))}
              </div>
            </div>

            <Button
              className="mt-8 bg-fire-gradient text-primary-foreground font-semibold px-8 py-6 text-lg btn-fire-glow hover:opacity-90 transition-opacity"
              size="lg"
            >
              Order Now
            </Button>
          </motion.div>
        </div>
      </div>
    </section>
  )
}
