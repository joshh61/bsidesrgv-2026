"use client";

import { useCallback, useEffect, useRef, useState } from "react";
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
  const [canLeft, setCanLeft] = useState(false);
  const [canRight, setCanRight] = useState(false);
  const [progress, setProgress] = useState(0); // 0..1 position along the track
  const [thumb, setThumb] = useState(1); // 0..1 fraction of content in view

  // Recompute edge state + indicator from the live scroll geometry.
  const update = useCallback(() => {
    const el = trackRef.current;
    if (!el) return;
    const max = el.scrollWidth - el.clientWidth;
    setCanLeft(el.scrollLeft > 2);
    setCanRight(el.scrollLeft < max - 2);
    setProgress(max > 0 ? el.scrollLeft / max : 0);
    setThumb(el.scrollWidth > 0 ? el.clientWidth / el.scrollWidth : 1);
  }, []);

  useEffect(() => {
    update();
    const el = trackRef.current;
    if (!el) return;
    const ro = new ResizeObserver(update);
    ro.observe(el);
    return () => ro.disconnect();
  }, [update]);

  const scrollByCards = (direction: 1 | -1) => {
    const track = trackRef.current;
    if (!track) return;
    // scroll roughly one card-and-a-half per click
    const amount = Math.round(track.clientWidth * 0.8) * direction;
    track.scrollBy({ left: amount, behavior: "smooth" });
  };

  // Mouse drag-to-scroll. Touch keeps native momentum; a real drag suppresses
  // the click so it never navigates into a card.
  const drag = useRef({ active: false, startX: 0, startLeft: 0, moved: false });

  const onPointerDown = (e: React.PointerEvent<HTMLDivElement>) => {
    if (e.pointerType !== "mouse") return;
    const el = trackRef.current;
    if (!el) return;
    drag.current = {
      active: true,
      startX: e.clientX,
      startLeft: el.scrollLeft,
      moved: false,
    };
    el.setPointerCapture(e.pointerId);
  };

  const onPointerMove = (e: React.PointerEvent<HTMLDivElement>) => {
    const el = trackRef.current;
    if (!el || !drag.current.active) return;
    const dx = e.clientX - drag.current.startX;
    if (Math.abs(dx) > 6) drag.current.moved = true;
    el.scrollLeft = drag.current.startLeft - dx;
  };

  const endDrag = (e: React.PointerEvent<HTMLDivElement>) => {
    const el = trackRef.current;
    if (el && el.hasPointerCapture(e.pointerId))
      el.releasePointerCapture(e.pointerId);
    drag.current.active = false;
  };

  const onClickCapture = (e: React.MouseEvent<HTMLDivElement>) => {
    if (drag.current.moved) {
      e.preventDefault();
      e.stopPropagation();
      drag.current.moved = false;
    }
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
              disabled={!canLeft}
              aria-label="Scroll to previous speakers"
              className="flex h-11 w-11 items-center justify-center border border-navy/35 text-navy transition-colors duration-300 hover:bg-navy hover:text-paper focus-visible:bg-navy focus-visible:text-paper disabled:cursor-not-allowed disabled:border-ink/15 disabled:bg-transparent disabled:text-ink/25"
            >
              <span aria-hidden="true">←</span>
            </button>
            <button
              type="button"
              onClick={() => scrollByCards(1)}
              disabled={!canRight}
              aria-label="Scroll to next speakers"
              className="flex h-11 w-11 items-center justify-center border border-navy/35 text-navy transition-colors duration-300 hover:bg-navy hover:text-paper focus-visible:bg-navy focus-visible:text-paper disabled:cursor-not-allowed disabled:border-ink/15 disabled:bg-transparent disabled:text-ink/25"
            >
              <span aria-hidden="true">→</span>
            </button>
          </div>
        </div>
      </Reveal>

      {/* horizontal carousel */}
      <div
        ref={trackRef}
        onScroll={update}
        onPointerDown={onPointerDown}
        onPointerMove={onPointerMove}
        onPointerUp={endDrag}
        onPointerCancel={endDrag}
        onClickCapture={onClickCapture}
        className="mt-12 flex cursor-grab snap-x snap-mandatory gap-5 overflow-x-auto pb-4 select-none active:cursor-grabbing [scrollbar-width:none] [&::-webkit-scrollbar]:hidden"
      >
        {speakers.map((speaker) => (
          <SpeakerCard key={speaker.slug} speaker={speaker} />
        ))}
      </div>

      {/* position indicator */}
      <div className="mt-5 flex items-center gap-4">
        <div
          className="relative h-0.5 w-full max-w-[14rem] bg-ink/15"
          aria-hidden="true"
        >
          <div
            className="absolute inset-y-0 left-0 bg-gold transition-transform duration-150 ease-out"
            style={{
              width: `${thumb * 100}%`,
              transform: `translateX(${
                thumb < 1 ? (progress * (1 - thumb) * 100) / thumb : 0
              }%)`,
            }}
          />
        </div>
        <p className="shrink-0 font-mono text-xs font-medium uppercase tracking-[0.16em] text-ink-muted">
          {speakers.length} speakers · subject to change
        </p>
      </div>
    </section>
  );
}
