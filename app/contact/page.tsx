import type { Metadata } from "next";
import { siteConfig, whatsappLink } from "@/lib/site";
import { ContactForm } from "@/components/ContactForm";

export const metadata: Metadata = {
  title: "Contact",
  description:
    "Get in touch about a guide, a bulk order, or a question before you buy.",
  alternates: { canonical: "/contact" },
};

export default function ContactPage() {
  return (
    <div className="mx-auto max-w-3xl px-4 py-14 sm:px-6">
      <h1 className="font-display text-3xl font-bold text-forest-900 sm:text-4xl">
        Get in touch
      </h1>
      <p className="mt-3 max-w-xl text-ink/70">
        Question about a guide, a bulk order, or something else entirely?
        Reach out — WhatsApp is fastest, but email and the form below work too.
      </p>

      <div className="mt-8 grid gap-4 sm:grid-cols-2">
        <a
          href={whatsappLink("Hi! I'd like to get in touch about your ebooks.")}
          target="_blank"
          rel="noopener noreferrer"
          className="flex flex-col rounded-xl border border-forest-100 bg-white p-5 shadow-sm transition-shadow hover:shadow-md"
        >
          <span className="font-display font-semibold text-forest-900">WhatsApp</span>
          <span className="mt-1 text-sm text-ink/70">Usually the fastest way to reach us</span>
        </a>
        <a
          href={`mailto:${siteConfig.contactEmail}`}
          className="flex flex-col rounded-xl border border-forest-100 bg-white p-5 shadow-sm transition-shadow hover:shadow-md"
        >
          <span className="font-display font-semibold text-forest-900">Email</span>
          <span className="mt-1 text-sm text-ink/70">{siteConfig.contactEmail}</span>
        </a>
      </div>

      <div className="mt-10 rounded-2xl border border-forest-100 bg-white p-6 shadow-sm sm:p-8">
        <h2 className="font-display text-xl font-bold text-forest-900">Send a message</h2>
        <p className="mt-1 text-sm text-ink/70">
          This opens your email app with your message pre-filled — nothing is sent
          automatically.
        </p>
        <div className="mt-6">
          <ContactForm />
        </div>
      </div>
    </div>
  );
}
