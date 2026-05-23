'use client'

import { motion } from 'framer-motion'
import { FileText, ShoppingBag, CreditCard, AlertTriangle, Gavel, RefreshCw, Smartphone, Mail } from 'lucide-react'

const sections = [
  {
    icon: ShoppingBag,
    title: 'Ordering & Services',
    content: [
      'By placing an order through Food Express, you agree to these Terms of Service and our Privacy Policy.',
      'All menu items, prices, and availability are subject to change without prior notice. We strive to keep our online menu accurate and up-to-date.',
      'You must be at least 18 years old or have parental consent to place orders through our services.',
      'We reserve the right to refuse or cancel any order for any reason, including suspected fraud, pricing errors, or unavailability of items.',
      'Order confirmation emails serve as acknowledgment of your order, not as acceptance. Acceptance occurs when your order enters preparation.',
    ],
  },
  {
    icon: CreditCard,
    title: 'Payment Terms',
    content: [
      'All prices are displayed in US Dollars and include applicable taxes unless otherwise stated.',
      'Payment is processed at the time of order placement for online and card payments.',
      'For Cash on Delivery orders, payment is collected upon delivery. Exact change may not always be available.',
      'We accept Visa, MasterCard, American Express, Apple Pay, and Google Pay through our secure payment processors.',
      'Promotional discounts and loyalty points are subject to their own terms and may be modified or discontinued at any time.',
    ],
  },
  {
    icon: RefreshCw,
    title: 'Cancellations & Modifications',
    content: [
      'Orders can be cancelled or modified within 5 minutes of placement by contacting us at (123) 456-7890.',
      'After 5 minutes, orders enter preparation and may not be eligible for cancellation or modification.',
      'We reserve the right to cancel orders due to unforeseen circumstances including severe weather, equipment failure, or supply issues.',
      'If we cancel your order, you will receive a full refund to your original payment method within 5-7 business days.',
      'Repeated cancellations may result in restrictions on your account.',
    ],
  },
  {
    icon: Smartphone,
    title: 'Mobile App & Website Use',
    content: [
      'You agree to use our website and mobile app only for lawful purposes and in accordance with these Terms.',
      'You must not attempt to gain unauthorized access to any part of our services, systems, or networks.',
      'Content on our website, including images, descriptions, and branding, is protected by intellectual property laws and may not be reproduced without permission.',
      'You are responsible for maintaining the confidentiality of your account credentials and for all activities under your account.',
      'We may update, modify, or discontinue any part of our services at any time without prior notice.',
    ],
  },
  {
    icon: AlertTriangle,
    title: 'Limitation of Liability',
    content: [
      'Food Express provides our services on an "as is" and "as available" basis without warranties of any kind.',
      'We are not liable for any indirect, incidental, or consequential damages arising from your use of our services.',
      'Our total liability for any claim arising from these terms or your use of our services shall not exceed the amount you paid for the specific order in question.',
      'We are not responsible for delivery delays caused by factors beyond our reasonable control, including weather, traffic, or third-party issues.',
      'We do not guarantee that allergen information is 100% complete or accurate. Customers with severe allergies should contact us directly before ordering.',
    ],
  },
  {
    icon: Gavel,
    title: 'Dispute Resolution & Governing Law',
    content: [
      'These Terms are governed by and construed in accordance with the laws of the State of New York.',
      'Any disputes arising from these Terms or your use of our services shall be resolved through good-faith negotiation first.',
      'If negotiation fails, disputes shall be submitted to binding arbitration in New York, NY, in accordance with applicable arbitration rules.',
      'You agree to waive your right to a jury trial and to participate in class action lawsuits related to these Terms.',
      'If any provision of these Terms is found unenforceable, the remaining provisions will continue in full effect.',
    ],
  },
]

export default function TermsPage() {
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
            <FileText className="w-12 h-12 text-primary mb-4" />
            <h1 className="text-4xl md:text-5xl font-serif font-black text-fire-gradient mb-4">
              Terms of Service
            </h1>
            <p className="text-muted-foreground text-lg">
              Last updated: January 1, 2026
            </p>
            <p className="text-muted-foreground mt-2">
              Welcome to Food Express. By using our website, mobile app, or placing an order, you agree to be bound by these Terms of Service. Please read them carefully.
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

      {/* Contact */}
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
              Questions About These Terms?
            </h3>
            <p className="text-muted-foreground text-sm mb-3">
              Contact our legal team at legal@foodexpress.com
            </p>
            <a
              href="mailto:legal@foodexpress.com"
              className="text-primary font-medium hover:underline text-sm"
            >
              legal@foodexpress.com
            </a>
          </motion.div>
        </div>
      </section>
    </div>
  )
}
