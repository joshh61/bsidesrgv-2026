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
    let timer: ReturnType<typeof setTimeout>;

    // Natural typing rhythm: linger after sentence/clause punctuation and move
    // a touch quicker through spaces, so it reads like real terminal output
    // instead of a mechanical metronome. setState only runs inside async timer
    // callbacks, never synchronously in the effect body.
    const delayAfter = (char: string | undefined): number => {
      if (!char) return speed;
      if (/[.!?]/.test(char)) return speed * 8;
      if (/[,;:—–]/.test(char)) return speed * 5;
      if (char === " ") return speed * 0.55;
      return speed;
    };

    const tick = () => {
      typed += 1;
      setCount(typed);
      if (typed >= text.length) return;
      timer = setTimeout(tick, delayAfter(text[typed - 1]));
    };

    const starter = setTimeout(() => {
      setCount(0);
      timer = setTimeout(tick, speed);
    }, startDelay);

    return () => {
      clearTimeout(starter);
      clearTimeout(timer);
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
