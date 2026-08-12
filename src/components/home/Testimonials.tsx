import { Quote } from "lucide-react";
import { testimonials } from "@/data/testimonials";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { Reveal } from "@/components/ui/Reveal";
import { Badge } from "@/components/ui/Badge";

export function Testimonials() {
  return (
    <section className="container-x py-20 sm:py-24">
      <SectionHeading
        eyebrow="Testimonials"
        title="What People Say"
        subtitle="These are sample testimonials for demonstration. Real customer reviews will be added as we collect them."
      />
      <div className="mt-12 grid gap-5 sm:grid-cols-2 lg:grid-cols-4">
        {testimonials.map((testimonial, index) => (
          <Reveal key={testimonial.quote} delay={index * 0.06}>
            <figure className="flex h-full flex-col rounded-card-lg border border-border bg-surface p-6">
              <div className="flex items-center justify-between">
                <Quote className="size-5 text-accent-text" aria-hidden="true" />
                <Badge tone="neutral">{testimonial.label}</Badge>
              </div>
              <blockquote className="mt-4 flex-1 text-sm leading-relaxed text-muted">
                &ldquo;{testimonial.quote}&rdquo;
              </blockquote>
              <figcaption className="mt-5 border-t border-border pt-4 text-sm font-semibold text-foreground">
                {testimonial.role}
              </figcaption>
            </figure>
          </Reveal>
        ))}
      </div>
    </section>
  );
}
