import { Resend } from "resend";
import type { Ebook } from "@/lib/types";
import { siteConfig } from "@/lib/site";

export type DeliveryResult = {
  downloadUrl: string;
  emailSent: boolean;
};

function absoluteDownloadUrl(ebook: Ebook): string {
  return new URL(ebook.fileUrl, siteConfig.url).toString();
}

function emailHtml(ebook: Ebook, downloadUrl: string): string {
  return `
    <div style="font-family: -apple-system, Helvetica, Arial, sans-serif; max-width: 480px; margin: 0 auto; color: #12291f;">
      <h1 style="color: #1b4332; font-size: 20px;">Thanks for your purchase!</h1>
      <p>Here's your download for <strong>${ebook.title}</strong>.</p>
      <p style="margin: 28px 0;">
        <a
          href="${downloadUrl}"
          style="background: #b25236; color: #fff; padding: 12px 24px; border-radius: 8px; text-decoration: none; font-weight: 600; display: inline-block;"
        >Download your ebook</a>
      </p>
      <p style="color: #555; font-size: 13px;">
        If the button doesn't work, copy this link into your browser:<br />
        <a href="${downloadUrl}" style="color: #355f46;">${downloadUrl}</a>
      </p>
      <p style="color: #888; font-size: 12px; margin-top: 32px;">${siteConfig.name}</p>
    </div>
  `;
}

/**
 * Delivers the ebook: always returns a download link, and additionally
 * emails it via Resend when RESEND_API_KEY is set. Call this only after the
 * payment provider has confirmed the order server-side — see
 * app/api/checkout/verify/route.ts.
 */
export async function deliverEbook(
  ebook: Ebook,
  buyerEmail: string
): Promise<DeliveryResult> {
  const downloadUrl = absoluteDownloadUrl(ebook);

  const apiKey = process.env.RESEND_API_KEY;
  if (!apiKey) {
    console.warn(
      "[delivery] RESEND_API_KEY not set — skipping email. See .env.example."
    );
    return { downloadUrl, emailSent: false };
  }

  const resend = new Resend(apiKey);
  const from = process.env.RESEND_FROM_EMAIL ?? `${siteConfig.name} <orders@kitabkit.com>`;

  const { error } = await resend.emails.send({
    from,
    to: buyerEmail,
    subject: `Your download: ${ebook.title}`,
    html: emailHtml(ebook, downloadUrl),
  });

  if (error) {
    console.error("[delivery] Resend failed to send email:", error);
    return { downloadUrl, emailSent: false };
  }

  return { downloadUrl, emailSent: true };
}
