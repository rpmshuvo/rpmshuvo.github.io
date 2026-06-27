export default function Badge({ children, className = '' }) {
  return (
    <span
      className={`inline-flex items-center rounded-md border border-border bg-bg px-2.5 py-1 font-mono text-xs text-muted ${className}`}
    >
      {children}
    </span>
  );
}
