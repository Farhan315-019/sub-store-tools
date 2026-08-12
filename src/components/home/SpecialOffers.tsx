import Link from "next/link";
import { ArrowUpRight, BadgePercent, Check } from "lucide-react";
import { offers } from "@/data/offers";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { Reveal } from "@/components/ui/Reveal";

export function SpecialOffers() {
  return (
    <section className="border-y border-border bg-background-elevated">
      <div className="container-x py-20 sm:py-24">
        <SectionHeading
          eyebrow="Special Offers"
          title="Hand-Picked Bundles"
          subtitle="Popular services bundled together for convenience. Send a request and our team will confirm the details for you."
        />
        <div className="mt-12 grid gap-5 sm:grid-cols-2 lg:grid-cols-4">
          {offers.map((offer, index) => (
            <Reveal key={offer.id} delay={index * 0.06} className="h-full">
              <div className="group relative flex h-full flex-col rounded-card-lg border border-border bg-surface p-6 transition-all duration-300 hover:-translate-y-1 hover:border-accent/30 hover:shadow-lift">
                <div className="flex items-center justify-between">
                  <span className="inline-flex items-center gap-1.5 rounded-full border border-accent/25 bg-accent-soft px-3 py-1 text-xs font-semibold text-accent-text">
                    <BadgePercent className="size-3.5" aria-hidden="true" />
                    {offer.badge}
                  </span>
                </div>
                <h3 className="mt-5 font-display text-lg font-bold text-foreground">{offer.title}</h3>
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
                <Link
                  href={`/contact?offer=${offer.id}`}
                  className="mt-5 inline-flex items-center gap-1.5 text-sm font-semibold text-accent-text"
                >
                  {offer.cta}
                  <ArrowUpRight className="size-4 transition-transform duration-300 group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
                </Link>
              </div>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}
