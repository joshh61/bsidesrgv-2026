import { codeOfConduct, conference } from "@/data/conference";
import { SectionMarker } from "@/components/ui/SectionMarker";
import { Reveal } from "@/components/ui/Reveal";
import { CTA } from "@/components/ui/CTA";

export function ConductSection() {
  return (
    <section id="conduct" className="mx-auto max-w-6xl px-5 py-24 sm:py-28">
      <SectionMarker index={9} label="Code of Conduct" />

      <div className="mt-12 grid gap-x-14 gap-y-12 lg:grid-cols-[0.9fr_1.1fr]">
        <Reveal variant="clip">
          <h2 className="font-display text-[clamp(2.2rem,4.6vw,3.6rem)] leading-[1.03] text-ink">
            A respectful conference for everyone.
          </h2>
          <p className="mt-6 text-pretty text-lg leading-relaxed text-ink-muted">
            {codeOfConduct.pledge}
          </p>
          <div className="mt-8">
            <CTA href={`mailto:${conference.contactEmail}`} variant="outline">
              Report a Concern
            </CTA>
          </div>
        </Reveal>

        <Reveal delay={0.1} variant="scale">
          <p className="font-mono text-xs font-medium uppercase tracking-[0.18em] text-gold-ink">
            What we expect of everyone
          </p>
          <ol className="mt-5 border-t border-ink/20">
            {codeOfConduct.expected.map((item, i) => (
              <li
                key={item}
                className="flex gap-5 border-b border-ink/12 py-5"
              >
                <span className="font-mono text-sm font-medium text-gold-ink">
                  {String(i + 1).padStart(2, "0")}
                </span>
                <span className="text-lg leading-relaxed text-ink">{item}</span>
              </li>
            ))}
          </ol>
        </Reveal>
      </div>
    </section>
  );
}
