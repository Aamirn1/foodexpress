'use client'

import { useState, useEffect, useRef } from 'react'
import { createPortal } from 'react-dom'
import { motion, AnimatePresence } from 'framer-motion'
import { Phone } from 'lucide-react'

interface WhatsAppButtonProps {
  isCartOpen: boolean
}

export default function WhatsAppButton({ isCartOpen }: WhatsAppButtonProps) {
  const [visible, setVisible] = useState(false)
  const [portalTarget, setPortalTarget] = useState<HTMLElement | null>(null)
  const mountedRef = useRef(false)

  useEffect(() => {
    mountedRef.current = true
    // Set the portal target in a microtask to avoid synchronous setState in effect
    const id = requestAnimationFrame(() => {
      setPortalTarget(document.body)
    })
    return () => {
      mountedRef.current = false
      cancelAnimationFrame(id)
    }
  }, [])

  useEffect(() => {
    const handleScroll = () => {
      if (mountedRef.current) {
        setVisible(window.scrollY > 300)
      }
    }
    window.addEventListener('scroll', handleScroll, { passive: true })
    return () => window.removeEventListener('scroll', handleScroll)
  }, [])

  if (!portalTarget) return null

  const whatsappUrl = `https://wa.me/?text=${encodeURIComponent(
    "Hi! I'd like to place an order from Food Express"
  )}`

  return createPortal(
    <AnimatePresence>
      {visible && !isCartOpen && (
        <motion.a
          href={whatsappUrl}
          target="_blank"
          rel="noopener noreferrer"
          initial={{ scale: 0, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          exit={{ scale: 0, opacity: 0 }}
          transition={{ type: 'spring', stiffness: 260, damping: 20 }}
          className="fixed bottom-6 right-6 z-40 w-14 h-14 rounded-full
            bg-[#25D366] hover:bg-[#20BD5A]
            flex items-center justify-center
            text-white shadow-lg shadow-[#25D366]/30
            hover:shadow-[#25D366]/50
            transition-all duration-300
            group"
          aria-label="Contact us on WhatsApp"
        >
          <Phone className="w-6 h-6 group-hover:scale-110 transition-transform duration-200" />
          <span className="absolute inset-0 rounded-full bg-[#25D366] animate-ping opacity-20" />
        </motion.a>
      )}
    </AnimatePresence>,
    portalTarget
  )
}
