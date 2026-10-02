import type { MetadataRoute } from "next";
import { company } from "@/data/products";

export default function robots(): MetadataRoute.Robots {
  const base = company.siteUrl.replace(/\/$/, "");
  return {
    rules: {
      userAgent: "*",
      allow: "/",
    },
    sitemap: `${base}/sitemap.xml`,
    host: base,
  };
}
