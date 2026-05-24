'use client'

import { useState, useEffect, useCallback } from 'react'
import Navbar from '@/components/Navbar'
import Footer from '@/components/Footer'
import ScrollToTop from '@/components/ScrollToTop'
import WhatsAppButton from '@/components/WhatsAppButton'
import CartDrawer from '@/components/CartDrawer'
import SearchOverlay from '@/components/SearchOverlay'
import RocketTransition from '@/components/RocketTransition'
import { Toaster } from '@/components/ui/toaster'
import { CartProvider, useCart } from '@/hooks/use-cart'
import { useRouter } from 'next/navigation'

function InnerLayout({ children }: { children: React.ReactNode }) {
  const [searchOpen, setSearchOpen] = useState(false)
  const [showRocket, setShowRocket] = useState(false)
  const cart = useCart()
  const router = useRouter()

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

  const handleCheckout = useCallback(() => {
    cart.closeCart()
    setShowRocket(true)
  }, [cart])

  const onRocketComplete = useCallback(() => {
    setShowRocket(false)
    router.push('/checkout')
  }, [router])

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
        onCheckout={handleCheckout}
      />

      <SearchOverlay isOpen={searchOpen} onClose={() => setSearchOpen(false)} />
      <ScrollToTop />
      <WhatsAppButton isCartOpen={cart.isOpen} />
      <Toaster />

      {/* Global Rocket Transition */}
      <RocketTransition isActive={showRocket} onComplete={onRocketComplete} />
    </div>
  )
}

export default function ClientLayout({ children }: { children: React.ReactNode }) {
  return (
    <CartProvider>
      <InnerLayout>{children}</InnerLayout>
    </CartProvider>
  )
}
