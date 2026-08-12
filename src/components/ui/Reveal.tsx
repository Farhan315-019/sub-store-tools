"use client";

import { motion, useInView, useReducedMotion } from "framer-motion";
import { useEffect, useRef, useState } from "react";
import type { ReactNode } from "react";

type RevealProps = {
  children: ReactNode;
  delay?: number;
  className?: string;
  y?: number;
  once?: boolean;
};

export function Reveal({ children, delay = 0, className, y = 24, once = true }: RevealProps) {
  const reduceMotion = useReducedMotion();
  const ref = useRef<HTMLDivElement>(null);
  const inView = useInView(ref, { once, amount: 0.05 });
  const [fallback, setFallback] = useState(false);

  useEffect(() => {
    const timer = setTimeout(() => setFallback(true), 1000);
    return () => clearTimeout(timer);
  }, []);

  const visible = inView || fallback;

  return (
    <motion.div
      ref={ref}
      className={className}
      initial={reduceMotion ? false : { opacity: 0, y }}
      animate={visible ? { opacity: 1, y: 0 } : { opacity: 0, y }}
      transition={{ duration: 0.6, delay: visible && !fallback ? delay : 0, ease: [0.22, 1, 0.36, 1] }}
    >
      {children}
    </motion.div>
  );
}
