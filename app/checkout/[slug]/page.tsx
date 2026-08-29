import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { notFound, redirect } from "next/navigation";
import { getAllEbooks, getEbookBySlug } from "@/lib/ebooks";
import { siteConfig } from "@/lib/site";
import { PriceTag } from "@/components/PriceTag";
import { CheckoutForm } from "@/components/CheckoutForm";

export function generateStaticParams() {
  return getAllEbooks().map((ebook) => ({ slug: ebook.slug }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}): Promise<Metadata> {
  const { slug } = await params;
  const ebook = getEbookBySlug(slug);
  if (!ebook) return {};

  return {
    title: `Checkout — ${ebook.title}`,
    robots: { index: false, follow: false },
  };
}

export default async function CheckoutPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const ebook = getEbookBySlug(slug);
  if (!ebook) notFound();
  if (!siteConfig.paymentsEnabled) redirect(`/ebooks/${ebook.slug}`);

  return (
    <div className="mx-auto max-w-3xl px-4 py-14 sm:px-6">
      <nav aria-label="Breadcrumb" className="mb-6 text-sm text-ink/70">
        <Link href={`/ebooks/${ebook.slug}`} className="hover:text-forest-700">
          {ebook.title}
        </Link>
        {" / "}
        <span className="text-ink/80">Checkout</span>
      </nav>

      <h1 className="font-display text-3xl font-bold text-forest-900">Checkout</h1>

      <div className="mt-8 grid gap-8 sm:grid-cols-[100px_1fr] sm:items-center rounded-2xl border border-forest-100 bg-white p-5 shadow-sm">
        <div className="relative aspect-[3/4] w-full overflow-hidden rounded-lg bg-forest-800">
          <Image
            src={ebook.coverImage}
            alt={ebook.coverImageAlt}
            fill
            sizes="100px"
            className="object-cover"
          />
        </div>
        <div>
          <p className="font-display font-semibold text-forest-900">{ebook.title}</p>
          <p className="mt-1 text-sm text-ink/70">{ebook.tagline}</p>
          <div className="mt-2">
            <PriceTag price={ebook.price} currency={ebook.currency} />
          </div>
        </div>
      </div>

      <div className="mt-8 rounded-2xl border border-forest-100 bg-white p-6 shadow-sm sm:p-8">
        <CheckoutForm ebook={ebook} />
      </div>
    </div>
  );
}
