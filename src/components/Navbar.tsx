'use client'

import { useState, useEffect } from 'react'
import { usePathname } from 'next/navigation'
import Link from 'next/link'
import { motion } from 'framer-motion'
import { Phone, Menu, X, Flame, Search, ShoppingCart } from 'lucide-react'
import { Button } from '@/components/ui/button'
import { Sheet, SheetContent, SheetTrigger, SheetTitle } from '@/components/ui/sheet'

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
              href="tel:+1234567890"
              className="hidden xl:flex items-center gap-2 text-foreground/70 hover:text-primary transition-colors text-sm"
            >
              <Phone className="w-4 h-4" />
              <span>(123) 456-7890</span>
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

            <Sheet open={mobileOpen} onOpenChange={setMobileOpen}>
              <SheetTrigger asChild>
                <Button variant="ghost" size="icon" className="text-foreground">
                  <Menu className="w-6 h-6" />
                </Button>
              </SheetTrigger>
              <SheetContent side="right" className="bg-background border-border w-72">
                <SheetTitle className="sr-only">Navigation Menu</SheetTitle>
                <div className="flex flex-col gap-6 mt-8">
                  <div className="flex items-center justify-between">
                    <Link href="/" className="text-fire-gradient font-serif font-black text-lg" onClick={() => setMobileOpen(false)}>
                      FOOD EXPRESS
                    </Link>
                  </div>
                  <nav className="flex flex-col gap-1">
                    {navLinks.map((link) => (
                      <Link
                        key={link.href}
                        href={link.href}
                        onClick={() => setMobileOpen(false)}
                        className={`text-left text-lg font-medium py-3 px-3 rounded-lg transition-colors ${
                          isActive(link.href)
                            ? 'text-primary bg-primary/10'
                            : 'text-foreground/80 hover:text-primary hover:bg-secondary/50'
                        }`}
                      >
                        {link.label}
                      </Link>
                    ))}
                  </nav>
                  <div className="border-t border-border/50 pt-4">
                    <a
                      href="tel:+1234567890"
                      className="flex items-center gap-2 text-foreground/70 text-sm px-3"
                    >
                      <Phone className="w-4 h-4" />
                      (123) 456-7890
                    </a>
                  </div>
                  <Link href="/menu" onClick={() => setMobileOpen(false)}>
                    <Button
                      className="bg-fire-gradient text-primary-foreground font-semibold w-full"
                    >
                      Order Now
                    </Button>
                  </Link>
                </div>
              </SheetContent>
            </Sheet>
          </div>
        </div>
      </div>
    </motion.header>
  )
}
