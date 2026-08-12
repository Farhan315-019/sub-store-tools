import Link from "next/link";
import { ArrowRight, BadgeCheck, Clock, Headphones, Tag } from "lucide-react";
import { ButtonLink } from "@/components/ui/Button";
import { Reveal } from "@/components/ui/Reveal";
import { ProductIcon } from "@/components/products/ProductIcon";
import { HeroTitle } from "./HeroTitle";
import { TypewriterParagraph } from "./TypewriterParagraph";
import { getProductBySlug } from "@/data/products";

const trustItems = [
  { icon: Clock, label: "Fast Delivery" },
  { icon: Headphones, label: "Customer Support" },
  { icon: Tag, label: "Competitive Pricing" },
  { icon: BadgeCheck, label: "Trusted Service" },
];

const floaters = [
  { slug: "netflix", className: "left-[4%] top-24 animate-float", delay: "0s" },
  { slug: "chatgpt-plus", className: "right-[5%] top-32 animate-float-slow", delay: "0.6s" },
  { slug: "canva", className: "left-[8%] bottom-16 animate-float-slow", delay: "1.2s" },
  { slug: "nordvpn", className: "right-[9%] bottom-24 animate-float", delay: "0.9s" },
];

export function Hero() {
  return (
    <section className="relative overflow-hidden">
      <div className="absolute inset-0 bg-grid" aria-hidden="true" />
      <div
        className="absolute left-1/2 top-[-12rem] h-[30rem] w-[52rem] -translate-x-1/2 rounded-full bg-accent/15 blur-[140px]"
        aria-hidden="true"
      />
      <div
        className="absolute bottom-[-14rem] right-[-10rem] h-[26rem] w-[26rem] rounded-full bg-accent/10 blur-[130px]"
        aria-hidden="true"
      />

      {floaters.map((floater) => {
        const product = getProductBySlug(floater.slug);
        if (!product) return null;
        return (
          <Link
            key={floater.slug}
            href={`/products/${product.slug}`}
            className={`absolute z-10 hidden rounded-2xl border border-border bg-background-elevated/90 p-3 shadow-card backdrop-blur transition-transform duration-300 hover:-translate-y-1 lg:block ${floater.className}`}
            style={{ animationDelay: floater.delay }}
            aria-hidden="true"
            tabIndex={-1}
          >
            <div className="flex items-center gap-3">
              <ProductIcon name={product.name} categorySlug={product.categorySlug} size="sm" />
              <div>
                <p className="text-sm font-semibold text-foreground">{product.name}</p>
                <p className="text-[0.7rem] text-muted">{product.category}</p>
              </div>
            </div>
          </Link>
        );
      })}

      <div className="container-x relative py-24 sm:py-28 lg:py-36">
        <div className="mx-auto max-w-3xl text-center">
          <Reveal>
            <span className="animate-pulse-glow inline-flex items-center gap-2 rounded-full border border-danger/30 bg-danger/10 px-4 py-1.5 text-xs font-bold uppercase tracking-[0.18em] text-danger">
              <Tag className="size-3.5" aria-hidden="true" />
              Mega Sale — Up to 80% OFF
            </span>
          </Reveal>

          <HeroTitle />

          <Reveal delay={0.16}>
            <p className="mx-auto mt-6 max-w-xl text-pretty text-base leading-relaxed text-muted sm:text-lg">
              <TypewriterParagraph />
            </p>
          </Reveal>

          <Reveal delay={0.24}>
            <div className="mt-9 flex flex-col items-center justify-center gap-3 sm:flex-row">
              <ButtonLink href="/products" size="lg" className="w-full sm:w-auto">
                Explore Products
                <ArrowRight className="size-4" aria-hidden="true" />
              </ButtonLink>
              <ButtonLink href="/reseller" size="lg" variant="outline" className="w-full sm:w-auto">
                Become a Reseller
              </ButtonLink>
            </div>
          </Reveal>

          <Reveal delay={0.32}>
            <ul className="mx-auto mt-12 flex max-w-2xl flex-wrap items-center justify-center gap-x-8 gap-y-3">
              {trustItems.map((item) => (
                <li key={item.label} className="flex items-center gap-2 text-sm text-muted">
                  <item.icon className="size-4 text-accent-text" aria-hidden="true" />
                  {item.label}
                </li>
              ))}
            </ul>
          </Reveal>
        </div>
      </div>
    </section>
  );
}
