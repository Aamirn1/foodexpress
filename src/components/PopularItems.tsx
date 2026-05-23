'use client'

import { motion } from 'framer-motion'
import Image from 'next/image'
import { Star, Eye } from 'lucide-react'
import { Badge } from '@/components/ui/badge'
import { Button } from '@/components/ui/button'

interface Product {
  id: number
  name: string
  price: number
  image: string
  rating: number
  tag?: string
  description: string
}

const products: Product[] = [
  {
    id: 1,
    name: 'Classic Cheeseburger',
    price: 8.99,
    image: '/images/product-classic-burger.png',
    rating: 4.9,
    tag: 'Best Seller',
    description: 'Juicy beef patty with melted cheddar, fresh lettuce, tomato, and our signature sauce.',
  },
  {
    id: 2,
    name: 'Spicy Fire Burger',
    price: 10.99,
    image: '/images/product-spicy-burger.png',
    rating: 4.8,
    tag: 'Spicy',
    description: 'Double patty with ghost pepper sauce, jalapeños, pepper jack cheese, and sriracha mayo.',
  },
  {
    id: 3,
    name: 'Pepperoni Pizza',
    price: 12.99,
    image: '/images/product-pepperoni-pizza.png',
    rating: 5.0,
    tag: 'Popular',
    description: 'Wood-fired pizza loaded with pepperoni, mozzarella, and our house-made tomato sauce.',
  },
  {
    id: 4,
    name: 'Crispy Wings (8pc)',
    price: 9.99,
    image: '/images/product-chicken-wings.png',
    rating: 4.7,
    description: 'Golden fried chicken wings tossed in our signature buffalo or BBQ sauce.',
  },
  {
    id: 5,
    name: 'Loaded Hot Dog',
    price: 7.99,
    image: '/images/product-loaded-hotdog.png',
    rating: 4.6,
    tag: 'New',
    description: 'All-beef frank topped with chili, cheese, crispy onions, and our special relish.',
  },
  {
    id: 6,
    name: 'Golden Fries',
    price: 4.99,
    image: '/images/product-fries.png',
    rating: 4.5,
    description: 'Crispy golden fries seasoned with our house blend of spices and herbs.',
  },
]

interface PopularItemsProps {
  onViewProduct: (product: Product) => void
}

export default function PopularItems({ onViewProduct }: PopularItemsProps) {
  return (
    <section className="py-16 md:py-24 bg-secondary/30">
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
            Most Popular{' '}
            <span className="text-fire-gradient">Items</span>
          </h2>
          <p className="text-muted-foreground mt-3 max-w-lg mx-auto">
            Our customers&apos; favorites — tried, tested, and absolutely loved.
          </p>
        </motion.div>

        {/* Products Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {products.map((product, i) => (
            <motion.div
              key={product.id}
              className="group"
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: i * 0.1 }}
            >
              <div className="card-glow rounded-xl border border-border bg-card overflow-hidden transition-all duration-300">
                {/* Image */}
                <div className="relative aspect-square overflow-hidden">
                  <Image
                    src={product.image}
                    alt={product.name}
                    fill
                    className="object-cover transition-transform duration-700 group-hover:scale-110"
                    sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
                  />
                  {/* Hover overlay with View in 3D */}
                  <div className="absolute inset-0 bg-background/60 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-center justify-center">
                    <Button
                      className="bg-fire-gradient text-primary-foreground font-semibold btn-fire-glow"
                      onClick={() => onViewProduct(product)}
                    >
                      <Eye className="w-4 h-4 mr-2" />
                      View in 3D
                    </Button>
                  </div>
                  {/* Tag */}
                  {product.tag && (
                    <Badge className="absolute top-3 left-3 bg-fire-gradient text-primary-foreground border-0 font-semibold">
                      {product.tag}
                    </Badge>
                  )}
                </div>

                {/* Content */}
                <div className="p-4 md:p-5">
                  <div className="flex items-center justify-between mb-2">
                    <h3 className="font-serif text-lg font-bold text-foreground group-hover:text-fire-gradient transition-colors">
                      {product.name}
                    </h3>
                    <span className="text-fire-gradient font-black text-lg">
                      ${product.price.toFixed(2)}
                    </span>
                  </div>
                  <p className="text-muted-foreground text-sm line-clamp-2 mb-3">
                    {product.description}
                  </p>
                  <div className="flex items-center gap-1">
                    {Array.from({ length: 5 }).map((_, idx) => (
                      <Star
                        key={idx}
                        className={`w-4 h-4 ${
                          idx < Math.floor(product.rating)
                            ? 'text-accent fill-accent'
                            : 'text-muted-foreground/30'
                        }`}
                      />
                    ))}
                    <span className="text-muted-foreground text-sm ml-1">
                      {product.rating}
                    </span>
                  </div>
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  )
}
