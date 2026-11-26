import fs from "node:fs";
import path from "node:path";
import { describe, expect, it } from "vitest";
import { council, memberCount } from "@/lib/council";

describe("council content", () => {
  it("has all 29 members across 3 groups", () => {
    expect(council).toHaveLength(3);
    expect(memberCount(council)).toBe(29);
  });

  it("every member has a name, role, degree and photo that exists", () => {
    for (const g of council) {
      for (const m of g.members) {
        expect(m.name.trim(), "name").not.toBe("");
        expect(m.role.trim(), `${m.name} role`).not.toBe("");
        expect(m.degree.trim(), `${m.name} degree`).not.toBe("");
        const file = path.join(process.cwd(), "public", "assets", "team", m.photo);
        expect(fs.existsSync(file), `${m.name} photo ${m.photo}`).toBe(true);
      }
    }
  });

  it("has no duplicate names", () => {
    const names = council.flatMap((g) => g.members.map((m) => m.name));
    expect(new Set(names).size).toBe(names.length);
  });
});
