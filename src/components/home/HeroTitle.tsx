"use client";

import { motion, useReducedMotion } from "framer-motion";

const headingWords = ["Premium", "Digital", "Tools."];

const ease = [0.22, 1, 0.36, 1] as const;

export function HeroTitle() {
  const reduceMotion = useReducedMotion();

  return (
    <h1 className="mt-6 text-balance font-display text-4xl font-extrabold leading-[1.06] sm:text-5xl md:text-6xl lg:text-[4.25rem]">
      <span className="block">
        {headingWords.map((word, index) => (
          <motion.span
            key={word}
            className="inline-block"
            initial={reduceMotion ? false : { opacity: 0, y: 32, filter: "blur(10px)" }}
            animate={reduceMotion ? undefined : { opacity: 1, y: 0, filter: "blur(0px)" }}
            transition={{ delay: 0.15 + index * 0.09, duration: 0.55, ease }}
          >
            {word}
            {index < headingWords.length - 1 ? "\u00A0" : null}
          </motion.span>
        ))}
      </span>
      <motion.span
        className="text-gradient-animated block"
        initial={reduceMotion ? false : { opacity: 0, y: 28, filter: "blur(10px)" }}
        animate={reduceMotion ? undefined : { opacity: 1, y: 0, filter: "blur(0px)" }}
        transition={{ delay: 0.42, duration: 0.55, ease }}
      >
        Up to 80% Off.
      </motion.span>
    </h1>
  );
}
