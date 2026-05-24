'use client'

import { useState, useEffect, useRef } from 'react'
import { createPortal } from 'react-dom'
import { motion, AnimatePresence } from 'framer-motion'

interface WhatsAppButtonProps {
  isCartOpen: boolean
}

function WhatsAppIcon({ className }: { className?: string }) {
  return (
    <svg className={className} viewBox="0 0 32 32" fill="currentColor" xmlns="http://www.w3.org/2000/svg">
      <path d="M16.004 0h-.008C7.174 0 0 7.176 0 16c0 3.5 1.132 6.744 3.054 9.378L1.054 31.21l6.066-1.952C9.68 30.976 12.716 32 16.004 32 24.826 32 32 24.824 32 16S24.826 0 16.004 0zm9.314 22.61c-.39 1.1-1.932 2.014-3.17 2.284-.846.18-1.95.324-5.67-1.218-4.762-1.97-7.826-6.81-8.064-7.126-.23-.316-1.928-2.568-1.928-4.896s1.22-3.474 1.654-3.95c.434-.476.948-.594 1.264-.594.316 0 .632.002.908.016.292.016.684-.11 1.07.816.39.936 1.326 3.234 1.442 3.468.116.234.194.508.04.816-.156.316-.234.508-.47.784-.234.278-.494.62-.706.832-.234.236-.478.49-.204.962.272.47 1.214 2.002 2.606 3.244 1.79 1.592 3.298 2.086 3.77 2.322.47.234.744.196 1.018-.118.278-.316 1.186-1.382 1.502-1.856.316-.476.632-.394 1.066-.236.434.156 2.764 1.304 3.236 1.542.47.236.784.354.902.55.116.196.116 1.126-.274 2.224z"/>
    </svg>
  )
}

export default function WhatsAppButton({ isCartOpen }: WhatsAppButtonProps) {
  const [visible, setVisible] = useState(false)
  const [portalTarget, setPortalTarget] = useState<HTMLElement | null>(null)
  const mountedRef = useRef(false)

  useEffect(() => {
    mountedRef.current = true
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

  const whatsappUrl = `https://wa.me/923205719979?text=${encodeURIComponent(
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
            hover:shadow-[#25D366]/50 hover:scale-110
            transition-all duration-300
            group"
          aria-label="Contact us on WhatsApp"
        >
          <WhatsAppIcon className="w-7 h-7 group-hover:scale-110 transition-transform duration-200" />
          <span className="absolute inset-0 rounded-full bg-[#25D366] animate-ping opacity-20" />
        </motion.a>
      )}
    </AnimatePresence>,
    portalTarget
  )
}
