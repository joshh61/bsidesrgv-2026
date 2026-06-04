import { SectionMarker } from "@/components/ui/SectionMarker";
import { Reveal } from "@/components/ui/Reveal";
import { CTA } from "@/components/ui/CTA";
import { SunGlyph } from "@/components/motifs/Sunburst";

// Placeholder tiles until real event photography is added.
const placeholders = [
  "Opening session",
  "Villages in action",
  "On the main stage",
  "The hallway track",
  "Community & sponsors",
  "Reception at dusk",
];

export function GallerySection() {
  return (
    <section id="gallery" className="mx-auto max-w-6xl px-5 py-24 sm:py-28">
      <SectionMarker index={10} label="Gallery & Archive" />

      <Reveal variant="clip">
        <div className="mt-12 grid gap-x-14 gap-y-5 lg:grid-cols-2 lg:items-end">
          <h2 className="font-display text-[clamp(2.2rem,4.8vw,3.8rem)] leading-[1.04] text-ink">
            The day, remembered.
          </h2>
          <p className="text-pretty text-lg leading-relaxed text-ink-muted">
            Photos from BSides RGV 2026 will live here after the event — and join
            a growing archive of past editions. Check back for the recap, or
            browse previous years in the archive.
          </p>
        </div>
      </Reveal>

      <Reveal variant="clip">
        <div className="mt-12 grid grid-cols-2 gap-px border border-ink/15 bg-ink/15 sm:grid-cols-3">
          {placeholders.map((caption) => (
            <div
              key={caption}
              className="group flex aspect-[4/3] flex-col items-center justify-center gap-3 bg-paper-warm px-5 text-center transition-colors duration-300 hover:bg-paper"
            >
              <SunGlyph className="h-5 w-5 text-gold/60 transition-colors duration-300 group-hover:text-gold" />
              <span className="font-mono text-xs font-medium uppercase tracking-[0.14em] text-ink-muted">
                {caption}
              </span>
              <span className="font-mono text-[0.65rem] font-medium uppercase tracking-[0.16em] text-ink-muted">
                Photo coming soon
              </span>
            </div>
          ))}
        </div>
      </Reveal>

      <Reveal>
        <div className="mt-10">
          <CTA href="/archive" variant="navy">
            Browse the Archive
          </CTA>
        </div>
      </Reveal>
    </section>
  );
}
