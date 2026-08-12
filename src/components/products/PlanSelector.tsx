"use client";

import { Check, Mail, MessageCircle } from "lucide-react";
import { useMemo, useState } from "react";
import type { Product } from "@/types";
import { buildEmailLink, buildOrderLink } from "@/lib/order";
import { calculateDiscount, formatPrice } from "@/lib/utils";
import { cn } from "@/lib/utils";
import { siteConfig } from "@/config/site";

type PlanSelectorProps = {
  product: Product;
};

export function PlanSelector({ product }: PlanSelectorProps) {
  const [selectedId, setSelectedId] = useState<string | undefined>(product.plans[0]?.id);
  const selectedPlan = useMemo(
    () => product.plans.find((plan) => plan.id === selectedId) ?? product.plans[0],
    [product.plans, selectedId]
  );

  const price = formatPrice(selectedPlan?.price);
  const originalPrice = selectedPlan?.originalPrice ? formatPrice(selectedPlan.originalPrice) : null;
  const discount =
    selectedPlan?.price && selectedPlan.originalPrice
      ? calculateDiscount(selectedPlan.price, selectedPlan.originalPrice)
      : 0;
  const orderLink = buildOrderLink(product, selectedPlan);

  return (
    <div className="rounded-card-lg border border-border bg-surface p-6 sm:p-7">
      <div className="flex items-center justify-between gap-2">
        <h2 className="font-display text-lg font-bold">Choose a Plan</h2>
        <span className="inline-flex items-center gap-1.5 rounded-full bg-danger/10 px-2.5 py-1 text-xs font-bold text-danger">
          {discount > 0 ? `${discount}% OFF` : "Fast delivery"}
        </span>
      </div>

      <div className="mt-5 grid grid-cols-2 gap-2.5" role="radiogroup" aria-label="Select a plan">
        {product.plans.map((plan) => {
          const selected = plan.id === selectedPlan?.id;
          return (
            <button
              key={plan.id}
              type="button"
              role="radio"
              aria-checked={selected}
              onClick={() => setSelectedId(plan.id)}
              className={cn(
                "flex items-center justify-between rounded-xl border px-4 py-3 text-left transition-all",
                selected
                  ? "border-accent/50 bg-accent-soft"
                  : "border-border bg-surface-2 hover:border-border-strong"
              )}
            >
              <span>
                <span className="block text-sm font-semibold text-foreground">{plan.name}</span>
                {plan.duration ? (
                  <span className="block text-xs text-muted">{plan.duration}</span>
                ) : null}
              </span>
              {selected ? (
                <Check className="size-4 text-accent-text" aria-hidden="true" />
              ) : null}
            </button>
          );
        })}
      </div>

      {selectedPlan?.note ? (
        <p className="mt-4 rounded-xl border border-border bg-surface-2 px-4 py-3 text-xs text-muted">
          {selectedPlan.note}
        </p>
      ) : null}

      <div className="mt-5 flex items-end justify-between border-t border-border pt-5">
        <div>
          <p className="text-xs uppercase tracking-wider text-muted-2">
            {price ? "Sale price" : "Pricing"}
          </p>
          <div className="flex items-baseline gap-2">
            <p className="font-display text-2xl font-extrabold text-foreground">
              {price ?? "Contact us"}
            </p>
            {originalPrice ? (
              <p className="text-sm text-muted-2 line-through">{originalPrice}</p>
            ) : null}
          </div>
        </div>
      </div>

      <div className="mt-5 flex flex-col gap-2.5">
        <a
          href={orderLink}
          target="_blank"
          rel="noopener noreferrer"
          className="inline-flex h-12 items-center justify-center gap-2 rounded-full bg-accent text-sm font-semibold text-accent-foreground transition-all hover:bg-accent-strong hover:shadow-glow active:scale-[0.98]"
        >
          <MessageCircle className="size-4" aria-hidden="true" />
          Order {selectedPlan ? selectedPlan.name : ""} via WhatsApp
        </a>
        <a
          href={buildEmailLink(
            `Order Request — ${product.name}`,
            `Hello ${siteConfig.name},\nI would like to order:\nProduct: ${product.name}\nPlan: ${selectedPlan?.name ?? ""}\nPlease confirm the details.`
          )}
          className="inline-flex h-11 items-center justify-center gap-2 rounded-full border border-border-strong text-sm font-semibold text-foreground transition-colors hover:bg-surface-2"
        >
          <Mail className="size-4" aria-hidden="true" />
          Order via Email
        </a>
      </div>

      <p className="mt-4 text-[0.7rem] leading-relaxed text-muted-2">
        {siteConfig.indicativePricingNote} Your order is confirmed by our team before processing.
      </p>
    </div>
  );
}
