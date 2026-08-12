import type { Product } from "@/types";
import { cn } from "@/lib/utils";
import { ProductCard } from "./ProductCard";
import { EmptyState } from "@/components/ui/EmptyState";

type ProductGridProps = {
  products: Product[];
  emptyMessage?: string;
  className?: string;
};

export function ProductGrid({ products, emptyMessage, className }: ProductGridProps) {
  if (products.length === 0) {
    return <EmptyState message={emptyMessage ?? "No products found."} />;
  }
  return (
    <div
      className={cn(
        "grid grid-cols-3 gap-2 sm:gap-3 lg:gap-5",
        className
      )}
    >
      {products.map((product) => (
        <ProductCard key={product.id} product={product} />
      ))}
    </div>
  );
}
