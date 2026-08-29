import type { Metadata } from "next";
import Link from "next/link";
import { siteConfig, whatsappLink } from "@/lib/site";

export const metadata: Metadata = {
  title: "About",
  description: `Why ${siteConfig.name} exists, and the practical, implementation-first approach behind every guide.`,
  alternates: { canonical: "/about" },
};

export default function AboutPage() {
  return (
    <div className="mx-auto max-w-3xl px-4 py-14 sm:px-6">
      <h1 className="font-display text-3xl font-bold text-forest-900 sm:text-4xl">
        About {siteConfig.name}
      </h1>

      <div className="mt-8 space-y-6 text-ink/80">
        <p>
          {siteConfig.name} publishes practical, implementation-kit ebooks for Indian
          readers who want to get something done — not collect another set of tips
          they don&rsquo;t have time to piece together into an actual plan.
        </p>
        <p>
          Every guide is built the same way: pick one specific outcome, and give the
          reader everything they need to reach it — checklists, templates, and a plan
          to follow, not just concepts to think about. That&rsquo;s the difference we aim
          for: guides built to be worked through, not just read.
        </p>

        <h2 className="font-display pt-4 text-xl font-bold text-forest-900">
          Our approach
        </h2>
        <ul className="space-y-3">
          <li className="flex gap-2">
            <span className="mt-1 text-forest-500" aria-hidden="true">✓</span>
            <span>
              <strong className="text-forest-900">Implementation over theory.</strong>{" "}
              Every guide includes checklists, templates, and a day-by-day plan — not
              just concepts to think about.
            </span>
          </li>
          <li className="flex gap-2">
            <span className="mt-1 text-forest-500" aria-hidden="true">✓</span>
            <span>
              <strong className="text-forest-900">Built for Indian readers.</strong>{" "}
              Written around the platforms, price points, and constraints that actually
              apply here — not generic global advice.
            </span>
          </li>
          <li className="flex gap-2">
            <span className="mt-1 text-forest-500" aria-hidden="true">✓</span>
            <span>
              <strong className="text-forest-900">Priced to be used, not admired.</strong>{" "}
              Guides are priced low enough to buy on a whim, and substantial enough to
              actually work through.
            </span>
          </li>
        </ul>

        <h2 className="font-display pt-4 text-xl font-bold text-forest-900">
          Not sure which guide is right for you?
        </h2>
        <p>
          <Link href="/contact" className="font-semibold text-terracotta-600 hover:underline">
            Get in touch
          </Link>{" "}
          — we&rsquo;re happy to point you to the right one before you buy.
        </p>
      </div>

      <div className="mt-10 flex flex-wrap gap-3">
        <Link
          href="/ebooks"
          className="rounded-lg bg-forest-800 px-6 py-3 text-sm font-semibold text-white shadow-sm transition-colors hover:bg-forest-700"
        >
          Browse our guides
        </Link>
        <a
          href={whatsappLink(`Hi! I'd like to know more about ${siteConfig.name}.`)}
          target="_blank"
          rel="noopener noreferrer"
          className="rounded-lg border border-forest-200 bg-white px-6 py-3 text-sm font-semibold text-forest-800 transition-colors hover:bg-forest-50"
        >
          Chat with us on WhatsApp
        </a>
      </div>
    </div>
  );
}
