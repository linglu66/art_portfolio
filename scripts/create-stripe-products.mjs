// Create Stripe products + prices for any shop item that is missing a LIVE
// Price ID, then write the resulting price_... IDs back into
// content/products.json. Run this from your own shell where the Stripe key is
// available — the key is never stored in the repo.
//
//   STRIPE_SECRET_KEY=sk_live_...  node scripts/create-stripe-products.mjs
//
// Notes:
// - Idempotent: products that already have priceIds.live are skipped, so
//   re-running won't create duplicates for existing items.
// - The amount charged comes from `price` in products.json (e.g. "$20.00").
// - Uses the key's mode: an sk_test_/rk_test_ key fills priceIds.test instead
//   of priceIds.live, so you can build a test catalog the same way.

import { readFileSync, writeFileSync } from "node:fs"
import { fileURLToPath } from "node:url"
import { dirname, join } from "node:path"
import Stripe from "stripe"

const key = process.env.STRIPE_SECRET_KEY
if (!key) {
  console.error("STRIPE_SECRET_KEY is not set. Run e.g.:\n  STRIPE_SECRET_KEY=sk_live_... node scripts/create-stripe-products.mjs")
  process.exit(1)
}
const mode = key.startsWith("sk_test_") || key.startsWith("rk_test_") ? "test" : "live"
const stripe = new Stripe(key)

const root = join(dirname(fileURLToPath(import.meta.url)), "..")
const productsPath = join(root, "content", "products.json")
const products = JSON.parse(readFileSync(productsPath, "utf8"))

function priceToCents(price) {
  const m = /^\$(\d+)\.(\d{2})$/.exec(String(price).trim())
  if (!m) throw new Error(`Unparseable price ${JSON.stringify(price)} — expected "$20.00"`)
  return Number(m[1]) * 100 + Number(m[2])
}

let changed = false
for (const p of products) {
  if (p.priceIds?.[mode]) {
    console.log(`skip  ${p.slug} — already has a ${mode} price (${p.priceIds[mode]})`)
    continue
  }
  const unitAmount = priceToCents(p.price)
  const product = await stripe.products.create({
    name: p.title,
    description: p.description,
  })
  const price = await stripe.prices.create({
    product: product.id,
    currency: "usd",
    unit_amount: unitAmount,
  })
  p.priceIds = { ...(p.priceIds ?? { test: "", live: "" }), [mode]: price.id }
  changed = true
  console.log(`create ${p.slug} — ${product.id} / ${price.id} (${p.price})`)
}

if (changed) {
  writeFileSync(productsPath, JSON.stringify(products, null, 2) + "\n")
  console.log(`\nWrote ${mode} price IDs into content/products.json. Review, commit, and push.`)
} else {
  console.log("\nNothing to do — every product already has a price ID for this mode.")
}
