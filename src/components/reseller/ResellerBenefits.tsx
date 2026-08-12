import { Boxes, Headphones, Percent, Wallet } from "lucide-react";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { Reveal } from "@/components/ui/Reveal";

const benefits = [
  {
    icon: Percent,
    title: "Wholesale & Reseller Pricing",
    description:
      "Order at reseller-friendly rates across the full catalogue and set your own pricing for your customers.",
  },
  {
    icon: Wallet,
    title: "Easy Ordering",
    description:
      "Place orders quickly through a dedicated dashboard and track them every step of the way.",
  },
  {
    icon: Boxes,
    title: "Order Management",
    description:
      "Keep every order organised in one place — pending, processing and completed — so you always know what's happening.",
  },
  {
    icon: Headphones,
    title: "Support That Scales With You",
    description:
      "Get dedicated help as your business grows, plus access to new products and services as they launch.",
  },
];

export function ResellerBenefits() {
  return (
    <section className="border-y border-border bg-background-elevated">
      <div className="container-x py-20 sm:py-24">
        <SectionHeading
          eyebrow="Why Partner With Us"
          title="Built for Resellers Who Want to Grow"
          subtitle="We handle the heavy lifting so you can focus on selling and serving your customers."
        />
        <div className="mt-12 grid gap-5 sm:grid-cols-2 lg:grid-cols-4">
          {benefits.map((benefit, index) => (
            <Reveal key={benefit.title} delay={index * 0.06}>
              <div className="h-full rounded-card-lg border border-border bg-surface p-6 transition-colors duration-300 hover:border-accent/30">
                <div className="grid size-12 place-items-center rounded-2xl border border-border bg-surface-2 text-accent-text">
                  <benefit.icon className="size-5" aria-hidden="true" />
                </div>
                <h3 className="mt-5 font-display text-lg font-bold text-foreground">{benefit.title}</h3>
                <p className="mt-2.5 text-sm leading-relaxed text-muted">{benefit.description}</p>
              </div>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}
