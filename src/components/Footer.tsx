import { Link } from 'react-router-dom';
import { ArrowUp } from 'lucide-react';
import Logo from './Logo';
import { tarkaContact } from '@/data/services';

const STUDIO_LINKS = [
  { label: 'About', to: '/about' },
  { label: 'Founder', to: '/founder' },
  { label: 'Team', to: '/team' },
  { label: 'Work', to: '/work' },
  { label: 'Clients', to: '/clients' },
  { label: 'The World Board', to: '/blog' },
];

const DOMAIN_LINKS = [
  { label: 'Product design', to: '/product' },
  { label: 'Graphic design', to: '/identity' },
  { label: 'UI/UX and web', to: '/digital' },
  { label: 'Marketing', to: '/reach' },
  { label: 'Video generation', to: '/video' },
  { label: 'Photography', to: '/photography' },
];

const linkClass =
  'footer-link text-[14px] text-black/65 hover:text-[var(--duck)] transition-colors';

const headingClass = 'mb-5 text-[11px] font-semibold uppercase tracking-[0.16em] text-black/45';

export default function Footer() {
  const scrollToTop = () => {
    const reduce = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    window.scrollTo({ top: 0, behavior: reduce ? 'auto' : 'smooth' });
  };

  return (
    <footer className="relative z-10 mt-auto border-t border-black/[0.08] bg-[#f5f7f6] text-[#101515]">
      <div className="wrap grid gap-12 py-16 md:py-20 md:grid-cols-2 lg:grid-cols-12">
        <div className="lg:col-span-4">
          <Logo className="w-14" />
          <p className="mt-6 max-w-[30ch] text-[15px] leading-[1.6] text-black/60">
            Design that thinks before it looks.
          </p>
          <a
            href={`mailto:${tarkaContact.email}`}
            className="footer-link mt-6 inline-block text-[14px] font-medium hover:text-[var(--duck)] transition-colors"
          >
            {tarkaContact.email}
          </a>
          <p className="mt-2 text-[14px] text-black/55">{tarkaContact.address}</p>
        </div>

        <nav aria-label="Studio" className="lg:col-span-2 lg:col-start-6">
          <h3 className={headingClass}>Studio</h3>
          <ul className="flex flex-col gap-3">
            {STUDIO_LINKS.map((item) => (
              <li key={item.to}>
                <Link to={item.to} className={linkClass}>
                  {item.label}
                </Link>
              </li>
            ))}
          </ul>
        </nav>

        <nav aria-label="Domains" className="lg:col-span-3">
          <h3 className={headingClass}>Domains</h3>
          <ul className="flex flex-col gap-3">
            {DOMAIN_LINKS.map((item) => (
              <li key={item.to}>
                <Link to={item.to} className={linkClass}>
                  {item.label}
                </Link>
              </li>
            ))}
          </ul>
        </nav>

        <nav aria-label="Start a project" className="lg:col-span-2">
          <h3 className={headingClass}>Start a project</h3>
          <ul className="flex flex-col gap-3">
            <li>
              <Link to="/quote" className={linkClass}>
                Get a quote
              </Link>
            </li>
            <li>
              <Link to="/inquiry" className={linkClass}>
                Send an inquiry
              </Link>
            </li>
            <li>
              <Link to="/services" className={linkClass}>
                Our services
              </Link>
            </li>
          </ul>
        </nav>
      </div>

      <div className="border-t border-black/[0.08]">
        <div className="wrap flex flex-col gap-4 py-6 text-[12.5px] text-black/50 sm:flex-row sm:items-center sm:justify-between">
          <span>© {new Date().getFullYear()} Tarka Design Studio. All rights reserved.</span>
          <button
            type="button"
            onClick={scrollToTop}
            className="inline-flex cursor-pointer items-center gap-2 self-start font-medium text-black/60 transition-colors hover:text-[var(--duck)] sm:self-auto"
          >
            Back to top
            <ArrowUp size={14} aria-hidden="true" />
          </button>
        </div>
      </div>
    </footer>
  );
}
