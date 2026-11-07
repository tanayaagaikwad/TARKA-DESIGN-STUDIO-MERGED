import { useEffect, useState } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { Menu, X, ArrowUpRight } from 'lucide-react';
import Logo from './Logo';

const navLinks = [
  { name: 'WORK', href: '/work' },
  { name: 'SERVICES', href: '/services' },
  { name: 'ABOUT', href: '/about' },
  { name: 'CONTACT', href: '/inquiry' },
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

export default function Navbar() {
  const [isOpen, setIsOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const { pathname } = useLocation();
  const [prevPathname, setPrevPathname] = useState(pathname);

  if (prevPathname !== pathname) {
    setPrevPathname(pathname);
    setIsOpen(false);
  }

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
            onClick={() => setIsOpen((open) => !open)}
            aria-expanded={isOpen}
            aria-controls="tarka-navigation-overlay"
            className="hidden items-center gap-3 text-[11px] font-semibold tracking-[0.16em] text-black/65 transition-colors hover:text-[var(--duck)] md:flex cursor-pointer"
          >
            <span className="h-px w-7 bg-current transition-all duration-300 group-hover:w-9" />
            {isOpen ? 'CLOSE' : 'MENU'}
          </button>
        </div>

        <div className="hidden items-center gap-7 lg:flex">
          <Link
            to="/services"
            className="relative text-[11px] font-semibold tracking-[0.13em] text-black/65 transition-colors hover:text-[var(--duck)]"
          >
            PRODUCT
          </Link>
          <Link
            to="/quote"
            className="inline-flex items-center gap-2 rounded-full bg-[var(--duck)] px-5 py-3 text-[10px] font-semibold tracking-[0.12em] text-white transition-all duration-300 hover:-translate-y-0.5 hover:bg-[var(--duck-dark)]"
          >
            GET A QUOTE <ArrowUpRight size={13} aria-hidden="true" />
          </Link>
        </div>

        <button
          type="button"
          onClick={() => setIsOpen((open) => !open)}
          aria-label={isOpen ? 'Close navigation menu' : 'Open navigation menu'}
          aria-expanded={isOpen}
          aria-controls="tarka-navigation-overlay"
          className="relative z-[502] p-2 text-[#101515] transition-colors hover:text-[var(--duck)] md:hidden cursor-pointer"
        >
          {isOpen ? <X size={23} strokeWidth={1.7} /> : <Menu size={23} strokeWidth={1.7} />}
        </button>
      </nav>

      <div
        id="tarka-navigation-overlay"
        aria-hidden={!isOpen}
        className={`tarka-menu-overlay fixed inset-0 z-[490] flex flex-col justify-center px-[var(--gutter)] pt-20 transition-[opacity,visibility] duration-500 ${
          isOpen ? 'visible opacity-100' : 'invisible pointer-events-none opacity-0'
        }`}
      >
        <div className="mx-auto flex w-full max-w-[1180px] flex-col">
          <p className="mb-8 text-[10px] font-semibold uppercase tracking-[0.2em] text-[var(--duck)]">
            Tarka Design Studio <span className="mx-2 text-black/25">/</span> Navigation
          </p>

          <div className="flex flex-col items-start gap-3 md:gap-4">
            {navLinks.map((link, index) => (
              <Link
                key={link.name}
                to={link.href}
                tabIndex={isOpen ? 0 : -1}
                onClick={() => setIsOpen(false)}
                className="tarka-menu-link text-[clamp(2.15rem,5.2vw,4.7rem)]"
                style={{
                  transitionDelay: isOpen ? `${index * 75}ms` : '0ms',
                  transform: isOpen ? 'translateY(0)' : 'translateY(14px)',
                  opacity: isOpen ? 1 : 0,
                }}
              >
                <span className="mr-4 inline-block translate-y-[-0.1em] text-[0.28em] font-medium tracking-normal text-[var(--duck)] opacity-65">
                  0{index + 1}
                </span>
                {link.name}
              </Link>
            ))}
          </div>

          <div className="mt-10 flex flex-col gap-7 border-t border-black/10 pt-6 sm:flex-row sm:items-center sm:justify-between">
            <Link
              to="/quote"
              tabIndex={isOpen ? 0 : -1}
              onClick={() => setIsOpen(false)}
              className="inline-flex w-fit items-center gap-3 rounded-full border border-[var(--duck)] px-5 py-3 text-[10px] font-semibold tracking-[0.13em] text-[var(--duck)] transition-all duration-300 hover:bg-[var(--duck)] hover:text-white"
            >
              START A PROJECT <ArrowUpRight size={14} aria-hidden="true" />
            </Link>

            <div className="flex items-center gap-6">
              <span className="text-[9px] font-semibold uppercase tracking-[0.16em] text-black/35">FOLLOW</span>
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
