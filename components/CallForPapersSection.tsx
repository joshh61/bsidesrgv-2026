import {
  callForPresentations,
  conference,
  talkTopicExamples,
  volunteerInfo,
} from "@/data/conference";
import { SectionMarker } from "@/components/ui/SectionMarker";
import { Reveal } from "@/components/ui/Reveal";
import { CTA } from "@/components/ui/CTA";
import { Sunburst, SunGlyph } from "@/components/motifs/Sunburst";

export function CallForPapersSection() {
  return (
    <section id="cfp" className="relative overflow-hidden bg-navy text-paper">
      <div className="pointer-events-none absolute -right-32 -top-32 h-[520px] w-[520px] opacity-[0.16]">
        <Sunburst className="h-full w-full" />
      </div>

      <div className="relative mx-auto max-w-6xl px-5 py-24 sm:py-32">
        <SectionMarker index={4} label="Call for Presentations" tone="paper" />

        <div className="mt-12 grid gap-x-14 gap-y-14 lg:grid-cols-[1.15fr_0.85fr]">
          <Reveal>
            <span className="inline-flex items-center gap-2 bg-gold/15 px-3 py-1.5 font-mono text-[0.62rem] uppercase tracking-[0.2em] text-gold-soft">
              <span className="h-1.5 w-1.5 rounded-full bg-gold-soft" />
              {callForPresentations.status}
            </span>

            <h2 className="mt-5 font-display text-[clamp(2.6rem,6vw,5rem)] leading-[0.98]">
              Take the stage at BSides RGV.
            </h2>
            <p className="mt-6 max-w-lg text-pretty leading-relaxed text-paper/70">
              We are looking for presenters from the local community and beyond.
              There is real talent in the Valley — this is your chance to share
              it with your peers.
            </p>

            <div className="mt-9 border-t border-paper/15 pt-7">
              <p className="font-mono text-[0.6rem] uppercase tracking-[0.24em] text-paper/50">
                Submissions close
              </p>
              <p className="mt-2 font-display text-[clamp(2.4rem,5vw,3.6rem)] leading-none">
                May 31, <span className="italic text-gold-soft">2026</span>
              </p>
            </div>

            <div className="mt-8">
              <CTA href={conference.cfpUrl} variant="primary">
                Submit a Talk
              </CTA>
            </div>
          </Reveal>

          <Reveal delay={0.1}>
            <p className="font-mono text-[0.62rem] uppercase tracking-[0.24em] text-gold-soft">
              How it works
            </p>
            <ul className="mt-6 flex flex-col">
              {callForPresentations.details.map((detail) => (
                <li
                  key={detail}
                  className="flex gap-3.5 border-b border-paper/12 py-4 leading-relaxed text-paper/80"
                >
                  <SunGlyph className="mt-1 h-3.5 w-3.5 shrink-0 text-gold" />
                  <span>{detail}</span>
                </li>
              ))}
            </ul>
          </Reveal>
        </div>

        <Reveal>
          <div className="mt-16 border-t border-paper/15 pt-8">
            <p className="font-mono text-[0.62rem] uppercase tracking-[0.24em] text-gold-soft">
              Topics in scope
            </p>
            <p className="mt-5 flex flex-wrap items-center gap-x-1.5 gap-y-2">
              {talkTopicExamples.map((topic, i) => (
                <span key={topic} className="font-display text-xl text-paper/75 sm:text-2xl">
                  {topic}
                  {i < talkTopicExamples.length - 1 ? (
                    <span className="mx-2.5 text-gold">·</span>
                  ) : null}
                </span>
              ))}
            </p>
          </div>
        </Reveal>

        <Reveal>
          <div className="mt-12 border-l-2 border-ember pl-6">
            <p className="font-mono text-[0.6rem] uppercase tracking-[0.24em] text-ember">
              Volunteers · {volunteerInfo.status}
            </p>
            <p className="mt-2 max-w-2xl leading-relaxed text-paper/70">
              Volunteer applications are closed. Selections are communicated by
              email, selected volunteers receive a free volunteer t-shirt, and
              the team staffs enough help so volunteers can still attend some
              breakout sessions. Questions? Reach the organizers at{" "}
              <a
                href={`mailto:${conference.contactEmail}`}
                className="text-gold-soft underline underline-offset-4 hover:text-gold"
              >
                {conference.contactEmail}
              </a>
              .
            </p>
          </div>
        </Reveal>
      </div>
    </section>
  );
}
