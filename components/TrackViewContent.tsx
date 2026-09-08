"use client";

import { useEffect } from "react";

declare global {
  interface Window {
    fbq?: (...args: any[]) => void;
  }
}

type TrackViewContentProps = {
  slug: string;
  title: string;
  price: number;
  currency: string;
};

export function TrackViewContent({
  slug,
  title,
  price,
  currency,
}: TrackViewContentProps) {
  useEffect(() => {
    const trackEvent = () => {
      if (window.fbq) {
        window.fbq("track", "ViewContent", {
          content_ids: [slug],
          content_name: title,
          content_type: "product",
          value: price,
          currency,
        });
      }
    };

    // Give the Meta Pixel time to load.
    const timeout = setTimeout(trackEvent, 300);

    return () => clearTimeout(timeout);
  }, [slug, title, price, currency]);

  return null;
}
