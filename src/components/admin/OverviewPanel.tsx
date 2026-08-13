"use client";

import { Clock3, Mail, Package, ShoppingBag, Users } from "lucide-react";
import { useAdminFetch } from "./useAdminFetch";

type OverviewData = {
  products: number;
  sellers: number;
  orders: number;
  pendingOrders: number;
  messages: number;
};

const cards: Array<{
  label: string;
  key: keyof OverviewData;
  icon: typeof Package;
  hint?: string;
}> = [
  { label: "Products", key: "products", icon: Package },
  { label: "Sellers", key: "sellers", icon: Users },
  { label: "Orders", key: "orders", icon: ShoppingBag },
  { label: "Pending Orders", key: "pendingOrders", icon: Clock3, hint: "Awaiting confirmation" },
  { label: "Messages", key: "messages", icon: Mail },
];

export function OverviewPanel() {
  const { data, error, busy } = useAdminFetch<{ overview: OverviewData }>("/api/admin/overview");

  if (busy) {
    return <p className="text-sm text-muted">Loading overview...</p>;
  }

  if (error) {
    return <p className="text-sm text-danger">{error}</p>;
  }

  const overview = data?.overview;

  return (
    <div className="flex flex-col gap-6">
      <div>
        <h1 className="font-display text-2xl font-bold text-foreground">Overview</h1>
        <p className="mt-1 text-sm text-muted">A quick look at your store&apos;s activity.</p>
      </div>

      <div className="grid grid-cols-2 gap-4 xl:grid-cols-5">
        {cards.map((card) => {
          const value = overview?.[card.key] ?? 0;
          return (
            <div
              key={card.key}
              className="rounded-card border border-border bg-surface p-5"
            >
              <div className="flex items-center justify-between">
                <p className="text-xs font-medium uppercase tracking-wide text-muted-2">
                  {card.label}
                </p>
                <card.icon className="size-4 text-accent-text" aria-hidden="true" />
              </div>
              <p className="mt-2 font-display text-3xl font-extrabold text-foreground">{value}</p>
              {card.hint ? <p className="mt-1 text-xs text-muted-2">{card.hint}</p> : null}
            </div>
          );
        })}
      </div>

      <p className="rounded-xl border border-border bg-surface-2 px-4 py-3 text-xs leading-relaxed text-muted">
        Tip: Products added here appear on the public site instantly. Sellers you create can log in
        on the <span className="font-semibold text-foreground">/login</span> page.
      </p>
    </div>
  );
}
