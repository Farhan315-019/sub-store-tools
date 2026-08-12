import type { ComponentType } from "react";

type StatCardProps = {
  label: string;
  value: string;
  icon: ComponentType<{ className?: string }>;
  hint?: string;
};

export function StatCard({ label, value, icon: Icon, hint }: StatCardProps) {
  return (
    <div className="rounded-card border border-border bg-surface p-5">
      <div className="flex items-center justify-between">
        <p className="text-xs font-medium uppercase tracking-wider text-muted-2">{label}</p>
        <span className="grid size-9 place-items-center rounded-xl border border-border bg-surface-2 text-accent-text">
          <Icon className="size-4" aria-hidden="true" />
        </span>
      </div>
      <p className="mt-3 font-display text-2xl font-extrabold text-foreground">{value}</p>
      {hint ? <p className="mt-1 text-xs text-muted">{hint}</p> : null}
    </div>
  );
}
