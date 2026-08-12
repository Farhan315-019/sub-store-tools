import type { Metadata } from "next";
import { PageHeader } from "@/components/content/PageHeader";
import { ProseSection, ProseList } from "@/components/content/ProseSection";

export const metadata: Metadata = {
  title: "Refund & Replacement Policy",
  description:
    "Read the Sub Store Tools refund and replacement policy to understand eligibility and how to request support.",
  alternates: { canonical: "/refund-policy" },
};

export default function RefundPolicyPage() {
  return (
    <>
      <PageHeader
        eyebrow="Legal"
        title="Refund & Replacement Policy"
        subtitle="Last updated: 2026. We aim to make things right when something goes wrong. Read below for the details."
      />
      <div className="container-x max-w-3xl py-14 sm:py-16">
        <ProseSection title="1. Overview">
          <p>
            We want every order to go smoothly. If something isn&apos;t right, our team will work with
            you to resolve the issue — through a replacement or, where eligible, a refund.
          </p>
        </ProseSection>
        <ProseSection title="2. Replacement Eligibility">
          <p>You may request a replacement in the following situations:</p>
          <ProseList
            items={[
              "The delivered service is not working as agreed and cannot be fixed with support.",
              "The wrong product or plan was delivered and we are unable to correct it.",
              "A service issue is reported promptly after delivery and confirmed by our team.",
            ]}
          />
        </ProseSection>
        <ProseSection title="3. Refund Eligibility">
          <ProseList
            items={[
              "Refunds may be issued when a replacement cannot be provided and the issue was on our side.",
              "Refund requests must be submitted within the agreed timeframe and supported by relevant details.",
              "Refunds are typically returned through the original payment method where available.",
            ]}
          />
        </ProseSection>
        <ProseSection title="4. Non-Refundable Situations">
          <ProseList
            items={[
              "Orders already fully delivered and working as agreed.",
              "Issues caused by misuse, third-party platform changes or user error.",
              "Requests received after the applicable reporting window.",
            ]}
          />
        </ProseSection>
        <ProseSection title="5. How to Request Support">
          <p>
            Contact our team through the Contact page, WhatsApp or email with your order reference
            and a description of the issue. Our team will review and respond within our working
            hours.
          </p>
        </ProseSection>
        <ProseSection title="6. Resolution Timeline">
          <p>
            We aim to resolve replacement and refund requests promptly. Resolution time depends on
            the issue and, where applicable, the payment provider&apos;s processing time.
          </p>
        </ProseSection>
        <ProseSection title="7. Policy Changes">
          <p>
            We may update this policy as needed. The current version is always available on this
            page.
          </p>
        </ProseSection>
      </div>
    </>
  );
}
