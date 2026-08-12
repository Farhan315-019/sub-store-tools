import type { ComponentProps, ReactNode } from "react";
import { cn } from "@/lib/utils";

type BadgeProps = ComponentProps<"span"> & {
  children: ReactNode;
  tone?: "accent" | "neutral" | "success" | "warning" | "danger" | "info";
};

const tones: Record<NonNullable<BadgeProps["tone"]>, string> = {
  accent: "bg-accent-soft text-accent-text border border-accent/25",
  neutral: "bg-surface-2 text-muted border border-border",
  success: "bg-success/10 text-success border border-success/25",
  warning: "bg-warning/10 text-warning border border-warning/25",
  danger: "bg-danger/10 text-danger border border-danger/25",
  info: "bg-info/10 text-info border border-info/25",
};

export function Badge({ tone = "accent", className, children, ...rest }: BadgeProps) {
  return (
    <span
      className={cn(
        "inline-flex items-center gap-1.5 rounded-full px-2.5 py-1 text-xs font-medium leading-none",
        tones[tone],
        className
      )}
      {...rest}
    >
      {children}
    </span>
  );
}

export function StatusBadge({ status }: { status: "available" | "limited" | "unavailable" }) {
  const map = {
    available: { label: "Available", tone: "success" as const },
    limited: { label: "Limited", tone: "warning" as const },
    unavailable: { label: "Unavailable", tone: "danger" as const },
  };
  const { label, tone } = map[status];
  return (
    <Badge tone={tone}>
      <span className="size-1.5 rounded-full bg-current" aria-hidden="true" />
      {label}
    </Badge>
  );
}
