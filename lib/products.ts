import productsData from "@/content/products.json"

export interface Product {
  slug: string
  title: string
  price: string
  inventory: number
  image: string
  description: string
}

export const products = productsData as Product[]

export function getProduct(slug: string): Product | undefined {
  return products.find((p) => p.slug === slug)
}

/**
 * Prices live in products.json as display strings ("$25.00") so there is a
 * single source of truth to edit. Stripe needs integer cents, so parse
 * strictly — a malformed price should fail loudly at checkout rather than
 * silently charge the wrong amount.
 */
export function priceToCents(price: string): number {
  const match = /^\$(\d+)\.(\d{2})$/.exec(price.trim())
  if (!match) {
    throw new Error(`Unparseable price ${JSON.stringify(price)} — expected a form like "$25.00"`)
  }
  return Number(match[1]) * 100 + Number(match[2])
}
