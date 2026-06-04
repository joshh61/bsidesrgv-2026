import type { Metadata } from "next";
import Link from "next/link";

import { archiveEvents, conference } from "@/data/conference";
import { SiteHeader } from "@/components/SiteHeader";
import { SiteFooter } from "@/components/SiteFooter";
import { SectionMarker } from "@/components/ui/SectionMarker";
import { Reveal } from "@/components/ui/Reveal";
import { SunGlyph } from "@/components/motifs/Sunburst";

export const metadata: Metadata = {
  title: `Archive | ${conference.name}`,
  description: `A historical showcase of past BSides RGV editions — photo galleries and recaps from previous years.`,
};

export default function ArchivePage() {
  return (
    <>
      <SiteHeader />
      <main id="top">
        <section className="mx-auto max-w-6xl px-5 py-20 sm:py-24">
          <SectionMarker index={10} label="Archive" />

          <Link
            href="/#gallery"
            className="mt-8 inline-flex items-center gap-1.5 font-mono text-xs font-medium uppercase tracking-[0.14em] text-ink-muted transition-colors hover:text-ink"
          >
            <span aria-hidden="true">←</span> Back to gallery
          </Link>

          <div className="mt-8 max-w-3xl">
            <h1 className="font-display text-[clamp(2.4rem,5.2vw,4.2rem)] leading-[1.02] text-ink">
              Seven years of BSides RGV.
            </h1>
            <p className="mt-5 text-pretty text-lg leading-relaxed text-ink-muted">
              A growing record of the conference, edition by edition. As each
              event wraps, its photo gallery and recap are archived here — a
              showcase for the community and a place future posts can link back
              to.
            </p>
          </div>

          <div className="mt-14 flex flex-col">
            {archiveEvents.map((event, i) => {
              const body = (
                <article
                  className={`group flex flex-col gap-x-9 gap-y-3 border-t border-ink/15 py-9 sm:flex-row sm:items-baseline ${
                    i === archiveEvents.length - 1 ? "border-b" : ""
                  }`}
                >
                  <span className="font-display text-5xl leading-none text-gold-ink/70 transition-colors duration-300 group-hover:text-gold sm:text-6xl">
                    {event.year}
                  </span>
                  <div className="sm:max-w-2xl">
                    <h2 className="flex items-center gap-3 font-display text-[clamp(1.6rem,3vw,2.4rem)] leading-tight text-ink">
                      {event.edition}
                      {event.comingSoon ? (
                        <span className="font-mono text-[0.65rem] font-medium uppercase tracking-[0.16em] text-gold-ink">
                          Coming soon
                        </span>
                      ) : (
                        <SunGlyph className="h-4 w-4 shrink-0 text-gold opacity-0 transition-opacity duration-300 group-hover:opacity-100" />
                      )}
                    </h2>
                    <p className="mt-2.5 text-lg leading-relaxed text-ink-muted">
                      {event.summary}
                    </p>
                  </div>
                </article>
              );

              // Editions with a real gallery link become clickable; placeholders don't.
              return event.href ? (
                <Reveal key={event.year} delay={i * 0.06}>
                  <a href={event.href} className="block">
                    {body}
                  </a>
                </Reveal>
              ) : (
                <Reveal key={event.year} delay={i * 0.06}>
                  {body}
                </Reveal>
              );
            })}
          </div>
        </section>
      </main>
      <SiteFooter />
    </>
  );
}
