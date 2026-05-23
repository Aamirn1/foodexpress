'use client'

import { motion } from 'framer-motion'
import { RotateCcw, Clock, CreditCard, Phone, AlertCircle, CheckCircle, Mail, Truck } from 'lucide-react'

const sections = [
  {
    icon: RotateCcw,
    title: 'Refund Policy Overview',
    content: [
      'At Food Express, your satisfaction is our top priority. If you are not happy with your order, we want to make it right.',
      'We offer refunds, replacements, or credit for qualifying issues including incorrect items, missing items, food quality concerns, and delivery problems.',
      'All refund requests must be submitted within 24 hours of your order delivery or pickup time.',
      'Refunds are processed back to your original payment method unless you request credit to your account.',
    ],
  },
  {
    icon: CheckCircle,
    title: 'Qualifying for a Refund',
    content: [
      'Incorrect items: If you receive a different item than what you ordered, we will refund the item or send the correct one.',
      'Missing items: If part of your order is missing, we will refund the missing items or deliver them at no extra charge.',
      'Food quality issues: If your food arrives cold, damaged, or does not meet our quality standards, we will issue a refund or replacement.',
      'Late delivery: If your order arrives more than 30 minutes beyond the estimated delivery time, you may qualify for a partial refund or delivery fee waiver.',
      'Allergen concerns: If you received food that does not match the allergen information displayed on our menu, contact us immediately for a full refund.',
    ],
  },
  {
    icon: AlertCircle,
    title: 'Non-Qualifying Refund Reasons',
    content: [
      'Subjective taste preferences or personal dislikes that are not related to food quality or preparation errors.',
      'Orders where customizations were not clearly specified or confirmed at the time of ordering.',
      'Minor variations in portion size or appearance, as these can naturally vary.',
      'Orders picked up after the stated ready time, which may affect food temperature.',
      'Issues reported more than 24 hours after delivery or pickup.',
    ],
  },
  {
    icon: CreditCard,
    title: 'Refund Processing',
    content: [
      'Credit and debit card refunds are processed within 3-5 business days and appear on your statement within 5-10 business days.',
      'Cash on Delivery refunds are issued as account credit or can be picked up at our restaurant location.',
      'Online payment refunds (Apple Pay, Google Pay) follow the same timeline as card refunds.',
      'Account credits are applied immediately and can be used toward future orders with no expiration date.',
      'Delivery fees are refunded if the issue is related to delivery problems or significant delays.',
    ],
  },
  {
    icon: Clock,
    title: 'Replacement Orders',
    content: [
      'In many cases, we prefer to send a replacement item rather than process a refund so you can enjoy your meal as intended.',
      'Replacement orders are given priority and delivered as quickly as possible at no additional charge.',
      'If the replacement item is unavailable, a full refund for that item will be processed instead.',
      'You may choose between a replacement, refund, or account credit for qualifying issues.',
    ],
  },
  {
    icon: Phone,
    title: 'How to Request a Refund',
    content: [
      'Call us at +92 320 5719979 during business hours (10 AM - 11 PM) for the fastest resolution.',
      'Email us at support@foodexpress.com with your order number, photos of the issue, and a brief description.',
      'Use the "Report Issue" feature in our mobile app under your order history.',
      'Visit our restaurant in person with your receipt for immediate resolution.',
      'All requests are reviewed within 24 hours and you will receive confirmation once your refund is processed.',
    ],
  },
  {
    icon: Truck,
    title: 'Delivery Issues',
    content: [
      'If your order is delivered to the wrong address due to our error, we will redeliver or provide a full refund.',
      'If your order is damaged during transit, please take photos and contact us immediately for a replacement or refund.',
      'Weather-related delays do not qualify for refunds, but we will communicate proactively about expected delays.',
      'If a delivery partner reports your order as delivered but you did not receive it, contact us immediately.',
    ],
  },
]

export default function RefundPage() {
  return (
    <div className="min-h-screen bg-background">
      {/* Header */}
      <section className="pt-24 pb-12">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7 }}
          >
            <RotateCcw className="w-12 h-12 text-primary mb-4" />
            <h1 className="text-4xl md:text-5xl font-serif font-black text-fire-gradient mb-4">
              Refund Policy
            </h1>
            <p className="text-muted-foreground text-lg">
              Last updated: January 1, 2026
            </p>
            <p className="text-muted-foreground mt-2">
              We stand behind the quality of our food and service. If something is not right, we will make it right. This policy outlines our commitment to your satisfaction.
            </p>
          </motion.div>
        </div>
      </section>

      {/* Content Sections */}
      <section className="pb-16">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 space-y-6">
          {sections.map((section, idx) => (
            <motion.div
              key={section.title}
              className="bg-card rounded-xl border border-border p-6 card-glow"
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.4, delay: idx * 0.05 }}
            >
              <div className="flex items-center gap-3 mb-4">
                <div className="w-10 h-10 rounded-lg bg-primary/10 flex items-center justify-center shrink-0">
                  <section.icon className="w-5 h-5 text-primary" />
                </div>
                <h2 className="text-xl font-serif font-bold text-foreground">
                  {section.title}
                </h2>
              </div>
              <ul className="space-y-3">
                {section.content.map((item, i) => (
                  <li key={i} className="flex gap-3 text-muted-foreground text-sm leading-relaxed">
                    <span className="text-primary mt-1 shrink-0">-</span>
                    <span>{item}</span>
                  </li>
                ))}
              </ul>
            </motion.div>
          ))}
        </div>
      </section>

      {/* Contact CTA */}
      <section className="py-8 pb-16">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            className="bg-card rounded-xl border border-border p-6 text-center"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
          >
            <Mail className="w-8 h-8 text-primary mx-auto mb-3" />
            <h3 className="font-serif font-bold text-foreground mb-2">
              Need Help With a Refund?
            </h3>
            <p className="text-muted-foreground text-sm mb-4">
              Our customer support team is available 10 AM - 11 PM, 7 days a week
            </p>
            <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
              <a
                href="tel:+923205719979"
                className="text-primary font-medium hover:underline text-sm flex items-center gap-2"
              >
                <Phone className="w-4 h-4" />
                +92 320 5719979
              </a>
              <a
                href="mailto:support@foodexpress.com"
                className="text-primary font-medium hover:underline text-sm flex items-center gap-2"
              >
                <Mail className="w-4 h-4" />
                support@foodexpress.com
              </a>
            </div>
          </motion.div>
        </div>
      </section>
    </div>
  )
}
