"use client";

import { Trash2 } from "lucide-react";
import type { OrderRecord, OrderStatus } from "@/lib/store";
import { Select } from "@/components/ui/Input";
import { cn } from "@/lib/utils";
import { useAdminFetch } from "./useAdminFetch";

const statusStyles: Record<OrderStatus, string> = {
  pending: "text-amber-600",
  confirmed: "text-sky-600",
  completed: "text-emerald-600",
  cancelled: "text-danger",
};

function formatDate(iso: string): string {
  try {
    return new Date(iso).toLocaleString();
  } catch {
    return iso;
  }
}

export function OrdersPanel() {
  const { data, busy, error, reload } = useAdminFetch<{ orders: OrderRecord[] }>(
    "/api/admin/orders"
  );

  const changeStatus = async (id: string, status: OrderStatus) => {
    await fetch(`/api/admin/orders/${id}`, {
      method: "PATCH",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ status }),
    });
    void reload();
  };

  const handleDelete = async (id: string) => {
    if (!window.confirm(`Delete order ${id}?`)) return;
    const res = await fetch(`/api/admin/orders/${id}`, { method: "DELETE" });
    if (res.status === 401) {
      window.location.reload();
      return;
    }
    if (res.ok) void reload();
  };

  const orders = data?.orders ?? [];

  return (
    <div className="flex flex-col gap-6">
      <div>
        <h1 className="font-display text-2xl font-bold text-foreground">Orders</h1>
        <p className="mt-1 text-sm text-muted">
          Order requests placed from the site and reseller dashboard.
        </p>
      </div>

      <div className="rounded-card-lg border border-border bg-surface">
        <div className="border-b border-border px-5 py-4 sm:px-6">
          <h2 className="font-display text-base font-bold text-foreground">
            Order Requests <span className="font-normal text-muted">({orders.length})</span>
          </h2>
        </div>

        {busy ? (
          <p className="px-6 py-8 text-sm text-muted">Loading orders...</p>
        ) : error ? (
          <p className="px-6 py-8 text-sm text-danger">{error}</p>
        ) : orders.length === 0 ? (
          <p className="px-6 py-8 text-sm text-muted">No orders yet.</p>
        ) : (
          <ul className="divide-y divide-border">
            {orders.map((order) => (
              <li key={order.id} className="px-5 py-4 sm:px-6">
                <div className="flex flex-wrap items-center justify-between gap-3">
                  <div className="min-w-0">
                    <p className="font-medium text-foreground">
                      <span className="text-accent-text">{order.id}</span> — {order.productName}
                      {order.plan ? <span className="text-muted"> ({order.plan})</span> : null}
                    </p>
                    <p className="mt-1 text-xs text-muted-2">
                      {order.orderType}
                      {order.quantity ? ` · Qty ${order.quantity}` : ""}
                      {" · "}
                      {formatDate(order.createdAt)}
                    </p>
                    {(order.customerName || order.customerEmail || order.customerPhone) ? (
                      <p className="mt-1 text-xs text-muted-2">
                        {[order.customerName, order.customerEmail, order.customerPhone]
                          .filter(Boolean)
                          .join(" · ")}
                      </p>
                    ) : null}
                    {order.notes ? (
                      <p className="mt-1 text-xs text-muted">“{order.notes}”</p>
                    ) : null}
                  </div>
                  <div className="flex shrink-0 items-center gap-2">
                    <span className={cn("text-xs font-semibold", statusStyles[order.status])}>
                      {order.status}
                    </span>
                    <Select
                      aria-label={`Status for ${order.id}`}
                      value={order.status}
                      onChange={(event) => changeStatus(order.id, event.target.value as OrderStatus)}
                      className="h-9 w-36 rounded-full py-0 text-xs"
                    >
                      <option value="pending">Pending</option>
                      <option value="confirmed">Confirmed</option>
                      <option value="completed">Completed</option>
                      <option value="cancelled">Cancelled</option>
                    </Select>
                    <button
                      type="button"
                      onClick={() => handleDelete(order.id)}
                      aria-label={`Delete order ${order.id}`}
                      className="grid size-9 place-items-center rounded-xl border border-border text-muted transition-colors hover:border-danger/40 hover:text-danger"
                    >
                      <Trash2 className="size-4" aria-hidden="true" />
                    </button>
                  </div>
                </div>
              </li>
            ))}
          </ul>
        )}
      </div>
    </div>
  );
}
