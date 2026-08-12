import { ArrowRight, MessageCircle } from "lucide-react";
import { ButtonLink } from "@/components/ui/Button";
import { Reveal } from "@/components/ui/Reveal";
import { buildContactLink } from "@/lib/order";

export function FinalCTA() {
  return (
    <section className="container-x py-20 sm:py-24">
      <Reveal>
        <div className="relative overflow-hidden rounded-card-lg border border-border bg-background-elevated px-6 py-14 text-center sm:px-12 sm:py-20">
          <div className="absolute left-1/2 top-[-8rem] h-64 w-[42rem] -translate-x-1/2 rounded-full bg-accent/15 blur-[110px]" aria-hidden="true" />
          <div className="absolute inset-0 bg-grid opacity-40" aria-hidden="true" />
          <div className="relative">
            <h2 className="text-balance font-display text-3xl font-extrabold leading-tight sm:text-4xl md:text-5xl">
              Ready to Get Started?
            </h2>
            <p className="mx-auto mt-4 max-w-xl text-pretty text-base leading-relaxed text-muted sm:text-lg">
              Browse the catalogue, pick your product and place an order in minutes. Our team is
              ready to help.
            </p>
            <div className="mt-9 flex flex-col items-center justify-center gap-3 sm:flex-row">
              <ButtonLink href="/products" size="lg">
                Explore Products
                <ArrowRight className="size-4" aria-hidden="true" />
              </ButtonLink>
              <ButtonLink href={buildContactLink()} size="lg" variant="outline" target="_blank">
                <MessageCircle className="size-4" aria-hidden="true" />
                Chat With Us
              </ButtonLink>
            </div>
          </div>
        </div>
      </Reveal>
    </section>
  );
}
