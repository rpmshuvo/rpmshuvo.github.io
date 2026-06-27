export default function Button({ href, variant = 'primary', children, className = '', ...props }) {
  const base =
    'inline-flex items-center justify-center gap-2 rounded-lg px-5 py-2.5 text-sm font-semibold transition focus:outline-none focus-visible:ring-2 focus-visible:ring-accent';
  const styles = {
    primary: 'bg-accent text-bg hover:opacity-90',
    ghost: 'border border-border text-body hover:border-accent hover:text-accent',
  };
  const cls = `${base} ${styles[variant]} ${className}`;
  if (href) {
    return (
      <a href={href} className={cls} {...props}>
        {children}
      </a>
    );
  }
  return (
    <button className={cls} {...props}>
      {children}
    </button>
  );
}
