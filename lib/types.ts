/**
 * Core content model. Every page in the app reads ebook data through this
 * type and the query functions in `lib/ebooks.ts` — never import from
 * `content/ebooks/*` directly in a page or component.
 */

// Known language codes get autocomplete; `string & {}` keeps the union open
// so a future edition (e.g. Tamil, Bengali) doesn't require a type change.
export type LanguageCode = "en" | "hi-latn" | (string & {});

export type FaqItem = {
  question: string;
  answer: string;
};

export type Testimonial = {
  name: string;
  role?: string;
  quote: string;
  rating?: 1 | 2 | 3 | 4 | 5;
};

export type PreviewImage = {
  src: string;
  alt: string;
};

export type Ebook = {
  /** URL segment, e.g. /ebooks/take-your-local-shop-online */
  slug: string;
  title: string;
  /** One-line pitch shown on cards and in meta descriptions. */
  tagline: string;
  /** Long-form body. Supports plain paragraphs (blank-line separated),
   *  **bold**, *italic*, and "- " bullet lists — see lib/markdown.tsx. */
  description: string;
  /** Path under /public, e.g. /covers/my-book.svg */
  coverImage: string;
  coverImageAlt: string;
  price: number;
  currency: "INR";
  language: LanguageCode;
  /** Ebooks that share a languageGroup are editions of the same title and
   *  link to each other via the language switcher on the detail page. */
  languageGroup: string;
  /** Category slugs — must match an entry in content/categories.ts */
  category: string[];
  tableOfContents: string[];
  targetAudience: string[];
  sampleFileUrl?: string;
  /** File handed to the buyer post-purchase, via lib/delivery. */
  fileUrl: string;
  publishedAt: string;
  featured?: boolean;
  faqs: FaqItem[];
  testimonials: Testimonial[];

  /** Which detail-page layout to render — see app/ebooks/[slug]/page.tsx.
   *  Defaults to "guide" (the original implementation-kit layout) when unset. */
  kind?: "guide" | "workbook";
  /** Shown under the title in the workbook hero. */
  subtitle?: string;
  /** e.g. "Ages 3–5" — shown as a badge in the workbook hero. */
  ageRange?: string;
  /** e.g. "Printable PDF · 36 pages · A4" — shown in the workbook hero. */
  format?: string;
  /** One-line parent/reader pain point, shown as a callout on the workbook page. */
  problemStatement?: string;
  /** "Why this instead of X" — short differentiation points on the workbook page. */
  whyPoints?: string[];
  /** Skills/topics covered, shown as a chip list on the workbook page. */
  skills?: string[];
  /** Sample page images for the workbook's tap-to-enlarge preview gallery. */
  previewImages?: PreviewImage[];
  /** Overrides the auto-generated <title>/description for this product's page. */
  seoTitle?: string;
  seoDescription?: string;
};

export type CategoryMeta = {
  slug: string;
  label: string;
  description: string;
};
