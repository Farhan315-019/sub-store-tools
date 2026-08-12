import type { Metadata } from "next";
import { Compass, Gem, HeartHandshake, Layers } from "lucide-react";
import { PageHeader } from "@/components/content/PageHeader";
import { ButtonLink } from "@/components/ui/Button";
import { Reveal } from "@/components/ui/Reveal";
import { getTotalProductCount } from "@/data/products";

export const metadata: Metadata = {
  title: "About Us | Our Story & Mission",
  description:
    "Learn about Sub Store Tools — a trusted store for premium digital services, streaming platforms, AI tools, VPNs and editing software.",
  alternates: { canonical: "/about" },
};

const values = [
  {
    icon: Gem,
    title: "Quality First",
    description:
      "We focus on premium, reliable digital services and keep the catalogue curated and easy to understand.",
  },
  {
    icon: Compass,
    title: "Clear & Honest",
    description:
      "Transparent ordering, clear policies and no hidden surprises — you always know what to expect.",
  },
  {
    icon: Layers,
    title: "Built to Scale",
    description:
      "From retail orders to a full reseller program, our platform is designed to grow alongside your needs.",
  },
  {
    icon: HeartHandshake,
    title: "Customer-Focused",
    description:
      "Fast delivery and real human support sit at the heart of everything we do.",
  },
];

export default function AboutPage() {
  return (
    <>
      <PageHeader
        eyebrow="About Us"
        title="One trusted store for everything digital"
        subtitle="Sub Store Tools is a digital software solutions store bringing premium streaming services, AI platforms, VPNs, study tools and editing software together in one place."
      />

      <section className="container-x py-16 sm:py-20">
        <div className="grid gap-10 lg:grid-cols-2 lg:gap-16">
          <Reveal>
            <div>
              <h2 className="font-display text-2xl font-bold text-foreground sm:text-3xl">
                Why Sub Store Tools exists
              </h2>
              <p className="mt-4 text-base leading-relaxed text-muted">
                The digital world has never had more options — and it has never felt more
                confusing. Between streaming platforms, AI tools, VPNs, learning platforms and
                creative software, finding the right service at the right price can take hours.
              </p>
              <p className="mt-4 text-base leading-relaxed text-muted">
                Sub Store Tools was built to make that simple. We organise the digital tools people
                actually use into one clear catalogue, with straightforward plans and an easy way
                to order — so you can spend your time using the tools, not hunting for them.
              </p>
            </div>
          </Reveal>
          <Reveal delay={0.1}>
            <div className="rounded-card-lg border border-border bg-surface p-8">
              <p className="text-sm font-semibold uppercase tracking-wider text-accent-text">
                What we offer
              </p>
              <ul className="mt-5 space-y-3 text-sm leading-relaxed text-muted">
                <li className="flex items-start gap-2.5">
                  <span className="mt-2 size-1.5 shrink-0 rounded-full bg-accent" aria-hidden="true" />
                  {getTotalProductCount()} curated digital products across five categories
                </li>
                <li className="flex items-start gap-2.5">
                  <span className="mt-2 size-1.5 shrink-0 rounded-full bg-accent" aria-hidden="true" />
                  Flexible plans for streaming, AI, VPN, study and editing needs
                </li>
                <li className="flex items-start gap-2.5">
                  <span className="mt-2 size-1.5 shrink-0 rounded-full bg-accent" aria-hidden="true" />
                  Simple ordering via WhatsApp or email with confirmation before processing
                </li>
                <li className="flex items-start gap-2.5">
                  <span className="mt-2 size-1.5 shrink-0 rounded-full bg-accent" aria-hidden="true" />
                  A reseller program for businesses that want to grow with us
                </li>
              </ul>
            </div>
          </Reveal>
        </div>
      </section>

      <section className="border-y border-border bg-background-elevated">
        <div className="container-x py-16 sm:py-20">
          <h2 className="text-center font-display text-2xl font-bold text-foreground sm:text-3xl">
            What we stand for
          </h2>
          <div className="mt-10 grid gap-5 sm:grid-cols-2 lg:grid-cols-4">
            {values.map((value, index) => (
              <Reveal key={value.title} delay={index * 0.06} className="h-full">
                <div className="h-full rounded-card-lg border border-border bg-surface p-6">
                  <value.icon className="size-5 text-accent-text" aria-hidden="true" />
                  <h3 className="mt-4 font-display text-base font-bold text-foreground">{value.title}</h3>
                  <p className="mt-2 text-sm leading-relaxed text-muted">{value.description}</p>
                </div>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      <section className="container-x py-16 sm:py-20">
        <Reveal>
          <div className="rounded-card-lg border border-accent/25 bg-background-elevated px-6 py-12 text-center sm:px-12">
            <h2 className="font-display text-2xl font-bold text-foreground sm:text-3xl">
              Ready to explore the catalogue?
            </h2>
            <p className="mx-auto mt-3 max-w-lg text-sm leading-relaxed text-muted">
              Browse our products and place an order in minutes — our team is here to help.
            </p>
            <div className="mt-7 flex flex-col items-center justify-center gap-3 sm:flex-row">
              <ButtonLink href="/products" size="lg">
                Explore Products
              </ButtonLink>
              <ButtonLink href="/reseller" size="lg" variant="outline">
                Become a Reseller
              </ButtonLink>
            </div>
          </div>
        </Reveal>
      </section>
    </>
  );
}
