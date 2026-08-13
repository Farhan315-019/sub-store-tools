"use client";

import { MessageCircle, Send } from "lucide-react";
import { useState } from "react";
import type { FormEvent } from "react";
import { Button } from "@/components/ui/Button";
import { Field, Input, Textarea } from "@/components/ui/Input";
import { buildEmailLink, buildWhatsAppLink } from "@/lib/order";
import { siteConfig } from "@/config/site";

export function ContactForm() {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [message, setMessage] = useState("");

  const submitViaEmail = (event: FormEvent) => {
    event.preventDefault();
    const subject = `Contact Request — ${name || "Website visitor"}`;
    const body = `Name: ${name}\nEmail: ${email}\n\n${message}`;
    window.location.href = buildEmailLink(subject, body);
  };

  const submitViaWhatsApp = (event: FormEvent) => {
    event.preventDefault();
    const text = `Hello ${siteConfig.name},\n\nName: ${name}\nEmail: ${email}\n\n${message}`;
    window.open(buildWhatsAppLink(text), "_blank", "noopener,noreferrer");
  };

  return (
    <form className="flex flex-col gap-4" onSubmit={(event) => event.preventDefault()}>
      <div className="grid gap-4 sm:grid-cols-2">
        <Field label="Full Name" htmlFor="contact-name">
          <Input
            id="contact-name"
            value={name}
            onChange={(event) => setName(event.target.value)}
            placeholder="Your name"
          />
        </Field>
        <Field label="Email" htmlFor="contact-email">
          <Input
            id="contact-email"
            type="email"
            value={email}
            onChange={(event) => setEmail(event.target.value)}
            placeholder="you@example.com"
          />
        </Field>
      </div>
      <Field label="Message" htmlFor="contact-message">
        <Textarea
          id="contact-message"
          value={message}
          onChange={(event) => setMessage(event.target.value)}
          placeholder="How can we help?"
          className="min-h-36"
        />
      </Field>
      <div className="flex flex-col gap-2.5 sm:flex-row">
        <Button type="button" onClick={submitViaEmail} size="lg" className="flex-1">
          <Send className="size-4" aria-hidden="true" />
          Send Message
        </Button>
        <Button type="button" onClick={submitViaWhatsApp} size="lg" variant="secondary" className="flex-1">
          <MessageCircle className="size-4" aria-hidden="true" />
          Send via WhatsApp
        </Button>
      </div>
    </form>
  );
}
