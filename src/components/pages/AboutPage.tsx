'use client'

import { motion } from 'framer-motion'
import { Flame, Award, Globe, Lightbulb, Heart, Users, ChefHat, TrendingUp } from 'lucide-react'

const timeline = [
  { year: '2009', title: 'Founded', description: 'Food Express was born from a small kitchen with a big dream: to serve the boldest flavors in town.' },
  { year: '2013', title: 'First Award', description: 'Our Classic Smash Burger won Best Burger at the Regional Food Festival, putting us on the map.' },
  { year: '2017', title: 'Expanded', description: 'We opened our second and third locations, bringing fire-grilled perfection to more neighborhoods.' },
  { year: '2021', title: 'Food App', description: 'Launched our mobile ordering app, making it easier than ever to get your flame-grilled favorites.' },
  { year: '2024', title: 'City Champions', description: 'Our Blazing Wings won the City Wing Championship, solidifying our reputation as the best in town.' },
]

const chefs = [
  {
    name: 'Chef Marco Rodriguez',
    role: 'Head Chef & Founder',
    bio: 'With 20+ years of culinary experience, Chef Marco brings passion and precision to every dish. His philosophy: bold flavors, fresh ingredients, no compromises.',
    image: '/images/category-burgers.png',
  },
  {
    name: 'Chef Aisha Thompson',
    role: 'Pastry & Desserts',
    bio: 'A pastry virtuoso who turned a happy accident into our legendary Fire Shake. Aisha brings creativity and sweetness to every dessert on the menu.',
    image: '/images/category-desserts.png',
  },
  {
    name: 'Chef David Kim',
    role: 'Sauce & Flavor Director',
    bio: 'The mastermind behind our signature sauces. David spent two years perfecting the Blazing Sauce that won the City Championship.',
    image: '/images/category-chicken.png',
  },
]

const values = [
  {
    icon: Flame,
    title: 'Quality',
    description: 'Every ingredient is sourced from trusted suppliers. We never compromise on the quality of what goes on your plate.',
  },
  {
    icon: Heart,
    title: 'Freshness',
    description: 'From farm to flame in hours, not days. Our ingredients are delivered fresh daily from local farms and producers.',
  },
  {
    icon: Users,
    title: 'Community',
    description: 'We are rooted in our community. Over 80% of our ingredients are locally sourced, supporting local farmers and families.',
  },
  {
    icon: Lightbulb,
    title: 'Innovation',
    description: 'From our 72-hour fermented pizza dough to our double-fry technique, we constantly push boundaries in flavor and technique.',
  },
]

export default function AboutPage() {
  return (
    <div className="min-h-screen bg-background">
      {/* Hero Section */}
      <section className="relative pt-24 pb-16 overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-b from-primary/5 to-transparent" />
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative">
          <motion.div
            className="text-center max-w-3xl mx-auto"
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7 }}
          >
            <Flame className="w-12 h-12 text-primary mx-auto mb-4" />
            <h1 className="text-4xl md:text-6xl font-serif font-black text-fire-gradient mb-6">
              Our Story
            </h1>
            <p className="text-muted-foreground text-lg md:text-xl leading-relaxed">
              What started as a small kitchen with a big dream has grown into the city&apos;s most beloved
              flame-grilled restaurant. Since 2009, we&apos;ve been serving bold flavors, fresh ingredients,
              and unforgettable experiences.
            </p>
          </motion.div>
        </div>
      </section>

      {/* Our Journey Timeline */}
      <section className="py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.h2
            className="text-3xl md:text-4xl font-serif font-bold text-foreground text-center mb-12"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
          >
            Our Journey
          </motion.h2>

          <div className="relative">
            {/* Timeline Line */}
            <div className="absolute left-4 md:left-1/2 top-0 bottom-0 w-0.5 bg-gradient-to-b from-primary via-accent to-primary/20 md:-translate-x-0.5" />

            {timeline.map((event, idx) => (
              <motion.div
                key={event.year}
                className={`relative flex items-start gap-6 mb-12 last:mb-0 ${
                  idx % 2 === 0 ? 'md:flex-row' : 'md:flex-row-reverse'
                }`}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: idx * 0.1 }}
              >
                {/* Dot */}
                <div className="absolute left-4 md:left-1/2 w-3 h-3 rounded-full bg-fire-gradient -translate-x-1.5 mt-2 z-10 shadow-lg shadow-primary/30" />

                {/* Content */}
                <div className={`ml-12 md:ml-0 md:w-1/2 ${idx % 2 === 0 ? 'md:pr-12 md:text-right' : 'md:pl-12'}`}>
                  <span className="text-fire-gradient font-bold text-2xl font-serif">
                    {event.year}
                  </span>
                  <h3 className="text-lg font-bold text-foreground mt-1">
                    {event.title}
                  </h3>
                  <p className="text-muted-foreground text-sm mt-1">
                    {event.description}
                  </p>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Chef Profiles */}
      <section className="py-16 bg-card/30">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.h2
            className="text-3xl md:text-4xl font-serif font-bold text-foreground text-center mb-12"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
          >
            Meet Our Chefs
          </motion.h2>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {chefs.map((chef, idx) => (
              <motion.div
                key={chef.name}
                className="card-glow bg-card rounded-2xl border border-border overflow-hidden text-center"
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: idx * 0.15 }}
              >
                <div className="aspect-[4/3] overflow-hidden">
                  <img
                    src={chef.image}
                    alt={chef.name}
                    className="w-full h-full object-cover"
                  />
                </div>
                <div className="p-6">
                  <div className="flex items-center justify-center gap-2 mb-1">
                    <ChefHat className="w-4 h-4 text-primary" />
                    <span className="text-xs text-primary font-medium uppercase tracking-wide">
                      {chef.role}
                    </span>
                  </div>
                  <h3 className="text-xl font-serif font-bold text-foreground mb-3">
                    {chef.name}
                  </h3>
                  <p className="text-muted-foreground text-sm leading-relaxed">
                    {chef.bio}
                  </p>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Mission Statement */}
      <section className="py-20">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.7 }}
          >
            <Award className="w-10 h-10 text-primary mx-auto mb-6" />
            <h2 className="text-3xl md:text-5xl font-serif font-black text-fire-gradient mb-6">
              Our Mission
            </h2>
            <p className="text-xl md:text-2xl text-muted-foreground leading-relaxed">
              To ignite a passion for bold, authentic flavors in every community we serve.
              We believe great food should be accessible, honest, and unforgettable.
              Every flame-grilled dish we create carries the fire of our commitment to excellence.
            </p>
          </motion.div>
        </div>
      </section>

      {/* Values Grid */}
      <section className="py-16 bg-card/30">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.h2
            className="text-3xl md:text-4xl font-serif font-bold text-foreground text-center mb-12"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
          >
            What We Stand For
          </motion.h2>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {values.map((value, idx) => (
              <motion.div
                key={value.title}
                className="card-glow bg-card rounded-xl border border-border p-6 text-center"
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: idx * 0.1 }}
              >
                <div className="w-14 h-14 rounded-xl bg-primary/10 flex items-center justify-center mx-auto mb-4">
                  <value.icon className="w-7 h-7 text-primary" />
                </div>
                <h3 className="font-serif font-bold text-foreground text-lg mb-2">
                  {value.title}
                </h3>
                <p className="text-muted-foreground text-sm leading-relaxed">
                  {value.description}
                </p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>
    </div>
  )
}
