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
        <h3 className="font-display text-lg font-semibold">{pub.title}</h3>
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
