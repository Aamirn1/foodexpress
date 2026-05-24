'use client'

import { useState } from 'react'
import { motion } from 'framer-motion'
import { Mail, Send } from 'lucide-react'
import { Input } from '@/components/ui/input'
import { Button } from '@/components/ui/button'

export default function NewsletterSection() {
  const [email, setEmail] = useState('')
  const [submitted, setSubmitted] = useState(false)

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    if (email) {
      setSubmitted(true)
      setEmail('')
      setTimeout(() => setSubmitted(false), 3000)
    }
  }

  return (
    <section className="py-16 md:py-24 relative overflow-hidden">
      {/* Background */}
      <div className="absolute inset-0 bg-gradient-to-b from-background via-secondary/30 to-background" />
      <div
        className="absolute inset-0 opacity-5"
        style={{
          backgroundImage: 'radial-gradient(circle at 50% 50%, hsl(18 100% 60% / 0.3), transparent 60%)',
        }}
      />

      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div
          className="max-w-2xl mx-auto text-center"
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.7 }}
        >
          <div className="inline-flex items-center gap-2 mb-4">
            <Mail className="w-5 h-5 text-primary" />
            <span className="text-primary text-sm font-semibold tracking-wider uppercase">Newsletter</span>
          </div>

          <h2 className="font-serif text-3xl md:text-4xl lg:text-5xl font-black">
            Stay Hungry,{' '}
            <span className="text-fire-gradient">Stay Updated</span>
          </h2>

          <p className="text-foreground/70 mt-4 leading-relaxed">
            Subscribe to our newsletter for exclusive deals, new menu announcements,
            and special offers delivered straight to your inbox.
          </p>

          <form onSubmit={handleSubmit} className="mt-8 flex flex-col sm:flex-row gap-3 max-w-lg mx-auto">
            <Input
              type="email"
              placeholder="Enter your email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="bg-card border-border text-foreground placeholder:text-muted-foreground h-12 flex-1"
              required
            />
            <Button
              type="submit"
              className="bg-fire-gradient text-primary-foreground font-semibold h-12 px-6 btn-fire-glow hover:opacity-90 transition-opacity"
            >
              <Send className="w-4 h-4 mr-2" />
              Subscribe
            </Button>
          </form>

          {submitted && (
            <motion.p
              className="text-primary mt-4 font-medium"
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
            >
              🔥 Welcome aboard! Check your inbox for a special welcome offer.
            </motion.p>
          )}

          <p className="text-muted-foreground text-xs mt-4">
            No spam, ever. Unsubscribe at any time.
          </p>
        </motion.div>
      </div>
    </section>
  )
}
