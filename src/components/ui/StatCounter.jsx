import { useInView } from '../hooks/useInView.js';
import { useCountUp } from '../hooks/useCountUp.js';

export default function StatCounter({ to, suffix, label }) {
  const [ref, inView] = useInView({ once: true });
  const value = useCountUp(to, inView);
  return (
    <div ref={ref}>
      <div className="font-display text-4xl font-extrabold text-accent sm:text-5xl">
        {value}{suffix}
      </div>
      <div className="mt-1 text-sm text-muted">{label}</div>
    </div>
  );
}
