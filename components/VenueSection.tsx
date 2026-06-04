import Image from "next/image";

import { conference, venueInfo } from "@/data/conference";
import { SectionMarker } from "@/components/ui/SectionMarker";
import { Reveal } from "@/components/ui/Reveal";
import { CTA } from "@/components/ui/CTA";

export function VenueSection() {
  return (
    <section id="venue" className="bg-paper-warm">
      <div className="mx-auto max-w-6xl px-5 py-24 sm:py-28">
        <SectionMarker index={9} label="Venue" />

        <div className="mt-12 grid gap-x-14 gap-y-12 lg:grid-cols-[1.12fr_0.88fr]">
          <Reveal variant="clip">
            <p className="font-mono text-xs font-medium uppercase tracking-[0.18em] text-gold-ink">
              Mission, Texas
            </p>
            <h2 className="mt-3 font-display text-[clamp(2.4rem,5.4vw,4.3rem)] leading-[0.99] text-ink">
              Mission Event Center
            </h2>
            <p className="mt-4 text-xl text-ink-muted">{conference.address}</p>

            <dl className="mt-9 grid gap-px border border-ink/15 bg-ink/15 sm:grid-cols-2">
              <div className="bg-paper-warm p-5">
                <dt className="font-mono text-xs font-medium uppercase tracking-[0.16em] text-gold-ink">
                  Guest WiFi
                </dt>
                <dd className="mt-2 text-lg leading-relaxed text-ink-muted">
                  {venueInfo.wifi}
                </dd>
              </div>
              <div className="bg-paper-warm p-5">
                <dt className="font-mono text-xs font-medium uppercase tracking-[0.16em] text-gold-ink">
                  Accommodations
                </dt>
                <dd className="mt-2 text-lg leading-relaxed text-ink-muted">
                  {venueInfo.accommodations}
                </dd>
              </div>
              <div className="bg-paper-warm p-5 sm:col-span-2">
                <dt className="font-mono text-xs font-medium uppercase tracking-[0.16em] text-gold-ink">
                  Floor &amp; Layout
                </dt>
                <dd className="mt-2 text-lg leading-relaxed text-ink-muted">
                  {venueInfo.floorLayout}
                </dd>
              </div>
            </dl>

            <div className="mt-8 flex flex-col gap-3 sm:flex-row">
              <CTA href="/directions" variant="navy">
                Directions &amp; Parking
              </CTA>
              <CTA href={venueInfo.mapUrl} variant="outline">
                Open in Google Maps
              </CTA>
            </div>
          </Reveal>

          <Reveal delay={0.1} variant="scale">
            <div className="flex h-full flex-col items-center justify-center gap-6 border border-ink/15 bg-paper p-10 text-center">
              <Image
                src="/brand/city-of-mission-logo.jpg"
                alt="City of Mission, Texas seal"
                width={960}
                height={960}
                className="h-44 w-44 object-contain mix-blend-multiply"
              />
              <div>
                <p className="font-display text-2xl text-ink">
                  Hosted in the City of Mission
                </p>
                <p className="mt-1.5 font-mono text-xs font-medium uppercase tracking-[0.14em] text-ink-muted">
                  Founded 1908 · Rio Grande Valley, Texas
                </p>
              </div>
            </div>
          </Reveal>
        </div>
      </div>
    </section>
  );
}
