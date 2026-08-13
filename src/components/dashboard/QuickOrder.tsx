"use client";

import { MessageCircle } from "lucide-react";
import { useState } from "react";
import { allProducts } from "@/data/products";
import { buildOrderLink } from "@/lib/order";
import { Field, Input, Select, Textarea } from "@/components/ui/Input";
import type { ProductPlan } from "@/types";

export function QuickOrder() {
  const [productId, setProductId] = useState(allProducts[0]?.id ?? "");
  const product = allProducts.find((item) => item.id === productId);
  const [planId, setPlanId] = useState(product?.plans[0]?.id ?? "");
  const [quantity, setQuantity] = useState("1");
  const [notes, setNotes] = useState("");

  const plan = product?.plans.find((item: ProductPlan) => item.id === planId) ?? product?.plans[0];

  const handleProductChange = (id: string) => {
    setProductId(id);
    const next = allProducts.find((item) => item.id === id);
    setPlanId(next?.plans[0]?.id ?? "");
  };

  const orderLink = product
    ? buildOrderLink(product, plan, "Reseller")
    : "#";

  const recordOrder = () => {
    void fetch("/api/orders", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        productId: product?.id,
        productName: product?.name,
        plan: plan?.name,
        quantity: quantity ? Number(quantity) : undefined,
        orderType: "Reseller",
        notes: notes || undefined,
      }),
    }).catch(() => {});
  };

  return (
    <div className="rounded-card-lg border border-border bg-surface p-5 sm:p-6">
      <h2 className="font-display text-base font-bold text-foreground">Quick Order</h2>
      <p className="mt-1 text-xs text-muted">Place an order in seconds — confirmed via WhatsApp.</p>
      <form className="mt-4 flex flex-col gap-3">
        <Field label="Product" htmlFor="quick-product">
          <Select id="quick-product" value={productId} onChange={(event) => handleProductChange(event.target.value)}>
            {allProducts.map((item) => (
              <option key={item.id} value={item.id}>
                {item.name}
              </option>
            ))}
          </Select>
        </Field>
        <Field label="Plan" htmlFor="quick-plan">
          <Select id="quick-plan" value={planId} onChange={(event) => setPlanId(event.target.value)}>
            {product?.plans.map((item) => (
              <option key={item.id} value={item.id}>
                {item.name}
              </option>
            ))}
          </Select>
        </Field>
        <Field label="Quantity" htmlFor="quick-quantity">
          <Input
            id="quick-quantity"
            type="number"
            min="1"
            value={quantity}
            onChange={(event) => setQuantity(event.target.value)}
          />
        </Field>
        <Field label="Notes (optional)" htmlFor="quick-notes">
          <Textarea
            id="quick-notes"
            value={notes}
            onChange={(event) => setNotes(event.target.value)}
            placeholder="Anything we should know?"
            className="min-h-20"
          />
        </Field>
        <a
          href={orderLink}
          target="_blank"
          rel="noopener noreferrer"
          onClick={recordOrder}
          className="mt-1 inline-flex h-12 w-full items-center justify-center gap-2 rounded-full bg-accent text-sm font-semibold text-accent-foreground transition-all hover:bg-accent-strong hover:shadow-glow active:scale-[0.98]"
        >
          <MessageCircle className="size-4" aria-hidden="true" />
          Send Order Request
        </a>
      </form>
    </div>
  );
}
