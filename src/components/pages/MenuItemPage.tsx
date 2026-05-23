'use client'

import { useState, useMemo } from 'react'
import { motion } from 'framer-motion'
import {
  Star,
  Plus,
  Minus,
  ChevronRight,
  Home,
  Clock,
  Flame,
  Truck,
  ShieldCheck,
  Leaf,
  ShoppingCart,
} from 'lucide-react'
import { Button } from '@/components/ui/button'
import { Badge } from '@/components/ui/badge'
import { getMenuItemById, getRelatedItems } from '@/data/menu'
import { useCart } from '@/hooks/use-cart'

interface MenuItemPageProps {
  id: string
  onNavigate?: (page: string, param?: string) => void
}

const sizeOptions = [
  { label: 'Regular', extra: 0 },
  { label: 'Large', extra: 200 },
  { label: 'Family', extra: 500 },
]

const spiceOptions = ['None', 'Mild', 'Medium', 'Hot', 'Extra Hot']

const addonOptions = [
  { label: 'Extra Cheese', extra: 150 },
  { label: 'Extra Sauce', extra: 50 },
  { label: 'Bacon', extra: 200 },
  { label: 'Avocado', extra: 150 },
]

export default function MenuItemPage({ id, onNavigate }: MenuItemPageProps) {
  const menuItem = getMenuItemById(id)
  const relatedItems = getRelatedItems(id)
  const { addItem } = useCart()

  const [selectedSize, setSelectedSize] = useState(0)
  const [selectedSpice, setSelectedSpice] = useState(2)
  const [selectedAddons, setSelectedAddons] = useState<number[]>([])
  const [quantity, setQuantity] = useState(1)

  const extraCharges = useMemo(() => {
    let extra = sizeOptions[selectedSize].extra
    selectedAddons.forEach((idx) => {
      extra += addonOptions[idx].extra
    })
    return extra
  }, [selectedSize, selectedAddons])

  const totalPrice = menuItem
    ? (menuItem.price + extraCharges) * quantity
    : 0

  const formatPrice = (cents: number) => `$${(cents / 100).toFixed(2)}`

  const toggleAddon = (idx: number) => {
    setSelectedAddons((prev) =>
      prev.includes(idx) ? prev.filter((i) => i !== idx) : [...prev, idx]
    )
  }

  const handleAddToOrder = () => {
    if (!menuItem) return
    addItem({
      id: menuItem.id,
      name: menuItem.name,
      price: menuItem.price,
      image: menuItem.images[0] || '/images/product-classic-burger.png',
      quantity,
      size: sizeOptions[selectedSize].label,
      spiceLevel: spiceOptions[selectedSpice],
      addons: selectedAddons.map((i) => addonOptions[i].label),
      extraCharges,
    })
  }

  if (!menuItem) {
    return (
      <div className="min-h-screen bg-background flex items-center justify-center">
        <div className="text-center">
          <Flame className="w-16 h-16 text-muted-foreground/30 mx-auto mb-4" />
          <h2 className="text-2xl font-serif font-bold text-foreground mb-2">
            Item Not Found
          </h2>
          <p className="text-muted-foreground">This menu item does not exist.</p>
        </div>
      </div>
    )
  }

  const spiceColorMap: Record<string, string> = {
    None: 'bg-muted text-muted-foreground',
    Mild: 'bg-green-500/20 text-green-400',
    Medium: 'bg-yellow-500/20 text-yellow-400',
    Hot: 'bg-orange-500/20 text-orange-400',
    'Extra Hot': 'bg-red-500/20 text-red-400',
  }

  return (
    <div className="min-h-screen bg-background">
      {/* Breadcrumb */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-24 pb-4">
        <nav className="flex items-center gap-2 text-sm text-muted-foreground">
          <button
            onClick={() => onNavigate?.('home')}
            className="hover:text-primary transition-colors flex items-center gap-1"
          >
            <Home className="w-3.5 h-3.5" />
            Home
          </button>
          <ChevronRight className="w-3.5 h-3.5" />
          <button
            onClick={() => onNavigate?.('menu')}
            className="hover:text-primary transition-colors"
          >
            Menu
          </button>
          <ChevronRight className="w-3.5 h-3.5" />
          <span className="text-foreground font-medium">{menuItem.name}</span>
        </nav>
      </div>

      {/* Main Content */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pb-16">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 lg:gap-12">
          {/* Image */}
          <motion.div
            className="relative aspect-square rounded-2xl overflow-hidden border border-border"
            initial={{ opacity: 0, x: -30 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6 }}
          >
            <img
              src={menuItem.images[0] || '/images/product-classic-burger.png'}
              alt={menuItem.name}
              className="w-full h-full object-cover"
            />
            {menuItem.tag && (
              <Badge className="absolute top-4 left-4 bg-fire-gradient text-primary-foreground text-sm font-semibold border-0">
                {menuItem.tag}
              </Badge>
            )}
          </motion.div>

          {/* Details */}
          <motion.div
            initial={{ opacity: 0, x: 30 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6, delay: 0.1 }}
            className="flex flex-col"
          >
            {/* Tag & Rating */}
            <div className="flex items-center gap-3 mb-3">
              {menuItem.tag && (
                <Badge className="bg-primary/20 text-primary border-primary/30 text-xs">
                  {menuItem.tag}
                </Badge>
              )}
              <div className="flex items-center gap-1">
                <Star className="w-4 h-4 fill-accent text-accent" />
                <span className="text-sm font-medium text-foreground">
                  {menuItem.rating}
                </span>
              </div>
            </div>

            {/* Name */}
            <h1 className="text-3xl md:text-4xl font-serif font-black text-foreground mb-2">
              {menuItem.name}
            </h1>

            {/* Price */}
            <div className="flex items-baseline gap-3 mb-4">
              <span className="text-fire-gradient font-bold text-2xl">
                {formatPrice(totalPrice)}
              </span>
              {extraCharges > 0 && (
                <span className="text-muted-foreground text-sm line-through">
                  {menuItem.priceFormatted}
                </span>
              )}
            </div>

            {/* Description */}
            <p className="text-muted-foreground leading-relaxed mb-6">
              {menuItem.description}
            </p>

            {/* Quick Info */}
            <div className="flex flex-wrap gap-4 mb-6">
              <div className="flex items-center gap-2 text-sm text-muted-foreground">
                <Clock className="w-4 h-4 text-primary" />
                {menuItem.prepTime}
              </div>
              <div className="flex items-center gap-2 text-sm text-muted-foreground">
                <Flame className="w-4 h-4 text-primary" />
                {menuItem.calories} cal
              </div>
              <div
                className={`flex items-center gap-2 text-sm px-2 py-0.5 rounded-full ${
                  spiceColorMap[menuItem.spiceLevel]
                }`}
              >
                {menuItem.spiceLevel}
              </div>
            </div>

            {/* Ingredients */}
            <div className="mb-6">
              <h3 className="text-sm font-semibold text-foreground mb-2">
                Ingredients
              </h3>
              <div className="flex flex-wrap gap-2">
                {menuItem.ingredients.map((ing) => (
                  <span
                    key={ing}
                    className="text-xs px-2 py-1 rounded-md bg-secondary text-secondary-foreground"
                  >
                    {ing}
                  </span>
                ))}
              </div>
            </div>

            {/* Divider */}
            <div className="border-t border-border my-2" />

            {/* Size Selection */}
            <div className="mb-5">
              <h3 className="text-sm font-semibold text-foreground mb-3">
                Size
              </h3>
              <div className="flex flex-wrap gap-2">
                {sizeOptions.map((size, idx) => (
                  <button
                    key={size.label}
                    onClick={() => setSelectedSize(idx)}
                    className={`px-4 py-2 rounded-lg text-sm font-medium transition-all border ${
                      selectedSize === idx
                        ? 'bg-primary/20 text-primary border-primary/50'
                        : 'bg-card text-muted-foreground border-border hover:border-primary/30'
                    }`}
                  >
                    {size.label}
                    {size.extra > 0 && (
                      <span className="ml-1 text-xs opacity-70">
                        +{formatPrice(size.extra)}
                      </span>
                    )}
                  </button>
                ))}
              </div>
            </div>

            {/* Spice Level */}
            <div className="mb-5">
              <h3 className="text-sm font-semibold text-foreground mb-3">
                Spice Level
              </h3>
              <div className="flex flex-wrap gap-2">
                {spiceOptions.map((spice, idx) => (
                  <button
                    key={spice}
                    onClick={() => setSelectedSpice(idx)}
                    className={`px-3 py-1.5 rounded-lg text-xs font-medium transition-all border ${
                      selectedSpice === idx
                        ? 'bg-primary/20 text-primary border-primary/50'
                        : 'bg-card text-muted-foreground border-border hover:border-primary/30'
                    }`}
                  >
                    {spice}
                  </button>
                ))}
              </div>
            </div>

            {/* Add-ons */}
            <div className="mb-6">
              <h3 className="text-sm font-semibold text-foreground mb-3">
                Add-ons
              </h3>
              <div className="grid grid-cols-2 gap-2">
                {addonOptions.map((addon, idx) => (
                  <button
                    key={addon.label}
                    onClick={() => toggleAddon(idx)}
                    className={`flex items-center justify-between px-3 py-2 rounded-lg text-sm transition-all border ${
                      selectedAddons.includes(idx)
                        ? 'bg-primary/20 text-primary border-primary/50'
                        : 'bg-card text-muted-foreground border-border hover:border-primary/30'
                    }`}
                  >
                    <span>{addon.label}</span>
                    <span className="text-xs opacity-70">
                      +{formatPrice(addon.extra)}
                    </span>
                  </button>
                ))}
              </div>
            </div>

            {/* Quantity & Add to Order */}
            <div className="flex items-center gap-4 mb-6">
              <div className="flex items-center border border-border rounded-lg overflow-hidden">
                <button
                  onClick={() => setQuantity(Math.max(1, quantity - 1))}
                  className="px-3 py-2 text-muted-foreground hover:text-foreground hover:bg-secondary transition-colors"
                >
                  <Minus className="w-4 h-4" />
                </button>
                <span className="px-4 py-2 text-foreground font-medium min-w-[48px] text-center">
                  {quantity}
                </span>
                <button
                  onClick={() => setQuantity(quantity + 1)}
                  className="px-3 py-2 text-muted-foreground hover:text-foreground hover:bg-secondary transition-colors"
                >
                  <Plus className="w-4 h-4" />
                </button>
              </div>

              <Button
                className="flex-1 bg-fire-gradient text-primary-foreground btn-fire-glow font-semibold text-base py-6"
                onClick={handleAddToOrder}
              >
                <ShoppingCart className="w-5 h-5 mr-2" />
                Add to Order - {formatPrice(totalPrice)}
              </Button>
            </div>

            {/* Trust Signals */}
            <div className="grid grid-cols-3 gap-3">
              <div className="flex flex-col items-center text-center p-3 rounded-lg bg-card border border-border">
                <Truck className="w-5 h-5 text-primary mb-1" />
                <span className="text-xs text-muted-foreground">
                  Free Delivery over $25
                </span>
              </div>
              <div className="flex flex-col items-center text-center p-3 rounded-lg bg-card border border-border">
                <ShieldCheck className="w-5 h-5 text-primary mb-1" />
                <span className="text-xs text-muted-foreground">
                  Secure Payment
                </span>
              </div>
              <div className="flex flex-col items-center text-center p-3 rounded-lg bg-card border border-border">
                <Leaf className="w-5 h-5 text-primary mb-1" />
                <span className="text-xs text-muted-foreground">
                  Fresh Guarantee
                </span>
              </div>
            </div>
          </motion.div>
        </div>

        {/* Related Items */}
        {relatedItems.length > 0 && (
          <motion.div
            className="mt-16"
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.3 }}
          >
            <h2 className="text-2xl font-serif font-bold text-foreground mb-6">
              You May Also Like
            </h2>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
              {relatedItems.map((relItem) => (
                <div
                  key={relItem.id}
                  className="card-glow bg-card rounded-xl border border-border overflow-hidden cursor-pointer group"
                  onClick={() => {
                    onNavigate?.('menu-item', relItem.id)
                    window.scrollTo({ top: 0, behavior: 'smooth' })
                  }}
                >
                  <div className="relative aspect-square overflow-hidden">
                    <img
                      src={relItem.images[0] || '/images/product-classic-burger.png'}
                      alt={relItem.name}
                      className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
                    />
                    {relItem.tag && (
                      <Badge className="absolute top-3 left-3 bg-fire-gradient text-primary-foreground text-xs border-0">
                        {relItem.tag}
                      </Badge>
                    )}
                  </div>
                  <div className="p-4">
                    <div className="flex items-center gap-1 mb-1">
                      <Star className="w-3 h-3 fill-accent text-accent" />
                      <span className="text-xs font-medium">{relItem.rating}</span>
                    </div>
                    <h3 className="font-serif font-bold text-foreground text-sm mb-1 group-hover:text-primary transition-colors">
                      {relItem.name}
                    </h3>
                    <span className="text-fire-gradient font-bold">
                      {relItem.priceFormatted}
                    </span>
                  </div>
                </div>
              ))}
            </div>
          </motion.div>
        )}
      </div>
    </div>
  )
}
