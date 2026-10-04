import type { MetadataRoute } from "next";
import { catalogNodes, catalogProducts } from "@/data/catalog";
import { company } from "@/data/products";

export default function sitemap(): MetadataRoute.Sitemap {
  const base = company.siteUrl.replace(/\/$/, "");
  const now = new Date();

  const staticRoutes: MetadataRoute.Sitemap = [
    "",
    "/products",
    "/stores",
    "/corporate",
    "/about",
    "/projects",
    "/contact",
  ].map((path) => ({
    url: `${base}${path || "/"}`,
    lastModified: now,
    changeFrequency: path === "" ? "weekly" : "monthly",
    priority: path === "" ? 1 : 0.8,
  }));

  const categoryRoutes: MetadataRoute.Sitemap = catalogNodes.map((n) => ({
    url: `${base}/categories/${n.slug}`,
    lastModified: now,
    changeFrequency: "weekly",
    priority: n.depth === 0 ? 0.9 : n.depth === 1 ? 0.8 : 0.75,
  }));

  const productRoutes: MetadataRoute.Sitemap = catalogProducts.map((p) => ({
    url: `${base}/products/${p.slug}`,
    lastModified: now,
    changeFrequency: "monthly",
    priority: 0.7,
    images: p.images.slice(0, 3).map((src) => `${base}${src}`),
  }));

  return [...staticRoutes, ...categoryRoutes, ...productRoutes];
}
