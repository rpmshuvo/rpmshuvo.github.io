# Portfolio Website — Design Spec

> **Owner:** Mehedi Hasan Shuvo
> **Date:** 2026-06-27
> **Deploy target:** `rpmshuvo.github.io` (GitHub Pages, user page, served at root `/`)
> **Goal:** A premium, modern, responsive developer portfolio that positions Mehedi as a
> **Backend Software Engineer** for international job applications and freelancing.

---

## 1. Audience & Positioning

- **Primary audience:** recruiters, hiring managers, and potential freelance clients (international).
- **Positioning:** Backend Software Engineer — PHP/Laravel + Node.js, telecom & ERP scale,
  with a peer-reviewed publication as a differentiator. Career direction: software architect.
- **Tone:** premium, technical, calm. Honest (no fabricated repos/links).
- **Relevant constraint:** open to relocation / needs visa sponsorship — surfaced subtly in About.

## 2. Tech Stack

| Concern | Choice | Rationale |
|---|---|---|
| Framework | React 18 | Component reuse, ecosystem |
| Build | Vite | Fast builds, simple GitHub Pages output |
| Styling | Tailwind CSS | Rapid, consistent, themeable (dark/light) |
| Animation | Framer Motion | Scroll-reveal + smooth transitions, honors reduced-motion |
| Icons | react-icons | Skill/social/tech icons |
| Fonts | Inter + JetBrains Mono (self-hosted via @fontsource) | No external runtime dependency, fast, reliable on Pages |
| Hosting | GitHub Pages via GitHub Actions | Official Pages deploy from Actions artifact |

**Base path:** `/` (user page `rpmshuvo.github.io` serves at root). `vite.config` `base: '/'`.

## 3. Design Direction

Dark-first "engineer" aesthetic with a light-mode toggle (default dark; respects
`prefers-color-scheme` on first load, then persists choice to `localStorage`).

**Palette**
```
Dark    bg #0B1120 · surface #1E293B · border #334155 · text #E2E8F0 · muted #94A3B8
Accent  cyan #22D3EE (primary) · emerald #34D399 (secondary)
Light   bg #F8FAFC · surface #FFFFFF · border #E2E8F0 · text #0F172A · muted #475569 · accent #0891B2
```
- **Typography:** Inter for UI/headings; JetBrains Mono for labels, section indices, code-flavored accents.
- **Motion:** entrance/scroll reveals, hover lifts, smooth anchor scrolling. All gated behind
  `prefers-reduced-motion: reduce`.
- **Hero background:** subtle animated grid + radial accent glow (CSS, lightweight).

## 4. Page Structure (single-page scroll)

Sticky navbar with scroll-spy active states. Sections in order:

1. **Navbar** — monogram "SHUVO", anchor links (About, Skills, Experience, Projects, Publication,
   Education, Contact), theme toggle, Resume button. Hamburger drawer on mobile.
2. **Hero** — name; title "Backend Software Engineer"; one-line intro; CTA buttons
   (Resume PDF, Contact, GitHub, LinkedIn); profile photo slot (placeholder until provided);
   animated grid-glow background; stat chips: **5+ yrs · 3M+ DAU · Published author**.
3. **About** — professional story derived from CV; quick-fact chips (Dhaka, Bangladesh ·
   open to relocation/sponsorship · architect track).
4. **Skills** — categorized cards:
   - Languages: PHP, GO, JavaScript, Dart, C++, C, Java
   - Backend & Frameworks: Laravel, Node.js, REST API, jQuery, AJAX, JSON/XML, Bootstrap, Flutter
   - Databases: MySQL, MS SQL Server, Oracle, Redis
   - DevOps & Infra: Docker, Linux, RabbitMQ, Git, Argo CD, Bitbucket/GitHub/GitLab
   - Practices: Agile/Scrum, SOLID, Design Patterns, OOP, Dependency Injection, TDD
   - Tools: VS Code, Postman, Jira, Trello, OpenProject
5. **Experience** — vertical timeline:
   - Software Engineer, Brain Station 23 (Nov 2022 → present) — augmented at Banglalink;
     MyBL SuperApp, Banglalink.net, Ryze BD; REST APIs at 3M+ DAU, CMS, scalability.
   - Software Engineer, Erp2all.com (Jan 2021 → Oct 2022) — cloud ERP in Laravel; requirement
     analysis, business logic, code review, deployment (OLS server).
   - Junior Software Engineer, Ngen IT (Jul 2019 → Nov 2020) — B2B backend + messaging service;
     payment gateways; caching/Elasticsearch → +30% performance.
   - Teaching Assistant, AIUB (Oct–Dec 2019) — DSA, Mobile Computing; 90+ students.
6. **Projects** — case-study cards (no code links; "Proprietary" badge). Each: context →
   role → tech tags → impact metrics.
   - **MyBL SuperApp** — high-scale telecom super-app APIs (3M+ DAU).
   - **Ryze Bangladesh** — Ryze, the AI-powered super app from the house of Banglalink. Designed to elevate your experience, Ryze brings together connectivity, entertainment, productivity, and rewards—all in one place.
   - **Cloud ERP** (Erp2all) — multi-tenant ERP in Laravel.
   - **B2B Platform** (Ngen IT) — real-time B2B backend + messaging, +30% performance.
7. **Publication** — featured card: *A Waiting Time Based Bully Algorithm for Leader Node
   Selection in Distributed System*; Malaysian Journal of Science, vol.41 no.3, pp.38–43 (2022);
   authors listed; **DOI link** → https://doi.org/10.22452/mjs.vol41no3.5.
8. **Education** — BSc in Computer Science & Engineering, AIUB (Jan 2015 – Jan 2020);
   relevant courses: OOAD & Design Patterns, DSA, AI & Expert Systems, Compiler Design.
9. **Contact** — email **rpm_shuvo@outlook.com**; social links (GitHub, LinkedIn, Facebook);
   simple contact form wired for Formspree (optional, placeholder endpoint; falls back to mailto).
10. **Footer** — copyright, "Built with React + Tailwind", back-to-top.

## 5. Component Structure

Content is fully separated from presentation. All CV-derived data lives in `src/data/content.js`
so future updates never require touching components.

```
src/
  main.jsx
  App.jsx
  index.css                ← Tailwind layers + CSS variables for theming
  data/
    content.js             ← single source of truth (profile, skills, experience, projects,
                             publication, education, contact, social)
  components/
    layout/   Navbar.jsx  Footer.jsx  ThemeToggle.jsx  Section.jsx  Container.jsx
    sections/ Hero.jsx  About.jsx  Skills.jsx  Experience.jsx  Projects.jsx
              Publication.jsx  Education.jsx  Contact.jsx
    ui/       Button.jsx  Card.jsx  Badge.jsx  TimelineItem.jsx
              SectionHeading.jsx  SocialLinks.jsx
    hooks/    useTheme.js  useScrollSpy.js  useInView.js
public/
  Mehedi-Hasan-Shuvo-Resume.pdf   ← downloadable resume
  profile.jpg (placeholder)        ← replaced when user provides new headshot
  favicon, og-image, robots.txt, sitemap.xml
```

**Unit responsibilities**
- `data/content.js` — pure data; no JSX. The only file edited for content changes.
- `layout/Section` — consistent vertical rhythm, id anchor, scroll-margin, reveal wrapper.
- `ui/*` — presentational primitives, no data fetching, props-driven.
- `hooks/useTheme` — dark/light state + persistence + document class toggle.
- `hooks/useScrollSpy` — active section id for navbar highlight.
- `hooks/useInView` — IntersectionObserver wrapper for scroll-reveal (reduced-motion aware).

## 6. SEO & Metadata

- `index.html`: `<title>`, meta description, canonical, Open Graph + Twitter card tags.
- JSON-LD `Person` schema (name, jobTitle, sameAs links, alumniOf, knowsAbout).
- `robots.txt` + `sitemap.xml`.
- Semantic landmarks (`header`, `main`, `nav`, `section`, `footer`), proper heading hierarchy,
  alt text, accessible color contrast (WCAG AA in both themes).
- Favicon + `og-image` (1200×630) for link previews.

## 7. Performance

- Self-hosted, subset fonts (no Google Fonts runtime fetch).
- Lazy-load below-the-fold images; explicit width/height to avoid layout shift.
- Lean dependency set (React, Vite, Tailwind, Framer Motion, react-icons).
- Vite production build (minified, hashed assets). Target Lighthouse ≥ 90 across categories.

## 8. Deployment

- Build inside the existing `rpmshuvo.github.io` repo; the old single-card HTML and skeleton
  pages are **replaced**, git history preserved.
- `.github/workflows/deploy.yml`: on push to default branch → install, build, upload `dist`,
  deploy via `actions/deploy-pages`.
- Repo Settings → Pages → Source = **GitHub Actions**.
- Resume PDF copied into `public/` and linked from Hero/Navbar.
- README with local dev (`npm install`, `npm run dev`), build, and "how to update content"
  (edit `src/data/content.js`) instructions.

## 9. Open Items / Placeholders

- **Profile photo:** user will provide a new high-res headshot; ship a placeholder slot until then.
- **Contact form backend:** Formspree endpoint is a placeholder; mailto fallback works immediately.
- **Years of experience:** display "5+ yrs" (per CV framing).
- **Certifications:** none on CV — section omitted (not faked).
- **Project repo links:** intentionally absent (proprietary work). Add later if public repos ship.

## 10. Out of Scope (YAGNI)

- Blog/CMS, i18n, analytics dashboards, custom domain, server-side rendering, a contact backend
  beyond Formspree. These can be added later without rearchitecting.
