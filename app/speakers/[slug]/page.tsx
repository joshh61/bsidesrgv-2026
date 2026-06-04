import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { notFound } from "next/navigation";

import { conference, speakers } from "@/data/conference";
import { SiteHeader } from "@/components/SiteHeader";
import { SiteFooter } from "@/components/SiteFooter";
import { SectionMarker } from "@/components/ui/SectionMarker";
import { CTA } from "@/components/ui/CTA";
import { SunGlyph } from "@/components/motifs/Sunburst";

type SpeakerPageParams = { slug: string };

/** Two-letter initials from a presenter name (e.g. "Dirce E. Hernandez" -> "DH"). */
function initials(name: string): string {
  const parts = name.trim().split(/\s+/);
  if (parts.length === 1) return parts[0]!.charAt(0).toUpperCase();
  return (parts[0]!.charAt(0) + parts[parts.length - 1]!.charAt(0)).toUpperCase();
}

export function generateStaticParams(): SpeakerPageParams[] {
  return speakers.map((speaker) => ({ slug: speaker.slug }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<SpeakerPageParams>;
}): Promise<Metadata> {
  const { slug } = await params;
  const speaker = speakers.find((s) => s.slug === slug);
  if (!speaker) return { title: `Speaker | ${conference.name} ${conference.year}` };
  return {
    title: `${speaker.name} | ${conference.name} ${conference.year}`,
    description: `${speaker.name} presents "${speaker.talkTitle}" at the ${conference.edition}.`,
  };
}

export default async function SpeakerPage({
  params,
}: {
  params: Promise<SpeakerPageParams>;
}) {
  const { slug } = await params;
  const speaker = speakers.find((s) => s.slug === slug);

  if (!speaker) {
    notFound();
  }

  const sessionLabel = speaker.isKeynote
    ? "Keynote"
    : speaker.isAlternate
      ? "Alternate Session"
      : `Session ${speaker.sessionId}`;

  return (
    <>
      <SiteHeader />
      <main id="top">
        <section className="mx-auto max-w-6xl px-5 py-20 sm:py-24">
          <SectionMarker index={6} label="Speaker" />

          <Link
            href="/#agenda"
            className="mt-8 inline-flex items-center gap-1.5 font-mono text-xs font-medium uppercase tracking-[0.14em] text-ink-muted transition-colors hover:text-ink"
          >
            <span aria-hidden="true">←</span> Back to schedule
          </Link>

          <div className="mt-8 grid gap-x-14 gap-y-10 lg:grid-cols-[0.8fr_1.2fr]">
            {/* portrait */}
            <div className="relative aspect-[4/5] overflow-hidden border border-ink/15 bg-navy">
              {speaker.photo ? (
                <Image
                  src={speaker.photo}
                  alt={speaker.name}
                  fill
                  sizes="(max-width: 1024px) 100vw, 40vw"
                  className="object-cover"
                />
              ) : (
                <div className="flex h-full w-full flex-col items-center justify-center gap-4 text-paper">
                  <span className="font-display text-[6rem] leading-none text-gold-soft">
                    {initials(speaker.name)}
                  </span>
                  <span className="font-mono text-xs font-medium uppercase tracking-[0.18em] text-paper/60">
                    Photo coming soon
                  </span>
                </div>
              )}
            </div>

            {/* details */}
            <div>
              <p className="inline-flex items-center gap-2 font-mono text-xs font-medium uppercase tracking-[0.18em] text-gold-ink">
                {speaker.isKeynote ? (
                  <SunGlyph className="h-3.5 w-3.5 text-gold" />
                ) : null}
                {sessionLabel}
              </p>
              <h1 className="mt-3 font-display text-[clamp(2.4rem,5.2vw,4rem)] leading-[1.04] text-ink">
                {speaker.name}
              </h1>
              <p className="mt-5 text-pretty font-display text-2xl leading-snug text-ink">
                {speaker.talkTitle}
              </p>

              <dl className="mt-9 grid gap-px border border-ink/15 bg-ink/15 sm:grid-cols-3">
                {!speaker.isAlternate ? (
                  <div className="bg-paper p-5">
                    <dt className="font-mono text-xs font-medium uppercase tracking-[0.16em] text-gold-ink">
                      Room
                    </dt>
                    <dd className="mt-2 font-display text-xl text-ink">
                      {speaker.room}
                    </dd>
                  </div>
                ) : null}
                {speaker.timeSlot ? (
                  <div className="bg-paper p-5">
                    <dt className="font-mono text-xs font-medium uppercase tracking-[0.16em] text-gold-ink">
                      Time
                    </dt>
                    <dd className="mt-2 font-display text-xl text-ink">
                      {speaker.timeSlot}
                    </dd>
                  </div>
                ) : null}
                <div className="bg-paper p-5">
                  <dt className="font-mono text-xs font-medium uppercase tracking-[0.16em] text-gold-ink">
                    Length
                  </dt>
                  <dd className="mt-2 font-display text-xl text-ink">
                    {speaker.length}
                  </dd>
                </div>
              </dl>

              <div className="mt-9">
                <p className="font-mono text-xs font-medium uppercase tracking-[0.18em] text-gold-ink">
                  About the talk
                </p>
                <p className="mt-3 text-lg leading-relaxed text-ink-muted">
                  {speaker.summary}
                </p>
              </div>

              <div className="mt-8">
                <p className="font-mono text-xs font-medium uppercase tracking-[0.18em] text-gold-ink">
                  About {speaker.name}
                </p>
                <p className="mt-3 text-lg leading-relaxed text-ink-muted">
                  {speaker.bio}
                </p>
              </div>

              <div className="mt-10 flex flex-col gap-3 sm:flex-row">
                <CTA href={conference.registrationUrl} variant="primary">
                  Register to Attend
                </CTA>
                <CTA href="/#speakers" variant="outline">
                  See All Speakers
                </CTA>
              </div>
            </div>
          </div>
        </section>
      </main>
      <SiteFooter />
    </>
  );
}
