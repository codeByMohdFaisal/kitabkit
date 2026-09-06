import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { getAllEbooks, getCategoryBySlug, getEbookBySlug, getLanguageSiblings } from "@/lib/ebooks";
import { siteConfig } from "@/lib/site";
import { JsonLd } from "@/components/JsonLd";
import { GuideDetail } from "@/components/GuideDetail";
import { WorkbookDetail } from "@/components/WorkbookDetail";

export const revalidate = 3600;

type Props = { params: Promise<{ slug: string }> };

export function generateStaticParams() {
  return getAllEbooks().map((ebook) => ({ slug: ebook.slug }));
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params;
  const ebook = getEbookBySlug(slug);
  if (!ebook) return {};

  const title = ebook.seoTitle ?? ebook.title;
  const description = ebook.seoDescription ?? ebook.tagline;

  return {
    title,
    description,
    alternates: { canonical: `/ebooks/${ebook.slug}` },
    openGraph: {
      type: "website",
      title,
      description,
      url: `${siteConfig.url}/ebooks/${ebook.slug}`,
    },
    twitter: {
      card: "summary_large_image",
      title,
      description,
    },
  };
}

export default async function EbookDetailPage({ params }: Props) {
  const { slug } = await params;
  const ebook = getEbookBySlug(slug);
  if (!ebook) notFound();

  const siblings = getLanguageSiblings(ebook);
  const categories = ebook.category
    .map((slug) => getCategoryBySlug(slug))
    .filter((c): c is NonNullable<typeof c> => Boolean(c));

  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "Product",
    name: ebook.title,
    description: ebook.tagline,
    image: `${siteConfig.url}${ebook.coverImage}`,
    sku: ebook.slug,
    inLanguage: ebook.language,
    brand: { "@type": "Brand", name: siteConfig.name },
    author: { "@type": "Organization", name: siteConfig.author },
    offers: {
      "@type": "Offer",
      url: `${siteConfig.url}/ebooks/${ebook.slug}`,
      priceCurrency: ebook.currency,
      price: ebook.price,
      availability: siteConfig.paymentsEnabled
        ? "https://schema.org/InStock"
        : "https://schema.org/PreOrder",
    },
  };

  return (
    <div className="mx-auto max-w-6xl px-4 py-12 sm:px-6">
      <JsonLd data={jsonLd} />

      <nav aria-label="Breadcrumb" className="mb-8 text-sm text-ink/70">
        <Link href="/ebooks" className="hover:text-forest-700">All guides</Link>
        {" / "}
        <span className="text-ink/80">{ebook.title}</span>
      </nav>

      {ebook.kind === "workbook" ? (
        <WorkbookDetail ebook={ebook} categories={categories} />
      ) : (
        <GuideDetail ebook={ebook} siblings={siblings} categories={categories} />
      )}
    </div>
  );
}
