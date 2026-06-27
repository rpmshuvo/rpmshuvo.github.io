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
            <h3 className="font-display text-sm font-semibold text-accent">{cat.group}</h3>
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
