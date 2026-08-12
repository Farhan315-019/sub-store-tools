import Image from "next/image";
import { BadgeCheck, Quote, Star } from "lucide-react";
import { testimonials } from "@/data/testimonials";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { cn } from "@/lib/utils";

function Stars({ rating, className }: { rating: number; className?: string }) {
  return (
    <div className={cn("flex items-center gap-0.5", className)} aria-label={`${rating} out of 5 stars`}>
      {Array.from({ length: 5 }).map((_, index) => (
        <Star
          key={index}
          className={cn(
            "size-4",
            index < rating ? "fill-accent text-accent" : "fill-transparent text-border"
          )}
          aria-hidden="true"
        />
      ))}
    </div>
  );
}

export function Testimonials() {
  return (
    <section className="container-x py-20 sm:py-24">
      <div className="flex flex-col gap-6 md:flex-row md:items-end md:justify-between">
        <SectionHeading
          align="left"
          eyebrow="Customer Reviews"
          title="What Our Customers Say"
          subtitle="Real feedback from people who order from us on a regular basis."
        />
        <div className="flex shrink-0 items-center gap-4 rounded-card-lg border border-border bg-surface px-5 py-3.5">
          <p className="text-4xl font-extrabold leading-none text-accent-text">4.9</p>
          <div>
            <Stars rating={5} />
            <p className="mt-1.5 text-xs text-muted">120+ verified reviews</p>
          </div>
        </div>
      </div>

      <div className="mt-12 grid gap-5 sm:grid-cols-2 lg:grid-cols-4">
        {testimonials.map((testimonial) => (
          <figure
            key={testimonial.name}
            className="relative flex h-full flex-col overflow-hidden rounded-card-lg border border-border bg-surface p-6 transition-colors hover:border-accent/40"
          >
            <span
              className="absolute inset-x-0 top-0 h-[3px] bg-gradient-to-r from-accent to-accent-strong"
              aria-hidden="true"
            />
            <div className="flex items-center gap-3">
              <span className="relative size-11 shrink-0 overflow-hidden rounded-full border border-border bg-surface-2">
                <Image
                  src={testimonial.avatar}
                  alt={`${testimonial.name} avatar`}
                  fill
                  sizes="44px"
                  unoptimized
                  className="object-cover"
                />
              </span>
              <div className="min-w-0 flex-1">
                <p className="flex items-center gap-1 truncate text-sm font-semibold text-foreground">
                  {testimonial.name}
                  <BadgeCheck className="size-4 shrink-0 text-accent-text" aria-hidden="true" />
                </p>
                <p className="truncate text-xs text-muted">{testimonial.date}</p>
              </div>
              <Quote className="size-5 shrink-0 text-border" aria-hidden="true" />
            </div>
            <div className="mt-4 flex items-center justify-between">
              <Stars rating={testimonial.rating} />
              <span className="text-[0.65rem] font-semibold uppercase tracking-wide text-success">
                Verified
              </span>
            </div>
            <blockquote className="mt-3 flex-1 text-sm leading-relaxed text-muted">
              &ldquo;{testimonial.quote}&rdquo;
            </blockquote>
            <figcaption className="mt-4 flex flex-wrap items-center gap-2 border-t border-border pt-3.5">
              <span className="rounded-full bg-surface-2 px-2.5 py-1 text-[0.7rem] font-medium text-muted">
                {testimonial.product}
              </span>
              <span className="text-[0.7rem] text-muted-2">{testimonial.role}</span>
            </figcaption>
          </figure>
        ))}
      </div>
    </section>
  );
}
