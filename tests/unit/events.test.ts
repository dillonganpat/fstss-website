import { describe, expect, it } from "vitest";
import type { FstEvent } from "@/content/events";
import { events } from "@/content/events";
import { dateParts, isValidDate, pastEvents, sortByDate, toIcs, todayISO, upcomingEvents } from "@/lib/events";

const make = (title: string, date: string, endDate?: string): FstEvent => ({
  title,
  date,
  endDate,
  time: "5:00 PM",
  location: "FST Grounds",
  description: "Test event",
});

describe("isValidDate", () => {
  it("accepts real calendar dates", () => {
    expect(isValidDate("2026-09-03")).toBe(true);
    expect(isValidDate("2028-02-29")).toBe(true);
  });
  it("rejects wrong formats and impossible dates", () => {
    expect(isValidDate("3/9/2026")).toBe(false);
    expect(isValidDate("2026-13-01")).toBe(false);
    expect(isValidDate("2027-02-29")).toBe(false);
    expect(isValidDate("")).toBe(false);
  });
});

describe("sorting and filtering", () => {
  const list = [make("C", "2026-12-01"), make("A", "2026-01-10"), make("B", "2026-06-15", "2026-06-17")];

  it("sorts by date ascending without mutating the input", () => {
    const sorted = sortByDate(list);
    expect(sorted.map((e) => e.title)).toEqual(["A", "B", "C"]);
    expect(list.map((e) => e.title)).toEqual(["C", "A", "B"]);
  });

  it("upcoming includes today and later, soonest first", () => {
    expect(upcomingEvents(list, "2026-06-15").map((e) => e.title)).toEqual(["B", "C"]);
  });

  it("a multi-day event stays upcoming until its last day", () => {
    expect(upcomingEvents(list, "2026-06-17").map((e) => e.title)).toContain("B");
    expect(upcomingEvents(list, "2026-06-18").map((e) => e.title)).not.toContain("B");
  });

  it("past events are most recent first", () => {
    expect(pastEvents(list, "2026-12-02").map((e) => e.title)).toEqual(["C", "B", "A"]);
  });

  it("upcoming and past never overlap", () => {
    for (const today of ["2026-01-09", "2026-01-10", "2026-06-16", "2026-12-31"]) {
      const up = upcomingEvents(list, today);
      const past = pastEvents(list, today);
      expect(up.length + past.length).toBe(list.length);
    }
  });
});

describe("todayISO", () => {
  it("uses Trinidad time (UTC-4), not UTC", () => {
    expect(todayISO(new Date("2026-09-04T02:00:00Z"))).toBe("2026-09-03");
    expect(todayISO(new Date("2026-09-04T05:00:00Z"))).toBe("2026-09-04");
  });
});

describe("dateParts", () => {
  it("splits a date for the calendar badge", () => {
    expect(dateParts("2026-09-03")).toEqual({ day: "03", month: "SEP", year: "2026" });
  });
});

describe("toIcs", () => {
  const ics = toIcs(make("Lime, Games; Fun", "2026-09-03", "2026-09-04"));
  it("is a valid calendar with CRLF line endings", () => {
    expect(ics.startsWith("BEGIN:VCALENDAR")).toBe(true);
    expect(ics.endsWith("END:VCALENDAR")).toBe(true);
    expect(ics).toContain("\r\n");
  });
  it("escapes commas and semicolons in text", () => {
    expect(ics).toContain("SUMMARY:Lime\\, Games\; Fun");
  });
  it("end date is exclusive (day after the last day)", () => {
    expect(ics).toContain("DTSTART;VALUE=DATE:20260903");
    expect(ics).toContain("DTEND;VALUE=DATE:20260905");
  });
});

describe("content/events.ts", () => {
  it("every event has valid dates and required fields", () => {
    for (const e of events) {
      expect(isValidDate(e.date), `${e.title} date`).toBe(true);
      if (e.endDate) {
        expect(isValidDate(e.endDate), `${e.title} endDate`).toBe(true);
        expect(e.endDate >= e.date, `${e.title} ends before it starts`).toBe(true);
      }
      for (const f of ["title", "time", "location", "description"] as const) {
        expect(e[f].trim().length, `${e.title} ${f}`).toBeGreaterThan(0);
      }
    }
  });
});
