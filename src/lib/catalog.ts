import "server-only";
import type { Product } from "@/types";
import { categories } from "@/data/categories";
import { TREND_ORDER } from "@/data/products";
import { store } from "./store";

export function getCatalogProducts(): Product[] {
  return store.getProducts();
}

export function getProductBySlug(slug: string): Product | undefined {
  return getCatalogProducts().find((product) => product.slug === slug);
}

export function getProductsByCategory(categorySlug: string): Product[] {
  return getCatalogProducts().filter((product) => product.categorySlug === categorySlug);
}

export function getFeaturedProducts(): Product[] {
  return getCatalogProducts().filter((product) => product.featured);
}

export function getPopularProducts(limit = 8): Product[] {
  return getCatalogProducts()
    .filter((product) => product.popular)
    .sort((a, b) => {
      const aIndex = TREND_ORDER.indexOf(a.slug);
      const bIndex = TREND_ORDER.indexOf(b.slug);
      return (aIndex === -1 ? Infinity : aIndex) - (bIndex === -1 ? Infinity : bIndex);
    })
    .slice(0, limit);
}

export function getRelatedProducts(product: Product, limit = 4): Product[] {
  const sameCategory = getCatalogProducts().filter(
    (candidate) => candidate.categorySlug === product.categorySlug && candidate.slug !== product.slug
  );
  const others = getCatalogProducts().filter(
    (candidate) => candidate.categorySlug !== product.categorySlug && candidate.slug !== product.slug
  );
  return [...sameCategory, ...others].slice(0, limit);
}

export function getCategoriesWithCounts() {
  return categories.map((category) => ({
    ...category,
    count: getProductsByCategory(category.slug).length,
  }));
}

export function getTotalProductCount(): number {
  return getCatalogProducts().length;
}

export function searchProducts(query: string): Product[] {
  const term = query.trim().toLowerCase();
  if (!term) return [];
  return getCatalogProducts()
    .filter((product) => {
      const haystack = [
        product.name,
        product.category,
        product.categorySlug,
        product.shortDescription,
        product.description,
        ...product.features,
      ]
        .join(" ")
        .toLowerCase();
      return haystack.includes(term);
    })
    .sort((a, b) => {
      const aName = a.name.toLowerCase();
      const bName = b.name.toLowerCase();
      if (aName.startsWith(term) && !bName.startsWith(term)) return -1;
      if (bName.startsWith(term) && !aName.startsWith(term)) return 1;
      return aName.localeCompare(bName);
    })
    .slice(0, 12);
}

export function getStartingPrice(product: Product): number | undefined {
  const prices = product.plans
    .map((plan) => plan.price)
    .filter((price): price is number => typeof price === "number");
  return prices.length ? Math.min(...prices) : undefined;
}

export function getStartingPlan(product: Product): Product["plans"][number] {
  const priced = product.plans.filter((plan) => typeof plan.price === "number");
  return priced.length
    ? priced.reduce((cheapest, plan) => ((plan.price ?? 0) < (cheapest.price ?? 0) ? plan : cheapest))
    : product.plans[0];
}
