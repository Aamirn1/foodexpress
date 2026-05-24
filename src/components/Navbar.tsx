'use client'

import { useState, useEffect, useRef } from 'react'
import { usePathname } from 'next/navigation'
import Link from 'next/link'
import { createPortal } from 'react-dom'
import { motion, AnimatePresence } from 'framer-motion'
import { Flame, Search, ShoppingCart, X } from 'lucide-react'
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
  const [canPortal, setCanPortal] = useState(false)
  const pathname = usePathname()

  useEffect(() => {
    const id = requestAnimationFrame(() => setCanPortal(true))
    return () => cancelAnimationFrame(id)
  }, [])

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 50)
    }
    window.addEventListener('scroll', handleScroll)
    return () => window.removeEventListener('scroll', handleScroll)
  }, [])

  // Close mobile menu on route change
  const prevPathname = useRef(pathname)
  useEffect(() => {
    if (prevPathname.current !== pathname) {
      prevPathname.current = pathname
      setMobileOpen(false)
    }
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

  // Mobile drawer rendered via portal to body so it's never stuck inside header
  const mobileDrawer = canPortal ? createPortal(
    <AnimatePresence>
      {mobileOpen && (
        <>
          {/* Backdrop */}
          <motion.div
            className="fixed inset-0 bg-black/60 backdrop-blur-sm"
            style={{ zIndex: 9998 }}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.3 }}
            onClick={() => setMobileOpen(false)}
          />

          {/* Drawer */}
          <motion.div
            className="fixed top-0 right-0 bottom-0 w-[300px] bg-background border-l border-border flex flex-col"
            style={{ zIndex: 9999 }}
            initial={{ x: '100%' }}
            animate={{ x: 0 }}
            exit={{ x: '100%' }}
            transition={{ type: 'spring', damping: 30, stiffness: 300 }}
          >
            {/* Drawer Header with Fire gradient accent */}
            <div className="relative">
              <div className="absolute inset-x-0 top-0 h-1 bg-fire-gradient" />
              <div className="flex items-center justify-between p-5 border-b border-border">
                <Link href="/" className="flex items-center gap-2" onClick={() => setMobileOpen(false)}>
                  <Flame className="w-6 h-6 text-primary" />
                  <span className="text-fire-gradient font-serif font-black text-lg">
                    FOOD EXPRESS
                  </span>
                </Link>
                <button
                  className="w-8 h-8 rounded-full bg-secondary/80 border border-border flex items-center justify-center text-muted-foreground hover:text-foreground hover:border-primary/40 transition-all"
                  onClick={() => setMobileOpen(false)}
                  aria-label="Close menu"
                >
                  <X className="w-4 h-4" />
                </button>
              </div>
            </div>

            {/* Navigation Links */}
            <nav className="flex-1 overflow-y-auto py-3">
              {navLinks.map((link, i) => (
                <motion.div
                  key={link.href}
                  initial={{ opacity: 0, x: 30 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: i * 0.05, duration: 0.3 }}
                >
                  <Link
                    href={link.href}
                    onClick={() => setMobileOpen(false)}
                    className={`flex items-center text-base font-medium py-3.5 px-5 transition-all ${
                      isActive(link.href)
                        ? 'text-primary bg-primary/10 border-r-2 border-primary'
                        : 'text-foreground/80 hover:text-primary hover:bg-primary/5'
                    }`}
                  >
                    {link.label}
                  </Link>
                </motion.div>
              ))}
            </nav>

            {/* Drawer Footer */}
            <div className="p-5 border-t border-border space-y-3">
              <Link href="/menu" onClick={() => setMobileOpen(false)} className="block">
                <Button
                  className="bg-fire-gradient text-primary-foreground font-semibold w-full btn-fire-glow py-5"
                >
                  <Flame className="w-4 h-4 mr-2" />
                  Order Now
                </Button>
              </Link>
              <p className="text-center text-xs text-muted-foreground">
                Open 7 Days · 10AM - 11PM
              </p>
            </div>
          </motion.div>
        </>
      )}
    </AnimatePresence>,
    document.body
  ) : null

  return (
    <>
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

            {/* Mobile Menu Buttons */}
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

              {/* Hamburger Button - Fire themed */}
              <button
                className="relative w-9 h-9 flex flex-col items-center justify-center gap-[5px] rounded-lg bg-secondary/60 border border-border/50 hover:border-primary/40 transition-all group"
                onClick={() => setMobileOpen(true)}
                aria-label="Open menu"
              >
                <span className="w-5 h-[2px] bg-fire-gradient rounded-full transition-all group-hover:w-5" />
                <span className="w-4 h-[2px] bg-fire-gradient rounded-full transition-all group-hover:w-5" />
                <span className="w-3 h-[2px] bg-fire-gradient rounded-full transition-all group-hover:w-5" />
              </button>
            </div>
          </div>
        </div>
      </motion.header>

      {/* Mobile Drawer - rendered via portal so it's always on top regardless of scroll position */}
      {mobileDrawer}
    </>
  )
}
