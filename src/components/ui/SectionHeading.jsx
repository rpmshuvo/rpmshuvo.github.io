export default function SectionHeading({ index, title, subtitle }) {
  return (
    <div className="mb-12">
      <p className="font-mono text-sm text-accent">{index}</p>
      <h2 className="mt-2 font-display text-3xl font-bold tracking-tight sm:text-4xl">{title}</h2>
      {subtitle && <p className="mt-3 max-w-2xl text-muted">{subtitle}</p>}
    </div>
  );
}
