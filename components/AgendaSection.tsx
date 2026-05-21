"use client";

import { useRef } from "react";
import { motion, useReducedMotion, useScroll, useTransform } from "motion/react";

import { agendaItems } from "@/data/conference";
import { SectionMarker } from "@/components/ui/SectionMarker";
import { Reveal } from "@/components/ui/Reveal";
import { Sunburst } from "@/components/motifs/Sunburst";

export function AgendaSection() {
  const trackRef = useRef<HTMLDivElement>(null);
  const reduce = useReducedMotion();
  const { scrollYProgress } = useScroll({
    target: trackRef,
    offset: ["start center", "end center"],
  });
  const sunTop = useTransform(scrollYProgress, [0, 1], ["0%", "100%"]);

  return (
    <section id="agenda" className="mx-auto max-w-6xl px-5 py-24 sm:py-28">
      <SectionMarker index={5} label="Agenda" />

      <Reveal>
        <h2 className="mt-12 max-w-3xl font-display text-[clamp(2.2rem,4.8vw,3.8rem)] leading-[1.03] text-ink">
          The course of a single day.
        </h2>
        <p className="mt-5 max-w-xl text-pretty leading-relaxed text-ink-muted">
          From the first cup of coffee to the evening reception — speakers and
          sessions are still being finalized, and the schedule is subject to
          change.
        </p>
      </Reveal>

      <div ref={trackRef} className="relative mt-14 pl-12 sm:pl-20">
        {/* dawn-to-dusk rail */}
        <div className="absolute bottom-3 left-3 top-3 w-px bg-gradient-to-b from-gold-soft via-gold to-navy sm:left-7" />

        {/* the sun travelling the day */}
        <motion.div
          style={reduce ? { top: "2%" } : { top: sunTop }}
          className="absolute left-3 z-10 h-11 w-11 -translate-x-1/2 -translate-y-1/2 sm:left-7"
        >
          <Sunburst className="h-full w-full" />
        </motion.div>

        <div className="flex flex-col">
          {agendaItems.map((item) => (
            <Reveal key={`${item.time}-${item.title}`}>
              <article className="relative border-b border-ink/12 py-7">
                <span className="absolute -left-[2.32rem] top-9 h-2 w-2 rounded-full border border-paper bg-ink sm:-left-[3.32rem]" />
                <div className="grid gap-x-8 gap-y-2.5 sm:grid-cols-[10.5rem_1fr]">
                  <p className="font-mono text-sm leading-6 text-ember numerals-tabular">
                    {item.time}
                  </p>
                  <div>
                    <div className="flex flex-wrap items-baseline gap-x-3 gap-y-1">
                      <h3 className="font-display text-xl text-ink sm:text-2xl">
                        {item.title}
                      </h3>
                      {item.sponsor ? (
                        <span className="font-mono text-[0.58rem] uppercase tracking-[0.16em] text-ember">
                          Sponsored by {item.sponsor}
                        </span>
                      ) : null}
                    </div>

                    {item.location ? (
                      <p className="mt-1.5 font-mono text-[0.66rem] uppercase tracking-[0.14em] text-ink-muted">
                        {item.location}
                      </p>
                    ) : null}
                    {item.description ? (
                      <p className="mt-1.5 leading-relaxed text-ink-muted">
                        {item.description}
                      </p>
                    ) : null}

                    {item.sessions ? (
                      <div className="mt-4 grid gap-px overflow-hidden border border-ink/12 sm:grid-cols-2">
                        {item.sessions.map((session) => (
                          <div
                            key={`${session.title}-${session.location}`}
                            className="bg-paper-warm/70 p-4"
                          >
                            <p className="font-display text-lg text-ink">
                              {session.title}
                            </p>
                            <p className="mt-1 font-mono text-[0.62rem] uppercase tracking-[0.14em] text-ink-muted">
                              {session.location}
                            </p>
                            {session.speaker ? (
                              <p className="mt-1.5 text-sm text-ink-muted">
                                Speaker: {session.speaker}
                              </p>
                            ) : null}
                          </div>
                        ))}
                      </div>
                    ) : null}
                  </div>
                </div>
              </article>
            </Reveal>
          ))}
        </div>
      </div>

      <p className="mt-7 font-mono text-[0.62rem] uppercase tracking-[0.2em] text-ink-muted">
        Schedule subject to change · {agendaItems.length} moments in the day
      </p>
    </section>
  );
}
