import type { Metadata } from "next";
import { generalFaq, productFaq, resellerFaq } from "@/data/faq";
import { PageHeader } from "@/components/content/PageHeader";
import { Accordion } from "@/components/ui/Accordion";

export const metadata: Metadata = {
  title: "FAQ | Frequently Asked Questions",
  description:
    "Answers to common questions about Sub Store Tools — ordering, delivery, plans, products and the reseller program.",
  alternates: { canonical: "/faq" },
};

export default function FaqPage() {
  return (
    <>
      <PageHeader
        eyebrow="FAQ"
        title="Frequently Asked Questions"
        subtitle="Quick answers to the questions we hear most. Can't find your answer? Reach out on WhatsApp or email any time."
      />

      <section className="container-x py-16 sm:py-20">
        <div className="mx-auto max-w-3xl">
          <h2 className="font-display text-2xl font-bold text-foreground">General</h2>
          <div className="mt-6">
            <Accordion items={generalFaq} />
          </div>

          <h2 className="mt-14 font-display text-2xl font-bold text-foreground">Ordering & Products</h2>
          <div className="mt-6">
            <Accordion items={productFaq} />
          </div>

          <h2 className="mt-14 font-display text-2xl font-bold text-foreground">Reseller Program</h2>
          <div className="mt-6">
            <Accordion items={resellerFaq} />
          </div>
        </div>
      </section>
    </>
  );
}
