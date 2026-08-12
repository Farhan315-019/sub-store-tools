import {
  Clapperboard,
  GraduationCap,
  ShieldCheck,
  Sparkles,
  Wand,
  type LucideIcon,
} from "lucide-react";
import { getInitials } from "@/lib/utils";
import { cn } from "@/lib/utils";

const categoryIcons: Record<string, LucideIcon> = {
  "ott-services": Clapperboard,
  "ai-tools": Sparkles,
  "vpn-proxy": ShieldCheck,
  "study-professional": GraduationCap,
  "editing-software": Wand,
};

type ProductIconProps = {
  name: string;
  categorySlug: string;
  size?: "sm" | "md" | "lg";
  className?: string;
};

const sizes = {
  sm: "size-11 rounded-xl text-sm",
  md: "size-14 rounded-2xl text-base",
  lg: "size-16 rounded-2xl text-lg",
};

export function ProductIcon({ name, categorySlug, size = "md", className }: ProductIconProps) {
  const Icon = categoryIcons[categorySlug] ?? Sparkles;
  return (
    <div
      className={cn(
        "relative grid shrink-0 place-items-center overflow-hidden border border-border bg-surface-2",
        sizes[size],
        className
      )}
      aria-hidden="true"
    >
      <div className="absolute inset-0 bg-gradient-to-br from-accent-soft to-transparent" />
      <Icon className="absolute right-1.5 top-1.5 size-3 opacity-40" strokeWidth={2} />
      <span className="relative z-10 font-display font-bold text-accent-text">
        {getInitials(name)}
      </span>
    </div>
  );
}
