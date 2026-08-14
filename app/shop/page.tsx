"use client"

import Image from "next/image"
import { Button } from "@/components/ui/button"
import { useCart } from "@/components/cart-context"
import { products } from "@/lib/products"

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
          const notListed = !product.priceId

          return (
            <div
              key={product.slug}
              className="border border-gray-300 rounded-lg p-4 flex flex-col h-full"
            >
              <div className="aspect-square relative mb-4 bg-gray-100 rounded">
                <Image
                  src={product.image}
                  alt={product.title}
                  fill
                  className="object-cover rounded"
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
