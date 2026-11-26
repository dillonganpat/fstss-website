import { site } from "@/content/site";

export default function Footer() {
  return (
    <footer className="mt-24 border-t border-line">
      <div className="mx-auto flex max-w-6xl flex-col gap-2 px-5 py-8 text-sm text-mute sm:flex-row sm:items-center sm:justify-between">
        <p>
          <strong className="font-display text-text">{site.name}</strong> · {site.fullName} · {site.campus}
        </p>
        <p>
          <a className="underline-offset-4 hover:text-text hover:underline" href={`mailto:${site.contact.email}`}>
            {site.contact.email}
          </a>
        </p>
      </div>
    </footer>
  );
}
