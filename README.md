# Kitaab Kit

A general-purpose multi-ebook catalog and sales site for practical,
implementation-kit ebooks aimed at Indian readers. Built with Next.js (App
Router), TypeScript, and Tailwind CSS. Currently seeded with one title
(about taking a local shop online), published in two language editions —
but every page is data-driven and topic-agnostic, so the catalog scales to
dozens of titles across any category without touching layout or page code.

## Getting started

```bash
npm install
cp .env.example .env.local   # fill in values as needed, defaults work for local dev
npm run dev
```

Open [http://localhost:3000](http://localhost:3000).

## Project structure

```
app/                      Routes (App Router). Pages read data via lib/ebooks.ts — never import content/ directly.
  page.tsx                 Homepage
  ebooks/page.tsx           Catalog with category/language filters
  ebooks/[slug]/             Ebook detail page + dynamic OG image
  ebooks/category/[category]/  Category pages (generated from content/categories.ts)
  about/, contact/          Static pages
  checkout/[slug]/          Checkout UI
  api/checkout/route.ts     Stubbed order + delivery endpoint
  sitemap.ts, robots.ts     Generated from the ebook/category data

content/
  ebooks/                   One file per ebook (the content layer)
  ebooks/index.ts            Registry — every ebook is imported and listed here
  categories.ts              Canonical category list

lib/
  types.ts                  The Ebook / CategoryMeta types every page reads
  ebooks.ts                  Query functions (getAllEbooks, getEbooksByCategory, ...)
  markdown.tsx               Tiny renderer for description bodies
  site.ts                    Site-wide config (name, URL, WhatsApp number, price formatting)
  payments/                  Payment provider interface + Razorpay integration point (stubbed)
  delivery/                  Post-purchase file delivery (stubbed)

components/                 Shared UI (EbookCard, filters, checkout form, ...)
public/covers/               Placeholder SVG covers — swap for real artwork per ebook
public/samples/               Placeholder sample previews
public/downloads/             Placeholder deliverable files
```

## Adding a new ebook

1. Create `content/ebooks/your-slug.ts`, modeled on
   `content/ebooks/take-your-local-shop-online.ts`, and fill in the `Ebook`
   fields (see `lib/types.ts` for the full shape).
2. Add a cover image at `public/covers/your-slug.svg` (or `.png`/`.jpg` —
   just update `coverImage` accordingly) and a sample/preview file if you
   have one.
3. Register it in `content/ebooks/index.ts`:
   ```ts
   import { yourSlug } from "./your-slug";

   export const allEbooks: Ebook[] = [
     takeYourLocalShopOnline,
     apniDukaanOnlineLeJaayein,
     yourSlug,
   ];
   ```
4. If it belongs to a category that doesn't exist yet, add it to
   `content/categories.ts` first.
5. If it's another language edition of an existing title, give it the same
   `languageGroup` as the sibling ebook — the detail page will link them
   automatically.

That's it — the catalog, category pages, sitemap, and filters all pick it up
automatically. No page or component needs to change.

## Payments & delivery

Both are deliberately stubbed so the full buy flow works end-to-end today,
with a single, clearly marked place to plug in real providers:

- **`lib/payments/razorpay.ts`** — creates a simulated order today. Swap in a
  real `razorpay.orders.create(...)` call once `RAZORPAY_KEY_ID` /
  `RAZORPAY_KEY_SECRET` are set (see `.env.example`), and verify payment
  signatures server-side before delivering.
- **`lib/delivery/index.ts`** — returns the ebook's static `fileUrl` and logs
  instead of emailing. Swap in a signed/expiring download URL and a real
  transactional email send here.
- **`app/api/checkout/route.ts`** — the single call site that wires the two
  together; update it if the real payment flow needs a webhook-based
  confirmation step instead of delivering immediately.

## SEO

- Every page uses the Metadata API (`generateMetadata` on dynamic routes) —
  no shared/duplicated titles or descriptions.
- `app/sitemap.ts` and `app/robots.ts` are generated from the ebook and
  category data — new ebooks appear in the sitemap automatically.
- Ebook detail pages emit `schema.org/Product` JSON-LD and a per-ebook
  OpenGraph image generated with `next/og` (`app/ebooks/[slug]/opengraph-image.tsx`).
- All routes with static content use `generateStaticParams` for full static
  generation, with `revalidate` set so new content can appear without a full
  redeploy if the data source ever moves to a CMS/API.

## Before launch

- Replace the placeholder SVG covers in `public/covers/` with real artwork.
- Replace the `.txt` files in `public/samples/` and `public/downloads/` with
  real sample and full PDFs, and update `sampleFileUrl` / `fileUrl` in the
  ebook data files if the paths change.
- Set `NEXT_PUBLIC_SITE_URL` to the production domain (used for canonical
  URLs, sitemap, and OG image URLs).
- Wire up Razorpay and real email delivery as described above.
- Run a Lighthouse audit (Performance / SEO / Accessibility / Best Practices)
  on the homepage and an ebook detail page before going live.

## Deployment

Built for Vercel — connect the repo, set the environment variables from
`.env.example`, and deploy. No other configuration is required.
