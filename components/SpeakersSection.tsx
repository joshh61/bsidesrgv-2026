"use client";

import { useRef } from "react";
import Image from "next/image";

import { speakers, type Speaker } from "@/data/conference";
import { SectionMarker } from "@/components/ui/SectionMarker";
import { Reveal } from "@/components/ui/Reveal";
import { SunGlyph } from "@/components/motifs/Sunburst";

/** Two-letter initials from a presenter name (e.g. "Dirce E. Hernandez" -> "DH"). */
function initials(name: string): string {
  const parts = name.trim().split(/\s+/);
  if (parts.length === 1) return parts[0]!.charAt(0).toUpperCase();
  return (
    parts[0]!.charAt(0) + parts[parts.length - 1]!.charAt(0)
  ).toUpperCase();
}

function SpeakerCard({ speaker }: { speaker: Speaker }) {
  return (
    <a
      href={`/speakers/${speaker.slug}`}
      className="group/card relative flex w-[17rem] shrink-0 snap-start flex-col border border-ink/15 bg-paper transition-colors duration-300 hover:bg-paper-warm sm:w-[19rem]"
    >
      {/* portrait: real photo when available, styled placeholder otherwise */}
      <div className="relative aspect-[4/5] overflow-hidden bg-navy">
        {speaker.photo ? (
          <Image
            src={speaker.photo}
            alt={speaker.name}
            fill
            sizes="(max-width: 640px) 17rem, 19rem"
            className="object-cover transition-transform duration-500 group-hover/card:scale-105"
          />
        ) : (
          <div className="flex h-full w-full flex-col items-center justify-center gap-3 text-paper">
            <span className="font-display text-6xl text-gold-soft">
              {initials(speaker.name)}
            </span>
            <span className="font-mono text-[0.65rem] font-medium uppercase tracking-[0.18em] text-paper/80">
              Photo coming soon
            </span>
          </div>
        )}
        <span className="absolute left-4 top-4 inline-flex items-center gap-1.5 bg-paper/95 px-2.5 py-1 font-mono text-[0.65rem] font-medium uppercase tracking-[0.16em] text-gold-ink">
          {speaker.isKeynote ? (
            <>
              <SunGlyph className="h-3 w-3 text-gold" /> Keynote
            </>
          ) : speaker.isAlternate ? (
            "Alternate"
          ) : (
            speaker.sessionId
          )}
        </span>
      </div>

      {/* meta */}
      <div className="flex flex-1 flex-col p-5">
        <h3 className="font-display text-2xl leading-tight text-ink">
          {speaker.name}
        </h3>
        <p className="mt-2 line-clamp-3 text-base leading-snug text-ink-muted">
          {speaker.talkTitle}
        </p>
        <p className="mt-4 font-mono text-xs font-medium uppercase tracking-[0.12em] text-gold-ink">
          {speaker.isAlternate
            ? `${speaker.length} · Alternate`
            : `${speaker.room} · ${speaker.timeSlot ?? speaker.length}`}
        </p>
        <span className="mt-3 inline-flex items-center gap-1.5 font-mono text-[0.7rem] font-medium uppercase tracking-[0.14em] text-ink-muted transition-colors duration-300 group-hover/card:text-gold-ink">
          View speaker
          <span
            aria-hidden="true"
            className="transition-transform duration-300 group-hover/card:translate-x-1"
          >
            →
          </span>
        </span>
      </div>
    </a>
  );
}

export function SpeakersSection() {
  const trackRef = useRef<HTMLDivElement>(null);

  const scrollByCards = (direction: 1 | -1) => {
    const track = trackRef.current;
    if (!track) return;
    // scroll roughly one card-and-a-half per click
    const amount = Math.round(track.clientWidth * 0.8) * direction;
    track.scrollBy({ left: amount, behavior: "smooth" });
  };

  return (
    <section id="speakers" className="mx-auto max-w-6xl px-5 py-24 sm:py-28">
      <SectionMarker index={6} label="Speakers" />

      <Reveal variant="clip">
        <div className="mt-12 flex flex-wrap items-end justify-between gap-x-10 gap-y-5">
          <div className="max-w-3xl">
            <h2 className="font-display text-[clamp(2.2rem,4.8vw,3.8rem)] leading-[1.04] text-ink">
              The voices taking the stage.
            </h2>
            <p className="mt-5 max-w-2xl text-pretty text-lg leading-relaxed text-ink-muted">
              A lineup of practitioners, researchers, and community leaders from
              across the Valley and beyond. Tap any speaker for their talk and
              session details. Bios and photos are being added as they arrive.
            </p>
          </div>

          {/* carousel controls */}
          <div className="flex gap-2">
            <button
              type="button"
              onClick={() => scrollByCards(-1)}
              aria-label="Scroll to previous speakers"
              className="flex h-11 w-11 items-center justify-center border border-navy/35 text-navy transition-colors duration-300 hover:bg-navy hover:text-paper focus-visible:bg-navy focus-visible:text-paper"
            >
              <span aria-hidden="true">←</span>
            </button>
            <button
              type="button"
              onClick={() => scrollByCards(1)}
              aria-label="Scroll to next speakers"
              className="flex h-11 w-11 items-center justify-center border border-navy/35 text-navy transition-colors duration-300 hover:bg-navy hover:text-paper focus-visible:bg-navy focus-visible:text-paper"
            >
              <span aria-hidden="true">→</span>
            </button>
          </div>
        </div>
      </Reveal>

      {/* horizontal carousel */}
      <div
        ref={trackRef}
        className="mt-12 flex snap-x snap-mandatory gap-5 overflow-x-auto pb-4 [scrollbar-width:none] [&::-webkit-scrollbar]:hidden"
      >
        {speakers.map((speaker) => (
          <SpeakerCard key={speaker.slug} speaker={speaker} />
        ))}
      </div>

      <p className="mt-2 font-mono text-xs font-medium uppercase tracking-[0.16em] text-ink-muted">
        {speakers.length} speakers · schedule subject to change
      </p>
    </section>
  );
}
