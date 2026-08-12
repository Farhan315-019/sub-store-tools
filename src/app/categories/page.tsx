import type { Metadata } from "next";
import { categories } from "@/data/categories";
import { CategoryCard } from "@/components/categories/CategoryCard";
import { Reveal } from "@/components/ui/Reveal";

export const metadata: Metadata = {
  title: "Categories | Digital Software Solutions",
  description:
    "Browse all Sub Store Tools categories — OTT Services, AI Tools, VPN & Proxy, Study & Professional, and Editing Software.",
  alternates: { canonical: "/categories" },
};

export default function CategoriesPage() {
  return (
    <>
      <section className="border-b border-border bg-background-elevated">
        <div className="container-x py-14 sm:py-16">
          <p className="text-sm font-semibold uppercase tracking-[0.18em] text-accent-text">
            Browse by Category
          </p>
          <h1 className="mt-3 font-display text-4xl font-extrabold text-foreground sm:text-5xl">
            Categories
          </h1>
          <p className="mt-4 max-w-2xl text-pretty text-base leading-relaxed text-muted">
            Five focused categories covering the digital tools and services you use every day.
            Choose a category to explore its full range of products.
          </p>
        </div>
      </section>
      <section className="container-x py-16 sm:py-20">
        <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
          {categories.map((category, index) => (
            <Reveal key={category.slug} delay={index * 0.05}>
              <CategoryCard category={category} />
            </Reveal>
          ))}
        </div>
      </section>
    </>
  );
}
