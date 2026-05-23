'use client'

import { motion, type Variants } from 'framer-motion'
import { type ReactNode } from 'react'

type Direction = 'up' | 'down' | 'left' | 'right'

interface ScrollRevealProps {
  direction?: Direction
  delay?: number
  duration?: number
  children: ReactNode
  className?: string
}

function getDirectionOffset(direction: Direction): { x: number; y: number } {
  switch (direction) {
    case 'up':
      return { x: 0, y: 40 }
    case 'down':
      return { x: 0, y: -40 }
    case 'left':
      return { x: 40, y: 0 }
    case 'right':
      return { x: -40, y: 0 }
  }
}

export default function ScrollReveal({
  direction = 'up',
  delay = 0,
  duration = 0.6,
  children,
  className,
}: ScrollRevealProps) {
  const offset = getDirectionOffset(direction)

  const variants: Variants = {
    hidden: {
      opacity: 0,
      x: offset.x,
      y: offset.y,
    },
    visible: {
      opacity: 1,
      x: 0,
      y: 0,
      transition: {
        duration,
        delay,
        ease: [0.25, 0.46, 0.45, 0.94],
      },
    },
  }

  return (
    <motion.div
      variants={variants}
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true, margin: '-50px' }}
      className={className}
    >
      {children}
    </motion.div>
  )
}
