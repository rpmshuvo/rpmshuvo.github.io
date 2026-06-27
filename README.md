# Mehedi Hasan Shuvo — Portfolio

Premium, responsive developer portfolio for a Backend Software Engineer.
Dark-first "coral on charcoal" design with a light-mode toggle, an animated orbit hero,
a tech-stack strip, animated stat counters, and alternating project case studies.

**Live:** https://rpmshuvo.github.io

---

## Tech stack

| Area | Tech |
|------|------|
| Framework | React 18 |
| Build tool | Vite 5 |
| Styling | Tailwind CSS 3 (dark mode via `class`, theme tokens as CSS variables) |
| Animation | Framer Motion (scroll reveals, gated behind `prefers-reduced-motion`) |
| Icons | react-icons |
| Fonts | Sora (display) + Inter (UI) + JetBrains Mono (accents), self-hosted via `@fontsource` |
| Tests | Vitest + React Testing Library + jsdom |
| Hosting | GitHub Pages, deployed by GitHub Actions |

---

## Prerequisites

- **Node.js 20+** and npm (the CI builds on Node 22).

---

## Run locally

```bash
npm install      # install dependencies (first time only)
npm run dev      # start the dev server → http://localhost:5173
```

Open the printed URL in your browser. The dev server hot-reloads on save.

### All scripts

| Command | What it does |
|---------|--------------|
| `npm run dev` | Start the Vite dev server with hot reload |
| `npm test` | Run the unit test suite once (Vitest) |
| `npm run test:watch` | Run tests in watch mode |
| `npm run build` | Production build → `dist/` |
| `npm run preview` | Serve the built `dist/` locally to sanity-check the production output |

---

## Project structure

```
src/
  data/content.js          ← ALL site content (single source of truth)
  components/
    layout/   Navbar, Footer, ThemeToggle, Section, Container
    sections/ Hero, TechStrip, About, Skills, Experience,
              Projects, Publication, Education, Contact
    ui/       Button, Card, Badge, TimelineItem, SectionHeading,
              SocialLinks, StatCounter
    hooks/    useTheme, useScrollSpy, useInView, useCountUp
public/
  profile.jpg                       ← hero photo
  Mehedi-Hasan-Shuvo-Resume.pdf     ← downloadable resume
  favicon.svg, og-image.svg, robots.txt, sitemap.xml
index.html                          ← <head>, SEO meta, JSON-LD, theme anti-FOUC script
.github/workflows/deploy.yml        ← CI build + GitHub Pages deploy
```

---

## Updating content

**Almost everything lives in [`src/data/content.js`](src/data/content.js)** — edit there, no component changes needed:

- **Profile / hero** — name, title, intro, location, email, phone, availability.
- **Skills, experience, projects, publication, education** — plain data arrays.
- **Tech strip** (`techStrip`) — each item needs a `name` and an `icon` key; the icon key must
  also be mapped to a `react-icons/si` icon in
  [`src/components/sections/TechStrip.jsx`](src/components/sections/TechStrip.jsx).
- **Services** (`services`) and **About counters** (`counters`).

**Assets:**

- **Photo** — replace `public/profile.jpg` with a square image (≈600×600). Same path, no code change.
- **Resume** — overwrite `public/Mehedi-Hasan-Shuvo-Resume.pdf`.
- **Favicon** — edit `public/favicon.svg` (bump the `?v=` query in `index.html` to bust browser cache).

**Contact form** — by default the form falls back to a `mailto:` link. To enable in-page submit,
set your Formspree form id in
[`src/components/sections/Contact.jsx`](src/components/sections/Contact.jsx) (`FORMSPREE_ENDPOINT`).

**Theme colors** — the palette is defined as CSS variables in `:root` (light) and `.dark` (dark)
at the top of [`src/index.css`](src/index.css).

---

## Deploy to GitHub Pages

Deployment is automated by [`.github/workflows/deploy.yml`](.github/workflows/deploy.yml): every
push to the **`master`** branch builds the site and publishes `dist/` to GitHub Pages.

### One-time setup (required!)

In the repository: **Settings → Pages → Build and deployment → Source → select "GitHub Actions".**

> ⚠️ If Source is left as **"Deploy from a branch"**, GitHub serves the raw source files instead of
> the built app — the page loads but the React app, photo, and resume all 404 (the HTML points at
> `/src/main.jsx`). Switching the Source to **GitHub Actions** fixes this.

### Deploy

```bash
git add -A
git commit -m "Update portfolio"
git push origin master
```

Then watch the **Actions** tab — the **Deploy to GitHub Pages** workflow runs (~1–2 min). When it's
green, visit https://rpmshuvo.github.io (hard-refresh with Ctrl+Shift+R to skip browser cache).

You can also trigger a deploy manually: **Actions → Deploy to GitHub Pages → Run workflow**
(the workflow has `workflow_dispatch` enabled).

### Verify a deploy worked

The live HTML should reference a hashed bundle like `/assets/index-XXXXXXXX.js` (built output),
**not** `/src/main.jsx` (raw source). If you still see `/src/main.jsx`, the Pages Source setting
above hasn't been switched to GitHub Actions.

---

## Notes

- The default theme is dark and respects the visitor's `prefers-color-scheme` on first load, then
  persists their toggle choice to `localStorage`.
- All animations are disabled for visitors who set `prefers-reduced-motion: reduce`.
- The repo's default branch is **`master`**; the deploy workflow triggers on `master`. If you
  rename the default branch, update the `branches:` line in `deploy.yml` to match.
