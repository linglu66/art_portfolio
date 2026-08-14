"use client"

import Image from "next/image"
import { useState } from "react"
import { ShoppingBag, X } from "lucide-react"
import { formatCents, useCart } from "@/components/cart-context"
import { getProduct, isFreeShippingCode, SHIPPING_CENTS } from "@/lib/products"

export default function CartDrawer() {
  const { lines, setQuantity, remove, count, subtotalCents, isOpen, setOpen } = useCart()
  const [checkingOut, setCheckingOut] = useState(false)
  const [error, setError] = useState<string | null>(null)
  const [promoCode, setPromoCode] = useState("")

  // Display only — the server re-checks the code and decides what is charged.
  const freeShipping = isFreeShippingCode(promoCode)
  const shippingCents = freeShipping ? 0 : SHIPPING_CENTS
  const hasItems = lines.length > 0

  async function checkout() {
    setCheckingOut(true)
    setError(null)
    try {
      // Trailing slash matters: next.config sets trailingSlash, so posting to
      // "/api/checkout" would 308-redirect before reaching the handler.
      const res = await fetch("/api/checkout/", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ lines, promoCode }),
      })
      const data = await res.json()
      if (!res.ok) throw new Error(data.error || "Checkout failed")
      window.location.href = data.url
    } catch (e) {
      setError(e instanceof Error ? e.message : "Something went wrong")
      setCheckingOut(false)
    }
  }

  return (
    <>
      <button
        onClick={() => setOpen(true)}
        aria-label={`Open cart, ${count} item${count === 1 ? "" : "s"}`}
        className="fixed bottom-20 right-4 md:bottom-6 md:right-6 z-30 flex items-center gap-2 border border-gray-800 bg-white rounded-full px-4 py-2 hover:shadow-md transition-shadow"
      >
        <ShoppingBag size={18} />
        <span className="text-sm">{count}</span>
      </button>

      {isOpen && (
        <div className="fixed inset-0 z-40 flex justify-end">
          <div
            className="absolute inset-0 bg-black/30"
            onClick={() => setOpen(false)}
            aria-hidden="true"
          />
          <aside className="relative w-full max-w-sm bg-white h-full flex flex-col border-l border-gray-200">
            <div className="flex items-center justify-between p-4 border-b border-gray-200">
              <h2 className="font-semibold">cart</h2>
              <button onClick={() => setOpen(false)} aria-label="Close cart">
                <X size={18} />
              </button>
            </div>

            <div className="flex-1 overflow-y-auto p-4 flex flex-col gap-4">
              {lines.length === 0 && <p className="text-sm text-gray-600">your cart is empty</p>}

              {lines.map((line) => {
                const product = getProduct(line.slug)
                if (!product) return null
                return (
                  <div key={line.slug} className="flex gap-3">
                    <div className="relative w-16 h-16 shrink-0 bg-gray-50 rounded">
                      <Image
                        src={product.image}
                        alt={product.title}
                        fill
                        sizes="64px"
                        className="object-cover rounded"
                      />
                    </div>
                    <div className="flex-1 min-w-0">
                      <p className="text-sm truncate">{product.title}</p>
                      <p className="text-sm text-gray-600">{product.price}</p>
                      <div className="flex items-center gap-2 mt-1">
                        <button
                          className="border border-gray-300 rounded w-6 h-6 leading-none"
                          onClick={() => setQuantity(line.slug, line.quantity - 1)}
                          aria-label={`Decrease ${product.title}`}
                        >
                          −
                        </button>
                        <span className="text-sm w-4 text-center">{line.quantity}</span>
                        <button
                          className="border border-gray-300 rounded w-6 h-6 leading-none disabled:opacity-40"
                          onClick={() => setQuantity(line.slug, line.quantity + 1)}
                          disabled={line.quantity >= product.inventory}
                          aria-label={`Increase ${product.title}`}
                        >
                          +
                        </button>
                        <button
                          className="text-xs underline ml-auto"
                          onClick={() => remove(line.slug)}
                        >
                          remove
                        </button>
                      </div>
                    </div>
                  </div>
                )
              })}
            </div>

            <div className="border-t border-gray-200 p-4">
              <div className="flex gap-2 mb-3">
                <input
                  value={promoCode}
                  onChange={(e) => setPromoCode(e.target.value)}
                  placeholder="promo code"
                  aria-label="Promo code"
                  className="flex-1 min-w-0 border border-gray-300 rounded px-2 py-1 text-sm uppercase placeholder:normal-case placeholder:text-gray-400"
                />
                {promoCode.trim() !== "" && (
                  <span
                    className={`text-xs self-center ${freeShipping ? "text-green-700" : "text-gray-500"}`}
                  >
                    {freeShipping ? "applied" : "not valid"}
                  </span>
                )}
              </div>

              <div className="flex justify-between text-sm text-gray-600">
                <span>subtotal</span>
                <span>{formatCents(subtotalCents)}</span>
              </div>
              <div className="flex justify-between text-sm text-gray-600 mb-2">
                <span>shipping</span>
                <span>
                  {!hasItems ? (
                    "—"
                  ) : freeShipping ? (
                    <>
                      <s className="text-gray-400 mr-1">{formatCents(SHIPPING_CENTS)}</s>free
                    </>
                  ) : (
                    formatCents(SHIPPING_CENTS)
                  )}
                </span>
              </div>
              <div className="flex justify-between mb-3 font-semibold">
                <span>total</span>
                <span>{formatCents(subtotalCents + (hasItems ? shippingCents : 0))}</span>
              </div>
              {error && <p className="text-sm text-red-600 mb-2">{error}</p>}
              <button
                onClick={checkout}
                disabled={lines.length === 0 || checkingOut}
                className="w-full border border-gray-800 rounded py-2 disabled:opacity-40 hover:bg-gray-50"
              >
                {checkingOut ? "redirecting…" : "checkout"}
              </button>
              <p className="text-xs text-gray-500 mt-2 text-center">
                flat $7 shipping · US only
              </p>
            </div>
          </aside>
        </div>
      )}
    </>
  )
}
