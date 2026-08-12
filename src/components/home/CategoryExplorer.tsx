import Link from "next/link";
import {
  ArrowUpRight,
  Clapperboard,
  GraduationCap,
  ShieldCheck,
  Sparkles,
  Wand,
  type LucideIcon,
} from "lucide-react";
import { getCategoriesWithCounts } from "@/data/products";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { Reveal } from "@/components/ui/Reveal";
import { cn } from "@/lib/utils";

const categoryIcons: Record<string, LucideIcon> = {
  "ott-services": Clapperboard,
  "ai-tools": Sparkles,
  "vpn-proxy": ShieldCheck,
  "study-professional": GraduationCap,
  "editing-software": Wand,
};

const spans = [
  "lg:col-span-3 lg:row-span-2",
  "lg:col-span-3",
  "lg:col-span-2",
  "lg:col-span-2",
  "lg:col-span-2",
];

export function CategoryExplorer() {
  const categories = getCategoriesWithCounts();
  return (
    <section className="container-x py-20 sm:py-24">
      <SectionHeading
        eyebrow="Browse by Category"
        title="Explore the Catalogue"
        subtitle="Everything you need, organised into five focused categories — from streaming and AI to VPNs, study tools and editing software."
      />
      <div className="mt-12 grid gap-4 sm:grid-cols-2 lg:grid-cols-6 lg:grid-rows-2">
        {categories.map((category, index) => {
          const Icon = categoryIcons[category.slug] ?? Sparkles;
          const large = index === 0;
          return (
            <Reveal
              key={category.slug}
              delay={index * 0.05}
              className={cn("h-full lg:col-span-3", spans[index])}
            >
              <Link
                href={`/categories/${category.slug}`}
                className={cn(
                  "group relative flex h-full flex-col overflow-hidden rounded-card-lg border border-border bg-surface p-6 transition-all duration-300 hover:-translate-y-1 hover:border-accent/30 hover:shadow-lift sm:p-7",
                  large && "sm:min-h-72"
                )}
              >
                <div className="absolute -right-10 -top-10 size-40 rounded-full bg-accent/10 blur-2xl transition-opacity duration-300 group-hover:opacity-100 lg:opacity-0" />
                <div className="flex items-start justify-between gap-4">
                  <div className="grid size-12 place-items-center rounded-2xl border border-border bg-surface-2 text-accent-text transition-colors duration-300 group-hover:border-accent/40">
                    <Icon className="size-5" aria-hidden="true" />
                  </div>
                  <span className="inline-flex items-center gap-1 rounded-full border border-border px-2.5 py-1 text-xs font-medium text-muted">
                    {category.count} products
                  </span>
                </div>
                <div className={cn("mt-5", large && "mt-auto pt-6")}>
                  <h3 className="font-display text-xl font-bold text-foreground">{category.name}</h3>
                  <p className={cn("mt-2 text-sm leading-relaxed text-muted", !large && "line-clamp-2")}>
                    {category.tagline}
                  </p>
                  <span className="mt-4 inline-flex items-center gap-1.5 text-sm font-semibold text-accent-text">
                    View category
                    <ArrowUpRight className="size-4 transition-transform duration-300 group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
                  </span>
                </div>
              </Link>
            </Reveal>
          );
        })}
      </div>
    </section>
  );
}
