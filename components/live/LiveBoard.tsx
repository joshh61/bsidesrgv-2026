"use client";

import { useEffect, useState } from "react";

import {
  agendaItems,
  conference,
  type AgendaItem,
  type AgendaSession,
} from "@/data/conference";
import {
  centralNow,
  dayBounds,
  formatClock,
  itemStatus,
  liveItem,
  nextItem,
  parseRange,
  phaseFor,
  type ItemStatus,
  type Phase,
} from "@/lib/schedule";
import { CTA } from "@/components/ui/CTA";
import { SunGlyph } from "@/components/motifs/Sunburst";
import { TrackFilter, type TrackValue } from "@/components/ui/TrackFilter";
import { Countdown } from "@/components/Countdown";

const bounds = dayBounds();

/** Keep only the sessions that match the selected room (all-hands items pass through). */
function visibleSessions(
  item: AgendaItem,
  track: TrackValue,
): AgendaSession[] | undefined {
  if (!item.sessions) return undefined;
  if (track === "all") return item.sessions;
  return item.sessions.filter((s) => s.location === track);
}

export function LiveBoard() {
  // Real venue-local time, set after mount to avoid SSR hydration mismatch.
  const [now, setNow] = useState<{ minutes: number; isoDate: string } | null>(
    null,
  );
  const [track, setTrack] = useState<TrackValue>("all");

  useEffect(() => {
    const tick = () => setNow(centralNow());
    tick();
    const id = setInterval(tick, 15000);
    return () => clearInterval(id);
  }, []);

  const effective = now?.minutes ?? null;
  const phase: Phase | null = now
    ? phaseFor(now.isoDate, now.minutes)
    : null;

  const current = effective !== null ? liveItem(effective) : null;
  const upcoming = effective !== null ? nextItem(effective) : null;

  return (
    <section className="mx-auto max-w-5xl px-5 py-16 sm:py-20">
      <div className="flex items-center gap-3 sm:gap-4">
        <SunGlyph className="h-3.5 w-3.5 shrink-0 text-gold" />
        <span className="font-mono text-xs font-medium uppercase tracking-[0.22em] text-ink-muted">
          Live at BSides RGV
        </span>
        <span className="h-px flex-1 bg-ink/18" />
      </div>

      <h1 className="mt-8 max-w-3xl font-display text-[clamp(2.4rem,5.2vw,4rem)] leading-[1.02] text-ink">
        The day, as it happens.
      </h1>
      <p className="mt-4 max-w-2xl text-pretty text-lg leading-relaxed text-ink-muted">
        On {conference.date} this page follows the conference in real time,
        showing what is on now and which room to head to. Check back on the day
        of the event.
      </p>

      {/* status hero */}
      <div
        aria-live="polite"
        className="mt-10 border border-ink/15 bg-navy p-7 text-paper sm:p-9"
      >
        {phase === null ? (
          <p className="font-mono text-sm uppercase tracking-[0.18em] text-paper/60">
            Checking the schedule…
          </p>
        ) : phase === "before" ? (
          <BeforeHero firstStartLabel={formatClock(bounds.start)} />
        ) : phase === "after" ? (
          <AfterHero />
        ) : (
          <LiveHero
            current={current}
            upcoming={upcoming}
            track={track}
            nowMin={effective!}
          />
        )}
      </div>

      {/* room filter */}
      <div className="mt-9 flex flex-wrap items-center justify-between gap-4">
        <p className="font-mono text-xs font-medium uppercase tracking-[0.18em] text-gold-ink">
          The full day
        </p>
        <TrackFilter value={track} onChange={setTrack} />
      </div>

      {/* time-aware timeline */}
      <ol className="mt-6">
        {agendaItems.map((item) => {
          const status = effective !== null ? itemStatus(item, effective) : "upcoming";
          const sessions = visibleSessions(item, track);
          // When a room is selected, drop breakout slots that have no session there.
          if (item.sessions && sessions && sessions.length === 0) return null;
          return (
            <TimelineRow
              key={`${item.time}-${item.title}`}
              item={item}
              status={status}
              sessions={sessions}
            />
          );
        })}
      </ol>
    </section>
  );
}

function BeforeHero({ firstStartLabel }: { firstStartLabel: string }) {
  const first = agendaItems[0];
  return (
    <div>
      <p className="inline-flex items-center gap-2 font-mono text-xs font-medium uppercase tracking-[0.2em] text-gold-soft">
        <SunGlyph className="h-3.5 w-3.5" /> Not started yet
      </p>
      <h2 className="mt-3 font-display text-[clamp(1.9rem,4vw,2.8rem)] leading-tight">
        Doors open at {firstStartLabel}.
      </h2>
      <p className="mt-3 text-paper/85">
        First up: {first.title}
        {first.location ? ` in the ${first.location}` : ""}. Come back on{" "}
        {conference.date} to follow the day live.
      </p>
      <Countdown onDark className="mt-7 max-w-md" />
    </div>
  );
}

function AfterHero() {
  return (
    <div>
      <p className="font-mono text-xs font-medium uppercase tracking-[0.2em] text-gold-soft">
        That is a wrap
      </p>
      <h2 className="mt-3 font-display text-[clamp(1.9rem,4vw,2.8rem)] leading-tight">
        Thanks for joining us.
      </h2>
      <p className="mt-3 text-paper/85">
        The {conference.edition} has ended. Photos and recaps will be posted to
        the gallery.
      </p>
      <div className="mt-6">
        <CTA href="/#gallery" variant="outline-light">
          Visit the Gallery
        </CTA>
      </div>
    </div>
  );
}

function LiveHero({
  current,
  upcoming,
  track,
  nowMin,
}: {
  current: AgendaItem | null;
  upcoming: AgendaItem | null;
  track: TrackValue;
  nowMin: number;
}) {
  if (!current) {
    return (
      <div>
        <p className="font-mono text-xs font-medium uppercase tracking-[0.2em] text-gold-soft">
          Between sessions
        </p>
        <h2 className="mt-3 font-display text-[clamp(1.9rem,4vw,2.8rem)] leading-tight">
          {upcoming
            ? `Up next: ${upcoming.title}`
            : "The day is winding down."}
        </h2>
        {upcoming ? (
          <p className="mt-3 text-paper/85">
            Starts at {formatClock(parseRange(upcoming.time)?.start ?? 0)}
            {upcoming.location ? ` in the ${upcoming.location}` : ""}.
          </p>
        ) : null}
      </div>
    );
  }

  const range = parseRange(current.time);
  const minsLeft = range ? Math.max(0, range.end - nowMin) : 0;
  const sessions = visibleSessions(current, track);

  return (
    <div>
      <p className="inline-flex items-center gap-2.5 font-mono text-xs font-medium uppercase tracking-[0.2em] text-gold-soft">
        <span
          aria-hidden="true"
          className="h-2.5 w-2.5 animate-pulse rounded-full bg-red"
        />
        Live now
      </p>
      <h2 className="mt-3 font-display text-[clamp(2rem,4.4vw,3rem)] leading-tight">
        {current.title}
      </h2>
      <p className="mt-2 font-mono text-xs font-medium uppercase tracking-[0.14em] text-paper/70">
        {current.time} · {minsLeft} min left
      </p>

      {sessions && sessions.length ? (
        <div className="mt-5 grid gap-px border border-paper/15 bg-paper/15 sm:grid-cols-3">
          {sessions.map((s) => (
            <div key={`${s.title}-${s.location}`} className="bg-navy p-4">
              <p className="font-mono text-xs font-medium uppercase tracking-[0.14em] text-gold-soft">
                Go to {s.location}
              </p>
              <p className="mt-2 font-display text-lg leading-tight text-paper">
                {s.title}
              </p>
              {s.speaker ? (
                <p className="mt-1 text-sm text-paper/75">{s.speaker}</p>
              ) : null}
            </div>
          ))}
        </div>
      ) : current.location ? (
        <p className="mt-5 font-display text-xl text-paper">
          Head to the {current.location}.
        </p>
      ) : null}

      {upcoming ? (
        <p className="mt-5 font-mono text-xs font-medium uppercase tracking-[0.14em] text-paper/55">
          Up next · {upcoming.title} at{" "}
          {formatClock(parseRange(upcoming.time)?.start ?? 0)}
        </p>
      ) : null}
    </div>
  );
}

const statusRowClasses: Record<ItemStatus, string> = {
  past: "opacity-45",
  live: "",
  upcoming: "",
};

function TimelineRow({
  item,
  status,
  sessions,
}: {
  item: AgendaItem;
  status: ItemStatus;
  sessions?: AgendaSession[];
}) {
  const isLive = status === "live";
  return (
    <li
      className={`relative border-b border-ink/12 py-5 pl-7 transition-opacity duration-500 ${statusRowClasses[status]}`}
    >
      <span
        aria-hidden="true"
        className={`absolute left-0 top-7 h-2.5 w-2.5 -translate-x-[3px] rounded-full ${
          isLive
            ? "animate-pulse bg-red ring-4 ring-red/20"
            : status === "past"
              ? "bg-ink/40"
              : "bg-gold"
        }`}
      />
      <div className="flex flex-wrap items-baseline gap-x-3 gap-y-1">
        <p className="font-mono text-sm font-medium text-gold-ink numerals-tabular">
          {item.time}
        </p>
        {isLive ? (
          <span className="font-mono text-[0.65rem] font-medium uppercase tracking-[0.18em] text-red">
            ● Live
          </span>
        ) : null}
      </div>
      <h3 className="mt-1 font-display text-xl text-ink">{item.title}</h3>
      {item.location && !sessions ? (
        <p className="mt-1 font-mono text-xs font-medium uppercase tracking-[0.12em] text-ink-muted">
          {item.location}
        </p>
      ) : null}
      {sessions && sessions.length ? (
        <ul className="mt-2.5 grid gap-px border border-ink/12 bg-ink/12 sm:grid-cols-3">
          {sessions.map((s) => (
            <li key={`${s.title}-${s.location}`} className="bg-paper-warm/70 p-3">
              <p className="font-mono text-[0.65rem] font-medium uppercase tracking-[0.12em] text-gold-ink">
                {s.location}
              </p>
              <p className="mt-1 text-sm leading-snug text-ink">{s.title}</p>
              {s.speaker ? (
                <p className="mt-1 text-xs text-ink-muted">{s.speaker}</p>
              ) : null}
            </li>
          ))}
        </ul>
      ) : null}
    </li>
  );
}
