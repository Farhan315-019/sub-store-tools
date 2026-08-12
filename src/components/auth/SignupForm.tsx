"use client";

import { ArrowRight, Info, UserPlus } from "lucide-react";
import { useState } from "react";
import type { FormEvent } from "react";
import { Button, ButtonLink } from "@/components/ui/Button";
import { Field, Input } from "@/components/ui/Input";

type Errors = {
  name?: string;
  email?: string;
  phone?: string;
  password?: string;
  confirm?: string;
};

export function SignupForm() {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState("");
  const [password, setPassword] = useState("");
  const [confirm, setConfirm] = useState("");
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
    if (!password) {
      next.password = "Password is required.";
    } else if (password.length < 8) {
      next.password = "Password must be at least 8 characters.";
    }
    if (!confirm) {
      next.confirm = "Please confirm your password.";
    } else if (confirm !== password) {
      next.confirm = "Passwords do not match.";
    }
    setErrors(next);
    return Object.keys(next).length === 0;
  };

  const handleSubmit = (event: FormEvent) => {
    event.preventDefault();
    if (validate()) {
      setSubmitted(true);
    }
  };

  if (submitted) {
    return (
      <div className="rounded-card-lg border border-border bg-surface p-6 text-center">
        <div className="mx-auto grid size-12 place-items-center rounded-full border border-accent/25 bg-accent-soft">
          <UserPlus className="size-5 text-accent-text" aria-hidden="true" />
        </div>
        <h2 className="mt-4 font-display text-lg font-bold text-foreground">Account creation is on the way</h2>
        <p className="mt-2 text-sm leading-relaxed text-muted">
          Reseller account creation will be activated once authentication is connected to the
          backend. For now, you can preview the reseller dashboard.
        </p>
        <ButtonLink href="/dashboard" className="mt-5 w-full">
          Preview Dashboard
          <ArrowRight className="size-4" aria-hidden="true" />
        </ButtonLink>
      </div>
    );
  }

  return (
    <form onSubmit={handleSubmit} noValidate className="flex flex-col gap-4">
      <Field label="Full Name" htmlFor="signup-name">
        <Input
          id="signup-name"
          type="text"
          autoComplete="name"
          value={name}
          onChange={(event) => setName(event.target.value)}
          aria-invalid={Boolean(errors.name)}
          placeholder="Your full name"
        />
        {errors.name ? <p className="mt-1.5 text-xs text-danger">{errors.name}</p> : null}
      </Field>

      <div className="grid gap-4 sm:grid-cols-2">
        <Field label="Email" htmlFor="signup-email">
          <Input
            id="signup-email"
            type="email"
            autoComplete="email"
            value={email}
            onChange={(event) => setEmail(event.target.value)}
            aria-invalid={Boolean(errors.email)}
            placeholder="you@example.com"
          />
          {errors.email ? <p className="mt-1.5 text-xs text-danger">{errors.email}</p> : null}
        </Field>

        <Field label="Phone / WhatsApp" htmlFor="signup-phone">
          <Input
            id="signup-phone"
            type="tel"
            autoComplete="tel"
            value={phone}
            onChange={(event) => setPhone(event.target.value)}
            aria-invalid={Boolean(errors.phone)}
            placeholder="+00 0000 000000"
          />
          {errors.phone ? <p className="mt-1.5 text-xs text-danger">{errors.phone}</p> : null}
        </Field>
      </div>

      <div className="grid gap-4 sm:grid-cols-2">
        <Field label="Password" htmlFor="signup-password">
          <Input
            id="signup-password"
            type="password"
            autoComplete="new-password"
            value={password}
            onChange={(event) => setPassword(event.target.value)}
            aria-invalid={Boolean(errors.password)}
            placeholder="At least 8 characters"
          />
          {errors.password ? <p className="mt-1.5 text-xs text-danger">{errors.password}</p> : null}
        </Field>

        <Field label="Confirm Password" htmlFor="signup-confirm">
          <Input
            id="signup-confirm"
            type="password"
            autoComplete="new-password"
            value={confirm}
            onChange={(event) => setConfirm(event.target.value)}
            aria-invalid={Boolean(errors.confirm)}
            placeholder="Re-enter password"
          />
          {errors.confirm ? <p className="mt-1.5 text-xs text-danger">{errors.confirm}</p> : null}
        </Field>
      </div>

      <Button type="submit" size="lg" className="mt-2 w-full">
        <UserPlus className="size-4" aria-hidden="true" />
        Create Reseller Account
      </Button>

      <p className="flex items-start gap-2 rounded-xl border border-border bg-surface-2 px-4 py-3 text-xs leading-relaxed text-muted">
        <Info className="mt-0.5 size-3.5 shrink-0 text-accent-text" aria-hidden="true" />
        This is a frontend demo. Account creation will be connected to a secure authentication
        provider before launch.
      </p>
    </form>
  );
}
