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
};

export type CategoryMeta = {
  slug: string;
  label: string;
  description: string;
};
