import content from '../../data/content.js';
import Section from '../layout/Section.jsx';
import SectionHeading from '../ui/SectionHeading.jsx';
import Badge from '../ui/Badge.jsx';

function DeviceMock({ project }) {
  return (
    <div className="rounded-xl border border-border bg-surface overflow-hidden shadow-2xl">
      {/* window chrome */}
      <div className="flex items-center gap-1.5 border-b border-border bg-bg px-4 py-3">
        <span className="h-3 w-3 rounded-full bg-red-500" />
        <span className="h-3 w-3 rounded-full bg-yellow-400" />
        <span className="h-3 w-3 rounded-full bg-green-500" />
      </div>
      {/* content body */}
      <div className="bg-bg p-6">
        <p className="font-display text-2xl font-bold text-body">{project.name}</p>
        {project.impact[0] && (
          <p className="mt-2 font-display text-3xl font-extrabold text-accent">{project.impact[0]}</p>
        )}
        <div className="mt-4 space-y-1.5 opacity-40">
          <div className="h-2 w-3/4 rounded bg-muted/50" />
          <div className="h-2 w-1/2 rounded bg-muted/50" />
          <div className="h-2 w-5/6 rounded bg-muted/50" />
        </div>
        <p className="mt-4 font-mono text-xs text-muted opacity-60">
          {project.tech.slice(0, 3).join(' · ')}
        </p>
      </div>
    </div>
  );
}

export default function Projects() {
  return (
    <Section id="projects">
      <SectionHeading
        index="04 · Projects"
        title="Selected work"
        subtitle="Real systems I've helped build. Several are proprietary, so code isn't public — here's the context and impact."
      />
      <div className="space-y-16">
        {content.projects.map((p, idx) => {
          const isEven = idx % 2 === 0;
          return (
            <div
              key={p.name}
              className={`grid items-center gap-8 lg:grid-cols-2 ${!isEven ? 'lg:[&>*:first-child]:order-2' : ''}`}
            >
              {/* TEXT side */}
              <div className="flex flex-col gap-4">
                <div>
                  <h3 className="font-display text-2xl font-bold">{p.name}</h3>
                  <p className="mt-0.5 text-xs text-muted">{p.org}</p>
                </div>
                <p className="text-muted">{p.blurb}</p>
                <div className="flex flex-wrap gap-2">
                  {p.impact.map((m) => (
                    <span
                      key={m}
                      className="rounded-md bg-accent/10 px-2 py-1 text-xs font-medium text-accent"
                    >
                      {m}
                    </span>
                  ))}
                </div>
                <div className="flex flex-wrap gap-2">
                  {p.tech.map((t) => (
                    <Badge key={t}>{t}</Badge>
                  ))}
                  {p.proprietary && <Badge>Proprietary</Badge>}
                </div>
              </div>

              {/* VISUAL side */}
              <DeviceMock project={p} />
            </div>
          );
        })}
      </div>
    </Section>
  );
}
