import { getCategoriesWithCounts, getTotalProductCount } from "@/data/products";
import { Reveal } from "@/components/ui/Reveal";

export function TrustStrip() {
  const categories = getCategoriesWithCounts();
  const productCount = getTotalProductCount();

  const stats = [
    { value: `${productCount}+`, label: "Digital Products" },
    { value: String(categories.length), label: "Categories" },
    { value: "Fast", label: "Delivery" },
    { value: "Dedicated", label: "Support" },
  ];

  return (
    <section aria-label="Key figures" className="border-y border-border bg-background-elevated">
      <div className="container-x">
        <Reveal>
          <dl className="grid grid-cols-2 divide-border py-8 sm:grid-cols-4 sm:divide-x sm:divide-border">
            {stats.map((stat) => (
              <div key={stat.label} className="px-4 py-3 text-center sm:py-0">
                <dt className="order-2 mt-1 block text-xs font-medium uppercase tracking-wider text-muted-2">
                  {stat.label}
                </dt>
                <dd className="order-1 font-display text-2xl font-extrabold text-foreground sm:text-3xl">
                  {stat.value}
                </dd>
              </div>
            ))}
          </dl>
        </Reveal>
      </div>
    </section>
  );
}
