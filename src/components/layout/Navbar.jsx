import { useState } from 'react';
import { FiMenu, FiX } from 'react-icons/fi';
import content from '../../data/content.js';
import { useScrollSpy } from '../hooks/useScrollSpy.js';
import ThemeToggle from './ThemeToggle.jsx';
import Container from './Container.jsx';
import Button from '../ui/Button.jsx';

const NAV_IDS = content.nav.map((n) => n.id);
// Include 'hero' so no nav link is highlighted while the hero is in view.
const SPY_IDS = ['hero', ...NAV_IDS];

export default function Navbar({ theme, toggle }) {
  const [open, setOpen] = useState(false);
  const active = useScrollSpy(SPY_IDS);

  return (
    <header className="fixed inset-x-0 top-0 z-50 border-b border-border/60 bg-bg/80 backdrop-blur">
      <Container className="flex h-16 items-center justify-between">
        <a href="#hero" className="font-display text-lg font-bold text-body hover:text-accent">
          SHUVO<span className="text-accent">.</span>
        </a>

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
