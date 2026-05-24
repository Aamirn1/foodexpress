'use client'

import { useState, useCallback } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
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
  ShieldCheck,
  Clock,
  MapPin,
  Phone,
  Mail,
  User,
  FileText,
  ArrowRight,
  ArrowLeft,
  Copy,
  CheckCheck,
  ChefHat,
} from 'lucide-react'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { useRouter } from 'next/navigation'
import { useCart } from '@/hooks/use-cart'
import { useToast } from '@/hooks/use-toast'
import RocketTransition from '@/components/RocketTransition'
import ChefTransition from '@/components/ChefTransition'

interface CheckoutPageProps {
  onNavigate?: (page: string, param?: string) => void
}

const steps = [
  { label: 'Cart', icon: ShoppingCart, desc: 'Review items' },
  { label: 'Delivery', icon: Truck, desc: 'Where to deliver' },
  { label: 'Payment', icon: CreditCard, desc: 'How to pay' },
  { label: 'Confirm', icon: ClipboardCheck, desc: 'Review & place' },
]

export default function CheckoutPage({ onNavigate }: CheckoutPageProps) {
  const { items, subtotal, totalItems, updateQuantity, removeItem, clearCart } = useCart()
  const router = useRouter()
  const { toast } = useToast()
  const [currentStep, setCurrentStep] = useState(0)
  const [isPlacing, setIsPlacing] = useState(false)
  const [orderPlaced, setOrderPlaced] = useState(false)
  const [showRocket, setShowRocket] = useState(false)
  const [showChef, setShowChef] = useState(false)
  const [transactionId, setTransactionId] = useState('')
  const [copiedOrderId, setCopiedOrderId] = useState(false)
  const [orderData, setOrderData] = useState({
    orderId: '',
    estimatedTime: '',
  })

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
    if (currentStep === 2) {
      if (paymentMethod !== 'cash') return transactionId.trim().length > 0
      return true
    }
    return true
  }

  const handleNext = () => {
    if (canProceed() && currentStep < 3) {
      setCurrentStep(currentStep + 1)
      window.scrollTo({ top: 0, behavior: 'smooth' })
    }
  }

  const handleBack = () => {
    if (currentStep > 0) {
      setCurrentStep(currentStep - 1)
      window.scrollTo({ top: 0, behavior: 'smooth' })
    }
  }

  const handlePlaceOrder = async () => {
    setIsPlacing(true)
    // Simulate order placement
    await new Promise((resolve) => setTimeout(resolve, 1500))
    const orderId = `FE-${Date.now().toString(36).toUpperCase()}-${Math.random().toString(36).substring(2, 6).toUpperCase()}`
    setOrderData({
      orderId,
      estimatedTime: '30-45',
    })
    setIsPlacing(false)
    // Trigger chef animation
    setShowChef(true)
  }

  const onChefComplete = useCallback(() => {
    setOrderPlaced(true)
    clearCart()
  }, [clearCart])

  const copyOrderId = () => {
    navigator.clipboard.writeText(orderData.orderId)
    setCopiedOrderId(true)
    toast({
      title: 'Copied!',
      description: 'Order ID copied to clipboard',
    })
    setTimeout(() => setCopiedOrderId(false), 2000)
  }

  // Rocket transition complete → show checkout
  const onRocketComplete = useCallback(() => {
    setShowRocket(false)
  }, [])

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

  // Order confirmed page
  if (orderPlaced) {
    return (
      <div className="min-h-screen bg-background flex items-center justify-center px-4">
        <motion.div
          className="text-center max-w-md w-full"
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.5 }}
        >
          {/* Success Icon */}
          <motion.div
            className="relative mx-auto mb-6"
            initial={{ scale: 0 }}
            animate={{ scale: 1 }}
            transition={{ type: 'spring', damping: 15, stiffness: 200, delay: 0.2 }}
          >
            <div className="w-24 h-24 rounded-full bg-green-500/20 flex items-center justify-center mx-auto">
              <Check className="w-12 h-12 text-green-400" />
            </div>
            {/* Pulse ring */}
            <motion.div
              className="absolute inset-0 rounded-full border-2 border-green-400/40"
              animate={{ scale: [1, 1.5], opacity: [1, 0] }}
              transition={{ duration: 1.5, repeat: Infinity }}
            />
          </motion.div>

          <motion.h2
            className="text-3xl sm:text-4xl font-serif font-black text-foreground mb-2"
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.4 }}
          >
            🔥 Order Confirmed!
          </motion.h2>

          <motion.p
            className="text-muted-foreground mb-6"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.5 }}
          >
            Your order has been received and is being prepared.
          </motion.p>

          {/* Order ID Card */}
          <motion.div
            className="bg-card rounded-2xl border border-border p-5 mb-6 text-left"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.6 }}
          >
            <div className="flex items-center justify-between mb-4">
              <h3 className="font-semibold text-foreground text-sm">Order Details</h3>
              <span className="text-xs text-muted-foreground">
                {new Date().toLocaleDateString('en-PK', { year: 'numeric', month: 'short', day: 'numeric', hour: '2-digit', minute: '2-digit' })}
              </span>
            </div>

            <div className="space-y-3">
              <div className="flex items-center justify-between bg-secondary/50 rounded-lg p-3">
                <div>
                  <span className="text-xs text-muted-foreground block">Order ID</span>
                  <span className="text-foreground font-mono font-bold text-sm">{orderData.orderId}</span>
                </div>
                <button
                  onClick={copyOrderId}
                  className="flex items-center gap-1 text-xs text-primary hover:text-primary/80 transition-colors px-2 py-1 rounded bg-primary/10"
                >
                  {copiedOrderId ? (
                    <>
                      <CheckCheck className="w-3 h-3" />
                      Copied
                    </>
                  ) : (
                    <>
                      <Copy className="w-3 h-3" />
                      Copy
                    </>
                  )}
                </button>
              </div>

              <div className="flex items-center gap-3">
                <div className="w-9 h-9 rounded-lg bg-primary/10 flex items-center justify-center flex-shrink-0">
                  <Clock className="w-4 h-4 text-primary" />
                </div>
                <div>
                  <span className="text-xs text-muted-foreground block">Estimated Delivery</span>
                  <span className="text-foreground font-semibold text-sm">{orderData.estimatedTime} minutes</span>
                </div>
              </div>

              <div className="flex items-center gap-3">
                <div className="w-9 h-9 rounded-lg bg-green-500/10 flex items-center justify-center flex-shrink-0">
                  <ChefHat className="w-4 h-4 text-green-400" />
                </div>
                <div>
                  <span className="text-xs text-muted-foreground block">Status</span>
                  <span className="text-green-400 font-semibold text-sm">Preparing your order</span>
                </div>
              </div>

              <div className="flex items-center gap-3">
                <div className="w-9 h-9 rounded-lg bg-primary/10 flex items-center justify-center flex-shrink-0">
                  <MapPin className="w-4 h-4 text-primary" />
                </div>
                <div>
                  <span className="text-xs text-muted-foreground block">Delivery To</span>
                  <span className="text-foreground font-semibold text-sm truncate block">{formData.address}, {formData.city}</span>
                </div>
              </div>

              {paymentMethod !== 'cash' && transactionId && (
                <div className="flex items-center gap-3">
                  <div className="w-9 h-9 rounded-lg bg-blue-500/10 flex items-center justify-center flex-shrink-0">
                    <FileText className="w-4 h-4 text-blue-400" />
                  </div>
                  <div>
                    <span className="text-xs text-muted-foreground block">Transaction ID</span>
                    <span className="text-foreground font-mono text-sm">{transactionId}</span>
                  </div>
                </div>
              )}
            </div>
          </motion.div>

          {/* Payment Summary */}
          <motion.div
            className="bg-card rounded-2xl border border-border p-5 mb-6"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.7 }}
          >
            <div className="flex items-center justify-between mb-2">
              <span className="text-sm text-muted-foreground">Payment Method</span>
              <span className="text-sm font-medium text-foreground">
                {paymentMethod === 'cash' ? 'Cash on Delivery' : paymentMethod === 'card' ? 'Credit / Debit Card' : 'Online Payment'}
              </span>
            </div>
            <div className="flex items-center justify-between">
              <span className="text-sm text-muted-foreground">Total Paid</span>
              <span className="text-fire-gradient font-bold text-lg">{formatPrice(total)}</span>
            </div>
          </motion.div>

          {/* Action Buttons */}
          <motion.div
            className="space-y-3"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.8 }}
          >
            <Button
              className="w-full bg-fire-gradient text-primary-foreground btn-fire-glow font-semibold py-5"
              onClick={() => router.push('/')}
            >
              <Flame className="w-4 h-4 mr-2" />
              Back to Home
            </Button>
            <Button
              variant="outline"
              className="w-full border-border text-foreground hover:bg-secondary"
              onClick={() => router.push('/menu')}
            >
              Order More
            </Button>
          </motion.div>
        </motion.div>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-background">
      {/* Rocket Transition */}
      <RocketTransition isActive={showRocket} onComplete={onRocketComplete} />

      {/* Chef Transition */}
      <ChefTransition isActive={showChef} onComplete={onChefComplete} />

      {/* Header */}
      <div className="pt-24 pb-6">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.h1
            className="text-3xl md:text-4xl font-serif font-black text-fire-gradient mb-8"
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
          >
            Checkout
          </motion.h1>

          {/* Enhanced Progress Steps */}
          <div className="relative">
            {/* Progress bar background */}
            <div className="absolute top-5 left-0 right-0 h-0.5 bg-border z-0" />
            {/* Progress bar filled */}
            <motion.div
              className="absolute top-5 left-0 h-0.5 bg-fire-gradient z-0"
              initial={{ width: '0%' }}
              animate={{ width: `${(currentStep / (steps.length - 1)) * 100}%` }}
              transition={{ duration: 0.5, ease: 'easeInOut' }}
            />

            <div className="flex items-start justify-between relative z-10">
              {steps.map((step, idx) => (
                <div key={step.label} className="flex flex-col items-center flex-1">
                  <motion.div
                    className={`w-10 h-10 rounded-full flex items-center justify-center text-sm font-bold transition-all border-2 ${
                      idx < currentStep
                        ? 'bg-green-500 border-green-500 text-white'
                        : idx === currentStep
                        ? 'bg-fire-gradient border-transparent text-primary-foreground shadow-lg shadow-primary/30'
                        : 'bg-card border-border text-muted-foreground'
                    }`}
                    animate={idx === currentStep ? { scale: [1, 1.1, 1] } : {}}
                    transition={{ duration: 0.3 }}
                  >
                    {idx < currentStep ? (
                      <Check className="w-4 h-4" />
                    ) : (
                      <step.icon className="w-4 h-4" />
                    )}
                  </motion.div>
                  <span
                    className={`mt-2 text-xs font-medium text-center hidden sm:block ${
                      idx <= currentStep ? 'text-foreground' : 'text-muted-foreground'
                    }`}
                  >
                    {step.label}
                  </span>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>

      {/* Main Content */}
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 pb-16">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Left: Step Content */}
          <div className="lg:col-span-2">
            <AnimatePresence mode="wait">
              <motion.div
                key={currentStep}
                initial={{ opacity: 0, x: 30 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: -30 }}
                transition={{ duration: 0.3 }}
              >
                {/* Step 0: Cart Review */}
                {currentStep === 0 && (
                  <div>
                    <h2 className="text-xl font-serif font-bold text-foreground mb-4 flex items-center gap-2">
                      <ShoppingCart className="w-5 h-5 text-primary" />
                      Your Cart ({totalItems} items)
                    </h2>
                    <div className="space-y-3">
                      {items.map((item, index) => (
                        <motion.div
                          key={`${item.id}-${item.size}-${item.spiceLevel}`}
                          initial={{ opacity: 0, y: 10 }}
                          animate={{ opacity: 1, y: 0 }}
                          transition={{ delay: index * 0.05 }}
                          className="flex items-center gap-4 bg-card rounded-xl border border-border p-4 group hover:border-primary/20 transition-colors"
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
                              <div className="text-xs text-primary/80">
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
                              className="text-muted-foreground hover:text-destructive transition-colors p-1 opacity-0 group-hover:opacity-100"
                            >
                              <Trash2 className="w-4 h-4" />
                            </button>
                          </div>
                        </motion.div>
                      ))}
                    </div>

                    {items.length > 0 && (
                      <div className="mt-4">
                        <Button
                          variant="outline"
                          className="border-border text-muted-foreground hover:text-foreground"
                          onClick={() => router.push('/menu')}
                        >
                          <Plus className="w-4 h-4 mr-2" />
                          Add More Items
                        </Button>
                      </div>
                    )}
                  </div>
                )}

                {/* Step 1: Delivery Info */}
                {currentStep === 1 && (
                  <div>
                    <h2 className="text-xl font-serif font-bold text-foreground mb-4 flex items-center gap-2">
                      <Truck className="w-5 h-5 text-primary" />
                      Delivery Information
                    </h2>
                    <div className="bg-card rounded-xl border border-border p-6 space-y-4">
                      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                        <div>
                          <label className="flex items-center gap-1.5 text-sm font-medium text-foreground mb-1.5">
                            <User className="w-3.5 h-3.5 text-muted-foreground" />
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
                          <label className="flex items-center gap-1.5 text-sm font-medium text-foreground mb-1.5">
                            <Phone className="w-3.5 h-3.5 text-muted-foreground" />
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
                        <label className="flex items-center gap-1.5 text-sm font-medium text-foreground mb-1.5">
                          <Mail className="w-3.5 h-3.5 text-muted-foreground" />
                          Email (optional)
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
                        <label className="flex items-center gap-1.5 text-sm font-medium text-foreground mb-1.5">
                          <MapPin className="w-3.5 h-3.5 text-muted-foreground" />
                          Delivery Address *
                        </label>
                        <Input
                          value={formData.address}
                          onChange={(e) => updateField('address', e.target.value)}
                          placeholder="Street, Area, Landmark"
                          className="bg-background border-border text-foreground"
                        />
                      </div>
                      <div>
                        <label className="flex items-center gap-1.5 text-sm font-medium text-foreground mb-1.5">
                          <MapPin className="w-3.5 h-3.5 text-muted-foreground" />
                          City *
                        </label>
                        <Input
                          value={formData.city}
                          onChange={(e) => updateField('city', e.target.value)}
                          placeholder="Rawalpindi"
                          className="bg-background border-border text-foreground"
                        />
                      </div>
                      <div>
                        <label className="flex items-center gap-1.5 text-sm font-medium text-foreground mb-1.5">
                          <FileText className="w-3.5 h-3.5 text-muted-foreground" />
                          Delivery Notes (optional)
                        </label>
                        <Input
                          value={formData.notes}
                          onChange={(e) => updateField('notes', e.target.value)}
                          placeholder="Ring doorbell, leave at door, etc."
                          className="bg-background border-border text-foreground"
                        />
                      </div>

                      {/* Delivery Info Notice */}
                      <div className="bg-primary/5 border border-primary/10 rounded-lg p-3 flex items-start gap-2">
                        <Clock className="w-4 h-4 text-primary mt-0.5 flex-shrink-0" />
                        <div className="text-xs text-muted-foreground">
                          <span className="text-foreground font-medium">Estimated delivery:</span>{' '}
                          30-45 minutes. Free delivery on orders above Rs. 2,500.
                        </div>
                      </div>
                    </div>
                  </div>
                )}

                {/* Step 2: Payment */}
                {currentStep === 2 && (
                  <div>
                    <h2 className="text-xl font-serif font-bold text-foreground mb-4 flex items-center gap-2">
                      <CreditCard className="w-5 h-5 text-primary" />
                      Payment Method
                    </h2>

                    <div className="space-y-3 mb-6">
                      {[
                        { id: 'cash', label: 'Cash on Delivery', icon: Banknote, desc: 'Pay when your order arrives at your door' },
                        { id: 'card', label: 'Credit / Debit Card', icon: CreditCard, desc: 'Visa, MasterCard, Amex — pay online now' },
                        { id: 'online', label: 'Online Transfer', icon: Wifi, desc: 'Apple Pay, Google Pay, EasyPaisa, JazzCash' },
                      ].map((method) => (
                        <motion.button
                          key={method.id}
                          onClick={() => setPaymentMethod(method.id)}
                          className={`w-full flex items-center gap-4 p-4 rounded-xl border-2 transition-all text-left ${
                            paymentMethod === method.id
                              ? 'bg-primary/10 border-primary/50 text-foreground shadow-lg shadow-primary/10'
                              : 'bg-card border-border text-muted-foreground hover:border-primary/20'
                          }`}
                          whileHover={{ scale: 1.01 }}
                          whileTap={{ scale: 0.99 }}
                        >
                          <div
                            className={`w-11 h-11 rounded-xl flex items-center justify-center transition-colors ${
                              paymentMethod === method.id
                                ? 'bg-fire-gradient'
                                : 'bg-secondary'
                            }`}
                          >
                            <method.icon
                              className={`w-5 h-5 ${
                                paymentMethod === method.id
                                  ? 'text-primary-foreground'
                                  : 'text-muted-foreground'
                              }`}
                            />
                          </div>
                          <div className="flex-1">
                            <span className="font-medium text-foreground text-sm block">
                              {method.label}
                            </span>
                            <p className="text-xs text-muted-foreground mt-0.5">
                              {method.desc}
                            </p>
                          </div>
                          {paymentMethod === method.id && (
                            <motion.div
                              initial={{ scale: 0 }}
                              animate={{ scale: 1 }}
                              className="w-6 h-6 rounded-full bg-green-500 flex items-center justify-center"
                            >
                              <Check className="w-3.5 h-3.5 text-white" />
                            </motion.div>
                          )}
                        </motion.button>
                      ))}
                    </div>

                    {/* Transaction ID input for non-cash payments */}
                    {paymentMethod !== 'cash' && (
                      <motion.div
                        initial={{ opacity: 0, height: 0 }}
                        animate={{ opacity: 1, height: 'auto' }}
                        exit={{ opacity: 0, height: 0 }}
                        className="bg-card rounded-xl border-2 border-dashed border-primary/30 p-5"
                      >
                        <div className="flex items-center gap-2 mb-3">
                          <ShieldCheck className="w-4 h-4 text-primary" />
                          <h3 className="font-semibold text-foreground text-sm">
                            Payment Verification
                          </h3>
                        </div>
                        <p className="text-xs text-muted-foreground mb-4">
                          {paymentMethod === 'card'
                            ? 'After completing your card payment, enter the transaction ID from your bank confirmation.'
                            : 'Send payment to our account and enter the transaction ID below for verification.'}
                        </p>

                        {/* Account details for online transfer */}
                        {paymentMethod === 'online' && (
                          <div className="bg-secondary/50 rounded-lg p-3 mb-4 text-xs space-y-1">
                            <p className="text-muted-foreground">
                              <span className="text-foreground font-medium">Bank:</span> HBL (Habib Bank Limited)
                            </p>
                            <p className="text-muted-foreground">
                              <span className="text-foreground font-medium">Account:</span> Food Express Pvt Ltd
                            </p>
                            <p className="text-muted-foreground">
                              <span className="text-foreground font-medium">IBAN:</span> PK36HABB0012345678901234
                            </p>
                            <p className="text-muted-foreground">
                              <span className="text-foreground font-medium">EasyPaisa:</span> 0320-5719979
                            </p>
                            <p className="text-muted-foreground">
                              <span className="text-foreground font-medium">JazzCash:</span> 0320-5719979
                            </p>
                          </div>
                        )}

                        <label className="block text-sm font-medium text-foreground mb-1.5">
                          Transaction ID *
                        </label>
                        <Input
                          value={transactionId}
                          onChange={(e) => setTransactionId(e.target.value)}
                          placeholder={paymentMethod === 'card' ? 'e.g., TXN-2024-XXXXXX' : 'e.g., EP-XXXXXX or JC-XXXXXX'}
                          className="bg-background border-border text-foreground font-mono"
                        />
                        <p className="text-[10px] text-muted-foreground mt-2">
                          Your transaction ID helps us verify and process your order faster.
                        </p>
                      </motion.div>
                    )}

                    {/* Cash payment notice */}
                    {paymentMethod === 'cash' && (
                      <motion.div
                        initial={{ opacity: 0, height: 0 }}
                        animate={{ opacity: 1, height: 'auto' }}
                        className="bg-green-500/5 border border-green-500/10 rounded-lg p-4 flex items-start gap-2"
                      >
                        <Banknote className="w-4 h-4 text-green-400 mt-0.5 flex-shrink-0" />
                        <div className="text-xs text-muted-foreground">
                          <span className="text-green-400 font-medium">Cash on Delivery:</span> Have the exact amount ready
                          ({formatPrice(total)}) when your order arrives. Our rider will provide a receipt.
                        </div>
                      </motion.div>
                    )}
                  </div>
                )}

                {/* Step 3: Review */}
                {currentStep === 3 && (
                  <div>
                    <h2 className="text-xl font-serif font-bold text-foreground mb-4 flex items-center gap-2">
                      <ClipboardCheck className="w-5 h-5 text-primary" />
                      Review Your Order
                    </h2>
                    <div className="space-y-4">
                      {/* Delivery Info */}
                      <div className="bg-card rounded-xl border border-border p-5">
                        <div className="flex items-center justify-between mb-3">
                          <h3 className="font-semibold text-foreground text-sm flex items-center gap-2">
                            <Truck className="w-4 h-4 text-primary" />
                            Delivery Details
                          </h3>
                          <button
                            onClick={() => setCurrentStep(1)}
                            className="text-xs text-primary hover:text-primary/80 transition-colors"
                          >
                            Edit
                          </button>
                        </div>
                        <div className="text-sm text-muted-foreground space-y-1.5">
                          <p className="flex items-center gap-2"><User className="w-3.5 h-3.5" /> {formData.name}</p>
                          <p className="flex items-center gap-2"><Phone className="w-3.5 h-3.5" /> {formData.phone}</p>
                          {formData.email && <p className="flex items-center gap-2"><Mail className="w-3.5 h-3.5" /> {formData.email}</p>}
                          <p className="flex items-center gap-2"><MapPin className="w-3.5 h-3.5" /> {formData.address}, {formData.city}</p>
                          {formData.notes && <p className="flex items-center gap-2"><FileText className="w-3.5 h-3.5" /> {formData.notes}</p>}
                        </div>
                      </div>

                      {/* Payment */}
                      <div className="bg-card rounded-xl border border-border p-5">
                        <div className="flex items-center justify-between mb-3">
                          <h3 className="font-semibold text-foreground text-sm flex items-center gap-2">
                            <CreditCard className="w-4 h-4 text-primary" />
                            Payment
                          </h3>
                          <button
                            onClick={() => setCurrentStep(2)}
                            className="text-xs text-primary hover:text-primary/80 transition-colors"
                          >
                            Edit
                          </button>
                        </div>
                        <div className="text-sm text-muted-foreground">
                          <p className="flex items-center gap-2">
                            {paymentMethod === 'cash' ? <Banknote className="w-3.5 h-3.5" /> : paymentMethod === 'card' ? <CreditCard className="w-3.5 h-3.5" /> : <Wifi className="w-3.5 h-3.5" />}
                            {paymentMethod === 'cash'
                              ? 'Cash on Delivery'
                              : paymentMethod === 'card'
                              ? 'Credit / Debit Card'
                              : 'Online Transfer'}
                          </p>
                          {transactionId && (
                            <p className="mt-1 text-xs font-mono">
                              Transaction ID: {transactionId}
                            </p>
                          )}
                        </div>
                      </div>

                      {/* Items */}
                      <div className="bg-card rounded-xl border border-border p-5">
                        <h3 className="font-semibold text-foreground text-sm mb-3 flex items-center gap-2">
                          <ShoppingCart className="w-4 h-4 text-primary" />
                          Items ({totalItems})
                        </h3>
                        <div className="space-y-3">
                          {items.map((item) => (
                            <div
                              key={`${item.id}-${item.size}-${item.spiceLevel}`}
                              className="flex items-center gap-3"
                            >
                              <img
                                src={item.image || '/images/product-classic-burger.png'}
                                alt={item.name}
                                className="w-10 h-10 rounded-lg object-cover"
                              />
                              <div className="flex-1 min-w-0">
                                <span className="text-foreground text-sm font-medium truncate block">
                                  {item.quantity}x {item.name}
                                </span>
                                {item.addons && item.addons.length > 0 && (
                                  <span className="text-xs text-muted-foreground">+ {item.addons.join(', ')}</span>
                                )}
                              </div>
                              <span className="text-foreground font-medium text-sm">
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
            </AnimatePresence>

            {/* Navigation Buttons */}
            <div className="flex items-center justify-between mt-8">
              {currentStep > 0 ? (
                <Button
                  variant="outline"
                  onClick={handleBack}
                  className="border-border text-foreground hover:bg-secondary"
                >
                  <ArrowLeft className="w-4 h-4 mr-2" />
                  Back
                </Button>
              ) : (
                <div />
              )}

              {currentStep < 3 ? (
                <Button
                  className="bg-fire-gradient text-primary-foreground btn-fire-glow font-semibold"
                  onClick={handleNext}
                  disabled={!canProceed()}
                >
                  Continue
                  <ArrowRight className="w-4 h-4 ml-2" />
                </Button>
              ) : (
                <Button
                  className="bg-fire-gradient text-primary-foreground btn-fire-glow font-semibold text-sm sm:text-base py-5 sm:py-6 px-6 sm:px-8"
                  onClick={handlePlaceOrder}
                  disabled={isPlacing}
                >
                  {isPlacing ? (
                    <span className="flex items-center gap-2">
                      <Flame className="w-5 h-5 animate-pulse" />
                      Placing Order...
                    </span>
                  ) : (
                    <>
                      <span>Place Order</span>
                      <span className="ml-2 opacity-80">· {formatPrice(total)}</span>
                    </>
                  )}
                </Button>
              )}
            </div>
          </div>

          {/* Right: Order Summary */}
          <div className="lg:col-span-1">
            <div className="bg-card rounded-xl border border-border p-5 sticky top-24">
              <h3 className="font-serif font-bold text-foreground mb-4 flex items-center gap-2">
                <ShoppingCart className="w-4 h-4 text-primary" />
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
                      {item.addons && item.addons.length > 0 && (
                        <p className="text-[10px] text-muted-foreground truncate">
                          + {item.addons.join(', ')}
                        </p>
                      )}
                    </div>
                    <span className="text-xs text-muted-foreground whitespace-nowrap">
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
                  Add {formatPrice(2500 - subtotal)} more for free delivery 🔥
                </p>
              )}

              {/* Security badge */}
              <div className="mt-4 pt-4 border-t border-border flex items-center gap-2 justify-center">
                <ShieldCheck className="w-3.5 h-3.5 text-green-400" />
                <span className="text-xs text-muted-foreground">Secure & Encrypted Payment</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
