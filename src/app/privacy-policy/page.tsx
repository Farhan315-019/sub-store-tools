import type { Metadata } from "next";
import { PageHeader } from "@/components/content/PageHeader";
import { ProseSection, ProseList } from "@/components/content/ProseSection";

export const metadata: Metadata = {
  title: "Privacy Policy",
  description:
    "Read the Sub Store Tools privacy policy to understand how we collect, use and protect your information.",
  alternates: { canonical: "/privacy-policy" },
};

export default function PrivacyPolicyPage() {
  return (
    <>
      <PageHeader
        eyebrow="Legal"
        title="Privacy Policy"
        subtitle="Last updated: 2026. This policy explains how Sub Store Tools collects, uses and protects your personal information."
      />
      <div className="container-x max-w-3xl py-14 sm:py-16">
        <ProseSection title="1. Introduction">
          <p>
            This Privacy Policy describes how Sub Store Tools (&ldquo;we&rdquo;, &ldquo;us&rdquo;) handles information
            collected when you use our website and services. By using our site, you agree to the
            practices described here.
          </p>
        </ProseSection>
        <ProseSection title="2. Information We Collect">
          <p>We may collect the following types of information when you interact with our site:</p>
          <ProseList
            items={[
              "Contact details you provide through forms, such as your name, email address and phone or WhatsApp number.",
              "Order details, including the products and plans you request.",
              "Basic technical information such as browser type, device and pages visited, used to improve the experience.",
            ]}
          />
        </ProseSection>
        <ProseSection title="3. How We Use Information">
          <ProseList
            items={[
              "To respond to your inquiries and confirm order requests.",
              "To provide support for orders and services.",
              "To improve our website, products and services.",
              "To communicate important updates with your consent.",
            ]}
          />
          <p>
            We do not sell your personal information to third parties.
          </p>
        </ProseSection>
        <ProseSection title="4. Cookies">
          <p>
            Our site may use cookies and similar technologies to remember preferences (such as your
            theme choice) and understand how visitors use the site. You can control cookies through
            your browser settings.
          </p>
        </ProseSection>
        <ProseSection title="5. Third-Party Services">
          <p>
            We may use third-party services for analytics, communication and infrastructure.
            These providers may process data under their own privacy policies. We encourage you to
            review their policies for more detail.
          </p>
        </ProseSection>
        <ProseSection title="6. Data Security">
          <p>
            We take reasonable measures to protect your information. However, no method of
            transmission over the internet is completely secure, and we cannot guarantee absolute
            security.
          </p>
        </ProseSection>
        <ProseSection title="7. Your Rights">
          <p>
            Depending on your location, you may have rights to access, correct or delete your
            personal information. To exercise these rights, contact us using the details below.
          </p>
        </ProseSection>
        <ProseSection title="8. Changes to This Policy">
          <p>
            We may update this policy from time to time. Changes will be posted on this page with an
            updated revision date.
          </p>
        </ProseSection>
        <ProseSection title="9. Contact">
          <p>
            For questions about this policy, contact us via the Contact page, WhatsApp or email as
            listed on our website.
          </p>
        </ProseSection>
      </div>
    </>
  );
}
