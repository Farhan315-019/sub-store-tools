import type { Metadata } from "next";
import Link from "next/link";
import { ArrowLeft, Compass } from "lucide-react";
import { ButtonLink } from "@/components/ui/Button";

export const metadata: Metadata = {
  title: "Page Not Found",
  robots: { index: false, follow: false },
};

export default function NotFound() {
  return (
    <section className="relative overflow-hidden">
      <div className="absolute inset-0 bg-grid" aria-hidden="true" />
      <div
        className="absolute left-1/2 top-[-10rem] h-72 w-[40rem] -translate-x-1/2 rounded-full bg-accent/10 blur-[120px]"
        aria-hidden="true"
      />
      <div className="container-x relative flex min-h-[calc(100vh-6.5rem)] flex-col items-center justify-center py-20 text-center">
        <span className="font-display text-7xl font-extrabold text-gradient sm:text-8xl">404</span>
        <h1 className="mt-6 text-balance font-display text-3xl font-extrabold text-foreground sm:text-4xl">
          This page took the wrong exit
        </h1>
        <p className="mt-4 max-w-md text-pretty text-base leading-relaxed text-muted">
          The page you&apos;re looking for doesn&apos;t exist or may have moved. Let&apos;s get you back to the
          catalogue.
        </p>
        <div className="mt-9 flex flex-col gap-3 sm:flex-row">
          <ButtonLink href="/" size="lg">
            <ArrowLeft className="size-4" aria-hidden="true" />
            Back to Home
          </ButtonLink>
          <ButtonLink href="/products" size="lg" variant="outline">
            <Compass className="size-4" aria-hidden="true" />
            Explore Products
          </ButtonLink>
        </div>
        <Link href="/contact" className="mt-8 text-sm font-medium text-muted hover:text-foreground">
          Think this is a mistake? Contact support
        </Link>
      </div>
    </section>
  );
}
