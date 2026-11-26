/**
 * EVENTS: how to add one
 * ----------------------
 * 1. Copy a block below (from `{` to `},`) and paste it into the list.
 * 2. Fill in the fields. `date` must be YYYY-MM-DD (e.g. 2026-09-03).
 * 3. Optional: add `endDate` (YYYY-MM-DD) for multi-day events.
 * 4. Save. Past events move to "Past events" automatically.
 *
 * Example:
 *   {
 *     title: "Welcome Back Lime",
 *     date: "2026-09-03",
 *     time: "5:00 PM",
 *     location: "FST Grounds",
 *     description: "One or two sentences about the event.",
 *   },
 */
export type FstEvent = {
  title: string;
  date: string;
  endDate?: string;
  time: string;
  location: string;
  description: string;
};

export const events: FstEvent[] = [];
