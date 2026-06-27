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
          <h3 className="font-display text-lg font-semibold">{e.degree}</h3>
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
