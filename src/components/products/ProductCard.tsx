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
        <div className="relative aspect-[4/3] overflow-hidden bg-surface-2 lg:aspect-[16/10]">
          <ProductImage
            product={product}
            className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-[1.04]"
          />
          {discount > 0 ? (
            <span className="absolute left-1.5 top-1.5 inline-flex items-center rounded-full bg-danger px-1.5 py-0.5 text-[0.55rem] font-bold text-white shadow-card lg:left-3 lg:top-3 lg:px-2.5 lg:py-1 lg:text-xs">
              -{discount}%
            </span>
          ) : null}
          {product.badge ? (
            <span className="absolute right-1.5 top-1.5 hidden lg:right-3 lg:top-3 lg:block">
              <ProductBadge label={product.badge} />
            </span>
          ) : null}
        </div>

        <div className="flex flex-1 flex-col p-2 lg:p-5">
          <h3 className="line-clamp-1 font-display text-[0.7rem] font-bold leading-tight text-foreground lg:text-lg">
            {product.name}
          </h3>
          <p className="mt-0.5 hidden truncate text-[0.55rem] font-medium uppercase tracking-wider text-muted-2 lg:mt-1 lg:block lg:text-xs">
            {product.category}
          </p>
          <p className="mt-1 hidden line-clamp-2 text-sm leading-relaxed text-muted lg:mt-2.5 lg:block">
            {product.shortDescription}
          </p>

          <div className="mt-auto flex items-end justify-between gap-2 pt-2 lg:mt-4 lg:pt-0">
            <div className="min-w-0">
              <p className="hidden text-[0.65rem] uppercase tracking-wider text-muted-2 lg:block">
                {price ? "Sale price" : "Pricing"}
              </p>
              <div className="flex flex-wrap items-baseline gap-1 lg:gap-2">
                <p className="font-display text-[0.7rem] font-extrabold leading-tight text-foreground lg:text-lg">
                  {price ?? "Contact us"}
                </p>
                {originalPrice ? (
                  <p className="truncate text-[0.6rem] font-medium text-muted-2 line-through lg:text-sm">
                    {originalPrice}
                  </p>
                ) : null}
              </div>
            </div>
            <span className="hidden lg:inline-flex">
              <StatusBadge status={product.status} />
            </span>
          </div>
        </div>
      </Link>

      <div className="mt-auto flex items-center gap-1.5 border-t border-border px-2 py-1.5 lg:gap-2 lg:px-5 lg:py-4">
        <a
          href={whatsappLink}
          target="_blank"
          rel="noopener noreferrer"
          className="hidden h-10 flex-1 items-center justify-center gap-2 rounded-full bg-[#25d366] text-sm font-semibold text-white transition-all hover:brightness-110 active:scale-[0.98] lg:inline-flex"
        >
          <WhatsAppIcon className="size-4" aria-hidden="true" />
          <span className="truncate">Order Now</span>
        </a>
        <Link
          href={`/products/${product.slug}`}
          className="inline-flex h-7 flex-1 items-center justify-center gap-1 rounded-full border border-border px-1.5 text-[0.6rem] font-semibold text-foreground transition-all hover:border-accent/50 hover:bg-accent hover:text-accent-foreground lg:h-10 lg:flex-none lg:px-3.5 lg:text-xs"
        >
          <span>Details</span>
          <ArrowUpRight className="size-3 lg:size-3.5" aria-hidden="true" />
        </Link>
      </div>
    </div>
  );
}
