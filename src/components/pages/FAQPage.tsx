'use client'

import { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { ChevronDown, Flame, HelpCircle } from 'lucide-react'

const faqItems = [
  {
    question: 'What are your delivery hours?',
    answer: 'We deliver from 10:00 AM to 10:30 PM, seven days a week. Orders placed after 10:30 PM will be scheduled for delivery the following day. During peak hours (12 PM - 2 PM and 6 PM - 9 PM), delivery times may be slightly longer.',
  },
  {
    question: 'What is the minimum order amount for delivery?',
    answer: 'Our minimum order for delivery is $15. Orders over $25 qualify for free delivery within our standard delivery zone. For orders under $25, a small delivery fee of $3.99 applies.',
  },
  {
    question: 'Do you provide allergen information?',
    answer: 'Yes, we take food safety seriously. Allergen information is available on each menu item detail page. Our kitchen handles nuts, dairy, gluten, and other common allergens. If you have a severe allergy, please call us directly before placing your order so we can take extra precautions.',
  },
  {
    question: 'Can I cancel or modify my order?',
    answer: 'You can cancel or modify your order within 5 minutes of placing it by calling us at +92 320 5719979. After 5 minutes, your order enters preparation and may not be eligible for cancellation. We will always try our best to accommodate changes.',
  },
  {
    question: 'What payment methods do you accept?',
    answer: 'We accept Cash on Delivery, all major credit and debit cards (Visa, MasterCard, American Express), Apple Pay, Google Pay, and online payment through our app. All online payments are securely processed with industry-standard encryption.',
  },
  {
    question: 'How long does delivery usually take?',
    answer: 'Standard delivery takes 30-45 minutes depending on your location and current order volume. During peak hours, delivery may take up to 60 minutes. You can track your order in real-time through our app once it has been dispatched.',
  },
  {
    question: 'Do you offer catering for events?',
    answer: 'Absolutely! We offer catering services for events of all sizes, from office lunches to large parties. Our catering menu includes party platters, bulk orders, and custom packages. Please contact us at least 48 hours in advance for catering orders by calling +92 320 5719979 or emailing catering@foodexpress.com.',
  },
  {
    question: 'Is your packaging eco-friendly?',
    answer: 'Yes, we are committed to sustainability. All our packaging is made from recycled and biodegradable materials. Our containers, bags, and utensils are 100% compostable. We are constantly working to reduce our environmental footprint while keeping your food fresh and secure.',
  },
  {
    question: 'Do you have loyalty or rewards programs?',
    answer: 'Yes! Our Fire Rewards program earns you points on every order. You get 1 point for every dollar spent, and every 100 points earns you $5 off your next order. Sign up through our app or website to start earning today. Bonus points are available during special promotions.',
  },
  {
    question: 'Can I customize my order?',
    answer: 'Of course! Every menu item can be customized with different sizes, spice levels, and add-ons. You can also add special instructions for your order, such as extra sauce on the side or no pickles. Customization options are available on each item detail page.',
  },
]

function FAQItem({
  question,
  answer,
  isOpen,
  onToggle,
}: {
  question: string
  answer: string
  isOpen: boolean
  onToggle: () => void
}) {
  return (
    <div className="border border-border rounded-xl overflow-hidden card-glow">
      <button
        onClick={onToggle}
        className="w-full flex items-center justify-between p-5 text-left hover:bg-card/50 transition-colors"
      >
        <span className="font-serif font-bold text-foreground pr-4">
          {question}
        </span>
        <motion.div
          animate={{ rotate: isOpen ? 180 : 0 }}
          transition={{ duration: 0.3 }}
          className="shrink-0"
        >
          <ChevronDown className="w-5 h-5 text-primary" />
        </motion.div>
      </button>
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: 'auto', opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ duration: 0.3, ease: 'easeInOut' }}
          >
            <div className="px-5 pb-5 text-muted-foreground text-sm leading-relaxed border-t border-border pt-4">
              {answer}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  )
}

export default function FAQPage() {
  const [openIndex, setOpenIndex] = useState<number | null>(null)

  return (
    <div className="min-h-screen bg-background">
      {/* Header */}
      <section className="pt-24 pb-12">
        <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7 }}
          >
            <HelpCircle className="w-12 h-12 text-primary mx-auto mb-4" />
            <h1 className="text-4xl md:text-5xl font-serif font-black text-fire-gradient mb-4">
              Frequently Asked Questions
            </h1>
            <p className="text-muted-foreground text-lg">
              Everything you need to know about Food Express
            </p>
          </motion.div>
        </div>
      </section>

      {/* FAQ Items */}
      <section className="pb-16">
        <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="space-y-3">
            {faqItems.map((faq, idx) => (
              <motion.div
                key={idx}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.4, delay: idx * 0.05 }}
              >
                <FAQItem
                  question={faq.question}
                  answer={faq.answer}
                  isOpen={openIndex === idx}
                  onToggle={() =>
                    setOpenIndex(openIndex === idx ? null : idx)
                  }
                />
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Contact CTA */}
      <section className="py-12 bg-card/30">
        <div className="max-w-2xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
          >
            <Flame className="w-10 h-10 text-primary mx-auto mb-4" />
            <h2 className="text-2xl font-serif font-bold text-foreground mb-2">
              Still Have Questions?
            </h2>
            <p className="text-muted-foreground mb-6">
              Our team is here to help. Reach out to us and we will get back to you as soon as possible.
            </p>
            <a
              href="tel:+923205719979"
              className="inline-flex items-center gap-2 text-primary font-semibold hover:underline"
            >
              Call us at +92 320 5719979
            </a>
          </motion.div>
        </div>
      </section>
    </div>
  )
}
