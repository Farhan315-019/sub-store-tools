import { categories } from "@/data/categories";
import type { Product } from "@/types";

export function slugify(input: string): string {
  return input
    .toLowerCase()
    .trim()
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/^-+|-+$/g, "");
}

export function buildNewProduct(input: {
  name: string;
  categorySlug: string;
  price?: number;
  originalPrice?: number;
  duration?: string;
  badge?: string;
  image?: string;
  popular: boolean;
  featured: boolean;
  description: string;
}): Product {
  const category = categories.find((item) => item.slug === input.categorySlug) ?? categories[0];
  const slug = slugify(input.name) || `product-${Date.now()}`;
  const duration = input.duration?.trim();
  const description = input.description.trim() || input.name.trim();
  return {
    id: slug,
    slug,
    name: input.name.trim(),
    category: category.name,
    categorySlug: category.slug,
    shortDescription: description,
    description,
    features: [],
    plans:
      typeof input.price === "number" && input.price > 0
        ? [
            {
              id: `${slug}-plan`,
              name: duration || "Monthly",
              duration: duration || undefined,
              price: input.price,
              originalPrice:
                typeof input.originalPrice === "number" && input.originalPrice > input.price
                  ? input.originalPrice
                  : undefined,
            },
          ]
        : [],
    featured: input.featured,
    popular: input.popular,
    status: "available",
    badge: input.badge?.trim() || undefined,
    image: input.image?.trim() || undefined,
    deliveryTime: "Delivery within 24 hours of order confirmation",
    seoTitle: `${input.name.trim()} Subscription | ${category.name} — Sub Store Tools`,
    seoDescription: description,
  };
}
