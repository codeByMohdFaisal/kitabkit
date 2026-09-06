import Image from "next/image";
import Link from "next/link";
import type { CategoryMeta, Ebook } from "@/lib/types";
import { siteConfig, whatsappLink } from "@/lib/site";
import { PriceTag } from "@/components/PriceTag";
import { LanguageBadge, CategoryPill } from "@/components/Badges";
import { PreviewGallery } from "@/components/PreviewGallery";

function BuyButton({ ebook }: { ebook: Ebook }) {
  if (siteConfig.paymentsEnabled) {
    return (
      <Link
        href={`/checkout/${ebook.slug}`}
        className="block w-full rounded-lg bg-terracotta-600 px-6 py-3 text-center text-sm font-semibold text-white shadow-sm transition-colors hover:bg-terracotta-700 sm:w-auto"
      >
        Buy now — instant download
      </Link>
    );
  }

  return (
    <div>
      <button
        type="button"
        disabled
        aria-disabled="true"
        className="block w-full cursor-not-allowed rounded-lg bg-forest-100 px-6 py-3 text-center text-sm font-semibold text-forest-400 sm:w-auto"
      >
        Purchases opening soon
      </button>
      <a
        href={whatsappLink(`Hi! I'd like to be notified when "${ebook.title}" is available to buy.`)}
        target="_blank"
        rel="noopener noreferrer"
        className="mt-2 block text-center text-sm font-semibold text-terracotta-600 hover:text-terracotta-700"
      >
        Notify me on WhatsApp →
      </a>
    </div>
  );
}

export function WorkbookDetail({
  ebook,
  categories,
}: {
  ebook: Ebook;
  categories: CategoryMeta[];
}) {
  return (
    <div>
      {/* Hero */}
      <div className="grid gap-10 lg:grid-cols-[minmax(0,320px)_1fr] lg:items-center">
        <div className="relative aspect-[3/4] w-full overflow-hidden rounded-2xl bg-forest-800 shadow-md">
          <Image
            src={ebook.coverImage}
            alt={ebook.coverImageAlt}
            fill
            sizes="(min-width: 1024px) 320px, 90vw"
            className="object-cover"
            priority
          />
        </div>

        <div>
          <div className="mb-3 flex flex-wrap items-center gap-2">
            <LanguageBadge code={ebook.language} />
            {categories.map((c) => (
              <CategoryPill key={c.slug} label={c.label} href={`/ebooks/category/${c.slug}`} />
            ))}
            {ebook.ageRange && (
              <span className="inline-flex items-center rounded-full bg-terracotta-100 px-3 py-1 text-xs font-semibold text-terracotta-700">
                {ebook.ageRange}
              </span>
            )}
          </div>

          <h1 className="font-display text-3xl font-bold leading-tight text-forest-900 sm:text-4xl">
            {ebook.title}
          </h1>
          {ebook.subtitle && <p className="mt-2 text-lg text-ink/70">{ebook.subtitle}</p>}
          {ebook.format && <p className="mt-1 text-sm text-ink/60">{ebook.format}</p>}

          <div className="mt-6 flex flex-wrap items-center gap-4">
            <PriceTag price={ebook.price} currency={ebook.currency} size="lg" />
            <div className="flex-1 sm:flex-initial">
              <BuyButton ebook={ebook} />
            </div>
          </div>
        </div>
      </div>

      {ebook.problemStatement && (
        <p className="mt-12 rounded-2xl border border-forest-100 bg-white px-6 py-5 text-center font-display text-xl font-semibold text-forest-900 shadow-sm sm:text-2xl">
          &ldquo;{ebook.problemStatement}&rdquo;
        </p>
      )}

      {/* What's inside */}
      <section className="mt-12" aria-labelledby="inside-heading">
        <h2 id="inside-heading" className="font-display text-xl font-bold text-forest-900">
          What&rsquo;s inside
        </h2>
        <ul className="mt-4 grid gap-3 sm:grid-cols-2">
          {ebook.tableOfContents.map((item, i) => (
            <li key={i} className="flex gap-2 text-ink/80">
              <span className="mt-1 text-forest-500" aria-hidden="true">✓</span>
              <span>{item}</span>
            </li>
          ))}
        </ul>
      </section>

      {/* Preview gallery */}
      {ebook.previewImages && ebook.previewImages.length > 0 && (
        <section className="mt-12" aria-labelledby="preview-heading">
          <h2 id="preview-heading" className="font-display text-xl font-bold text-forest-900">
            See inside
          </h2>
          <p className="mt-1 text-sm text-ink/70">Tap a page to see it full-size.</p>
          <div className="mt-4">
            <PreviewGallery images={ebook.previewImages} />
          </div>
        </section>
      )}

      {/* Why this instead of free worksheets */}
      {ebook.whyPoints && ebook.whyPoints.length > 0 && (
        <section className="mt-12" aria-labelledby="why-heading">
          <h2 id="why-heading" className="font-display text-xl font-bold text-forest-900">
            Why this instead of free worksheets
          </h2>
          <ul className="mt-4 space-y-3">
            {ebook.whyPoints.map((point, i) => (
              <li key={i} className="flex gap-2 text-ink/80">
                <span className="mt-1 text-forest-500" aria-hidden="true">✓</span>
                <span>{point}</span>
              </li>
            ))}
          </ul>
        </section>
      )}

      {/* Skills covered */}
      {ebook.skills && ebook.skills.length > 0 && (
        <section className="mt-12" aria-labelledby="skills-heading">
          <h2 id="skills-heading" className="font-display text-xl font-bold text-forest-900">
            Skills covered
          </h2>
          <div className="mt-4 flex flex-wrap gap-2">
            {ebook.skills.map((skill) => (
              <span
                key={skill}
                className="inline-flex items-center rounded-full border border-forest-200 bg-forest-50 px-3 py-1.5 text-sm font-medium text-forest-700"
              >
                {skill}
              </span>
            ))}
          </div>
        </section>
      )}

      {/* FAQ */}
      {ebook.faqs.length > 0 && (
        <section className="mt-12" aria-labelledby="faq-heading">
          <h2 id="faq-heading" className="font-display text-xl font-bold text-forest-900">
            Frequently asked questions
          </h2>
          <div className="mt-4 divide-y divide-forest-100 rounded-xl border border-forest-100 bg-white">
            {ebook.faqs.map((faq, i) => (
              <details key={i} className="group">
                <summary className="flex cursor-pointer list-none items-center justify-between gap-4 p-5 font-medium text-forest-900 marker:content-none">
                  {faq.question}
                  <span className="shrink-0 text-forest-400 transition-transform group-open:rotate-45" aria-hidden="true">+</span>
                </summary>
                <p className="px-5 pb-5 text-sm text-ink/70">{faq.answer}</p>
              </details>
            ))}
          </div>
        </section>
      )}

      {/* Buy again at the bottom */}
      <div className="mt-12 rounded-2xl border border-forest-100 bg-white p-6 text-center shadow-sm sm:p-8">
        <p className="font-display text-lg font-semibold text-forest-900">
          Ready to give your child 30 days of screen-free learning?
        </p>
        <div className="mt-4 flex justify-center">
          <BuyButton ebook={ebook} />
        </div>
      </div>
    </div>
  );
}
