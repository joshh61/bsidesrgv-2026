import { aboutHighlights, conference } from "@/data/conference";
import { SectionMarker } from "@/components/ui/SectionMarker";
import { Reveal } from "@/components/ui/Reveal";
import { SunGlyph } from "@/components/motifs/Sunburst";

export function AboutSection() {
  return (
    <section className="mx-auto max-w-6xl px-5 py-24 sm:py-28">
      <SectionMarker index={2} label="About BSides RGV" />

      <div className="mt-12 grid gap-x-14 gap-y-9 lg:grid-cols-12">
        <Reveal className="lg:col-span-7" variant="clip">
          <h2 className="pb-1 font-display text-[clamp(2.3rem,5vw,4.1rem)] leading-[1.08] text-ink">
            A grassroots security conference, raised in the Valley.
          </h2>
        </Reveal>
        <Reveal className="lg:col-span-5 lg:pt-3" delay={0.08}>
          <p className="text-lg leading-relaxed text-ink first-letter:float-left first-letter:mr-3 first-letter:font-display first-letter:text-[3.6rem] first-letter:leading-[0.72] first-letter:text-gold">
            The {conference.edition} brings information security and information
            technology professionals from public and private sector
            organizations together for a community event in the Rio Grande
            Valley.
          </p>
        </Reveal>
      </div>

        <Reveal variant="scale">
        <blockquote className="my-16 border-y border-ink/15 py-12 text-center">
          <SunGlyph className="mx-auto h-5 w-5 text-gold" />
          <p className="mx-auto mt-6 max-w-4xl text-balance font-display text-[clamp(1.55rem,3.4vw,2.7rem)] italic leading-[1.18] text-ink">
            What makes a BSides different is the focus on creating opportunities
            for people to both present and participate, within an intimate
            atmosphere that inspires collaboration.
          </p>
          <p className="mt-6 font-mono text-xs font-medium uppercase tracking-[0.18em] text-gold-ink">
            The Security BSides framework
          </p>
        </blockquote>
      </Reveal>

      <div className="grid gap-x-10 gap-y-10 md:grid-cols-3">
        {aboutHighlights.map((highlight, i) => (
          <Reveal key={highlight.title} delay={i * 0.1}>
            <article className="border-t-2 border-ink/80 pt-5">
              <span className="font-mono text-xs font-medium tracking-[0.14em] text-gold-ink">
                № {String(i + 1).padStart(2, "0")}
              </span>
              <h3 className="mt-3 font-display text-2xl leading-tight text-ink">
                {highlight.title}
              </h3>
              <p className="mt-3 text-lg leading-relaxed text-ink-muted">
                {highlight.description}
              </p>
            </article>
          </Reveal>
        ))}
      </div>
    </section>
  );
}
