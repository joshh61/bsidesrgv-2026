import {
  agendaItems,
  eventDate,
  eventTimeZone,
  type AgendaItem,
} from "@/data/conference";

export type Phase = "before" | "live" | "after";
export type ItemStatus = "past" | "live" | "upcoming";

export type TimeRange = { start: number; end: number };

// Matches "09:00 AM – 09:45 AM" (en dash or hyphen, flexible spacing).
const RANGE_RE =
  /(\d{1,2}):(\d{2})\s*(AM|PM)\s*[–-]\s*(\d{1,2}):(\d{2})\s*(AM|PM)/i;

function to24(hour: number, meridiem: string): number {
  const m = meridiem.toUpperCase();
  if (m === "AM") return hour === 12 ? 0 : hour;
  return hour === 12 ? 12 : hour + 12;
}

/** Parse an agenda item's `time` string into start/end minutes-from-midnight. */
export function parseRange(time: string): TimeRange | null {
  const m = RANGE_RE.exec(time);
  if (!m) return null;
  return {
    start: to24(Number(m[1]), m[3]) * 60 + Number(m[2]),
    end: to24(Number(m[4]), m[6]) * 60 + Number(m[5]),
  };
}

/** First start and last end across the whole schedule (e.g. 540 → 1200). */
export function dayBounds(): TimeRange {
  let start = Infinity;
  let end = -Infinity;
  for (const item of agendaItems) {
    const r = parseRange(item.time);
    if (!r) continue;
    start = Math.min(start, r.start);
    end = Math.max(end, r.end);
  }
  return { start, end };
}

/** Minutes-from-midnight in the venue's timezone, plus today's ISO date there. */
export function centralNow(): { minutes: number; isoDate: string } {
  const parts = new Intl.DateTimeFormat("en-CA", {
    timeZone: eventTimeZone,
    year: "numeric",
    month: "2-digit",
    day: "2-digit",
    hour: "2-digit",
    minute: "2-digit",
    hour12: false,
  }).formatToParts(new Date());
  const get = (type: string) =>
    parts.find((p) => p.type === type)?.value ?? "00";
  let hour = Number(get("hour"));
  if (hour === 24) hour = 0; // some runtimes emit "24" at midnight
  return {
    minutes: hour * 60 + Number(get("minute")),
    isoDate: `${get("year")}-${get("month")}-${get("day")}`,
  };
}

/** Which phase the conference is in for a given Central date + minute. */
export function phaseFor(isoDate: string, minutes: number): Phase {
  if (isoDate < eventDate) return "before";
  if (isoDate > eventDate) return "after";
  const { start, end } = dayBounds();
  if (minutes < start) return "before";
  if (minutes >= end) return "after";
  return "live";
}

export function itemStatus(item: AgendaItem, nowMin: number): ItemStatus {
  const r = parseRange(item.time);
  if (!r) return "upcoming";
  if (nowMin >= r.end) return "past";
  if (nowMin >= r.start) return "live";
  return "upcoming";
}

/** The item happening at `nowMin` (sequential schedule → at most one), or null. */
export function liveItem(nowMin: number): AgendaItem | null {
  return agendaItems.find((i) => itemStatus(i, nowMin) === "live") ?? null;
}

/** The next item to start after `nowMin`, or null if the day is over. */
export function nextItem(nowMin: number): AgendaItem | null {
  for (const item of agendaItems) {
    const r = parseRange(item.time);
    if (r && r.start > nowMin) return item;
  }
  return null;
}

/** "9:05 AM" style label from minutes-from-midnight. */
export function formatClock(minutes: number): string {
  const h24 = Math.floor(minutes / 60);
  const m = minutes % 60;
  const meridiem = h24 < 12 ? "AM" : "PM";
  const h12 = h24 % 12 === 0 ? 12 : h24 % 12;
  return `${h12}:${String(m).padStart(2, "0")} ${meridiem}`;
}
