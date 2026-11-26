export default function PageHeading({
  eyebrow = "UWI St. Augustine",
  title,
  intro,
}: {
  eyebrow?: string;
  title: string;
  intro?: string;
}) {
  return (
    <div className="mb-10 mt-12">
      <p className="text-xs font-semibold uppercase tracking-[0.14em] text-brand">{eyebrow}</p>
      <h1 className="mt-3 font-display text-4xl font-extrabold tracking-tight sm:text-5xl">{title}</h1>
      {intro ? <p className="mt-4 max-w-2xl text-lg text-dim">{intro}</p> : null}
    </div>
  );
}
