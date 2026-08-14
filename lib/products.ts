import productsData from "@/content/products.json"

export interface Product {
  slug: string
  /**
   * Stripe Price ID (price_...). Stripe is the source of truth for what a
   * customer is actually charged — `price` below is only what the page shows.
   * Keep the two in sync; if they ever disagree, Stripe wins at checkout.
   */
  priceId: string
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
 * Parses the display price into cents for the cart subtotal. Strict on
 * purpose — a malformed price should fail loudly rather than quietly show a
 * wrong total.
 */
export function priceToCents(price: string): number {
  const match = /^\$(\d+)\.(\d{2})$/.exec(price.trim())
  if (!match) {
    throw new Error(`Unparseable price ${JSON.stringify(price)} — expected a form like "$25.00"`)
  }
  return Number(match[1]) * 100 + Number(match[2])
}

/** Products that cannot be sold yet because they have no Stripe Price ID. */
export function productsMissingPriceId(): Product[] {
  return products.filter((p) => !p.priceId)
}
