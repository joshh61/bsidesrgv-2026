"use client";

import { useRef } from "react";
import {
  motion,
  useReducedMotion,
  useScroll,
  useTransform,
  type Variants,
} from "motion/react";

import { conference } from "@/data/conference";
import { Sunburst, SunGlyph } from "@/components/motifs/Sunburst";
import { PalmEngraving } from "@/components/motifs/PalmEngraving";
import { CTA } from "@/components/ui/CTA";

const HEADLINE = ["Cybersecurity.", "Community.", "South Texas."];

const META = [
  { k: "Date", v: conference.date },
  { k: "Hours", v: conference.mainConferenceTime },
  { k: "Venue", v: conference.venue },
];

const container: Variants = {
  hidden: {},
  show: { transition: { staggerChildren: 0.09, delayChildren: 0.14 } },
};

const item: Variants = {
  hidden: { opacity: 0, y: 18, filter: "blur(6px)" },
  show: {
    opacity: 1,
    y: 0,
    filter: "blur(0px)",
    transition: { duration: 0.68, ease: [0.22, 1, 0.36, 1] },
  },
};

export function HeroSection() {
  const ref = useRef<HTMLElement>(null);
  const reduce = useReducedMotion();
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start start", "end start"],
  });
  const sunY = useTransform(scrollYProgress, [0, 1], [0, -150]);
  const contentY = useTransform(scrollYProgress, [0, 1], [0, 90]);
  const contentFade = useTransform(scrollYProgress, [0, 0.75], [1, 0]);

  return (
    <section
      ref={ref}
      className="relative flex min-h-svh flex-col overflow-hidden"
    >
      {/* dawn sky + sun glow */}
      <div className="pointer-events-none absolute inset-0 bg-[linear-gradient(180deg,#ebe9e0_0%,#f1ebdd_42%,#f7f3e9_76%)]" />
      <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(ellipse_62%_50%_at_50%_25%,rgba(242,199,94,0.55),rgba(242,199,94,0.12)_46%,transparent_72%)]" />
      <div className="pointer-events-none absolute left-1/2 top-[29%] h-px w-[min(82vw,760px)] -translate-x-1/2 overflow-hidden bg-gold/20">
        <span className="animate-horizon-sheen block h-full w-1/2 bg-gradient-to-r from-transparent via-gold-soft to-transparent" />
      </div>

      {/* the rising sun */}
      <motion.div
        style={reduce ? undefined : { y: sunY }}
        className="pointer-events-none absolute left-1/2 top-[5%] w-[min(128vw,880px)] -translate-x-1/2"
      >
        <motion.div
          initial={reduce ? false : { y: 92, opacity: 0, scale: 0.93, rotate: -6 }}
          animate={{ y: 0, opacity: 1, scale: 1, rotate: 0 }}
          transition={{ duration: 1.05, ease: [0.16, 1, 0.3, 1] }}
        >
          <Sunburst className="h-auto w-full" />
        </motion.div>
      </motion.div>

      {/* palms at the edges of the valley */}
      <PalmEngraving
        variant={1}
        priority
        className="absolute bottom-0 left-0 w-[clamp(120px,19vw,272px)] opacity-80"
      />
      <PalmEngraving
        variant={1}
        flip
        className="absolute bottom-0 right-0 w-[clamp(120px,19vw,272px)] opacity-80"
      />

      {/* content */}
      <motion.div
        style={reduce ? undefined : { y: contentY, opacity: contentFade }}
        className="relative z-10 mx-auto flex w-full max-w-5xl flex-1 flex-col items-center justify-start px-5 pb-16 pt-20 text-center sm:justify-center sm:pb-20 sm:pt-20"
      >
        <motion.div
          variants={container}
          initial={reduce ? "show" : "hidden"}
          animate="show"
          className="flex flex-col items-center"
        >
          <motion.div
            variants={item}
            className="flex items-center gap-2.5 text-ember"
          >
            <SunGlyph className="h-4 w-4 text-gold" />
            <span className="font-mono text-xs font-medium uppercase tracking-[0.2em] text-gold-ink">
              {conference.hashtag} · {conference.city}
            </span>
          </motion.div>

          <h1 className="relative mt-6 font-display text-[clamp(2.6rem,8.6vw,6.6rem)] leading-[0.98] tracking-[-0.02em] text-ink">
            <span
              aria-hidden="true"
              className="pointer-events-none absolute left-1/2 top-1/2 -z-10 h-[150%] w-[135%] -translate-x-1/2 -translate-y-1/2 bg-[radial-gradient(ellipse_at_center,rgba(247,243,233,0.95),rgba(247,243,233,0.45)_54%,transparent_78%)]"
            />
            {HEADLINE.map((line, i) => (
              <motion.span
                key={line}
                variants={item}
                className={`block ${i === 2 ? "italic text-ember" : ""}`}
              >
                {line}
              </motion.span>
            ))}
          </h1>

          <motion.p
            variants={item}
            className="mt-7 max-w-2xl text-pretty text-lg leading-relaxed text-ink-muted sm:text-xl"
          >
            The {conference.edition} — a free, community-driven event built by
            and for the information security community of the Rio Grande Valley.
          </motion.p>

          <motion.div
            variants={item}
            className="mt-9 flex flex-wrap items-center justify-center divide-ink/15 sm:divide-x"
          >
            {META.map((m) => (
              <div key={m.k} className="px-5 py-1.5 text-center">
                <p className="font-mono text-xs font-medium uppercase tracking-[0.18em] text-gold-ink">
                  {m.k}
                </p>
                <p className="mt-1.5 font-display text-lg text-ink">{m.v}</p>
              </div>
            ))}
          </motion.div>

          <motion.div
            variants={item}
            className="mt-9 flex w-full flex-col gap-3 sm:w-auto sm:flex-row"
          >
            <CTA href={conference.registrationUrl} variant="primary">
              Register on Eventbrite
            </CTA>
            <CTA href={conference.cfpUrl} variant="outline">
              Submit a Talk
            </CTA>
          </motion.div>
        </motion.div>
      </motion.div>

      {/* scroll cue */}
      <div className="relative z-10 flex justify-center pb-9">
        <div className="flex flex-col items-center gap-2.5 text-ink/40">
          <span className="font-mono text-xs font-medium uppercase tracking-[0.22em]">
            Sunrise to dusk
          </span>
          <span className="h-9 w-px bg-gradient-to-b from-ink/45 to-transparent" />
        </div>
      </div>
    </section>
  );
}
