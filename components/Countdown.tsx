"use client";

import { useEffect, useState } from "react";

// Doors open at 9:00 AM CDT (UTC-5) on event day. An absolute instant, so the
// countdown is correct from any visitor timezone.
const TARGET = new Date("2026-06-27T09:00:00-05:00").getTime();

function breakdown(ms: number) {
  const total = Math.max(0, Math.floor(ms / 1000));
  return {
    days: Math.floor(total / 86400),
    hours: Math.floor((total % 86400) / 3600),
    minutes: Math.floor((total % 3600) / 60),
    seconds: total % 60,
  };
}

export function Countdown({
  onDark = false,
  className = "",
}: {
  onDark?: boolean;
  className?: string;
}) {
  // Start null so server and first client render match (avoids hydration drift).
  const [remaining, setRemaining] = useState<number | null>(null);

  useEffect(() => {
    const tick = () => setRemaining(TARGET - Date.now());
    tick();
    const id = setInterval(tick, 1000);
    return () => clearInterval(id);
  }, []);

  if (remaining === null) return null;

  const { days, hours, minutes, seconds } = breakdown(remaining);
  const units = [
    { label: "Days", value: days },
    { label: "Hours", value: hours },
    { label: "Minutes", value: minutes },
    { label: "Seconds", value: seconds },
  ];

  const numeral = onDark ? "text-paper" : "text-ink";
  const label = onDark ? "text-paper/60" : "text-ink-muted";
  const divider = onDark ? "bg-paper/15" : "bg-ink/15";

  return (
    <div
      role="timer"
      aria-label={`${days} days, ${hours} hours, ${minutes} minutes until doors open`}
      className={`grid grid-cols-4 gap-px border ${
        onDark ? "border-paper/15 bg-paper/15" : "border-ink/15 bg-ink/15"
      } ${className}`}
    >
      {units.map((unit, i) => (
        <div
          key={unit.label}
          className={`relative px-2 py-3 text-center ${onDark ? "bg-navy" : "bg-paper"}`}
        >
          {i > 0 ? (
            <span
              aria-hidden="true"
              className={`absolute left-0 top-1/2 hidden h-7 w-px -translate-y-1/2 ${divider} sm:block`}
            />
          ) : null}
          <span
            className={`block font-display text-3xl leading-none numerals-tabular sm:text-4xl ${numeral}`}
          >
            {String(unit.value).padStart(2, "0")}
          </span>
          <span
            className={`mt-1.5 block font-mono text-[0.6rem] font-medium uppercase tracking-[0.16em] ${label}`}
          >
            {unit.label}
          </span>
        </div>
      ))}
    </div>
  );
}
