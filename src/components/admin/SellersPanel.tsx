"use client";

import { Plus, Trash2, UserPlus } from "lucide-react";
import { useState } from "react";
import type { FormEvent } from "react";
import { Button } from "@/components/ui/Button";
import { Field, Input } from "@/components/ui/Input";
import { cn } from "@/lib/utils";
import { adminPost, useAdminFetch } from "./useAdminFetch";

type Seller = {
  id: string;
  name: string;
  store: string;
  email: string;
  status: "active" | "disabled";
  createdAt: string;
};

export function SellersPanel() {
  const { data, busy, error, reload } = useAdminFetch<{ sellers: Seller[] }>("/api/admin/sellers");

  const [name, setName] = useState("");
  const [storeName, setStoreName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [formError, setFormError] = useState("");
  const [formBusy, setFormBusy] = useState(false);

  const handleAdd = async (event: FormEvent) => {
    event.preventDefault();
    setFormError("");
    setFormBusy(true);
    const result = await adminPost("/api/admin/sellers", {
      name,
      store: storeName,
      email,
      password,
    });
    setFormBusy(false);
    if (!result.ok) {
      setFormError(result.error ?? "Failed to create seller.");
      return;
    }
    setName("");
    setStoreName("");
    setEmail("");
    setPassword("");
    void reload();
  };

  const toggleStatus = async (seller: Seller) => {
    const next = seller.status === "active" ? "disabled" : "active";
    await adminPost(`/api/admin/sellers/${seller.id}`, { status: next });
    void reload();
  };

  const handleDelete = async (seller: Seller) => {
    if (!window.confirm(`Delete seller "${seller.name}" (${seller.email})?`)) return;
    const res = await fetch(`/api/admin/sellers/${seller.id}`, { method: "DELETE" });
    if (res.status === 401) {
      window.location.reload();
      return;
    }
    if (res.ok) void reload();
  };

  const sellers = data?.sellers ?? [];

  return (
    <div className="flex flex-col gap-6">
      <div>
        <h1 className="font-display text-2xl font-bold text-foreground">Sellers</h1>
        <p className="mt-1 text-sm text-muted">
          Create reseller accounts. Sellers log in on the /login page with their email and password.
        </p>
      </div>

      <form
        onSubmit={handleAdd}
        className="rounded-card-lg border border-border bg-surface p-5 sm:p-6"
      >
        <h2 className="flex items-center gap-2 font-display text-base font-bold text-foreground">
          <UserPlus className="size-4 text-accent-text" aria-hidden="true" />
          Create Seller Account
        </h2>
        <div className="mt-4 grid gap-4 sm:grid-cols-2">
          <Field label="Full name" htmlFor="admin-seller-name">
            <Input
              id="admin-seller-name"
              value={name}
              onChange={(event) => setName(event.target.value)}
              placeholder="e.g. Ali Khan"
              required
            />
          </Field>
          <Field label="Store name" htmlFor="admin-seller-store">
            <Input
              id="admin-seller-store"
              value={storeName}
              onChange={(event) => setStoreName(event.target.value)}
              placeholder="e.g. Ali's Store"
              required
            />
          </Field>
          <Field label="Email (login ID)" htmlFor="admin-seller-email">
            <Input
              id="admin-seller-email"
              type="email"
              value={email}
              onChange={(event) => setEmail(event.target.value)}
              placeholder="seller@example.com"
              required
            />
          </Field>
          <Field label="Password" htmlFor="admin-seller-password">
            <Input
              id="admin-seller-password"
              type="text"
              value={password}
              onChange={(event) => setPassword(event.target.value)}
              placeholder="Min 6 characters"
              required
            />
          </Field>
        </div>

        {formError ? (
          <p role="alert" className="mt-3 rounded-xl border border-danger/20 bg-danger/10 px-4 py-3 text-sm text-danger">
            {formError}
          </p>
        ) : null}

        <Button type="submit" disabled={formBusy} className="mt-5">
          <Plus className="size-4" aria-hidden="true" />
          {formBusy ? "Creating..." : "Create Seller"}
        </Button>
      </form>

      <div className="rounded-card-lg border border-border bg-surface">
        <div className="border-b border-border px-5 py-4 sm:px-6">
          <h2 className="font-display text-base font-bold text-foreground">
            Seller Accounts <span className="font-normal text-muted">({sellers.length})</span>
          </h2>
        </div>

        {busy ? (
          <p className="px-6 py-8 text-sm text-muted">Loading sellers...</p>
        ) : error ? (
          <p className="px-6 py-8 text-sm text-danger">{error}</p>
        ) : sellers.length === 0 ? (
          <p className="px-6 py-8 text-sm text-muted">No sellers yet. Create your first seller above.</p>
        ) : (
          <ul className="divide-y divide-border">
            {sellers.map((seller) => (
              <li key={seller.id} className="flex flex-col gap-3 px-5 py-4 sm:flex-row sm:items-center sm:justify-between sm:px-6">
                <div className="min-w-0">
                  <div className="flex flex-wrap items-center gap-2">
                    <p className="font-medium text-foreground">{seller.name}</p>
                    <span
                      className={cn(
                        "rounded-full px-2 py-0.5 text-xs font-semibold",
                        seller.status === "active"
                          ? "bg-emerald-500/10 text-emerald-600"
                          : "bg-danger/10 text-danger"
                      )}
                    >
                      {seller.status === "active" ? "Active" : "Disabled"}
                    </span>
                  </div>
                  <p className="mt-1 text-xs text-muted-2">
                    {seller.store} · {seller.email}
                  </p>
                </div>
                <div className="flex shrink-0 items-center gap-2">
                  <button
                    type="button"
                    onClick={() => toggleStatus(seller)}
                    className={cn(
                      "inline-flex h-9 items-center rounded-full border px-4 text-xs font-semibold transition-colors",
                      seller.status === "active"
                        ? "border-border text-muted hover:border-danger/40 hover:text-danger"
                        : "border-border text-muted hover:border-accent/50 hover:text-accent-text"
                    )}
                  >
                    {seller.status === "active" ? "Disable" : "Enable"}
                  </button>
                  <button
                    type="button"
                    onClick={() => handleDelete(seller)}
                    aria-label={`Delete ${seller.name}`}
                    className="grid size-9 place-items-center rounded-xl border border-border text-muted transition-colors hover:border-danger/40 hover:text-danger"
                  >
                    <Trash2 className="size-4" aria-hidden="true" />
                  </button>
                </div>
              </li>
            ))}
          </ul>
        )}
      </div>
    </div>
  );
}
