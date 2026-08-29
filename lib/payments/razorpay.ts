import crypto from "node:crypto";
import Razorpay from "razorpay";
import type {
  CreateOrderInput,
  CreateOrderResult,
  PaymentProvider,
  VerifiedOrder,
  VerifyPaymentInput,
} from "./types";

function getClient(): Razorpay {
  const key_id = process.env.RAZORPAY_KEY_ID;
  const key_secret = process.env.RAZORPAY_KEY_SECRET;
  if (!key_id || !key_secret) {
    throw new Error(
      "RAZORPAY_KEY_ID / RAZORPAY_KEY_SECRET are not set. See .env.example."
    );
  }
  return new Razorpay({ key_id, key_secret });
}

export class RazorpayProvider implements PaymentProvider {
  async createOrder(input: CreateOrderInput): Promise<CreateOrderResult> {
    const client = getClient();

    const order = await client.orders.create({
      amount: Math.round(input.amount * 100), // paise
      currency: input.currency,
      receipt: `${input.ebookSlug}_${Date.now()}`,
      // Trusted source of truth for what was actually purchased — read back
      // in verifyPayment rather than trusting anything the client sends then.
      notes: {
        ebookSlug: input.ebookSlug,
        buyerEmail: input.buyerEmail,
      },
    });

    return {
      orderId: order.id,
      providerKeyId: process.env.NEXT_PUBLIC_RAZORPAY_KEY_ID,
      providerOrderPayload: {
        amount: order.amount,
        currency: order.currency,
      },
    };
  }

  async verifyPayment(input: VerifyPaymentInput): Promise<VerifiedOrder | null> {
    const key_secret = process.env.RAZORPAY_KEY_SECRET;
    if (!key_secret) {
      throw new Error("RAZORPAY_KEY_SECRET is not set. See .env.example.");
    }

    const expected = crypto
      .createHmac("sha256", key_secret)
      .update(`${input.orderId}|${input.paymentId}`)
      .digest("hex");

    const expectedBuf = Buffer.from(expected, "hex");
    const actualBuf = Buffer.from(input.signature, "hex");
    if (
      expectedBuf.length !== actualBuf.length ||
      !crypto.timingSafeEqual(expectedBuf, actualBuf)
    ) {
      return null;
    }

    const client = getClient();
    const order = await client.orders.fetch(input.orderId);
    if (order.status !== "paid") {
      return null;
    }

    const ebookSlug = order.notes?.ebookSlug;
    const buyerEmail = order.notes?.buyerEmail;
    if (typeof ebookSlug !== "string" || typeof buyerEmail !== "string") {
      return null;
    }

    return { ebookSlug, buyerEmail };
  }
}
