"use client";

import { ArrowRight, Search } from "lucide-react";
import Link from "next/link";
import { useEffect, useMemo, useState } from "react";
import type { Product } from "@/types";
import { categories } from "@/data/categories";
import { getCategoryColor } from "@/lib/categoryColors";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { ProductCard } from "@/components/products/ProductCard";
import { EmptyState } from "@/components/ui/EmptyState";
import { cn } from "@/lib/utils";

const filterOptions = [
  { label: "All", value: "all", color: null },
  ...categories.map((category) => ({
    label: category.name,
    value: category.slug,
    color: getCategoryColor(category.slug),
  })),
];

type BrowseProductsProps = {
  hideHeading?: boolean;
  limit?: number;
  pageSize?: number;
};

export function BrowseProducts({ hideHeading = false, limit, pageSize }: BrowseProductsProps) {
  const [products, setProducts] = useState<Product[]>([]);
  const [loaded, setLoaded] = useState(false);
  const [loadError, setLoadError] = useState("");
  const [query, setQuery] = useState("");
  const [filter, setFilter] = useState("all");
  const [visibleCount, setVisibleCount] = useState(pageSize ?? Infinity);

  useEffect(() => {
    let cancelled = false;
    fetch("/api/store/products", { cache: "no-store" })
      .then((res) => res.json())
      .then((json: { products?: Product[] }) => {
        if (!cancelled) {
          setProducts(json.products ?? []);
          setLoaded(true);
        }
      })
      .catch(() => {
        if (!cancelled) {
          setLoadError("Could not load products. Please try again.");
          setLoaded(true);
        }
      });
    return () => {
      cancelled = true;
    };
  }, []);

  const matches = useMemo(() => {
    const term = query.trim().toLowerCase();
    return products.filter((product) => {
      const matchesCategory = filter === "all" || product.categorySlug === filter;
      if (!matchesCategory) return false;
      if (!term) return true;
      return [product.name, product.category, product.shortDescription]
        .join(" ")
        .toLowerCase()
        .includes(term);
    });
  }, [products, query, filter]);

  const shown = limit ? matches.slice(0, limit) : matches.slice(0, visibleCount);
  const hasMore =
    (typeof limit === "number" && matches.length > limit) ||
    (typeof pageSize === "number" && matches.length > visibleCount);

  return (
    <section className="container-x py-20 sm:py-24">
      {!hideHeading ? (
        <SectionHeading
          eyebrow="Full Catalogue"
          title="Browse All Products"
          subtitle="Search the entire catalogue, filter by category and find the perfect digital service for you."
        />
      ) : null}

      <div className="mx-auto mt-10 max-w-xl">
        <div className="flex items-center gap-3 rounded-full border border-border bg-surface px-5 focus-within:border-accent/60 focus-within:ring-2 focus-within:ring-accent/20">
          <Search className="size-4 shrink-0 text-muted" aria-hidden="true" />
          <input
            type="search"
            value={query}
            onChange={(event) => setQuery(event.target.value)}
            placeholder="Search products..."
            aria-label="Search products"
            className="h-12 w-full bg-transparent text-sm text-foreground placeholder:text-muted-2 focus:outline-none"
          />
        </div>
      </div>

      <div className="mt-6 flex flex-wrap justify-center gap-2" role="group" aria-label="Filter by category">
        {filterOptions.map((option) => {
          const active = filter === option.value;
          return (
            <button
              key={option.value}
              type="button"
              onClick={() => setFilter(option.value)}
              className={cn(
                "inline-flex items-center gap-1.5 rounded-full border px-4 py-2 text-sm font-medium transition-all",
                active
                  ? option.color
                    ? cn("border-transparent", option.color.chip)
                    : "border-accent/50 bg-accent text-accent-foreground"
                  : "border-border bg-surface text-muted hover:border-border-strong hover:text-foreground"
              )}
              aria-pressed={active}
            >
              {option.color ? (
                <span className={cn("size-1.5 rounded-full", option.color.dot)} aria-hidden="true" />
              ) : null}
              {option.label}
            </button>
          );
        })}
      </div>

      <div className="mt-10">
        {!loaded ? (
          <p className="py-10 text-center text-sm text-muted">Loading products...</p>
        ) : loadError ? (
          <EmptyState message={loadError} hint="Refresh the page to try again." />
        ) : shown.length === 0 ? (
          <EmptyState
            message="No products match your search"
            hint="Try a different keyword or clear the category filter."
          />
        ) : (
          <>
            <p className="mb-5 text-sm text-muted" aria-live="polite">
              Showing {shown.length} product{shown.length === 1 ? "" : "s"}
              {hasMore ? ` of ${matches.length}` : ""}
            </p>
            <div className="grid grid-cols-3 gap-2 sm:gap-3 lg:gap-5">
              {shown.map((product) => (
                <ProductCard key={product.id} product={product} />
              ))}
            </div>

            {hasMore ? (
              <div className="mt-12 text-center">
                {typeof limit === "number" ? (
                  <>
                    <Link
                      href="/products"
                      className="inline-flex h-12 items-center gap-2 rounded-full bg-accent px-7 text-sm font-semibold text-accent-foreground transition-all hover:bg-accent-strong hover:shadow-glow active:scale-[0.98]"
                    >
                      See All Products
                      <ArrowRight className="size-4" aria-hidden="true" />
                    </Link>
                    <p className="mt-3 text-xs text-muted-2">
                      Browse the complete catalogue of {products.length} products on the products page.
                    </p>
                  </>
                ) : (
                  <button
                    type="button"
                    onClick={() => setVisibleCount((count) => count + (pageSize ?? 12))}
                    className="inline-flex h-12 items-center gap-2 rounded-full border border-border bg-surface px-7 text-sm font-semibold text-foreground transition-all hover:border-accent/50 hover:text-accent-text active:scale-[0.98]"
                  >
                    Load More Products
                    <ArrowRight className="size-4" aria-hidden="true" />
                  </button>
                )}
              </div>
            ) : null}
          </>
        )}
      </div>
    </section>
  );
}
