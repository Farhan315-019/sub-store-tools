import { siteConfig } from "@/config/site";
import type { Product, ProductPlan } from "@/types";

export function buildOrderMessage(product: Product, plan?: ProductPlan): string {
  const parts = [
    `Hello ${siteConfig.name},`,
    `I would like to order: ${product.name}`,
    plan ? `Plan: ${plan.name}` : null,
    `Order type: Retail`,
  ].filter(Boolean);
  return parts.join("\n");
}

export function buildWhatsAppLink(message: string): string {
  const digits = siteConfig.whatsapp.replace(/[^\d]/g, "");
  return `https://wa.me/${digits}?text=${encodeURIComponent(message)}`;
}

export function buildOrderLink(product: Product, plan?: ProductPlan): string {
  return buildWhatsAppLink(buildOrderMessage(product, plan));
}

export function buildContactLink(): string {
  return buildWhatsAppLink(`Hello ${siteConfig.name}, I have a question.`);
}

export function buildEmailLink(subject: string, body: string): string {
  return `mailto:${siteConfig.email}?subject=${encodeURIComponent(subject)}&body=${encodeURIComponent(body)}`;
}
