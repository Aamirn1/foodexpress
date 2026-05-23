'use client'

import { useState } from 'react'
import { motion } from 'framer-motion'
import {
  ShoppingCart,
  Truck,
  CreditCard,
  ClipboardCheck,
  Minus,
  Plus,
  Trash2,
  Check,
  Flame,
  Banknote,
  Wifi,
} from 'lucide-react'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { useRouter } from 'next/navigation'
import { useCart } from '@/hooks/use-cart'

interface CheckoutPageProps {
  onNavigate?: (page: string, param?: string) => void
}

const steps = [
  { label: 'Cart', icon: ShoppingCart },
  { label: 'Delivery', icon: Truck },
  { label: 'Payment', icon: CreditCard },
  { label: 'Review', icon: ClipboardCheck },
]

export default function CheckoutPage({ onNavigate }: CheckoutPageProps) {
  const { items, subtotal, totalItems, updateQuantity, removeItem, clearCart } = useCart()
  const router = useRouter()
  const [currentStep, setCurrentStep] = useState(0)
  const [isPlacing, setIsPlacing] = useState(false)
  const [orderPlaced, setOrderPlaced] = useState(false)

  const [formData, setFormData] = useState({
    name: '',
    phone: '',
    email: '',
    address: '',
    city: '',
    notes: '',
  })

  const [paymentMethod, setPaymentMethod] = useState('cash')

  const deliveryFee = subtotal >= 2500 ? 0 : 150
  const total = subtotal + deliveryFee

  const formatPrice = (price: number) => `Rs. ${price.toLocaleString()}`

  const updateField = (field: string, value: string) => {
    setFormData((prev) => ({ ...prev, [field]: value }))
  }

  const canProceed = () => {
    if (currentStep === 0) return items.length > 0
    if (currentStep === 1)
      return formData.name && formData.phone && formData.address && formData.city
    if (currentStep === 2) return true
    return true
  }

  const handleNext = () => {
    if (canProceed() && currentStep < 3) {
      setCurrentStep(currentStep + 1)
    }
  }

  const handleBack = () => {
    if (currentStep > 0) {
      setCurrentStep(currentStep - 1)
    }
  }

  const handlePlaceOrder = async () => {
    setIsPlacing(true)
    // Simulate order placement
    await new Promise((resolve) => setTimeout(resolve, 2000))
    setIsPlacing(false)
    setOrderPlaced(true)
    clearCart()
  }

  if (items.length === 0 && !orderPlaced) {
    return (
      <div className="min-h-screen bg-background flex items-center justify-center">
        <motion.div
          className="text-center"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
        >
          <ShoppingCart className="w-16 h-16 text-muted-foreground/30 mx-auto mb-4" />
          <h2 className="text-2xl font-serif font-bold text-foreground mb-2">
            Your cart is empty
          </h2>
          <p className="text-muted-foreground mb-6">
            Add some delicious items to get started
          </p>
          <Button
            className="bg-fire-gradient text-primary-foreground btn-fire-glow"
            onClick={() => router.push('/menu')}
          >
            Browse Menu
          </Button>
        </motion.div>
      </div>
    )
  }

  if (orderPlaced) {
    return (
      <div className="min-h-screen bg-background flex items-center justify-center">
        <motion.div
          className="text-center"
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
        >
          <div className="w-20 h-20 rounded-full bg-green-500/20 flex items-center justify-center mx-auto mb-6">
            <Check className="w-10 h-10 text-green-400" />
          </div>
          <h2 className="text-3xl font-serif font-black text-foreground mb-2">
            Order Placed!
          </h2>
          <p className="text-muted-foreground mb-2">
            Your order has been received and is being prepared.
          </p>
          <p className="text-muted-foreground text-sm mb-8">
            Estimated delivery time: 30-45 minutes
          </p>
          <Button
            className="bg-fire-gradient text-primary-foreground btn-fire-glow"
            onClick={() => router.push('/')}
          >
            Back to Home
          </Button>
        </motion.div>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-background">
      {/* Header */}
      <div className="pt-24 pb-6">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
          <h1 className="text-3xl md:text-4xl font-serif font-black text-fire-gradient mb-6">
            Checkout
          </h1>

          {/* Progress Steps */}
          <div className="flex items-center justify-between mb-8">
            {steps.map((step, idx) => (
              <div key={step.label} className="flex items-center">
                <div className="flex items-center gap-2">
                  <div
                    className={`w-8 h-8 rounded-full flex items-center justify-center text-xs font-bold transition-all ${
                      idx < currentStep
                        ? 'bg-green-500 text-white'
                        : idx === currentStep
                        ? 'bg-fire-gradient text-primary-foreground'
                        : 'bg-secondary text-muted-foreground'
                    }`}
                  >
                    {idx < currentStep ? (
                      <Check className="w-4 h-4" />
                    ) : (
                      <step.icon className="w-4 h-4" />
                    )}
                  </div>
                  <span
                    className={`hidden sm:inline text-sm font-medium ${
                      idx <= currentStep
                        ? 'text-foreground'
                        : 'text-muted-foreground'
                    }`}
                  >
                    {step.label}
                  </span>
                </div>
                {idx < steps.length - 1 && (
                  <div
                    className={`w-8 sm:w-16 lg:w-24 h-0.5 mx-2 ${
                      idx < currentStep ? 'bg-green-500' : 'bg-border'
                    }`}
                  />
                )}
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Main Content */}
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 pb-16">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Left: Step Content */}
          <div className="lg:col-span-2">
            <motion.div
              key={currentStep}
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.3 }}
            >
              {/* Step 0: Cart Review */}
              {currentStep === 0 && (
                <div>
                  <h2 className="text-xl font-serif font-bold text-foreground mb-4">
                    Your Cart ({totalItems} items)
                  </h2>
                  <div className="space-y-3">
                    {items.map((item) => (
                      <div
                        key={`${item.id}-${item.size}-${item.spiceLevel}`}
                        className="flex items-center gap-4 bg-card rounded-xl border border-border p-4"
                      >
                        <img
                          src={item.image || '/images/product-classic-burger.png'}
                          alt={item.name}
                          className="w-16 h-16 rounded-lg object-cover"
                        />
                        <div className="flex-1 min-w-0">
                          <h3 className="font-medium text-foreground text-sm truncate">
                            {item.name}
                          </h3>
                          <div className="text-xs text-muted-foreground space-x-2">
                            {item.size && <span>{item.size}</span>}
                            {item.spiceLevel && <span>{item.spiceLevel}</span>}
                          </div>
                          {item.addons && item.addons.length > 0 && (
                            <div className="text-xs text-muted-foreground">
                              + {item.addons.join(', ')}
                            </div>
                          )}
                          <span className="text-fire-gradient font-bold text-sm">
                            {formatPrice((item.price + (item.extraCharges || 0)) * item.quantity)}
                          </span>
                        </div>
                        <div className="flex items-center gap-2">
                          <div className="flex items-center border border-border rounded-lg overflow-hidden">
                            <button
                              onClick={() =>
                                updateQuantity(item.id, item.size, item.spiceLevel, item.quantity - 1)
                              }
                              className="px-2 py-1 text-muted-foreground hover:text-foreground hover:bg-secondary transition-colors"
                            >
                              <Minus className="w-3 h-3" />
                            </button>
                            <span className="px-2 text-foreground text-sm font-medium">
                              {item.quantity}
                            </span>
                            <button
                              onClick={() =>
                                updateQuantity(item.id, item.size, item.spiceLevel, item.quantity + 1)
                              }
                              className="px-2 py-1 text-muted-foreground hover:text-foreground hover:bg-secondary transition-colors"
                            >
                              <Plus className="w-3 h-3" />
                            </button>
                          </div>
                          <button
                            onClick={() => removeItem(item.id, item.size, item.spiceLevel)}
                            className="text-muted-foreground hover:text-destructive transition-colors p-1"
                          >
                            <Trash2 className="w-4 h-4" />
                          </button>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              )}

              {/* Step 1: Delivery Info */}
              {currentStep === 1 && (
                <div>
                  <h2 className="text-xl font-serif font-bold text-foreground mb-4">
                    Delivery Information
                  </h2>
                  <div className="bg-card rounded-xl border border-border p-6 space-y-4">
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                      <div>
                        <label className="block text-sm font-medium text-foreground mb-1.5">
                          Full Name *
                        </label>
                        <Input
                          value={formData.name}
                          onChange={(e) => updateField('name', e.target.value)}
                          placeholder="John Doe"
                          className="bg-background border-border text-foreground"
                        />
                      </div>
                      <div>
                        <label className="block text-sm font-medium text-foreground mb-1.5">
                          Phone Number *
                        </label>
                        <Input
                          value={formData.phone}
                          onChange={(e) => updateField('phone', e.target.value)}
                          placeholder="+92 320 5719979"
                          className="bg-background border-border text-foreground"
                        />
                      </div>
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-foreground mb-1.5">
                        Email
                      </label>
                      <Input
                        value={formData.email}
                        onChange={(e) => updateField('email', e.target.value)}
                        placeholder="john@example.com"
                        type="email"
                        className="bg-background border-border text-foreground"
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-foreground mb-1.5">
                        Delivery Address *
                      </label>
                      <Input
                        value={formData.address}
                        onChange={(e) => updateField('address', e.target.value)}
                        placeholder="Lalkurti, Rawalpindi"
                        className="bg-background border-border text-foreground"
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-foreground mb-1.5">
                        City *
                      </label>
                      <Input
                        value={formData.city}
                        onChange={(e) => updateField('city', e.target.value)}
                        placeholder="New York"
                        className="bg-background border-border text-foreground"
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-foreground mb-1.5">
                        Delivery Notes
                      </label>
                      <Input
                        value={formData.notes}
                        onChange={(e) => updateField('notes', e.target.value)}
                        placeholder="Ring doorbell, leave at door, etc."
                        className="bg-background border-border text-foreground"
                      />
                    </div>
                  </div>
                </div>
              )}

              {/* Step 2: Payment */}
              {currentStep === 2 && (
                <div>
                  <h2 className="text-xl font-serif font-bold text-foreground mb-4">
                    Payment Method
                  </h2>
                  <div className="space-y-3">
                    {[
                      { id: 'cash', label: 'Cash on Delivery', icon: Banknote, desc: 'Pay when your order arrives' },
                      { id: 'card', label: 'Credit / Debit Card', icon: CreditCard, desc: 'Visa, MasterCard, Amex' },
                      { id: 'online', label: 'Online Payment', icon: Wifi, desc: 'Apple Pay, Google Pay' },
                    ].map((method) => (
                      <button
                        key={method.id}
                        onClick={() => setPaymentMethod(method.id)}
                        className={`w-full flex items-center gap-4 p-4 rounded-xl border transition-all text-left ${
                          paymentMethod === method.id
                            ? 'bg-primary/10 border-primary/50 text-foreground'
                            : 'bg-card border-border text-muted-foreground hover:border-primary/30'
                        }`}
                      >
                        <div
                          className={`w-10 h-10 rounded-lg flex items-center justify-center ${
                            paymentMethod === method.id
                              ? 'bg-primary/20'
                              : 'bg-secondary'
                          }`}
                        >
                          <method.icon
                            className={`w-5 h-5 ${
                              paymentMethod === method.id
                                ? 'text-primary'
                                : 'text-muted-foreground'
                            }`}
                          />
                        </div>
                        <div>
                          <span className="font-medium text-foreground text-sm">
                            {method.label}
                          </span>
                          <p className="text-xs text-muted-foreground">
                            {method.desc}
                          </p>
                        </div>
                        {paymentMethod === method.id && (
                          <Check className="w-5 h-5 text-primary ml-auto" />
                        )}
                      </button>
                    ))}
                  </div>
                </div>
              )}

              {/* Step 3: Review */}
              {currentStep === 3 && (
                <div>
                  <h2 className="text-xl font-serif font-bold text-foreground mb-4">
                    Order Review
                  </h2>
                  <div className="space-y-4">
                    {/* Delivery Info */}
                    <div className="bg-card rounded-xl border border-border p-5">
                      <h3 className="font-semibold text-foreground text-sm mb-2 flex items-center gap-2">
                        <Truck className="w-4 h-4 text-primary" />
                        Delivery Details
                      </h3>
                      <div className="text-sm text-muted-foreground space-y-1">
                        <p>{formData.name}</p>
                        <p>{formData.phone}</p>
                        <p>{formData.address}, {formData.city}</p>
                        {formData.notes && <p>Notes: {formData.notes}</p>}
                      </div>
                    </div>

                    {/* Payment */}
                    <div className="bg-card rounded-xl border border-border p-5">
                      <h3 className="font-semibold text-foreground text-sm mb-2 flex items-center gap-2">
                        <CreditCard className="w-4 h-4 text-primary" />
                        Payment
                      </h3>
                      <p className="text-sm text-muted-foreground">
                        {paymentMethod === 'cash'
                          ? 'Cash on Delivery'
                          : paymentMethod === 'card'
                          ? 'Credit / Debit Card'
                          : 'Online Payment'}
                      </p>
                    </div>

                    {/* Items */}
                    <div className="bg-card rounded-xl border border-border p-5">
                      <h3 className="font-semibold text-foreground text-sm mb-3 flex items-center gap-2">
                        <ShoppingCart className="w-4 h-4 text-primary" />
                        Items ({totalItems})
                      </h3>
                      <div className="space-y-2">
                        {items.map((item) => (
                          <div
                            key={`${item.id}-${item.size}-${item.spiceLevel}`}
                            className="flex items-center justify-between text-sm"
                          >
                            <span className="text-muted-foreground">
                              {item.quantity}x {item.name}
                            </span>
                            <span className="text-foreground font-medium">
                              {formatPrice((item.price + (item.extraCharges || 0)) * item.quantity)}
                            </span>
                          </div>
                        ))}
                      </div>
                    </div>
                  </div>
                </div>
              )}
            </motion.div>

            {/* Navigation Buttons */}
            <div className="flex items-center justify-between mt-8">
              {currentStep > 0 ? (
                <Button
                  variant="outline"
                  onClick={handleBack}
                  className="border-border text-foreground hover:bg-secondary"
                >
                  Back
                </Button>
              ) : (
                <div />
              )}

              {currentStep < 3 ? (
                <Button
                  className="bg-fire-gradient text-primary-foreground btn-fire-glow"
                  onClick={handleNext}
                  disabled={!canProceed()}
                >
                  Continue
                </Button>
              ) : (
                <Button
                  className="bg-fire-gradient text-primary-foreground btn-fire-glow font-semibold text-base py-6 px-8"
                  onClick={handlePlaceOrder}
                  disabled={isPlacing}
                >
                  {isPlacing ? (
                    <span className="flex items-center gap-2">
                      <Flame className="w-5 h-5 animate-pulse" />
                      Placing Order...
                    </span>
                  ) : (
                    `Place Order - ${formatPrice(total)}`
                  )}
                </Button>
              )}
            </div>
          </div>

          {/* Right: Order Summary */}
          <div className="lg:col-span-1">
            <div className="bg-card rounded-xl border border-border p-5 sticky top-24">
              <h3 className="font-serif font-bold text-foreground mb-4">
                Order Summary
              </h3>

              <div className="space-y-3 mb-4 max-h-64 overflow-y-auto">
                {items.map((item) => (
                  <div
                    key={`summary-${item.id}-${item.size}-${item.spiceLevel}`}
                    className="flex items-center gap-3"
                  >
                    <img
                      src={item.image || '/images/product-classic-burger.png'}
                      alt={item.name}
                      className="w-10 h-10 rounded-lg object-cover"
                    />
                    <div className="flex-1 min-w-0">
                      <p className="text-foreground text-xs font-medium truncate">
                        {item.quantity}x {item.name}
                      </p>
                    </div>
                    <span className="text-xs text-muted-foreground">
                      {formatPrice((item.price + (item.extraCharges || 0)) * item.quantity)}
                    </span>
                  </div>
                ))}
              </div>

              <div className="border-t border-border pt-4 space-y-2">
                <div className="flex items-center justify-between text-sm">
                  <span className="text-muted-foreground">Subtotal</span>
                  <span className="text-foreground">{formatPrice(subtotal)}</span>
                </div>
                <div className="flex items-center justify-between text-sm">
                  <span className="text-muted-foreground">Delivery Fee</span>
                  <span className={deliveryFee === 0 ? 'text-green-400' : 'text-foreground'}>
                    {deliveryFee === 0 ? 'Free' : formatPrice(deliveryFee)}
                  </span>
                </div>
                <div className="border-t border-border pt-2 flex items-center justify-between">
                  <span className="font-semibold text-foreground">Total</span>
                  <span className="text-fire-gradient font-bold text-lg">
                    {formatPrice(total)}
                  </span>
                </div>
              </div>

              {subtotal < 2500 && (
                <p className="text-xs text-muted-foreground mt-3 text-center">
                  Add {formatPrice(2500 - subtotal)} more for free delivery
                </p>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
