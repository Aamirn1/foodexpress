'use client'

import { useEffect, useState, useMemo } from 'react'
import { motion, AnimatePresence } from 'framer-motion'

interface FireIntroProps {
  onComplete: () => void
}

function FireParticle({ delay, left, size, duration, color }: { delay: number; left: string; size: number; duration: number; color: string }) {
  return (
    <div
      className="absolute bottom-0 rounded-full"
      style={{
        left,
        width: size,
        height: size,
        animation: `fire-particle-rise ${duration}s ease-out ${delay}s infinite`,
        background: color,
        filter: `blur(${size > 10 ? 3 : 1}px)`,
        opacity: 0.9,
      }}
    />
  )
}

function EmberSpark({ delay, left, duration }: { delay: number; left: string; duration: number }) {
  return (
    <div
      className="absolute bottom-0"
      style={{
        left,
        width: 3,
        height: 3,
        animation: `fire-particle-rise ${duration}s ease-out ${delay}s infinite`,
        background: 'hsl(43 100% 80%)',
        borderRadius: '50%',
        boxShadow: '0 0 6px hsl(43 100% 70%), 0 0 12px hsl(18 100% 50%)',
        opacity: 0.8,
      }}
    />
  )
}

const fireColors = [
  'radial-gradient(circle, hsl(43 100% 70%), hsl(43 100% 50%), hsl(18 100% 40%))',
  'radial-gradient(circle, hsl(43 100% 60%), hsl(18 100% 55%), hsl(0 80% 40%))',
  'radial-gradient(circle, hsl(18 100% 65%), hsl(0 90% 50%), hsl(0 80% 35%))',
  'radial-gradient(circle, hsl(30 100% 60%), hsl(18 100% 50%), hsl(350 80% 40%))',
  'radial-gradient(circle, hsl(50 100% 65%), hsl(43 100% 55%), hsl(30 100% 40%))',
]

export default function FireIntro({ onComplete }: FireIntroProps) {
  const [phase, setPhase] = useState<'fire' | 'food' | 'express' | 'fadeout' | 'complete'>('fire')

  useEffect(() => {
    const timer1 = setTimeout(() => setPhase('food'), 1200)
    const timer2 = setTimeout(() => setPhase('express'), 2400)
    const timer3 = setTimeout(() => setPhase('fadeout'), 3800)
    const timer4 = setTimeout(() => onComplete(), 4800)

    return () => {
      clearTimeout(timer1)
      clearTimeout(timer2)
      clearTimeout(timer3)
      clearTimeout(timer4)
    }
  }, [onComplete])

  const particles = useMemo(() =>
    Array.from({ length: 50 }, (_, i) => ({
      id: i,
      left: `${Math.random() * 100}%`,
      size: 4 + Math.random() * 16,
      delay: Math.random() * 3,
      duration: 1.5 + Math.random() * 3,
      color: fireColors[Math.floor(Math.random() * fireColors.length)],
    })),
  [])

  const embers = useMemo(() =>
    Array.from({ length: 25 }, (_, i) => ({
      id: i,
      left: `${Math.random() * 100}%`,
      delay: Math.random() * 4,
      duration: 2 + Math.random() * 4,
    })),
  [])

  const foodLetters = 'FOOD'.split('')
  const expressLetters = 'EXPRESS'.split('')

  const showFood = phase === 'food' || phase === 'express' || phase === 'fadeout'
  const showExpress = phase === 'express' || phase === 'fadeout'

  return (
    <AnimatePresence>
      {phase !== 'complete' && (
        <motion.div
          className="fixed inset-0 z-[100] flex items-center justify-center overflow-hidden"
          style={{ background: 'hsl(20 14% 4%)' }}
          exit={{ opacity: 0 }}
          transition={{ duration: 1 }}
          onAnimationComplete={() => {
            if (phase === 'fadeout') setPhase('complete')
          }}
        >
          {/* Fire particles */}
          <div className="absolute inset-0 pointer-events-none">
            {particles.map((p) => (
              <FireParticle key={p.id} {...p} />
            ))}
          </div>

          {/* Ember sparks */}
          <div className="absolute inset-0 pointer-events-none">
            {embers.map((e) => (
              <EmberSpark key={`ember-${e.id}`} {...e} />
            ))}
          </div>

          {/* Large ambient glow at bottom */}
          <div
            className="absolute bottom-0 left-1/2 -translate-x-1/2 w-[800px] h-[400px] rounded-full"
            style={{
              background: 'radial-gradient(ellipse, hsl(18 100% 60% / 0.35), hsl(0 80% 40% / 0.15), transparent)',
              filter: 'blur(60px)',
              animation: 'fire-flicker 0.5s ease-in-out infinite',
            }}
          />

          {/* Secondary glow - warmer */}
          <div
            className="absolute bottom-0 left-1/3 -translate-x-1/2 w-[400px] h-[200px] rounded-full"
            style={{
              background: 'radial-gradient(ellipse, hsl(43 100% 50% / 0.2), transparent)',
              filter: 'blur(40px)',
              animation: 'fire-flicker 0.7s ease-in-out infinite reverse',
            }}
          />

          {/* Flame icon */}
          <motion.div
            className="absolute top-[28%] left-1/2 -translate-x-1/2 -translate-y-1/2"
            initial={{ opacity: 0, scale: 0.3, y: 50 }}
            animate={{ opacity: [0, 1, 0.8, 1], scale: [0.3, 1.2, 0.95, 1], y: 0 }}
            transition={{ duration: 1.2, ease: 'easeOut' }}
            style={{ filter: 'drop-shadow(0 0 30px hsl(18 100% 60% / 0.9)) drop-shadow(0 0 60px hsl(0 80% 50% / 0.5))' }}
          >
            <svg width="80" height="80" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
              <path d="M12 2C12 2 4 10 4 15C4 19.4 7.6 23 12 23C16.4 23 20 19.4 20 15C20 10 12 2 12 2ZM12 20C9.2 20 7 17.8 7 15C7 12.5 9.5 8.5 12 5.5C14.5 8.5 17 12.5 17 15C17 17.8 14.8 20 12 20Z" fill="url(#flameGrad)"/>
              <path d="M12 10C12 10 9 14 9 16C9 17.7 10.3 19 12 19C13.7 19 15 17.7 15 16C15 14 12 10 12 10Z" fill="url(#flameInnerGrad)"/>
              <defs>
                <linearGradient id="flameGrad" x1="4" y1="2" x2="20" y2="23">
                  <stop stopColor="hsl(50 100% 65%)"/>
                  <stop offset="0.3" stopColor="hsl(43 100% 55%)"/>
                  <stop offset="0.6" stopColor="hsl(18 100% 60%)"/>
                  <stop offset="1" stopColor="hsl(0 80% 45%)"/>
                </linearGradient>
                <linearGradient id="flameInnerGrad" x1="9" y1="10" x2="15" y2="19">
                  <stop stopColor="hsl(50 100% 80%)"/>
                  <stop offset="1" stopColor="hsl(43 100% 65%)"/>
                </linearGradient>
              </defs>
            </svg>
          </motion.div>

          {/* Horizontal fire sweep line */}
          {showFood && (
            <motion.div
              className="absolute left-0 right-0 h-[2px] z-10"
              style={{
                top: '50%',
                background: 'linear-gradient(90deg, transparent, hsl(43 100% 60%), hsl(18 100% 60%), hsl(0 80% 50%), hsl(18 100% 60%), hsl(43 100% 60%), transparent)',
                boxShadow: '0 0 20px hsl(18 100% 60% / 0.8), 0 0 40px hsl(18 100% 60% / 0.4)',
              }}
              initial={{ scaleX: 0, opacity: 1 }}
              animate={{ scaleX: 1, opacity: [1, 1, 0] }}
              transition={{ duration: 1.5, ease: 'easeInOut' }}
            />
          )}

          {/* Text */}
          <div className="relative z-10 flex flex-col items-center gap-1 mt-8">
            {/* FOOD */}
            <div className="flex">
              {foodLetters.map((letter, i) => (
                <motion.span
                  key={`food-${i}`}
                  className="text-7xl sm:text-8xl md:text-9xl font-serif font-black"
                  style={{
                    background: 'linear-gradient(135deg, hsl(50 100% 65%), hsl(43 100% 50%), hsl(18 100% 60%), hsl(0 80% 55%))',
                    WebkitBackgroundClip: 'text',
                    WebkitTextFillColor: 'transparent',
                    backgroundClip: 'text',
                  }}
                  initial={{ opacity: 0, y: 60, scale: 0.3, rotateX: -90 }}
                  animate={showFood
                    ? { opacity: 1, y: 0, scale: 1, rotateX: 0 }
                    : { opacity: 0, y: 60, scale: 0.3, rotateX: -90 }
                  }
                  transition={{ duration: 0.6, delay: i * 0.12, ease: [0.22, 1, 0.36, 1] }}
                >
                  {letter}
                </motion.span>
              ))}
            </div>

            {/* Glow behind text */}
            {showFood && (
              <motion.div
                className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[500px] h-[200px] rounded-full -z-10"
                style={{
                  background: 'radial-gradient(ellipse, hsl(18 100% 60% / 0.25), hsl(0 80% 50% / 0.1), transparent)',
                  filter: 'blur(40px)',
                }}
                initial={{ opacity: 0, scale: 0.5 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ duration: 1 }}
              />
            )}

            {/* EXPRESS */}
            <div className="flex">
              {expressLetters.map((letter, i) => (
                <motion.span
                  key={`express-${i}`}
                  className="text-7xl sm:text-8xl md:text-9xl font-serif font-black"
                  style={{
                    background: 'linear-gradient(135deg, hsl(50 100% 65%), hsl(43 100% 50%), hsl(18 100% 60%), hsl(0 80% 55%))',
                    WebkitBackgroundClip: 'text',
                    WebkitTextFillColor: 'transparent',
                    backgroundClip: 'text',
                  }}
                  initial={{ opacity: 0, y: 60, scale: 0.3, rotateX: -90 }}
                  animate={showExpress
                    ? { opacity: 1, y: 0, scale: 1, rotateX: 0 }
                    : { opacity: 0, y: 60, scale: 0.3, rotateX: -90 }
                  }
                  transition={{ duration: 0.6, delay: i * 0.08, ease: [0.22, 1, 0.36, 1] }}
                >
                  {letter}
                </motion.span>
              ))}
            </div>

            {/* Tagline */}
            <motion.p
              className="text-foreground/60 text-base sm:text-lg tracking-[0.3em] uppercase mt-6 font-medium"
              initial={{ opacity: 0, y: 20 }}
              animate={showExpress
                ? { opacity: 1, y: 0 }
                : { opacity: 0, y: 20 }
              }
              transition={{ duration: 0.8, delay: 0.6 }}
            >
              Where Flavor Meets Fire
            </motion.p>
          </div>

          {/* Fade out overlay */}
          {phase === 'fadeout' && (
            <motion.div
              className="absolute inset-0 z-20"
              style={{ background: 'hsl(20 14% 4%)' }}
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 1 }}
            />
          )}
        </motion.div>
      )}
    </AnimatePresence>
  )
}
