'use client'

import { useState, useEffect } from 'react'
import FireIntro from '@/components/FireIntro'
import Navbar from '@/components/Navbar'
import HeroSection from '@/components/HeroSection'
import TrustPanel from '@/components/TrustPanel'
import MenuCategories from '@/components/MenuCategories'
import PopularItems from '@/components/PopularItems'
import SpecialsSection from '@/components/SpecialsSection'
import AboutSection from '@/components/AboutSection'
import NewsletterSection from '@/components/NewsletterSection'
import Footer from '@/components/Footer'
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
        className={`min-h-screen flex flex-col bg-background transition-opacity duration-1000 ${
          showIntro ? 'opacity-0' : 'opacity-100'
        }`}
      >
        <Navbar />
        <main className="flex-1">
          <HeroSection />
          <TrustPanel />
          <MenuCategories />
          <PopularItems onViewProduct={setSelectedProduct} />
          <SpecialsSection />
          <AboutSection />
          <NewsletterSection />
        </main>
        <Footer />
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
