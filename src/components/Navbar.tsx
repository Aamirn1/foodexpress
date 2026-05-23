'use client'

import { useState, useEffect } from 'react'
import { usePathname } from 'next/navigation'
import Link from 'next/link'
import { motion, AnimatePresence } from 'framer-motion'
import { Phone, Menu, Flame, Search, ShoppingCart, X } from 'lucide-react'
import { Button } from '@/components/ui/button'

const navLinks = [
  { label: 'Home', href: '/' },
  { label: 'Menu', href: '/menu' },
  { label: 'Blog', href: '/blog' },
  { label: 'About', href: '/about' },
  { label: 'Contact', href: '/contact' },
  { label: 'FAQ', href: '/faq' },
]

interface NavbarProps {
  onSearchOpen?: () => void
  onCartOpen?: () => void
  totalItems?: number
}

export default function Navbar({ onSearchOpen, onCartOpen, totalItems = 0 }: NavbarProps) {
  const [scrolled, setScrolled] = useState(false)
  const [mobileOpen, setMobileOpen] = useState(false)
  const pathname = usePathname()

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 50)
    }
    window.addEventListener('scroll', handleScroll)
    return () => window.removeEventListener('scroll', handleScroll)
  }, [])

  // Close mobile menu on route change
  useEffect(() => {
    setMobileOpen(false)
  }, [pathname])

  // Prevent body scroll when mobile menu is open
  useEffect(() => {
    if (mobileOpen) {
      document.body.style.overflow = 'hidden'
    } else {
      document.body.style.overflow = ''
    }
    return () => {
      document.body.style.overflow = ''
    }
  }, [mobileOpen])

  const isActive = (href: string) => {
    if (href === '/') return pathname === '/'
    return pathname.startsWith(href)
  }

  return (
    <motion.header
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-500 ${
        scrolled
          ? 'bg-background/95 backdrop-blur-md border-b border-border shadow-lg shadow-black/20'
          : 'bg-transparent'
      }`}
      initial={{ y: -100 }}
      animate={{ y: 0 }}
      transition={{ duration: 0.8, ease: 'easeOut' }}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16 md:h-20">
          {/* Logo */}
          <Link href="/" className="flex items-center gap-2 group">
            <Flame className="w-7 h-7 text-primary group-hover:scale-110 transition-transform" />
            <span className="text-fire-gradient font-serif font-black text-xl md:text-2xl tracking-tight">
              FOOD EXPRESS
            </span>
          </Link>

          {/* Desktop Nav */}
          <nav className="hidden lg:flex items-center gap-8">
            {navLinks.map((link) => (
              <Link
                key={link.href}
                href={link.href}
                className={`text-sm font-medium tracking-wide uppercase relative group transition-colors ${
                  isActive(link.href)
                    ? 'text-primary'
                    : 'text-foreground/80 hover:text-primary'
                }`}
              >
                {link.label}
                <span
                  className={`absolute -bottom-1 left-0 h-0.5 bg-fire-gradient transition-all duration-300 ${
                    isActive(link.href) ? 'w-full' : 'w-0 group-hover:w-full'
                  }`}
                />
              </Link>
            ))}
          </nav>

          {/* Desktop Right */}
          <div className="hidden md:flex items-center gap-3">
            {/* Search Button */}
            <button
              onClick={onSearchOpen}
              className="flex items-center gap-2 px-3 py-1.5 rounded-lg bg-secondary/60 border border-border/50 text-muted-foreground hover:text-foreground hover:border-primary/30 transition-all text-sm"
            >
              <Search className="w-4 h-4" />
              <span className="text-xs hidden sm:inline">Search</span>
              <kbd className="hidden lg:inline-flex items-center gap-0.5 px-1.5 py-0.5 rounded bg-secondary text-[10px] text-muted-foreground font-mono">
                Ctrl+K
              </kbd>
            </button>

            <a
              href="tel:+923205719979"
              className="hidden xl:flex items-center gap-2 text-foreground/70 hover:text-primary transition-colors text-sm"
            >
              <Phone className="w-4 h-4" />
              <span>+92 320 5719979</span>
            </a>

            {/* Cart Button */}
            <button
              onClick={onCartOpen}
              className="relative w-10 h-10 rounded-full bg-secondary/60 border border-border/50 flex items-center justify-center text-foreground hover:text-primary hover:border-primary/30 transition-all"
              aria-label="Open cart"
            >
              <ShoppingCart className="w-5 h-5" />
              {totalItems > 0 && (
                <motion.span
                  initial={{ scale: 0 }}
                  animate={{ scale: 1 }}
                  className="absolute -top-1 -right-1 w-5 h-5 rounded-full bg-primary text-primary-foreground text-[10px] font-bold flex items-center justify-center"
                >
                  {totalItems > 9 ? '9+' : totalItems}
                </motion.span>
              )}
            </button>

            <Link href="/menu">
              <Button
                className="bg-fire-gradient text-primary-foreground font-semibold glow-pulse hover:opacity-90 transition-opacity"
                size="sm"
              >
                Order Now
              </Button>
            </Link>
          </div>

          {/* Mobile Menu */}
          <div className="flex md:hidden items-center gap-2">
            {/* Mobile Search */}
            <Button
              variant="ghost"
              size="icon"
              className="text-foreground h-9 w-9"
              onClick={onSearchOpen}
              aria-label="Search"
            >
              <Search className="w-5 h-5" />
            </Button>

            {/* Mobile Cart */}
            <button
              onClick={onCartOpen}
              className="relative w-9 h-9 rounded-full bg-secondary/60 flex items-center justify-center text-foreground"
              aria-label="Open cart"
            >
              <ShoppingCart className="w-4 h-4" />
              {totalItems > 0 && (
                <span className="absolute -top-1 -right-1 w-4.5 h-4.5 rounded-full bg-primary text-primary-foreground text-[9px] font-bold flex items-center justify-center">
                  {totalItems > 9 ? '9+' : totalItems}
                </span>
              )}
            </button>

            {/* Hamburger Button */}
            <Button
              variant="ghost"
              size="icon"
              className="text-foreground"
              onClick={() => setMobileOpen(true)}
              aria-label="Open menu"
            >
              <Menu className="w-6 h-6" />
            </Button>
          </div>
        </div>
      </div>

      {/* Mobile Menu Drawer - Slides from Right */}
      <AnimatePresence>
        {mobileOpen && (
          <>
            {/* Backdrop */}
            <motion.div
              className="fixed inset-0 bg-black/50 backdrop-blur-sm z-[60]"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.3 }}
              onClick={() => setMobileOpen(false)}
            />

            {/* Drawer */}
            <motion.div
              className="fixed top-0 right-0 bottom-0 w-[280px] bg-background border-l border-border z-[70] flex flex-col"
              initial={{ x: '100%' }}
              animate={{ x: 0 }}
              exit={{ x: '100%' }}
              transition={{ type: 'spring', damping: 30, stiffness: 300 }}
            >
              {/* Drawer Header */}
              <div className="flex items-center justify-between p-4 border-b border-border">
                <Link href="/" className="text-fire-gradient font-serif font-black text-lg" onClick={() => setMobileOpen(false)}>
                  FOOD EXPRESS
                </Link>
                <Button
                  variant="ghost"
                  size="icon"
                  className="text-foreground h-8 w-8"
                  onClick={() => setMobileOpen(false)}
                  aria-label="Close menu"
                >
                  <X className="w-5 h-5" />
                </Button>
              </div>

              {/* Navigation Links */}
              <nav className="flex-1 overflow-y-auto py-4">
                {navLinks.map((link, i) => (
                  <motion.div
                    key={link.href}
                    initial={{ opacity: 0, x: 20 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: i * 0.05 }}
                  >
                    <Link
                      href={link.href}
                      onClick={() => setMobileOpen(false)}
                      className={`flex items-center text-lg font-medium py-3 px-5 transition-colors ${
                        isActive(link.href)
                          ? 'text-primary bg-primary/10 border-r-2 border-primary'
                          : 'text-foreground/80 hover:text-primary hover:bg-secondary/50'
                      }`}
                    >
                      {link.label}
                    </Link>
                  </motion.div>
                ))}
              </nav>

              {/* Drawer Footer */}
              <div className="p-4 border-t border-border">
                <Link href="/menu" onClick={() => setMobileOpen(false)}>
                  <Button
                    className="bg-fire-gradient text-primary-foreground font-semibold w-full"
                  >
                    Order Now
                  </Button>
                </Link>
              </div>
            </motion.div>
          </>
        )}
      </AnimatePresence>
    </motion.header>
  )
}
