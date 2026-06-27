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
