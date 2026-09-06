import type { Metadata } from "next";
import { getAllCategories, getAllEbooks, getAllLanguages } from "@/lib/ebooks";
import { EbookFilterGrid } from "@/components/EbookFilterGrid";
import { EbookCard } from "@/components/EbookCard";

export const revalidate = 3600;

export const metadata: Metadata = {
  title: "All Guides",
  description:
    "Browse the full catalog of practical implementation-kit ebooks and family activity workbooks, filterable by category and language.",
  alternates: { canonical: "/ebooks" },
};

const FAMILY_LEARNING_CATEGORY = "family-learning";

export default function EbooksCatalogPage() {
  const ebooks = getAllEbooks();
  const categories = getAllCategories();
  const languages = getAllLanguages();

  const businessCategories = categories.filter((c) => c.slug !== FAMILY_LEARNING_CATEGORY);
  const businessEbooks = ebooks.filter((e) => !e.category.includes(FAMILY_LEARNING_CATEGORY));
  const familyEbooks = ebooks.filter((e) => e.category.includes(FAMILY_LEARNING_CATEGORY));

  return (
    <div className="mx-auto max-w-6xl px-4 py-12 sm:px-6">
      <header className="mb-8 max-w-2xl">
        <h1 className="font-display text-3xl font-bold text-forest-900 sm:text-4xl">
          All Guides
        </h1>
        <p className="mt-3 text-ink/70">
          Everything we&rsquo;ve published, grouped by who it&rsquo;s for — implementation
          kits for your business, and activity workbooks for your family.
        </p>
      </header>

      {familyEbooks.length > 0 && (
        <section aria-labelledby="family-heading" className="mb-14">
          <h2 id="family-heading" className="font-display text-xl font-bold text-forest-900">
            For your family
          </h2>
          <div className="mt-6 grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {familyEbooks.map((ebook) => (
              <EbookCard key={ebook.slug} ebook={ebook} headingLevel="h3" />
            ))}
          </div>
        </section>
      )}

      <section aria-labelledby="business-heading">
        <h2 id="business-heading" className="font-display text-xl font-bold text-forest-900">
          For your business
        </h2>
        <div className="mt-6">
          <EbookFilterGrid ebooks={businessEbooks} categories={businessCategories} languages={languages} />
        </div>
      </section>
    </div>
  );
}
