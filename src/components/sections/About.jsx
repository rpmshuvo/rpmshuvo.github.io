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
