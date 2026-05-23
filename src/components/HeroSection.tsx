'use client'

import { useState, useEffect } from 'react'
import Link from 'next/link'
import { motion, AnimatePresence } from 'framer-motion'
import { ChevronDown } from 'lucide-react'
import { Button } from '@/components/ui/button'

const typewriterWords = ['Fire', 'Flavor', 'Passion', 'Excellence', 'Perfection']

function TypewriterText() {
  const [wordIndex, setWordIndex] = useState(0)
  const [charIndex, setCharIndex] = useState(0)
  const [isDeleting, setIsDeleting] = useState(false)

  useEffect(() => {
    const currentWord = typewriterWords[wordIndex]
    let timeout: NodeJS.Timeout

    if (!isDeleting && charIndex < currentWord.length) {
      // Typing
      timeout = setTimeout(() => setCharIndex((c) => c + 1), 120)
    } else if (!isDeleting && charIndex === currentWord.length) {
      // Pause at end of word, then start deleting
      timeout = setTimeout(() => setIsDeleting(true), 2200)
    } else if (isDeleting && charIndex > 0) {
      // Deleting
      timeout = setTimeout(() => setCharIndex((c) => c - 1), 70)
    } else if (isDeleting && charIndex === 0) {
      // Move to next word - use setTimeout to avoid synchronous setState in effect
      timeout = setTimeout(() => {
        setIsDeleting(false)
        setWordIndex((prev) => (prev + 1) % typewriterWords.length)
      }, 50)
    }

    return () => clearTimeout(timeout)
  }, [charIndex, isDeleting, wordIndex])

  const currentWord = typewriterWords[wordIndex]
  const displayText = currentWord.slice(0, charIndex)

  return (
    <span className="relative inline-flex items-center">
      <AnimatePresence mode="wait">
        <motion.span
          key={wordIndex}
          className="text-fire-gradient"
          initial={{ opacity: 0.7 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.2 }}
        >
          {displayText}
        </motion.span>
      </AnimatePresence>
      <motion.span
        className="text-primary ml-0.5 inline-block"
        animate={{ opacity: [1, 0] }}
        transition={{ duration: 0.6, repeat: Infinity, repeatType: 'reverse' }}
      >
        |
      </motion.span>
    </span>
  )
}

export default function HeroSection() {
  return (
    <section className="relative min-h-screen flex items-center justify-center overflow-hidden">
      {/* Background Image */}
      <div
        className="absolute inset-0 bg-cover bg-center bg-no-repeat"
        style={{ backgroundImage: "url('/images/hero-banner.png')" }}
      />
      {/* Dark Overlay */}
      <div className="absolute inset-0 bg-gradient-to-b from-background/80 via-background/60 to-background" />
      {/* Fire particles overlay */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        {[...Array(6)].map((_, i) => (
          <motion.div
            key={i}
            className="absolute w-1 h-1 rounded-full bg-primary/40"
            style={{
              left: `${15 + i * 15}%`,
              bottom: '10%',
            }}
            animate={{
              y: [0, -200, -400],
              opacity: [0, 0.8, 0],
              scale: [0.5, 1, 0.3],
            }}
            transition={{
              duration: 3 + i * 0.5,
              repeat: Infinity,
              delay: i * 0.7,
              ease: 'easeOut',
            }}
          />
        ))}
      </div>
      {/* Fire gradient accent at bottom */}
      <div className="absolute bottom-0 left-0 right-0 h-1 bg-fire-gradient" />

      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.2 }}
          className="mb-4"
        >
          <span className="inline-block px-4 py-1.5 rounded-full border border-primary/30 bg-primary/10 text-primary text-sm font-medium tracking-wider uppercase">
            Premium Fast Food Restaurant
          </span>
        </motion.div>

        <motion.h1
          className="font-serif text-5xl sm:text-6xl md:text-7xl lg:text-8xl font-black leading-tight"
          initial={{ opacity: 0, y: 40 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.4 }}
        >
          <span className="block text-foreground">Where Flavor Meets</span>
          <div className="mt-2 min-h-[1.2em] flex items-center justify-center">
            <TypewriterText />
          </div>
        </motion.h1>

        <motion.p
          className="mt-6 text-lg md:text-xl text-foreground/70 max-w-2xl mx-auto leading-relaxed"
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.6 }}
        >
          Experience the boldest flavors in town. From sizzling burgers to wood-fired
          pizzas — every bite is a masterpiece.
        </motion.p>

        <motion.div
          className="mt-10 flex flex-col sm:flex-row items-center justify-center gap-4"
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.8 }}
        >
          <Link href="/menu">
            <Button
              className="bg-fire-gradient text-primary-foreground font-semibold px-8 py-6 text-lg btn-fire-glow hover:opacity-90 transition-opacity"
              size="lg"
            >
              Order Now
            </Button>
          </Link>
          <Link href="/menu">
            <Button
              variant="outline"
              className="border-primary/50 text-primary hover:bg-primary/10 font-semibold px-8 py-6 text-lg"
              size="lg"
            >
              View Menu
            </Button>
          </Link>
        </motion.div>
      </div>

      {/* Scroll Indicator */}
      <motion.div
        className="absolute bottom-8 left-1/2 -translate-x-1/2"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 1, delay: 1.5 }}
      >
        <motion.div
          animate={{ y: [0, 10, 0] }}
          transition={{ duration: 1.5, repeat: Infinity, ease: 'easeInOut' }}
          className="flex flex-col items-center gap-2 cursor-pointer"
          onClick={() => document.querySelector('#menu')?.scrollIntoView({ behavior: 'smooth' })}
        >
          <span className="text-foreground/50 text-xs tracking-widest uppercase">Scroll</span>
          <ChevronDown className="w-5 h-5 text-primary" />
        </motion.div>
      </motion.div>
    </section>
  )
}
