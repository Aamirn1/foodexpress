'use client'

import { motion } from 'framer-motion'
import { Shield, Lock, Eye, Database, Users, Bell, Scale, Mail } from 'lucide-react'

const sections = [
  {
    icon: Eye,
    title: 'Information We Collect',
    content: [
      'Personal information you provide when placing an order, such as your name, phone number, email address, and delivery address.',
      'Payment information processed securely through our payment providers. We do not store your full credit card details on our servers.',
      'Order history and preferences to improve your experience and provide personalized recommendations.',
      'Device information and usage data collected automatically when you use our website or app, including IP address, browser type, and pages visited.',
    ],
  },
  {
    icon: Database,
    title: 'How We Use Your Information',
    content: [
      'To process and deliver your orders, communicate order status, and handle customer service inquiries.',
      'To send you order confirmations, delivery updates, and receipts via email or SMS.',
      'To improve our services, menu offerings, and website functionality based on usage patterns and feedback.',
      'With your consent, to send promotional offers, new menu announcements, and loyalty program updates.',
    ],
  },
  {
    icon: Lock,
    title: 'Data Security',
    content: [
      'We use industry-standard SSL/TLS encryption to protect all data transmitted between your browser and our servers.',
      'Payment information is processed through PCI-compliant payment processors and is never stored in plain text.',
      'Access to personal data is restricted to authorized personnel who need it to perform their job functions.',
      'We regularly audit our security practices and update our systems to protect against emerging threats.',
    ],
  },
  {
    icon: Users,
    title: 'Third-Party Sharing',
    content: [
      'We do not sell, trade, or rent your personal information to third parties for marketing purposes.',
      'We share information with delivery partners only as needed to fulfill your orders.',
      'We may share anonymized, aggregate data with analytics providers to help us understand usage trends.',
      'We may disclose information if required by law or to protect our rights, safety, or property.',
    ],
  },
  {
    icon: Bell,
    title: 'Your Rights & Choices',
    content: [
      'You can access, update, or delete your personal information at any time through your account settings.',
      'You can opt out of promotional communications by clicking the unsubscribe link in any email or contacting us directly.',
      'You can request a copy of all personal data we hold about you by submitting a data access request.',
      'You can request deletion of your account and associated data, subject to legal retention requirements.',
    ],
  },
  {
    icon: Shield,
    title: 'Cookies & Tracking',
    content: [
      'We use essential cookies to maintain your session and cart functionality across page loads.',
      'Analytics cookies help us understand how visitors interact with our website so we can improve the experience.',
      'You can manage your cookie preferences through your browser settings at any time.',
      'We do not use cookies for third-party advertising or cross-site tracking.',
    ],
  },
  {
    icon: Scale,
    title: 'Compliance',
    content: [
      'We comply with applicable data protection laws and regulations in the jurisdictions where we operate.',
      'Our privacy practices are reviewed regularly to ensure ongoing compliance with evolving legal requirements.',
      'In the event of a data breach, we will notify affected users promptly as required by applicable law.',
      'We maintain records of our data processing activities as required by privacy regulations.',
    ],
  },
]

export default function PrivacyPage() {
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
            <Shield className="w-12 h-12 text-primary mb-4" />
            <h1 className="text-4xl md:text-5xl font-serif font-black text-fire-gradient mb-4">
              Privacy Policy
            </h1>
            <p className="text-muted-foreground text-lg">
              Last updated: January 1, 2026
            </p>
            <p className="text-muted-foreground mt-2">
              At Food Express, we are committed to protecting your privacy and ensuring the security of your personal information. This policy explains how we collect, use, and safeguard your data.
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
              Questions About Our Privacy Practices?
            </h3>
            <p className="text-muted-foreground text-sm mb-3">
              Contact our Data Protection Officer at privacy@foodexpress.com
            </p>
            <a
              href="mailto:privacy@foodexpress.com"
              className="text-primary font-medium hover:underline text-sm"
            >
              privacy@foodexpress.com
            </a>
          </motion.div>
        </div>
      </section>
    </div>
  )
}
