"use client";

import { tracks, type Track } from "@/data/conference";

export type TrackValue = Track | "all";

export function TrackFilter({
  value,
  onChange,
  className = "",
}: {
  value: TrackValue;
  onChange: (value: TrackValue) => void;
  className?: string;
}) {
  const options: TrackValue[] = ["all", ...tracks];
  return (
    <div
      role="group"
      aria-label="Filter the schedule by room"
      className={`flex flex-wrap gap-2 ${className}`}
    >
      {options.map((option) => {
        const active = value === option;
        return (
          <button
            key={option}
            type="button"
            onClick={() => onChange(option)}
            aria-pressed={active}
            className={`border px-3.5 py-1.5 font-mono text-xs font-medium uppercase tracking-[0.14em] transition-colors duration-200 ${
              active
                ? "border-navy bg-navy text-paper"
                : "border-ink/25 text-ink-muted hover:border-ink/55 hover:text-ink"
            }`}
          >
            {option === "all" ? "All rooms" : option}
          </button>
        );
      })}
    </div>
  );
}
