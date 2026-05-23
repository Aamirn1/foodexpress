'use client'

import Link from 'next/link'
import { motion } from 'framer-motion'
import { Flame, Phone, Mail, MapPin, Facebook, Instagram, Youtube } from 'lucide-react'

const menuLinks = [
  { label: 'Full Menu', href: '/menu' },
  { label: 'Burgers', href: '/menu?category=burgers' },
  { label: 'Pizza', href: '/menu?category=pizza' },
  { label: 'Chicken', href: '/menu?category=chicken' },
  { label: 'Desserts', href: '/menu?category=desserts' },
]

const supportLinks = [
  { label: 'Contact Us', href: '/contact' },
  { label: 'FAQ', href: '/faq' },
  { label: 'Blog', href: '/blog' },
  { label: 'About Us', href: '/about' },
]

const legalLinks = [
  { label: 'Privacy Policy', href: '/privacy' },
  { label: 'Terms of Service', href: '/terms' },
  { label: 'Refund Policy', href: '/refund' },
]

const socialLinks = [
  { icon: Facebook, href: 'https://facebook.com', label: 'Facebook' },
  { icon: Instagram, href: 'https://instagram.com', label: 'Instagram' },
  { icon: Youtube, href: 'https://youtube.com', label: 'YouTube' },
]

export default function Footer() {
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
            <Link href="/" className="flex items-center gap-2 mb-4">
              <Flame className="w-6 h-6 text-primary" />
              <span className="text-fire-gradient font-serif font-black text-xl">
                FOOD EXPRESS
              </span>
            </Link>
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
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label={social.label}
                  className="w-9 h-9 rounded-lg bg-background border border-border flex items-center justify-center text-muted-foreground hover:text-primary hover:border-primary/50 transition-colors"
                >
                  <social.icon className="w-4 h-4" />
                </a>
              ))}
            </div>
          </motion.div>

          {/* Menu Links */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: 0.1 }}
          >
            <h3 className="font-serif font-bold text-foreground mb-4">Menu</h3>
            <ul className="space-y-2">
              {menuLinks.map((link) => (
                <li key={link.label}>
                  <Link
                    href={link.href}
                    className="text-muted-foreground hover:text-primary transition-colors text-sm"
                  >
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </motion.div>

          {/* Support Links */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: 0.2 }}
          >
            <h3 className="font-serif font-bold text-foreground mb-4">Support</h3>
            <ul className="space-y-2">
              {supportLinks.map((link) => (
                <li key={link.label}>
                  <Link
                    href={link.href}
                    className="text-muted-foreground hover:text-primary transition-colors text-sm"
                  >
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
            <div className="mt-4 px-3 py-2 rounded-lg border border-primary/20 bg-primary/5">
              <p className="text-primary text-xs font-medium">Open 7 Days a Week</p>
              <p className="text-muted-foreground text-xs">10AM - 11PM Daily</p>
            </div>
          </motion.div>

          {/* Contact & Legal */}
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
                <a href="tel:+923205719979" className="hover:text-primary transition-colors">+92 320 5719979</a>
              </li>
              <li className="flex items-center gap-2 text-muted-foreground text-sm">
                <Mail className="w-4 h-4 text-primary shrink-0" />
                <a href="mailto:hello@foodexpress.com" className="hover:text-primary transition-colors">hello@foodexpress.com</a>
              </li>
              <li className="flex items-start gap-2 text-muted-foreground text-sm">
                <MapPin className="w-4 h-4 text-primary shrink-0 mt-0.5" />
                <span>Lalkurti, Rawalpindi</span>
              </li>
            </ul>
            <div className="mt-5">
              <h4 className="text-xs font-semibold text-muted-foreground uppercase tracking-wider mb-2">Legal</h4>
              <ul className="space-y-1">
                {legalLinks.map((link) => (
                  <li key={link.label}>
                    <Link
                      href={link.href}
                      className="text-muted-foreground hover:text-primary transition-colors text-xs"
                    >
                      {link.label}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          </motion.div>
        </div>
      </div>

      {/* Copyright */}
      <div className="border-t border-border">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4">
          <div className="flex flex-col sm:flex-row items-center justify-between gap-2">
            <p className="text-muted-foreground text-xs">
              &copy; {new Date().getFullYear()} Food Express. All rights reserved.
            </p>
            <div className="flex items-center gap-4">
              {legalLinks.map((link) => (
                <Link
                  key={link.label}
                  href={link.href}
                  className="text-muted-foreground hover:text-primary transition-colors text-xs"
                >
                  {link.label}
                </Link>
              ))}
            </div>
          </div>
        </div>
      </div>
    </footer>
  )
}
