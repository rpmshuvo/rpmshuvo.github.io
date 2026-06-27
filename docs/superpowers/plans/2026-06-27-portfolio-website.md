# Portfolio Website Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.
>
> **Git note:** The repo owner manages git/commits manually. "Checkpoint" steps mark good commit/review points — commit at your discretion; there are no scripted `git commit` commands.

**Goal:** Build a premium, responsive, dark-first developer portfolio for Mehedi Hasan Shuvo and deploy it to `rpmshuvo.github.io` via GitHub Pages.

**Architecture:** Single-page React + Vite app. All CV-derived copy lives in one data module (`src/data/content.js`); presentation is split into small layout / section / ui components plus three custom hooks (theme, scroll-spy, in-view). Tailwind drives theming via a `dark` class on `<html>`. Framer Motion handles scroll reveals (gated behind `prefers-reduced-motion`). Built artifact deploys from a GitHub Actions workflow.

**Tech Stack:** React 18, Vite 5, Tailwind CSS 3, Framer Motion, react-icons, @fontsource (Inter + JetBrains Mono), Vitest + React Testing Library + jsdom (tests).

## Global Constraints

- **Deploy target:** GitHub Pages user page `rpmshuvo.github.io`, served at root → Vite `base: '/'`.
- **Build inside** the existing `rpmshuvo.github.io` repo; the old `*.html`, images, and skeleton pages are replaced. Keep `.git`, `README.md` (will be rewritten), `_config.yml` may be removed.
- **Default theme:** dark; respect `prefers-color-scheme` on first visit, then persist to `localStorage` key `theme`.
- **Public email:** `rpm_shuvo@outlook.com`. **Social:** GitHub `https://github.com/rpmshuvo`, LinkedIn `https://www.linkedin.com/in/shuvo-rpm`, Facebook `https://www.facebook.com/rpm.shuvo`.
- **Palette:** Dark `bg #0B1120 / surface #1E293B / border #334155 / text #E2E8F0 / muted #94A3B8`; Accent `cyan #22D3EE`, `emerald #34D399`; Light `bg #F8FAFC / surface #FFFFFF / border #E2E8F0 / text #0F172A / muted #475569 / accent #0891B2`.
- **Fonts:** Inter (UI), JetBrains Mono (mono accents), self-hosted via @fontsource. No external font fetch.
- **Honesty rule:** no fabricated repo links; proprietary projects carry a "Proprietary" badge and no code link.
- **Accessibility:** WCAG AA contrast in both themes; all motion gated behind `prefers-reduced-motion: reduce`.
- **Monogram/brand text:** "SHUVO".

---

### Task 1: Scaffold Vite + React + Tailwind + Vitest

**Files:**
- Create: `package.json`, `vite.config.js`, `tailwind.config.js`, `postcss.config.js`, `index.html`, `src/main.jsx`, `src/App.jsx`, `src/index.css`, `vitest.setup.js`, `src/__tests__/smoke.test.jsx`
- Delete (old site): `about.html academics.html blog.html calender.html contact.html experience.html index.html index1.html skills.html _config.yml *.png index.jpg icon.jpg underConstruction.jpg loading.png` (keep `.git`, `profile.jpg`, `profile-1.jpeg` for now, and `docs/`)

**Interfaces:**
- Produces: a running dev server (`npm run dev`), `npm run build` → `dist/`, `npm test` (Vitest). `src/App.jsx` exports default `App`.

- [ ] **Step 1: Remove old static site files** (keep `.git`, `docs/`, `profile.jpg`, `profile-1.jpeg`)

```bash
cd rpmshuvo.github.io
rm -f about.html academics.html blog.html calender.html contact.html \
      experience.html index.html index1.html skills.html _config.yml .gitattributes \
      facebook.png googlePlus.png instagram.png linkedIn.png twitter.png \
      loading.png underConstruction.jpg icon.jpg index.jpg README.md
```

- [ ] **Step 2: Create `package.json`**

```json
{
  "name": "rpmshuvo-portfolio",
  "private": true,
  "version": "1.0.0",
  "type": "module",
  "scripts": {
    "dev": "vite",
    "build": "vite build",
    "preview": "vite preview",
    "test": "vitest run",
    "test:watch": "vitest"
  },
  "dependencies": {
    "@fontsource/inter": "^5.0.18",
    "@fontsource/jetbrains-mono": "^5.0.20",
    "framer-motion": "^11.2.10",
    "react": "^18.3.1",
    "react-dom": "^18.3.1",
    "react-icons": "^5.2.1"
  },
  "devDependencies": {
    "@testing-library/jest-dom": "^6.4.6",
    "@testing-library/react": "^16.0.0",
    "@vitejs/plugin-react": "^4.3.1",
    "autoprefixer": "^10.4.19",
    "jsdom": "^24.1.0",
    "postcss": "^8.4.38",
    "tailwindcss": "^3.4.4",
    "vite": "^5.3.1",
    "vitest": "^1.6.0"
  }
}
```

- [ ] **Step 3: Create `vite.config.js`**

```js
import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';

export default defineConfig({
  base: '/',
  plugins: [react()],
  test: {
    environment: 'jsdom',
    globals: true,
    setupFiles: ['./vitest.setup.js'],
  },
});
```

- [ ] **Step 4: Create `vitest.setup.js`**

```js
import '@testing-library/jest-dom/vitest';

// jsdom lacks matchMedia + IntersectionObserver; stub them for hooks/tests.
if (!window.matchMedia) {
  window.matchMedia = (query) => ({
    matches: false,
    media: query,
    addEventListener: () => {},
    removeEventListener: () => {},
    addListener: () => {},
    removeListener: () => {},
    dispatchEvent: () => false,
  });
}

class IO {
  constructor(cb) { this.cb = cb; }
  observe() {}
  unobserve() {}
  disconnect() {}
}
window.IntersectionObserver = window.IntersectionObserver || IO;
```

- [ ] **Step 5: Create `postcss.config.js`**

```js
export default {
  plugins: {
    tailwindcss: {},
    autoprefixer: {},
  },
};
```

- [ ] **Step 6: Create `tailwind.config.js`** (theme tokens map to CSS variables defined in Task 3)

```js
/** @type {import('tailwindcss').Config} */
export default {
  darkMode: 'class',
  content: ['./index.html', './src/**/*.{js,jsx}'],
  theme: {
    extend: {
      colors: {
        bg: 'rgb(var(--bg) / <alpha-value>)',
        surface: 'rgb(var(--surface) / <alpha-value>)',
        border: 'rgb(var(--border) / <alpha-value>)',
        body: 'rgb(var(--text) / <alpha-value>)',
        muted: 'rgb(var(--muted) / <alpha-value>)',
        accent: 'rgb(var(--accent) / <alpha-value>)',
        accent2: 'rgb(var(--accent2) / <alpha-value>)',
      },
      fontFamily: {
        sans: ['Inter', 'system-ui', 'sans-serif'],
        mono: ['"JetBrains Mono"', 'ui-monospace', 'monospace'],
      },
      maxWidth: { content: '72rem' },
    },
  },
  plugins: [],
};
```

- [ ] **Step 7: Create `index.html`** (SEO is expanded in Task 13; minimal here)

```html
<!doctype html>
<html lang="en" class="dark">
  <head>
    <meta charset="UTF-8" />
    <meta name="viewport" content="width=device-width, initial-scale=1.0" />
    <title>Mehedi Hasan Shuvo — Backend Software Engineer</title>
    <meta name="description" content="Backend Software Engineer (PHP/Laravel, Node.js) with 5+ years building scalable telecom and ERP systems." />
  </head>
  <body>
    <div id="root"></div>
    <script type="module" src="/src/main.jsx"></script>
  </body>
</html>
```

- [ ] **Step 8: Create `src/main.jsx`**

```jsx
import React from 'react';
import ReactDOM from 'react-dom/client';
import '@fontsource/inter/400.css';
import '@fontsource/inter/500.css';
import '@fontsource/inter/600.css';
import '@fontsource/inter/700.css';
import '@fontsource/jetbrains-mono/400.css';
import '@fontsource/jetbrains-mono/500.css';
import './index.css';
import App from './App.jsx';

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <App />
  </React.StrictMode>
);
```

- [ ] **Step 9: Create placeholder `src/App.jsx`**

```jsx
export default function App() {
  return <main className="min-h-screen bg-bg text-body">Portfolio loading…</main>;
}
```

- [ ] **Step 10: Create placeholder `src/index.css`** (replaced fully in Task 3)

```css
@tailwind base;
@tailwind components;
@tailwind utilities;
```

- [ ] **Step 11: Write smoke test `src/__tests__/smoke.test.jsx`**

```jsx
import { render, screen } from '@testing-library/react';
import App from '../App.jsx';

test('App renders', () => {
  render(<App />);
  expect(screen.getByText(/Portfolio loading/i)).toBeInTheDocument();
});
```

- [ ] **Step 12: Install and verify**

Run: `npm install && npm test`
Expected: smoke test PASSES.
Run: `npm run dev` → open the printed localhost URL; page shows "Portfolio loading…".

- [ ] **Step 13: Checkpoint** — scaffold builds, dev server runs, test green.

---

### Task 2: Content data module (source of truth)

**Files:**
- Create: `src/data/content.js`, `src/data/__tests__/content.test.js`

**Interfaces:**
- Produces: default export `content` with keys: `profile`, `social[]`, `stats[]`, `about`, `skills[]`, `experience[]`, `projects[]`, `publication`, `education`, `nav[]`. Section components in later tasks import named slices from this object.

- [ ] **Step 1: Write failing test `src/data/__tests__/content.test.js`**

```js
import content from '../content.js';

test('content has all required sections', () => {
  expect(content.profile.name).toBe('Mehedi Hasan Shuvo');
  expect(content.profile.email).toBe('rpm_shuvo@outlook.com');
  expect(content.social).toHaveLength(3);
  expect(content.skills.length).toBeGreaterThanOrEqual(6);
  expect(content.experience.length).toBe(4);
  expect(content.projects.length).toBe(4);
  expect(content.publication.doi).toContain('10.22452/mjs.vol41no3.5');
  expect(content.nav.map((n) => n.id)).toContain('experience');
});
```

- [ ] **Step 2: Run test, expect FAIL** (`Cannot find module '../content.js'`)

Run: `npm test -- content`

- [ ] **Step 3: Create `src/data/content.js`**

```js
const content = {
  profile: {
    name: 'Mehedi Hasan Shuvo',
    title: 'Backend Software Engineer',
    tagline: 'I build secure, scalable backends — REST APIs and systems that serve millions.',
    intro:
      'Software Engineer with 5+ years building scalable backends across telecom and ERP — ' +
      'PHP/Laravel and Node.js, with a focus on clean architecture, performance, and reliability.',
    location: 'Dhaka, Bangladesh',
    email: 'rpm_shuvo@outlook.com',
    phone: '+8801607242482',
    resumeUrl: '/Mehedi-Hasan-Shuvo-Resume.pdf',
    photoUrl: '/profile.jpg',
    availability: 'Open to international roles (relocation / visa sponsorship) and freelance.',
  },
  nav: [
    { id: 'about', label: 'About' },
    { id: 'skills', label: 'Skills' },
    { id: 'experience', label: 'Experience' },
    { id: 'projects', label: 'Projects' },
    { id: 'publication', label: 'Publication' },
    { id: 'education', label: 'Education' },
    { id: 'contact', label: 'Contact' },
  ],
  social: [
    { name: 'GitHub', icon: 'github', url: 'https://github.com/rpmshuvo' },
    { name: 'LinkedIn', icon: 'linkedin', url: 'https://www.linkedin.com/in/shuvo-rpm' },
    { name: 'Facebook', icon: 'facebook', url: 'https://www.facebook.com/rpm.shuvo' },
  ],
  stats: [
    { value: '5+', label: 'Years experience' },
    { value: '3M+', label: 'Daily active users served' },
    { value: '1', label: 'Peer-reviewed publication' },
  ],
  about: {
    paragraphs: [
      'I’m a backend-focused Software Engineer with 5+ years of experience crafting solutions ' +
        'across the telecommunications and ERP landscapes. I design and build RESTful APIs that ' +
        'are secure, scalable, and resilient under heavy load.',
      'Currently at Brain Station 23, I work as an augmented resource for Banglalink Digital ' +
        'Communications, building APIs and CMS features for products like the MyBL SuperApp — ' +
        'serving 3M+ daily active users. I care about clean code, SOLID design, and measurable ' +
        'performance wins.',
      'I co-authored a peer-reviewed paper on distributed-systems leader election, and I’m ' +
        'steadily working toward a software architect role.',
    ],
    facts: [
      'Based in Dhaka, Bangladesh',
      'Open to relocation / visa sponsorship',
      'Telecom & ERP domain experience',
      'Architecture track',
    ],
  },
  skills: [
    { group: 'Languages', items: ['PHP', 'Go', 'JavaScript', 'Dart', 'C++', 'C', 'Java'] },
    { group: 'Backend & Frameworks', items: ['Laravel', 'Node.js', 'REST API', 'jQuery', 'AJAX', 'JSON/XML', 'Bootstrap', 'Flutter'] },
    { group: 'Databases', items: ['MySQL', 'MS SQL Server', 'Oracle', 'Redis'] },
    { group: 'DevOps & Infra', items: ['Docker', 'Linux', 'RabbitMQ', 'Git', 'Argo CD', 'Bitbucket', 'GitHub', 'GitLab'] },
    { group: 'Practices', items: ['Agile/Scrum', 'SOLID', 'Design Patterns', 'OOP', 'Dependency Injection', 'TDD'] },
    { group: 'Tools', items: ['VS Code', 'Postman', 'Jira', 'Trello', 'OpenProject'] },
  ],
  experience: [
    {
      role: 'Software Engineer',
      company: 'Brain Station 23 Ltd.',
      location: 'Dhaka, Bangladesh',
      period: 'Nov 2022 — Present',
      summary: 'Augmented resource at Banglalink Digital Communications — MyBL SuperApp, Banglalink.net, Ryze Bangladesh.',
      points: [
        'Designed and developed secure, scalable RESTful APIs serving 3M+ daily active users (MyBL).',
        'Built and maintained CMS features for web products.',
        'Continuously improved performance and scalability; followed best practices and clean code.',
        'Collaborated with cross-functional teams and stakeholders to ensure timely delivery.',
      ],
    },
    {
      role: 'Software Engineer',
      company: 'Erp2all.com',
      location: 'Dhaka, Bangladesh',
      period: 'Jan 2021 — Oct 2022',
      summary: 'Cloud-based ERP platform built with Laravel.',
      points: [
        'Built business logic and features for a cloud-based ERP using Laravel.',
        'Took part in requirement analysis, task estimation, and code review.',
        'Managed integration and deployment on an OpenLiteSpeed (OLS) server.',
      ],
    },
    {
      role: 'Junior Software Engineer',
      company: 'Ngen IT',
      location: 'Dhaka, Bangladesh',
      period: 'Jul 2019 — Nov 2020',
      summary: 'Backend for a real-time B2B platform and messaging service.',
      points: [
        'Wrote the backend for a real-time B2B platform and a messaging service.',
        'Built multiple Laravel web apps with payment gateways and responsive product filtering.',
        'Improved performance ~30% via lazy loading, caching, and Elasticsearch.',
      ],
    },
    {
      role: 'Teaching Assistant',
      company: 'American International University-Bangladesh (AIUB)',
      location: 'Dhaka, Bangladesh',
      period: 'Oct 2019 — Dec 2019',
      summary: 'TA for algorithms and mobile computing courses.',
      points: [
        'Assisted teaching Design & Analysis of Algorithms and Mobile & Wireless Computing.',
        'Helped 90+ students debug code and learn debugging strategies.',
      ],
    },
  ],
  projects: [
    {
      name: 'MyBL SuperApp',
      org: 'Banglalink · via Brain Station 23',
      proprietary: true,
      blurb: 'High-scale telecom super-app. I build and harden RESTful APIs that stay secure and performant at 3M+ daily active users.',
      impact: ['3M+ DAU', 'Secure & scalable REST APIs', 'CMS features'],
      tech: ['PHP', 'Laravel', 'MySQL', 'Redis', 'REST API'],
    },
    {
      name: 'Ryze Bangladesh',
      org: 'Banglalink · via Brain Station 23',
      proprietary: true,
      blurb: 'Ryze — the AI-powered super app from the house of Banglalink — brings connectivity, entertainment, productivity, and rewards together in one place. I contribute backend APIs and integrations.',
      impact: ['Unified super-app backend', 'API integrations'],
      tech: ['PHP', 'Laravel', 'REST API', 'Redis'],
    },
    {
      name: 'Cloud ERP',
      org: 'Erp2all.com',
      proprietary: true,
      blurb: 'Cloud-based ERP platform. I implemented business logic and features, contributed to requirement analysis and code review, and deployed on OLS.',
      impact: ['Cloud-based ERP', 'Code review & estimation'],
      tech: ['PHP', 'Laravel', 'MySQL', 'Linux'],
    },
    {
      name: 'Real-time B2B Platform',
      org: 'Ngen IT',
      proprietary: true,
      blurb: 'Real-time B2B platform with a messaging service, payment gateways, and product filtering. Tuned for performance.',
      impact: ['+30% performance', 'Payments & messaging', 'Elasticsearch'],
      tech: ['PHP', 'Laravel', 'Elasticsearch', 'Caching'],
    },
  ],
  publication: {
    title: 'A Waiting Time Based Bully Algorithm for Leader Node Selection in Distributed System',
    venue: 'Malaysian Journal of Science, vol. 41, no. 3, pp. 38–43 (2022)',
    authors: 'Md. Navid Bin Anwar, Afroza Nahar, Nashid Kamal, Mehedi Hasan Shuvo',
    doi: 'https://doi.org/10.22452/mjs.vol41no3.5',
  },
  education: {
    degree: 'B.Sc. in Computer Science and Engineering',
    school: 'American International University-Bangladesh (AIUB)',
    period: 'Jan 2015 — Jan 2020',
    courses: ['OOAD & Design Patterns', 'Data Structures & Algorithms', 'Artificial Intelligence & Expert Systems', 'Compiler Design'],
  },
};

export default content;
```

- [ ] **Step 4: Run test, expect PASS**

Run: `npm test -- content`

- [ ] **Step 5: Checkpoint** — content module is the single source of truth.

---

### Task 3: Theme system (CSS variables + useTheme hook)

**Files:**
- Create: `src/components/hooks/useTheme.js`, `src/components/hooks/__tests__/useTheme.test.jsx`
- Replace: `src/index.css`

**Interfaces:**
- Produces: `useTheme()` → `{ theme: 'dark' | 'light', toggle: () => void }`. Toggling adds/removes `dark` class on `document.documentElement` and writes `localStorage.theme`.

- [ ] **Step 1: Replace `src/index.css`** with theme tokens + base styles

```css
@tailwind base;
@tailwind components;
@tailwind utilities;

@layer base {
  :root {
    --bg: 248 250 252;       /* #F8FAFC */
    --surface: 255 255 255;  /* #FFFFFF */
    --border: 226 232 240;   /* #E2E8F0 */
    --text: 15 23 42;        /* #0F172A */
    --muted: 71 85 105;      /* #475569 */
    --accent: 8 145 178;     /* #0891B2 */
    --accent2: 5 150 105;    /* #059669 */
  }
  .dark {
    --bg: 11 17 32;          /* #0B1120 */
    --surface: 30 41 59;     /* #1E293B */
    --border: 51 65 85;      /* #334155 */
    --text: 226 232 240;     /* #E2E8F0 */
    --muted: 148 163 184;    /* #94A3B8 */
    --accent: 34 211 238;    /* #22D3EE */
    --accent2: 52 211 153;   /* #34D399 */
  }
  html { scroll-behavior: smooth; }
  @media (prefers-reduced-motion: reduce) {
    html { scroll-behavior: auto; }
  }
  body {
    @apply bg-bg text-body font-sans antialiased;
  }
  section { scroll-margin-top: 5rem; }
}
```

- [ ] **Step 2: Write failing test `src/components/hooks/__tests__/useTheme.test.jsx`**

```jsx
import { renderHook, act } from '@testing-library/react';
import { useTheme } from '../useTheme.js';

beforeEach(() => {
  localStorage.clear();
  document.documentElement.className = '';
});

test('defaults to dark and toggles to light', () => {
  const { result } = renderHook(() => useTheme());
  expect(result.current.theme).toBe('dark');
  expect(document.documentElement.classList.contains('dark')).toBe(true);

  act(() => result.current.toggle());
  expect(result.current.theme).toBe('light');
  expect(document.documentElement.classList.contains('dark')).toBe(false);
  expect(localStorage.getItem('theme')).toBe('light');
});
```

- [ ] **Step 3: Run test, expect FAIL**

Run: `npm test -- useTheme`

- [ ] **Step 4: Create `src/components/hooks/useTheme.js`**

```js
import { useEffect, useState } from 'react';

function getInitial() {
  const stored = localStorage.getItem('theme');
  if (stored === 'light' || stored === 'dark') return stored;
  const prefersLight = window.matchMedia('(prefers-color-scheme: light)').matches;
  return prefersLight ? 'light' : 'dark';
}

export function useTheme() {
  const [theme, setTheme] = useState(getInitial);

  useEffect(() => {
    const root = document.documentElement;
    root.classList.toggle('dark', theme === 'dark');
    localStorage.setItem('theme', theme);
  }, [theme]);

  const toggle = () => setTheme((t) => (t === 'dark' ? 'light' : 'dark'));
  return { theme, toggle };
}
```

- [ ] **Step 5: Run test, expect PASS**

Run: `npm test -- useTheme`

- [ ] **Step 6: Checkpoint** — theming works.

---

### Task 4: Hooks — useInView, useScrollSpy

**Files:**
- Create: `src/components/hooks/useInView.js`, `src/components/hooks/useScrollSpy.js`, `src/components/hooks/__tests__/useScrollSpy.test.jsx`

**Interfaces:**
- Produces:
  - `useInView(options?)` → `[ref, inView]` (boolean). Honors reduced motion by returning `true` immediately if reduced motion is set.
  - `useScrollSpy(ids: string[], offset?)` → active `id` string. Listens to scroll and returns the id of the section currently in view.

- [ ] **Step 1: Create `src/components/hooks/useInView.js`**

```js
import { useEffect, useRef, useState } from 'react';

export function useInView({ threshold = 0.15, once = true } = {}) {
  const ref = useRef(null);
  const reduce =
    typeof window !== 'undefined' &&
    window.matchMedia('(prefers-reduced-motion: reduce)').matches;
  const [inView, setInView] = useState(reduce);

  useEffect(() => {
    if (reduce || !ref.current) return;
    const el = ref.current;
    const obs = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setInView(true);
          if (once) obs.unobserve(el);
        } else if (!once) {
          setInView(false);
        }
      },
      { threshold }
    );
    obs.observe(el);
    return () => obs.disconnect();
  }, [threshold, once, reduce]);

  return [ref, inView];
}
```

- [ ] **Step 2: Create `src/components/hooks/useScrollSpy.js`**

```js
import { useEffect, useState } from 'react';

export function useScrollSpy(ids, offset = 96) {
  const [active, setActive] = useState(ids[0] ?? '');

  useEffect(() => {
    function onScroll() {
      let current = ids[0] ?? '';
      for (const id of ids) {
        const el = document.getElementById(id);
        if (el && el.getBoundingClientRect().top - offset <= 0) {
          current = id;
        }
      }
      setActive(current);
    }
    onScroll();
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, [ids, offset]);

  return active;
}
```

- [ ] **Step 3: Write test `src/components/hooks/__tests__/useScrollSpy.test.jsx`**

```jsx
import { renderHook } from '@testing-library/react';
import { useScrollSpy } from '../useScrollSpy.js';

test('returns first id by default', () => {
  const { result } = renderHook(() => useScrollSpy(['a', 'b', 'c']));
  expect(result.current).toBe('a');
});
```

- [ ] **Step 4: Run test, expect PASS**

Run: `npm test -- useScrollSpy`

- [ ] **Step 5: Checkpoint** — hooks ready.

---

### Task 5: UI primitives — Container, Section, SectionHeading, Button, Card, Badge, SocialLinks

**Files:**
- Create: `src/components/layout/Container.jsx`, `src/components/layout/Section.jsx`, `src/components/ui/SectionHeading.jsx`, `src/components/ui/Button.jsx`, `src/components/ui/Card.jsx`, `src/components/ui/Badge.jsx`, `src/components/ui/SocialLinks.jsx`
- Create: `src/components/ui/__tests__/ui.test.jsx`

**Interfaces:**
- Produces:
  - `Container({ children, className })` → centered max-width wrapper.
  - `Section({ id, children, className })` → `<section id>` with reveal animation via `useInView` + Framer Motion.
  - `SectionHeading({ index, title, subtitle })` → mono index label + title.
  - `Button({ as, href, variant, children, ...props })` — variants `'primary' | 'ghost'`; renders `<a>` if `href`, else `<button>`.
  - `Card({ children, className })` — surface card with border + hover lift.
  - `Badge({ children })` — small pill/chip.
  - `SocialLinks({ size })` — renders GitHub/LinkedIn/Facebook icon links from `content.social`.

- [ ] **Step 1: Create `src/components/layout/Container.jsx`**

```jsx
export default function Container({ children, className = '' }) {
  return <div className={`mx-auto w-full max-w-content px-5 sm:px-8 ${className}`}>{children}</div>;
}
```

- [ ] **Step 2: Create `src/components/layout/Section.jsx`**

```jsx
import { motion } from 'framer-motion';
import { useInView } from '../hooks/useInView.js';
import Container from './Container.jsx';

export default function Section({ id, children, className = '' }) {
  const [ref, inView] = useInView();
  return (
    <section id={id} className={`py-20 sm:py-28 ${className}`}>
      <Container>
        <motion.div
          ref={ref}
          initial={{ opacity: 0, y: 24 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.5, ease: 'easeOut' }}
        >
          {children}
        </motion.div>
      </Container>
    </section>
  );
}
```

- [ ] **Step 3: Create `src/components/ui/SectionHeading.jsx`**

```jsx
export default function SectionHeading({ index, title, subtitle }) {
  return (
    <div className="mb-12">
      <p className="font-mono text-sm text-accent">{index}</p>
      <h2 className="mt-2 text-3xl font-bold tracking-tight sm:text-4xl">{title}</h2>
      {subtitle && <p className="mt-3 max-w-2xl text-muted">{subtitle}</p>}
    </div>
  );
}
```

- [ ] **Step 4: Create `src/components/ui/Button.jsx`**

```jsx
export default function Button({ href, variant = 'primary', children, className = '', ...props }) {
  const base =
    'inline-flex items-center justify-center gap-2 rounded-lg px-5 py-2.5 text-sm font-semibold transition focus:outline-none focus-visible:ring-2 focus-visible:ring-accent';
  const styles = {
    primary: 'bg-accent text-bg hover:opacity-90',
    ghost: 'border border-border text-body hover:border-accent hover:text-accent',
  };
  const cls = `${base} ${styles[variant]} ${className}`;
  if (href) {
    return (
      <a href={href} className={cls} {...props}>
        {children}
      </a>
    );
  }
  return (
    <button className={cls} {...props}>
      {children}
    </button>
  );
}
```

- [ ] **Step 5: Create `src/components/ui/Card.jsx`**

```jsx
export default function Card({ children, className = '' }) {
  return (
    <div
      className={`rounded-xl border border-border bg-surface p-6 transition duration-300 hover:-translate-y-1 hover:border-accent/60 ${className}`}
    >
      {children}
    </div>
  );
}
```

- [ ] **Step 6: Create `src/components/ui/Badge.jsx`**

```jsx
export default function Badge({ children, className = '' }) {
  return (
    <span
      className={`inline-flex items-center rounded-md border border-border bg-bg px-2.5 py-1 font-mono text-xs text-muted ${className}`}
    >
      {children}
    </span>
  );
}
```

- [ ] **Step 7: Create `src/components/ui/SocialLinks.jsx`**

```jsx
import { FaGithub, FaLinkedin, FaFacebook } from 'react-icons/fa';
import content from '../../data/content.js';

const ICONS = { github: FaGithub, linkedin: FaLinkedin, facebook: FaFacebook };

export default function SocialLinks({ size = 22, className = '' }) {
  return (
    <div className={`flex items-center gap-4 ${className}`}>
      {content.social.map((s) => {
        const Icon = ICONS[s.icon];
        return (
          <a
            key={s.name}
            href={s.url}
            target="_blank"
            rel="noreferrer"
            aria-label={s.name}
            className="text-muted transition hover:text-accent"
          >
            <Icon size={size} />
          </a>
        );
      })}
    </div>
  );
}
```

- [ ] **Step 8: Write test `src/components/ui/__tests__/ui.test.jsx`**

```jsx
import { render, screen } from '@testing-library/react';
import Button from '../Button.jsx';
import Badge from '../Badge.jsx';
import SocialLinks from '../SocialLinks.jsx';

test('Button renders anchor when href given', () => {
  render(<Button href="/x">Resume</Button>);
  const link = screen.getByText('Resume');
  expect(link.tagName).toBe('A');
  expect(link).toHaveAttribute('href', '/x');
});

test('Badge renders children', () => {
  render(<Badge>Laravel</Badge>);
  expect(screen.getByText('Laravel')).toBeInTheDocument();
});

test('SocialLinks renders three labelled links', () => {
  render(<SocialLinks />);
  expect(screen.getByLabelText('GitHub')).toBeInTheDocument();
  expect(screen.getByLabelText('LinkedIn')).toBeInTheDocument();
  expect(screen.getByLabelText('Facebook')).toBeInTheDocument();
});
```

- [ ] **Step 9: Run tests, expect PASS**

Run: `npm test -- ui`

- [ ] **Step 10: Checkpoint** — primitives ready.

---

### Task 6: Navbar + ThemeToggle (sticky, scroll-spy, mobile drawer)

**Files:**
- Create: `src/components/layout/ThemeToggle.jsx`, `src/components/layout/Navbar.jsx`

**Interfaces:**
- Consumes: `useTheme`, `useScrollSpy`, `content.nav`, `content.profile.resumeUrl`, `Button`.
- Produces: `Navbar({ theme, toggle })` rendered fixed at top; `ThemeToggle({ theme, toggle })`.

- [ ] **Step 1: Create `src/components/layout/ThemeToggle.jsx`**

```jsx
import { FiMoon, FiSun } from 'react-icons/fi';

export default function ThemeToggle({ theme, toggle }) {
  return (
    <button
      onClick={toggle}
      aria-label="Toggle theme"
      className="rounded-lg border border-border p-2 text-body transition hover:border-accent hover:text-accent"
    >
      {theme === 'dark' ? <FiSun size={18} /> : <FiMoon size={18} />}
    </button>
  );
}
```

- [ ] **Step 2: Create `src/components/layout/Navbar.jsx`**

```jsx
import { useState } from 'react';
import { FiMenu, FiX } from 'react-icons/fi';
import content from '../../data/content.js';
import { useScrollSpy } from '../hooks/useScrollSpy.js';
import ThemeToggle from './ThemeToggle.jsx';
import Container from './Container.jsx';
import Button from '../ui/Button.jsx';

const NAV_IDS = content.nav.map((n) => n.id);

export default function Navbar({ theme, toggle }) {
  const [open, setOpen] = useState(false);
  const active = useScrollSpy(NAV_IDS);

  return (
    <header className="fixed inset-x-0 top-0 z-50 border-b border-border/60 bg-bg/80 backdrop-blur">
      <Container className="flex h-16 items-center justify-between">
        <a href="#hero" className="font-mono text-lg font-bold text-accent">SHUVO</a>

        <nav className="hidden items-center gap-7 md:flex">
          {content.nav.map((n) => (
            <a
              key={n.id}
              href={`#${n.id}`}
              className={`text-sm transition hover:text-accent ${
                active === n.id ? 'text-accent' : 'text-muted'
              }`}
            >
              {n.label}
            </a>
          ))}
        </nav>

        <div className="flex items-center gap-3">
          <ThemeToggle theme={theme} toggle={toggle} />
          <Button href={content.profile.resumeUrl} target="_blank" rel="noreferrer" className="hidden sm:inline-flex">
            Resume
          </Button>
          <button
            className="md:hidden text-body"
            aria-label="Menu"
            onClick={() => setOpen((o) => !o)}
          >
            {open ? <FiX size={22} /> : <FiMenu size={22} />}
          </button>
        </div>
      </Container>

      {open && (
        <nav className="border-t border-border bg-bg md:hidden">
          <Container className="flex flex-col py-3">
            {content.nav.map((n) => (
              <a
                key={n.id}
                href={`#${n.id}`}
                onClick={() => setOpen(false)}
                className="py-2 text-sm text-muted hover:text-accent"
              >
                {n.label}
              </a>
            ))}
            <a
              href={content.profile.resumeUrl}
              target="_blank"
              rel="noreferrer"
              className="py-2 text-sm font-semibold text-accent"
            >
              Resume ↗
            </a>
          </Container>
        </nav>
      )}
    </header>
  );
}
```

- [ ] **Step 3: Manual verify** — wire into App temporarily or wait for Task 12 assembly. (Smoke covered at assembly.)

- [ ] **Step 4: Checkpoint** — navbar built.

---

### Task 7: Hero section

**Files:**
- Create: `src/components/sections/Hero.jsx`

**Interfaces:**
- Consumes: `content.profile`, `content.stats`, `Button`, `SocialLinks`.
- Produces: `Hero()` — full-height hero with animated grid-glow background, name, title, intro, CTAs, photo slot, stat chips. Root element `id="hero"`.

- [ ] **Step 1: Create `src/components/sections/Hero.jsx`**

```jsx
import { FiArrowDown, FiMail } from 'react-icons/fi';
import content from '../../data/content.js';
import Container from '../layout/Container.jsx';
import Button from '../ui/Button.jsx';
import SocialLinks from '../ui/SocialLinks.jsx';

export default function Hero() {
  const { profile, stats } = content;
  return (
    <section id="hero" className="relative flex min-h-screen items-center overflow-hidden">
      {/* animated grid + glow background */}
      <div
        aria-hidden
        className="pointer-events-none absolute inset-0 opacity-[0.35]"
        style={{
          backgroundImage:
            'linear-gradient(rgb(var(--border)/0.4) 1px, transparent 1px), linear-gradient(90deg, rgb(var(--border)/0.4) 1px, transparent 1px)',
          backgroundSize: '48px 48px',
          maskImage: 'radial-gradient(ellipse at 50% 0%, black, transparent 75%)',
        }}
      />
      <div
        aria-hidden
        className="pointer-events-none absolute -top-32 left-1/2 h-72 w-72 -translate-x-1/2 rounded-full bg-accent/20 blur-3xl"
      />

      <Container className="relative grid items-center gap-12 pt-24 md:grid-cols-[1.4fr_1fr]">
        <div>
          <p className="font-mono text-sm text-accent">Hi, my name is</p>
          <h1 className="mt-3 text-4xl font-bold tracking-tight sm:text-6xl">{profile.name}</h1>
          <h2 className="mt-2 text-2xl font-semibold text-muted sm:text-3xl">{profile.title}</h2>
          <p className="mt-6 max-w-xl text-lg text-muted">{profile.intro}</p>

          <div className="mt-8 flex flex-wrap gap-3">
            <Button href={profile.resumeUrl} target="_blank" rel="noreferrer">
              <FiArrowDown /> Download Resume
            </Button>
            <Button href="#contact" variant="ghost">
              <FiMail /> Contact me
            </Button>
          </div>

          <SocialLinks className="mt-8" />

          <dl className="mt-12 grid max-w-lg grid-cols-3 gap-4">
            {stats.map((s) => (
              <div key={s.label} className="rounded-lg border border-border bg-surface/50 p-4">
                <dt className="text-2xl font-bold text-accent">{s.value}</dt>
                <dd className="mt-1 text-xs text-muted">{s.label}</dd>
              </div>
            ))}
          </dl>
        </div>

        <div className="mx-auto">
          <div className="relative h-56 w-56 sm:h-72 sm:w-72">
            <div className="absolute inset-0 rounded-2xl border border-accent/40" />
            <img
              src={profile.photoUrl}
              alt={profile.name}
              width={288}
              height={288}
              className="h-full w-full translate-x-3 translate-y-3 rounded-2xl object-cover"
              onError={(e) => { e.currentTarget.style.visibility = 'hidden'; }}
            />
          </div>
        </div>
      </Container>
    </section>
  );
}
```

- [ ] **Step 2: Checkpoint** — hero built (visual verify at assembly).

---

### Task 8: About + Skills sections

**Files:**
- Create: `src/components/sections/About.jsx`, `src/components/sections/Skills.jsx`

**Interfaces:**
- Consumes: `content.about`, `content.skills`, `Section`, `SectionHeading`, `Card`, `Badge`.
- Produces: `About()` (`id="about"`), `Skills()` (`id="skills"`).

- [ ] **Step 1: Create `src/components/sections/About.jsx`**

```jsx
import content from '../../data/content.js';
import Section from '../layout/Section.jsx';
import SectionHeading from '../ui/SectionHeading.jsx';

export default function About() {
  const { about } = content;
  return (
    <Section id="about">
      <SectionHeading index="01 · About" title="About me" />
      <div className="grid gap-10 md:grid-cols-[2fr_1fr]">
        <div className="space-y-4 text-muted">
          {about.paragraphs.map((p, i) => (
            <p key={i} className="leading-relaxed">{p}</p>
          ))}
        </div>
        <ul className="space-y-3">
          {about.facts.map((f) => (
            <li key={f} className="flex items-start gap-2 text-sm">
              <span className="mt-1 text-accent">▹</span>
              <span>{f}</span>
            </li>
          ))}
        </ul>
      </div>
    </Section>
  );
}
```

- [ ] **Step 2: Create `src/components/sections/Skills.jsx`**

```jsx
import content from '../../data/content.js';
import Section from '../layout/Section.jsx';
import SectionHeading from '../ui/SectionHeading.jsx';
import Card from '../ui/Card.jsx';
import Badge from '../ui/Badge.jsx';

export default function Skills() {
  return (
    <Section id="skills">
      <SectionHeading index="02 · Skills" title="Skills & technologies" />
      <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
        {content.skills.map((cat) => (
          <Card key={cat.group}>
            <h3 className="font-mono text-sm font-semibold text-accent">{cat.group}</h3>
            <div className="mt-4 flex flex-wrap gap-2">
              {cat.items.map((item) => (
                <Badge key={item}>{item}</Badge>
              ))}
            </div>
          </Card>
        ))}
      </div>
    </Section>
  );
}
```

- [ ] **Step 3: Checkpoint** — about + skills built.

---

### Task 9: Experience timeline

**Files:**
- Create: `src/components/ui/TimelineItem.jsx`, `src/components/sections/Experience.jsx`

**Interfaces:**
- Consumes: `content.experience`, `Section`, `SectionHeading`.
- Produces: `Experience()` (`id="experience"`), `TimelineItem({ item })`.

- [ ] **Step 1: Create `src/components/ui/TimelineItem.jsx`**

```jsx
export default function TimelineItem({ item }) {
  return (
    <li className="relative pl-8">
      <span className="absolute left-0 top-1.5 h-3 w-3 -translate-x-1/2 rounded-full border-2 border-accent bg-bg" />
      <div className="flex flex-wrap items-baseline justify-between gap-x-3">
        <h3 className="text-lg font-semibold">
          {item.role} <span className="text-accent">· {item.company}</span>
        </h3>
        <span className="font-mono text-xs text-muted">{item.period}</span>
      </div>
      <p className="mt-1 text-sm text-muted">{item.summary}</p>
      <ul className="mt-3 space-y-1.5">
        {item.points.map((p, i) => (
          <li key={i} className="flex gap-2 text-sm text-muted">
            <span className="mt-1 text-accent">▹</span>
            <span>{p}</span>
          </li>
        ))}
      </ul>
    </li>
  );
}
```

- [ ] **Step 2: Create `src/components/sections/Experience.jsx`**

```jsx
import content from '../../data/content.js';
import Section from '../layout/Section.jsx';
import SectionHeading from '../ui/SectionHeading.jsx';
import TimelineItem from '../ui/TimelineItem.jsx';

export default function Experience() {
  return (
    <Section id="experience">
      <SectionHeading index="03 · Experience" title="Where I’ve worked" />
      <ol className="space-y-10 border-l border-border pl-2">
        {content.experience.map((item) => (
          <TimelineItem key={`${item.company}-${item.period}`} item={item} />
        ))}
      </ol>
    </Section>
  );
}
```

- [ ] **Step 3: Checkpoint** — experience built.

---

### Task 10: Projects + Publication + Education

**Files:**
- Create: `src/components/sections/Projects.jsx`, `src/components/sections/Publication.jsx`, `src/components/sections/Education.jsx`

**Interfaces:**
- Consumes: `content.projects`, `content.publication`, `content.education`, `Section`, `SectionHeading`, `Card`, `Badge`.
- Produces: `Projects()` (`id="projects"`), `Publication()` (`id="publication"`), `Education()` (`id="education"`).

- [ ] **Step 1: Create `src/components/sections/Projects.jsx`**

```jsx
import content from '../../data/content.js';
import Section from '../layout/Section.jsx';
import SectionHeading from '../ui/SectionHeading.jsx';
import Card from '../ui/Card.jsx';
import Badge from '../ui/Badge.jsx';

export default function Projects() {
  return (
    <Section id="projects">
      <SectionHeading
        index="04 · Projects"
        title="Selected work"
        subtitle="Real systems I’ve helped build. Several are proprietary, so code isn’t public — here’s the context and impact."
      />
      <div className="grid gap-6 md:grid-cols-2">
        {content.projects.map((p) => (
          <Card key={p.name} className="flex flex-col">
            <div className="flex items-start justify-between gap-3">
              <div>
                <h3 className="text-lg font-semibold">{p.name}</h3>
                <p className="mt-0.5 text-xs text-muted">{p.org}</p>
              </div>
              {p.proprietary && <Badge>Proprietary</Badge>}
            </div>
            <p className="mt-4 flex-1 text-sm text-muted">{p.blurb}</p>
            <div className="mt-4 flex flex-wrap gap-2">
              {p.impact.map((m) => (
                <span key={m} className="rounded-md bg-accent/10 px-2 py-1 text-xs font-medium text-accent">
                  {m}
                </span>
              ))}
            </div>
            <div className="mt-3 flex flex-wrap gap-2">
              {p.tech.map((t) => (
                <Badge key={t}>{t}</Badge>
              ))}
            </div>
          </Card>
        ))}
      </div>
    </Section>
  );
}
```

- [ ] **Step 2: Create `src/components/sections/Publication.jsx`**

```jsx
import { FiExternalLink } from 'react-icons/fi';
import content from '../../data/content.js';
import Section from '../layout/Section.jsx';
import SectionHeading from '../ui/SectionHeading.jsx';
import Card from '../ui/Card.jsx';

export default function Publication() {
  const { publication: pub } = content;
  return (
    <Section id="publication">
      <SectionHeading index="05 · Research" title="Publication" />
      <Card>
        <h3 className="text-lg font-semibold">{pub.title}</h3>
        <p className="mt-2 text-sm text-muted">{pub.venue}</p>
        <p className="mt-1 text-sm text-muted">{pub.authors}</p>
        <a
          href={pub.doi}
          target="_blank"
          rel="noreferrer"
          className="mt-4 inline-flex items-center gap-2 font-mono text-sm text-accent hover:underline"
        >
          View DOI <FiExternalLink />
        </a>
      </Card>
    </Section>
  );
}
```

- [ ] **Step 3: Create `src/components/sections/Education.jsx`**

```jsx
import content from '../../data/content.js';
import Section from '../layout/Section.jsx';
import SectionHeading from '../ui/SectionHeading.jsx';
import Card from '../ui/Card.jsx';
import Badge from '../ui/Badge.jsx';

export default function Education() {
  const { education: e } = content;
  return (
    <Section id="education">
      <SectionHeading index="06 · Education" title="Education" />
      <Card>
        <div className="flex flex-wrap items-baseline justify-between gap-2">
          <h3 className="text-lg font-semibold">{e.degree}</h3>
          <span className="font-mono text-xs text-muted">{e.period}</span>
        </div>
        <p className="mt-1 text-sm text-muted">{e.school}</p>
        <div className="mt-4 flex flex-wrap gap-2">
          {e.courses.map((c) => (
            <Badge key={c}>{c}</Badge>
          ))}
        </div>
      </Card>
    </Section>
  );
}
```

- [ ] **Step 4: Checkpoint** — projects/publication/education built.

---

### Task 11: Contact + Footer

**Files:**
- Create: `src/components/sections/Contact.jsx`, `src/components/layout/Footer.jsx`

**Interfaces:**
- Consumes: `content.profile`, `content.social`, `Section`, `SectionHeading`, `Button`, `SocialLinks`.
- Produces: `Contact()` (`id="contact"`), `Footer()`. Contact form uses a Formspree endpoint constant `FORMSPREE_ENDPOINT`; if left as the placeholder, the form falls back to a `mailto:` submit.

- [ ] **Step 1: Create `src/components/sections/Contact.jsx`**

```jsx
import { FiMail, FiMapPin } from 'react-icons/fi';
import content from '../../data/content.js';
import Section from '../layout/Section.jsx';
import SectionHeading from '../ui/SectionHeading.jsx';
import Button from '../ui/Button.jsx';
import SocialLinks from '../ui/SocialLinks.jsx';

// TODO(owner): replace with your real Formspree form id to enable in-page submit.
const FORMSPREE_ENDPOINT = 'https://formspree.io/f/your-form-id';

export default function Contact() {
  const { profile } = content;
  const usingFormspree = !FORMSPREE_ENDPOINT.includes('your-form-id');

  function handleSubmit(e) {
    if (usingFormspree) return; // native POST to Formspree
    e.preventDefault();
    const data = new FormData(e.target);
    const subject = encodeURIComponent(`Portfolio contact from ${data.get('name')}`);
    const body = encodeURIComponent(`${data.get('message')}\n\n— ${data.get('name')} (${data.get('email')})`);
    window.location.href = `mailto:${profile.email}?subject=${subject}&body=${body}`;
  }

  return (
    <Section id="contact">
      <SectionHeading
        index="07 · Contact"
        title="Get in touch"
        subtitle={profile.availability}
      />
      <div className="grid gap-10 md:grid-cols-2">
        <div className="space-y-4">
          <a href={`mailto:${profile.email}`} className="flex items-center gap-3 text-body hover:text-accent">
            <FiMail className="text-accent" /> {profile.email}
          </a>
          <p className="flex items-center gap-3 text-muted">
            <FiMapPin className="text-accent" /> {profile.location}
          </p>
          <SocialLinks className="pt-2" />
        </div>

        <form
          onSubmit={handleSubmit}
          action={usingFormspree ? FORMSPREE_ENDPOINT : undefined}
          method={usingFormspree ? 'POST' : undefined}
          className="space-y-4"
        >
          <input
            name="name" required placeholder="Your name"
            className="w-full rounded-lg border border-border bg-surface px-4 py-2.5 text-sm outline-none focus:border-accent"
          />
          <input
            name="email" type="email" required placeholder="Your email"
            className="w-full rounded-lg border border-border bg-surface px-4 py-2.5 text-sm outline-none focus:border-accent"
          />
          <textarea
            name="message" required rows={4} placeholder="Your message"
            className="w-full rounded-lg border border-border bg-surface px-4 py-2.5 text-sm outline-none focus:border-accent"
          />
          <Button type="submit">Send message</Button>
        </form>
      </div>
    </Section>
  );
}
```

- [ ] **Step 2: Create `src/components/layout/Footer.jsx`**

```jsx
import { FiArrowUp } from 'react-icons/fi';
import content from '../../data/content.js';
import Container from './Container.jsx';

export default function Footer() {
  return (
    <footer className="border-t border-border py-8">
      <Container className="flex flex-col items-center justify-between gap-4 sm:flex-row">
        <p className="text-xs text-muted">
          © {new Date().getFullYear()} {content.profile.name}. Built with React + Tailwind.
        </p>
        <a href="#hero" className="flex items-center gap-1 text-xs text-muted hover:text-accent">
          Back to top <FiArrowUp />
        </a>
      </Container>
    </footer>
  );
}
```

- [ ] **Step 3: Checkpoint** — contact + footer built.

---

### Task 12: Assemble App + render smoke test

**Files:**
- Modify: `src/App.jsx`
- Modify: `src/__tests__/smoke.test.jsx`

**Interfaces:**
- Consumes: every section + layout component; `useTheme`.
- Produces: full single-page app.

- [ ] **Step 1: Replace `src/App.jsx`**

```jsx
import { useTheme } from './components/hooks/useTheme.js';
import Navbar from './components/layout/Navbar.jsx';
import Footer from './components/layout/Footer.jsx';
import Hero from './components/sections/Hero.jsx';
import About from './components/sections/About.jsx';
import Skills from './components/sections/Skills.jsx';
import Experience from './components/sections/Experience.jsx';
import Projects from './components/sections/Projects.jsx';
import Publication from './components/sections/Publication.jsx';
import Education from './components/sections/Education.jsx';
import Contact from './components/sections/Contact.jsx';

export default function App() {
  const { theme, toggle } = useTheme();
  return (
    <>
      <Navbar theme={theme} toggle={toggle} />
      <main>
        <Hero />
        <About />
        <Skills />
        <Experience />
        <Projects />
        <Publication />
        <Education />
        <Contact />
      </main>
      <Footer />
    </>
  );
}
```

- [ ] **Step 2: Replace `src/__tests__/smoke.test.jsx`**

```jsx
import { render, screen } from '@testing-library/react';
import App from '../App.jsx';

test('App renders key sections', () => {
  render(<App />);
  expect(screen.getByRole('heading', { name: /Mehedi Hasan Shuvo/i })).toBeInTheDocument();
  expect(screen.getByText(/Where I’ve worked/i)).toBeInTheDocument();
  expect(screen.getByText(/Get in touch/i)).toBeInTheDocument();
});
```

- [ ] **Step 3: Run full test suite, expect PASS**

Run: `npm test`
Expected: all tests green.

- [ ] **Step 4: Visual verify**

Run: `npm run dev` → check hero, theme toggle (dark↔light), mobile nav (narrow the window), scroll-spy highlight, all sections render, reduced-motion (enable OS setting → no reveal animations).

- [ ] **Step 5: Checkpoint** — full app assembled.

---

### Task 13: SEO, metadata, favicon, OG, robots, sitemap

**Files:**
- Modify: `index.html`
- Create: `public/robots.txt`, `public/sitemap.xml`, `public/favicon.svg`, `public/og-image.svg` (placeholder)

**Interfaces:**
- Produces: complete `<head>` metadata + crawl files.

- [ ] **Step 1: Replace `<head>` of `index.html`**

```html
<head>
  <meta charset="UTF-8" />
  <meta name="viewport" content="width=device-width, initial-scale=1.0" />
  <link rel="icon" type="image/svg+xml" href="/favicon.svg" />
  <title>Mehedi Hasan Shuvo — Backend Software Engineer</title>
  <meta name="description" content="Backend Software Engineer (PHP/Laravel, Node.js) with 5+ years building scalable telecom and ERP systems. Open to international roles and freelance." />
  <meta name="author" content="Mehedi Hasan Shuvo" />
  <link rel="canonical" href="https://rpmshuvo.github.io/" />

  <meta property="og:type" content="website" />
  <meta property="og:url" content="https://rpmshuvo.github.io/" />
  <meta property="og:title" content="Mehedi Hasan Shuvo — Backend Software Engineer" />
  <meta property="og:description" content="Backend Software Engineer (PHP/Laravel, Node.js). 5+ years, telecom & ERP, 3M+ DAU." />
  <meta property="og:image" content="https://rpmshuvo.github.io/og-image.svg" />

  <meta name="twitter:card" content="summary_large_image" />
  <meta name="twitter:title" content="Mehedi Hasan Shuvo — Backend Software Engineer" />
  <meta name="twitter:description" content="Backend Software Engineer (PHP/Laravel, Node.js). 5+ years, telecom & ERP." />
  <meta name="twitter:image" content="https://rpmshuvo.github.io/og-image.svg" />

  <script type="application/ld+json">
  {
    "@context": "https://schema.org",
    "@type": "Person",
    "name": "Mehedi Hasan Shuvo",
    "jobTitle": "Backend Software Engineer",
    "email": "mailto:rpm_shuvo@outlook.com",
    "url": "https://rpmshuvo.github.io/",
    "address": { "@type": "PostalAddress", "addressLocality": "Dhaka", "addressCountry": "BD" },
    "alumniOf": "American International University-Bangladesh",
    "knowsAbout": ["PHP", "Laravel", "Node.js", "REST API", "MySQL", "Redis", "Docker", "Distributed Systems"],
    "sameAs": [
      "https://github.com/rpmshuvo",
      "https://www.linkedin.com/in/shuvo-rpm",
      "https://www.facebook.com/rpm.shuvo"
    ]
  }
  </script>
</head>
```

- [ ] **Step 2: Create `public/robots.txt`**

```
User-agent: *
Allow: /
Sitemap: https://rpmshuvo.github.io/sitemap.xml
```

- [ ] **Step 3: Create `public/sitemap.xml`**

```xml
<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
  <url>
    <loc>https://rpmshuvo.github.io/</loc>
    <changefreq>monthly</changefreq>
    <priority>1.0</priority>
  </url>
</urlset>
```

- [ ] **Step 4: Create `public/favicon.svg`** (monogram)

```svg
<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 64 64">
  <rect width="64" height="64" rx="14" fill="#0B1120"/>
  <text x="50%" y="54%" dominant-baseline="middle" text-anchor="middle"
    font-family="monospace" font-size="26" font-weight="700" fill="#22D3EE">S</text>
</svg>
```

- [ ] **Step 5: Create `public/og-image.svg`** (placeholder social card)

```svg
<svg xmlns="http://www.w3.org/2000/svg" width="1200" height="630" viewBox="0 0 1200 630">
  <rect width="1200" height="630" fill="#0B1120"/>
  <text x="80" y="300" font-family="monospace" font-size="40" fill="#22D3EE">SHUVO</text>
  <text x="80" y="370" font-family="sans-serif" font-size="64" font-weight="700" fill="#E2E8F0">Mehedi Hasan Shuvo</text>
  <text x="80" y="430" font-family="sans-serif" font-size="36" fill="#94A3B8">Backend Software Engineer · PHP/Laravel · Node.js</text>
</svg>
```

- [ ] **Step 6: Checkpoint** — SEO complete. (Owner may later swap `og-image.svg` for a 1200×630 PNG.)

---

### Task 14: Assets — resume PDF + profile photo placeholder

**Files:**
- Create: `public/Mehedi-Hasan-Shuvo-Resume.pdf`, `public/profile.jpg`

**Interfaces:**
- Produces: downloadable resume + hero photo, matching `content.profile.resumeUrl` / `photoUrl`.

- [ ] **Step 1: Copy the resume PDF into `public/`**

```bash
cp "/home/bs01182/Downloads/Mehedi Hasan Shuvo/Resume of Mehedi Hasan Shuvo.pdf" \
   "public/Mehedi-Hasan-Shuvo-Resume.pdf"
```

- [ ] **Step 2: Add a profile photo placeholder** (reuse existing headshot until the owner provides a new one)

```bash
cp profile.jpg public/profile.jpg 2>/dev/null || cp profile-1.jpeg public/profile.jpg
```

> Owner action: replace `public/profile.jpg` with a new high-res headshot (square, ≥600×600) when ready. No code change needed — the path stays the same.

- [ ] **Step 3: Remove the now-duplicated root images**

```bash
rm -f profile.jpg profile-1.jpeg
```

- [ ] **Step 4: Verify** — `npm run dev`, confirm Resume button downloads the PDF and the hero photo shows.

- [ ] **Step 5: Checkpoint** — assets wired.

---

### Task 15: Deployment — GitHub Actions + README

**Files:**
- Create: `.github/workflows/deploy.yml`, `.gitignore`, `README.md`

**Interfaces:**
- Produces: CI that builds and deploys `dist/` to GitHub Pages on push to the default branch.

- [ ] **Step 1: Create `.gitignore`**

```
node_modules
dist
.DS_Store
*.local
```

- [ ] **Step 2: Create `.github/workflows/deploy.yml`**

```yaml
name: Deploy to GitHub Pages

on:
  push:
    branches: [main]
  workflow_dispatch:

permissions:
  contents: read
  pages: write
  id-token: write

concurrency:
  group: pages
  cancel-in-progress: true

jobs:
  build:
    runs-on: ubuntu-latest
    steps:
      - uses: actions/checkout@v4
      - uses: actions/setup-node@v4
        with:
          node-version: 20
          cache: npm
      - run: npm ci
      - run: npm run build
      - uses: actions/upload-pages-artifact@v3
        with:
          path: dist

  deploy:
    needs: build
    runs-on: ubuntu-latest
    environment:
      name: github-pages
      url: ${{ steps.deployment.outputs.page_url }}
    steps:
      - id: deployment
        uses: actions/deploy-pages@v4
```

> Note: if the repo's default branch is `master`, change `branches: [main]` accordingly.

- [ ] **Step 3: Create `README.md`**

```markdown
# Mehedi Hasan Shuvo — Portfolio

Personal portfolio site → https://rpmshuvo.github.io

## Stack
React 18 · Vite · Tailwind CSS · Framer Motion

## Local development
```bash
npm install
npm run dev      # start dev server
npm test         # run unit tests
npm run build    # production build → dist/
```

## Updating content
All text/data lives in **`src/data/content.js`** — edit there; no component changes needed.

- Replace your photo: drop a square image at `public/profile.jpg`.
- Replace your resume: overwrite `public/Mehedi-Hasan-Shuvo-Resume.pdf`.
- Enable the contact form: set your Formspree id in `src/components/sections/Contact.jsx`.

## Deployment
Pushing to the default branch triggers `.github/workflows/deploy.yml`, which builds and
deploys to GitHub Pages. One-time setup: repo **Settings → Pages → Source → GitHub Actions**.
```

- [ ] **Step 4: Build verification**

Run: `npm run build && npm run preview`
Expected: production build succeeds; preview serves the site at the printed URL with no console errors.

- [ ] **Step 5: Owner deploy steps** (manual, owner handles git)

1. Commit all files and push to the default branch of `rpmshuvo.github.io`.
2. Repo **Settings → Pages → Source → GitHub Actions**.
3. Wait for the Actions run to finish; visit https://rpmshuvo.github.io.

- [ ] **Step 6: Checkpoint** — deployable.

---

## Self-Review

**Spec coverage:**
- Audience/positioning → content.js (profile, about) ✓
- Tech stack (React/Vite/Tailwind/Framer/react-icons/@fontsource/Vitest) → Task 1 ✓
- Dark-first + light toggle + persistence → Task 3 ✓
- Palette + fonts → Tasks 1, 3, 14 ✓
- All 10 page sections (Navbar→Footer) → Tasks 6–12 ✓
- "SHUVO" monogram → Task 6 ✓; Go in Languages, Ryze BD project → Task 2 ✓
- Case-study projects, no links, Proprietary badge → Task 10 ✓
- Publication + DOI → Task 10 ✓
- Component structure (data/layout/sections/ui/hooks) → Tasks 2–11 ✓
- SEO (meta/OG/Twitter/JSON-LD/robots/sitemap/favicon) → Task 13 ✓
- Performance (self-host fonts, lazy/sized images, lean deps) → Tasks 1, 7, 14 ✓
- Reduced-motion gating → Tasks 3, 4 ✓
- Deployment (Actions, base '/', replace old HTML, README) → Tasks 1, 15 ✓
- Resume download → Task 14 ✓
- Contact (email + social + Formspree/mailto) → Task 11 ✓

**Placeholder scan:** No "TBD"/"implement later" left as work. The two intentional placeholders (Formspree id, photo) are documented owner-actions with working fallbacks, not unfinished plan steps.

**Type consistency:** `content` keys referenced by sections match Task 2 exactly (`profile`, `social`, `stats`, `about`, `skills`, `experience`, `projects`, `publication`, `education`, `nav`). Hooks `useTheme`/`useInView`/`useScrollSpy` signatures match their consumers. `Button` `href`→anchor contract used consistently. Section ids match `content.nav` ids and `useScrollSpy(NAV_IDS)`.
