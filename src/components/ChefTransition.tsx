'use client'

import { motion, AnimatePresence } from 'framer-motion'
import { useEffect, useState, useCallback } from 'react'

interface ChefTransitionProps {
  isActive: boolean
  onComplete: () => void
}

export default function ChefTransition({ isActive, onComplete }: ChefTransitionProps) {
  const [phase, setPhase] = useState<'idle' | 'entrance' | 'celebrate' | 'fade'>('idle')

  const stableOnComplete = useCallback(onComplete, [onComplete])

  useEffect(() => {
    if (isActive) {
      // Phase 1: Chef slides in from bottom (0-1.2s)
      setPhase('entrance')
      // Phase 2: Celebration with confetti & sparkles (1.2-3.5s)
      const celebrateTimer = setTimeout(() => setPhase('celebrate'), 1200)
      // Phase 3: Fade out (3.5-4.2s)
      const fadeTimer = setTimeout(() => setPhase('fade'), 3500)
      // Complete after full animation (4.5s total)
      const completeTimer = setTimeout(() => {
        setPhase('idle')
        stableOnComplete()
      }, 4500)
      return () => {
        clearTimeout(celebrateTimer)
        clearTimeout(fadeTimer)
        clearTimeout(completeTimer)
      }
    }
  }, [isActive, stableOnComplete])

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
            className="absolute inset-0 bg-black/85 backdrop-blur-md"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.5 }}
          />

          {/* Warm glow behind chef */}
          <motion.div
            className="absolute w-64 h-64 sm:w-80 sm:h-80 rounded-full"
            style={{
              background: 'radial-gradient(circle, rgba(255,100,0,0.25) 0%, rgba(255,50,0,0.1) 50%, transparent 70%)',
            }}
            initial={{ scale: 0, opacity: 0 }}
            animate={{ scale: phase === 'fade' ? 1.5 : 1, opacity: phase === 'fade' ? 0 : 1 }}
            transition={{ duration: 1, delay: 0.5 }}
          />

          {/* Confetti particles - starts during celebrate */}
          {phase === 'celebrate' && (
            <div className="absolute inset-0 overflow-hidden pointer-events-none">
              {Array.from({ length: 40 }).map((_, i) => (
                <motion.div
                  key={i}
                  className="absolute"
                  style={{
                    left: `${Math.random() * 100}%`,
                    top: '-5%',
                    width: 6 + Math.random() * 10,
                    height: 6 + Math.random() * 10,
                    background: `hsl(${[0, 25, 43, 50, 120, 280, 330][Math.floor(Math.random() * 7)]}, 100%, ${55 + Math.random() * 20}%)`,
                    borderRadius: Math.random() > 0.5 ? '50%' : Math.random() > 0.5 ? '2px' : '0',
                  }}
                  initial={{ y: 0, x: 0, rotate: 0, opacity: 1, scale: 1 }}
                  animate={{
                    y: window.innerHeight + 100,
                    x: (Math.random() - 0.5) * 250,
                    rotate: Math.random() * 1080,
                    opacity: [1, 1, 0.8, 0],
                    scale: [1, 0.8, 0.6],
                  }}
                  transition={{
                    duration: 2.5 + Math.random() * 1.5,
                    delay: Math.random() * 1.2,
                    ease: [0.25, 0.46, 0.45, 0.94],
                  }}
                />
              ))}
            </div>
          )}

          {/* Chef character */}
          <motion.div
            className="relative z-10"
            initial={{ y: 400, scale: 0.3, opacity: 0, rotate: 15 }}
            animate={
              phase === 'entrance'
                ? { y: 0, scale: 1, opacity: 1, rotate: 0 }
                : phase === 'celebrate'
                ? { y: [0, -15, 0, -10, 0], scale: [1, 1.08, 1, 1.05, 1], opacity: 1, rotate: [0, -5, 5, -3, 0] }
                : { y: -80, scale: 0.8, opacity: 0 }
            }
            transition={{
              duration: phase === 'entrance' ? 1.2 : phase === 'celebrate' ? 2.3 : 0.7,
              ease: phase === 'entrance' ? [0.34, 1.56, 0.64, 1] : 'easeInOut',
            }}
          >
            <div className="relative">
              <img
                src="/images/chef-animation.png"
                alt="Chef"
                className="w-44 h-44 sm:w-56 sm:h-56 object-contain relative z-10"
                style={{ filter: 'drop-shadow(0 0 30px rgba(255, 100, 0, 0.6)) drop-shadow(0 0 60px rgba(255, 50, 0, 0.3))' }}
              />
            </div>
          </motion.div>

          {/* "Order Booked!" text - appears during celebrate phase */}
          <motion.div
            className="absolute bottom-[22%] sm:bottom-[25%] left-0 right-0 text-center z-20"
            initial={{ opacity: 0, y: 30 }}
            animate={
              phase === 'celebrate'
                ? { opacity: 1, y: 0 }
                : phase === 'fade'
                ? { opacity: 0, y: -30 }
                : { opacity: 0, y: 30 }
            }
            transition={{ duration: 0.5, delay: phase === 'celebrate' ? 0.3 : 0 }}
          >
            <motion.h2
              className="text-3xl sm:text-6xl font-serif font-black text-white mb-2"
              initial={{ scale: 0.5 }}
              animate={{ scale: 1 }}
              transition={{ type: 'spring', damping: 12, stiffness: 200, delay: 0.2 }}
              style={{
                textShadow: '0 0 30px rgba(255, 100, 0, 0.8), 0 0 60px rgba(255, 50, 0, 0.4), 0 4px 20px rgba(0,0,0,0.5)',
              }}
            >
              🔥 Order Booked!
            </motion.h2>
            <motion.p
              className="text-orange-200 text-sm sm:text-lg font-medium"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.5 }}
            >
              Your delicious meal is being prepared!
            </motion.p>
          </motion.div>

          {/* Ringing bell animation */}
          {(phase === 'celebrate' || phase === 'entrance') && (
            <motion.div
              className="absolute top-[12%] right-[15%] sm:top-[15%] sm:right-[20%] z-20"
              initial={{ opacity: 0, scale: 0 }}
              animate={
                phase === 'celebrate'
                  ? { opacity: 1, scale: [0, 1.3, 1], rotate: [0, 20, -20, 15, -15, 10, -10, 0] }
                  : { opacity: 0, scale: 0 }
              }
              transition={{ duration: 1.2, delay: 0.2 }}
            >
              <span className="text-5xl sm:text-7xl">🔔</span>
            </motion.div>
          )}

          {/* Sparkle effects around chef */}
          {phase === 'celebrate' && (
            <>
              {Array.from({ length: 8 }).map((_, i) => {
                const angle = (i * 45 * Math.PI) / 180
                const radius = 130
                return (
                  <motion.div
                    key={`sparkle-${i}`}
                    className="absolute z-20 text-2xl sm:text-3xl"
                    style={{
                      left: `calc(50% + ${Math.cos(angle) * radius}px - 12px)`,
                      top: `calc(42% + ${Math.sin(angle) * radius}px - 12px)`,
                    }}
                    initial={{ opacity: 0, scale: 0 }}
                    animate={{ opacity: [0, 1, 1, 0], scale: [0, 1.5, 1.2, 0] }}
                    transition={{ duration: 1.2, delay: 0.3 + i * 0.15, repeat: 1, repeatDelay: 0.2 }}
                  >
                    ✨
                  </motion.div>
                )
              })}
            </>
          )}

          {/* Fire emoji burst from sides */}
          {phase === 'celebrate' && (
            <>
              {Array.from({ length: 5 }).map((_, i) => (
                <motion.div
                  key={`fire-${i}`}
                  className="absolute z-20 text-3xl sm:text-4xl"
                  style={{
                    left: `${5 + i * 22}%`,
                    bottom: '10%',
                  }}
                  initial={{ opacity: 0, y: 0, scale: 0 }}
                  animate={{ opacity: [0, 1, 0], y: -80 - Math.random() * 60, scale: [0, 1.3, 0.5] }}
                  transition={{ duration: 1.5, delay: 0.5 + i * 0.15 }}
                >
                  🔥
                </motion.div>
              ))}
            </>
          )}
        </motion.div>
      )}
    </AnimatePresence>
  )
}
