import type { ProductPlan } from "@/types";

type PlanSeed = {
  name: string;
  duration?: string;
  price?: number;
  originalPrice?: number;
  note?: string;
};

export function makePlans(seeds: PlanSeed[]): ProductPlan[] {
  return seeds.map((seed) => ({
    id: seed.name.toLowerCase().replace(/[^a-z0-9]+/g, "-"),
    name: seed.name,
    duration: seed.duration,
    price: seed.price,
    originalPrice: seed.originalPrice,
    note: seed.note,
  }));
}

export const monthlyPlans = () =>
  makePlans([
    { name: "1 Month", duration: "1 month" },
    { name: "3 Months", duration: "3 months" },
    { name: "6 Months", duration: "6 months" },
    { name: "12 Months", duration: "12 months" },
  ]);

export const shortPlans = () =>
  makePlans([
    { name: "1 Month", duration: "1 month" },
    { name: "3 Months", duration: "3 months" },
    { name: "12 Months", duration: "12 months" },
  ]);

export const customPlans = () =>
  makePlans([
    { name: "Basic", note: "Contact us for details" },
    { name: "Pro", note: "Contact us for details" },
    { name: "Custom", note: "Tell us what you need" },
  ]);

type SinglePlanOptions = {
  duration?: string;
  note?: string;
  name?: string;
};

export function singlePlan(
  price?: number,
  options: SinglePlanOptions = {}
): ProductPlan[] {
  return [
    {
      id: "standard",
      name: options.name ?? "Standard",
      duration: options.duration,
      price,
      note: options.note,
    },
  ];
}
