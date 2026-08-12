import type { ComponentProps, ReactNode } from "react";
import { cn } from "@/lib/utils";

export function Label({
  htmlFor,
  children,
  className,
  ...rest
}: ComponentProps<"label"> & { children: ReactNode }) {
  return (
    <label
      htmlFor={htmlFor}
      className={cn("mb-1.5 block text-sm font-medium text-foreground", className)}
      {...rest}
    >
      {children}
    </label>
  );
}

const fieldStyles =
  "w-full rounded-xl border border-border bg-surface-2 px-4 py-3 text-sm text-foreground placeholder:text-muted-2 transition-colors focus:border-accent/60 focus:outline-none focus:ring-2 focus:ring-accent/20";

export function Input({ className, ...rest }: ComponentProps<"input">) {
  return <input className={cn(fieldStyles, className)} {...rest} />;
}

export function Textarea({ className, ...rest }: ComponentProps<"textarea">) {
  return <textarea className={cn(fieldStyles, "min-h-28 resize-y", className)} {...rest} />;
}

export function Select({ className, children, ...rest }: ComponentProps<"select">) {
  return (
    <select className={cn(fieldStyles, "appearance-none pr-10", className)} {...rest}>
      {children}
    </select>
  );
}

export function Checkbox({ className, ...rest }: ComponentProps<"input">) {
  return (
    <input
      type="checkbox"
      className={cn(
        "size-4 shrink-0 rounded border-border bg-surface-2 accent-accent",
        className
      )}
      {...rest}
    />
  );
}

type FieldProps = {
  label: string;
  htmlFor: string;
  hint?: string;
  children: ReactNode;
};

export function Field({ label, htmlFor, hint, children }: FieldProps) {
  return (
    <div>
      <Label htmlFor={htmlFor}>{label}</Label>
      {children}
      {hint ? <p className="mt-1.5 text-xs text-muted-2">{hint}</p> : null}
    </div>
  );
}
