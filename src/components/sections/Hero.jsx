import { FiArrowDown, FiMail } from 'react-icons/fi';
import content from '../../data/content.js';
import Container from '../layout/Container.jsx';
import Button from '../ui/Button.jsx';
import SocialLinks from '../ui/SocialLinks.jsx';

export default function Hero() {
  const { profile, stats } = content;
  return (
    <section id="hero" className="relative flex min-h-screen items-center overflow-hidden">
      {/* animated grid + glow background */}
      <div
        aria-hidden
        className="pointer-events-none absolute inset-0 opacity-[0.35]"
        style={{
          backgroundImage:
            'linear-gradient(rgb(var(--border)/0.4) 1px, transparent 1px), linear-gradient(90deg, rgb(var(--border)/0.4) 1px, transparent 1px)',
          backgroundSize: '48px 48px',
          maskImage: 'radial-gradient(ellipse at 50% 0%, black, transparent 75%)',
        }}
      />
      <div
        aria-hidden
        className="pointer-events-none absolute -top-32 left-1/2 h-72 w-72 -translate-x-1/2 rounded-full bg-accent/20 blur-3xl"
      />

      <Container className="relative grid items-center gap-12 pt-24 md:grid-cols-[1.4fr_1fr]">
        <div>
          <p className="font-mono text-sm text-accent">Hi, my name is</p>
          <h1 className="mt-3 text-4xl font-bold tracking-tight sm:text-6xl">{profile.name}</h1>
          <h2 className="mt-2 text-2xl font-semibold text-muted sm:text-3xl">{profile.title}</h2>
          <p className="mt-6 max-w-xl text-lg text-muted">{profile.intro}</p>

          <div className="mt-8 flex flex-wrap gap-3">
            <Button href={profile.resumeUrl} target="_blank" rel="noreferrer">
              <FiArrowDown /> Download Resume
            </Button>
            <Button href="#contact" variant="ghost">
              <FiMail /> Contact me
            </Button>
          </div>

          <SocialLinks className="mt-8" />

          <dl className="mt-12 grid max-w-lg grid-cols-3 gap-4">
            {stats.map((s) => (
              <div key={s.label} className="rounded-lg border border-border bg-surface/50 p-4">
                <dt className="text-2xl font-bold text-accent">{s.value}</dt>
                <dd className="mt-1 text-xs text-muted">{s.label}</dd>
              </div>
            ))}
          </dl>
        </div>

        <div className="mx-auto">
          <div className="relative h-56 w-56 sm:h-72 sm:w-72">
            <div className="absolute inset-0 rounded-2xl border border-accent/40" />
            <img
              src={profile.photoUrl}
              alt={profile.name}
              width={288}
              height={288}
              className="h-full w-full translate-x-3 translate-y-3 rounded-2xl object-cover"
              onError={(e) => { e.currentTarget.style.visibility = 'hidden'; }}
            />
          </div>
        </div>
      </Container>
    </section>
  );
}
