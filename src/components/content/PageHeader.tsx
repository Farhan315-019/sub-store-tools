type PageHeaderProps = {
  eyebrow: string;
  title: string;
  subtitle: string;
};

export function PageHeader({ eyebrow, title, subtitle }: PageHeaderProps) {
  return (
    <section className="border-b border-border bg-background-elevated">
      <div className="container-x py-14 sm:py-16">
        <p className="text-sm font-semibold uppercase tracking-[0.18em] text-accent-text">{eyebrow}</p>
        <h1 className="mt-3 font-display text-4xl font-extrabold text-foreground sm:text-5xl">{title}</h1>
        <p className="mt-4 max-w-2xl text-pretty text-base leading-relaxed text-muted">{subtitle}</p>
      </div>
    </section>
  );
}
