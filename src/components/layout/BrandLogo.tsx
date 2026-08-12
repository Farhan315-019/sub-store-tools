"use client";

import Image from "next/image";
import Link from "next/link";
import { useState } from "react";
import { useTheme } from "./ThemeProvider";
import { cn } from "@/lib/utils";

function BrandMark({ className }: { className?: string }) {
  return (
    <svg
      viewBox="0 0 48 48"
      aria-hidden="true"
      className={cn("size-9", className)}
      fill="none"
    >
      <rect width="48" height="48" rx="12" className="fill-surface-2" />
      <rect
        x="1.5"
        y="1.5"
        width="45"
        height="45"
        rx="10.5"
        className="stroke-border-strong"
        strokeWidth="1.5"
      />
      <path
        d="M14 33.5V14.5h7.2c3.1 0 5.4 1.9 5.4 4.9 0 2.3-1.3 3.9-3.3 4.5 2.5.5 4 2.3 4 4.9 0 3.1-2.5 5.2-5.8 5.2H14zm4.3-11.3h2.6c1.6 0 2.6-.9 2.6-2.3 0-1.3-1-2.2-2.6-2.2h-2.6v4.5zm0 7.8h3c1.8 0 2.9-.9 2.9-2.4 0-1.5-1.1-2.4-2.9-2.4h-3v4.8z"
        className="fill-foreground"
      />
      <path
        d="M33 14.5v19h-4.3v-19H33z"
        className="fill-accent"
      />
    </svg>
  );
}

type BrandLogoProps = {
  className?: string;
  showText?: boolean;
};

export function BrandLogo({ className, showText = true }: BrandLogoProps) {
  const { theme } = useTheme();
  const [errored, setErrored] = useState(false);
  const src = theme === "dark" ? "/logo-dark.png" : "/logo-light.png";

  return (
    <Link href="/" aria-label="Sub Store Tools — Home" className={cn("flex items-center gap-2.5", className)}>
      {errored ? (
        <BrandMark />
      ) : (
        <span className="relative inline-block h-9 w-[54px] overflow-visible sm:h-10 sm:w-[60px]">
          <Image
            src={src}
            alt="Sub Store Tools"
            fill
            sizes="60px"
            priority
            className="object-contain object-left"
            onError={() => setErrored(true)}
          />
        </span>
      )}
      {showText ? (
        <span className="flex flex-col leading-none">
          <span className="font-display text-[1.05rem] font-extrabold tracking-tight text-foreground">
            SUB STORE
          </span>
          <span className="text-[0.6rem] font-bold uppercase tracking-[0.32em] text-accent-text">
            Tools
          </span>
        </span>
      ) : null}
    </Link>
  );
}
