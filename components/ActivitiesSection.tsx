import { featuredActivities } from "@/data/conference";
import { SectionMarker } from "@/components/ui/SectionMarker";
import { Reveal } from "@/components/ui/Reveal";
import { SunGlyph } from "@/components/motifs/Sunburst";
import { PalmEngraving } from "@/components/motifs/PalmEngraving";

export function ActivitiesSection() {
  return (
    <section id="activities" className="relative overflow-hidden bg-paper-warm">
      <PalmEngraving
        variant={2}
        className="absolute -right-20 top-16 w-80 opacity-[0.08]"
      />

      <div className="relative mx-auto max-w-6xl px-5 py-24 sm:py-28">
        <SectionMarker index={6} label="Villages & Activities" />

        <Reveal>
          <h2 className="mt-12 max-w-3xl font-display text-[clamp(2.2rem,4.8vw,3.8rem)] leading-[1.03] text-ink">
            Hands-on learning, beyond the talks.
          </h2>
          <p className="mt-5 max-w-xl text-pretty leading-relaxed text-ink-muted">
            Villages run throughout the day — drop in, get hands-on, and learn
            something practical. More activities are announced as the conference
            gets closer.
          </p>
        </Reveal>

        <div className="mt-12 flex flex-col">
          {featuredActivities.map((activity, i) => (
            <Reveal key={activity.title}>
              <article
                className={`group flex flex-col gap-x-9 gap-y-3 border-t border-ink/15 py-9 sm:flex-row sm:items-baseline ${
                  i % 2 === 1 ? "sm:pl-[10%]" : ""
                }`}
              >
                <span className="font-display text-5xl leading-none text-gold/45 transition-colors duration-300 group-hover:text-gold sm:text-6xl">
                  {String(i + 1).padStart(2, "0")}
                </span>
                <div className="sm:max-w-2xl">
                  <h3 className="flex items-center gap-3 font-display text-[clamp(1.6rem,3vw,2.4rem)] leading-tight text-ink">
                    {activity.title}
                    <SunGlyph className="h-4 w-4 shrink-0 text-gold opacity-0 transition-opacity duration-300 group-hover:opacity-100" />
                  </h3>
                  <p className="mt-2.5 leading-relaxed text-ink-muted">
                    {activity.description}
                  </p>
                </div>
              </article>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}
