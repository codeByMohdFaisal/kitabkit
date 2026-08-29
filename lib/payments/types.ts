export type CreateOrderInput = {
  ebookSlug: string;
  amount: number;
  currency: string;
  buyerName: string;
  buyerEmail: string;
};

export type CreateOrderResult = {
  orderId: string;
  /** Set once a real provider is wired in — used to open its checkout widget. */
  providerKeyId?: string;
  /** Present when the provider's checkout should run client-side (e.g. Razorpay Checkout.js). */
  providerOrderPayload?: Record<string, unknown>;
};

export type VerifyPaymentInput = {
  orderId: string;
  paymentId: string;
  signature: string;
};

/** The purchase details the provider trusted at order-creation time — never take these from the client at verify time. */
export type VerifiedOrder = {
  ebookSlug: string;
  buyerEmail: string;
};

export interface PaymentProvider {
  createOrder(input: CreateOrderInput): Promise<CreateOrderResult>;
  /** Confirms the payment signature and returns the order's original (server-trusted) details. Returns null if verification fails. */
  verifyPayment(input: VerifyPaymentInput): Promise<VerifiedOrder | null>;
}
