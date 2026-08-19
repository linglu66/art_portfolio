# CLAUDE.md — fishlooker.com (art portfolio)

Solo project. Ling (fishlooker) is an NYC-based illustrator / comic artist. You are
the only developer here. This file is your memory of how the project works — keep it
current when you learn something non-obvious.

## Stack & structure
- Next.js 15 (App Router) + TypeScript + Tailwind. Content-driven from files under `content/`.
- Key routes:
  - `/` (home) and `/markets` both render **`components/markets-page.tsx`** (shared component —
    edit that one file to change either page). Home used to be the `portfolio.yaml` masonry grid;
    that old grid now lives only in git history.
  - `/shop` — storefront driven by `content/products.json` (see Stripe below).
  - Other content routes: `/comics`, `/drawings`, `/creative-tech`, `/projects`, `/about`.
- Content files:
  - `content/portfolio.yaml` — pieces for the (former) home grid / `/piece/[id]` pages.
  - `content/products.json` — shop products.
  - `content/projects.yaml` — creative-tech projects.
- Page metadata (title, Open Graph) lives in **`app/layout.tsx`**, not per-page.

## Deploy — just push
- **`git push` to the `vercel-deploy` branch triggers the deploy** via Vercel's GitHub
  integration. No CLI step. Vercel builds on its own servers.
- Remote: `git@github.com:linglu66/art_portfolio.git`. `main` is the GitHub default.
  Confirm with Ling whether `vercel-deploy` or `main` is Vercel's *production* branch before
  assuming a push goes live (it may only produce a preview URL).
- The `npm run deploy` script (`gh-pages -d out`) is a legacy GitHub Pages path — not the
  current deploy flow.
- Commit message co-author line to end commits with:
  `Co-Authored-By: Claude Opus 4.8 (1M context) <noreply@anthropic.com>`

## Do NOT run `next build` locally
- Ling keeps a dev server running, which locks `.next` on Windows. `npx next build` fails with
  `EPERM: operation not permitted, open '...\.next\trace'`. This is a file lock, not a code bug.
- `npx tsc --noEmit` reports pre-existing errors for `@/content/*.yaml` imports and `js-yaml`
  (handled by Next's webpack loader at build time). Ignore those; they're not real.
- To verify a change, trust the Vercel build (watch it / `/vercel:logs`) rather than building locally.

## Images — watch case & filenames (IMPORTANT)
- Images live in `public/images/` (and `public/images/product_photos/`, `.../markets/`,
  `.../workshops/`). Referenced as `/images/...`.
- Ling frequently drops new image files with **capitalized, spaced, or typo'd names**
  (e.g. `Double blossom_lightbg.png`, `Talisman Combo——2A.png`, `Angel.png`, `duckstack (2).png`).
- **Vercel's Linux filesystem is case-sensitive** — always rename new assets to clean
  lowercase `snake_case` (e.g. `talisman_combo_2a.png`) and reference them exactly, or images
  break in production even though they work on local Windows.
- When Ling says "use the new X image, drop the old one," the new file usually has a variant
  name; find it (`ls | grep -i x`), replace the old reference, and delete the stale file.
- Check aspect ratios of new images with Python PIL to set `aspectRatio` correctly:
  `python3 -c "from PIL import Image; print(Image.open('f.png').size)"`.

## Markets/home gallery (`components/markets-page.tsx`)
- Gallery is an `artSections` array; each section has `{ title, cols, images[] }`.
  `cols` is a literal Tailwind class (`"columns-3"` / `"columns-4"`) — must be a literal string
  so Tailwind emits it; don't build the class name dynamically.
- Layout: slim sticky text sidebar on the left (`md:sticky md:top-8 md:self-start`), big masonry
  gallery on the right (`grid md:grid-cols-[1fr_6fr]`, container `max-w-[2000px]`).
- Section headings use a dotted bottom rule.

## Shop & Stripe
- Products: `content/products.json`, typed by `lib/products.ts`. Each product needs
  `priceIds: { test, live }` = Stripe **Price** IDs. Checkout (`app/api/checkout/route.ts`)
  picks the ID matching the secret key's mode; the client only sends slug + quantity, so Stripe
  is the source of truth for the amount. The `price` string in JSON is display-only.
- A product with **both priceIds empty shows "coming soon"** (`isUnlisted`) and can't be bought.
- `STRIPE_SECRET_KEY` is **only in Vercel's env** — there is no local `.env` and no Stripe CLI
  installed. You therefore **cannot create Stripe products/prices from this environment**.
  To add a sellable product you need the live Price ID, which requires either:
    1. Ling creating the product+price in the Stripe dashboard and giving you the `price_...` ID, or
    2. Running a script with `STRIPE_SECRET_KEY` set in Ling's own shell (see `scripts/` if present).
  Never ask Ling to paste a live secret key into the chat.
- `stripe` npm package (^20) is installed. Shipping is a flat `SHIPPING_CENTS` (currently $7),
  waived by codes in `FREE_SHIPPING_CODES` (`FREESHIP`, `MARKET`).

## Working style with Ling
- Fast, iterative visual tweaks — expect many small follow-ups (sizing, ordering, labels).
- Ling moves quickly and interrupts; keep changes small and committed in logical batches.
- She uses relative language ("bigger", "mix it up", "move it up") — make a confident concrete
  choice and note what you did rather than over-asking.
