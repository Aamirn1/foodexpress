'use client'

import { useState, useEffect, useRef, useMemo, useCallback } from 'react'
import { createPortal } from 'react-dom'
import { motion, AnimatePresence } from 'framer-motion'
import { Search, X } from 'lucide-react'
import { searchMenuItems, type MenuItem } from '@/data/menu'

interface SearchOverlayProps {
  isOpen: boolean
  onClose: () => void
}

export default function SearchOverlay({ isOpen, onClose }: SearchOverlayProps) {
  const [query, setQuery] = useState('')
  const [canPortal, setCanPortal] = useState(false)
  const inputRef = useRef<HTMLInputElement>(null)

  // Compute results from query
  const results: MenuItem[] = useMemo(() => {
    if (query.trim().length > 0) {
      return searchMenuItems(query)
    }
    return []
  }, [query])

  // Wrap onClose to also reset query
  const handleClose = useCallback(() => {
    setQuery('')
    onClose()
  }, [onClose])

  // Enable portal after mount
  useEffect(() => {
    const id = requestAnimationFrame(() => setCanPortal(true))
    return () => cancelAnimationFrame(id)
  }, [])

  // Focus input when overlay opens
  useEffect(() => {
    if (isOpen) {
      const focusTimer = setTimeout(() => inputRef.current?.focus(), 100)
      return () => clearTimeout(focusTimer)
    }
  }, [isOpen])

  // Escape key handler
  useEffect(() => {
    if (!isOpen) return
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') handleClose()
    }
    window.addEventListener('keydown', handleKeyDown)
    return () => window.removeEventListener('keydown', handleKeyDown)
  }, [isOpen, handleClose])

  const overlay = (
    <AnimatePresence>
      {isOpen && (
        <>
          {/* Backdrop */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.2 }}
            style={{ zIndex: 9990 }}
            className="fixed inset-0 bg-black/70 backdrop-blur-md"
            onClick={handleClose}
          />

          {/* Overlay Panel */}
          <motion.div
            initial={{ y: '-100%', opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            exit={{ y: '-100%', opacity: 0 }}
            transition={{ type: 'spring', damping: 30, stiffness: 300 }}
            style={{ zIndex: 9991 }}
            className="fixed top-0 left-0 right-0 bg-background/95 backdrop-blur-xl border-b border-border shadow-2xl shadow-black/40"
          >
            <div className="max-w-3xl mx-auto px-4 sm:px-6 py-6">
              {/* Search Input */}
              <div className="relative">
                <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-muted-foreground" />
                <input
                  ref={inputRef}
                  type="text"
                  value={query}
                  onChange={(e) => setQuery(e.target.value)}
                  placeholder="Search our menu..."
                  className="w-full pl-12 pr-12 py-4 bg-secondary/50 border-2 border-border rounded-xl
                    text-foreground placeholder:text-muted-foreground
                    focus:outline-none focus:border-primary focus:shadow-[0_0_20px_hsl(18_100%_60%/0.3),0_0_40px_hsl(18_100%_60%/0.1)]
                    transition-all duration-300 text-lg"
                />
                <button
                  onClick={handleClose}
                  className="absolute right-3 top-1/2 -translate-y-1/2 w-9 h-9 rounded-full bg-secondary/80 flex items-center justify-center text-muted-foreground hover:text-foreground transition-colors"
                  aria-label="Close search"
                >
                  <X className="w-4 h-4" />
                </button>
              </div>

              {/* Results */}
              <div className="mt-4 max-h-[60vh] overflow-y-auto">
                {query.trim().length > 0 && results.length === 0 && (
                  <div className="text-center py-12">
                    <p className="text-lg font-medium text-foreground">No results found</p>
                    <p className="text-sm text-muted-foreground mt-1">
                      Try a different search term
                    </p>
                  </div>
                )}

                {results.length > 0 && (
                  <div className="space-y-2">
                    <p className="text-xs text-muted-foreground uppercase tracking-wider font-medium mb-3">
                      {results.length} result{results.length !== 1 ? 's' : ''} found
                    </p>
                    {results.map((item, index) => (
                      <motion.div
                        key={item.id}
                        initial={{ opacity: 0, y: 10 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: index * 0.05 }}
                      >
                        <a
                          href="/menu"
                          className="flex items-center gap-4 p-3 rounded-xl bg-card/60 border border-border/50 hover:border-primary/30 hover:bg-card transition-all duration-200 group cursor-pointer"
                        >
                          {/* Item Image */}
                          <div className="w-14 h-14 rounded-lg overflow-hidden flex-shrink-0 bg-secondary">
                            <img
                              src={item.images[0]}
                              alt={item.name}
                              className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-300"
                            />
                          </div>

                          {/* Item Info */}
                          <div className="flex-1 min-w-0">
                            <h3 className="text-sm font-semibold text-foreground group-hover:text-primary transition-colors truncate">
                              {item.name}
                            </h3>
                            <p className="text-xs text-muted-foreground mt-0.5">
                              {item.category}
                            </p>
                          </div>

                          {/* Price */}
                          <span className="text-sm font-bold text-primary flex-shrink-0">
                            {item.priceFormatted}
                          </span>
                        </a>
                      </motion.div>
                    ))}
                  </div>
                )}
              </div>
            </div>
          </motion.div>
        </>
      )}
    </AnimatePresence>
  )

  // Render via portal to document.body so it's always on top
  if (!canPortal) return null
  return createPortal(overlay, document.body)
}
