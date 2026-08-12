import type { Metadata } from "next";
import { PageHeader } from "@/components/content/PageHeader";
import { ProseSection, ProseList } from "@/components/content/ProseSection";

export const metadata: Metadata = {
  title: "Terms & Conditions",
  description:
    "Read the Sub Store Tools terms and conditions governing use of our website and services.",
  alternates: { canonical: "/terms" },
};

export default function TermsPage() {
  return (
    <>
      <PageHeader
        eyebrow="Legal"
        title="Terms & Conditions"
        subtitle="Last updated: 2026. Please read these terms carefully before using our website or services."
      />
      <div className="container-x max-w-3xl py-14 sm:py-16">
        <ProseSection title="1. Agreement">
          <p>
            By accessing or using Sub Store Tools, you agree to be bound by these Terms &
            Conditions. If you do not agree, please do not use our website or services.
          </p>
        </ProseSection>
        <ProseSection title="2. Our Services">
          <p>
            Sub Store Tools provides a catalogue of digital services and products, including
            subscriptions to streaming platforms, AI tools, VPNs, study platforms and editing
            software. Orders are confirmed by our team before processing.
          </p>
        </ProseSection>
        <ProseSection title="3. Orders & Pricing">
          <ProseList
            items={[
              "All prices are shown in PKR and already include the current sale discount (50-80% off).",
              "Final pricing is confirmed with you when you place an order.",
              "Orders are processed after confirmation and may be subject to availability.",
              "We may decline or cancel orders in cases of error, fraud or policy violation.",
            ]}
          />
        </ProseSection>
        <ProseSection title="4. Acceptable Use">
          <p>You agree to use our services only for legitimate, lawful purposes:</p>
          <ProseList
            items={[
              "You will not use our services to distribute stolen accounts, compromised credentials or unauthorised access.",
              "You will not engage in any activity that violates the rights of third parties.",
              "You will provide accurate information when placing orders or creating accounts.",
            ]}
          />
        </ProseSection>
        <ProseSection title="5. Third-Party Trademarks & Affiliation">
          <p>
            All product names, logos and brands mentioned on this website are the property of their
            respective owners and are used for identification purposes only. Reference to any
            third-party product or service does not imply endorsement or affiliation unless
            explicitly stated and verified. Sub Store Tools is an independent storefront.
          </p>
        </ProseSection>
        <ProseSection title="6. Intellectual Property">
          <p>
            The content, design, text and graphics of this website are owned by or licensed to Sub
            Store Tools and may not be reproduced without permission.
          </p>
        </ProseSection>
        <ProseSection title="7. Limitation of Liability">
          <p>
            To the maximum extent permitted by law, Sub Store Tools is not liable for indirect,
            incidental or consequential damages arising from use of this website or services.
            Our total liability is limited to the amount paid for the relevant order.
          </p>
        </ProseSection>
        <ProseSection title="8. Changes to These Terms">
          <p>
            We may revise these terms at any time. Continued use of the website after changes are
            posted constitutes acceptance of the updated terms.
          </p>
        </ProseSection>
        <ProseSection title="9. Contact">
          <p>
            Questions about these terms can be sent through the Contact page or via the contact
            details listed on our website.
          </p>
        </ProseSection>
      </div>
    </>
  );
}
