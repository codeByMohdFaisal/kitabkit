import { NextResponse } from "next/server";
import { getEbookBySlug } from "@/lib/ebooks";
import { paymentProvider } from "@/lib/payments";
import { siteConfig } from "@/lib/site";

type CheckoutRequest = {
  slug: string;
  name: string;
  email: string;
};

export async function POST(request: Request) {
  if (!siteConfig.paymentsEnabled) {
    return NextResponse.json(
      { error: "Checkout is not open yet." },
      { status: 403 }
    );
  }

  let body: CheckoutRequest;
  try {
    body = await request.json();
  } catch {
    return NextResponse.json({ error: "Invalid request body." }, { status: 400 });
  }

  const { slug, name, email } = body;
  if (!slug || !name || !email) {
    return NextResponse.json(
      { error: "slug, name, and email are required." },
      { status: 400 }
    );
  }

  const ebook = getEbookBySlug(slug);
  if (!ebook) {
    return NextResponse.json({ error: "Ebook not found." }, { status: 404 });
  }

  const order = await paymentProvider.createOrder({
    ebookSlug: ebook.slug,
    amount: ebook.price,
    currency: ebook.currency,
    buyerName: name,
    buyerEmail: email,
  });

  // Payment is not yet confirmed here — the client opens the Razorpay
  // Checkout widget with this order, and delivery only happens after
  // /api/checkout/verify confirms the payment signature server-side.
  return NextResponse.json({
    orderId: order.orderId,
    keyId: order.providerKeyId,
    amount: order.providerOrderPayload?.amount,
    currency: order.providerOrderPayload?.currency,
    ebookTitle: ebook.title,
  });
}
