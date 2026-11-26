"use client";

import type { FstEvent } from "@/content/events";
import { dateParts, toIcs } from "@/lib/events";

export default function EventCard({ event, past = false }: { event: FstEvent; past?: boolean }) {
  const start = dateParts(event.date);

  function download() {
    const blob = new Blob([toIcs(event)], { type: "text/calendar;charset=utf-8" });
    const url = URL.createObjectURL(blob);
    const a = document.createElement("a");
    a.href = url;
    a.download = `${event.title.toLowerCase().replace(/[^a-z0-9]+/g, "-")}.ics`;
    a.click();
    URL.revokeObjectURL(url);
  }

  return (
    <li className={`flex gap-5 rounded-2xl border border-line bg-surface p-5 ${past ? "opacity-70" : ""}`}>
      <div className="flex h-16 w-16 shrink-0 flex-col items-center justify-center rounded-xl bg-brand/15 text-brand">
        <span className="font-display text-2xl font-extrabold leading-none">{start.day}</span>
        <span className="mt-1 text-xs font-semibold tracking-widest">{start.month}</span>
      </div>
      <div className="min-w-0">
        <h3 className="font-display text-lg font-bold">{event.title}</h3>
        <p className="mt-1 text-sm text-mute">
          {event.time} · {event.location}
        </p>
        <p className="mt-2 text-dim">{event.description}</p>
        {past ? null : (
          <button
            type="button"
            onClick={download}
            className="mt-3 text-sm font-medium text-brand underline-offset-4 hover:underline"
          >
            Add to calendar
          </button>
        )}
      </div>
    </li>
  );
}
