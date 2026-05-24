'use client'

import { useEffect } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { CheckCircle } from 'lucide-react'

interface CartNotificationProps {
  itemName: string
  visible: boolean
  onClose: () => void
}

export default function CartNotification({
  itemName,
  visible,
  onClose,
}: CartNotificationProps) {
  useEffect(() => {
    if (visible) {
      const timer = setTimeout(() => {
        onClose()
      }, 2500)
      return () => clearTimeout(timer)
    }
  }, [visible, onClose])

  return (
    <AnimatePresence>
      {visible && (
        <motion.div
          initial={{ y: -60, opacity: 0, scale: 0.95 }}
          animate={{ y: 0, opacity: 1, scale: 1 }}
          exit={{ y: -60, opacity: 0, scale: 0.95 }}
          transition={{ type: 'spring', damping: 25, stiffness: 300 }}
          className="fixed top-20 left-1/2 -translate-x-1/2 z-[60]"
        >
          <div className="flex items-center gap-3 px-5 py-3 rounded-xl bg-card/95 backdrop-blur-xl border border-primary/30 shadow-2xl shadow-primary/10">
            <CheckCircle className="w-5 h-5 text-primary flex-shrink-0" />
            <div className="flex items-center gap-1.5">
              <span className="text-sm font-semibold text-foreground truncate max-w-[200px]">
                {itemName}
              </span>
              <span className="text-sm text-accent font-medium">
                Added to your order
              </span>
            </div>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  )
}
