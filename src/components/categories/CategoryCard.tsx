import Link from "next/link";
import { ArrowUpRight, Clapperboard, GraduationCap, ShieldCheck, Sparkles, Wand, type LucideIcon } from "lucide-react";
import type { Category } from "@/types";
import { getProductsByCategory } from "@/lib/catalog";

const categoryIcons: Record<string, LucideIcon> = {
  "ott-services": Clapperboard,
  "ai-tools": Sparkles,
  "vpn-proxy": ShieldCheck,
  "study-professional": GraduationCap,
  "editing-software": Wand,
};

export function CategoryCard({ category }: { category: Category }) {
  const Icon = categoryIcons[category.slug] ?? Sparkles;
  const count = getProductsByCategory(category.slug).length;
  return (
    <Link
      href={`/categories/${category.slug}`}
      className="group relative flex h-full flex-col overflow-hidden rounded-card-lg border border-border bg-surface p-7 transition-all duration-300 hover:-translate-y-1 hover:border-accent/30 hover:shadow-lift"
    >
      <div className="absolute -right-12 -top-12 size-44 rounded-full bg-accent/10 blur-2xl" aria-hidden="true" />
      <div className="flex items-start justify-between">
        <div className="grid size-13 place-items-center rounded-2xl border border-border bg-surface-2 text-accent-text transition-colors group-hover:border-accent/40">
          <Icon className="size-5" aria-hidden="true" />
        </div>
        <span className="rounded-full border border-border px-2.5 py-1 text-xs font-medium text-muted">
          {count} products
        </span>
      </div>
      <h2 className="mt-5 font-display text-xl font-bold text-foreground">{category.name}</h2>
      <p className="mt-2 text-sm leading-relaxed text-muted">{category.description}</p>
      <span className="mt-5 inline-flex items-center gap-1.5 text-sm font-semibold text-accent-text">
        Explore category
        <ArrowUpRight className="size-4 transition-transform duration-300 group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
      </span>
    </Link>
  );
}
