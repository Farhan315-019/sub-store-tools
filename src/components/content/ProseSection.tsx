import type { ReactNode } from "react";

type ProseSectionProps = {
  title: string;
  children: ReactNode;
};

export function ProseSection({ title, children }: ProseSectionProps) {
  return (
    <section className="mt-8">
      <h2 className="font-display text-xl font-bold text-foreground sm:text-2xl">{title}</h2>
      <div className="mt-3 space-y-3 text-sm leading-relaxed text-muted sm:text-[0.95rem]">
        {children}
      </div>
    </section>
  );
}

export function ProseList({ items }: { items: string[] }) {
  return (
    <ul className="space-y-2">
      {items.map((item) => (
        <li key={item} className="flex items-start gap-2.5">
          <span className="mt-2 size-1.5 shrink-0 rounded-full bg-accent" aria-hidden="true" />
          <span>{item}</span>
        </li>
      ))}
    </ul>
  );
}
