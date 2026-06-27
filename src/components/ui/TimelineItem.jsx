export default function TimelineItem({ item }) {
  const grouped = Array.isArray(item.roles);
  return (
    <li className="relative pl-8">
      <span className="absolute left-0 top-1.5 h-3 w-3 -translate-x-1/2 rounded-full border-2 border-accent bg-bg" />

      {grouped ? (
        <>
          <div className="flex flex-wrap items-baseline justify-between gap-x-3">
            <h3 className="font-display text-lg font-semibold">{item.company}</h3>
            {item.totalPeriod && (
              <span className="font-mono text-xs text-muted">{item.totalPeriod}</span>
            )}
          </div>
          {item.employment && <p className="mt-0.5 text-xs text-muted">{item.employment}</p>}
          <ol className="mt-3 space-y-2">
            {item.roles.map((r) => (
              <li
                key={r.period}
                className="flex flex-wrap items-baseline justify-between gap-x-3 border-l-2 border-accent/40 pl-3"
              >
                <span className="font-medium text-body">{r.role}</span>
                <span className="font-mono text-xs text-muted">{r.period}</span>
              </li>
            ))}
          </ol>
        </>
      ) : (
        <div className="flex flex-wrap items-baseline justify-between gap-x-3">
          <h3 className="font-display text-lg font-semibold">
            {item.role} <span className="text-accent">· {item.company}</span>
          </h3>
          <span className="font-mono text-xs text-muted">{item.period}</span>
        </div>
      )}

      <p className="mt-3 text-sm text-muted">{item.summary}</p>
      <ul className="mt-3 space-y-1.5">
        {item.points.map((p, i) => (
          <li key={i} className="flex gap-2 text-sm text-muted">
            <span className="mt-1 text-accent">▹</span>
            <span>{p}</span>
          </li>
        ))}
      </ul>
    </li>
  );
}
