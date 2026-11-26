import type { FstEvent } from "@/content/events";

const ISO_DATE = /^\d{4}-\d{2}-\d{2}$/;

export function isValidDate(value: string): boolean {
  if (!ISO_DATE.test(value)) return false;
  const d = new Date(`${value}T00:00:00Z`);
  return !Number.isNaN(d.getTime()) && d.toISOString().startsWith(value);
}

/** The last day an event is on (endDate if set, otherwise date). */
export function lastDay(e: FstEvent): string {
  return e.endDate ?? e.date;
}

export function sortByDate(list: FstEvent[]): FstEvent[] {
  return [...list].sort((a, b) => a.date.localeCompare(b.date));
}

/** Events happening today or later, soonest first. */
export function upcomingEvents(list: FstEvent[], today: string): FstEvent[] {
  return sortByDate(list).filter((e) => lastDay(e) >= today);
}

/** Events that have finished, most recent first. */
export function pastEvents(list: FstEvent[], today: string): FstEvent[] {
  return sortByDate(list)
    .filter((e) => lastDay(e) < today)
    .reverse();
}

export function todayISO(now: Date = new Date()): string {
  // Trinidad and Tobago is UTC-4 all year (no daylight saving).
  const tt = new Date(now.getTime() - 4 * 60 * 60 * 1000);
  return tt.toISOString().slice(0, 10);
}

const MONTHS = ["JAN", "FEB", "MAR", "APR", "MAY", "JUN", "JUL", "AUG", "SEP", "OCT", "NOV", "DEC"];

export function dateParts(date: string): { day: string; month: string; year: string } {
  const [y, m, d] = date.split("-");
  return { day: d, month: MONTHS[Number(m) - 1], year: y };
}

function icsEscape(text: string): string {
  return text.replace(/\\/g, "\\\\").replace(/;/g, "\;").replace(/,/g, "\\,").replace(/\n/g, "\\n");
}

function icsDate(date: string): string {
  return date.replaceAll("-", "");
}

function nextDay(date: string): string {
  const d = new Date(`${date}T00:00:00Z`);
  d.setUTCDate(d.getUTCDate() + 1);
  return d.toISOString().slice(0, 10);
}

/** Build an all-day calendar entry (.ics) for an event. */
export function toIcs(e: FstEvent): string {
  return [
    "BEGIN:VCALENDAR",
    "VERSION:2.0",
    "PRODID:-//FSTSS//Events//EN",
    "BEGIN:VEVENT",
    `UID:${icsDate(e.date)}-${encodeURIComponent(e.title)}@fstss`,
    `DTSTAMP:${icsDate(e.date)}T000000Z`,
    `DTSTART;VALUE=DATE:${icsDate(e.date)}`,
    `DTEND;VALUE=DATE:${icsDate(nextDay(lastDay(e)))}`,
    `SUMMARY:${icsEscape(e.title)}`,
    `LOCATION:${icsEscape(e.location)}`,
    `DESCRIPTION:${icsEscape(`${e.time}. ${e.description}`)}`,
    "END:VEVENT",
    "END:VCALENDAR",
  ].join("\r\n");
}
