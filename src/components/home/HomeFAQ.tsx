import Link from "next/link";
import { generalFaq } from "@/data/faq";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { Accordion } from "@/components/ui/Accordion";
import { Reveal } from "@/components/ui/Reveal";

export function HomeFAQ() {
  return (
    <section className="border-y border-border bg-background-elevated">
      <div className="container-x grid gap-10 py-20 sm:py-24 lg:grid-cols-[1fr_1.6fr] lg:gap-16">
        <div>
          <SectionHeading
            align="left"
            eyebrow="FAQ"
            title="Frequently Asked Questions"
            subtitle="Quick answers to common questions. Can't find what you need? Contact our team any time."
          />
          <div className="mt-6">
            <Link
              href="/faq"
              className="inline-flex items-center gap-1.5 text-sm font-semibold text-accent-text hover:underline"
            >
              View all FAQs
            </Link>
          </div>
        </div>
        <Reveal delay={0.1}>
          <Accordion items={generalFaq.slice(0, 5)} />
        </Reveal>
      </div>
    </section>
  );
}
