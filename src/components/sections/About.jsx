import { FiServer, FiDatabase, FiCloud } from 'react-icons/fi';
import content from '../../data/content.js';
import Section from '../layout/Section.jsx';
import SectionHeading from '../ui/SectionHeading.jsx';
import StatCounter from '../ui/StatCounter.jsx';

const SERVICE_ICONS = { server: FiServer, database: FiDatabase, cloud: FiCloud };

export default function About() {
  const { about, services, counters } = content;
  return (
    <Section id="about">
      <div className="grid gap-12 md:grid-cols-2">
        {/* LEFT — services */}
        <div className="space-y-6">
          {services.map((svc) => {
            const Icon = SERVICE_ICONS[svc.icon];
            return (
              <div key={svc.title} className="flex gap-4">
                <div className="flex-shrink-0 rounded-xl border border-border bg-surface p-3 text-accent">
                  {Icon && <Icon size={20} />}
                </div>
                <div>
                  <h3 className="font-display font-semibold">{svc.title}</h3>
                  <p className="mt-0.5 text-sm text-muted">{svc.desc}</p>
                </div>
              </div>
            );
          })}
        </div>

        {/* RIGHT — about text + counters */}
        <div>
          <SectionHeading index="01 · About" title="About me" />
          <div className="space-y-4 text-muted">
            {about.paragraphs.map((p, i) => (
              <p key={i} className="leading-relaxed">{p}</p>
            ))}
          </div>
          <div className="mt-10 grid grid-cols-3 gap-6">
            {counters.map((c) => (
              <StatCounter key={c.label} to={c.to} suffix={c.suffix} label={c.label} />
            ))}
          </div>
        </div>
      </div>
    </Section>
  );
}
