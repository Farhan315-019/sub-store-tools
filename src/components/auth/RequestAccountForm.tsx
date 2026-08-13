"use client";

import { CheckCircle2, Info, Mail, MessageCircle, ShieldCheck, UserRoundPlus } from "lucide-react";
import { useState } from "react";
import type { FormEvent } from "react";
import { ButtonLink } from "@/components/ui/Button";
import { Field, Input, Textarea } from "@/components/ui/Input";
import { siteConfig } from "@/config/site";
import { buildEmailLink, buildWhatsAppLink } from "@/lib/order";

type Errors = {
  name?: string;
  email?: string;
  phone?: string;
};

const steps = [
  {
    icon: UserRoundPlus,
    title: "Send Your Request",
    description: "Fill in your details and submit the request — it goes straight to our team.",
  },
  {
    icon: ShieldCheck,
    title: "We Create Your Account",
    description: "Our admin team reviews your request and creates your reseller account for you.",
  },
  {
    icon: MessageCircle,
    title: "Receive Login Details",
    description: "You get your login credentials and can access your reseller dashboard.",
  },
];

function buildRequestMessage(input: {
  name: string;
  email: string;
  phone: string;
  business: string;
  message: string;
}): string {
  const parts = [
    `Hello ${siteConfig.name},`,
    "I would like to request a reseller account.",
    "",
    `Name: ${input.name}`,
    `Email: ${input.email}`,
    `WhatsApp: ${input.phone}`,
  ];
  if (input.business.trim()) parts.push(`Business / Store: ${input.business.trim()}`);
  if (input.message.trim()) parts.push(`Details: ${input.message.trim()}`);
  parts.push("", "Please create my reseller account. Thank you!");
  return parts.join("\n");
}

function buildRequestEmail(input: {
  name: string;
  email: string;
  phone: string;
  business: string;
  message: string;
}): string {
  const lines = [
    `Hello ${siteConfig.name},`,
    "I would like to request a reseller account.",
    "",
    `Name: ${input.name}`,
    `Email: ${input.email}`,
    `WhatsApp: ${input.phone}`,
  ];
  if (input.business.trim()) lines.push(`Business / Store: ${input.business.trim()}`);
  if (input.message.trim()) lines.push(`Details: ${input.message.trim()}`);
  lines.push("", "Please create my reseller account. Thank you!");
  return lines.join("\n");
}

export function RequestAccountForm() {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState("");
  const [business, setBusiness] = useState("");
  const [message, setMessage] = useState("");
  const [errors, setErrors] = useState<Errors>({});
  const [submitted, setSubmitted] = useState(false);

  const validate = (): boolean => {
    const next: Errors = {};
    if (!name.trim()) {
      next.name = "Full name is required.";
    }
    if (!email.trim()) {
      next.email = "Email is required.";
    } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
      next.email = "Enter a valid email address.";
    }
    if (!phone.trim()) {
      next.phone = "Phone or WhatsApp number is required.";
    } else if (phone.replace(/\D/g, "").length < 9) {
      next.phone = "Enter a valid phone number.";
    }
    setErrors(next);
    return Object.keys(next).length === 0;
  };

  const formValue = { name, email, phone, business, message };
  const waLink = buildWhatsAppLink(buildRequestMessage(formValue));
  const emailLink = buildEmailLink("Reseller Account Request", buildRequestEmail(formValue));

  const handleSubmit = (event: FormEvent) => {
    event.preventDefault();
    if (validate()) {
      setSubmitted(true);
    }
  };

  if (submitted) {
    return (
      <div className="rounded-card-lg border border-border bg-surface p-6 text-center">
        <div className="mx-auto grid size-12 place-items-center rounded-full border border-success/25 bg-success/10">
          <CheckCircle2 className="size-5 text-success" aria-hidden="true" />
        </div>
        <h2 className="mt-4 font-display text-lg font-bold text-foreground">Request received</h2>
        <p className="mt-2 text-sm leading-relaxed text-muted">
          Our admin team will create your reseller account and send your login details to{" "}
          <span className="font-semibold text-foreground">{email || "your email"}</span>. Send your
          details now to speed things up:
        </p>
        <div className="mt-6 flex flex-col gap-2.5">
          <a
            href={waLink}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex h-12 items-center justify-center gap-2 rounded-full bg-[#25d366] text-sm font-semibold text-white transition-all hover:brightness-110"
          >
            <MessageCircle className="size-4" aria-hidden="true" />
            Send Details on WhatsApp
          </a>
          <a
            href={emailLink}
            className="inline-flex h-11 items-center justify-center gap-2 rounded-full border border-border-strong text-sm font-semibold text-foreground transition-colors hover:bg-surface-2"
          >
            <Mail className="size-4" aria-hidden="true" />
            Send Details via Email
          </a>
        </div>
        <p className="mt-4 text-xs text-muted-2">
          Already have an account?{" "}
          <ButtonLink href="/login" variant="ghost" size="sm" className="!h-auto !px-1 font-semibold text-accent-text">
            Login to your dashboard
          </ButtonLink>
        </p>
      </div>
    );
  }

  return (
    <div className="flex flex-col gap-6">
      <form onSubmit={handleSubmit} noValidate className="flex flex-col gap-4">
        <Field label="Full Name" htmlFor="request-name">
          <Input
            id="request-name"
            type="text"
            autoComplete="name"
            value={name}
            onChange={(event) => setName(event.target.value)}
            aria-invalid={Boolean(errors.name)}
            placeholder="Your full name"
          />
          {errors.name ? <p className="mt-1.5 text-xs text-danger">{errors.name}</p> : null}
        </Field>

        <Field label="Email" htmlFor="request-email">
          <Input
            id="request-email"
            type="email"
            autoComplete="email"
            value={email}
            onChange={(event) => setEmail(event.target.value)}
            aria-invalid={Boolean(errors.email)}
            placeholder="you@example.com"
          />
          {errors.email ? <p className="mt-1.5 text-xs text-danger">{errors.email}</p> : null}
        </Field>

        <Field label="Phone / WhatsApp" htmlFor="request-phone">
          <Input
            id="request-phone"
            type="tel"
            autoComplete="tel"
            value={phone}
            onChange={(event) => setPhone(event.target.value)}
            aria-invalid={Boolean(errors.phone)}
            placeholder="+00 0000 000000"
          />
          {errors.phone ? <p className="mt-1.5 text-xs text-danger">{errors.phone}</p> : null}
        </Field>

        <Field label="Business / Store Name (optional)" htmlFor="request-business">
          <Input
            id="request-business"
            type="text"
            value={business}
            onChange={(event) => setBusiness(event.target.value)}
            placeholder="e.g. Digital Bazaar"
          />
        </Field>

        <Field label="Tell us a little about your business (optional)" htmlFor="request-message">
          <Textarea
            id="request-message"
            value={message}
            onChange={(event) => setMessage(event.target.value)}
            placeholder="Where do you plan to sell? How many orders a week?"
            className="min-h-24"
          />
        </Field>

        <button
          type="submit"
          className="mt-1 inline-flex h-12 w-full items-center justify-center gap-2 rounded-full bg-accent text-sm font-semibold text-accent-foreground transition-all hover:bg-accent-strong hover:shadow-glow active:scale-[0.98]"
        >
          <UserRoundPlus className="size-4" aria-hidden="true" />
          Send Request to Admin
        </button>

        <p className="flex items-start gap-2 rounded-xl border border-border bg-surface-2 px-4 py-3 text-xs leading-relaxed text-muted">
          <Info className="mt-0.5 size-3.5 shrink-0 text-accent-text" aria-hidden="true" />
          Reseller accounts are created by our admin team only — we do not offer self-signup. Your
          request is sent to us and your login details are shared with you once your account is
          ready.
        </p>
      </form>

      <div className="rounded-card-lg border border-border bg-surface p-5">
        <h2 className="font-display text-sm font-bold text-foreground">How it works</h2>
        <ol className="mt-4 space-y-4">
          {steps.map((step, index) => (
            <li key={step.title} className="flex items-start gap-3">
              <span className="relative grid size-9 shrink-0 place-items-center rounded-full border border-border bg-surface-2 text-accent-text">
                <step.icon className="size-4" aria-hidden="true" />
              </span>
              <div className="min-w-0">
                <p className="flex items-center gap-2 text-sm font-semibold text-foreground">
                  {step.title}
                  <span className="rounded-full bg-surface-2 px-1.5 text-[0.65rem] font-bold text-muted-2">
                    {index + 1}
                  </span>
                </p>
                <p className="mt-0.5 text-xs leading-relaxed text-muted">{step.description}</p>
              </div>
            </li>
          ))}
        </ol>
        <p className="mt-5 flex items-center gap-1.5 border-t border-border pt-4 text-xs text-muted-2">
          <MessageCircle className="size-3.5 text-accent-text" aria-hidden="true" />
          Prefer instant chat?{" "}
          <ButtonLink href="/login" variant="ghost" size="sm" className="!h-auto !px-0.5 font-semibold text-accent-text">
            Login
          </ButtonLink>
          or message us on WhatsApp anytime.
        </p>
      </div>
    </div>
  );
}
