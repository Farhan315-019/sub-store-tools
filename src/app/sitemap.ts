import type { MetadataRoute } from "next";
import { allProducts } from "@/data/products";
import { categories } from "@/data/categories";
import { siteConfig } from "@/config/site";

export default function sitemap(): MetadataRoute.Sitemap {
  const staticRoutes = [
    "",
    "/products",
    "/categories",
    "/offers",
    "/reseller",
    "/login",
    "/signup",
    "/dashboard",
    "/about",
    "/contact",
    "/faq",
    "/privacy-policy",
    "/terms",
    "/refund-policy",
  ];

  const base = siteConfig.url.replace(/\/$/, "");

  const staticEntries: MetadataRoute.Sitemap = staticRoutes.map((route) => ({
    url: `${base}${route}`,
    lastModified: new Date(),
    changeFrequency: route === "" ? "weekly" : "monthly",
    priority: route === "" ? 1 : 0.7,
  }));

  const productEntries: MetadataRoute.Sitemap = allProducts.map((product) => ({
    url: `${base}/products/${product.slug}`,
    lastModified: new Date(),
    changeFrequency: "weekly",
    priority: 0.8,
  }));

  const categoryEntries: MetadataRoute.Sitemap = categories.map((category) => ({
    url: `${base}/categories/${category.slug}`,
    lastModified: new Date(),
    changeFrequency: "weekly",
    priority: 0.8,
  }));

  return [...staticEntries, ...productEntries, ...categoryEntries];
}
