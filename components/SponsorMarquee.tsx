"use client";

import Image from "next/image";

import { sponsors, type Sponsor } from "@/data/conference";
import { useReducedMotionSafe } from "@/lib/useReducedMotionSafe";

// A consistent band height reads as a rhythm even though the logos have very
// different aspect ratios.
const LOGO_CLASS =
  "max-h-11 w-auto max-w-[9.5rem] object-contain sm:max-h-12 sm:max-w-[11rem]";

function Logo({ sponsor }: { sponsor: Sponsor }) {
  if (sponsor.logo) {
    return (
      <Image
        src={sponsor.logo}
        alt={sponsor.name}
        width={220}
        height={90}
        className={LOGO_CLASS}
      />
    );
  }
  return (
    <span className="whitespace-nowrap font-display text-xl text-ink sm:text-2xl">
      {sponsor.name}
    </span>
  );
}

/** Wraps a logo in its outbound link when one exists. */
function LinkedLogo({ sponsor }: { sponsor: Sponsor }) {
  if (!sponsor.url) return <Logo sponsor={sponsor} />;
  return (
    <a
      href={sponsor.url}
      target="_blank"
      rel="noopener noreferrer"
      className="inline-flex items-center transition-transform duration-300 hover:scale-110 focus-visible:scale-110"
    >
      <Logo sponsor={sponsor} />
    </a>
  );
}

const EDGE_MASK =
  "linear-gradient(to right, transparent 0, #000 5rem, #000 calc(100% - 5rem), transparent 100%)";

export function SponsorMarquee() {
  const reduce = useReducedMotionSafe();

  // Motion-sensitive visitors get every logo at rest, no scrolling.
  if (reduce) {
    return (
      <div className="flex flex-wrap items-center justify-center gap-x-12 gap-y-8 border border-ink/15 bg-paper px-6 py-10">
        {sponsors.map((sponsor) => (
          <div key={sponsor.name} className="flex h-12 items-center">
            <LinkedLogo sponsor={sponsor} />
          </div>
        ))}
      </div>
    );
  }

  return (
    <div
      className="pause-on-hover relative overflow-hidden border border-ink/15 bg-paper py-9"
      style={{ maskImage: EDGE_MASK, WebkitMaskImage: EDGE_MASK }}
    >
      <div className="flex w-max animate-marquee items-center">
        {[...sponsors, ...sponsors].map((sponsor, i) => {
          const isClone = i >= sponsors.length;
          return (
            <div
              key={`${sponsor.name}-${i}`}
              aria-hidden={isClone}
              className="flex h-12 shrink-0 items-center px-10"
            >
              {isClone ? (
                <Logo sponsor={sponsor} />
              ) : (
                <LinkedLogo sponsor={sponsor} />
              )}
            </div>
          );
        })}
      </div>
    </div>
  );
}
