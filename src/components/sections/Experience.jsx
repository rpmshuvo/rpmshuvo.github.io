import content from '../../data/content.js';
import Section from '../layout/Section.jsx';
import SectionHeading from '../ui/SectionHeading.jsx';
import TimelineItem from '../ui/TimelineItem.jsx';

export default function Experience() {
  return (
    <Section id="experience">
      <SectionHeading index="03 · Experience" title="Where I've worked" />
      <ol className="space-y-10 border-l border-border pl-2">
        {content.experience.map((item) => (
          <TimelineItem key={item.company} item={item} />
        ))}
      </ol>
    </Section>
  );
}
