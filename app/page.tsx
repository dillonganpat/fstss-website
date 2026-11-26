import Link from "next/link";
import EventList from "@/components/EventList";
import { resources } from "@/content/links";
import { site } from "@/content/site";
import { council, memberCount } from "@/lib/council";

export default function Home() {
  return (
    <>
      <section className="relative mt-8 overflow-hidden rounded-3xl border border-line">
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top_right,rgba(37,99,235,0.35),transparent_60%)]" aria-hidden="true" />
        <div className="relative px-6 pb-12 pt-20 sm:px-12 sm:pt-28">
          <p className="text-xs font-semibold uppercase tracking-[0.14em] text-brand">{site.campus}</p>
          <h1 className="mt-3 max-w-3xl font-display text-4xl font-extrabold leading-[1.05] tracking-tight sm:text-6xl">
            Faculty of Science and Technology <span className="text-brand">Student Society</span>
          </h1>
          <p className="mt-5 max-w-xl text-lg text-dim">
            Your student voice in the faculty: events, resources and a council of {memberCount(council)} students working for you.
          </p>
          <div className="mt-8 flex flex-wrap gap-3">
            <Link
              href="/events/"
              className="rounded-xl bg-brand-dark px-5 py-3 text-sm font-semibold text-white hover:bg-brand"
            >
              See upcoming events
            </Link>
            <Link
              href="/about/"
              className="rounded-xl border border-line-strong px-5 py-3 text-sm font-semibold hover:bg-surface-2"
            >
              Meet the council
            </Link>
          </div>
        </div>
      </section>

      <section className="mt-16" aria-labelledby="events-heading">
        <div className="mb-6 flex items-end justify-between">
          <h2 id="events-heading" className="font-display text-2xl font-bold">
            Upcoming events
          </h2>
          <Link href="/events/" className="text-sm font-medium text-brand underline-offset-4 hover:underline">
            All events
          </Link>
        </div>
        <EventList limit={3} />
      </section>

      <section className="mt-16" aria-labelledby="links-heading">
        <h2 id="links-heading" className="mb-6 font-display text-2xl font-bold">
          Quick links
        </h2>
        <ul className="grid gap-4 sm:grid-cols-2">
          {resources.map((r) => (
            <li key={r.href}>
              <a
                href={r.href}
                target="_blank"
                rel="noopener noreferrer"
                className="block h-full rounded-2xl border border-line bg-surface p-5 transition-colors hover:border-brand"
              >
                <h3 className="font-display font-bold">
                  {r.title}
                  <span className="sr-only"> (opens in a new tab)</span>
                </h3>
                <p className="mt-1 text-sm text-dim">{r.description}</p>
              </a>
            </li>
          ))}
        </ul>
      </section>
    </>
  );
}
