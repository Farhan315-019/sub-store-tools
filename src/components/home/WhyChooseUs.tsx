import { Headphones, ShieldCheck, Tag, Zap } from "lucide-react";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { Reveal } from "@/components/ui/Reveal";

const benefits = [
  {
    icon: Tag,
    title: "Competitive Pricing",
    description:
      "Flexible plans across every product, with pricing confirmed upfront when you order — no surprises.",
  },
  {
    icon: Zap,
    title: "Fast Processing",
    description:
      "Orders are processed quickly, and most are delivered within hours of confirmation.",
  },
  {
    icon: ShieldCheck,
    title: "Trusted Service",
    description:
      "A straightforward ordering process and clear policies, so you always know what to expect.",
  },
  {
    icon: Headphones,
    title: "Dedicated Support",
    description:
      "A helpful team ready to assist before, during and after your order through WhatsApp and email.",
  },
];

export function WhyChooseUs() {
  return (
    <section className="container-x py-20 sm:py-24">
      <SectionHeading
        eyebrow="Why Sub Store Tools?"
        title="Built to Make Digital Simple"
        subtitle="We focus on the things that matter — clear pricing, fast delivery and support you can actually reach."
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
    </section>
  );
}
