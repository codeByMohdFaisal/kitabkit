import Link from "next/link";
import type { Metadata } from "next";
import { getAllEbooks } from "@/lib/ebooks";
import { EbookCard, ComingSoonCard } from "@/components/EbookCard";
import { whatsappLink } from "@/lib/site";

export const revalidate = 3600;

export const metadata: Metadata = {
  title: "Practical, Implementation-Kit Ebooks",
  alternates: { canonical: "/" },
};

const MIN_GRID_SIZE = 4;

export default function HomePage() {
  const ebooks = getAllEbooks();
  const placeholderCount = Math.max(0, MIN_GRID_SIZE - ebooks.length);

  return (
    <>
      <section className="border-b border-forest-100 bg-gradient-to-b from-forest-50 to-cream">
        <div className="mx-auto max-w-6xl px-4 py-16 sm:px-6 sm:py-24">
          <div className="max-w-2xl">
            <p className="mb-4 inline-flex items-center rounded-full bg-terracotta-100 px-3 py-1 text-xs font-semibold uppercase tracking-wide text-terracotta-700">
              A growing catalog of implementation kits
            </p>
            <h1 className="font-display text-4xl font-bold leading-tight text-forest-900 sm:text-5xl">
              Practical guides that help you actually get things done
            </h1>
            <p className="mt-5 text-lg text-ink/70">
              Not theory, not generic advice — step-by-step implementation kits with
              checklists, templates, and action plans, built for Indian readers who
              want results, not more reading. Priced fairly, made to be used.
            </p>
            <div className="mt-8 flex flex-wrap gap-3">
              <Link
                href="/ebooks"
                className="rounded-lg bg-forest-800 px-6 py-3 text-sm font-semibold text-white shadow-sm transition-colors hover:bg-forest-700"
              >
                Browse all guides
              </Link>
              <a
                href={whatsappLink("Hi! I have a question about your ebooks.")}
                target="_blank"
                rel="noopener noreferrer"
                className="rounded-lg border border-forest-200 bg-white px-6 py-3 text-sm font-semibold text-forest-800 transition-colors hover:bg-forest-50"
              >
                Ask us on WhatsApp
              </a>
            </div>
          </div>
        </div>
      </section>

      <section className="mx-auto max-w-6xl px-4 py-14 sm:px-6">
        <div className="mb-8 flex items-end justify-between gap-4">
          <div>
            <h2 className="font-display text-2xl font-bold text-forest-900 sm:text-3xl">
              Available guides
            </h2>
            <p className="mt-1 text-sm text-ink/70">
              We publish new implementation kits regularly — this catalog grows over time.
            </p>
          </div>
          <Link href="/ebooks" className="hidden shrink-0 text-sm font-semibold text-terracotta-600 hover:text-terracotta-700 sm:inline">
            View full catalog →
          </Link>
        </div>

        <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-4">
          {ebooks.map((ebook, i) => (
            <EbookCard key={ebook.slug} ebook={ebook} priority={i === 0} />
          ))}
          {Array.from({ length: placeholderCount }).map((_, i) => (
            <ComingSoonCard key={`placeholder-${i}`} />
          ))}
        </div>
      </section>

      <section className="border-t border-forest-100 bg-sage-50">
        <div className="mx-auto max-w-6xl px-4 py-14 sm:px-6">
          <h2 className="font-display text-2xl font-bold text-forest-900">
            Built to be used, not just read
          </h2>
          <div className="mt-8 grid gap-8 sm:grid-cols-3">
            <div>
              <p className="font-display text-lg font-semibold text-forest-800">1. Pick a guide</p>
              <p className="mt-2 text-sm text-ink/70">
                Every guide is built around one specific outcome, with a clear list of who
                it&rsquo;s for and exactly what&rsquo;s inside before you buy.
              </p>
            </div>
            <div>
              <p className="font-display text-lg font-semibold text-forest-800">2. Follow the plan</p>
              <p className="mt-2 text-sm text-ink/70">
                Checklists, templates, and day-by-day action plans — not just advice you
                have to figure out how to apply yourself.
              </p>
            </div>
            <div>
              <p className="font-display text-lg font-semibold text-forest-800">3. Get unstuck faster</p>
              <p className="mt-2 text-sm text-ink/70">
                Stuck on something in a guide, or not sure which one is right for you?{" "}
                <Link href="/contact" className="font-semibold text-terracotta-600 hover:underline">
                  Reach out
                </Link>{" "}
                — a real person will get back to you.
              </p>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}
