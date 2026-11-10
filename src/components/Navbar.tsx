import { useEffect, useState } from 'react';
import type { CSSProperties } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { Menu, X, ArrowUpRight } from 'lucide-react';
import Logo from './Logo';

const navLinks = [
  { name: 'WORK', href: '/work', note: 'Selected projects and case studies' },
  { name: 'SERVICES', href: '/services', note: 'Six domains, one studio' },
  { name: 'ABOUT', href: '/about', note: 'The directors, the team, the thinking' },
  { name: 'CONTACT', href: '/inquiry', note: 'Tell us what you are building' },
];

const socialLinks = [
  {
    name: 'INSTAGRAM',
    href: 'https://www.instagram.com/tarka_studio?cplk=MXRnajR4aDYyZGR3YQ==',
  },
  {
    name: 'LINKEDIN',
    href: 'https://www.linkedin.com/in/tarka-design-studio-8ab8a23b7?utm_source=share_via&utm_content=profile&utm_medium=member_android',
  },
];

const marqueeText =
  'TARKA DESIGN STUDIO — PRODUCT · IDENTITY · DIGITAL · REACH · MOTION · VISUALS — ';

export default function Navbar() {
  const [isOpen, setIsOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const [active, setActive] = useState<number | null>(null);
  const { pathname } = useLocation();
  const [prevPathname, setPrevPathname] = useState(pathname);

  if (prevPathname !== pathname) {
    setPrevPathname(pathname);
    setIsOpen(false);
    setActive(null);
  }

  const toggleMenu = () => {
    setActive(null);
    setIsOpen((open) => !open);
  };

  useEffect(() => {
    const updateScrollState = () => setScrolled(window.scrollY > 24);
    updateScrollState();
    window.addEventListener('scroll', updateScrollState, { passive: true });
    return () => window.removeEventListener('scroll', updateScrollState);
  }, []);

  useEffect(() => {
    if (!isOpen) return;
    const previousOverflow = document.body.style.overflow;
    document.body.style.overflow = 'hidden';
    const closeOnEscape = (event: KeyboardEvent) => {
      if (event.key === 'Escape') setIsOpen(false);
    };
    window.addEventListener('keydown', closeOnEscape);
    return () => {
      document.body.style.overflow = previousOverflow;
      window.removeEventListener('keydown', closeOnEscape);
    };
  }, [isOpen]);

  return (
    <>
      <nav
        aria-label="Main navigation"
        className={`fixed inset-x-0 top-0 z-[500] flex items-center justify-between px-[var(--gutter)] text-[#101515] transition-all duration-500 ${
          scrolled
            ? 'border-b border-black/10 bg-[#f7f9f8]/90 py-3 backdrop-blur-xl'
            : 'border-b border-transparent bg-[#f7f9f8]/65 py-5 backdrop-blur-sm'
        }`}
      >
        <div className="flex items-center gap-7">
          <Logo className="w-11 md:w-12" priority />
          <button
            type="button"
            onClick={toggleMenu}
            aria-expanded={isOpen}
            aria-controls="tarka-navigation-overlay"
            className="hidden items-center gap-3 text-xs font-semibold tracking-[0.16em] text-black/65 transition-colors hover:text-[var(--duck)] md:flex cursor-pointer"
          >
            <span className="h-px w-7 bg-current transition-all duration-300 group-hover:w-9" />
            {isOpen ? 'CLOSE' : 'MENU'}
          </button>
        </div>

        <div className="hidden items-center gap-7 lg:flex">
          <Link
            to="/services"
            className="relative text-xs font-semibold tracking-[0.13em] text-black/65 transition-colors hover:text-[var(--duck)]"
          >
            PRODUCT
          </Link>
          <Link
            to="/quote"
            className="inline-flex items-center gap-2 rounded-full bg-[var(--duck)] px-6 py-3.5 text-xs font-semibold tracking-[0.12em] text-white transition-all duration-300 hover:-translate-y-0.5 hover:bg-[var(--duck-dark)]"
          >
            GET A QUOTE <ArrowUpRight size={13} aria-hidden="true" />
          </Link>
        </div>

        <button
          type="button"
          onClick={toggleMenu}
          aria-label={isOpen ? 'Close navigation menu' : 'Open navigation menu'}
          aria-expanded={isOpen}
          aria-controls="tarka-navigation-overlay"
          className="relative z-[502] p-2 text-[#101515] transition-colors hover:text-[var(--duck)] md:hidden cursor-pointer"
        >
          {isOpen ? <X size={23} strokeWidth={1.7} /> : <Menu size={23} strokeWidth={1.7} />}
        </button>
      </nav>

      {/* Teal shutter that sweeps just ahead of the paper panel */}
      <div className="tarka-menu-shutter" data-open={isOpen} aria-hidden="true" />

      <div
        id="tarka-navigation-overlay"
        aria-hidden={!isOpen}
        className="tarka-menu-overlay fixed inset-0 z-[490] flex flex-col justify-center px-[var(--gutter)] pt-20 pb-10"
      >
        {/* Outlined marquee running along the bottom */}
        <div className="tarka-menu-marquee" aria-hidden="true">
          <div className="tarka-menu-marquee__track">
            <span>{marqueeText}</span>
            <span>{marqueeText}</span>
          </div>
        </div>

        {/* Dial: rotating rings; shows the hovered link's number and note */}
        <div className="tarka-menu-orb" data-active={active !== null} aria-hidden="true">
          <span />
          <span />
          <span />
          <i />
          {active !== null && (
            <div className="tarka-menu-dial" key={active}>
              <b>{String(active + 1).padStart(2, '0')}</b>
              <small>{navLinks[active].note}</small>
            </div>
          )}
        </div>

        <div className="relative z-10 mx-auto flex w-full max-w-[1100px] flex-col">
          <p className="tarka-menu-eyebrow mb-6 text-xs font-semibold uppercase tracking-[0.22em] text-[var(--duck)] md:mb-8">
            Tarka Design Studio <span className="mx-2 text-black/25">/</span> Navigation
          </p>

          <div
            className="tarka-menu-list flex flex-col items-start"
            onMouseLeave={() => setActive(null)}
          >
            {navLinks.map((link, index) => (
              <Link
                key={link.name}
                to={link.href}
                tabIndex={isOpen ? 0 : -1}
                aria-label={link.name}
                onClick={() => setIsOpen(false)}
                onMouseEnter={() => setActive(index)}
                onFocus={() => setActive(index)}
                className="tarka-menu-link"
                style={{ '--i': index } as CSSProperties}
              >
                <span className="mn" aria-hidden="true">
                  0{index + 1}
                </span>
                <span className="mw" aria-hidden="true">
                  {link.name.split('').map((char, c) => (
                    <span
                      key={c}
                      className="mc"
                      data-ch={char}
                      style={{ '--c': c } as CSSProperties}
                    >
                      <span>{char}</span>
                    </span>
                  ))}
                </span>
                <ArrowUpRight className="ma" strokeWidth={1.5} aria-hidden="true" />
              </Link>
            ))}
          </div>

          <div className="tarka-menu-foot mt-8 flex flex-col gap-6 border-t border-black/10 pt-6 sm:flex-row sm:items-center sm:justify-between md:mt-10">
            <Link
              to="/quote"
              tabIndex={isOpen ? 0 : -1}
              onClick={() => setIsOpen(false)}
              className="tarka-menu-cta"
            >
              <span className="tarka-menu-cta__fill" aria-hidden="true" />
              <span className="tarka-menu-cta__label">START A PROJECT</span>
              <span className="tarka-menu-cta__icon" aria-hidden="true">
                <ArrowUpRight size={14} strokeWidth={1.8} />
              </span>
            </Link>

            <div className="flex items-center gap-7">
              <span className="text-xs font-semibold uppercase tracking-[0.18em] text-black/45">
                FOLLOW
              </span>
              {socialLinks.map((social) => (
                <a
                  key={social.name}
                  href={social.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label={`Tarka Design Studio on ${social.name.toLowerCase()}`}
                  tabIndex={isOpen ? 0 : -1}
                  className="tarka-social-link"
                >
                  {social.name}
                </a>
              ))}
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
