"use client";

import { useEffect } from "react";
import { AlertTriangle, RotateCcw } from "lucide-react";
import { Button } from "@/components/ui/Button";

export default function GlobalError({
  error,
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  useEffect(() => {
    console.error(error);
  }, [error]);

  return (
    <section className="container-x flex min-h-[60vh] flex-col items-center justify-center py-20 text-center">
      <div className="grid size-14 place-items-center rounded-2xl border border-danger/25 bg-danger/10">
        <AlertTriangle className="size-6 text-danger" aria-hidden="true" />
      </div>
      <h1 className="mt-6 font-display text-3xl font-extrabold text-foreground">
        Something went wrong
      </h1>
      <p className="mt-3 max-w-md text-sm leading-relaxed text-muted">
        An unexpected error occurred. Try reloading the page, or head back home and explore the
        catalogue.
      </p>
      <div className="mt-8 flex flex-col gap-3 sm:flex-row">
        <Button onClick={reset}>
          <RotateCcw className="size-4" aria-hidden="true" />
          Try Again
        </Button>
      </div>
    </section>
  );
}
