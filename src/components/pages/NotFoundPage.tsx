'use client'

import { motion } from 'framer-motion'
import { Flame, Home, ArrowLeft } from 'lucide-react'
import { Button } from '@/components/ui/button'

interface NotFoundPageProps {
  onNavigate?: (page: string) => void
}

export default function NotFoundPage({ onNavigate }: NotFoundPageProps) {
  return (
    <div className="min-h-screen bg-background flex items-center justify-center relative overflow-hidden">
      {/* Background Effects */}
      <div className="absolute inset-0">
        <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-primary/5 rounded-full blur-3xl animate-pulse" />
        <div className="absolute bottom-1/4 right-1/4 w-96 h-96 bg-accent/5 rounded-full blur-3xl animate-pulse" style={{ animationDelay: '1s' }} />
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-primary/3 rounded-full blur-3xl" />
      </div>

      {/* Floating Fire Particles */}
      {[...Array(8)].map((_, i) => (
        <motion.div
          key={i}
          className="absolute w-2 h-2 rounded-full bg-primary/30"
          style={{
            left: `${20 + Math.random() * 60}%`,
            bottom: '-10px',
          }}
          animate={{
            y: [0, -400 - Math.random() * 200],
            opacity: [0, 1, 0],
            scale: [0, 1, 0],
          }}
          transition={{
            duration: 3 + Math.random() * 2,
            repeat: Infinity,
            delay: Math.random() * 3,
            ease: 'easeOut',
          }}
        />
      ))}

      {/* Content */}
      <div className="relative z-10 text-center px-4">
        <motion.div
          initial={{ opacity: 0, scale: 0.8 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.7, ease: 'easeOut' }}
        >
          {/* 404 Number */}
          <div className="relative mb-6">
            <span className="text-[10rem] md:text-[14rem] font-serif font-black text-fire-gradient leading-none select-none">
              404
            </span>
          </div>

          {/* Fire Icon */}
          <motion.div
            animate={{
              y: [0, -8, 0],
              scale: [1, 1.05, 1],
            }}
            transition={{
              duration: 2,
              repeat: Infinity,
              ease: 'easeInOut',
            }}
          >
            <Flame className="w-16 h-16 text-primary mx-auto mb-6" />
          </motion.div>

          {/* Message */}
          <h1 className="text-3xl md:text-4xl font-serif font-black text-foreground mb-3">
            Lost in the Flames
          </h1>
          <p className="text-muted-foreground text-lg max-w-md mx-auto mb-8">
            The page you are looking for has burned away or never existed. Let us guide you back to the warmth.
          </p>

          {/* Buttons */}
          <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
            <Button
              className="bg-fire-gradient text-primary-foreground btn-fire-glow font-semibold px-8 py-6 text-base"
              onClick={() => onNavigate?.('home')}
            >
              <Home className="w-5 h-5 mr-2" />
              Back to Home
            </Button>
            <Button
              variant="outline"
              className="border-border text-foreground hover:bg-secondary px-8 py-6 text-base"
              onClick={() => window.history.back()}
            >
              <ArrowLeft className="w-5 h-5 mr-2" />
              Go Back
            </Button>
          </div>
        </motion.div>
      </div>
    </div>
  )
}
