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
    <div className="group flex flex-col overflow-hidden rounded-card border border-border bg-surface transition-all duration-300 hover:-translate-y-1 hover:border-accent/30 hover:bg-surface-2 hover:shadow-lift">
      <Link href={`/products/${product.slug}`} className="block" aria-label={product.name}>
        <div className="relative aspect-[16/10] overflow-hidden bg-surface-2">
          <ProductImage
            product={product}
            className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-[1.04]"
          />
          {discount > 0 ? (
            <span className="absolute left-3 top-3 inline-flex items-center rounded-full bg-danger px-2.5 py-1 text-xs font-bold text-white shadow-card">
              -{discount}%
            </span>
          ) : null}
          {product.badge ? (
            <span className="absolute right-3 top-3">
              <ProductBadge label={product.badge} />
            </span>
          ) : null}
        </div>

        <div className="flex flex-1 flex-col p-5">
          <h3 className="font-display text-lg font-bold text-foreground">{product.name}</h3>
          <p className="mt-0.5 text-xs font-medium uppercase tracking-wider text-muted-2">
            {product.category}
          </p>
          <p className="mt-2.5 line-clamp-2 text-sm leading-relaxed text-muted">
            {product.shortDescription}
          </p>

          <div className="mt-4 flex items-end justify-between gap-3">
            <div>
              <p className="text-[0.65rem] uppercase tracking-wider text-muted-2">
                {price ? "Sale price" : "Pricing"}
              </p>
              <div className="flex flex-wrap items-baseline gap-2">
                <p className="font-display text-lg font-extrabold text-foreground">
                  {price ?? "Contact us"}
                </p>
                {originalPrice ? (
                  <p className="text-sm font-medium text-muted-2 line-through">{originalPrice}</p>
                ) : null}
              </div>
            </div>
            <StatusBadge status={product.status} />
          </div>
        </div>
      </Link>

      <div className="mt-auto flex items-center gap-2 border-t border-border px-5 py-4">
        <a
          href={whatsappLink}
          target="_blank"
          rel="noopener noreferrer"
          className="inline-flex h-10 flex-1 items-center justify-center gap-2 rounded-full bg-[#25d366] text-sm font-semibold text-white transition-all hover:brightness-110 active:scale-[0.98]"
        >
          <WhatsAppIcon className="size-4" aria-hidden="true" />
          Order Now
        </a>
        <Link
          href={`/products/${product.slug}`}
          className="inline-flex h-10 items-center gap-1 rounded-full border border-border px-3.5 text-xs font-semibold text-foreground transition-all hover:border-accent/50 hover:bg-accent hover:text-accent-foreground"
        >
          Details
          <ArrowUpRight className="size-3.5" aria-hidden="true" />
        </Link>
      </div>
    </div>
  );
}
