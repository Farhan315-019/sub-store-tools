import type { Metadata } from "next";
import { Clock, Mail, MessageCircle } from "lucide-react";
import { siteConfig } from "@/config/site";
import { PageHeader } from "@/components/content/PageHeader";
import { ContactForm } from "@/components/contact/ContactForm";

export const metadata: Metadata = {
  title: "Contact Us | Get in Touch",
  description:
    "Contact Sub Store Tools for product questions, order help or reseller inquiries via WhatsApp, email or the contact form.",
  alternates: { canonical: "/contact" },
};

export default function ContactPage() {
  return (
    <>
      <PageHeader
        eyebrow="Contact"
        title="We're here to help"
        subtitle="Questions about a product, an order or the reseller program? Reach out — our team responds during working hours."
      />

      <section className="container-x py-16 sm:py-20">
        <div className="grid gap-8 lg:grid-cols-[1fr_1.3fr] lg:gap-12">
          <div className="flex flex-col gap-4">
            <a
              href={`https://wa.me/${siteConfig.whatsapp.replace(/[^\d]/g, "")}`}
              target="_blank"
              rel="noopener noreferrer"
              className="group flex items-start gap-4 rounded-card-lg border border-border bg-surface p-6 transition-colors hover:border-accent/30"
            >
              <span className="grid size-11 shrink-0 place-items-center rounded-xl border border-border bg-surface-2 text-accent-text">
                <MessageCircle className="size-5" aria-hidden="true" />
              </span>
              <span>
                <span className="block font-display text-base font-bold text-foreground">WhatsApp</span>
                <span className="mt-1 block text-sm text-muted">{siteConfig.whatsappDisplay}</span>
                <span className="mt-2 block text-xs font-semibold text-accent-text group-hover:underline">
                  Start a chat
                </span>
              </span>
            </a>
            <a
              href={`mailto:${siteConfig.email}`}
              className="group flex items-start gap-4 rounded-card-lg border border-border bg-surface p-6 transition-colors hover:border-accent/30"
            >
              <span className="grid size-11 shrink-0 place-items-center rounded-xl border border-border bg-surface-2 text-accent-text">
                <Mail className="size-5" aria-hidden="true" />
              </span>
              <span>
                <span className="block font-display text-base font-bold text-foreground">Email</span>
                <span className="mt-1 block text-sm text-muted">{siteConfig.emailDisplay}</span>
                <span className="mt-2 block text-xs font-semibold text-accent-text group-hover:underline">
                  Send an email
                </span>
              </span>
            </a>
            <div className="flex items-start gap-4 rounded-card-lg border border-border bg-surface p-6">
              <span className="grid size-11 shrink-0 place-items-center rounded-xl border border-border bg-surface-2 text-accent-text">
                <Clock className="size-5" aria-hidden="true" />
              </span>
              <span>
                <span className="block font-display text-base font-bold text-foreground">Support Hours</span>
                <span className="mt-1 block text-sm text-muted">{siteConfig.hours}</span>
                <span className="mt-2 block text-xs text-muted-2">We reply within working hours.</span>
              </span>
            </div>
          </div>

          <div className="rounded-card-lg border border-border bg-surface p-6 sm:p-8">
            <h2 className="font-display text-xl font-bold text-foreground">Send us a message</h2>
            <p className="mt-1.5 text-sm text-muted">
              Fill in the form and send it via email or WhatsApp — whichever you prefer.
            </p>
            <div className="mt-6">
              <ContactForm />
            </div>
          </div>
        </div>
      </section>
    </>
  );
}
