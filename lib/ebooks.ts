import { allEbooks } from "@/content/ebooks";
import { categories } from "@/content/categories";
import type { CategoryMeta, Ebook } from "./types";

/**
 * All ebook/category reads in the app go through this module. Today it's an
 * in-memory read over `content/ebooks`; if content ever moves to a headless
 * CMS, only the bodies of these functions change — every page keeps working.
 */

export function getAllEbooks(): Ebook[] {
  return [...allEbooks].sort(
    (a, b) => new Date(b.publishedAt).getTime() - new Date(a.publishedAt).getTime()
  );
}

export function getFeaturedEbooks(): Ebook[] {
  return getAllEbooks().filter((e) => e.featured);
}

export function getEbookBySlug(slug: string): Ebook | undefined {
  return allEbooks.find((e) => e.slug === slug);
}

export function getEbooksByCategory(categorySlug: string): Ebook[] {
  return getAllEbooks().filter((e) => e.category.includes(categorySlug));
}

/** Other language editions of the same title, excluding the given slug. */
export function getLanguageSiblings(ebook: Ebook): Ebook[] {
  return allEbooks.filter(
    (e) => e.languageGroup === ebook.languageGroup && e.slug !== ebook.slug
  );
}

export function getAllCategories(): CategoryMeta[] {
  return categories;
}

export function getCategoryBySlug(slug: string): CategoryMeta | undefined {
  return categories.find((c) => c.slug === slug);
}

export function getCategoryCounts(): Record<string, number> {
  const counts: Record<string, number> = {};
  for (const category of categories) counts[category.slug] = 0;
  for (const ebook of allEbooks) {
    for (const slug of ebook.category) {
      counts[slug] = (counts[slug] ?? 0) + 1;
    }
  }
  return counts;
}

export function getAllLanguages(): { code: string; count: number }[] {
  const counts = new Map<string, number>();
  for (const ebook of allEbooks) {
    counts.set(ebook.language, (counts.get(ebook.language) ?? 0) + 1);
  }
  return Array.from(counts.entries()).map(([code, count]) => ({ code, count }));
}
