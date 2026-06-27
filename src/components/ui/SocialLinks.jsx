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
