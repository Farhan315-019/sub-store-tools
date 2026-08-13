"use client";

import { LockKeyhole, ShieldCheck } from "lucide-react";
import { useRouter } from "next/navigation";
import { useState } from "react";
import type { FormEvent } from "react";
import { Button } from "@/components/ui/Button";
import { Field, Input } from "@/components/ui/Input";
import { adminPost } from "./useAdminFetch";

export function AdminLoginForm() {
  const router = useRouter();
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [busy, setBusy] = useState(false);

  const handleSubmit = async (event: FormEvent) => {
    event.preventDefault();
    setError("");
    setBusy(true);
    const result = await adminPost("/api/admin/login", { username, password });
    if (!result.ok) {
      setError(result.error ?? "Login failed.");
      setBusy(false);
      return;
    }
    router.refresh();
  };

  return (
    <form onSubmit={handleSubmit} className="flex flex-col gap-4 rounded-card-lg border border-border bg-surface p-6 sm:p-8">
      <div className="text-center">
        <div className="mx-auto grid size-12 place-items-center rounded-full border border-accent/25 bg-accent-soft">
          <ShieldCheck className="size-5 text-accent-text" aria-hidden="true" />
        </div>
        <h1 className="mt-4 font-display text-xl font-bold text-foreground">Admin Panel</h1>
        <p className="mt-1 text-sm text-muted">Sign in to manage your store.</p>
      </div>

      <Field label="Username" htmlFor="admin-username">
        <Input
          id="admin-username"
          autoComplete="username"
          value={username}
          onChange={(event) => setUsername(event.target.value)}
          placeholder="admin"
        />
      </Field>

      <Field label="Password" htmlFor="admin-password">
        <Input
          id="admin-password"
          type="password"
          autoComplete="current-password"
          value={password}
          onChange={(event) => setPassword(event.target.value)}
          placeholder="••••••••"
        />
      </Field>

      {error ? (
        <p role="alert" className="rounded-xl border border-danger/20 bg-danger/10 px-4 py-3 text-sm text-danger">
          {error}
        </p>
      ) : null}

      <Button type="submit" size="lg" disabled={busy} className="mt-1 w-full">
        <LockKeyhole className="size-4" aria-hidden="true" />
        {busy ? "Signing in..." : "Sign in"}
      </Button>
    </form>
  );
}
