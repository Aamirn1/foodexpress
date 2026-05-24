'use client'

import { motion, AnimatePresence } from 'framer-motion'
import { X, Plus, Minus, Trash2, ShoppingBag } from 'lucide-react'
import type { CartItem } from '@/hooks/use-cart'
import { Badge } from '@/components/ui/badge'

interface CartDrawerProps {
  isOpen: boolean
  onClose: () => void
  items: CartItem[]
  subtotal: number
  totalItems: number
  updateQuantity: (id: string, size: string | undefined, spiceLevel: string | undefined, quantity: number) => void
  removeItem: (id: string, size?: string, spiceLevel?: string) => void
  onCheckout: () => void
}

function formatPrice(price: number): string {
  return `Rs. ${price.toLocaleString()}`
}

export default function CartDrawer({
  isOpen,
  onClose,
  items,
  subtotal,
  totalItems,
  updateQuantity,
  removeItem,
  onCheckout,
}: CartDrawerProps) {
  return (
    <AnimatePresence>
      {isOpen && (
        <>
          {/* Backdrop */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.3 }}
            className="fixed inset-0 z-50 bg-black/60 backdrop-blur-sm"
            onClick={onClose}
          />

          {/* Drawer */}
          <motion.div
            initial={{ x: '100%' }}
            animate={{ x: 0 }}
            exit={{ x: '100%' }}
            transition={{ type: 'spring', damping: 30, stiffness: 300 }}
            className="fixed top-0 right-0 bottom-0 z-50 w-full max-w-md bg-background border-l border-border shadow-2xl shadow-black/40 flex flex-col"
          >
            {/* Header */}
            <div className="flex items-center justify-between p-6 border-b border-border">
              <div className="flex items-center gap-3">
                <h2 className="text-xl font-serif font-bold text-foreground">Your Order</h2>
                {totalItems > 0 && (
                  <Badge className="bg-primary/20 text-primary border-primary/30 text-xs">
                    {totalItems} {totalItems === 1 ? 'item' : 'items'}
                  </Badge>
                )}
              </div>
              <button
                onClick={onClose}
                className="w-9 h-9 rounded-full bg-secondary/80 flex items-center justify-center text-muted-foreground hover:text-foreground hover:bg-secondary transition-colors"
                aria-label="Close cart"
              >
                <X className="w-4 h-4" />
              </button>
            </div>

            {/* Cart Items */}
            <div className="flex-1 overflow-y-auto p-6">
              {items.length === 0 ? (
                <div className="flex flex-col items-center justify-center h-full gap-4 text-center">
                  <div className="w-20 h-20 rounded-full bg-secondary/50 flex items-center justify-center">
                    <ShoppingBag className="w-10 h-10 text-muted-foreground" />
                  </div>
                  <div>
                    <p className="text-lg font-medium text-foreground">Your order is empty</p>
                    <p className="text-sm text-muted-foreground mt-1">Add some delicious items from our menu</p>
                  </div>
                  <button
                    onClick={onClose}
                    className="mt-2 px-6 py-2.5 bg-fire-gradient text-primary-foreground font-semibold rounded-lg hover:opacity-90 transition-opacity text-sm"
                  >
                    Browse Menu
                  </button>
                </div>
              ) : (
                <div className="space-y-4">
                  {items.map((item) => (
                    <motion.div
                      key={`${item.id}-${item.size}-${item.spiceLevel}`}
                      layout
                      initial={{ opacity: 0, y: 10 }}
                      animate={{ opacity: 1, y: 0 }}
                      exit={{ opacity: 0, x: 100 }}
                      className="flex gap-4 p-3 rounded-xl bg-card/80 border border-border/60 group"
                    >
                      {/* Item Image */}
                      <div className="w-20 h-20 rounded-lg overflow-hidden flex-shrink-0 bg-secondary">
                        <img
                          src={item.image}
                          alt={item.name}
                          className="w-full h-full object-cover"
                        />
                      </div>

                      {/* Item Details */}
                      <div className="flex-1 min-w-0">
                        <div className="flex items-start justify-between gap-2">
                          <h3 className="text-sm font-semibold text-foreground truncate">
                            {item.name}
                          </h3>
                          <button
                            onClick={() => removeItem(item.id, item.size, item.spiceLevel)}
                            className="flex-shrink-0 w-7 h-7 rounded-full bg-secondary/60 flex items-center justify-center text-muted-foreground hover:text-destructive hover:bg-destructive/10 transition-colors opacity-0 group-hover:opacity-100"
                            aria-label={`Remove ${item.name}`}
                          >
                            <Trash2 className="w-3.5 h-3.5" />
                          </button>
                        </div>

                        {/* Tags */}
                        <div className="flex flex-wrap gap-1.5 mt-1">
                          {item.size && (
                            <span className="text-[10px] px-1.5 py-0.5 rounded bg-secondary text-muted-foreground font-medium">
                              {item.size}
                            </span>
                          )}
                          {item.spiceLevel && (
                            <span className="text-[10px] px-1.5 py-0.5 rounded bg-primary/15 text-primary font-medium">
                              {item.spiceLevel}
                            </span>
                          )}
                        </div>

                        {/* Quantity & Price */}
                        <div className="flex items-center justify-between mt-2">
                          <div className="flex items-center gap-2">
                            <button
                              onClick={() =>
                                updateQuantity(item.id, item.size, item.spiceLevel, item.quantity - 1)
                              }
                              className="w-7 h-7 rounded-md bg-secondary/80 flex items-center justify-center text-muted-foreground hover:text-foreground hover:bg-secondary transition-colors"
                              aria-label="Decrease quantity"
                            >
                              <Minus className="w-3 h-3" />
                            </button>
                            <span className="text-sm font-semibold text-foreground w-5 text-center">
                              {item.quantity}
                            </span>
                            <button
                              onClick={() =>
                                updateQuantity(item.id, item.size, item.spiceLevel, item.quantity + 1)
                              }
                              className="w-7 h-7 rounded-md bg-secondary/80 flex items-center justify-center text-muted-foreground hover:text-foreground hover:bg-secondary transition-colors"
                              aria-label="Increase quantity"
                            >
                              <Plus className="w-3 h-3" />
                            </button>
                          </div>
                          <span className="text-sm font-bold text-primary">
                            {formatPrice((item.price + (item.extraCharges || 0)) * item.quantity)}
                          </span>
                        </div>
                      </div>
                    </motion.div>
                  ))}
                </div>
              )}
            </div>

            {/* Footer */}
            {items.length > 0 && (
              <div className="border-t border-border p-6 space-y-4">
                <div className="flex items-center justify-between">
                  <span className="text-muted-foreground font-medium">Subtotal</span>
                  <span className="text-xl font-bold text-foreground">{formatPrice(subtotal)}</span>
                </div>
                <button
                  onClick={onCheckout}
                  className="block w-full py-3.5 bg-fire-gradient text-primary-foreground font-bold rounded-xl text-center
                    shadow-lg shadow-primary/20 hover:shadow-primary/40
                    hover:opacity-90 transition-all duration-300 btn-fire-glow"
                >
                  Proceed to Checkout
                </button>
                <button
                  onClick={onClose}
                  className="block w-full py-2.5 text-center text-sm text-muted-foreground hover:text-foreground transition-colors"
                >
                  Continue Shopping
                </button>
              </div>
            )}
          </motion.div>
        </>
      )}
    </AnimatePresence>
  )
}
