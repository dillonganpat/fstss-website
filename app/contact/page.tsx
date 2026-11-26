import type { Metadata } from "next";
import PageHeading from "@/components/PageHeading";
import { site } from "@/content/site";

export const metadata: Metadata = {
  title: "Contact",
  description: "Get in touch with the FSTSS.",
};

export default function Contact() {
  const c = site.contact;
  return (
    <>
      <PageHeading title="Get in touch" intro="Questions, suggestions, or anything the Society should know about? Reach out directly." />
      <section className="max-w-xl rounded-2xl border border-line bg-surface p-6" aria-labelledby="rep-heading">
        <h2 id="rep-heading" className="font-display text-xl font-bold">
          {c.name}
        </h2>
        <p className="text-sm text-brand">{c.role}</p>
        <dl className="mt-5 space-y-3">
          <div>
            <dt className="text-xs font-semibold uppercase tracking-wider text-mute">Email</dt>
            <dd>
              <a className="underline-offset-4 hover:underline" href={`mailto:${c.email}`}>
                {c.email}
              </a>
            </dd>
          </div>
          <div>
            <dt className="text-xs font-semibold uppercase tracking-wider text-mute">Phone</dt>
            <dd>
              <a className="underline-offset-4 hover:underline" href={c.phoneHref}>
                {c.phone}
              </a>
            </dd>
          </div>
        </dl>
      </section>

      <section className="mt-12" aria-labelledby="social-heading">
        <h2 id="social-heading" className="mb-4 font-display text-xl font-bold">
          Follow us
        </h2>
        <ul className="grid max-w-xl gap-3">
          {site.social.map((s) => (
            <li key={s.label}>
              <a
                href={s.href}
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center justify-between rounded-xl border border-line bg-surface px-5 py-4 transition-colors hover:border-brand"
              >
                <span>
                  <strong className="block font-display">{s.label}</strong>
                  <span className="text-sm text-dim">{s.handle}</span>
                </span>
                <span className="text-sm font-medium text-brand" aria-hidden="true">
                  Open ↗
                </span>
                <span className="sr-only">(opens in a new tab)</span>
              </a>
            </li>
          ))}
        </ul>
      </section>
    </>
  );
}
