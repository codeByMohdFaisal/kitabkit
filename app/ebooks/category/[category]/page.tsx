import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { getAllCategories, getCategoryBySlug, getEbooksByCategory } from "@/lib/ebooks";
import { EbookCard, ComingSoonCard } from "@/components/EbookCard";

export const revalidate = 3600;

type Props = { params: Promise<{ category: string }> };

export function generateStaticParams() {
  return getAllCategories().map((category) => ({ category: category.slug }));
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { category: slug } = await params;
  const category = getCategoryBySlug(slug);
  if (!category) return {};

  return {
    title: category.label,
    description: category.description,
    alternates: { canonical: `/ebooks/category/${category.slug}` },
  };
}

export default async function CategoryPage({ params }: Props) {
  const { category: slug } = await params;
  const category = getCategoryBySlug(slug);
  if (!category) notFound();

  const ebooks = getEbooksByCategory(category.slug);

  return (
    <div className="mx-auto max-w-6xl px-4 py-12 sm:px-6">
      <nav aria-label="Breadcrumb" className="mb-6 text-sm text-ink/70">
        <Link href="/ebooks" className="hover:text-forest-700">All guides</Link>
        {" / "}
        <span className="text-ink/80">{category.label}</span>
      </nav>

      <header className="mb-10 max-w-2xl">
        <h1 className="font-display text-3xl font-bold text-forest-900 sm:text-4xl">
          {category.label}
        </h1>
        <p className="mt-3 text-ink/70">{category.description}</p>
      </header>

      {ebooks.length > 0 ? (
        <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {ebooks.map((ebook) => (
            <EbookCard key={ebook.slug} ebook={ebook} headingLevel="h2" />
          ))}
        </div>
      ) : (
        <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
          <div className="sm:col-span-2 lg:col-span-3 rounded-xl border border-dashed border-sage-300 bg-sage-50 p-8 text-center">
            <p className="font-display text-lg font-semibold text-sage-800">
              No guides in this category yet
            </p>
            <p className="mt-1 text-sm text-sage-700">
              We&rsquo;re working on it — check back soon, or{" "}
              <Link href="/ebooks" className="font-semibold underline">
                browse all guides
              </Link>{" "}
              in the meantime.
            </p>
          </div>
          <ComingSoonCard />
        </div>
      )}
    </div>
  );
}
