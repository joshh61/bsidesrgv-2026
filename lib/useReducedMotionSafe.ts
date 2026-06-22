"use client";

import { useEffect, useState } from "react";
import { useReducedMotion } from "motion/react";

/**
 * Hydration-safe wrapper around motion's `useReducedMotion`.
 *
 * `useReducedMotion` reads the prefers-reduced-motion media query, which does
 * not exist during server rendering. It returns `null` on the server but the
 * real preference on the client's first render, so any component that branches
 * its rendered output (text, inline style, motion `initial`) on it produces a
 * server/client hydration mismatch (React error #418) for visitors who prefer
 * reduced motion.
 *
 * This hook reports "no reduction" for the first client render so it matches the
 * server, then switches to the real preference once hydrated. Components can
 * branch on it freely without breaking hydration; reduced motion still takes
 * effect immediately after mount.
 */
export function useReducedMotionSafe(): boolean {
  const reduce = useReducedMotion();
  const [hydrated, setHydrated] = useState(false);
  useEffect(() => setHydrated(true), []);
  return hydrated ? reduce ?? false : false;
}
