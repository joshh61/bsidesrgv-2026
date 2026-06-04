import type { Metadata } from "next";
import Link from "next/link";

import { conference, venueInfo } from "@/data/conference";
import { SiteHeader } from "@/components/SiteHeader";
import { SiteFooter } from "@/components/SiteFooter";
import { SectionMarker } from "@/components/ui/SectionMarker";
import { CTA } from "@/components/ui/CTA";

export const metadata: Metadata = {
  title: `Directions & Parking | ${conference.name} ${conference.year}`,
  description: `How to reach the ${conference.venue} at ${conference.address} for the ${conference.edition}, including parking and floor layout.`,
};

const details = [
  { label: "Venue", value: conference.venue },
  { label: "Address", value: conference.address },
  { label: "Parking", value: venueInfo.parking },
  { label: "Floor & Layout", value: venueInfo.floorLayout },
];

export default function DirectionsPage() {
  return (
    <>
      <SiteHeader />
      <main id="top">
        <section className="mx-auto max-w-6xl px-5 py-20 sm:py-24">
          <SectionMarker index={9} label="Directions & Parking" />

          <Link
            href="/#venue"
            className="mt-8 inline-flex items-center gap-1.5 font-mono text-xs font-medium uppercase tracking-[0.14em] text-ink-muted transition-colors hover:text-ink"
          >
            <span aria-hidden="true">←</span> Back to venue
          </Link>

          <div className="mt-8 grid gap-x-14 gap-y-12 lg:grid-cols-[1fr_1.1fr]">
            <div>
              <p className="font-mono text-xs font-medium uppercase tracking-[0.18em] text-gold-ink">
                {conference.city}
              </p>
              <h1 className="mt-3 font-display text-[clamp(2.4rem,5.2vw,4.2rem)] leading-[1.0] text-ink">
                {conference.venue}
              </h1>

              <dl className="mt-9 border-t border-ink/20">
                {details.map((detail) => (
                  <div
                    key={detail.label}
                    className="border-b border-ink/12 py-4"
                  >
                    <dt className="font-mono text-xs font-medium uppercase tracking-[0.16em] text-gold-ink">
                      {detail.label}
                    </dt>
                    <dd className="mt-2 text-lg leading-relaxed text-ink">
                      {detail.value}
                    </dd>
                  </div>
                ))}
              </dl>

              <div className="mt-9">
                <CTA href={venueInfo.mapUrl} variant="navy">
                  Open in Google Maps
                </CTA>
              </div>
            </div>

            {/* embedded map */}
            <div className="relative aspect-[4/3] overflow-hidden border border-ink/15 bg-paper-warm lg:aspect-auto lg:min-h-[28rem]">
              <iframe
                title={`Map to ${conference.venue}`}
                src={venueInfo.embedUrl}
                loading="lazy"
                referrerPolicy="no-referrer-when-downgrade"
                className="absolute inset-0 h-full w-full"
                style={{ border: 0 }}
                allowFullScreen
              />
            </div>
          </div>
        </section>
      </main>
      <SiteFooter />
    </>
  );
}
