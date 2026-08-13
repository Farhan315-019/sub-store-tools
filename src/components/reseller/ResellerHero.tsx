import { ArrowRight, LogIn, TrendingUp } from "lucide-react";
import { ButtonLink } from "@/components/ui/Button";
import { Reveal } from "@/components/ui/Reveal";

const points = ["Wholesale rates", "Fast fulfillment", "Dedicated support"];

export function ResellerHero() {
  return (
    <section className="relative overflow-hidden">
      <div className="absolute inset-0 bg-grid" aria-hidden="true" />
      <div
        className="absolute left-1/2 top-[-12rem] h-80 w-[54rem] -translate-x-1/2 rounded-full bg-accent/15 blur-[140px]"
        aria-hidden="true"
      />
      <div className="container-x relative py-20 sm:py-28 lg:py-32">
        <div className="mx-auto max-w-3xl text-center">
          <Reveal>
            <span className="inline-flex items-center gap-2 rounded-full border border-accent/25 bg-accent-soft px-4 py-1.5 text-xs font-semibold uppercase tracking-[0.18em] text-accent-text">
              <TrendingUp className="size-3.5" aria-hidden="true" />
              Reseller Program
            </span>
          </Reveal>
          <Reveal delay={0.08}>
            <h1 className="mt-6 text-balance font-display text-4xl font-extrabold leading-[1.08] sm:text-5xl md:text-6xl">
              Grow Your Digital Business With Us
            </h1>
          </Reveal>
          <Reveal delay={0.16}>
            <p className="mx-auto mt-6 max-w-xl text-pretty text-base leading-relaxed text-muted sm:text-lg">
              Offer premium digital services to your own customers. Get reseller-friendly rates,
              a simple dashboard to manage orders, and a team that handles fulfillment behind the
              scenes.
            </p>
          </Reveal>
          <Reveal delay={0.24}>
            <div className="mt-9 flex flex-col items-center justify-center gap-3 sm:flex-row">
              <ButtonLink href="/signup" size="lg" className="w-full sm:w-auto">
                Request Reseller Account
                <ArrowRight className="size-4" aria-hidden="true" />
              </ButtonLink>
              <ButtonLink href="/login" size="lg" variant="outline" className="w-full sm:w-auto">
                <LogIn className="size-4" aria-hidden="true" />
                Login
              </ButtonLink>
            </div>
          </Reveal>
          <Reveal delay={0.32}>
            <ul className="mx-auto mt-10 flex flex-wrap items-center justify-center gap-x-8 gap-y-3">
              {points.map((point) => (
                <li key={point} className="flex items-center gap-2 text-sm text-muted">
                  <span className="size-1.5 rounded-full bg-accent" aria-hidden="true" />
                  {point}
                </li>
              ))}
            </ul>
          </Reveal>
        </div>
      </div>
    </section>
  );
}
