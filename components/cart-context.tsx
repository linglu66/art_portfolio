"use client"

import { createContext, useContext, useEffect, useState } from "react"
import { getProduct, priceToCents, type Product } from "@/lib/products"

export interface CartLine {
  slug: string
  quantity: number
}

interface CartValue {
  lines: CartLine[]
  add: (slug: string) => void
  setQuantity: (slug: string, quantity: number) => void
  remove: (slug: string) => void
  clear: () => void
  count: number
  subtotalCents: number
  isOpen: boolean
  setOpen: (open: boolean) => void
}

const CartContext = createContext<CartValue | null>(null)

const STORAGE_KEY = "fishlooker-cart"

export function CartProvider({ children }: { children: React.ReactNode }) {
  const [lines, setLines] = useState<CartLine[]>([])
  const [isOpen, setOpen] = useState(false)
  const [hydrated, setHydrated] = useState(false)

  // Read localStorage after mount, never during render — the server has no
  // localStorage and a mismatch would be a hydration error.
  useEffect(() => {
    try {
      const raw = window.localStorage.getItem(STORAGE_KEY)
      if (raw) {
        const parsed = JSON.parse(raw)
        if (Array.isArray(parsed)) {
          // Drop anything that no longer exists in products.json, otherwise a
          // removed product would sit in the cart forever and fail checkout.
          setLines(parsed.filter((l: CartLine) => getProduct(l.slug)))
        }
      }
    } catch {}
    setHydrated(true)
  }, [])

  useEffect(() => {
    if (!hydrated) return
    try {
      window.localStorage.setItem(STORAGE_KEY, JSON.stringify(lines))
    } catch {}
  }, [lines, hydrated])

  const clampToStock = (product: Product, quantity: number) =>
    Math.max(0, Math.min(quantity, product.inventory))

  const add = (slug: string) => {
    const product = getProduct(slug)
    if (!product) return
    setLines((prev) => {
      const existing = prev.find((l) => l.slug === slug)
      if (!existing) return [...prev, { slug, quantity: 1 }]
      return prev.map((l) =>
        l.slug === slug ? { ...l, quantity: clampToStock(product, l.quantity + 1) } : l,
      )
    })
    setOpen(true)
  }

  const setQuantity = (slug: string, quantity: number) => {
    const product = getProduct(slug)
    if (!product) return
    const next = clampToStock(product, quantity)
    setLines((prev) =>
      next === 0
        ? prev.filter((l) => l.slug !== slug)
        : prev.map((l) => (l.slug === slug ? { ...l, quantity: next } : l)),
    )
  }

  const remove = (slug: string) => setLines((prev) => prev.filter((l) => l.slug !== slug))
  const clear = () => setLines([])

  const count = lines.reduce((sum, l) => sum + l.quantity, 0)
  const subtotalCents = lines.reduce((sum, l) => {
    const product = getProduct(l.slug)
    return product ? sum + priceToCents(product.price) * l.quantity : sum
  }, 0)

  return (
    <CartContext.Provider
      value={{ lines, add, setQuantity, remove, clear, count, subtotalCents, isOpen, setOpen }}
    >
      {children}
    </CartContext.Provider>
  )
}

export function useCart() {
  const ctx = useContext(CartContext)
  if (!ctx) throw new Error("useCart must be used inside a CartProvider")
  return ctx
}

export function formatCents(cents: number) {
  return `$${(cents / 100).toFixed(2)}`
}
