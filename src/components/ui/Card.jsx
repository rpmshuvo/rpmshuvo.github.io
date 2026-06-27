export default function Card({ children, className = '' }) {
  return (
    <div
      className={`rounded-xl border border-border bg-surface p-6 transition duration-300 hover:-translate-y-1 hover:border-accent/60 ${className}`}
    >
      {children}
    </div>
  );
}
