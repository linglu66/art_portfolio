"use client"

import Image from "next/image"
import { Button } from "@/components/ui/button"
import { useCart } from "@/components/cart-context"
import { isUnlisted, products } from "@/lib/products"

export default function ShopPage() {
  const { add, lines } = useCart()

  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-3xl font-bold text-center mb-8">Shop</h1>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 max-w-6xl mx-auto">
        {products.map((product) => {
          const inCart = lines.find((l) => l.slug === product.slug)?.quantity ?? 0
          const soldOut = product.inventory === 0
          const maxedOut = inCart >= product.inventory
          // No Stripe Price ID means checkout would reject it, so don't let it
          // into the cart in the first place.
          const notListed = isUnlisted(product)

          return (
            <div
              key={product.slug}
              className="border border-gray-300 rounded-lg p-4 flex flex-col h-full"
            >
              {/* Taller than wide, and object-contain rather than cover: the
                  prints range from 5x15 to 11x17 to square, so any fixed crop
                  cuts someone's artwork off. */}
              <div className="aspect-[3/4] relative mb-4 bg-gray-50 rounded">
                <Image
                  src={product.image}
                  alt={product.title}
                  fill
                  sizes="(min-width: 1024px) 33vw, (min-width: 768px) 50vw, 100vw"
                  className="object-contain rounded"
                />
              </div>

              <div className="flex flex-col flex-grow">
                <h3 className="font-semibold text-lg mb-2">{product.title}</h3>
                <p className="text-gray-600 text-sm mb-4 flex-grow">{product.description}</p>

                <div className="mt-auto">
                  <p className="text-xl font-bold mb-4">{product.price}</p>

                  {notListed ? (
                    <Button className="w-full" disabled>
                      coming soon
                    </Button>
                  ) : soldOut ? (
                    <Button className="w-full" disabled>
                      sold out
                    </Button>
                  ) : (
                    <Button
                      className="w-full"
                      disabled={maxedOut}
                      onClick={() => add(product.slug)}
                    >
                      {maxedOut ? "all in cart" : "add to cart"}
                    </Button>
                  )}

                  {inCart > 0 && (
                    <p className="text-xs text-gray-500 mt-2 text-center">{inCart} in cart</p>
                  )}
                </div>
              </div>
            </div>
          )
        })}
      </div>
    </div>
  )
}
