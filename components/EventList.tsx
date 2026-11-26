"use client";

import { useEffect, useState } from "react";
import { events } from "@/content/events";
import { pastEvents, todayISO, upcomingEvents } from "@/lib/events";
import EventCard from "./EventCard";

/** Computed in the browser so the page never shows stale "upcoming" events. */
export default function EventList({ limit, showPast = false }: { limit?: number; showPast?: boolean }) {
  const [today, setToday] = useState<string | null>(null);
  useEffect(() => setToday(todayISO()), []);

  if (!today) return <p className="text-mute" aria-live="polite">Loading events…</p>;

  const upcoming = upcomingEvents(events, today).slice(0, limit);
  const past = showPast ? pastEvents(events, today) : [];

  return (
    <div className="space-y-10">
      {upcoming.length === 0 ? (
        <p className="rounded-2xl border border-dashed border-line-strong p-6 text-dim">
          Nothing posted yet. Check back soon.
        </p>
      ) : (
        <ul className="space-y-4">
          {upcoming.map((e) => (
            <EventCard key={`${e.date}-${e.title}`} event={e} />
          ))}
        </ul>
      )}
      {past.length > 0 ? (
        <section aria-labelledby="past-heading">
          <h2 id="past-heading" className="mb-4 font-display text-xl font-bold">
            Past events
          </h2>
          <ul className="space-y-4">
            {past.map((e) => (
              <EventCard key={`${e.date}-${e.title}`} event={e} past />
            ))}
          </ul>
        </section>
      ) : null}
    </div>
  );
}
