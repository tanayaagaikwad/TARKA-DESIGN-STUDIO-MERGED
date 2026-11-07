import { Link } from 'react-router-dom';

export default function Logo({
  className = '',
}: {
  className?: string;
  priority?: boolean;
}) {
  return (
    <Link
      to="/"
      className={`brand-logo inline-flex items-center ${className}`}
      aria-label="Tarka Design Studio home"
    >
      <img
        src="/tarka-logo.png"
        alt="Tarka Design Studio"
        width={591}
        height={591}
        className="h-auto w-full brightness-0"
      />
    </Link>
  );
}
