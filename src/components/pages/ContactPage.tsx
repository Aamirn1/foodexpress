'use client'

import { motion } from 'framer-motion'
import { Phone, Mail, MapPin, Clock, MessageCircle, Flame } from 'lucide-react'
import { Button } from '@/components/ui/button'

const contactCards = [
  {
    icon: Phone,
    title: 'Phone',
    detail: '+92 320 5719979',
    subtitle: 'Available for orders & inquiries',
    href: 'tel:+923205719979',
  },
  {
    icon: Mail,
    title: 'Email',
    detail: 'hello@foodexpress.com',
    subtitle: 'We respond within 24 hours',
    href: 'mailto:hello@foodexpress.com',
  },
  {
    icon: MapPin,
    title: 'Location',
    detail: 'Lalkurti, Rawalpindi',
    subtitle: 'Rawalpindi',
    href: '#',
  },
  {
    icon: Clock,
    title: 'Business Hours',
    detail: '10:00 AM - 11:00 PM',
    subtitle: 'Open 7 days a week',
    href: '#',
  },
]

export default function ContactPage() {
  return (
    <div className="min-h-screen bg-background">
      {/* Header */}
      <section className="pt-24 pb-12">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7 }}
          >
            <Flame className="w-12 h-12 text-primary mx-auto mb-4" />
            <h1 className="text-4xl md:text-6xl font-serif font-black text-fire-gradient mb-4">
              Get in Touch
            </h1>
            <p className="text-muted-foreground text-lg max-w-2xl mx-auto">
              Have a question, feedback, or just want to say hello? We would love to hear from you.
              Reach out through any of the channels below.
            </p>
          </motion.div>
        </div>
      </section>

      {/* Contact Cards */}
      <section className="py-8">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {contactCards.map((card, idx) => (
              <motion.a
                key={card.title}
                href={card.href}
                className="card-glow bg-card rounded-xl border border-border p-6 text-center hover:bg-card/80 transition-colors block"
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: idx * 0.1 }}
              >
                <div className="w-14 h-14 rounded-xl bg-primary/10 flex items-center justify-center mx-auto mb-4">
                  <card.icon className="w-7 h-7 text-primary" />
                </div>
                <h3 className="font-serif font-bold text-foreground text-lg mb-1">
                  {card.title}
                </h3>
                <p className="text-fire-gradient font-semibold mb-1">
                  {card.detail}
                </p>
                <p className="text-muted-foreground text-sm">
                  {card.subtitle}
                </p>
              </motion.a>
            ))}
          </div>
        </div>
      </section>

      {/* WhatsApp CTA */}
      <section className="py-12">
        <div className="max-w-2xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
          >
            <div className="bg-card rounded-2xl border border-border p-8">
              <MessageCircle className="w-10 h-10 text-green-400 mx-auto mb-4" />
              <h2 className="text-2xl font-serif font-bold text-foreground mb-2">
                Chat with Us on WhatsApp
              </h2>
              <p className="text-muted-foreground mb-6">
                Get instant responses to your questions. Our team is available during business hours
                to help you with orders, menu inquiries, and more.
              </p>
              <Button
                asChild
                className="bg-green-600 hover:bg-green-700 text-white font-semibold px-8 py-6 text-base"
              >
                <a
                  href="https://wa.me/923205719979"
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  <MessageCircle className="w-5 h-5 mr-2" />
                  Open WhatsApp
                </a>
              </Button>
            </div>
          </motion.div>
        </div>
      </section>

      {/* Map Placeholder */}
      <section className="py-8 pb-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            className="rounded-2xl border border-border overflow-hidden bg-card"
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
          >
            <div className="aspect-[21/9] bg-secondary/50 flex items-center justify-center relative">
              <div className="absolute inset-0 bg-gradient-to-br from-primary/5 to-accent/5" />
              <div className="text-center relative z-10">
                <MapPin className="w-12 h-12 text-primary/40 mx-auto mb-3" />
                <h3 className="font-serif font-bold text-foreground text-xl mb-1">
                  Lalkurti, Rawalpindi
                </h3>
                <p className="text-muted-foreground text-sm">
                  Rawalpindi
                </p>
                <p className="text-muted-foreground text-xs mt-2">
                  Interactive map coming soon
                </p>
              </div>
            </div>
          </motion.div>
        </div>
      </section>
    </div>
  )
}
