import type { Category, Product } from "@/types";
import { categories } from "@/data/categories";
import { ottProducts } from "./ott";
import { aiProducts } from "./ai";
import { vpnProducts } from "./vpn";
import { studyProducts } from "./study";
import { editingProducts } from "./editing";

const MIN_PRICE = 500;
const MAX_PRICE = 3000;
const MIN_DISCOUNT = 50;
const MAX_DISCOUNT = 80;

function seededRandom(seed: string): number {
  let hash = 2166136261;
  for (let i = 0; i < seed.length; i++) {
    hash ^= seed.charCodeAt(i);
    hash = Math.imul(hash, 16777619);
  }
  return (hash >>> 0) / 4294967296;
}

function roundToFifty(value: number): number {
  return Math.round(value / 50) * 50;
}

function enrichProductWithPricing(product: Product): Product {
  return {
    ...product,
    plans: product.plans.map((plan) => {
      if (typeof plan.price === "number") {
        if (typeof plan.originalPrice === "number") return plan;
        const discountKey = `${product.id}:${plan.name}:discount`;
        const discount = MIN_DISCOUNT + Math.round(seededRandom(discountKey) * (MAX_DISCOUNT - MIN_DISCOUNT));
        const originalPrice = roundToFifty(plan.price / (1 - discount / 100));
        return { ...plan, originalPrice };
      }
      if (plan.note) return plan;
      const priceKey = `${product.id}:${plan.name}`;
      const discountKey = `${product.id}:${plan.name}:discount`;
      const price = roundToFifty(
        MIN_PRICE + seededRandom(priceKey) * (MAX_PRICE - MIN_PRICE)
      );
      const discount = MIN_DISCOUNT + Math.round(seededRandom(discountKey) * (MAX_DISCOUNT - MIN_DISCOUNT));
      const originalPrice = roundToFifty(price / (1 - discount / 100));
      return { ...plan, price, originalPrice };
    }),
  };
}

export const allProducts: Product[] = [
  ...ottProducts,
  ...aiProducts,
  ...vpnProducts,
  ...studyProducts,
  ...editingProducts,
].map(enrichProductWithPricing);

export function getProductBySlug(slug: string): Product | undefined {
  return allProducts.find((product) => product.slug === slug);
}

export function getProductsByCategory(categorySlug: string): Product[] {
  return allProducts.filter((product) => product.categorySlug === categorySlug);
}

export function getFeaturedProducts(): Product[] {
  return allProducts.filter((product) => product.featured);
}

export function getPopularProducts(limit = 8): Product[] {
  return allProducts.filter((product) => product.popular).slice(0, limit);
}

export function getRelatedProducts(product: Product, limit = 4): Product[] {
  const sameCategory = allProducts.filter(
    (candidate) => candidate.categorySlug === product.categorySlug && candidate.slug !== product.slug
  );
  const others = allProducts.filter(
    (candidate) => candidate.categorySlug !== product.categorySlug && candidate.slug !== product.slug
  );
  return [...sameCategory, ...others].slice(0, limit);
}

export function getCategoryWithCount(category: Category): Category & { count: number } {
  return {
    ...category,
    count: getProductsByCategory(category.slug).length,
  };
}

export function getCategoriesWithCounts(): Array<Category & { count: number }> {
  return categories.map(getCategoryWithCount);
}

export function getTotalProductCount(): number {
  return allProducts.length;
}

export function searchProducts(query: string): Product[] {
  const term = query.trim().toLowerCase();
  if (!term) return [];
  return allProducts
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
