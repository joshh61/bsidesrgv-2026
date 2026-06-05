import {
  conference,
  sponsorReasons,
  sponsorTiers,
} from "@/data/conference";
import { SectionMarker } from "@/components/ui/SectionMarker";
import { Reveal } from "@/components/ui/Reveal";
import { CTA } from "@/components/ui/CTA";
import { SunGlyph } from "@/components/motifs/Sunburst";
import { SponsorMarquee } from "@/components/SponsorMarquee";

export function SponsorsSection() {
  return (
    <section id="sponsors" className="mx-auto max-w-6xl px-5 py-24 sm:py-28">
      <SectionMarker index={8} label="Sponsors & Partners" />

      <Reveal variant="clip">
        <div className="mt-12 grid gap-x-14 gap-y-5 lg:grid-cols-2 lg:items-end">
          <h2 className="font-display text-[clamp(2.2rem,4.8vw,3.8rem)] leading-[1.03] text-ink">
            BSides RGV runs on community support.
          </h2>
          <p className="text-pretty text-lg leading-relaxed text-ink-muted">
            The conference is free to participants. Sponsors and partners carry
            the cost so the Valley can learn, connect, and grow. We are grateful
            to the organizations standing behind BSides RGV 2026.
          </p>
        </div>
      </Reveal>

      {/* sponsor wall — a gentle auto-scrolling band (pauses on hover) */}
      <Reveal variant="clip">
        <p className="mt-14 font-mono text-xs font-medium uppercase tracking-[0.18em] text-gold-ink">
          Our 2026 Sponsors
        </p>
        <div className="mt-5">
          <SponsorMarquee />
        </div>
      </Reveal>

      {/* become a sponsor */}
      <Reveal variant="clip">
        <div className="mt-20 border-t border-ink/20 pt-12">
          <div className="grid gap-x-14 gap-y-5 lg:grid-cols-2 lg:items-end">
            <h3 className="font-display text-[clamp(1.9rem,3.8vw,2.9rem)] leading-tight text-ink">
              Stand behind the Valley.
            </h3>
            <p className="text-pretty text-lg leading-relaxed text-ink-muted">
              Sponsorship is offered at three levels, plus custom and in-kind
              arrangements. The sponsorship kit has the full detail.
            </p>
          </div>

          <div className="mt-10 grid gap-px border border-ink/15 bg-ink/15 md:grid-cols-3">
            {sponsorTiers.map((tier) => {
              const isGold = tier.name === "Gold";
              return (
                <div
                  key={tier.name}
                  className={`flex flex-col bg-paper p-7 ${
                    isGold ? "border-t-2 border-gold" : ""
                  }`}
                >
                  <div className="flex items-center justify-between">
                    <p className="font-mono text-xs font-medium uppercase tracking-[0.16em] text-gold-ink">
                      {tier.name}
                    </p>
                    {isGold ? <SunGlyph className="h-4 w-4 text-gold" /> : null}
                  </div>
                  <p className="mt-3 font-display text-2xl text-ink">
                    {tier.price}
                  </p>
                  <ul className="mt-5 flex flex-col gap-2.5">
                    {tier.benefits.map((benefit) => (
                      <li
                        key={benefit}
                        className="flex gap-2.5 text-base leading-7 text-ink-muted"
                      >
                        <span className="mt-2 h-1 w-1 shrink-0 rounded-full bg-gold" />
                        <span>{benefit}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              );
            })}
          </div>

          <div className="mt-10 grid gap-x-12 gap-y-8 lg:grid-cols-[1.1fr_0.9fr]">
            <ul className="flex flex-col gap-3">
              {sponsorReasons.map((reason) => (
                <li key={reason} className="flex gap-3 text-lg leading-relaxed text-ink-muted">
                  <SunGlyph className="mt-1.5 h-3.5 w-3.5 shrink-0 text-gold" />
                  <span>{reason}</span>
                </li>
              ))}
            </ul>
            <div className="flex flex-col gap-3 sm:flex-row lg:flex-col lg:items-start">
              <CTA href={conference.sponsorKitUrl} variant="navy">
                Download Sponsorship Kit
              </CTA>
              <CTA href={`mailto:${conference.contactEmail}`} variant="outline">
                Email the Team
              </CTA>
            </div>
          </div>
        </div>
      </Reveal>
    </section>
  );
}
