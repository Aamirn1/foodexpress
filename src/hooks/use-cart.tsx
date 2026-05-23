'use client'

import { useState, useEffect, useCallback } from 'react'

export interface CartItem {
  id: string
  name: string
  price: number
  image: string
  quantity: number
  size?: string
  spiceLevel?: string
  addons?: string[]
  specialInstructions?: string
  extraCharges?: number
}

interface CartState {
  items: CartItem[]
  isOpen: boolean
}

const CART_KEY = 'food-express-cart'

function loadCart(): CartItem[] {
  if (typeof window === 'undefined') return []
  try {
    const stored = localStorage.getItem(CART_KEY)
    return stored ? JSON.parse(stored) : []
  } catch {
    return []
  }
}

function saveCart(items: CartItem[]) {
  if (typeof window === 'undefined') return
  localStorage.setItem(CART_KEY, JSON.stringify(items))
}

export function useCart() {
  const [state, setState] = useState<CartState>({
    items: [],
    isOpen: false,
  })

  useEffect(() => {
    const id = requestAnimationFrame(() => {
      setState((prev) => ({ ...prev, items: loadCart() }))
    })
    return () => cancelAnimationFrame(id)
  }, [])

  useEffect(() => {
    saveCart(state.items)
  }, [state.items])

  const addItem = useCallback((item: CartItem) => {
    setState((prev) => {
      const existingIndex = prev.items.findIndex(
        (i) =>
          i.id === item.id &&
          i.size === item.size &&
          i.spiceLevel === item.spiceLevel &&
          JSON.stringify(i.addons) === JSON.stringify(item.addons)
      )

      if (existingIndex >= 0) {
        const newItems = [...prev.items]
        newItems[existingIndex] = {
          ...newItems[existingIndex],
          quantity: newItems[existingIndex].quantity + item.quantity,
        }
        return { ...prev, items: newItems, isOpen: true }
      }

      return { ...prev, items: [...prev.items, item], isOpen: true }
    })
  }, [])

  const removeItem = useCallback((id: string, size?: string, spiceLevel?: string) => {
    setState((prev) => ({
      ...prev,
      items: prev.items.filter(
        (i) => !(i.id === id && i.size === size && i.spiceLevel === spiceLevel)
      ),
    }))
  }, [])

  const updateQuantity = useCallback(
    (id: string, size: string | undefined, spiceLevel: string | undefined, quantity: number) => {
      if (quantity <= 0) {
        removeItem(id, size, spiceLevel)
        return
      }
      setState((prev) => ({
        ...prev,
        items: prev.items.map((i) =>
          i.id === id && i.size === size && i.spiceLevel === spiceLevel
            ? { ...i, quantity }
            : i
        ),
      }))
    },
    [removeItem]
  )

  const toggleCart = useCallback(() => {
    setState((prev) => ({ ...prev, isOpen: !prev.isOpen }))
  }, [])

  const openCart = useCallback(() => {
    setState((prev) => ({ ...prev, isOpen: true }))
  }, [])

  const closeCart = useCallback(() => {
    setState((prev) => ({ ...prev, isOpen: false }))
  }, [])

  const clearCart = useCallback(() => {
    setState((prev) => ({ ...prev, items: [] }))
  }, [])

  const subtotal = state.items.reduce(
    (sum, item) => sum + (item.price + (item.extraCharges || 0)) * item.quantity,
    0
  )

  const totalItems = state.items.reduce((sum, item) => sum + item.quantity, 0)

  return {
    items: state.items,
    isOpen: state.isOpen,
    subtotal,
    totalItems,
    addItem,
    removeItem,
    updateQuantity,
    toggleCart,
    openCart,
    closeCart,
    clearCart,
  }
}
