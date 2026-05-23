'use client'

import { motion } from 'framer-motion'
import { Flame, Phone, Mail, MapPin, Facebook, Instagram, Twitter } from 'lucide-react'

const quickLinks = [
  { label: 'Menu', href: '#menu' },
  { label: 'Specials', href: '#specials' },
  { label: 'About', href: '#about' },
  { label: 'Contact', href: '#contact' },
]

const hours = [
  { day: 'Monday - Sunday', time: '10AM - 11PM' },
]

const socialLinks = [
  { icon: Facebook, href: '#', label: 'Facebook' },
  { icon: Instagram, href: '#', label: 'Instagram' },
  { icon: Twitter, href: '#', label: 'Twitter' },
]

export default function Footer() {
  const handleNavClick = (href: string) => {
    const el = document.querySelector(href)
    if (el) {
      el.scrollIntoView({ behavior: 'smooth' })
    }
  }

  return (
    <footer id="contact" className="border-t border-border bg-card/50 mt-auto">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 md:py-16">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8 lg:gap-12">
          {/* Brand */}
          <motion.div
            className="sm:col-span-2 lg:col-span-1"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
          >
            <div className="flex items-center gap-2 mb-4">
              <Flame className="w-6 h-6 text-primary" />
              <span className="text-fire-gradient font-serif font-black text-xl">
                FOOD EXPRESS
              </span>
            </div>
            <p className="text-muted-foreground text-sm leading-relaxed">
              Where flavor meets fire. Premium fast food restaurant serving bold,
              delicious meals since 2009. Every bite is a masterpiece.
            </p>
            {/* Social Links */}
            <div className="flex gap-3 mt-5">
              {socialLinks.map((social) => (
                <a
                  key={social.label}
                  href={social.href}
                  aria-label={social.label}
                  className="w-9 h-9 rounded-lg bg-background border border-border flex items-center justify-center text-muted-foreground hover:text-primary hover:border-primary/50 transition-colors"
                >
                  <social.icon className="w-4 h-4" />
                </a>
              ))}
            </div>
          </motion.div>

          {/* Quick Links */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: 0.1 }}
          >
            <h3 className="font-serif font-bold text-foreground mb-4">Quick Links</h3>
            <ul className="space-y-2">
              {quickLinks.map((link) => (
                <li key={link.label}>
                  <button
                    onClick={() => handleNavClick(link.href)}
                    className="text-muted-foreground hover:text-primary transition-colors text-sm"
                  >
                    {link.label}
                  </button>
                </li>
              ))}
            </ul>
          </motion.div>

          {/* Hours */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: 0.2 }}
          >
            <h3 className="font-serif font-bold text-foreground mb-4">Hours</h3>
            {hours.map((h) => (
              <div key={h.day} className="mb-2">
                <p className="text-foreground text-sm font-medium">{h.day}</p>
                <p className="text-fire-gradient font-semibold text-sm">{h.time}</p>
              </div>
            ))}
            <div className="mt-4 px-3 py-2 rounded-lg border border-primary/20 bg-primary/5">
              <p className="text-primary text-xs font-medium">🔥 Open 7 Days a Week</p>
            </div>
          </motion.div>

          {/* Contact */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: 0.3 }}
          >
            <h3 className="font-serif font-bold text-foreground mb-4">Contact</h3>
            <ul className="space-y-3">
              <li className="flex items-center gap-2 text-muted-foreground text-sm">
                <Phone className="w-4 h-4 text-primary shrink-0" />
                <a href="tel:+1234567890" className="hover:text-primary transition-colors">(123) 456-7890</a>
              </li>
              <li className="flex items-center gap-2 text-muted-foreground text-sm">
                <Mail className="w-4 h-4 text-primary shrink-0" />
                <a href="mailto:hello@foodexpress.com" className="hover:text-primary transition-colors">hello@foodexpress.com</a>
              </li>
              <li className="flex items-start gap-2 text-muted-foreground text-sm">
                <MapPin className="w-4 h-4 text-primary shrink-0 mt-0.5" />
                <span>123 Flavor Street, Food District, NY 10001</span>
              </li>
            </ul>
          </motion.div>
        </div>
      </div>

      {/* Copyright */}
      <div className="border-t border-border">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4">
          <p className="text-center text-muted-foreground text-sm">
            © {new Date().getFullYear()} Food Express. All rights reserved. Made with 🔥
          </p>
        </div>
      </div>
    </footer>
  )
}
