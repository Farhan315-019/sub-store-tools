import { ArrowRight } from "lucide-react";
import { getPopularProducts } from "@/data/products";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { ButtonLink } from "@/components/ui/Button";
import { ProductCard } from "@/components/products/ProductCard";
import { Reveal } from "@/components/ui/Reveal";

export function PopularProducts() {
  const products = getPopularProducts(8);
  return (
    <section className="border-y border-border bg-background-elevated">
      <div className="container-x py-20 sm:py-24">
        <SectionHeading
          eyebrow="Most Requested"
          title="Popular Products"
          subtitle="The services our customers order most — fast-moving, in-demand and ready when you are."
        />
        <div className="mt-12 grid grid-cols-3 gap-3 sm:gap-5">
          {products.map((product, index) => (
            <Reveal key={product.id} delay={Math.min(index * 0.05, 0.3)} className="h-full">
              <ProductCard product={product} />
            </Reveal>
          ))}
        </div>
        <div className="mt-10 text-center">
          <ButtonLink href="/products" variant="outline" size="lg">
            View All Products
            <ArrowRight className="size-4" aria-hidden="true" />
          </ButtonLink>
        </div>
      </div>
    </section>
  );
}
