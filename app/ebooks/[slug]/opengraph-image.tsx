import { ImageResponse } from "next/og";
import { getAllEbooks, getEbookBySlug } from "@/lib/ebooks";
import { languageLabels, formatPrice } from "@/lib/site";

export const size = { width: 1200, height: 630 };
export const contentType = "image/png";
export const alt = "Ebook cover and pricing";

export function generateStaticParams() {
  return getAllEbooks().map((ebook) => ({ slug: ebook.slug }));
}

export default async function OgImage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const ebook = getEbookBySlug(slug);

  return new ImageResponse(
    (
      <div
        style={{
          width: "100%",
          height: "100%",
          display: "flex",
          flexDirection: "column",
          justifyContent: "space-between",
          padding: 64,
          background: "linear-gradient(135deg, #1b4332 0%, #2c4c3a 100%)",
          color: "white",
          fontFamily: "sans-serif",
        }}
      >
        <div
          style={{
            display: "flex",
            alignSelf: "flex-start",
            fontSize: 20,
            fontWeight: 700,
            letterSpacing: 2,
            color: "#eea27c",
            textTransform: "uppercase",
          }}
        >
          Kitab Kit
        </div>
        <div style={{ display: "flex", flexDirection: "column", gap: 16, maxWidth: 900 }}>
          <div style={{ display: "flex", fontSize: 56, fontWeight: 700, lineHeight: 1.15 }}>
            {ebook?.title ?? "Practical Ebooks for Small Businesses"}
          </div>
          <div style={{ display: "flex", fontSize: 26, color: "#d3dfca" }}>
            {ebook?.tagline ?? ""}
          </div>
        </div>
        <div style={{ display: "flex", alignItems: "center", gap: 20 }}>
          {ebook && (
            <>
              <div
                style={{
                  display: "flex",
                  background: "#cb6843",
                  padding: "12px 28px",
                  borderRadius: 999,
                  fontSize: 28,
                  fontWeight: 700,
                }}
              >
                {formatPrice(ebook.price, ebook.currency)}
              </div>
              <div
                style={{
                  display: "flex",
                  background: "rgba(255,255,255,0.12)",
                  padding: "12px 28px",
                  borderRadius: 999,
                  fontSize: 22,
                }}
              >
                {languageLabels[ebook.language] ?? ebook.language}
              </div>
            </>
          )}
        </div>
      </div>
    ),
    { ...size }
  );
}
