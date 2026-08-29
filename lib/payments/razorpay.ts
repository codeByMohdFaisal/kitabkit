import type { CreateOrderInput, CreateOrderResult, PaymentProvider } from "./types";

/**
 * INTEGRATION POINT — Razorpay (UPI-first, the natural choice for Indian buyers).
 *
 * To go live:
 *  1. Set RAZORPAY_KEY_ID / RAZORPAY_KEY_SECRET (server) and
 *     NEXT_PUBLIC_RAZORPAY_KEY_ID (client) — see .env.example.
 *  2. `npm install razorpay` and replace the body of createOrder below with
 *     a real `razorpay.orders.create(...)` call.
 *  3. On the client, load Razorpay's Checkout.js and open it with the
 *     `providerOrderPayload` this returns.
 *  4. Verify the payment signature in a webhook / server route before
 *     calling into `lib/delivery` — never deliver on the client's say-so.
 *
 * Until then, this stub simulates a successful order so the checkout UI and
 * post-purchase delivery flow can be built and tested end-to-end.
 */
export class RazorpayProvider implements PaymentProvider {
  async createOrder(input: CreateOrderInput): Promise<CreateOrderResult> {
    if (!process.env.RAZORPAY_KEY_ID || !process.env.RAZORPAY_KEY_SECRET) {
      console.warn(
        "[payments/razorpay] RAZORPAY_KEY_ID/SECRET not set — using a simulated order. " +
          "See lib/payments/razorpay.ts for how to go live."
      );
    }

    const orderId = `simulated_${input.ebookSlug}_${Date.now()}`;

    return {
      orderId,
      providerKeyId: process.env.NEXT_PUBLIC_RAZORPAY_KEY_ID,
      providerOrderPayload: {
        amount: input.amount * 100, // paise
        currency: input.currency,
        receipt: orderId,
      },
    };
  }
}
