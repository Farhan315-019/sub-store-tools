"use client";

import { Plus } from "lucide-react";
import { useId, useState } from "react";
import type { ReactNode } from "react";
import { cn } from "@/lib/utils";

type AccordionItemProps = {
  question: string;
  answer: ReactNode;
  defaultOpen?: boolean;
};

export function AccordionItem({ question, answer, defaultOpen = false }: AccordionItemProps) {
  const [open, setOpen] = useState(defaultOpen);
  const id = useId();

  return (
    <div className="rounded-2xl border border-border bg-surface transition-colors hover:border-border-strong">
      <h3>
        <button
          type="button"
          aria-expanded={open}
          aria-controls={`${id}-panel`}
          id={`${id}-button`}
          onClick={() => setOpen((value) => !value)}
          className="flex w-full items-center justify-between gap-4 px-5 py-4 text-left"
        >
          <span className="text-sm font-semibold sm:text-base">{question}</span>
          <span
            className={cn(
              "grid size-8 shrink-0 place-items-center rounded-full border border-border transition-transform duration-300",
              open && "rotate-45 border-accent/40 bg-accent-soft text-accent-text"
            )}
            aria-hidden="true"
          >
            <Plus className="size-4" />
          </span>
        </button>
      </h3>
      <div
        id={`${id}-panel`}
        role="region"
        aria-labelledby={`${id}-button`}
        className={cn(
          "grid transition-[grid-template-rows] duration-300 ease-[cubic-bezier(0.22,1,0.36,1)]",
          open ? "grid-rows-[1fr]" : "grid-rows-[0fr]"
        )}
      >
        <div className="overflow-hidden">
          <p className="px-5 pb-5 text-sm leading-relaxed text-muted sm:text-[0.95rem]">{answer}</p>
        </div>
      </div>
    </div>
  );
}

type AccordionProps = {
  items: Array<{ question: string; answer: ReactNode; defaultOpen?: boolean }>;
  className?: string;
};

export function Accordion({ items, className }: AccordionProps) {
  return (
    <div className={cn("flex flex-col gap-3", className)}>
      {items.map((item) => (
        <AccordionItem
          key={item.question}
          question={item.question}
          answer={item.answer}
          defaultOpen={item.defaultOpen}
        />
      ))}
    </div>
  );
}
