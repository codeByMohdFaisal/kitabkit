import Image from "next/image";
import Link from "next/link";
import type { Ebook } from "@/lib/types";
import { getCategoryBySlug } from "@/lib/ebooks";
import { PriceTag } from "./PriceTag";
import { LanguageBadge, CategoryPill } from "./Badges";

export function EbookCard({
  ebook,
  priority = false,
  headingLevel: Heading = "h3",
}: {
  ebook: Ebook;
  priority?: boolean;
  /** Set to "h2" when the card grid sits directly under an h1 with no intermediate heading. */
  headingLevel?: "h2" | "h3";
}) {
  const category = ebook.category[0] ? getCategoryBySlug(ebook.category[0]) : undefined;

  return (
    <article className="group flex h-full flex-col overflow-hidden rounded-2xl border border-forest-100 bg-white shadow-sm transition-shadow hover:shadow-md">
      <Link
        href={`/ebooks/${ebook.slug}`}
        className="relative block aspect-[3/4] w-full overflow-hidden bg-forest-800"
      >
        <Image
          src={ebook.coverImage}
          alt={ebook.coverImageAlt}
          fill
          sizes="(min-width: 1024px) 25vw, (min-width: 640px) 40vw, 90vw"
          className="object-cover transition-transform duration-300 group-hover:scale-105"
          priority={priority}
        />
      </Link>
      <div className="flex flex-1 flex-col gap-3 p-5">
        <div className="flex flex-wrap items-center gap-2">
          {category && <CategoryPill label={category.label} href={`/ebooks/category/${category.slug}`} />}
          <LanguageBadge code={ebook.language} />
        </div>
        <Heading className="font-display text-lg font-semibold leading-snug text-forest-900">
          <Link href={`/ebooks/${ebook.slug}`} className="hover:underline">
            {ebook.title}
          </Link>
        </Heading>
        <p className="line-clamp-2 flex-1 text-sm text-ink/70">{ebook.tagline}</p>
        <div className="flex items-center justify-between pt-2">
          <PriceTag price={ebook.price} currency={ebook.currency} />
          <Link
            href={`/ebooks/${ebook.slug}`}
            className="text-sm font-semibold text-terracotta-600 hover:text-terracotta-700"
          >
            View details →
          </Link>
        </div>
      </div>
    </article>
  );
}

export function ComingSoonCard() {
  return (
    <article className="flex h-full flex-col overflow-hidden rounded-2xl border border-dashed border-sage-300 bg-sage-50/60">
      <div className="relative aspect-[3/4] w-full overflow-hidden">
        <Image
          src="/covers/coming-soon.svg"
          alt="Placeholder cover for a future guide that hasn't been published yet"
          fill
          sizes="(min-width: 1024px) 25vw, (min-width: 640px) 40vw, 90vw"
          className="object-cover"
        />
      </div>
      <div className="flex flex-1 flex-col justify-center gap-1 p-5 text-center">
        <p className="font-display text-base font-semibold text-sage-800">More guides coming soon</p>
        <p className="text-sm text-sage-700">New implementation kits are in the works.</p>
      </div>
    </article>
  );
}
