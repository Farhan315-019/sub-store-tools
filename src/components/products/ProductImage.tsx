"use client";

import { useEffect, useRef, useState } from "react";
import type { Product } from "@/types";

const extensions = [".svg", ".jpg", ".png", ".webp"];

function candidatesFor(slug: string): string[] {
  return extensions.map((ext) => `/products/${slug}${ext}`);
}

type ProductImageProps = {
  product: Pick<Product, "slug" | "name" | "image">;
  className?: string;
  priority?: boolean;
};

export function ProductImage({ product, className, priority = false }: ProductImageProps) {
  const fallbackCandidates = candidatesFor(product.slug);
  const candidates = product.image
    ? [product.image, ...fallbackCandidates]
    : fallbackCandidates;
  const [index, setIndex] = useState(0);
  const imgRef = useRef<HTMLImageElement>(null);
  const currentSrc = candidates[Math.min(index, candidates.length - 1)];

  useEffect(() => {
    const img = imgRef.current;
    if (img?.complete && img.naturalWidth === 0) {
      setIndex((value) => Math.min(value + 1, candidates.length - 1));
    }
  }, [currentSrc, candidates]);

  return (
    // eslint-disable-next-line @next/next/no-img-element
    <img
      ref={imgRef}
      src={currentSrc}
      alt={product.name}
      loading={priority ? "eager" : "lazy"}
      decoding="async"
      className={className}
      onError={() => setIndex((value) => Math.min(value + 1, candidates.length - 1))}
    />
  );
}
