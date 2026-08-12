import type { Metadata } from "next";
import { BadgePercent, Check } from "lucide-react";
import { offers } from "@/data/offers";
import { PageHeader } from "@/components/content/PageHeader";
import { Reveal } from "@/components/ui/Reveal";
import { buildOrderLink } from "@/lib/order";
import { getProductBySlug } from "@/data/products";

export const metadata: Metadata = {
  title: "Special Offers | Bundles & Deals",
  description:
    "Explore special offers and product bundles from Sub Store Tools. Send a request and our team confirms the details for you.",
  alternates: { canonical: "/offers" },
};

export default function OffersPage() {
  return (
    <>
      <PageHeader
        eyebrow="Special Offers"
        title="Bundles & Offers"
        subtitle="Popular services grouped into convenient bundles. Send an offer request and our team will confirm the details and pricing with you."
      />

      <section className="container-x py-16 sm:py-20">
        <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-4">
          {offers.map((offer, index) => (
            <Reveal key={offer.id} delay={index * 0.06} className="h-full">
              <div className="group relative flex h-full flex-col rounded-card-lg border border-border bg-surface p-6 transition-all duration-300 hover:-translate-y-1 hover:border-accent/30 hover:shadow-lift">
                <div className="flex items-center justify-between">
                  <span className="inline-flex items-center gap-1.5 rounded-full border border-accent/25 bg-accent-soft px-3 py-1 text-xs font-semibold text-accent-text">
                    <BadgePercent className="size-3.5" aria-hidden="true" />
                    {offer.badge}
                  </span>
                </div>
                <h2 className="mt-5 font-display text-lg font-bold text-foreground">{offer.title}</h2>
                <p className="mt-2 flex-1 text-sm leading-relaxed text-muted">{offer.description}</p>
                <ul className="mt-5 space-y-2 border-t border-border pt-4">
                  {offer.includes.map((item) => (
                    <li key={item} className="flex items-center gap-2 text-sm text-foreground">
                      <span className="grid size-4 shrink-0 place-items-center rounded-full bg-accent-soft">
                        <Check className="size-2.5 text-accent-text" strokeWidth={3} aria-hidden="true" />
                      </span>
                      {item}
                    </li>
                  ))}
                </ul>
                <a
                  href={buildOrderLinkForOffer(offer.id)}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="mt-5 inline-flex h-11 items-center justify-center rounded-full bg-accent text-sm font-semibold text-accent-foreground transition-all hover:bg-accent-strong hover:shadow-glow active:scale-[0.98]"
                >
                  {offer.cta}
                </a>
              </div>
            </Reveal>
          ))}
        </div>

        <p className="mx-auto mt-10 max-w-xl text-center text-xs leading-relaxed text-muted-2">
          Offers represent convenient product bundles. Final pricing is confirmed by our team when
          you place your order.
        </p>
      </section>
    </>
  );
}

function buildOrderLinkForOffer(offerId: string) {
  const offer = offers.find((item) => item.id === offerId);
  if (!offer) return "#";
  const firstProduct = getProductBySlug(offer.productSlugs[0] ?? "");
  if (!firstProduct) return "#";
  return buildOrderLink(firstProduct);
}
