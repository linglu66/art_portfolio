import { NextRequest, NextResponse } from "next/server"
import Stripe from "stripe"

/**
 * Order notifications. Stripe's own "payment succeeded" mail says only that
 * money arrived — it carries neither the line items nor the shipping address,
 * which are the two things needed to actually pack an order. This turns a
 * checkout.session.completed event into a packing slip in the inbox.
 */

// The signature is computed over the exact bytes Stripe sent, so the body must
// be read as raw text. Parsing it as JSON first would invalidate the check.
export const runtime = "nodejs"

function formatCents(cents: number | null | undefined) {
  return `$${((cents ?? 0) / 100).toFixed(2)}`
}

export async function POST(req: NextRequest) {
  const secretKey = process.env.STRIPE_SECRET_KEY
  const webhookSecret = process.env.STRIPE_WEBHOOK_SECRET
  if (!secretKey || !webhookSecret) {
    console.error("Stripe keys missing; cannot process webhook")
    return NextResponse.json({ error: "Not configured" }, { status: 500 })
  }

  const stripe = new Stripe(secretKey)
  const body = await req.text()
  const signature = req.headers.get("stripe-signature")
  if (!signature) return NextResponse.json({ error: "No signature" }, { status: 400 })

  let event: Stripe.Event
  try {
    event = stripe.webhooks.constructEvent(body, signature, webhookSecret)
  } catch (err) {
    // An invalid signature means the request did not come from Stripe.
    console.error("Webhook signature verification failed:", err)
    return NextResponse.json({ error: "Invalid signature" }, { status: 400 })
  }

  if (event.type !== "checkout.session.completed") {
    return NextResponse.json({ received: true })
  }

  const session = event.data.object as Stripe.Checkout.Session

  try {
    // line_items are not included in the event payload; fetch them separately.
    const lineItems = await stripe.checkout.sessions.listLineItems(session.id, { limit: 100 })
    const rows = lineItems.data
      .map((li) => `  ${li.quantity} × ${li.description} — ${formatCents(li.amount_total)}`)
      .join("\n")

    const shipping = session.collected_information?.shipping_details ?? null
    const addr = shipping?.address
    const addressBlock = addr
      ? [
          shipping?.name,
          addr.line1,
          addr.line2,
          [addr.city, addr.state, addr.postal_code].filter(Boolean).join(" "),
          addr.country,
        ]
          .filter(Boolean)
          .join("\n")
      : "(no shipping address collected)"

    const shippingCost = session.total_details?.amount_shipping ?? 0
    const pickup = session.metadata?.fulfillment === "pickup"
    const text = [
      `New order — ${formatCents(session.amount_total)}`,
      pickup ? "*** LOCAL PICKUP — do not post ***" : "To be shipped",
      "",
      "Items",
      rows || "  (none)",
      "",
      `Subtotal   ${formatCents(session.amount_subtotal)}`,
      pickup
        ? "Shipping   —  (pickup)"
        : `Shipping   ${formatCents(shippingCost)}${shippingCost === 0 ? "  (free shipping code used)" : ""}`,
      `Total      ${formatCents(session.amount_total)}`,
      "",
      pickup ? "Pickup — no address collected" : "Ship to",
      pickup ? "" : addressBlock,
      "",
      `Customer   ${session.customer_details?.email ?? "unknown"}`,
      `Session    ${session.id}`,
    ].join("\n")

    const apiKey = process.env.RESEND_API_KEY
    const to = process.env.ORDER_EMAIL_TO
    if (!apiKey || !to) {
      // Still ack the event — retrying will not fix missing configuration.
      console.error("RESEND_API_KEY or ORDER_EMAIL_TO not set; order not emailed\n" + text)
      return NextResponse.json({ received: true, emailed: false })
    }

    const res = await fetch("https://api.resend.com/emails", {
      method: "POST",
      headers: { Authorization: `Bearer ${apiKey}`, "Content-Type": "application/json" },
      body: JSON.stringify({
        from: process.env.ORDER_EMAIL_FROM || "onboarding@resend.dev",
        to: [to],
        subject: `New order — ${formatCents(session.amount_total)}`,
        text,
      }),
    })

    if (!res.ok) {
      console.error("Resend rejected the order email:", res.status, await res.text())
      return NextResponse.json({ received: true, emailed: false })
    }

    return NextResponse.json({ received: true, emailed: true })
  } catch (err) {
    // Returning 500 makes Stripe retry, which is what we want for a transient
    // failure — the order itself has already been paid for either way.
    console.error("Failed to handle checkout.session.completed:", err)
    return NextResponse.json({ error: "Handler failed" }, { status: 500 })
  }
}
