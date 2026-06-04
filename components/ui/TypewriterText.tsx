"use client";

import { useEffect, useState } from "react";
import { useReducedMotion } from "motion/react";

type TypewriterTextProps = {
  text: string;
  className?: string;
  /** Milliseconds per character. */
  speed?: number;
  /** Delay before typing begins, in milliseconds. */
  startDelay?: number;
  /** Tailwind classes for the block cursor (defaults to current text color). */
  cursorClassName?: string;
};

/**
 * Types `text` out character-by-character with a terminal-style block cursor.
 * The cursor stays solid while typing and blinks once finished. Honors
 * prefers-reduced-motion (renders the full text immediately) and keeps the
 * full sentence available to screen readers while the animated copy is hidden.
 */
export function TypewriterText({
  text,
  className = "",
  speed = 18,
  startDelay = 0,
  cursorClassName = "bg-current",
}: TypewriterTextProps) {
  const reduce = useReducedMotion();
  const [count, setCount] = useState(0);

  useEffect(() => {
    // Reduced motion: skip the animation entirely (text is derived below).
    if (reduce) return;

    let typed = 0;
    let interval: ReturnType<typeof setInterval> | undefined;

    // setState only runs inside these async timer callbacks, never
    // synchronously in the effect body.
    const starter = setTimeout(() => {
      setCount(0);
      interval = setInterval(() => {
        typed += 1;
        setCount(typed);
        if (typed >= text.length && interval) clearInterval(interval);
      }, speed);
    }, startDelay);

    return () => {
      clearTimeout(starter);
      if (interval) clearInterval(interval);
    };
  }, [text, speed, startDelay, reduce]);

  const visible = reduce ? text : text.slice(0, count);
  const done = reduce || count >= text.length;

  return (
    <span className={className}>
      <span className="sr-only">{text}</span>
      <span aria-hidden="true">
        {visible}
        <span
          className={`ml-0.5 inline-block h-[1.05em] w-[0.5em] translate-y-[0.12em] align-baseline ${cursorClassName} ${
            done ? "animate-cursor-blink" : ""
          }`}
        />
      </span>
    </span>
  );
}
