"use client";

import { useEffect, useState } from "react";
import { useReducedMotion } from "framer-motion";

const words = [
  "streaming services",
  "AI tools",
  "VPN services",
  "editing software",
  "study & career tools",
];

const TYPE_SPEED = 70;
const DELETE_SPEED = 38;
const HOLD_MS = 1700;

export function RotatingWord() {
  const reduceMotion = useReducedMotion();
  const [wordIndex, setWordIndex] = useState(0);
  const [text, setText] = useState("");
  const [deleting, setDeleting] = useState(false);

  useEffect(() => {
    if (reduceMotion) return;
    const word = words[wordIndex % words.length];
    let timeout: ReturnType<typeof setTimeout>;

    if (!deleting && text === word) {
      timeout = setTimeout(() => setDeleting(true), HOLD_MS);
    } else if (deleting && text === "") {
      timeout = setTimeout(() => {
        setDeleting(false);
        setWordIndex((value) => (value + 1) % words.length);
      }, 60);
    } else {
      timeout = setTimeout(
        () => {
          setText((current) =>
            deleting ? current.slice(0, -1) : word.slice(0, current.length + 1)
          );
        },
        deleting ? DELETE_SPEED : TYPE_SPEED
      );
    }

    return () => clearTimeout(timeout);
  }, [text, deleting, wordIndex, reduceMotion]);

  return (
    <span className="inline-flex items-center">
      <span className="font-semibold text-accent-text">{reduceMotion ? words[0] : text}</span>
      <span
        className="ml-0.5 inline-block h-[1.15em] w-[2px] animate-pulse rounded-full bg-accent-text align-text-bottom"
        aria-hidden="true"
      />
    </span>
  );
}
