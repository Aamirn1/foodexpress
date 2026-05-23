'use client'

import { useState, useEffect } from 'react'
import { motion } from 'framer-motion'
import { Phone, Menu, X, Flame } from 'lucide-react'
import { Button } from '@/components/ui/button'
import { Sheet, SheetContent, SheetTrigger, SheetTitle } from '@/components/ui/sheet'

const navLinks = [
  { label: 'Menu', href: '#menu' },
  { label: 'Specials', href: '#specials' },
  { label: 'About', href: '#about' },
  { label: 'Contact', href: '#contact' },
]

export default function Navbar() {
  const [scrolled, setScrolled] = useState(false)
  const [mobileOpen, setMobileOpen] = useState(false)

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 50)
    }
    window.addEventListener('scroll', handleScroll)
    return () => window.removeEventListener('scroll', handleScroll)
  }, [])

  const handleNavClick = (href: string) => {
    setMobileOpen(false)
    const el = document.querySelector(href)
    if (el) {
      el.scrollIntoView({ behavior: 'smooth' })
    }
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
          <a href="#" className="flex items-center gap-2 group" onClick={(e) => { e.preventDefault(); window.scrollTo({ top: 0, behavior: 'smooth' }) }}>
            <Flame className="w-7 h-7 text-primary group-hover:scale-110 transition-transform" />
            <span className="text-fire-gradient font-serif font-black text-xl md:text-2xl tracking-tight">
              FOOD EXPRESS
            </span>
          </a>

          {/* Desktop Nav */}
          <nav className="hidden md:flex items-center gap-8">
            {navLinks.map((link) => (
              <button
                key={link.href}
                onClick={() => handleNavClick(link.href)}
                className="text-foreground/80 hover:text-primary transition-colors text-sm font-medium tracking-wide uppercase relative group"
              >
                {link.label}
                <span className="absolute -bottom-1 left-0 w-0 h-0.5 bg-fire-gradient group-hover:w-full transition-all duration-300" />
              </button>
            ))}
          </nav>

          {/* Desktop Right */}
          <div className="hidden md:flex items-center gap-4">
            <a
              href="tel:+1234567890"
              className="flex items-center gap-2 text-foreground/70 hover:text-primary transition-colors text-sm"
            >
              <Phone className="w-4 h-4" />
              <span>(123) 456-7890</span>
            </a>
            <Button
              className="bg-fire-gradient text-primary-foreground font-semibold glow-pulse hover:opacity-90 transition-opacity"
              size="sm"
              onClick={() => handleNavClick('#menu')}
            >
              Order Now
            </Button>
          </div>

          {/* Mobile Menu */}
          <div className="flex md:hidden items-center gap-2">
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
                    <span className="text-fire-gradient font-serif font-black text-lg">
                      FOOD EXPRESS
                    </span>
                    <Button variant="ghost" size="icon" onClick={() => setMobileOpen(false)}>
                      <X className="w-5 h-5" />
                    </Button>
                  </div>
                  <nav className="flex flex-col gap-4">
                    {navLinks.map((link) => (
                      <button
                        key={link.href}
                        onClick={() => handleNavClick(link.href)}
                        className="text-left text-foreground/80 hover:text-primary transition-colors text-lg font-medium py-2 border-b border-border/50"
                      >
                        {link.label}
                      </button>
                    ))}
                  </nav>
                  <a
                    href="tel:+1234567890"
                    className="flex items-center gap-2 text-foreground/70 text-sm"
                  >
                    <Phone className="w-4 h-4" />
                    (123) 456-7890
                  </a>
                  <Button
                    className="bg-fire-gradient text-primary-foreground font-semibold w-full"
                    onClick={() => handleNavClick('#menu')}
                  >
                    Order Now
                  </Button>
                </div>
              </SheetContent>
            </Sheet>
          </div>
        </div>
      </div>
    </motion.header>
  )
}
