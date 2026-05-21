import { audienceGroups } from "@/data/conference";
import { SectionMarker } from "@/components/ui/SectionMarker";
import { Reveal } from "@/components/ui/Reveal";
import { SunGlyph } from "@/components/motifs/Sunburst";

export function AudienceSection() {
  return (
    <section className="bg-paper-warm">
      <div className="mx-auto max-w-6xl px-5 py-24 sm:py-28">
        <SectionMarker index={3} label="Who Should Attend" />

        <Reveal variant="clip">
          <h2 className="mt-12 max-w-3xl font-display text-[clamp(2.2rem,4.8vw,3.8rem)] leading-[1.03] text-ink">
            Built for everyone growing security in South Texas.
          </h2>
          <p className="mt-5 max-w-2xl text-pretty text-lg leading-relaxed text-ink-muted">
            BSides RGV is for anyone who wants to learn, share, mentor, or build
            stronger technical communities across the Rio Grande Valley.
          </p>
        </Reveal>

        <div className="mt-14 border-t border-ink/20">
          {audienceGroups.map((group, i) => (
            <Reveal key={group.title} delay={i * 0.04} variant="scale">
              <article className="group grid grid-cols-[2.5rem_1fr] gap-x-5 border-b border-ink/12 py-7 transition-all duration-300 hover:bg-paper/70 focus-within:bg-paper/70 sm:grid-cols-[4rem_1fr] sm:px-3">
                <span className="font-mono text-sm font-medium tracking-[0.08em] text-gold-ink">
                  № {String(i + 1).padStart(2, "0")}
                </span>
                <div className="lg:grid lg:grid-cols-[18rem_1fr] lg:items-baseline lg:gap-x-8">
                  <h3 className="flex items-center gap-3 font-display text-2xl leading-tight text-ink">
                    <span className="transition-transform duration-300 group-hover:translate-x-1.5">
                      {group.title}
                    </span>
                    <SunGlyph className="h-3.5 w-3.5 shrink-0 text-gold opacity-0 transition-opacity duration-300 group-hover:opacity-100" />
                  </h3>
                  <p className="mt-2 text-lg leading-relaxed text-ink-muted lg:mt-0">
                    {group.description}
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
