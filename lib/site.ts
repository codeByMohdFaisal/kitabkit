export const siteConfig = {
  name: "Kitaab Kit",
  shortName: "Kitaab Kit",
  description:
    "Practical, low-cost implementation-kit ebooks for Indian readers — step-by-step guides you can actually act on, not just read.",
  url: process.env.NEXT_PUBLIC_SITE_URL ?? "http://localhost:3000",
  author: "Kitaab Kit",
  whatsappNumber: process.env.NEXT_PUBLIC_WHATSAPP_NUMBER ?? "917055912140",
  contactEmail: process.env.NEXT_PUBLIC_CONTACT_EMAIL ?? "mohdfaisal2140@gmail.com",
  /** Master switch for the buy/checkout flow. Off until Razorpay is live —
   *  see .env.example. Flip with NEXT_PUBLIC_PAYMENTS_ENABLED=true, no code change needed. */
  paymentsEnabled: process.env.NEXT_PUBLIC_PAYMENTS_ENABLED === "true",
};

export const languageLabels: Record<string, string> = {
  en: "English",
  "hi-latn": "Hinglish",
};

export function formatPrice(price: number, currency: string) {
  return new Intl.NumberFormat("en-IN", {
    style: "currency",
    currency,
    maximumFractionDigits: 0,
  }).format(price);
}

export function whatsappLink(message?: string) {
  const base = `https://wa.me/${siteConfig.whatsappNumber}`;
  return message ? `${base}?text=${encodeURIComponent(message)}` : base;
}
