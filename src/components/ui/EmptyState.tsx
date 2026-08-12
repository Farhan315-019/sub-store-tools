import { PackageSearch } from "lucide-react";

type EmptyStateProps = {
  message: string;
  hint?: string;
};

export function EmptyState({ message, hint }: EmptyStateProps) {
  return (
    <div className="flex flex-col items-center justify-center rounded-card border border-dashed border-border bg-surface px-6 py-16 text-center">
      <div className="grid size-14 place-items-center rounded-2xl border border-border bg-surface-2">
        <PackageSearch className="size-6 text-muted" />
      </div>
      <p className="mt-4 font-display text-base font-semibold text-foreground">{message}</p>
      {hint ? <p className="mt-1.5 max-w-sm text-sm text-muted">{hint}</p> : null}
    </div>
  );
}
