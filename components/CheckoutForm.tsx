"use client";

import { useRef, useState } from "react";
import type { Ebook } from "@/lib/types";
import { formatPrice, siteConfig } from "@/lib/site";

type Status = "idle" | "submitting" | "success" | "error";

type RazorpaySuccessResponse = {
  razorpay_order_id: string;
  razorpay_payment_id: string;
  razorpay_signature: string;
};

type RazorpayOptions = {
  key: string;
  amount: number;
  currency: string;
  name: string;
  description: string;
  order_id: string;
  prefill: { name: string; email: string };
  theme: { color: string };
  handler: (response: RazorpaySuccessResponse) => void;
  modal: { ondismiss: () => void };
};

type RazorpayInstance = {
  open: () => void;
  on: (
    event: "payment.failed",
    handler: (response: { error: { description: string } }) => void,
  ) => void;
};

declare global {
  interface Window {
    Razorpay?: new (options: RazorpayOptions) => RazorpayInstance;
    fbq?: (...args: any[]) => void;
  }
}

const CHECKOUT_SCRIPT_SRC = "https://checkout.razorpay.com/v1/checkout.js";

function loadRazorpayScript(): Promise<void> {
  if (window.Razorpay) return Promise.resolve();

  const existing = document.querySelector(
    `script[src="${CHECKOUT_SCRIPT_SRC}"]`,
  );
  if (existing) {
    return new Promise((resolve, reject) => {
      existing.addEventListener("load", () => resolve());
      existing.addEventListener("error", () =>
        reject(new Error("Failed to load Razorpay.")),
      );
    });
  }

  return new Promise((resolve, reject) => {
    const script = document.createElement("script");
    script.src = CHECKOUT_SCRIPT_SRC;
    script.onload = () => resolve();
    script.onerror = () => reject(new Error("Failed to load Razorpay."));
    document.body.appendChild(script);
  });
}

export function CheckoutForm({ ebook }: { ebook: Ebook }) {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [status, setStatus] = useState<Status>("idle");
  const [downloadUrl, setDownloadUrl] = useState<string | null>(null);
  const [emailSent, setEmailSent] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const checkoutTracked = useRef(false);

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setStatus("submitting");
    setError(null);
    if (!checkoutTracked.current && window.fbq) {
      window.fbq("track", "InitiateCheckout", {
        content_ids: [ebook.slug],
        content_name: ebook.title,
        content_type: "product",
        value: ebook.price,
        currency: ebook.currency,
      });

      checkoutTracked.current = true;
    }

    try {
      const orderRes = await fetch("/api/checkout", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ slug: ebook.slug, name, email }),
      });

      if (!orderRes.ok) {
        const body = await orderRes.json().catch(() => ({}));
        throw new Error(
          body.error ?? "Something went wrong. Please try again.",
        );
      }

      const order = await orderRes.json();
      if (!order.keyId) {
        throw new Error("Payments are not configured yet.");
      }

      await loadRazorpayScript();

      const razorpay = new window.Razorpay!({
        key: order.keyId,
        amount: order.amount,
        currency: order.currency,
        name: siteConfig.name,
        description: order.ebookTitle,
        order_id: order.orderId,
        prefill: { name, email },
        theme: { color: "#1b4332" },
        handler: async (response) => {
          try {
            const verifyRes = await fetch("/api/checkout/verify", {
              method: "POST",
              headers: { "Content-Type": "application/json" },
              body: JSON.stringify(response),
            });

            if (!verifyRes.ok) {
              const body = await verifyRes.json().catch(() => ({}));
              throw new Error(body.error ?? "Payment could not be verified.");
            }

            const data = await verifyRes.json();
            setDownloadUrl(data.downloadUrl);
            setEmailSent(Boolean(data.emailSent));
            setStatus("success");
            if (window.fbq) {
              window.fbq("track", "Purchase", {
                value: order.amount / 100,
                currency: order.currency,
                content_ids: [ebook.slug],
                content_name: ebook.title,
                content_type: "product",
              });
            }
          } catch (err) {
            setError(
              err instanceof Error
                ? err.message
                : "Payment could not be verified.",
            );
            setStatus("error");
          }
        },
        modal: {
          ondismiss: () => {
            setStatus((current) =>
              current === "submitting" ? "idle" : current,
            );
          },
        },
      });

      razorpay.on("payment.failed", (response) => {
        setError(
          response.error.description || "Payment failed. Please try again.",
        );
        setStatus("error");
      });

      razorpay.open();
    } catch (err) {
      setError(err instanceof Error ? err.message : "Something went wrong.");
      setStatus("error");
    }
  }

  if (status === "success" && downloadUrl) {
    return (
      <div className="rounded-2xl border border-forest-200 bg-forest-50 p-6 text-center">
        <p className="font-display text-lg font-semibold text-forest-900">
          You&rsquo;re all set!
        </p>
        <p className="mt-1 text-sm text-ink/70">
          {emailSent
            ? `Your download is ready below, and a copy has been sent to ${email}.`
            : "Your download is ready below."}
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
        <label
          htmlFor="checkout-name"
          className="block text-sm font-medium text-forest-900"
        >
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
        <label
          htmlFor="checkout-email"
          className="block text-sm font-medium text-forest-900"
        >
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
        Payments are processed securely via Razorpay. UPI, cards, and net
        banking supported.
      </p>
    </form>
  );
}
