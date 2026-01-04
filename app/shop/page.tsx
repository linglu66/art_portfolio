"use client"

import Image from "next/image"
import { Button } from "@/components/ui/button"
import products from "@/content/products.json"

const base = process.env.NODE_ENV === 'production' ? '/art_portfolio' : '';

interface Product {
  slug: string;
  title: string;
  paymentLink: string;
  price: string;
  inventory: number;
  image: string;
  description: string;
}

export default function ShopPage() {
  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-3xl font-bold text-center mb-8">Shop</h1>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 max-w-6xl mx-auto">
        {products.map((product: Product) => (
          <div key={product.slug} className="border border-gray-300 rounded-lg p-4 flex flex-col h-full">
            <div className="aspect-square relative mb-4 bg-gray-100 rounded">
              <Image
                src={`${base}${product.image}`}
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

                {product.inventory > 0 ? (
                  <Button
                    className="w-full"
                    onClick={() => {
                      // Redirect directly to Stripe Payment Link
                      window.location.href = product.paymentLink;
                    }}
                  >
                    Buy Now
                  </Button>
                ) : (
                  <Button className="w-full" disabled>
                    Sold Out
                  </Button>
                )}

              </div>
            </div>
          </div>
        ))}
      </div>

      <div className="mt-12 max-w-2xl mx-auto text-center text-sm text-gray-600">
        <h3 className="font-semibold mb-2">Shipping & Returns</h3>
        <p className="mb-2">Ships in 3–5 business days, all sales are final</p>
      </div>
    </div>
  )
}
