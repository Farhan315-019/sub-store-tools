import { allProducts } from "@/data/products";
import { ProductGrid } from "@/components/products/ProductGrid";
import { QuickOrder } from "./QuickOrder";

export function ProductsPanel() {
  return (
    <div className="flex flex-col gap-6">
      <div>
        <h1 className="font-display text-2xl font-bold text-foreground">Products</h1>
        <p className="mt-1 text-sm text-muted">
          Browse the full catalogue at reseller rates and place orders directly.
        </p>
      </div>

      <QuickOrder />

      <ProductGrid products={allProducts} />
    </div>
  );
}

export function NewOrderPanel() {
  return (
    <div className="max-w-xl">
      <h1 className="font-display text-2xl font-bold text-foreground">New Order</h1>
      <p className="mt-1 text-sm text-muted">
        Place a new reseller order. Your request is sent to our team for confirmation.
      </p>
      <div className="mt-6">
        <QuickOrder />
      </div>
    </div>
  );
}
