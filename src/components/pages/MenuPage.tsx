'use client'

import { useState, useMemo } from 'react'
import { useRouter } from 'next/navigation'
import { motion } from 'framer-motion'
import { Star, Plus, Search, ChevronRight, Home, Flame } from 'lucide-react'
import { Button } from '@/components/ui/button'
import { Badge } from '@/components/ui/badge'
import { Input } from '@/components/ui/input'
import {
  menuItems,
  categories,
  priceRanges,
  type MenuItem,
} from '@/data/menu'
import { useCart } from '@/hooks/use-cart'
import { useToast } from '@/hooks/use-toast'

export default function MenuPage() {
  const [activeCategory, setActiveCategory] = useState('all')
  const [activePriceRange, setActivePriceRange] = useState(0)
  const [searchQuery, setSearchQuery] = useState('')
  const { addItem } = useCart()
  const router = useRouter()
  const { toast } = useToast()

  const filteredItems = useMemo(() => {
    let items = menuItems

    if (activeCategory !== 'all') {
      items = items.filter((item) => item.categorySlug === activeCategory)
    }

    const range = priceRanges[activePriceRange]
    if (range) {
      items = items.filter((item) => {
        return item.price >= range.min && item.price <= range.max
      })
    }

    if (searchQuery.trim()) {
      const q = searchQuery.toLowerCase()
      items = items.filter(
        (item) =>
          item.name.toLowerCase().includes(q) ||
          item.description.toLowerCase().includes(q) ||
          item.ingredients.some((ing) => ing.toLowerCase().includes(q))
      )
    }

    return items
  }, [activeCategory, activePriceRange, searchQuery])

  const handleAddToOrder = (e: React.MouseEvent, item: MenuItem) => {
    e.stopPropagation()
    addItem({
      id: item.id,
      name: item.name,
      price: item.price,
      image: item.images[0] || '/images/product-classic-burger.png',
      quantity: 1,
    })
    toast({
      title: 'Added to Order!',
      description: `${item.name} has been added to your order.`,
    })
  }

  const handleItemClick = (itemId: string) => {
    router.push(`/menu/${itemId}`)
  }

  const container = {
    hidden: { opacity: 0 },
    show: {
      opacity: 1,
      transition: { staggerChildren: 0.06 },
    },
  }

  const item = {
    hidden: { opacity: 0, y: 20 },
    show: { opacity: 1, y: 0 },
  }

  return (
    <div className="min-h-screen bg-background">
      {/* Breadcrumb */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-24 pb-4">
        <nav className="flex items-center gap-2 text-sm text-muted-foreground">
          <button
            onClick={() => router.push('/')}
            className="hover:text-primary transition-colors flex items-center gap-1"
          >
            <Home className="w-3.5 h-3.5" />
            Home
          </button>
          <ChevronRight className="w-3.5 h-3.5" />
          <span className="text-foreground font-medium">Menu</span>
        </nav>
      </div>

      {/* Header */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pb-8">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
        >
          <h1 className="text-4xl md:text-5xl font-serif font-black text-fire-gradient mb-2">
            Our Menu
          </h1>
          <p className="text-muted-foreground text-lg">
            Flame-grilled perfection, delivered to your table
          </p>
        </motion.div>
      </div>

      {/* Filters */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pb-6">
        {/* Search */}
        <motion.div
          className="mb-6"
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.4, delay: 0.1 }}
        >
          <div className="relative max-w-md">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
            <Input
              placeholder="Search dishes, ingredients..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="pl-10 bg-card border-border text-foreground placeholder:text-muted-foreground focus:border-primary"
            />
          </div>
        </motion.div>

        {/* Category Pills */}
        <motion.div
          className="flex flex-wrap gap-2 mb-4"
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.4, delay: 0.2 }}
        >
          <button
            onClick={() => setActiveCategory('all')}
            className={`px-4 py-2 rounded-full text-sm font-medium transition-all ${
              activeCategory === 'all'
                ? 'bg-fire-gradient text-primary-foreground shadow-lg shadow-primary/20'
                : 'bg-card border border-border text-muted-foreground hover:border-primary/50 hover:text-foreground'
            }`}
          >
            All
          </button>
          {categories.map((cat) => (
            <button
              key={cat.slug}
              onClick={() => setActiveCategory(cat.slug)}
              className={`px-4 py-2 rounded-full text-sm font-medium transition-all ${
                activeCategory === cat.slug
                  ? 'bg-fire-gradient text-primary-foreground shadow-lg shadow-primary/20'
                  : 'bg-card border border-border text-muted-foreground hover:border-primary/50 hover:text-foreground'
              }`}
            >
              {cat.title}
            </button>
          ))}
        </motion.div>

        {/* Price Range & Count */}
        <motion.div
          className="flex flex-wrap items-center gap-3"
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.4, delay: 0.3 }}
        >
          <div className="flex flex-wrap gap-2">
            {priceRanges.map((range, idx) => (
              <button
                key={range.label}
                onClick={() => setActivePriceRange(idx)}
                className={`px-3 py-1.5 rounded-lg text-xs font-medium transition-all ${
                  activePriceRange === idx
                    ? 'bg-primary/20 text-primary border border-primary/40'
                    : 'bg-card border border-border text-muted-foreground hover:border-primary/30 hover:text-foreground'
                }`}
              >
                {range.label}
              </button>
            ))}
          </div>
          <span className="text-muted-foreground text-sm ml-auto">
            {filteredItems.length} {filteredItems.length === 1 ? 'item' : 'items'}
          </span>
        </motion.div>
      </div>

      {/* Product Grid */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pb-16">
        {filteredItems.length === 0 ? (
          <motion.div
            className="text-center py-20"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
          >
            <Flame className="w-16 h-16 text-muted-foreground/30 mx-auto mb-4" />
            <h3 className="text-xl font-serif font-bold text-foreground mb-2">
              No dishes found
            </h3>
            <p className="text-muted-foreground">
              Try adjusting your filters or search query
            </p>
          </motion.div>
        ) : (
          <motion.div
            className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6"
            variants={container}
            initial="hidden"
            animate="show"
          >
            {filteredItems.map((menuItem) => (
              <motion.div
                key={menuItem.id}
                variants={item}
                className="card-glow group bg-card rounded-xl border border-border overflow-hidden cursor-pointer"
                onClick={() => handleItemClick(menuItem.id)}
              >
                {/* Image */}
                <div className="relative aspect-square overflow-hidden">
                  <img
                    src={menuItem.images[0] || '/images/product-classic-burger.png'}
                    alt={menuItem.name}
                    className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
                  />
                  {menuItem.tag && (
                    <Badge className="absolute top-3 left-3 bg-fire-gradient text-primary-foreground text-xs font-semibold border-0">
                      {menuItem.tag}
                    </Badge>
                  )}
                  {/* Hover overlay */}
                  <div className="absolute inset-0 bg-background/40 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-center justify-center">
                    <span className="px-4 py-2 rounded-lg bg-fire-gradient text-primary-foreground font-semibold text-sm shadow-lg">
                      View Details
                    </span>
                  </div>
                </div>

                {/* Content */}
                <div className="p-4">
                  {/* Rating */}
                  <div className="flex items-center gap-1 mb-2">
                    <Star className="w-3.5 h-3.5 fill-accent text-accent" />
                    <span className="text-sm font-medium text-foreground">
                      {menuItem.rating}
                    </span>
                  </div>

                  {/* Name & Price */}
                  <h3 className="font-serif font-bold text-foreground mb-1 group-hover:text-primary transition-colors">
                    {menuItem.name}
                  </h3>
                  <p className="text-muted-foreground text-sm line-clamp-2 mb-3">
                    {menuItem.description}
                  </p>

                  {/* Price & Add */}
                  <div className="flex items-center justify-between">
                    <span className="text-fire-gradient font-bold text-lg">
                      {menuItem.priceFormatted}
                    </span>
                    <Button
                      size="sm"
                      className="bg-fire-gradient text-primary-foreground btn-fire-glow"
                      onClick={(e) => handleAddToOrder(e, menuItem)}
                    >
                      <Plus className="w-4 h-4 mr-1" />
                      Add
                    </Button>
                  </div>
                </div>
              </motion.div>
            ))}
          </motion.div>
        )}
      </div>
    </div>
  )
}
