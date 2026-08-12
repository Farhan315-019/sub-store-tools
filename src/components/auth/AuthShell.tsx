import type { ReactNode } from "react";
import { BrandLogo } from "@/components/layout/BrandLogo";

type AuthShellProps = {
  title: string;
  subtitle: string;
  children: ReactNode;
  footer?: ReactNode;
};

export function AuthShell({ title, subtitle, children, footer }: AuthShellProps) {
  return (
    <section className="relative overflow-hidden">
      <div className="absolute inset-0 bg-grid" aria-hidden="true" />
      <div
        className="absolute left-1/2 top-[-10rem] h-72 w-[40rem] -translate-x-1/2 rounded-full bg-accent/10 blur-[120px]"
        aria-hidden="true"
      />
      <div className="container-x relative flex min-h-[calc(100vh-6.5rem)] items-center justify-center py-14">
        <div className="w-full max-w-md">
          <div className="mb-8 flex justify-center">
            <BrandLogo />
          </div>
          <div className="text-center">
            <h1 className="font-display text-3xl font-extrabold text-foreground">{title}</h1>
            <p className="mx-auto mt-3 max-w-sm text-sm leading-relaxed text-muted">{subtitle}</p>
          </div>
          <div className="mt-8">{children}</div>
          {footer ? <div className="mt-6 text-center text-sm text-muted">{footer}</div> : null}
        </div>
      </div>
    </section>
  );
}
