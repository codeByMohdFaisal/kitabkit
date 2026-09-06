import type { Metadata } from "next";
import { getAllCategories, getAllEbooks, getAllLanguages } from "@/lib/ebooks";
import { EbookFilterGrid } from "@/components/EbookFilterGrid";

export const revalidate = 3600;

export const metadata: Metadata = {
  title: "All Guides",
  description:
    "Browse the full catalog of practical implementation-kit ebooks and family activity workbooks, filterable by category and language.",
  alternates: { canonical: "/ebooks" },
};

export default function EbooksCatalogPage() {
  const ebooks = getAllEbooks();
  const categories = getAllCategories();
  const languages = getAllLanguages();

  return (
    <div className="mx-auto max-w-6xl px-4 py-12 sm:px-6">
      <header className="mb-8 max-w-2xl">
        <h1 className="font-display text-3xl font-bold text-forest-900 sm:text-4xl">
          All Guides
        </h1>
        <p className="mt-3 text-ink/70">
          Every implementation kit and activity workbook we&rsquo;ve published, in one
          place. Filter by category or language to find the right one for you.
        </p>
      </header>

      <EbookFilterGrid ebooks={ebooks} categories={categories} languages={languages} />
    </div>
  );
}
