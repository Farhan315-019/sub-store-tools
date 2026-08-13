import Link from "next/link";
import { ArrowRight, Percent, TrendingUp, Users, Wallet } from "lucide-react";
import { ButtonLink } from "@/components/ui/Button";
import { Reveal } from "@/components/ui/Reveal";

const resellerPoints = [
  {
    icon: Percent,
    title: "Wholesale Rates",
    description: "Order at reseller-friendly rates and set your own pricing for your customers.",
  },
  {
    icon: Wallet,
    title: "Simple Ordering",
    description: "Place and manage orders through a dedicated reseller dashboard.",
  },
  {
    icon: Users,
    title: "Your Customers, Your Brand",
    description: "We fulfill behind the scenes — you deliver the experience and build your brand.",
  },
  {
    icon: TrendingUp,
    title: "Room to Grow",
    description: "Expand your catalogue as we add new services, tools and plans over time.",
  },
];

export function ResellerCTA() {
  return (
    <section className="container-x py-20 sm:py-24">
      <Reveal>
        <div className="relative overflow-hidden rounded-card-lg border border-accent/25 bg-background-elevated p-8 sm:p-12 lg:p-16">
          <div className="absolute -right-24 -top-24 size-72 rounded-full bg-accent/15 blur-[100px]" aria-hidden="true" />
          <div className="absolute -bottom-28 -left-20 size-64 rounded-full bg-accent/10 blur-[90px]" aria-hidden="true" />
          <div className="relative grid items-center gap-12 lg:grid-cols-2">
            <div>
              <span className="inline-flex items-center gap-2 rounded-full border border-accent/25 bg-accent-soft px-4 py-1.5 text-xs font-semibold uppercase tracking-[0.18em] text-accent-text">
                <TrendingUp className="size-3.5" aria-hidden="true" />
                Reseller Program
              </span>
              <h2 className="mt-5 text-balance font-display text-3xl font-extrabold leading-tight sm:text-4xl">
                Grow Your Digital Business With Us
              </h2>
              <p className="mt-4 max-w-lg text-pretty text-base leading-relaxed text-muted">
                Become a reseller and offer premium digital services to your own customers. Get
                wholesale rates, fast fulfillment and a simple dashboard to run your business.
              </p>
              <div className="mt-8 flex flex-col gap-3 sm:flex-row">
                <ButtonLink href="/signup" size="lg">
                  Request an Account
                  <ArrowRight className="size-4" aria-hidden="true" />
                </ButtonLink>
                <ButtonLink href="/reseller" size="lg" variant="outline">
                  Learn More
                </ButtonLink>
              </div>
            </div>
            <ul className="grid gap-4 sm:grid-cols-2">
              {resellerPoints.map((point) => (
                <li
                  key={point.title}
                  className="rounded-2xl border border-border bg-surface/60 p-5 backdrop-blur transition-colors hover:border-accent/30"
                >
                  <point.icon className="size-5 text-accent-text" aria-hidden="true" />
                  <h3 className="mt-3 text-sm font-semibold text-foreground">{point.title}</h3>
                  <p className="mt-1.5 text-xs leading-relaxed text-muted">{point.description}</p>
                </li>
              ))}
            </ul>
          </div>
        </div>
      </Reveal>
      <p className="mt-4 text-center text-xs text-muted-2">
        Already have an account?{" "}
        <Link href="/login" className="font-medium text-accent-text hover:underline">
          Login to your dashboard
        </Link>
      </p>
    </section>
  );
}
