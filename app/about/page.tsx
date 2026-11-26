import type { Metadata } from "next";
import MemberCard from "@/components/MemberCard";
import PageHeading from "@/components/PageHeading";
import { council } from "@/lib/council";

export const metadata: Metadata = {
  title: "About Us",
  description: "Who the FSTSS is and the 2026-2027 council representing students in the Faculty of Science and Technology.",
};

export default function About() {
  return (
    <>
      <PageHeading title="Who we are" />
      <div className="max-w-3xl space-y-4 text-lg text-dim">
        <p>
          The Faculty of Science and Technology Student Society (FSTSS) is the official student society representing
          students within the Faculty of Science and Technology at The University of the West Indies, St. Augustine
          Campus.
        </p>
        <p>
          We are committed to creating a vibrant, inclusive, and supportive community where students can connect, grow,
          and make the most of their university experience. Through academic initiatives, social events, professional
          development opportunities, and student-focused activities, we aim to bridge the gap between students, the
          Faculty, and the wider university community.
        </p>
        <p>
          Our society provides students with opportunities to develop their skills, build meaningful connections, gain
          practical experience, and engage with their peers beyond the classroom. We also advocate for the interests and
          well-being of students while creating opportunities for them to contribute to the FST community.
        </p>
        <p>
          Whether you&apos;re looking to get involved, develop your leadership skills, meet new people, or simply make
          your university experience more memorable, FSTSS is a community built for you.
        </p>
      </div>

      <section className="mt-16" aria-labelledby="council-heading">
        <p className="text-xs font-semibold uppercase tracking-[0.14em] text-brand">Council 2026-2027</p>
        <h2 id="council-heading" className="mt-2 font-display text-3xl font-extrabold">
          Meet the council
        </h2>
        <nav aria-label="Council groups" className="mt-4 flex flex-wrap gap-2">
          {council.map((g) => (
            <a
              key={g.group}
              href={`#${g.group.toLowerCase().replace(/\s+/g, "-")}`}
              className="rounded-full border border-line px-4 py-1.5 text-sm text-dim hover:border-brand hover:text-text"
            >
              {g.group}
            </a>
          ))}
        </nav>
        {council.map((g) => (
          <div key={g.group} className="mt-12">
            <h3 id={g.group.toLowerCase().replace(/\s+/g, "-")} className="mb-5 scroll-mt-24 font-display text-xl font-bold">
              {g.group}
            </h3>
            <ul className="grid gap-5 sm:grid-cols-2 lg:grid-cols-4">
              {g.members.map((m) => (
                <MemberCard key={m.name} member={m} />
              ))}
            </ul>
          </div>
        ))}
      </section>
    </>
  );
}
