import AxeBuilder from "@axe-core/playwright";
import { expect, test } from "@playwright/test";

const pages = [
  { path: "/", heading: /Student Society/ },
  { path: "/about/", heading: "Who we are" },
  { path: "/events/", heading: "Events" },
  { path: "/map/", heading: "Campus map" },
  { path: "/resources/", heading: "Quick links" },
  { path: "/contact/", heading: "Get in touch" },
];

for (const p of pages) {
  test.describe(p.path, () => {
    test("renders its heading", async ({ page }) => {
      await page.goto(p.path);
      await expect(page.getByRole("heading", { level: 1 })).toContainText(p.heading);
    });

    test("has no automatically detectable accessibility violations", async ({ page }) => {
      await page.goto(p.path);
      await page.getByRole("heading", { level: 1 }).waitFor();
      const results = await new AxeBuilder({ page }).withTags(["wcag2a", "wcag2aa", "wcag21aa"]).analyze();
      expect(results.violations.map((v) => `${v.id}: ${v.help}`)).toEqual([]);
    });

    test("has no horizontal scroll", async ({ page }) => {
      await page.goto(p.path);
      const overflow = await page.evaluate(() => document.documentElement.scrollWidth > window.innerWidth);
      expect(overflow).toBe(false);
    });
  });
}

test("navigation reaches every page", async ({ page, isMobile }) => {
  await page.goto("/");
  for (const label of ["About Us", "Events", "Map", "Resources", "Contact"]) {
    if (isMobile) await page.getByRole("button", { name: "Toggle navigation" }).click();
    await page.getByRole("navigation", { name: "Primary" }).getByRole("link", { name: label }).click();
    await expect(page.getByRole("heading", { level: 1 })).toBeVisible();
  }
});

test("about page lists all 29 council members", async ({ page }) => {
  await page.goto("/about/");
  const cards = page.locator("main ul li h3");
  await expect(cards).toHaveCount(29);
});

test("events page shows the empty state when nothing is posted", async ({ page }) => {
  await page.goto("/events/");
  await expect(page.getByText("Nothing posted yet")).toBeVisible();
});

test("unknown URL shows the 404 page", async ({ page }) => {
  const res = await page.goto("/does-not-exist/");
  expect(res?.status()).toBe(404);
  await expect(page.getByRole("heading", { level: 1 })).toContainText("Page not found");
});
