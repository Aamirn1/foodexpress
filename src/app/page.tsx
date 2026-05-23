'use client'

import { useState, useEffect } from 'react'
import FireIntro from '@/components/FireIntro'
import HeroSection from '@/components/HeroSection'
import TrustPanel from '@/components/TrustPanel'
import MenuCategories from '@/components/MenuCategories'
import PopularItems from '@/components/PopularItems'
import SpecialsSection from '@/components/SpecialsSection'
import AboutSection from '@/components/AboutSection'
import NewsletterSection from '@/components/NewsletterSection'
import Product3DViewer from '@/components/Product3DViewer'

interface Product {
  id: number
  name: string
  price: number
  image: string
  rating: number
  tag?: string
  description: string
}

export default function Home() {
  const [showIntro, setShowIntro] = useState(true)
  const [selectedProduct, setSelectedProduct] = useState<Product | null>(null)

  useEffect(() => {
    const timer = setTimeout(() => setShowIntro(false), 4500)
    return () => clearTimeout(timer)
  }, [])

  return (
    <>
      {showIntro && <FireIntro onComplete={() => setShowIntro(false)} />}
      <div
        className={`transition-opacity duration-1000 ${
          showIntro ? 'opacity-0' : 'opacity-100'
        }`}
      >
        <HeroSection />
        <TrustPanel />
        <MenuCategories />
        <PopularItems onViewProduct={setSelectedProduct} />
        <SpecialsSection />
        <AboutSection />
        <NewsletterSection />
      </div>

      {selectedProduct && (
        <Product3DViewer
          product={selectedProduct}
          onClose={() => setSelectedProduct(null)}
        />
      )}
    </>
  )
}
