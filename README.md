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
