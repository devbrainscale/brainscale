import { MetadataRoute } from "next";
import { articles as frArticles } from "./fr/blog/data";
import { articles as enArticles } from "./blog/data";

export default function sitemap(): MetadataRoute.Sitemap {
  const frBlogUrls: MetadataRoute.Sitemap = frArticles.map((a) => ({
    url: `https://www.brainscale.app/fr/blog/${a.slug}`,
    lastModified: new Date(a.publishedAt),
    changeFrequency: "monthly" as const,
    priority: 0.75,
  }));

  const enBlogUrls: MetadataRoute.Sitemap = enArticles.map((a) => ({
    url: `https://www.brainscale.app/blog/${a.slug}`,
    lastModified: new Date(a.publishedAt),
    changeFrequency: "monthly" as const,
    priority: 0.8,
  }));

  return [
    // ── English ──────────────────────────────────────────────
    {
      url: "https://www.brainscale.app",
      lastModified: new Date(),
      changeFrequency: "weekly",
      priority: 1,
    },
    {
      url: "https://www.brainscale.app/test",
      lastModified: new Date(),
      changeFrequency: "monthly",
      priority: 0.9,
    },
    {
      url: "https://www.brainscale.app/blog",
      lastModified: new Date(),
      changeFrequency: "weekly",
      priority: 0.85,
    },
    {
      url: "https://www.brainscale.app/about",
      lastModified: new Date(),
      changeFrequency: "monthly",
      priority: 0.7,
    },
    {
      url: "https://www.brainscale.app/privacy",
      lastModified: new Date(),
      changeFrequency: "yearly",
      priority: 0.3,
    },
    {
      url: "https://www.brainscale.app/terms",
      lastModified: new Date(),
      changeFrequency: "yearly",
      priority: 0.3,
    },
    // ── Français ─────────────────────────────────────────────
    {
      url: "https://www.brainscale.app/fr",
      lastModified: new Date(),
      changeFrequency: "weekly",
      priority: 1,
    },
    {
      url: "https://www.brainscale.app/fr/test",
      lastModified: new Date(),
      changeFrequency: "monthly",
      priority: 0.9,
    },
    {
      url: "https://www.brainscale.app/fr/blog",
      lastModified: new Date(),
      changeFrequency: "weekly",
      priority: 0.8,
    },
    ...enBlogUrls,
    ...frBlogUrls,
  ];
}

