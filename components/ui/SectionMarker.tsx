"use client";

import { motion } from "motion/react";

import { SunGlyph } from "@/components/motifs/Sunburst";
import { useReducedMotionSafe } from "@/lib/useReducedMotionSafe";

type SectionMarkerProps = {
  index: number;
  label: string;
  tone?: "ink" | "paper";
  className?: string;
};

/**
 * The editorial section eyebrow: a sun mark, a section number, a label,
 * and a hairline rule. Replaces the generic uppercase-tracked eyebrow.
 */
export function SectionMarker({
  index,
  label,
  tone = "ink",
  className = "",
}: SectionMarkerProps) {
  const onPaper = tone === "paper";
  const reduce = useReducedMotionSafe();

  const initial = reduce ? false : { opacity: 0, y: 12 };
  const animate = { opacity: 1, y: 0 };
  const transition = { duration: 0.65, ease: [0.22, 1, 0.36, 1] as const };

  return (
    <motion.div
      initial={initial}
      whileInView={animate}
      viewport={{ once: true, margin: "-80px" }}
      transition={transition}
      className={`flex items-center gap-3 sm:gap-4 ${className}`}
    >
      <motion.span
        aria-hidden="true"
        initial={reduce ? false : { scale: 0.65, rotate: -24, opacity: 0 }}
        whileInView={{ scale: 1, rotate: 0, opacity: 1 }}
        viewport={{ once: true, margin: "-80px" }}
        transition={{ duration: 0.7, ease: [0.22, 1, 0.36, 1] }}
        className={`h-3.5 w-3.5 shrink-0 ${onPaper ? "text-gold-soft" : "text-gold"}`}
      >
        <SunGlyph className="h-full w-full" />
      </motion.span>
      <span
        className={`font-mono text-xs font-medium tracking-[0.14em] ${
          onPaper ? "text-gold-soft" : "text-gold-ink"
        }`}
      >
        № {String(index).padStart(2, "0")}
      </span>
      <span
        className={`font-mono text-xs font-medium uppercase tracking-[0.22em] ${
          onPaper ? "text-paper/80" : "text-ink-muted"
        }`}
      >
        {label}
      </span>
      <motion.span
        initial={reduce ? false : { scaleX: 0 }}
        whileInView={{ scaleX: 1 }}
        viewport={{ once: true, margin: "-80px" }}
        transition={{ duration: 0.9, delay: 0.1, ease: [0.22, 1, 0.36, 1] }}
        className={`h-px flex-1 origin-left ${onPaper ? "bg-paper/28" : "bg-ink/18"}`}
      />
    </motion.div>
  );
}
