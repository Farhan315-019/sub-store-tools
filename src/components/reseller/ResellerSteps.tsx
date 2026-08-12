import { ClipboardList, MessageSquareText, UserPlus } from "lucide-react";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { Reveal } from "@/components/ui/Reveal";

const steps = [
  {
    icon: UserPlus,
    step: "Step 1",
    title: "Create Your Account",
    description:
      "Sign up with your name, email and WhatsApp number. Your reseller account is approved by our team.",
  },
  {
    icon: ClipboardList,
    step: "Step 2",
    title: "Place Orders",
    description:
      "Browse the catalogue, pick products and plans, and place orders through your dashboard or WhatsApp.",
  },
  {
    icon: MessageSquareText,
    step: "Step 3",
    title: "We Fulfill, You Deliver",
    description:
      "Our team processes and delivers the service. You deliver to your customers and grow your business.",
  },
];

export function ResellerSteps() {
  return (
    <section className="container-x py-20 sm:py-24">
      <SectionHeading
        eyebrow="Getting Started"
        title="How Reselling Works"
        subtitle="A simple three-step path from signup to your first reseller order."
      />
      <ol className="mt-12 grid gap-5 md:grid-cols-3">
        {steps.map((item, index) => (
          <Reveal key={item.step} delay={index * 0.08} className="h-full">
            <li className="relative h-full rounded-card-lg border border-border bg-surface p-6">
              <div className="flex items-center justify-between">
                <div className="grid size-12 place-items-center rounded-2xl border border-border bg-surface-2 text-accent-text">
                  <item.icon className="size-5" aria-hidden="true" />
                </div>
                <span className="font-display text-3xl font-extrabold text-border-strong">
                  {index + 1}
                </span>
              </div>
              <h3 className="mt-5 font-display text-lg font-bold text-foreground">{item.title}</h3>
              <p className="mt-2.5 text-sm leading-relaxed text-muted">{item.description}</p>
            </li>
          </Reveal>
        ))}
      </ol>
    </section>
  );
}
