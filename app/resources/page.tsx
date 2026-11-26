import type { Metadata } from "next";
import PageHeading from "@/components/PageHeading";
import { resources } from "@/content/links";

export const metadata: Metadata = {
  title: "Resources",
  description: "The pages FST students actually need, in one place.",
};

export default function Resources() {
  return (
    <>
      <PageHeading title="Quick links" intro="The pages FST students actually need, in one place." />
      <ul className="grid gap-4 sm:grid-cols-2">
        {resources.map((r) => (
          <li key={r.href}>
            <a
              href={r.href}
              target="_blank"
              rel="noopener noreferrer"
              className="block h-full rounded-2xl border border-line bg-surface p-6 transition-colors hover:border-brand"
            >
              <h2 className="font-display text-lg font-bold">
                {r.title}
                <span className="sr-only"> (opens in a new tab)</span>
              </h2>
              <p className="mt-1 text-dim">{r.description}</p>
              <span className="mt-4 inline-block text-sm font-medium text-brand" aria-hidden="true">
                Open ↗
              </span>
            </a>
          </li>
        ))}
      </ul>
    </>
  );
}
