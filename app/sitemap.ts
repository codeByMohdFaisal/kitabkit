import type { MetadataRoute } from "next";
import { getAllCategories, getAllEbooks } from "@/lib/ebooks";
import { siteConfig } from "@/lib/site";

export default function sitemap(): MetadataRoute.Sitemap {
  const staticRoutes: MetadataRoute.Sitemap = [
    { url: siteConfig.url, changeFrequency: "weekly", priority: 1 },
    { url: `${siteConfig.url}/ebooks`, changeFrequency: "weekly", priority: 0.9 },
    { url: `${siteConfig.url}/about`, changeFrequency: "monthly", priority: 0.5 },
    { url: `${siteConfig.url}/contact`, changeFrequency: "monthly", priority: 0.5 },
  ];

  const ebookRoutes: MetadataRoute.Sitemap = getAllEbooks().map((ebook) => ({
    url: `${siteConfig.url}/ebooks/${ebook.slug}`,
    lastModified: ebook.publishedAt,
    changeFrequency: "monthly",
    priority: 0.8,
  }));

  const categoryRoutes: MetadataRoute.Sitemap = getAllCategories().map((category) => ({
    url: `${siteConfig.url}/ebooks/category/${category.slug}`,
    changeFrequency: "weekly",
    priority: 0.6,
  }));

  return [...staticRoutes, ...ebookRoutes, ...categoryRoutes];
}
