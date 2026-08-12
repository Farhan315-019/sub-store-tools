import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { Clock, HelpCircle, MessageCircle, ShieldCheck, Truck } from "lucide-react";
import { allProducts, getProductBySlug, getRelatedProducts } from "@/data/products";
import { getCategoryBySlug } from "@/data/categories";
import { productFaq } from "@/data/faq";
import { siteConfig } from "@/config/site";
import { buildContactLink } from "@/lib/order";
import { ProductImage } from "@/components/products/ProductImage";
import { ProductBadge } from "@/components/products/ProductBadge";
import { Breadcrumbs } from "@/components/products/Breadcrumbs";
import { PlanSelector } from "@/components/products/PlanSelector";
import { ProductGrid } from "@/components/products/ProductGrid";
import { StatusBadge } from "@/components/ui/Badge";
import { Accordion } from "@/components/ui/Accordion";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { Reveal } from "@/components/ui/Reveal";

type ProductPageProps = {
  params: Promise<{ slug: string }>;
};

export function generateStaticParams() {
  return allProducts.map((product) => ({ slug: product.slug }));
}

export async function generateMetadata({ params }: ProductPageProps): Promise<Metadata> {
  const { slug } = await params;
  const product = getProductBySlug(slug);
  if (!product) return {};
  const category = getCategoryBySlug(product.categorySlug);
  return {
    title: product.seoTitle,
    description: product.seoDescription,
    alternates: { canonical: `/products/${product.slug}` },
    openGraph: {
      title: product.seoTitle,
      description: product.seoDescription,
      url: `/products/${product.slug}`,
      type: "website",
    },
    twitter: {
      card: "summary",
      title: product.seoTitle,
      description: product.seoDescription,
    },
    keywords: [product.name, category?.name ?? product.category, "subscription", "buy online"],
  };
}

export default async function ProductPage({ params }: ProductPageProps) {
  const { slug } = await params;
  const product = getProductBySlug(slug);
  if (!product) notFound();

  const category = getCategoryBySlug(product.categorySlug);
  const related = getRelatedProducts(product);

  const breadcrumbJsonLd = {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: [
      { "@type": "ListItem", position: 1, name: "Home", item: siteConfig.url },
      {
        "@type": "ListItem",
        position: 2,
        name: category?.name ?? product.category,
        item: `${siteConfig.url}/categories/${product.categorySlug}`,
      },
      {
        "@type": "ListItem",
        position: 3,
        name: product.name,
        item: `${siteConfig.url}/products/${product.slug}`,
      },
    ],
  };

  const productJsonLd = {
    "@context": "https://schema.org",
    "@type": "Product",
    name: product.name,
    description: product.shortDescription,
    category: product.category,
    brand: { "@type": "Brand", name: siteConfig.name },
    url: `${siteConfig.url}/products/${product.slug}`,
    offers: {
      "@type": "Offer",
      url: `${siteConfig.url}/products/${product.slug}`,
      availability:
        product.status === "available" || product.status === "limited"
          ? "https://schema.org/InStock"
          : "https://schema.org/OutOfStock",
      seller: { "@type": "Organization", name: siteConfig.name },
    },
  };

  return (
    <div className="container-x py-10 sm:py-14">
      <Breadcrumbs
        items={[
          { label: "Home", href: "/" },
          { label: "Products", href: "/products" },
          { label: category?.name ?? product.category, href: `/categories/${product.categorySlug}` },
          { label: product.name },
        ]}
      />

      <div className="grid gap-8 lg:grid-cols-[1fr_22rem] lg:items-start">
        <div>
          <Reveal>
            <div className="relative overflow-hidden rounded-card-lg border border-border bg-surface-2">
              <ProductImage
                product={product}
                priority
                className="aspect-[16/8] w-full object-cover"
              />
            </div>
          </Reveal>

          <Reveal>
            <div className="mt-6 flex flex-wrap items-center gap-4">
              <div className="min-w-0">
                <div className="flex flex-wrap items-center gap-2">
                  <h1 className="font-display text-3xl font-extrabold text-foreground sm:text-4xl">
                    {product.name}
                  </h1>
                  {product.badge ? <ProductBadge label={product.badge} /> : null}
                </div>
                <p className="mt-1 text-sm font-medium uppercase tracking-wider text-muted-2">
                  {product.category}
                </p>
              </div>
              <div className="ml-auto">
                <StatusBadge status={product.status} />
              </div>
            </div>
          </Reveal>

          <Reveal delay={0.08}>
            <p className="mt-6 text-pretty text-base leading-relaxed text-muted sm:text-lg">
              {product.description}
            </p>
          </Reveal>

          <Reveal delay={0.14}>
            <div className="mt-8">
              <h2 className="font-display text-xl font-bold text-foreground">Key Features</h2>
              <ul className="mt-4 grid gap-3 sm:grid-cols-2">
                {product.features.map((feature) => (
                  <li
                    key={feature}
                    className="flex items-start gap-2.5 rounded-xl border border-border bg-surface px-4 py-3 text-sm text-foreground"
                  >
                    <span className="mt-0.5 grid size-4 shrink-0 place-items-center rounded-full bg-accent-soft">
                      <span className="size-1.5 rounded-full bg-accent" aria-hidden="true" />
                    </span>
                    {feature}
                  </li>
                ))}
              </ul>
            </div>
          </Reveal>

          <Reveal delay={0.18}>
            <div className="mt-8 grid gap-4 sm:grid-cols-2">
              <div className="rounded-card border border-border bg-surface p-5">
                <div className="flex items-center gap-2 text-accent-text">
                  <Clock className="size-4" aria-hidden="true" />
                  <h3 className="text-sm font-semibold text-foreground">Delivery Information</h3>
                </div>
                <p className="mt-2.5 text-sm leading-relaxed text-muted">
                  {product.deliveryTime ?? "Delivery time is confirmed when your order is placed."}
                </p>
              </div>
              <div className="rounded-card border border-border bg-surface p-5">
                <div className="flex items-center gap-2 text-accent-text">
                  <Truck className="size-4" aria-hidden="true" />
                  <h3 className="text-sm font-semibold text-foreground">How It Works</h3>
                </div>
                <p className="mt-2.5 text-sm leading-relaxed text-muted">
                  Choose your plan, place an order via WhatsApp or email, and our team confirms the
                  details before processing.
                </p>
              </div>
            </div>
          </Reveal>
        </div>

        <div className="lg:sticky lg:top-28">
          <PlanSelector product={product} />

          <div className="mt-4 rounded-card border border-border bg-surface p-5">
            <div className="flex items-start gap-3">
              <div className="grid size-10 shrink-0 place-items-center rounded-xl border border-border bg-surface-2 text-accent-text">
                <HelpCircle className="size-4" aria-hidden="true" />
              </div>
              <div>
                <h3 className="text-sm font-semibold text-foreground">Need help choosing?</h3>
                <p className="mt-1 text-xs leading-relaxed text-muted">
                  Not sure which plan fits? Message us and we&apos;ll help you decide.
                </p>
                <a
                  href={buildContactLink()}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="mt-3 inline-flex items-center gap-1.5 text-xs font-semibold text-accent-text"
                >
                  <MessageCircle className="size-3.5" aria-hidden="true" />
                  Chat with us
                </a>
              </div>
            </div>
          </div>
        </div>
      </div>

      <div className="mt-14">
        <SectionHeading
          align="left"
          eyebrow="Good to Know"
          title="Product Questions"
          subtitle="Answers to common questions about ordering and delivery."
        />
        <div className="mt-8 max-w-3xl">
          <Accordion items={productFaq.slice(0, 5)} />
        </div>
      </div>

      <div className="mt-16 border-t border-border pt-14">
        <div className="mb-8 flex items-end justify-between">
          <SectionHeading
            align="left"
            eyebrow="You May Also Like"
            title="Related Products"
          />
          <Link
            href="/products"
            className="hidden text-sm font-semibold text-accent-text hover:underline sm:inline-flex"
          >
            View all products
          </Link>
        </div>
        <ProductGrid products={related} />
      </div>

      <div className="mt-16 rounded-card-lg border border-border bg-background-elevated p-6 sm:p-8">
        <div className="grid gap-6 sm:grid-cols-3">
          <div className="flex items-start gap-3">
            <ShieldCheck className="mt-0.5 size-5 shrink-0 text-accent-text" aria-hidden="true" />
            <div>
              <h3 className="text-sm font-semibold text-foreground">Clear Policies</h3>
              <p className="mt-1 text-xs leading-relaxed text-muted">
                Transparent refund and replacement policies explained on our Refund Policy page.
              </p>
            </div>
          </div>
          <div className="flex items-start gap-3">
            <MessageCircle className="mt-0.5 size-5 shrink-0 text-accent-text" aria-hidden="true" />
            <div>
              <h3 className="text-sm font-semibold text-foreground">Human Support</h3>
              <p className="mt-1 text-xs leading-relaxed text-muted">
                Reach a real person on WhatsApp or email whenever you need assistance.
              </p>
            </div>
          </div>
          <div className="flex items-start gap-3">
            <Clock className="mt-0.5 size-5 shrink-0 text-accent-text" aria-hidden="true" />
            <div>
              <h3 className="text-sm font-semibold text-foreground">Fast Delivery</h3>
              <p className="mt-1 text-xs leading-relaxed text-muted">
                Most orders are delivered within hours of confirmation.
              </p>
            </div>
          </div>
        </div>
      </div>

      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify([breadcrumbJsonLd, productJsonLd]) }}
      />
    </div>
  );
}
