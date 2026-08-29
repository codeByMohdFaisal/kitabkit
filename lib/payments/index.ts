import { RazorpayProvider } from "./razorpay";
import type { PaymentProvider } from "./types";

export * from "./types";

/** Single call site every checkout route goes through — swap the provider here. */
export const paymentProvider: PaymentProvider = new RazorpayProvider();
