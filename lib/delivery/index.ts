import type { Ebook } from "@/lib/types";

export type DeliveryResult = {
  downloadUrl: string;
  emailSent: boolean;
};

/**
 * INTEGRATION POINT — post-purchase delivery.
 *
 * Today: returns the ebook's static `fileUrl` and logs instead of emailing.
 * To go live, replace the body with, e.g.:
 *  - a signed/expiring download URL (S3, Vercel Blob, etc.) instead of a
 *    static public path, and
 *  - a real transactional email send (Resend, Postmark, SES...) with the
 *    link attached.
 *
 * Call this only after the payment provider (lib/payments) has confirmed
 * the order server-side — see app/api/checkout/route.ts.
 */
export async function deliverEbook(
  ebook: Ebook,
  buyerEmail: string
): Promise<DeliveryResult> {
  console.info(`[delivery] Would email ${ebook.fileUrl} to ${buyerEmail}.`);

  return {
    downloadUrl: ebook.fileUrl,
    emailSent: false,
  };
}
