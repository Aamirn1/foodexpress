'use client'

import Link from 'next/link'
import { motion } from 'framer-motion'
import Image from 'next/image'

const categories = [
  {
    name: 'Burgers',
    subtitle: 'Juicy & Flame-Grilled',
    image: '/images/category-burgers.png',
  },
  {
    name: 'Pizza',
    subtitle: 'Wood-Fired Perfection',
    image: '/images/category-pizza.png',
  },
  {
    name: 'Chicken',
    subtitle: 'Crispy & Tender',
    image: '/images/category-chicken.png',
  },
  {
    name: 'Desserts',
    subtitle: 'Sweet Indulgence',
    image: '/images/category-desserts.png',
  },
]

export default function MenuCategories() {
  return (
    <section id="menu" className="py-16 md:py-24">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Title */}
        <motion.div
          className="text-center mb-12"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
        >
          <h2 className="font-serif text-3xl md:text-4xl lg:text-5xl font-black">
            Our Menu{' '}
            <span className="text-fire-gradient">Categories</span>
          </h2>
          <p className="text-muted-foreground mt-3 max-w-lg mx-auto">
            Explore our carefully crafted menu, where every dish is made with passion and the finest ingredients.
          </p>
        </motion.div>

        {/* Categories Grid */}
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 md:gap-6">
          {categories.map((category, i) => (
            <Link key={category.name} href={`/menu?category=${category.name.toLowerCase()}`}>
            <motion.div
              className="card-3d group cursor-pointer"
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: i * 0.1 }}
            >
              <div className="card-3d-inner card-glow relative overflow-hidden rounded-xl border border-border bg-card">
                <div className="relative aspect-square overflow-hidden">
                  <Image
                    src={category.image}
                    alt={category.name}
                    fill
                    className="object-cover transition-transform duration-700 group-hover:scale-110"
                    sizes="(max-width: 768px) 50vw, 25vw"
                  />
                  {/* Gradient overlay */}
                  <div className="absolute inset-0 bg-gradient-to-t from-background via-background/30 to-transparent" />
                </div>
                {/* Text content */}
                <div className="absolute bottom-0 left-0 right-0 p-4 md:p-6">
                  <h3 className="font-serif text-xl md:text-2xl font-bold text-foreground group-hover:text-fire-gradient transition-colors">
                    {category.name}
                  </h3>
                  <p className="text-foreground/60 text-sm mt-1">{category.subtitle}</p>
                </div>
              </div>
            </motion.div>
            </Link>
          ))}
        </div>
      </div>
    </section>
  )
}
