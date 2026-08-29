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

export interface PaymentProvider {
  createOrder(input: CreateOrderInput): Promise<CreateOrderResult>;
}
