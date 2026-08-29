import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  images: {
    // Local, self-authored placeholder covers are served as SVG. This is
    // safe only because /public/covers is our own static content, not
    // user-uploaded — never enable this for untrusted/remote SVG sources.
    dangerouslyAllowSVG: true,
    contentDispositionType: "attachment",
    contentSecurityPolicy: "default-src 'self'; script-src 'none'; sandbox;",
  },
};

export default nextConfig;
