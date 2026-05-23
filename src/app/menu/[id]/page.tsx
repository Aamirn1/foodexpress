'use client'

import { use } from 'react'
import MenuItemPage from '@/components/pages/MenuItemPage'

export default function MenuItem({ params }: { params: Promise<{ id: string }> }) {
  const { id } = use(params)
  return <MenuItemPage id={id} />
}
