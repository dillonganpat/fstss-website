# FSTSS Website

Official website for the UWI St. Augustine Faculty of Science and Technology Student Society (FSTSS).

**Live site:** https://fstss-website.vercel.app

## Stack

Next.js 15 (App Router) · React 19 · TypeScript · Tailwind CSS 4 · static export, deployed on Vercel.
Tests: Vitest (logic and content) and Playwright with axe-core (accessibility, navigation, mobile layout). CI runs on GitHub Actions.

## Pages

Home, About Us (29-member council), Events (upcoming and past, with "Add to calendar"), Campus Map, Resources, Contact.

## Updating content (no code needed beyond editing a file)

| To change | Edit |
|---|---|
| Events | `content/events.ts`: copy the example block, fill it in |
| Council members | `content/council.json` and add a photo to `public/assets/team/` |
| Quick links | `content/links.ts` |
| Contact details and social links | `content/site.ts` |

Past events move to "Past events" automatically using Trinidad time. A unit test fails if an event has an invalid date or a council photo is missing, so mistakes show up before they go live.

## Run locally

```bash
npm install
npm run dev        # http://localhost:3000
npm test           # unit tests
npm run build      # static site into ./out
npm run test:e2e   # browser tests (needs a build first)
```

## Quality

- Automated accessibility checks (WCAG 2.1 AA via axe) on every page, desktop and mobile
- Skip link, keyboard navigation, visible focus states, reduced-motion support
- No horizontal scroll at phone width
- Large images are resized (map preview is ~600 KB instead of 4 MB) and lazy-loaded

## Author

Dillon Ganpat, [github.com/dillonganpat](https://github.com/dillonganpat)
