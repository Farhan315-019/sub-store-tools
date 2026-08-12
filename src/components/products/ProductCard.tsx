import Link from "next/link";
import { ArrowUpRight } from "lucide-react";
import type { Product } from "@/types";
import { getStartingPlan } from "@/data/products";
import { buildOrderLink } from "@/lib/order";
import { calculateDiscount, formatPrice } from "@/lib/utils";
import { ProductImage } from "./ProductImage";
import { ProductBadge } from "./ProductBadge";
import { StatusBadge } from "@/components/ui/Badge";
import { WhatsAppIcon } from "@/components/ui/SocialIcons";

export function ProductCard({ product }: { product: Product }) {
  const startingPlan = getStartingPlan(product);
  const price = formatPrice(startingPlan.price);
  const originalPrice = startingPlan.originalPrice ? formatPrice(startingPlan.originalPrice) : null;
  const discount =
    startingPlan.price && startingPlan.originalPrice
      ? calculateDiscount(startingPlan.price, startingPlan.originalPrice)
      : 0;
  const whatsappLink = buildOrderLink(product, startingPlan);

  return (
    <div className="group flex h-full flex-col overflow-hidden rounded-card border border-border bg-surface transition-all duration-300 hover:-translate-y-1 hover:border-accent/30 hover:bg-surface-2 hover:shadow-lift">
      <Link href={`/products/${product.slug}`} className="flex flex-1 flex-col" aria-label={product.name}>
        <div className="relative aspect-[4/3] overflow-hidden bg-surface-2 sm:aspect-[16/10]">
          <ProductImage
            product={product}
            className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-[1.04]"
          />
          {discount > 0 ? (
            <span className="absolute left-2 top-2 inline-flex items-center rounded-full bg-danger px-2 py-0.5 text-[0.6rem] font-bold text-white shadow-card sm:left-3 sm:top-3 sm:px-2.5 sm:py-1 sm:text-xs">
              -{discount}%
            </span>
          ) : null}
          {product.badge ? (
            <span className="absolute right-2 top-2 hidden sm:right-3 sm:top-3 sm:block">
              <ProductBadge label={product.badge} />
            </span>
          ) : null}
        </div>

        <div className="flex flex-1 flex-col p-2.5 sm:p-5">
          <h3 className="line-clamp-1 font-display text-xs font-bold text-foreground sm:text-lg">
            {product.name}
          </h3>
          <p className="mt-0.5 truncate text-[0.55rem] font-medium uppercase tracking-wider text-muted-2 sm:mt-1 sm:text-xs">
            {product.category}
          </p>
          <p className="mt-1 hidden line-clamp-2 text-sm leading-relaxed text-muted sm:mt-2.5 sm:block">
            {product.shortDescription}
          </p>

          <div className="mt-auto flex items-end justify-between gap-2 pt-2 sm:mt-4 sm:pt-0">
            <div className="min-w-0">
              <p className="hidden text-[0.65rem] uppercase tracking-wider text-muted-2 sm:block">
                {price ? "Sale price" : "Pricing"}
              </p>
              <div className="flex flex-wrap items-baseline gap-1 sm:gap-2">
                <p className="font-display text-xs font-extrabold text-foreground sm:text-lg">
                  {price ?? "Contact us"}
                </p>
                {originalPrice ? (
                  <p className="truncate text-[0.6rem] font-medium text-muted-2 line-through sm:text-sm">
                    {originalPrice}
                  </p>
                ) : null}
              </div>
            </div>
            <span className="hidden sm:inline-flex">
              <StatusBadge status={product.status} />
            </span>
          </div>
        </div>
      </Link>

      <div className="mt-auto flex items-center gap-1.5 border-t border-border px-2.5 py-2 sm:gap-2 sm:px-5 sm:py-4">
        <a
          href={whatsappLink}
          target="_blank"
          rel="noopener noreferrer"
          className="inline-flex h-8 flex-1 items-center justify-center gap-1 rounded-full bg-[#25d366] text-[0.62rem] font-semibold text-white transition-all hover:brightness-110 active:scale-[0.98] sm:h-10 sm:gap-2 sm:text-sm"
        >
          <WhatsAppIcon className="size-3 sm:size-4" aria-hidden="true" />
          <span className="truncate">Order Now</span>
        </a>
        <Link
          href={`/products/${product.slug}`}
          className="inline-flex h-8 items-center gap-1 rounded-full border border-border px-2 text-[0.62rem] font-semibold text-foreground transition-all hover:border-accent/50 hover:bg-accent hover:text-accent-foreground sm:h-10 sm:px-3.5 sm:text-xs"
        >
          <span className="hidden sm:inline">Details</span>
          <ArrowUpRight className="size-3 sm:size-3.5" aria-hidden="true" />
        </Link>
      </div>
    </div>
  );
}
