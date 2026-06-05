import { eventDetails } from "@/data/conference";
import { SectionMarker } from "@/components/ui/SectionMarker";
import { Reveal } from "@/components/ui/Reveal";

export function EventDetails() {
  return (
    <section id="details" className="mx-auto max-w-6xl px-5 py-24 sm:py-28">
      <SectionMarker index={1} label="Event Details" />

      <div className="mt-12 grid gap-x-14 gap-y-12 lg:grid-cols-[0.82fr_1.18fr]">
        <Reveal variant="clip">
          <h2 className="font-display text-[clamp(2.2rem,4.6vw,3.6rem)] leading-[1.03] text-ink">
            Everything you need, on the record.
          </h2>
          <p className="mt-5 text-pretty text-lg leading-relaxed text-ink-muted">
            BSides RGV is free to participants and follows the Security BSides
            community framework: practical talks, hands-on villages, and
            collaboration in an intimate local setting.
          </p>
        </Reveal>

        <Reveal delay={0.1} variant="scale">
          <dl className="border-t border-ink/20">
            {eventDetails.map((detail) => (
              <div
                key={detail.label}
                className="flex items-baseline justify-between gap-6 border-b border-ink/12 py-4"
              >
                <dt className="shrink-0 font-mono text-xs font-medium uppercase tracking-[0.16em] text-ink-muted">
                  {detail.label}
                </dt>
                <dd className="min-w-0 text-right">
                  <span
                    className={`font-display text-ink [text-wrap:pretty] ${
                      detail.label === "Address"
                        ? "text-lg sm:text-xl"
                        : "text-xl sm:text-2xl"
                    }`}
                  >
                    {detail.value}
                  </span>
                  {detail.note ? (
                    <span className="mt-1 block text-base leading-6 text-ink-muted">
                      {detail.note}
                    </span>
                  ) : null}
                </dd>
              </div>
            ))}
          </dl>
        </Reveal>
      </div>
    </section>
  );
}
