"use client";

import { CheckCircle2, MessageCircle, Send } from "lucide-react";
import { useState } from "react";
import type { FormEvent } from "react";
import { Button } from "@/components/ui/Button";
import { Field, Input, Textarea } from "@/components/ui/Input";
import { buildWhatsAppLink } from "@/lib/order";
import { siteConfig } from "@/config/site";

export function ContactForm() {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [message, setMessage] = useState("");
  const [sending, setSending] = useState(false);
  const [sent, setSent] = useState(false);
  const [error, setError] = useState("");

  const resetStatus = () => {
    setSent(false);
    setError("");
  };

  const submitViaEmail = async (event: FormEvent) => {
    event.preventDefault();
    resetStatus();
    setSending(true);
    try {
      const response = await fetch("/api/contact/send", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ name, email, message }),
      });
      const data = (await response.json().catch(() => null)) as { error?: string } | null;
      if (!response.ok) {
        setError(data?.error ?? "Could not send your message. Please try WhatsApp.");
      } else {
        setSent(true);
      }
    } catch {
      setError("Could not send your message. Please try WhatsApp.");
    } finally {
      setSending(false);
    }
  };

  const submitViaWhatsApp = (event: FormEvent) => {
    event.preventDefault();
    resetStatus();
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
            onChange={(event) => {
              resetStatus();
              setName(event.target.value);
            }}
            placeholder="Your name"
          />
        </Field>
        <Field label="Email" htmlFor="contact-email">
          <Input
            id="contact-email"
            type="email"
            value={email}
            onChange={(event) => {
              resetStatus();
              setEmail(event.target.value);
            }}
            placeholder="you@example.com"
          />
        </Field>
      </div>
      <Field label="Message" htmlFor="contact-message">
        <Textarea
          id="contact-message"
          value={message}
          onChange={(event) => {
            resetStatus();
            setMessage(event.target.value);
          }}
          placeholder="How can we help?"
          className="min-h-36"
        />
      </Field>

      {sent ? (
        <div className="flex items-start gap-2.5 rounded-xl border border-success/25 bg-success/10 px-4 py-3 text-sm text-success">
          <CheckCircle2 className="mt-0.5 size-4 shrink-0" aria-hidden="true" />
          Message sent! We&apos;ll reply to your email as soon as possible.
        </div>
      ) : null}
      {error ? (
        <div className="rounded-xl border border-danger/25 bg-danger/10 px-4 py-3 text-sm text-danger">
          {error}
        </div>
      ) : null}

      <div className="flex flex-col gap-2.5 sm:flex-row">
        <Button
          type="button"
          onClick={submitViaEmail}
          size="lg"
          className="flex-1"
          disabled={sending}
        >
          <Send className="size-4" aria-hidden="true" />
          {sending ? "Sending…" : "Send Message"}
        </Button>
        <Button type="button" onClick={submitViaWhatsApp} size="lg" variant="secondary" className="flex-1">
          <MessageCircle className="size-4" aria-hidden="true" />
          Send via WhatsApp
        </Button>
      </div>
    </form>
  );
}
