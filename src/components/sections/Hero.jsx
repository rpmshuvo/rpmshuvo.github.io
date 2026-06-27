import content from '../../data/content.js';
import Container from '../layout/Container.jsx';
import Button from '../ui/Button.jsx';
import SocialLinks from '../ui/SocialLinks.jsx';

export default function Hero() {
  const { profile, stats, heroGreeting } = content;

  // Split title: last word in accent
  const titleWords = profile.title.split(' ');
  const titleStart = titleWords.slice(0, -1).join(' ');
  const titleEnd = titleWords[titleWords.length - 1];

  return (
    <section id="hero" className="relative flex min-h-screen items-center overflow-hidden pt-24">
      {/* faint grid background */}
      <div
        aria-hidden
        className="pointer-events-none absolute inset-0 opacity-20"
        style={{
          backgroundImage:
            'linear-gradient(rgb(var(--border)/0.5) 1px, transparent 1px), linear-gradient(90deg, rgb(var(--border)/0.5) 1px, transparent 1px)',
          backgroundSize: '48px 48px',
          maskImage: 'radial-gradient(ellipse at 50% 0%, black, transparent 75%)',
        }}
      />

      <Container className="relative grid items-center gap-12 md:grid-cols-[1.4fr_1fr]">
        {/* LEFT — text */}
        <div>
          <p className="font-mono text-sm text-accent">
            {heroGreeting}
          </p>
          {/* h1 contains the name so the smoke test heading assertion stays green */}
          <h1 className="mt-1 font-display text-lg font-semibold text-muted">{profile.name}</h1>
          {/* Visually-prominent title (styled large, not semantic h1) */}
          <p className="mt-3 font-display text-5xl font-extrabold tracking-tight sm:text-6xl">
            {titleStart} <span className="text-accent">{titleEnd}</span>
          </p>
          <p className="mt-6 max-w-xl text-lg text-muted">{profile.intro}</p>

          <div className="mt-8 flex flex-wrap gap-3">
            <Button href="#contact">Got a project?</Button>
            <Button href={profile.resumeUrl} target="_blank" rel="noreferrer" variant="ghost">
              My Resume
            </Button>
          </div>

          <SocialLinks className="mt-8" />

          <dl className="mt-10 grid max-w-lg grid-cols-3 gap-4">
            {stats.map((s) => (
              <div key={s.label} className="rounded-lg border border-border bg-surface/50 p-4">
                <dt className="font-display text-2xl font-bold text-accent">{s.value}</dt>
                <dd className="mt-1 text-xs text-muted">{s.label}</dd>
              </div>
            ))}
          </dl>
        </div>

        {/* RIGHT — orbit graphic */}
        <div className="mx-auto flex items-center justify-center">
          <div className="relative h-[20rem] w-[20rem] sm:h-[24rem] sm:w-[24rem]">
            {/* radial coral glow */}
            <div
              aria-hidden
              className="absolute inset-0 rounded-full bg-accent/25 blur-3xl"
            />

            {/* outer ring */}
            <div
              aria-hidden
              className="absolute inset-0 m-auto rounded-full border border-accent/25"
              style={{ width: '100%', height: '100%' }}
            />

            {/* mid dashed ring */}
            <div
              aria-hidden
              className="absolute inset-0 m-auto rounded-full border border-dashed border-accent/30"
              style={{ width: '86%', height: '86%' }}
            />

            {/* glowing arc ring (fallback: glowing-ring style) */}
            <div
              aria-hidden
              className="absolute inset-0 m-auto rounded-full border border-accent/50 shadow-[0_0_40px_-6px_rgba(240,83,61,0.6)]"
              style={{ width: '93%', height: '93%' }}
            />

            {/* orbiting dot wrapper */}
            <div
              aria-hidden
              className="absolute inset-0 m-auto animate-spin-slow motion-reduce:animate-none rounded-full"
              style={{ width: '100%', height: '100%' }}
            >
              <span
                className="absolute left-1/2 top-0 h-3 w-3 -translate-x-1/2 rounded-full bg-accent shadow-[0_0_12px_rgba(240,83,61,0.8)]"
              />
            </div>

            {/* circular photo */}
            <img
              src={profile.photoUrl}
              alt={profile.name}
              width={256}
              height={256}
              loading="eager"
              className="absolute inset-0 m-auto h-56 w-56 rounded-full object-cover ring-1 ring-border shadow-2xl sm:h-64 sm:w-64"
              onError={(e) => { e.currentTarget.style.visibility = 'hidden'; }}
            />
          </div>
        </div>
      </Container>
    </section>
  );
}
