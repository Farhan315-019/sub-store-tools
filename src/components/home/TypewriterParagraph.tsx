"use client";

import { useEffect, useState } from "react";
import { useReducedMotion } from "framer-motion";

const sentences = [
  "Discover premium streaming services — all at up to 80% off. Browse the catalogue, choose your plan and order directly on WhatsApp for fast delivery.",
  "Discover premium AI tools — all at up to 80% off. Browse the catalogue, choose your plan and order directly on WhatsApp for fast delivery.",
  "Discover premium VPN services — all at up to 80% off. Browse the catalogue, choose your plan and order directly on WhatsApp for fast delivery.",
  "Discover premium editing software — all at up to 80% off. Browse the catalogue, choose your plan and order directly on WhatsApp for fast delivery.",
  "Discover premium study & career tools — all at up to 80% off. Browse the catalogue, choose your plan and order directly on WhatsApp for fast delivery.",
];

export const heroParagraphSamples = sentences;

const TYPE_SPEED = 40;
const DELETE_SPEED = 22;
const HOLD_MS = 1800;
const PAUSE_EMPTY_MS = 450;

export function TypewriterParagraph() {
  const reduceMotion = useReducedMotion();
  const [index, setIndex] = useState(0);
  const [text, setText] = useState("");
  const [deleting, setDeleting] = useState(false);

  useEffect(() => {
    if (reduceMotion) return;
    const sentence = sentences[index % sentences.length];
    let timeout: ReturnType<typeof setTimeout>;

    if (!deleting && text === sentence) {
      timeout = setTimeout(() => setDeleting(true), HOLD_MS);
    } else if (deleting && text === "") {
      timeout = setTimeout(() => {
        setDeleting(false);
        setIndex((value) => (value + 1) % sentences.length);
      }, PAUSE_EMPTY_MS);
    } else {
      timeout = setTimeout(
        () => {
          setText((current) =>
            deleting ? current.slice(0, -1) : sentence.slice(0, current.length + 1)
          );
        },
        deleting ? DELETE_SPEED : TYPE_SPEED
      );
    }

    return () => clearTimeout(timeout);
  }, [text, deleting, index, reduceMotion]);

  const visible = reduceMotion ? sentences[0] : text;
  const longest = sentences.reduce((a, b) => (b.length > a.length ? b : a), "");

  return (
    <span className="relative block">
      <span aria-hidden="true" className="invisible">
        {longest}
      </span>
      <span className="absolute inset-0">
        {visible}
        <span
          className="ml-0.5 inline-block h-[1.15em] w-[2px] animate-pulse rounded-full bg-accent-text align-text-bottom"
          aria-hidden="true"
        />
      </span>
    </span>
  );
}
