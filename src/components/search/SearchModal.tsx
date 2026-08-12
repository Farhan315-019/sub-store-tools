"use client";

import { useRouter } from "next/navigation";
import {
  ArrowUpDown,
  CornerDownLeft,
  PackageSearch,
  Search,
  X,
} from "lucide-react";
import { AnimatePresence, motion } from "framer-motion";
import { useCallback, useEffect, useMemo, useRef, useState } from "react";
import { searchProducts } from "@/data/products";
import { getCategoryBySlug } from "@/data/categories";
import { cn } from "@/lib/utils";
import { ProductIcon } from "@/components/products/ProductIcon";
import { Badge } from "@/components/ui/Badge";

type SearchModalProps = {
  open: boolean;
  onClose: () => void;
};

export function SearchModal({ open, onClose }: SearchModalProps) {
  const router = useRouter();
  const [query, setQuery] = useState("");
  const [activeIndex, setActiveIndex] = useState(0);
  const inputRef = useRef<HTMLInputElement>(null);
  const listRef = useRef<HTMLDivElement>(null);

  const results = useMemo(() => searchProducts(query), [query]);
  const safeActiveIndex = Math.min(activeIndex, Math.max(0, results.length - 1));

  const handleClose = useCallback(() => {
    setQuery("");
    setActiveIndex(0);
    onClose();
  }, [onClose]);

  useEffect(() => {
    if (open) {
      const frame = requestAnimationFrame(() => inputRef.current?.focus());
      document.body.style.overflow = "hidden";
      return () => {
        cancelAnimationFrame(frame);
        document.body.style.overflow = "";
      };
    }
  }, [open]);

  const selectIndex = useCallback(
    (index: number) => {
      const product = results[index];
      if (!product) return;
      handleClose();
      router.push(`/products/${product.slug}`);
    },
    [results, handleClose, router]
  );

  const handleKeyDown = (event: React.KeyboardEvent) => {
    if (event.key === "Escape") {
      handleClose();
    } else if (event.key === "ArrowDown") {
      event.preventDefault();
      setActiveIndex((index) => (results.length ? (index + 1) % results.length : 0));
    } else if (event.key === "ArrowUp") {
      event.preventDefault();
      setActiveIndex((index) => (results.length ? (index - 1 + results.length) % results.length : 0));
    } else if (event.key === "Enter") {
      event.preventDefault();
      selectIndex(safeActiveIndex);
    }
  };

  return (    <AnimatePresence>
      {open ? (
        <motion.div
          className="fixed inset-0 z-[100] flex items-start justify-center p-3 pt-[12vh] sm:p-6 sm:pt-[14vh]"
          role="dialog"
          aria-modal="true"
          aria-label="Search products"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.18 }}
        >
          <div
            className="absolute inset-0 bg-black/60 backdrop-blur-sm"
            onClick={handleClose}
            aria-hidden="true"
          />
          <motion.div
            initial={{ opacity: 0, scale: 0.97, y: -12 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.97, y: -12 }}
            transition={{ duration: 0.22, ease: [0.22, 1, 0.36, 1] }}
            className="relative flex max-h-[76vh] w-full max-w-xl flex-col overflow-hidden rounded-2xl border border-border bg-background-elevated shadow-lift"
          >
            <div className="flex items-center gap-3 border-b border-border px-4">
              <Search className="size-4 shrink-0 text-muted" aria-hidden="true" />
              <input
                ref={inputRef}
                type="search"
                value={query}
                onChange={(event) => {
                  setQuery(event.target.value);
                  setActiveIndex(0);
                }}
                onKeyDown={handleKeyDown}
                placeholder="Search Netflix, ChatGPT, Canva, VPN..."
                aria-label="Search products"
                className="h-14 w-full bg-transparent text-sm text-foreground placeholder:text-muted-2 focus:outline-none"
              />
              <kbd className="hidden shrink-0 items-center gap-0.5 rounded-md border border-border px-1.5 py-0.5 text-[10px] font-medium text-muted-2 sm:inline-flex">
                <span>ESC</span>
              </kbd>
            </div>

            <div ref={listRef} className="overflow-y-auto p-2" onKeyDown={handleKeyDown}>
              {query.trim() === "" ? (
                <div className="px-4 py-10 text-center">
                  <Search className="mx-auto size-6 text-muted-2" aria-hidden="true" />
                  <p className="mt-3 text-sm text-muted">
                    Start typing to search across our full catalogue.
                  </p>
                  <p className="mt-1 text-xs text-muted-2">
                    Try &ldquo;Netflix&rdquo;, &ldquo;VPN&rdquo; or &ldquo;Canva&rdquo;
                  </p>
                </div>
              ) : results.length === 0 ? (
                <div className="px-4 py-10 text-center">
                  <PackageSearch className="mx-auto size-6 text-muted-2" aria-hidden="true" />
                  <p className="mt-3 text-sm font-medium text-foreground">No products found</p>
                  <p className="mt-1 text-xs text-muted-2">
                    Try a different keyword or browse the full catalogue.
                  </p>
                </div>
              ) : (
                <ul className="flex flex-col gap-1" aria-label="Search results">
                  {results.map((product, index) => {
                    const category = getCategoryBySlug(product.categorySlug);
                    const active = index === safeActiveIndex;
                    return (
                      <li key={product.id}>
                        <button
                          type="button"
                          onMouseEnter={() => setActiveIndex(index)}
                          onClick={() => selectIndex(index)}
                          className={cn(
                            "flex w-full items-center gap-3 rounded-xl px-3 py-2.5 text-left transition-colors",
                            active && "bg-surface-2"
                          )}
                          aria-current={active ? "true" : undefined}
                        >
                          <ProductIcon name={product.name} categorySlug={product.categorySlug} size="sm" />
                          <span className="min-w-0 flex-1">
                            <span className="flex items-center gap-2">
                              <span className="truncate text-sm font-semibold text-foreground">
                                {product.name}
                              </span>
                              {active ? (
                                <CornerDownLeft className="size-3.5 shrink-0 text-muted-2" aria-hidden="true" />
                              ) : null}
                            </span>
                            <span className="mt-0.5 flex items-center gap-2 text-xs text-muted">
                              <span className="truncate">{product.shortDescription}</span>
                              {category ? (
                                <Badge tone="neutral" className="shrink-0">
                                  {category.name}
                                </Badge>
                              ) : null}
                            </span>
                          </span>
                        </button>
                      </li>
                    );
                  })}
                </ul>
              )}
            </div>

            <div className="flex items-center justify-between border-t border-border px-4 py-2.5 text-[11px] text-muted-2">
              <span className="flex items-center gap-1.5">
                <ArrowUpDown className="size-3" aria-hidden="true" />
                Navigate with arrow keys
              </span>
              <span className="hidden items-center gap-1 sm:flex">
                Press <kbd className="rounded border border-border px-1">Enter</kbd> to open
              </span>
              <button
                type="button"
                onClick={handleClose}
                className="inline-flex items-center gap-1 rounded-md px-1.5 py-1 text-muted-2 transition-colors hover:text-foreground"
              >
                <X className="size-3" aria-hidden="true" />
                Close
              </button>
            </div>
          </motion.div>
        </motion.div>
      ) : null}
    </AnimatePresence>
  );
}
