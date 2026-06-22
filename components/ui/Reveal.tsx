"use client";

import { motion } from "motion/react";
import type { TargetAndTransition } from "motion/react";
import type { ReactNode } from "react";

import { useReducedMotionSafe } from "@/lib/useReducedMotionSafe";

type RevealVariant = "rise" | "scale" | "clip" | "fade";

type RevealProps = {
  children: ReactNode;
  className?: string;
  delay?: number;
  duration?: number;
  variant?: RevealVariant;
  y?: number;
};

const variantStyles: Record<RevealVariant, (y: number) => TargetAndTransition> = {
  rise: (y) => ({ opacity: 0, y }),
  scale: () => ({ opacity: 0, scale: 0.96, y: 18 }),
  clip: (y) => ({ opacity: 0, y, clipPath: "inset(0 0 100% 0)" }),
  fade: () => ({ opacity: 0 }),
};

const visibleStyles: Record<RevealVariant, TargetAndTransition> = {
  rise: { opacity: 1, y: 0 },
  scale: { opacity: 1, scale: 1, y: 0 },
  clip: { opacity: 1, y: 0, clipPath: "inset(0 0 0% 0)" },
  fade: { opacity: 1 },
};

/** Editorial scroll reveal primitive. Honors reduced-motion. */
export function Reveal({
  children,
  className,
  delay = 0,
  duration = 0.75,
  variant = "rise",
  y = 26,
}: RevealProps) {
  const reduce = useReducedMotionSafe();

  if (reduce) {
    return <div className={className}>{children}</div>;
  }

  return (
    <motion.div
      className={className}
      initial={variantStyles[variant](y)}
      whileInView={visibleStyles[variant]}
      viewport={{ once: true, margin: "-90px" }}
      transition={{ duration, delay, ease: [0.22, 1, 0.36, 1] }}
    >
      {children}
    </motion.div>
  );
}
