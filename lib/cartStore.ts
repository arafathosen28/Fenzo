'use client'
import { create } from 'zustand'
import { CartItem } from './types'

type State = {
  items: CartItem[]
  addItem: (item: CartItem) => void
  removeItem: (index: number) => void
  clear: () => void
  total: () => number
}

export const useCartStore = create<State>((set, get) => ({
  items: [],
  addItem: (item) => set({ items: [...get().items, item] }),
  removeItem: (index) => set({ items: get().items.filter((_, i) => i !== index) }),
  clear: () => set({ items: [] }),
  total: () => get().items.reduce((sum, it) => sum + (it.product.offerPrice ?? it.product.price) * it.qty, 0)
}))
