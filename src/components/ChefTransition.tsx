'use client'

import { motion, AnimatePresence } from 'framer-motion'
import { useEffect, useState } from 'react'

interface ChefTransitionProps {
  isActive: boolean
  onComplete: () => void
}

export default function ChefTransition({ isActive, onComplete }: ChefTransitionProps) {
  const [phase, setPhase] = useState<'idle' | 'entrance' | 'celebrate' | 'fade'>('idle')

  useEffect(() => {
    if (isActive) {
      // Phase 1: Chef slides in from bottom
      setPhase('entrance')
      // Phase 2: Celebration with confetti
      const celebrateTimer = setTimeout(() => setPhase('celebrate'), 600)
      // Phase 3: Fade out
      const fadeTimer = setTimeout(() => setPhase('fade'), 2500)
      // Complete
      const completeTimer = setTimeout(() => {
        setPhase('idle')
        onComplete()
      }, 3200)
      return () => {
        clearTimeout(celebrateTimer)
        clearTimeout(fadeTimer)
        clearTimeout(completeTimer)
      }
    }
  }, [isActive, onComplete])

  return (
    <AnimatePresence>
      {isActive && (
        <motion.div
          className="fixed inset-0 z-[100] flex items-center justify-center"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
        >
          {/* Dark overlay */}
          <motion.div
            className="absolute inset-0 bg-black/80 backdrop-blur-sm"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.3 }}
          />

          {/* Confetti particles */}
          {phase === 'celebrate' && (
            <div className="absolute inset-0 overflow-hidden pointer-events-none">
              {Array.from({ length: 30 }).map((_, i) => (
                <motion.div
                  key={i}
                  className="absolute rounded-sm"
                  style={{
                    left: `${Math.random() * 100}%`,
                    top: '-5%',
                    width: 6 + Math.random() * 8,
                    height: 6 + Math.random() * 8,
                    background: `hsl(${[0, 30, 43, 60, 120, 200][Math.floor(Math.random() * 6)]}, 100%, 60%)`,
                    borderRadius: Math.random() > 0.5 ? '50%' : '2px',
                  }}
                  initial={{ y: 0, x: 0, rotate: 0, opacity: 1 }}
                  animate={{
                    y: window.innerHeight + 100,
                    x: (Math.random() - 0.5) * 200,
                    rotate: Math.random() * 720,
                    opacity: [1, 1, 0],
                  }}
                  transition={{
                    duration: 2 + Math.random() * 1.5,
                    delay: Math.random() * 0.8,
                    ease: 'easeIn',
                  }}
                />
              ))}
            </div>
          )}

          {/* Chef character */}
          <motion.div
            className="relative z-10"
            initial={{ y: 300, scale: 0.5, opacity: 0, rotate: 10 }}
            animate={
              phase === 'entrance'
                ? { y: 0, scale: 1, opacity: 1, rotate: 0 }
                : phase === 'celebrate'
                ? { y: 0, scale: 1, opacity: 1, rotate: [0, -5, 5, -3, 3, 0] }
                : { y: -50, scale: 0.9, opacity: 0 }
            }
            transition={{
              duration: phase === 'entrance' ? 0.6 : phase === 'celebrate' ? 0.8 : 0.5,
              ease: 'easeOut',
            }}
          >
            <div className="relative">
              {/* Glow effect behind chef */}
              <div className="absolute inset-0 -m-4 rounded-full bg-fire-gradient opacity-20 blur-2xl" />
              
              <img
                src="/images/chef-animation.png"
                alt="Chef"
                className="w-40 h-40 sm:w-52 sm:h-52 object-contain drop-shadow-2xl relative z-10"
                style={{ filter: 'drop-shadow(0 0 25px rgba(255, 100, 0, 0.5))' }}
              />
            </div>
          </motion.div>

          {/* "Order Booked!" text */}
          <motion.div
            className="absolute bottom-[28%] sm:bottom-[30%] left-0 right-0 text-center z-20"
            initial={{ opacity: 0, y: 20 }}
            animate={
              phase === 'celebrate'
                ? { opacity: 1, y: 0 }
                : phase === 'fade'
                ? { opacity: 0, y: -20 }
                : { opacity: 0, y: 20 }
            }
            transition={{ duration: 0.4, delay: phase === 'celebrate' ? 0.2 : 0 }}
          >
            <h2
              className="text-3xl sm:text-5xl font-serif font-black text-white mb-2"
              style={{
                textShadow: '0 0 30px rgba(255, 100, 0, 0.8), 0 0 60px rgba(255, 50, 0, 0.4)',
              }}
            >
              🔥 Order Booked!
            </h2>
            <p className="text-orange-200 text-sm sm:text-base font-medium">
              Your delicious meal is being prepared!
            </p>
          </motion.div>

          {/* Ringing bell animation */}
          {phase === 'celebrate' && (
            <motion.div
              className="absolute top-[15%] right-[20%] sm:top-[20%] sm:right-[25%] z-20"
              initial={{ opacity: 0, scale: 0 }}
              animate={{ opacity: 1, scale: [0, 1.2, 1], rotate: [0, 15, -15, 10, -10, 0] }}
              transition={{ duration: 0.6, delay: 0.4 }}
            >
              <span className="text-4xl sm:text-6xl">🔔</span>
            </motion.div>
          )}

          {/* Sparkle effects around chef */}
          {phase === 'celebrate' && (
            <>
              {Array.from({ length: 6 }).map((_, i) => {
                const angle = (i * 60 * Math.PI) / 180
                const radius = 120
                return (
                  <motion.div
                    key={`sparkle-${i}`}
                    className="absolute z-20 text-xl sm:text-2xl"
                    style={{
                      left: `calc(50% + ${Math.cos(angle) * radius}px - 10px)`,
                      top: `calc(45% + ${Math.sin(angle) * radius}px - 10px)`,
                    }}
                    initial={{ opacity: 0, scale: 0 }}
                    animate={{ opacity: [0, 1, 0], scale: [0, 1.5, 0] }}
                    transition={{ duration: 0.8, delay: 0.3 + i * 0.1, repeat: 1 }}
                  >
                    ✨
                  </motion.div>
                )
              })}
            </>
          )}
        </motion.div>
      )}
    </AnimatePresence>
  )
}
