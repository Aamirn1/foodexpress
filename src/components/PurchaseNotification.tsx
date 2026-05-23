'use client'

import { useState, useEffect, useCallback } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { Flame } from 'lucide-react'
import { menuItems } from '@/data/menu'

const names = [
  'Ahmed', 'Sara', 'Mohammed', 'Fatima', 'Omar', 'Layla',
  'Khalid', 'Noor', 'Yusuf', 'Aisha', 'Hassan', 'Zara',
  'Ali', 'Maryam', 'Ibrahim', 'Huda', 'Tariq', 'Salma',
  'Rashid', 'Amira', 'Samir', 'Dina', 'Kareem', 'Lina',
]

const cities = [
  'Downtown', 'Midtown', 'Westside', 'East Village', 'Uptown',
  'Riverside', 'Old Town', 'The Heights', 'Central District', 'Harbor Point',
  'North Beach', 'South Park', 'Cedar Hills', 'Maple Grove', 'Sunset Strip',
]

function getRandomItem<T>(arr: T[]): T {
  return arr[Math.floor(Math.random() * arr.length)]
}

function getRandomDelay(): number {
  return Math.random() * 30000 + 30000 // 30-60 seconds
}

interface NotificationData {
  name: string
  city: string
  itemName: string
}

export default function PurchaseNotification() {
  const [visible, setVisible] = useState(false)
  const [notification, setNotification] = useState<NotificationData | null>(null)

  const showNotification = useCallback(() => {
    const item = getRandomItem(menuItems)
    setNotification({
      name: getRandomItem(names),
      city: getRandomItem(cities),
      itemName: item.name,
    })
    setVisible(true)

    // Auto dismiss after 4 seconds
    setTimeout(() => {
      setVisible(false)
    }, 4000)
  }, [])

  useEffect(() => {
    // First notification after 15 seconds
    const initialTimer = setTimeout(() => {
      showNotification()
    }, 15000)

    // Subsequent notifications every 30-60 seconds
    const interval = setInterval(() => {
      const delay = getRandomDelay()
      setTimeout(() => {
        showNotification()
      }, delay)
    }, 45000) // Average interval

    return () => {
      clearTimeout(initialTimer)
      clearInterval(interval)
    }
  }, [showNotification])

  return (
    <AnimatePresence>
      {visible && notification && (
        <motion.div
          initial={{ x: -400, opacity: 0 }}
          animate={{ x: 0, opacity: 1 }}
          exit={{ x: -400, opacity: 0 }}
          transition={{ type: 'spring', damping: 25, stiffness: 200 }}
          className="fixed bottom-20 left-6 z-40 max-w-xs"
        >
          <div className="flex items-center gap-3 p-3 pr-4 rounded-xl bg-card/90 backdrop-blur-xl border border-border shadow-xl shadow-black/30">
            <div className="w-10 h-10 rounded-full bg-primary/20 flex items-center justify-center flex-shrink-0">
              <Flame className="w-5 h-5 text-primary" />
            </div>
            <div className="min-w-0">
              <p className="text-sm text-foreground font-medium truncate">
                {notification.name} from {notification.city}
              </p>
              <p className="text-xs text-muted-foreground truncate">
                just ordered {notification.itemName}
              </p>
            </div>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  )
}
