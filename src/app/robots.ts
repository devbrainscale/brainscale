import { MetadataRoute } from "next";

export default function robots(): MetadataRoute.Robots {
  return {
    rules: { userAgent: "*", allow: "/", disallow: ["/results", "/fr/results", "/payment/", "/api/"] },
    sitemap: "https://www.brainscale.app/sitemap.xml",
  };
}

