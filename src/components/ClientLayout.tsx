'use client'

import { useState, useEffect, useCallback } from 'react'
import Navbar from '@/components/Navbar'
import Footer from '@/components/Footer'
import ScrollToTop from '@/components/ScrollToTop'
import WhatsAppButton from '@/components/WhatsAppButton'
import CartDrawer from '@/components/CartDrawer'
import SearchOverlay from '@/components/SearchOverlay'
import CartNotification from '@/components/CartNotification'
import { useCart } from '@/hooks/use-cart'

export default function ClientLayout({ children }: { children: React.ReactNode }) {
  const [searchOpen, setSearchOpen] = useState(false)
  const [cartNotification, setCartNotification] = useState({
    visible: false,
    itemName: '',
  })

  const cart = useCart()

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if ((e.metaKey || e.ctrlKey) && e.key === 'k') {
        e.preventDefault()
        setSearchOpen(true)
      }
    }
    window.addEventListener('keydown', handleKeyDown)
    return () => window.removeEventListener('keydown', handleKeyDown)
  }, [])

  const showCartNotification = useCallback((itemName: string) => {
    setCartNotification({ visible: true, itemName })
  }, [])

  const hideCartNotification = useCallback(() => {
    setCartNotification((prev) => ({ ...prev, visible: false }))
  }, [])

  return (
    <div className="min-h-screen flex flex-col bg-background">
      <Navbar
        onSearchOpen={() => setSearchOpen(true)}
        onCartOpen={cart.openCart}
        totalItems={cart.totalItems}
      />
      <main className="flex-1">{children}</main>
      <Footer />

      <CartDrawer
        isOpen={cart.isOpen}
        onClose={cart.closeCart}
        items={cart.items}
        subtotal={cart.subtotal}
        totalItems={cart.totalItems}
        updateQuantity={cart.updateQuantity}
        removeItem={cart.removeItem}
      />

      <SearchOverlay isOpen={searchOpen} onClose={() => setSearchOpen(false)} />
      <ScrollToTop />
      <WhatsAppButton isCartOpen={cart.isOpen} />
      <CartNotification
        itemName={cartNotification.itemName}
        visible={cartNotification.visible}
        onClose={hideCartNotification}
      />
    </div>
  )
}
