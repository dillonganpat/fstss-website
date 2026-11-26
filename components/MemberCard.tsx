import Image from "next/image";
import type { Member } from "@/lib/council";

export default function MemberCard({ member }: { member: Member }) {
  return (
    <li className="overflow-hidden rounded-2xl border border-line bg-surface">
      <Image
        src={`/assets/team/${member.photo}`}
        alt={member.name}
        width={400}
        height={400}
        className="aspect-square w-full object-cover"
      />
      <div className="p-4">
        <h3 className="font-display text-base font-bold">{member.name}</h3>
        <p className="mt-0.5 text-sm font-medium text-brand">{member.role}</p>
        <p className="mt-1 text-sm text-dim">{member.degree}</p>
        {member.interests ? (
          <p className="mt-3 text-xs text-mute">
            <span className="mr-1 font-semibold uppercase tracking-wider">Interests</span>
            {member.interests}
          </p>
        ) : null}
      </div>
    </li>
  );
}
