"use client";

import { motion, useReducedMotion } from "motion/react";

type DrawRuleProps = {
  className?: string;
  origin?: "left" | "center";
  delay?: number;
};

/**
 * A hairline that draws itself in (scaleX 0 -> 1) as it scrolls into view.
 * Mirrors the SectionMarker eyebrow rule. Honors reduced-motion.
 */
export function DrawRule({
  className = "",
  origin = "left",
  delay = 0,
}: DrawRuleProps) {
  const reduce = useReducedMotion();
  return (
    <motion.span
      aria-hidden="true"
      initial={reduce ? false : { scaleX: 0 }}
      whileInView={{ scaleX: 1 }}
      viewport={{ once: true, margin: "-60px" }}
      transition={{ duration: 0.9, delay, ease: [0.22, 1, 0.36, 1] }}
      className={`block h-px ${
        origin === "center" ? "origin-center" : "origin-left"
      } ${className}`}
    />
  );
}
