"use client"

import Link from "next/link"
import { useEffect } from "react"
import { useCart } from "@/components/cart-context"

export default function CheckoutSuccessPage() {
  const { clear } = useCart()

  // Stripe redirects here only after a completed payment, so this is the point
  // where the local cart should be emptied.
  useEffect(() => {
    clear()
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  return (
    <div className="container mx-auto px-4 py-16 max-w-md text-center">
      <h1 className="text-2xl font-semibold mb-4">thank you!</h1>
      <p className="mb-2">your order is in. you&apos;ll get a receipt by email.</p>
      <p className="text-sm text-gray-600 mb-8">
        prints are packed and shipped by hand, so give it a few days.
      </p>
      <Link href="/shop/" className="underline">
        back to the shop
      </Link>
    </div>
  )
}
