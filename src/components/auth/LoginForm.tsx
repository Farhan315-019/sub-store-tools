"use client";

import { ArrowRight, Info, LockKeyhole, LogIn } from "lucide-react";
import { useState } from "react";
import type { FormEvent } from "react";
import { Button, ButtonLink } from "@/components/ui/Button";
import { Checkbox, Field, Input } from "@/components/ui/Input";
import Link from "next/link";

type Errors = {
  email?: string;
  password?: string;
  form?: string;
};

export function LoginForm() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [remember, setRemember] = useState(true);
  const [errors, setErrors] = useState<Errors>({});
  const [submitted, setSubmitted] = useState(false);
  const [busy, setBusy] = useState(false);

  const validate = (): boolean => {
    const next: Errors = {};
    if (!email.trim()) {
      next.email = "Email is required.";
    } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
      next.email = "Enter a valid email address.";
    }
    if (!password) {
      next.password = "Password is required.";
    }
    setErrors(next);
    return Object.keys(next).length === 0;
  };

  const handleSubmit = async (event: FormEvent) => {
    event.preventDefault();
    if (!validate()) return;

    setBusy(true);
    setErrors((prev) => ({ ...prev, form: undefined }));
    try {
      const res = await fetch("/api/seller/login", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email, password }),
      });
      const data = (await res.json().catch(() => null)) as { ok?: boolean; error?: string } | null;
      if (res.ok) {
        setSubmitted(true);
      } else {
        setErrors({ form: data?.error ?? "Login failed. Please try again." });
      }
    } catch {
      setErrors({ form: "Could not reach the server. Please try again." });
    } finally {
      setBusy(false);
    }
  };

  if (submitted) {
    return (
      <div className="rounded-card-lg border border-border bg-surface p-6 text-center">
        <div className="mx-auto grid size-12 place-items-center rounded-full border border-accent/25 bg-accent-soft">
          <LogIn className="size-5 text-accent-text" aria-hidden="true" />
        </div>
        <h2 className="mt-4 font-display text-lg font-bold text-foreground">Welcome back</h2>
        <p className="mt-2 text-sm leading-relaxed text-muted">
          Your reseller dashboard is ready. Manage orders, top up your wallet and track your
          business — all from one place.
        </p>
        <ButtonLink href="/dashboard" className="mt-5 w-full">
          Continue to Dashboard
          <ArrowRight className="size-4" aria-hidden="true" />
        </ButtonLink>
      </div>
    );
  }

  return (
    <form onSubmit={handleSubmit} noValidate className="flex flex-col gap-4">
      <Field label="Email" htmlFor="login-email">
        <Input
          id="login-email"
          type="email"
          autoComplete="email"
          value={email}
          onChange={(event) => setEmail(event.target.value)}
          aria-invalid={Boolean(errors.email)}
          placeholder="you@example.com"
        />
        {errors.email ? <p className="mt-1.5 text-xs text-danger">{errors.email}</p> : null}
      </Field>

      <Field label="Password" htmlFor="login-password">
        <Input
          id="login-password"
          type="password"
          autoComplete="current-password"
          value={password}
          onChange={(event) => setPassword(event.target.value)}
          aria-invalid={Boolean(errors.password)}
          placeholder="••••••••"
        />
        {errors.password ? <p className="mt-1.5 text-xs text-danger">{errors.password}</p> : null}
      </Field>

      <div className="flex items-center justify-between">
        <label className="flex items-center gap-2 text-sm text-muted">
          <Checkbox checked={remember} onChange={(event) => setRemember(event.target.checked)} />
          Remember me
        </label>
        <Link href="/login" className="text-sm font-medium text-accent-text hover:underline">
          Forgot password?
        </Link>
      </div>

      {errors.form ? (
        <p role="alert" className="rounded-xl border border-danger/20 bg-danger/10 px-4 py-3 text-sm text-danger">
          {errors.form}
        </p>
      ) : null}

      <Button type="submit" size="lg" className="mt-2 w-full" disabled={busy}>
        <LockKeyhole className="size-4" aria-hidden="true" />
        {busy ? "Signing in..." : "Login"}
      </Button>

      <p className="flex items-start gap-2 rounded-xl border border-border bg-surface-2 px-4 py-3 text-xs leading-relaxed text-muted">
        <Info className="mt-0.5 size-3.5 shrink-0 text-accent-text" aria-hidden="true" />
        Don&apos;t have an account yet? Reseller accounts are created by our team on request.{" "}
        <Link href="/signup" className="font-semibold text-accent-text hover:underline">
          Request access
        </Link>{" "}
        and we will share your login details.
      </p>
    </form>
  );
}
