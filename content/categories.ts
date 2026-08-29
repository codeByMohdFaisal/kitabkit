import type { CategoryMeta } from "@/lib/types";

/**
 * Canonical list of catalog categories. This is the source of truth for
 * `/ebooks/category/[category]` — pages are generated for every entry here,
 * even ones with zero ebooks yet, so the catalog structure scales as new
 * titles are added without touching page code.
 *
 * To add a category: add an entry here. To assign an ebook to it: add the
 * slug to that ebook's `category` array in content/ebooks/*.
 */
export const categories: CategoryMeta[] = [
  {
    slug: "online-selling",
    label: "Getting Online",
    description:
      "Step-by-step guides for taking a local business online — from your first listing to your first sale.",
  },
  {
    slug: "digital-marketing",
    label: "WhatsApp & Instagram Marketing",
    description:
      "Practical playbooks for reaching and selling to customers on WhatsApp, Instagram, and social platforms.",
  },
  {
    slug: "marketplaces",
    label: "Marketplaces",
    description:
      "How to list, price, and sell on Meesho, Amazon, Flipkart, and other Indian marketplaces.",
  },
  {
    slug: "business-basics",
    label: "Small Business Basics",
    description:
      "Foundational operations, pricing, and planning guides for small business owners.",
  },
];
