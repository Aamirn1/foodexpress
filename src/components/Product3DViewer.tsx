'use client'

import { useState, useRef, useCallback } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import Image from 'next/image'
import { X, Star, ShoppingBag, RotateCw } from 'lucide-react'
import { Button } from '@/components/ui/button'
import { Badge } from '@/components/ui/badge'

interface Product {
  id: number
  name: string
  price: number
  image: string
  rating: number
  tag?: string
  description: string
}

interface Product3DViewerProps {
  product: Product
  onClose: () => void
}

export default function Product3DViewer({ product, onClose }: Product3DViewerProps) {
  const [rotation, setRotation] = useState({ x: 0, y: 0 })
  const [isDragging, setIsDragging] = useState(false)
  const lastPos = useRef({ x: 0, y: 0 })
  const [dragRotation, setDragRotation] = useState({ x: 0, y: 0 })
  const [autoRotate, setAutoRotate] = useState(true)
  const containerRef = useRef<HTMLDivElement>(null)

  const handleMouseMove = useCallback((e: React.MouseEvent<HTMLDivElement>) => {
    if (isDragging) return
    setAutoRotate(false)
    const rect = e.currentTarget.getBoundingClientRect()
    const x = (e.clientX - rect.left) / rect.width - 0.5
    const y = (e.clientY - rect.top) / rect.height - 0.5
    setRotation({ x: y * -20, y: x * 20 })
  }, [isDragging])

  const handleMouseLeave = useCallback(() => {
    if (!isDragging) {
      setRotation({ x: 0, y: 0 })
      setAutoRotate(true)
    }
  }, [isDragging])

  const handlePointerDown = useCallback((e: React.PointerEvent<HTMLDivElement>) => {
    setIsDragging(true)
    setAutoRotate(false)
    lastPos.current = { x: e.clientX, y: e.clientY }
    ;(e.target as HTMLElement).setPointerCapture(e.pointerId)
  }, [])

  const handlePointerMove = useCallback((e: React.PointerEvent<HTMLDivElement>) => {
    if (!isDragging) return
    const deltaX = e.clientX - lastPos.current.x
    const deltaY = e.clientY - lastPos.current.y
    setDragRotation((prev) => ({
      x: Math.max(-30, Math.min(30, prev.x + deltaY * -0.3)),
      y: prev.y + deltaX * 0.5,
    }))
    lastPos.current = { x: e.clientX, y: e.clientY }
  }, [isDragging])

  const handlePointerUp = useCallback(() => {
    setIsDragging(false)
  }, [])

  const finalRotateX = isDragging ? dragRotation.x : rotation.x
  const finalRotateY = isDragging ? dragRotation.y : rotation.y

  return (
    <AnimatePresence>
      <motion.div
        className="fixed inset-0 z-[90] flex items-center justify-center p-4"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        transition={{ duration: 0.3 }}
      >
        {/* Backdrop */}
        <motion.div
          className="absolute inset-0 bg-background/95 backdrop-blur-md"
          onClick={onClose}
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
        />

        {/* Modal */}
        <motion.div
          className="relative z-10 w-full max-w-5xl max-h-[90vh] overflow-y-auto rounded-2xl border border-border bg-card shadow-2xl"
          initial={{ scale: 0.8, opacity: 0, y: 60 }}
          animate={{ scale: 1, opacity: 1, y: 0 }}
          exit={{ scale: 0.8, opacity: 0, y: 60 }}
          transition={{ duration: 0.5, ease: [0.22, 1, 0.36, 1] }}
          style={{ scrollbarWidth: 'thin' }}
        >
          {/* Close Button */}
          <Button
            variant="ghost"
            size="icon"
            className="absolute top-4 right-4 z-20 rounded-full bg-background/80 border border-border hover:bg-background text-foreground"
            onClick={onClose}
          >
            <X className="w-5 h-5" />
          </Button>

          <div className="grid md:grid-cols-2 gap-0">
            {/* 3D Image Viewer */}
            <div
              ref={containerRef}
              className="relative p-8 md:p-12 flex items-center justify-center min-h-[350px] md:min-h-[550px]"
              style={{
                background: 'radial-gradient(ellipse at center, hsl(20 12% 12%), hsl(20 14% 6%))',
              }}
              onMouseMove={handleMouseMove}
              onMouseLeave={handleMouseLeave}
              onPointerDown={handlePointerDown}
              onPointerMove={handlePointerMove}
              onPointerUp={handlePointerUp}
            >
              {/* Ambient light ring */}
              <div className="absolute inset-8 rounded-full border border-primary/10" />
              <div className="absolute inset-16 rounded-full border border-primary/5" />

              {/* Spotlight effect */}
              <div
                className="absolute top-0 left-1/2 -translate-x-1/2 w-64 h-64"
                style={{
                  background: 'radial-gradient(circle, hsl(43 100% 50% / 0.08), transparent 70%)',
                  filter: 'blur(20px)',
                }}
              />

              <div
                className="relative w-56 h-56 sm:w-64 sm:h-64 md:w-80 md:h-80 transition-transform duration-100"
                style={{
                  perspective: '1200px',
                  transformStyle: 'preserve-3d',
                  transform: `rotateX(${finalRotateX}deg) rotateY(${finalRotateY}deg)`,
                  cursor: isDragging ? 'grabbing' : 'grab',
                }}
              >
                {/* Multi-layered glow behind product */}
                <div className="absolute inset-0 rounded-full opacity-20 blur-3xl scale-75 bg-fire-gradient" />
                <div className="absolute inset-0 rounded-full opacity-10 blur-2xl scale-90 bg-fire-gradient" />

                {/* The product image */}
                <div className="relative w-full h-full" style={{ transformStyle: 'preserve-3d' }}>
                  <Image
                    src={product.image}
                    alt={product.name}
                    fill
                    className="object-contain drop-shadow-2xl"
                    sizes="(max-width: 768px) 224px, 320px"
                    priority
                    style={{
                      filter: 'drop-shadow(0 25px 50px hsl(18 100% 60% / 0.3))',
                    }}
                  />
                </div>
              </div>

              {/* Reflection / Shadow */}
              <div
                className="absolute bottom-8 left-1/2 -translate-x-1/2 w-48 h-8 rounded-[50%] blur-xl"
                style={{
                  background: 'radial-gradient(ellipse, hsl(18 100% 60% / 0.2), transparent)',
                }}
              />

              {/* Drag hint */}
              <div className="absolute bottom-4 left-1/2 -translate-x-1/2 flex items-center gap-2 text-muted-foreground/60 text-xs">
                <RotateCw className="w-3 h-3" />
                <span>{isDragging ? 'Rotating...' : 'Drag to rotate • Hover for 3D effect'}</span>
              </div>

              {/* 3D badge */}
              <Badge className="absolute top-4 left-4 bg-primary/20 text-primary border-primary/30 text-xs">
                3D View
              </Badge>
            </div>

            {/* Product Details */}
            <div className="p-6 md:p-10 flex flex-col justify-center">
              {product.tag && (
                <Badge className="w-fit bg-fire-gradient text-primary-foreground border-0 mb-4 text-xs font-semibold">
                  {product.tag}
                </Badge>
              )}

              <h2 className="font-serif text-2xl md:text-3xl font-black text-foreground">
                {product.name}
              </h2>

              <div className="flex items-center gap-2 mt-3">
                <div className="flex items-center gap-0.5">
                  {Array.from({ length: 5 }).map((_, i) => (
                    <Star
                      key={i}
                      className={`w-4 h-4 ${
                        i < Math.floor(product.rating)
                          ? 'text-accent fill-accent'
                          : 'text-muted-foreground/30'
                      }`}
                    />
                  ))}
                </div>
                <span className="text-muted-foreground text-sm">
                  {product.rating} rating
                </span>
              </div>

              <p className="text-foreground/70 mt-4 leading-relaxed">
                {product.description}
              </p>

              <div className="mt-6">
                <span className="text-4xl font-black text-fire-gradient">
                  ${product.price.toFixed(2)}
                </span>
              </div>

              <div className="flex gap-3 mt-8">
                <Button
                  className="flex-1 bg-fire-gradient text-primary-foreground font-semibold h-12 text-lg btn-fire-glow hover:opacity-90 transition-opacity"
                  onClick={() => {
                    alert(`${product.name} added to your order!`)
                  }}
                >
                  <ShoppingBag className="w-5 h-5 mr-2" />
                  Add to Order
                </Button>
              </div>

              {/* Extra info */}
              <div className="mt-6 pt-6 border-t border-border grid grid-cols-3 gap-4 text-sm">
                <div>
                  <span className="text-muted-foreground block text-xs">Prep Time</span>
                  <p className="text-foreground font-semibold mt-0.5">8-12 min</p>
                </div>
                <div>
                  <span className="text-muted-foreground block text-xs">Calories</span>
                  <p className="text-foreground font-semibold mt-0.5">450-650</p>
                </div>
                <div>
                  <span className="text-muted-foreground block text-xs">Spice Level</span>
                  <p className="text-foreground font-semibold mt-0.5">
                    {product.tag === 'Spicy' ? '🔥🔥🔥' : product.tag === 'Popular' ? '🔥🔥' : '🔥'}
                  </p>
                </div>
              </div>
            </div>
          </div>
        </motion.div>
      </motion.div>
    </AnimatePresence>
  )
}
