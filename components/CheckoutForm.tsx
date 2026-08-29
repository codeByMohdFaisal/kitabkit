"use client";

import { useState } from "react";
import type { Ebook } from "@/lib/types";
import { formatPrice } from "@/lib/site";

type Status = "idle" | "submitting" | "success" | "error";

/**
 * INTEGRATION POINT — payment checkout.
 * Today this posts to /api/checkout, which calls the stubbed
 * lib/payments/razorpay.ts and immediately "delivers" the file. Once
 * Razorpay is wired in for real, this component should open the Razorpay
 * Checkout widget with the `providerOrderPayload` the API returns, and only
 * show the success/download state after the widget reports success.
 */
export function CheckoutForm({ ebook }: { ebook: Ebook }) {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [status, setStatus] = useState<Status>("idle");
  const [downloadUrl, setDownloadUrl] = useState<string | null>(null);
  const [error, setError] = useState<string | null>(null);

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setStatus("submitting");
    setError(null);

    try {
      const res = await fetch("/api/checkout", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ slug: ebook.slug, name, email }),
      });

      if (!res.ok) {
        const body = await res.json().catch(() => ({}));
        throw new Error(body.error ?? "Something went wrong. Please try again.");
      }

      const data = await res.json();
      setDownloadUrl(data.downloadUrl);
      setStatus("success");
    } catch (err) {
      setError(err instanceof Error ? err.message : "Something went wrong.");
      setStatus("error");
    }
  }

  if (status === "success" && downloadUrl) {
    return (
      <div className="rounded-2xl border border-forest-200 bg-forest-50 p-6 text-center">
        <p className="font-display text-lg font-semibold text-forest-900">You&rsquo;re all set!</p>
        <p className="mt-1 text-sm text-ink/70">
          Your download is ready below, and a copy has been sent to {email}.
        </p>
        <a
          href={downloadUrl}
          download
          className="mt-5 inline-block rounded-lg bg-forest-800 px-6 py-3 text-sm font-semibold text-white shadow-sm transition-colors hover:bg-forest-700"
        >
          Download {ebook.title}
        </a>
      </div>
    );
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      <div>
        <label htmlFor="checkout-name" className="block text-sm font-medium text-forest-900">
          Full name
        </label>
        <input
          id="checkout-name"
          type="text"
          required
          value={name}
          onChange={(e) => setName(e.target.value)}
          className="mt-1.5 w-full rounded-md border border-forest-200 px-3 py-2 text-sm focus:border-forest-500 focus:outline-none focus:ring-1 focus:ring-forest-500"
        />
      </div>
      <div>
        <label htmlFor="checkout-email" className="block text-sm font-medium text-forest-900">
          Email — we&rsquo;ll send your download link here
        </label>
        <input
          id="checkout-email"
          type="email"
          required
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          className="mt-1.5 w-full rounded-md border border-forest-200 px-3 py-2 text-sm focus:border-forest-500 focus:outline-none focus:ring-1 focus:ring-forest-500"
        />
      </div>

      {error && <p className="text-sm text-terracotta-700">{error}</p>}

      <button
        type="submit"
        disabled={status === "submitting"}
        className="w-full rounded-lg bg-terracotta-600 px-6 py-3 text-sm font-semibold text-white shadow-sm transition-colors hover:bg-terracotta-700 disabled:cursor-not-allowed disabled:opacity-60"
      >
        {status === "submitting"
          ? "Processing…"
          : `Pay ${formatPrice(ebook.price, ebook.currency)} via UPI`}
      </button>
      <p className="text-center text-xs text-ink/70">
        Payments are processed securely via Razorpay. UPI, cards, and net banking supported.
      </p>
    </form>
  );
}
