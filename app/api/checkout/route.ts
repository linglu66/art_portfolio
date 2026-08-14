import { NextRequest, NextResponse } from "next/server"
import Stripe from "stripe"
import { getProduct } from "@/lib/products"

interface IncomingLine {
  slug: unknown
  quantity: unknown
}

export async function POST(req: NextRequest) {
  const secretKey = process.env.STRIPE_SECRET_KEY
  if (!secretKey) {
    // Missing config is an operator problem, not a shopper problem — say so
    // clearly in the logs but don't leak details to the browser.
    console.error("STRIPE_SECRET_KEY is not set; cannot create a checkout session")
    return NextResponse.json({ error: "Checkout is unavailable right now" }, { status: 500 })
  }

  let body: { lines?: IncomingLine[] }
  try {
    body = await req.json()
  } catch {
    return NextResponse.json({ error: "Invalid request" }, { status: 400 })
  }

  const incoming = Array.isArray(body.lines) ? body.lines : []
  if (incoming.length === 0) {
    return NextResponse.json({ error: "Your cart is empty" }, { status: 400 })
  }

  const origin = req.headers.get("origin") ?? new URL(req.url).origin

  // Line items reference Stripe Price IDs, so Stripe itself decides the amount
  // charged. The client only ever sends a slug and a quantity — it cannot
  // influence price at all.
  const lineItems: Stripe.Checkout.SessionCreateParams.LineItem[] = []
  for (const line of incoming) {
    if (typeof line?.slug !== "string") {
      return NextResponse.json({ error: "Invalid request" }, { status: 400 })
    }
    const product = getProduct(line.slug)
    if (!product) {
      return NextResponse.json({ error: `${line.slug} is no longer available` }, { status: 400 })
    }

    const quantity = Number(line.quantity)
    if (!Number.isInteger(quantity) || quantity < 1) {
      return NextResponse.json({ error: `Invalid quantity for ${product.title}` }, { status: 400 })
    }
    if (quantity > product.inventory) {
      return NextResponse.json(
        { error: `Only ${product.inventory} left of ${product.title}` },
        { status: 400 },
      )
    }

    if (!product.priceId) {
      // A product without a Stripe Price ID cannot be sold. Fail loudly rather
      // than silently dropping it from an order the shopper thought they placed.
      console.error(`Product ${product.slug} has no Stripe priceId; refusing checkout`)
      return NextResponse.json(
        { error: `${product.title} isn't available for purchase yet` },
        { status: 409 },
      )
    }

    lineItems.push({ quantity, price: product.priceId })
  }

  const stripe = new Stripe(secretKey)

  try {
    const session = await stripe.checkout.sessions.create({
      mode: "payment",
      line_items: lineItems,
      success_url: `${origin}/shop/success/?session_id={CHECKOUT_SESSION_ID}`,
      cancel_url: `${origin}/shop/`,
      shipping_address_collection: { allowed_countries: ["US", "CA"] },
    })

    if (!session.url) throw new Error("Stripe returned a session with no URL")
    return NextResponse.json({ url: session.url })
  } catch (err) {
    console.error("Stripe checkout session failed:", err)
    return NextResponse.json({ error: "Could not start checkout" }, { status: 502 })
  }
}
