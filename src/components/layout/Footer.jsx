import { FiArrowUp } from 'react-icons/fi';
import content from '../../data/content.js';
import Container from './Container.jsx';
import SocialLinks from '../ui/SocialLinks.jsx';

export default function Footer() {
  return (
    <footer className="border-t border-border py-10">
      <Container className="flex flex-col items-center gap-4 text-center">
        <a href="#hero" className="font-display text-xl font-bold text-body hover:text-accent">
          SHUVO<span className="text-accent">.</span>
        </a>
        <p className="text-sm text-muted">{content.profile.title}</p>
        <SocialLinks className="justify-center" />
        <div className="flex w-full items-center justify-between pt-2">
          <p className="text-xs text-muted">
            © {new Date().getFullYear()} {content.profile.name}. Built with React + Tailwind.
          </p>
          <a href="#hero" className="flex items-center gap-1 text-xs text-muted hover:text-accent">
            Back to top <FiArrowUp />
          </a>
        </div>
      </Container>
    </footer>
  );
}
