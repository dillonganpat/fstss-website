import data from "@/content/council.json";

export type Member = {
  name: string;
  role: string;
  degree: string;
  interests: string | null;
  photo: string;
};
export type Group = { group: string; members: Member[] };

export const council = data as Group[];

export function memberCount(groups: Group[]): number {
  return groups.reduce((n, g) => n + g.members.length, 0);
}
