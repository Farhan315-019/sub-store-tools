import { Mail, MessageCircle, Phone } from "lucide-react";
import { siteConfig } from "@/config/site";

export function SupportPanel() {
  return (
    <div className="flex flex-col gap-5">
      <div>
        <h1 className="font-display text-2xl font-bold text-foreground">Support</h1>
        <p className="mt-1 text-sm text-muted">Get help with your reseller account, orders or anything else.</p>
      </div>

      <div className="grid gap-5 sm:grid-cols-3">
        <a
          href={`https://wa.me/${siteConfig.whatsapp.replace(/[^\d]/g, "")}`}
          target="_blank"
          rel="noopener noreferrer"
          className="group rounded-card-lg border border-border bg-surface p-6 transition-colors hover:border-accent/30"
        >
          <MessageCircle className="size-5 text-accent-text" aria-hidden="true" />
          <h2 className="mt-4 font-display text-base font-bold text-foreground">WhatsApp</h2>
          <p className="mt-1 text-sm text-muted">{siteConfig.whatsappDisplay}</p>
          <p className="mt-3 text-xs font-semibold text-accent-text group-hover:underline">Chat now</p>
        </a>
        <a
          href={`mailto:${siteConfig.email}`}
          className="group rounded-card-lg border border-border bg-surface p-6 transition-colors hover:border-accent/30"
        >
          <Mail className="size-5 text-accent-text" aria-hidden="true" />
          <h2 className="mt-4 font-display text-base font-bold text-foreground">Email</h2>
          <p className="mt-1 text-sm text-muted">{siteConfig.emailDisplay}</p>
          <p className="mt-3 text-xs font-semibold text-accent-text group-hover:underline">Send an email</p>
        </a>
        <div className="rounded-card-lg border border-border bg-surface p-6">
          <Phone className="size-5 text-accent-text" aria-hidden="true" />
          <h2 className="mt-4 font-display text-base font-bold text-foreground">Support Hours</h2>
          <p className="mt-1 text-sm text-muted">{siteConfig.hours}</p>
          <p className="mt-3 text-xs text-muted-2">We reply within our working hours.</p>
        </div>
      </div>
    </div>
  );
}
