# FSTSS Website

Official website for the UWI St. Augustine Faculty of Science and Technology Student Society (FSTSS), serving 1,000+ students.

**Live site:** https://fstss-website.vercel.app

## Pages

- **Home:** society overview with an upcoming-events feed
- **About:** the 29-member council directory with photos
- **Map:** interactive campus map for finding buildings (high-resolution and PDF versions)
- **Resources:** links and resources for students
- **Contact:** how to reach the council

## How it's built

Plain HTML5, CSS3 and vanilla JavaScript with no framework, CMS or backend, so non-technical council members can keep it up to date.

- `css/style.css` is a mobile-first design system of reusable components (cards, nav, grids) shared by every page.
- `js/events.js` is the only file needed to change events. Add an entry to the `FSTSS_EVENTS` list and the home page renders it.
- `js/main.js` renders the events list and handles shared behavior such as navigation.

Deployed on Vercel (also works on GitHub Pages) with continuous deployment from `main`.

## Run locally

No build step. Open `index.html` in a browser, or serve the folder:

```bash
python3 -m http.server 8000   # then visit http://localhost:8000
```

## Author

Dillon Ganpat, [github.com/dillonganpat](https://github.com/dillonganpat)
