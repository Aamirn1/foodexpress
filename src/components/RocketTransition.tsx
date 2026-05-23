'use client'

import { motion, AnimatePresence } from 'framer-motion'
import { useEffect, useState } from 'react'

interface RocketTransitionProps {
  isActive: boolean
  onComplete: () => void
}

export default function RocketTransition({ isActive, onComplete }: RocketTransitionProps) {
  const [phase, setPhase] = useState<'idle' | 'launch' | 'zoom'>('idle')

  useEffect(() => {
    if (isActive) {
      // Phase 1: Rocket appears and launches
      setPhase('launch')
      // Phase 2: Rocket zooms up and screen transitions
      const zoomTimer = setTimeout(() => setPhase('zoom'), 800)
      // Complete after animation
      const completeTimer = setTimeout(() => {
        setPhase('idle')
        onComplete()
      }, 1800)
      return () => {
        clearTimeout(zoomTimer)
        clearTimeout(completeTimer)
      }
    }
  }, [isActive, onComplete])

  return (
    <AnimatePresence>
      {isActive && (
        <motion.div
          className="fixed inset-0 z-[100] pointer-events-none"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
        >
          {/* Dark overlay that fades in */}
          <motion.div
            className="absolute inset-0 bg-black"
            initial={{ opacity: 0 }}
            animate={{ opacity: phase === 'zoom' ? 1 : 0.6 }}
            transition={{ duration: 0.5 }}
          />

          {/* Fire trail particles */}
          {phase === 'launch' && (
            <div className="absolute bottom-0 left-0 right-0">
              {Array.from({ length: 12 }).map((_, i) => (
                <motion.div
                  key={i}
                  className="absolute rounded-full"
                  style={{
                    left: `${15 + Math.random() * 20}%`,
                    bottom: `${10 + Math.random() * 5}%`,
                    width: 8 + Math.random() * 12,
                    height: 8 + Math.random() * 12,
                    background: `hsl(${Math.random() * 40 + 15}, 100%, ${50 + Math.random() * 30}%)`,
                  }}
                  initial={{ opacity: 1, scale: 1, y: 0 }}
                  animate={{
                    opacity: 0,
                    scale: 0,
                    y: -(100 + Math.random() * 200),
                    x: (Math.random() - 0.5) * 100,
                  }}
                  transition={{ duration: 0.8 + Math.random() * 0.5, delay: Math.random() * 0.3 }}
                />
              ))}
            </div>
          )}

          {/* Rocket */}
          <motion.div
            className="absolute"
            style={{ left: '12%', bottom: '5%' }}
            initial={{ y: 0, x: 0, scale: 0.8, opacity: 0 }}
            animate={
              phase === 'launch'
                ? { y: -200, x: 50, scale: 1, opacity: 1, rotate: -30 }
                : { y: -1200, x: 200, scale: 1.2, opacity: 0, rotate: -45 }
            }
            transition={{
              duration: phase === 'launch' ? 0.8 : 0.8,
              ease: phase === 'launch' ? 'easeOut' : [0.25, 0.46, 0.45, 0.94],
            }}
          >
            <img
              src="/images/rocket-animation.png"
              alt="Rocket"
              className="w-24 h-24 sm:w-32 sm:h-32 drop-shadow-2xl"
              style={{ filter: 'drop-shadow(0 0 20px rgba(255, 100, 0, 0.6))' }}
            />
          </motion.div>

          {/* Screen flash effect */}
          {phase === 'zoom' && (
            <motion.div
              className="absolute inset-0 bg-fire-gradient"
              initial={{ opacity: 0 }}
              animate={{ opacity: [0, 0.8, 0] }}
              transition={{ duration: 0.6 }}
            />
          )}

          {/* "Blasting Off!" text */}
          <motion.div
            className="absolute inset-0 flex items-center justify-center"
            initial={{ opacity: 0 }}
            animate={{ opacity: phase === 'launch' ? 1 : 0 }}
            transition={{ duration: 0.3 }}
          >
            <motion.h2
              className="text-3xl sm:text-5xl font-serif font-black text-white drop-shadow-lg"
              initial={{ y: 20, scale: 0.9 }}
              animate={{ y: 0, scale: 1 }}
              transition={{ duration: 0.4, delay: 0.2 }}
              style={{
                textShadow: '0 0 30px rgba(255, 100, 0, 0.8), 0 0 60px rgba(255, 50, 0, 0.4)',
              }}
            >
              🚀 Blasting Off!
            </motion.h2>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  )
}
