import { MessageCircle, MousePointerClick, PackageCheck } from "lucide-react";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { Reveal } from "@/components/ui/Reveal";

const steps = [
  {
    icon: MousePointerClick,
    step: "01",
    title: "Choose a Product",
    description:
      "Browse the catalogue, open a product you like and pick the plan that fits your needs.",
  },
  {
    icon: MessageCircle,
    step: "02",
    title: "Select Plan / Contact Us",
    description:
      "Send your order request through WhatsApp or email, and our team confirms the details with you.",
  },
  {
    icon: PackageCheck,
    step: "03",
    title: "Receive Your Service",
    description:
      "Once confirmed, we process your order and deliver your service fast — with support if you need it.",
  },
];

export function HowItWorks() {
  return (
    <section className="border-y border-border bg-background-elevated">
      <div className="container-x py-20 sm:py-24">
        <SectionHeading
          eyebrow="How It Works"
          title="Order in Three Simple Steps"
          subtitle="From browsing to delivery, we keep the process fast, clear and straightforward."
        />
        <ol className="mt-12 grid gap-5 md:grid-cols-3">
          {steps.map((item, index) => (
            <Reveal key={item.step} delay={index * 0.08} className="h-full">
              <li className="relative h-full rounded-card-lg border border-border bg-surface p-6">
                <div className="flex items-center justify-between">
                  <div className="grid size-12 place-items-center rounded-2xl border border-border bg-surface-2 text-accent-text">
                    <item.icon className="size-5" aria-hidden="true" />
                  </div>
                  <span className="font-display text-3xl font-extrabold text-border-strong">{item.step}</span>
                </div>
                <h3 className="mt-5 font-display text-lg font-bold text-foreground">{item.title}</h3>
                <p className="mt-2.5 text-sm leading-relaxed text-muted">{item.description}</p>
              </li>
            </Reveal>
          ))}
        </ol>
      </div>
    </section>
  );
}
