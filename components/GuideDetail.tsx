import Image from "next/image";
import Link from "next/link";
import type { CategoryMeta, Ebook } from "@/lib/types";
import { renderMarkdownLite } from "@/lib/markdown";
import { languageLabels, siteConfig, whatsappLink } from "@/lib/site";
import { PriceTag } from "@/components/PriceTag";
import { LanguageBadge, CategoryPill } from "@/components/Badges";

export function GuideDetail({
  ebook,
  siblings,
  categories,
}: {
  ebook: Ebook;
  siblings: Ebook[];
  categories: CategoryMeta[];
}) {
  return (
    <div className="grid gap-10 lg:grid-cols-[minmax(0,320px)_1fr]">
      <div>
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

        <div className="mt-6 rounded-2xl border border-forest-100 bg-white p-6 shadow-sm">
          <PriceTag price={ebook.price} currency={ebook.currency} size="lg" />
          {siteConfig.paymentsEnabled ? (
            <Link
              href={`/checkout/${ebook.slug}`}
              className="mt-4 block w-full rounded-lg bg-terracotta-600 px-6 py-3 text-center text-sm font-semibold text-white shadow-sm transition-colors hover:bg-terracotta-700"
            >
              Buy now — instant download
            </Link>
          ) : (
            <div className="mt-4">
              <button
                type="button"
                disabled
                aria-disabled="true"
                className="block w-full cursor-not-allowed rounded-lg bg-forest-100 px-6 py-3 text-center text-sm font-semibold text-forest-400"
              >
                Purchases opening soon
              </button>
              <a
                href={whatsappLink(
                  `Hi! I'd like to be notified when "${ebook.title}" is available to buy.`
                )}
                target="_blank"
                rel="noopener noreferrer"
                className="mt-2 block text-center text-sm font-semibold text-terracotta-600 hover:text-terracotta-700"
              >
                Notify me on WhatsApp →
              </a>
            </div>
          )}
          {ebook.sampleFileUrl && (
            <a
              href={ebook.sampleFileUrl}
              className="mt-3 block w-full rounded-lg border border-forest-200 px-6 py-3 text-center text-sm font-semibold text-forest-800 transition-colors hover:bg-forest-50"
            >
              Download free sample
            </a>
          )}

          {siblings.length > 0 && (
            <div className="mt-6 border-t border-forest-100 pt-5">
              <p className="text-xs font-semibold uppercase tracking-wide text-forest-700">
                Also available in
              </p>
              <ul className="mt-2 space-y-1.5">
                {siblings.map((sibling) => (
                  <li key={sibling.slug}>
                    <Link
                      href={`/ebooks/${sibling.slug}`}
                      className="flex items-center justify-between text-sm text-forest-800 hover:text-terracotta-600"
                    >
                      <span>{languageLabels[sibling.language] ?? sibling.language}</span>
                      <span aria-hidden="true">→</span>
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          )}
        </div>
      </div>

      <div>
        <div className="mb-3 flex flex-wrap items-center gap-2">
          <LanguageBadge code={ebook.language} />
          {categories.map((c) => (
            <CategoryPill key={c.slug} label={c.label} href={`/ebooks/category/${c.slug}`} />
          ))}
        </div>

        <h1 className="font-display text-3xl font-bold leading-tight text-forest-900 sm:text-4xl">
          {ebook.title}
        </h1>
        <p className="mt-3 text-lg text-ink/70">{ebook.tagline}</p>

        <section className="mt-8 space-y-4 text-ink/80" aria-labelledby="about-heading">
          <h2 id="about-heading" className="font-display text-xl font-bold text-forest-900">
            About this guide
          </h2>
          {renderMarkdownLite(ebook.description)}
        </section>

        <section className="mt-10" aria-labelledby="audience-heading">
          <h2 id="audience-heading" className="font-display text-xl font-bold text-forest-900">
            Who it&rsquo;s for
          </h2>
          <ul className="mt-4 space-y-2">
            {ebook.targetAudience.map((item, i) => (
              <li key={i} className="flex gap-2 text-ink/80">
                <span className="mt-1 text-forest-500" aria-hidden="true">✓</span>
                <span>{item}</span>
              </li>
            ))}
          </ul>
        </section>

        <section className="mt-10" aria-labelledby="toc-heading">
          <h2 id="toc-heading" className="font-display text-xl font-bold text-forest-900">
            What&rsquo;s inside
          </h2>
          <ol className="mt-4 space-y-2">
            {ebook.tableOfContents.map((item, i) => (
              <li key={i} className="flex gap-3 text-ink/80">
                <span className="font-display font-semibold text-terracotta-600">
                  {String(i + 1).padStart(2, "0")}
                </span>
                <span>{item}</span>
              </li>
            ))}
          </ol>
        </section>

        {ebook.faqs.length > 0 && (
          <section className="mt-10" aria-labelledby="faq-heading">
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

        <section className="mt-10" aria-labelledby="testimonials-heading">
          <h2 id="testimonials-heading" className="font-display text-xl font-bold text-forest-900">
            What readers say
          </h2>
          {ebook.testimonials.length > 0 ? (
            <div className="mt-4 grid gap-4 sm:grid-cols-2">
              {ebook.testimonials.map((t, i) => (
                <blockquote key={i} className="rounded-xl border border-forest-100 bg-white p-5">
                  <p className="text-sm text-ink/80">&ldquo;{t.quote}&rdquo;</p>
                  <footer className="mt-3 text-xs font-semibold text-forest-700">
                    {t.name}
                    {t.role ? `, ${t.role}` : ""}
                  </footer>
                </blockquote>
              ))}
            </div>
          ) : (
            <div className="mt-4 rounded-xl border border-dashed border-sage-300 bg-sage-50 p-6 text-sm text-sage-800">
              This guide is newly published — be among the first to read it and let us know
              what you think.{" "}
              <Link href="/contact" className="font-semibold underline">
                Share your feedback
              </Link>
              .
            </div>
          )}
        </section>
      </div>
    </div>
  );
}
