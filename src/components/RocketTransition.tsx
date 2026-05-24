'use client'

import { motion, AnimatePresence } from 'framer-motion'
import { useEffect, useState, useCallback } from 'react'

interface RocketTransitionProps {
  isActive: boolean
  onComplete: () => void
}

export default function RocketTransition({ isActive, onComplete }: RocketTransitionProps) {
  // Phase progression: idle → launch → zoom → idle
  // When first activated, we derive 'appear' from idle state
  const [phase, setPhase] = useState<'idle' | 'launch' | 'zoom'>('idle')

  // When isActive is true and phase is idle, display as 'appear' phase
  const displayPhase: 'appear' | 'launch' | 'zoom' | 'idle' =
    isActive && phase === 'idle' ? 'appear' : phase

  const stableOnComplete = useCallback(() => { onComplete() }, [onComplete])

  useEffect(() => {
    if (!isActive) return

    // Phase 2: Rocket launches upward (1-2.2s)
    const launchTimer = setTimeout(() => setPhase('launch'), 1000)
    // Phase 3: Rocket zooms off screen + flash (2.2-3.2s)
    const zoomTimer = setTimeout(() => setPhase('zoom'), 2200)
    // Complete after full 3+ second animation
    const completeTimer = setTimeout(() => {
      setPhase('idle')
      stableOnComplete()
    }, 3400)
    return () => {
      clearTimeout(launchTimer)
      clearTimeout(zoomTimer)
      clearTimeout(completeTimer)
    }
  }, [isActive, stableOnComplete])

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
            animate={{ opacity: displayPhase === 'zoom' ? 0.95 : 0.7 }}
            transition={{ duration: 0.8 }}
          />

          {/* Starfield background */}
          <div className="absolute inset-0">
            {Array.from({ length: 20 }).map((_, i) => (
              <motion.div
                key={`star-${i}`}
                className="absolute rounded-full bg-white"
                style={{
                  left: `${Math.random() * 100}%`,
                  top: `${Math.random() * 100}%`,
                  width: 2 + Math.random() * 3,
                  height: 2 + Math.random() * 3,
                }}
                initial={{ opacity: 0 }}
                animate={{ opacity: [0, 0.8, 0.3, 0.8] }}
                transition={{ duration: 1.5, delay: Math.random() * 0.5, repeat: Infinity }}
              />
            ))}
          </div>

          {/* Fire trail particles - continuous during appear and launch */}
          {(displayPhase === 'appear' || displayPhase === 'launch') && (
            <div className="absolute bottom-0 left-0 right-0">
              {Array.from({ length: 18 }).map((_, i) => (
                <motion.div
                  key={i}
                  className="absolute rounded-full"
                  style={{
                    left: `${10 + Math.random() * 15}%`,
                    bottom: `${5 + Math.random() * 8}%`,
                    width: 6 + Math.random() * 14,
                    height: 6 + Math.random() * 14,
                    background: `hsl(${Math.random() * 40 + 15}, 100%, ${50 + Math.random() * 30}%)`,
                  }}
                  initial={{ opacity: 1, scale: 1, y: 0 }}
                  animate={{
                    opacity: 0,
                    scale: 0,
                    y: -(80 + Math.random() * 250),
                    x: (Math.random() - 0.5) * 80,
                  }}
                  transition={{ duration: 1 + Math.random() * 0.8, delay: Math.random() * 0.5, repeat: Infinity, repeatDelay: 0.3 }}
                />
              ))}
            </div>
          )}

          {/* Smoke cloud at launch point */}
          {displayPhase === 'launch' && (
            <div className="absolute bottom-0 left-0 right-0">
              {Array.from({ length: 8 }).map((_, i) => (
                <motion.div
                  key={`smoke-${i}`}
                  className="absolute rounded-full"
                  style={{
                    left: `${5 + Math.random() * 25}%`,
                    bottom: '2%',
                  }}
                  initial={{ opacity: 0.6, scale: 0.5, width: 30, height: 30 }}
                  animate={{
                    opacity: 0,
                    scale: 2.5,
                    x: (Math.random() - 0.5) * 120,
                    y: -(20 + Math.random() * 60),
                  }}
                  transition={{ duration: 1.5, delay: Math.random() * 0.3 }}
                >
                  <div className="w-full h-full rounded-full bg-gray-400/40" />
                </motion.div>
              ))}
            </div>
          )}

          {/* Rocket */}
          <motion.div
            className="absolute"
            style={{ left: '10%', bottom: '5%' }}
            initial={{ y: 100, x: 0, scale: 0.6, opacity: 0, rotate: 0 }}
            animate={
              displayPhase === 'appear'
                ? { y: 0, x: 0, scale: 1, opacity: 1, rotate: -15 }
                : displayPhase === 'launch'
                ? { y: -350, x: 80, scale: 1.1, opacity: 1, rotate: -35 }
                : { y: -1400, x: 300, scale: 1.3, opacity: 0, rotate: -50 }
            }
            transition={{
              duration: displayPhase === 'appear' ? 1.0 : displayPhase === 'launch' ? 1.2 : 1.0,
              ease: displayPhase === 'appear' ? [0.34, 1.56, 0.64, 1] : displayPhase === 'launch' ? 'easeIn' : [0.25, 0.46, 0.45, 0.94],
            }}
          >
            <img
              src="/images/rocket-animation.png"
              alt="Rocket"
              className="w-28 h-28 sm:w-40 sm:h-40"
              style={{ filter: 'drop-shadow(0 0 25px rgba(255, 100, 0, 0.7)) drop-shadow(0 0 50px rgba(255, 50, 0, 0.4))' }}
            />
          </motion.div>

          {/* Screen flash effect */}
          {displayPhase === 'zoom' && (
            <motion.div
              className="absolute inset-0 bg-fire-gradient"
              initial={{ opacity: 0 }}
              animate={{ opacity: [0, 0.9, 0] }}
              transition={{ duration: 0.8 }}
            />
          )}

          {/* "Blasting Off!" text */}
          <motion.div
            className="absolute inset-0 flex items-center justify-center"
            initial={{ opacity: 0 }}
            animate={{ opacity: displayPhase === 'appear' || displayPhase === 'launch' ? 1 : 0 }}
            transition={{ duration: 0.5 }}
          >
            <motion.h2
              className="text-3xl sm:text-6xl font-serif font-black text-white"
              initial={{ y: 30, scale: 0.8 }}
              animate={{ y: 0, scale: 1 }}
              transition={{ duration: 0.6, delay: 0.3 }}
              style={{
                textShadow: '0 0 30px rgba(255, 100, 0, 0.8), 0 0 60px rgba(255, 50, 0, 0.4), 0 4px 20px rgba(0,0,0,0.5)',
              }}
            >
              Blasting Off!
            </motion.h2>
          </motion.div>

          {/* Countdown fire emoji during appear phase */}
          <motion.div
            className="absolute top-[20%] left-1/2 -translate-x-1/2"
            initial={{ opacity: 0 }}
            animate={{ opacity: displayPhase === 'appear' ? 1 : 0 }}
            transition={{ duration: 0.3 }}
          >
            <motion.span
              className="text-6xl sm:text-8xl font-black"
              initial={{ scale: 2, opacity: 0 }}
              animate={{ scale: 0.8, opacity: [0, 1, 1, 0] }}
              transition={{ duration: 1.0, times: [0, 0.2, 0.7, 1] }}
              style={{
                filter: 'drop-shadow(0 0 20px rgba(255, 100, 0, 0.6))',
              }}
            >
              {displayPhase === 'appear' ? '🔥' : ''}
            </motion.span>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  )
}
