import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { getCategoryBySlug } from "@/data/categories";
import { getCategoryColor } from "@/lib/categoryColors";
import { getCategoriesWithCounts, getProductsByCategory, getTotalProductCount } from "@/data/products";
import { siteConfig } from "@/config/site";
import { ProductGrid } from "@/components/products/ProductGrid";
import { Breadcrumbs } from "@/components/products/Breadcrumbs";
import { Accordion } from "@/components/ui/Accordion";
import { productFaq } from "@/data/faq";
import { cn } from "@/lib/utils";

type CategoryPageProps = {
  params: Promise<{ slug: string }>;
};

export function generateStaticParams() {
  return [
    { slug: "ott-services" },
    { slug: "ai-tools" },
    { slug: "vpn-proxy" },
    { slug: "study-professional" },
    { slug: "editing-software" },
  ];
}

export async function generateMetadata({ params }: CategoryPageProps): Promise<Metadata> {
  const { slug } = await params;
  const category = getCategoryBySlug(slug);
  if (!category) return {};
  return {
    title: category.seoTitle,
    description: category.seoDescription,
    alternates: { canonical: `/categories/${category.slug}` },
    openGraph: {
      title: category.seoTitle,
      description: category.seoDescription,
      url: `/categories/${category.slug}`,
    },
    twitter: {
      card: "summary",
      title: category.seoTitle,
      description: category.seoDescription,
    },
  };
}

export default async function CategoryPage({ params }: CategoryPageProps) {
  const { slug } = await params;
  const category = getCategoryBySlug(slug);
  if (!category) notFound();

  const products = getProductsByCategory(category.slug);

  const breadcrumbJsonLd = {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: [
      { "@type": "ListItem", position: 1, name: "Home", item: siteConfig.url },
      { "@type": "ListItem", position: 2, name: "Categories", item: `${siteConfig.url}/categories` },
      {
        "@type": "ListItem",
        position: 3,
        name: category.name,
        item: `${siteConfig.url}/categories/${category.slug}`,
      },
    ],
  };

  return (
    <div className="container-x py-10 sm:py-14">
      <Breadcrumbs
        items={[
          { label: "Home", href: "/" },
          { label: "Categories", href: "/categories" },
          { label: category.name },
        ]}
      />

      <header className="max-w-3xl">
        <p className="text-sm font-semibold uppercase tracking-[0.18em] text-accent-text">
          Category
        </p>
        <h1 className="mt-3 font-display text-4xl font-extrabold text-foreground sm:text-5xl">
          {category.name}
        </h1>
        <p className="mt-4 text-pretty text-base leading-relaxed text-muted sm:text-lg">
          {category.description}
        </p>
        <p className="mt-4 text-sm font-medium text-muted">
          {products.length} product{products.length === 1 ? "" : "s"} available
        </p>
      </header>

      <div className="mt-8 flex flex-wrap gap-2" role="group" aria-label="Browse other categories">
        <Link
          href="/products"
          className={cn(
            "inline-flex items-center gap-1.5 rounded-full border px-4 py-2 text-sm font-medium transition-all",
            false
              ? "border-accent/50 bg-accent text-accent-foreground"
              : "border-border bg-surface text-muted hover:border-border-strong hover:text-foreground"
          )}
        >
          All Products
          <span className="text-xs text-muted-2">({getTotalProductCount()})</span>
        </Link>
        {getCategoriesWithCounts().map((other) => {
          const active = other.slug === category.slug;
          const color = getCategoryColor(other.slug);
          return (
            <Link
              key={other.slug}
              href={`/categories/${other.slug}`}
              className={cn(
                "inline-flex items-center gap-1.5 rounded-full border px-4 py-2 text-sm font-medium transition-all",
                active
                  ? cn("border-transparent", color.chip)
                  : "border-border bg-surface text-muted hover:border-border-strong hover:text-foreground"
              )}
              aria-current={active ? "page" : undefined}
            >
              <span className={cn("size-1.5 rounded-full", color.dot)} aria-hidden="true" />
              {other.name}
              <span className={cn("text-xs", active ? "opacity-80" : "text-muted-2")}>
                ({other.count})
              </span>
            </Link>
          );
        })}
      </div>

      <div className="mt-12">
        <ProductGrid products={products} />
      </div>

      <div className="mt-20 border-t border-border pt-14">
        <div className="max-w-3xl">
          <h2 className="font-display text-2xl font-bold text-foreground">
            {category.name} — Useful Things to Know
          </h2>
          <p className="mt-3 text-sm leading-relaxed text-muted">
            Ordering digital services from this category is simple. Pick a product, choose a plan
            and send your order — our team confirms the details before processing.
          </p>
          <div className="mt-8">
            <Accordion items={productFaq.slice(0, 4)} />
          </div>
        </div>
      </div>

      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbJsonLd) }}
      />
    </div>
  );
}
