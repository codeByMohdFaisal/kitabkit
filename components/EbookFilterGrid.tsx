"use client";

import { useMemo, useState } from "react";
import type { CategoryMeta, Ebook } from "@/lib/types";
import { languageLabels } from "@/lib/site";
import { EbookCard } from "./EbookCard";

type Props = {
  ebooks: Ebook[];
  categories: CategoryMeta[];
  languages: { code: string; count: number }[];
};

const ALL = "all";

export function EbookFilterGrid({ ebooks, categories, languages }: Props) {
  const [category, setCategory] = useState(ALL);
  const [language, setLanguage] = useState(ALL);

  const filtered = useMemo(() => {
    return ebooks.filter((ebook) => {
      const categoryMatch = category === ALL || ebook.category.includes(category);
      const languageMatch = language === ALL || ebook.language === language;
      return categoryMatch && languageMatch;
    });
  }, [ebooks, category, language]);

  const hasActiveFilters = category !== ALL || language !== ALL;

  return (
    <div>
      <form
        className="mb-8 flex flex-col gap-4 rounded-xl border border-forest-100 bg-white p-4 sm:flex-row sm:items-end sm:gap-6"
        role="search"
        aria-label="Filter guides"
        onSubmit={(e) => e.preventDefault()}
      >
        <div className="flex-1">
          <label htmlFor="category-filter" className="block text-xs font-semibold uppercase tracking-wide text-forest-700">
            Category
          </label>
          <select
            id="category-filter"
            value={category}
            onChange={(e) => setCategory(e.target.value)}
            className="mt-1.5 w-full rounded-md border border-forest-200 bg-white px-3 py-2 text-sm text-ink focus:border-forest-500 focus:outline-none focus:ring-1 focus:ring-forest-500"
          >
            <option value={ALL}>All categories</option>
            {categories.map((c) => (
              <option key={c.slug} value={c.slug}>
                {c.label}
              </option>
            ))}
          </select>
        </div>

        <div className="flex-1">
          <label htmlFor="language-filter" className="block text-xs font-semibold uppercase tracking-wide text-forest-700">
            Language
          </label>
          <select
            id="language-filter"
            value={language}
            onChange={(e) => setLanguage(e.target.value)}
            className="mt-1.5 w-full rounded-md border border-forest-200 bg-white px-3 py-2 text-sm text-ink focus:border-forest-500 focus:outline-none focus:ring-1 focus:ring-forest-500"
          >
            <option value={ALL}>All languages</option>
            {languages.map((l) => (
              <option key={l.code} value={l.code}>
                {languageLabels[l.code] ?? l.code}
              </option>
            ))}
          </select>
        </div>

        {hasActiveFilters && (
          <button
            type="button"
            onClick={() => {
              setCategory(ALL);
              setLanguage(ALL);
            }}
            className="rounded-md border border-forest-200 px-4 py-2 text-sm font-medium text-forest-700 transition-colors hover:bg-forest-50"
          >
            Clear filters
          </button>
        )}
      </form>

      <p className="mb-4 text-sm text-ink/70" aria-live="polite">
        Showing {filtered.length} of {ebooks.length} guide{ebooks.length === 1 ? "" : "s"}
      </p>

      {filtered.length > 0 ? (
        <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {filtered.map((ebook) => (
            <EbookCard key={ebook.slug} ebook={ebook} headingLevel="h2" />
          ))}
        </div>
      ) : (
        <div className="rounded-xl border border-dashed border-sage-300 bg-sage-50 p-10 text-center">
          <p className="font-display text-lg font-semibold text-sage-800">No guides match these filters</p>
          <p className="mt-1 text-sm text-sage-700">Try a different category or language.</p>
        </div>
      )}
    </div>
  );
}
