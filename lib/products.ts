import productsData from "@/content/products.json"

export type StripeMode = "test" | "live"

export interface Product {
  slug: string
  /**
   * Stripe Price IDs, one per mode. Test and live are separate catalogs, so a
   * price created in one is invisible to the other and the IDs differ. Stripe
   * is the source of truth for the amount charged — `price` below is only what
   * the page displays.
   */
  priceIds: Record<StripeMode, string>
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

/** Which catalog a secret key addresses. Restricted keys use an rk_ prefix. */
export function stripeModeForKey(key: string): StripeMode {
  return key.startsWith("sk_test_") || key.startsWith("rk_test_") ? "test" : "live"
}

export function priceIdFor(product: Product, mode: StripeMode): string {
  return product.priceIds?.[mode] ?? ""
}

/** True when a product has no Price ID in any mode, so it is not sellable at all. */
export function isUnlisted(product: Product): boolean {
  return !product.priceIds?.test && !product.priceIds?.live
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
