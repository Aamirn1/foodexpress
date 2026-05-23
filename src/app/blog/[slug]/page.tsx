'use client'

import { use } from 'react'
import BlogPostPage from '@/components/pages/BlogPostPage'

export default function BlogPost({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = use(params)
  return <BlogPostPage slug={slug} />
}
