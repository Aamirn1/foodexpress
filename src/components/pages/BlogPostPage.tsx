'use client'

import { motion } from 'framer-motion'
import { ChevronRight, Home, Clock, BookOpen, Star, Flame } from 'lucide-react'
import { Badge } from '@/components/ui/badge'
import { getBlogBySlug, blogPosts } from '@/data/blog'
import { getMenuItemById } from '@/data/menu'

interface BlogPostPageProps {
  slug: string
  onNavigate?: (page: string, param?: string) => void
}

export default function BlogPostPage({ slug, onNavigate }: BlogPostPageProps) {
  const post = getBlogBySlug(slug)

  if (!post) {
    return (
      <div className="min-h-screen bg-background flex items-center justify-center">
        <div className="text-center">
          <Flame className="w-16 h-16 text-muted-foreground/30 mx-auto mb-4" />
          <h2 className="text-2xl font-serif font-bold text-foreground mb-2">
            Post Not Found
          </h2>
          <p className="text-muted-foreground">This blog post does not exist.</p>
        </div>
      </div>
    )
  }

  const relatedMenuItems = post.relatedItems
    .map((id) => getMenuItemById(id))
    .filter(Boolean)

  const morePosts = blogPosts
    .filter((p) => p.slug !== slug)
    .slice(0, 3)

  return (
    <div className="min-h-screen bg-background">
      {/* Breadcrumb */}
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 pt-24 pb-4">
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
            onClick={() => onNavigate?.('blog')}
            className="hover:text-primary transition-colors"
          >
            Blog
          </button>
          <ChevronRight className="w-3.5 h-3.5" />
          <span className="text-foreground font-medium line-clamp-1">{post.title}</span>
        </nav>
      </div>

      {/* Article Header */}
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 pb-8">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
        >
          <Badge className="bg-primary/20 text-primary border-primary/30 mb-4">
            {post.category}
          </Badge>
          <h1 className="text-3xl md:text-5xl font-serif font-black text-foreground mb-4 leading-tight">
            {post.title}
          </h1>
          <div className="flex items-center gap-4 text-muted-foreground text-sm">
            <span>{post.date}</span>
            <span className="flex items-center gap-1">
              <Clock className="w-3.5 h-3.5" />
              {post.readTime}
            </span>
          </div>
        </motion.div>
      </div>

      {/* Article Image */}
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 pb-8">
        <motion.div
          className="aspect-[21/9] bg-gradient-to-br from-primary/10 to-accent/10 rounded-2xl flex items-center justify-center"
          initial={{ opacity: 0, scale: 0.98 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.6, delay: 0.1 }}
        >
          <BookOpen className="w-20 h-20 text-primary/20" />
        </motion.div>
      </div>

      {/* Article Content */}
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 pb-12">
        <motion.article
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.2 }}
        >
          <div className="prose prose-invert max-w-none">
            {post.content.map((paragraph, idx) => (
              <p key={idx} className="text-muted-foreground text-base leading-relaxed mb-6 last:mb-0">
                {paragraph}
              </p>
            ))}
          </div>
        </motion.article>
      </div>

      {/* Related Menu Items */}
      {relatedMenuItems.length > 0 && (
        <section className="py-12 bg-card/30">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <motion.h2
              className="text-2xl md:text-3xl font-serif font-bold text-foreground mb-8"
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5 }}
            >
              Try These Dishes
            </motion.h2>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
              {relatedMenuItems.map((item) => (
                item && (
                  <motion.div
                    key={item.id}
                    className="card-glow bg-card rounded-xl border border-border overflow-hidden cursor-pointer group"
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.4 }}
                    onClick={() => onNavigate?.('menu-item', item.id)}
                  >
                    <div className="relative aspect-square overflow-hidden">
                      <img
                        src={item.images[0] || '/images/product-classic-burger.png'}
                        alt={item.name}
                        className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
                      />
                      {item.tag && (
                        <Badge className="absolute top-3 left-3 bg-fire-gradient text-primary-foreground text-xs border-0">
                          {item.tag}
                        </Badge>
                      )}
                    </div>
                    <div className="p-4">
                      <div className="flex items-center gap-1 mb-1">
                        <Star className="w-3 h-3 fill-accent text-accent" />
                        <span className="text-xs font-medium">{item.rating}</span>
                      </div>
                      <h3 className="font-serif font-bold text-foreground text-sm mb-1 group-hover:text-primary transition-colors">
                        {item.name}
                      </h3>
                      <span className="text-fire-gradient font-bold text-sm">
                        {item.priceFormatted}
                      </span>
                    </div>
                  </motion.div>
                )
              ))}
            </div>
          </div>
        </section>
      )}

      {/* More Articles */}
      <section className="py-12">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.h2
            className="text-2xl md:text-3xl font-serif font-bold text-foreground mb-8"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
          >
            More Articles
          </motion.h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {morePosts.map((p) => (
              <motion.article
                key={p.slug}
                className="card-glow bg-card rounded-xl border border-border overflow-hidden cursor-pointer group"
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.4 }}
                onClick={() => {
                  onNavigate?.('blog-post', p.slug)
                  window.scrollTo({ top: 0, behavior: 'smooth' })
                }}
              >
                <div className="aspect-[16/9] bg-gradient-to-br from-primary/10 to-accent/10 relative overflow-hidden">
                  <div className="absolute inset-0 flex items-center justify-center">
                    <BookOpen className="w-10 h-10 text-primary/20" />
                  </div>
                  <Badge className="absolute top-3 left-3 bg-fire-gradient text-primary-foreground text-xs border-0">
                    {p.category}
                  </Badge>
                </div>
                <div className="p-4">
                  <h3 className="font-serif font-bold text-foreground text-sm mb-2 group-hover:text-primary transition-colors line-clamp-2">
                    {p.title}
                  </h3>
                  <div className="flex items-center gap-3 text-xs text-muted-foreground">
                    <span>{p.date}</span>
                    <span className="flex items-center gap-1">
                      <Clock className="w-3 h-3" />
                      {p.readTime}
                    </span>
                  </div>
                </div>
              </motion.article>
            ))}
          </div>
        </div>
      </section>
    </div>
  )
}
