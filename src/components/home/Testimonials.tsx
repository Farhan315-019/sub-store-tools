import Image from "next/image";
import { BadgeCheck, Star } from "lucide-react";
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
      <SectionHeading
        eyebrow="Reviews"
        title="Trusted by Customers Every Day"
        subtitle="Real feedback from people who order from us on a regular basis."
      />

      <div className="mx-auto mt-8 flex max-w-md items-center justify-center gap-4 rounded-card-lg border border-border bg-surface px-6 py-4">
        <p className="text-4xl font-bold text-foreground">4.9</p>
        <div>
          <Stars rating={5} />
          <p className="mt-1 text-sm text-muted">Based on 120+ verified reviews</p>
        </div>
      </div>

      <div className="mt-12 grid gap-5 sm:grid-cols-2 lg:grid-cols-4">
        {testimonials.map((testimonial) => (
          <figure
            key={testimonial.name}
            className="flex h-full flex-col rounded-card-lg border border-border bg-surface p-6"
          >
            <div className="flex items-center justify-between">
              <Stars rating={testimonial.rating} />
              <span className="flex items-center gap-1 text-xs font-medium text-success">
                <BadgeCheck className="size-4" aria-hidden="true" />
                Verified
              </span>
            </div>
            <blockquote className="mt-4 flex-1 text-sm leading-relaxed text-muted">
              &ldquo;{testimonial.quote}&rdquo;
            </blockquote>
            <figcaption className="mt-5 border-t border-border pt-4">
              <div className="flex items-center gap-3">
                <span className="relative size-10 shrink-0 overflow-hidden rounded-full border border-border bg-surface-2">
                  <Image
                    src={testimonial.avatar}
                    alt={`${testimonial.name} avatar`}
                    fill
                    sizes="40px"
                    unoptimized
                    className="object-cover"
                  />
                </span>
                <div className="min-w-0">
                  <p className="truncate text-sm font-semibold text-foreground">
                    {testimonial.name}
                  </p>
                  <p className="truncate text-xs text-muted">{testimonial.role}</p>
                </div>
              </div>
              <span className="mt-3 inline-block rounded-full bg-surface-2 px-2.5 py-1 text-xs font-medium text-muted">
                {testimonial.product}
              </span>
            </figcaption>
          </figure>
        ))}
      </div>
    </section>
  );
}
