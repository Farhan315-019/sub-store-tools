import { cn } from "@/lib/utils";
import { Reveal } from "./Reveal";

type SectionHeadingProps = {
  eyebrow?: string;
  title: string;
  subtitle?: string;
  align?: "left" | "center";
  className?: string;
};

export function SectionHeading({
  eyebrow,
  title,
  subtitle,
  align = "center",
  className,
}: SectionHeadingProps) {
  return (
    <Reveal
      className={cn(
        "max-w-2xl",
        align === "center" ? "mx-auto text-center" : "text-left",
        className
      )}
    >
      {eyebrow ? (
        <p className="mb-3 text-sm font-semibold uppercase tracking-[0.18em] text-accent-text">
          {eyebrow}
        </p>
      ) : null}
      <h2 className="text-3xl font-bold sm:text-4xl md:text-[2.6rem] md:leading-[1.1]">{title}</h2>
      {subtitle ? <p className="mt-4 text-base text-muted sm:text-lg">{subtitle}</p> : null}
    </Reveal>
  );
}
