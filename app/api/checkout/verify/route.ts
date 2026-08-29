import { NextResponse } from "next/server";
import { getEbookBySlug } from "@/lib/ebooks";
import { paymentProvider } from "@/lib/payments";
import { deliverEbook } from "@/lib/delivery";
import { siteConfig } from "@/lib/site";

type VerifyRequest = {
  razorpay_order_id: string;
  razorpay_payment_id: string;
  razorpay_signature: string;
};

export async function POST(request: Request) {
  if (!siteConfig.paymentsEnabled) {
    return NextResponse.json(
      { error: "Checkout is not open yet." },
      { status: 403 }
    );
  }

  let body: VerifyRequest;
  try {
    body = await request.json();
  } catch {
    return NextResponse.json({ error: "Invalid request body." }, { status: 400 });
  }

  const { razorpay_order_id, razorpay_payment_id, razorpay_signature } = body;
  if (!razorpay_order_id || !razorpay_payment_id || !razorpay_signature) {
    return NextResponse.json({ error: "Missing payment details." }, { status: 400 });
  }

  const verified = await paymentProvider.verifyPayment({
    orderId: razorpay_order_id,
    paymentId: razorpay_payment_id,
    signature: razorpay_signature,
  });

  if (!verified) {
    return NextResponse.json({ error: "Payment could not be verified." }, { status: 400 });
  }

  const ebook = getEbookBySlug(verified.ebookSlug);
  if (!ebook) {
    return NextResponse.json({ error: "Ebook not found." }, { status: 404 });
  }

  const delivery = await deliverEbook(ebook, verified.buyerEmail);

  return NextResponse.json({ downloadUrl: delivery.downloadUrl });
}
