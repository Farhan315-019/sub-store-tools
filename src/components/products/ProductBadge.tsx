import { cn } from "@/lib/utils";

const styles: Record<string, string> = {
  New: "bg-emerald-500 text-white",
  "Hot Deal": "bg-orange-500 text-white",
  "Hot Sale": "bg-orange-500 text-white",
  Popular: "bg-violet-600 text-white",
  "Best Seller": "bg-amber-400 text-amber-950",
  Premium: "bg-slate-900 text-white ring-1 ring-white/25",
};

type ProductBadgeProps = {
  label: string;
  className?: string;
};

export function ProductBadge({ label, className }: ProductBadgeProps) {
  return (
    <span
      className={cn(
        "inline-flex items-center rounded-full px-2.5 py-1 text-xs font-bold leading-none shadow-card",
        styles[label] ?? "bg-accent text-accent-foreground",
        className
      )}
    >
      {label}
    </span>
  );
}
