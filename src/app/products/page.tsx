import type { Metadata } from "next";
import { BrowseProducts } from "@/components/home/BrowseProducts";
import { getCategoriesWithCounts, getTotalProductCount } from "@/data/products";

export const metadata: Metadata = {
  title: "All Products | Digital Software & Subscriptions",
  description:
    "Browse the full Sub Store Tools catalogue — streaming services, AI tools, VPNs, study platforms and editing software. Search, filter and order in minutes.",
  alternates: { canonical: "/products" },
};

export default function ProductsPage() {
  const categories = getCategoriesWithCounts();
  const totalProducts = getTotalProductCount();

  const stats = [
    { label: "Products", value: totalProducts },
    { label: "Categories", value: categories.length },
    { label: "Instant Delivery", value: "24/7" },
    { label: "Avg. Savings", value: "60%" },
  ];

  return (
    <>
      <section className="relative overflow-hidden border-b border-border bg-background-elevated">
        <div className="pointer-events-none absolute inset-0 bg-hero-grid bg-[size:24px_24px] opacity-40 [mask-image:radial-gradient(ellipse_at_top,black_20%,transparent_70%)]" />
        <div className="container-x relative py-16 sm:py-20">
          <p className="text-sm font-semibold uppercase tracking-[0.18em] text-accent-text">
            Full Catalogue
          </p>
          <h1 className="mt-3 font-display text-4xl font-extrabold text-foreground sm:text-5xl">
            All Products
          </h1>
          <p className="mt-4 max-w-2xl text-pretty text-base leading-relaxed text-muted">
            Discover premium digital services across {categories.length} categories. Use search and
            filters to find exactly what you need, then place your order in minutes.
          </p>
          <dl className="mt-10 grid max-w-2xl grid-cols-2 gap-px overflow-hidden rounded-2xl border border-border bg-border sm:grid-cols-4">
            {stats.map((stat) => (
              <div key={stat.label} className="bg-background-elevated px-5 py-4">
                <dt className="text-xs font-medium uppercase tracking-wide text-muted-2">
                  {stat.label}
                </dt>
                <dd className="mt-1 font-display text-xl font-bold text-foreground sm:text-2xl">
                  {stat.value}
                </dd>
              </div>
            ))}
          </dl>
        </div>
      </section>
      <BrowseProducts hideHeading pageSize={12} />
    </>
  );
}
