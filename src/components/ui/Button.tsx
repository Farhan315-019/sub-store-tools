import Link from "next/link";
import type { ComponentProps, ReactNode } from "react";
import { cn } from "@/lib/utils";

type Variant = "primary" | "secondary" | "outline" | "ghost";
type Size = "sm" | "md" | "lg";

const baseStyles =
  "inline-flex items-center justify-center gap-2 rounded-full font-semibold whitespace-nowrap transition-all duration-200 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-accent disabled:pointer-events-none disabled:opacity-50 select-none";

const variantStyles: Record<Variant, string> = {
  primary:
    "bg-accent text-accent-foreground hover:bg-accent-strong hover:shadow-glow active:scale-[0.98]",
  secondary:
    "bg-surface-2 text-foreground border border-border hover:border-border-strong hover:bg-surface-3 active:scale-[0.98]",
  outline:
    "border border-border-strong text-foreground hover:bg-surface-2 hover:border-accent/50 active:scale-[0.98]",
  ghost: "text-foreground hover:bg-surface-2 active:scale-[0.98]",
};

const sizeStyles: Record<Size, string> = {
  sm: "h-9 px-4 text-sm",
  md: "h-11 px-6 text-sm",
  lg: "h-12 px-8 text-base",
};

type CommonProps = {
  variant?: Variant;
  size?: Size;
  className?: string;
  children: ReactNode;
};

type ButtonProps = CommonProps & ComponentProps<"button"> & { href?: undefined };

type LinkProps = CommonProps & ComponentProps<typeof Link> & { href: string };

export function Button(props: ButtonProps) {
  const { variant = "primary", size = "md", className, children, type = "button", ...rest } = props;
  return (
    <button
      type={type}
      className={cn(baseStyles, variantStyles[variant], sizeStyles[size], className)}
      {...rest}
    >
      {children}
    </button>
  );
}

export function ButtonLink({ variant = "primary", size = "md", className, children, ...rest }: LinkProps) {
  return (
    <Link className={cn(baseStyles, variantStyles[variant], sizeStyles[size], className)} {...rest}>
      {children}
    </Link>
  );
}
