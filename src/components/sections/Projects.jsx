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
        subtitle="Real systems I've helped build. Several are proprietary, so code isn't public — here's the context and impact."
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
