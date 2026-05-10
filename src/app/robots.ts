import { MetadataRoute } from "next";

export default function robots(): MetadataRoute.Robots {
  return {
    rules: { userAgent: "*", allow: "/", disallow: "/results" },
    sitemap: "https://www.brainscale.app/sitemap.xml",
  };
}

