import Image from "next/image";
import { conference } from "@/data/conference";
import { Sunburst, SunGlyph } from "@/components/motifs/Sunburst";
import { PalmEngraving } from "@/components/motifs/PalmEngraving";

const exploreLinks = [
  { label: "Event Details", href: "/#details" },
  { label: "Agenda", href: "/#agenda" },
  { label: "Speakers", href: "/#speakers" },
  { label: "Sponsors", href: "/#sponsors" },
  { label: "Venue", href: "/#venue" },
  { label: "Directions", href: "/directions" },
  { label: "Gallery", href: "/#gallery" },
  { label: "Archive", href: "/archive" },
];

export function SiteFooter() {
  return (
    <footer className="relative overflow-hidden bg-navy-deep text-paper">
      {/* the sun, set */}
      <div className="pointer-events-none absolute left-1/2 top-0 h-[460px] w-[460px] -translate-x-1/2 -translate-y-1/2 opacity-[0.22]">
        <Sunburst className="h-full w-full" />
      </div>
      {/* palms on the horizon */}
      <PalmEngraving
        variant={1}
        onDark
        className="absolute -left-12 bottom-0 w-40 opacity-[0.14]"
      />
      <PalmEngraving
        variant={1}
        onDark
        flip
        className="absolute -right-12 bottom-0 w-40 opacity-[0.14]"
      />

      <div className="relative mx-auto max-w-6xl px-5 py-20 sm:py-24">
        <div className="flex items-center gap-3 text-gold-soft">
          <SunGlyph className="h-4 w-4" />
          <span className="font-mono text-xs font-medium uppercase tracking-[0.22em]">
            Until the next dawn
          </span>
        </div>

        <div className="mt-8 grid gap-12 lg:grid-cols-[1.5fr_1fr_1fr]">
          <div>
            <p className="font-display text-5xl leading-[0.95] sm:text-6xl">
              BSides RGV
            </p>
            <p className="mt-5 max-w-sm text-pretty text-paper/85">
              {conference.alternateTagline} Contact the organizers if additional
              accommodations are required.
            </p>
            <div className="mt-8 flex items-center gap-8">
              <Image
                src="/brand/bsides-rgv-small-white.png"
                alt="BSides RGV Logo"
                width={332}
                height={166}
                className="h-20 w-auto opacity-90 transition-opacity duration-300 hover:opacity-100 sm:h-28"
              />
              <div className="h-14 w-px bg-paper/20 sm:h-20" />
              <Image
                src="/brand/logo-flat-white.png"
                alt="RGV Cyber Logo"
                width={576}
                height={605}
                className="h-20 w-auto opacity-80 transition-opacity duration-300 hover:opacity-100 sm:h-28"
              />
            </div>
          </div>

          <nav aria-label="Footer" className="flex flex-col gap-3">
            <p className="font-mono text-xs font-medium uppercase tracking-[0.2em] text-paper/70">
              Explore
            </p>
            {exploreLinks.map((link) => (
              <a
                key={link.label}
                href={link.href}
                className="w-fit text-paper/90 transition-colors hover:text-gold-soft focus-visible:text-gold-soft"
              >
                {link.label}
              </a>
            ))}
          </nav>

          <div className="flex flex-col gap-3">
            <p className="font-mono text-xs font-medium uppercase tracking-[0.2em] text-paper/70">
              Connect
            </p>
            <a
              href={`mailto:${conference.contactEmail}`}
              className="w-fit text-paper/90 transition-colors hover:text-gold-soft focus-visible:text-gold-soft"
            >
              {conference.contactEmail}
            </a>
            <a
              href={conference.twitterUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="w-fit text-paper/90 transition-colors hover:text-gold-soft focus-visible:text-gold-soft"
            >
              {conference.twitterHandle}
            </a>
            <a
              href={conference.registrationUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="w-fit text-paper/90 transition-colors hover:text-gold-soft focus-visible:text-gold-soft"
            >
              Register on Eventbrite
            </a>
          </div>
        </div>

        <div className="mt-16 flex flex-col gap-3 border-t border-paper/12 pt-7 font-mono text-xs font-medium uppercase tracking-[0.14em] text-paper/70 sm:flex-row sm:items-center sm:justify-between">
          <span>{conference.edition}</span>
          <span>
            Mission, Texas · {conference.date}
          </span>
        </div>
      </div>
    </footer>
  );
}
