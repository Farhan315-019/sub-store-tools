import type { Metadata } from "next";
import { ArrowRight } from "lucide-react";
import { ResellerHero } from "@/components/reseller/ResellerHero";
import { ResellerBenefits } from "@/components/reseller/ResellerBenefits";
import { ResellerSteps } from "@/components/reseller/ResellerSteps";
import { Accordion } from "@/components/ui/Accordion";
import { ButtonLink } from "@/components/ui/Button";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { Reveal } from "@/components/ui/Reveal";
import { resellerFaq } from "@/data/faq";

export const metadata: Metadata = {
  title: "Reseller Program | Wholesale Digital Services",
  description:
    "Become a Sub Store Tools reseller. Get wholesale rates, easy order management and dedicated support to grow your digital business.",
  alternates: { canonical: "/reseller" },
  openGraph: {
    title: "Reseller Program | Wholesale Digital Services",
    description:
      "Become a Sub Store Tools reseller. Get wholesale rates, easy order management and dedicated support.",
    url: "/reseller",
  },
};

export default function ResellerPage() {
  return (
    <>
      <ResellerHero />
      <ResellerBenefits />
      <ResellerSteps />

      <section className="border-y border-border bg-background-elevated">
        <div className="container-x grid gap-10 py-20 sm:py-24 lg:grid-cols-[1fr_1.6fr] lg:gap-16">
          <div>
            <SectionHeading
              align="left"
              eyebrow="Reseller FAQ"
              title="Common Reseller Questions"
              subtitle="Everything you need to know about joining and growing with the Sub Store Tools reseller program."
            />
          </div>
          <Reveal delay={0.1}>
            <Accordion items={resellerFaq} />
          </Reveal>
        </div>
      </section>

      <section className="container-x py-20 sm:py-24">
        <Reveal>
          <div className="relative overflow-hidden rounded-card-lg border border-accent/25 bg-background-elevated px-6 py-14 text-center sm:px-12 sm:py-16">
            <div className="absolute left-1/2 top-[-8rem] h-64 w-[40rem] -translate-x-1/2 rounded-full bg-accent/15 blur-[110px]" aria-hidden="true" />
            <div className="relative">
              <h2 className="text-balance font-display text-3xl font-extrabold leading-tight sm:text-4xl">
                Ready to grow your digital business?
              </h2>
              <p className="mx-auto mt-4 max-w-xl text-pretty text-base leading-relaxed text-muted">
                Create your free reseller account today and start offering premium digital services
                to your customers.
              </p>
              <div className="mt-9 flex flex-col items-center justify-center gap-3 sm:flex-row">
                <ButtonLink href="/signup" size="lg">
                  Create Reseller Account
                  <ArrowRight className="size-4" aria-hidden="true" />
                </ButtonLink>
                <ButtonLink href="/login" size="lg" variant="outline">
                  Login
                </ButtonLink>
              </div>
            </div>
          </div>
        </Reveal>
      </section>
    </>
  );
}
