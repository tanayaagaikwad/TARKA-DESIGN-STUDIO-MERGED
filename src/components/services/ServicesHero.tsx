import { useEffect, useRef, type CSSProperties } from 'react';
import { Link } from 'react-router-dom';
import { ArrowDown, ArrowUpRight } from 'lucide-react';
import gsap from 'gsap';
import { domains } from '@/data/domains';
import { useReducedMotion } from '@/hooks/useReducedMotion';
import { CARD_ROTATIONS, DOMAIN_ROUTES } from './servicesShared';

/** Decorative moving objects behind the cards. Depth = mouse-parallax strength (negative moves opposite). */
function MotionObjects() {
  return (
    <div className="pointer-events-none absolute inset-0" aria-hidden="true">
      {/* Large dashed ring */}
      <div data-depth="-0.5" className="absolute right-[-10%] top-[6%]">
        <svg className="svc-spin" width="560" height="560" viewBox="0 0 560 560" fill="none">
          <circle
            cx="280"
            cy="280"
            r="270"
            stroke="#0a5c6e"
            strokeOpacity="0.32"
            strokeWidth="2"
            strokeDasharray="2 12"
            strokeLinecap="round"
          />
        </svg>
      </div>

      {/* Orbit with travelling dots */}
      <div data-depth="-0.9" className="absolute right-[9%] top-[26%]">
        <div className="svc-spin-slow relative h-[320px] w-[320px] rounded-full border border-[#0a5c6e]/25">
          <span className="absolute -top-[7px] left-[calc(50%-7px)] h-[14px] w-[14px] rounded-full bg-[#0a5c6e]" />
          <span className="absolute -bottom-[4px] left-[calc(50%-4px)] h-2 w-2 rounded-full bg-[#48090e]" />
        </div>
      </div>

      {/* Wireframe cube */}
      <div data-depth="0.7" className="absolute left-[40%] top-[7%] hidden md:block">
        <svg className="svc-drift" width="110" height="110" viewBox="0 0 120 120" fill="none">
          <g stroke="#0a5c6e" strokeWidth="1.6" strokeLinejoin="round">
            <path d="M60 10 L105 35 L60 60 L15 35 Z" />
            <path d="M15 35 L60 60 L60 112 L15 87 Z" />
            <path d="M105 35 L60 60 L60 112 L105 87 Z" />
          </g>
        </svg>
      </div>

      {/* Plus marks */}
      <div data-depth="1.1" className="absolute left-[5%] top-[22%]">
        <svg className="svc-spin-rev" width="26" height="26" viewBox="0 0 26 26" stroke="#101515" strokeOpacity="0.4" strokeWidth="2">
          <path d="M13 2v22M2 13h22" />
        </svg>
      </div>
      <div data-depth="-1.2" className="absolute bottom-[14%] left-[46%]">
        <svg className="svc-spin" width="20" height="20" viewBox="0 0 26 26" stroke="#0a5c6e" strokeOpacity="0.7" strokeWidth="2.4">
          <path d="M13 2v22M2 13h22" />
        </svg>
      </div>

      {/* Bobbing dots, one with a ping ring */}
      <div data-depth="1.4" className="absolute bottom-[16%] left-[7%]">
        <div className="relative">
          <span className="svc-ping absolute inset-0 rounded-full border-2 border-[#0a5c6e]" />
          <div className="svc-bob h-5 w-5 rounded-full bg-[#0a5c6e]" />
        </div>
      </div>
      <div data-depth="-1.5" className="absolute right-[4%] bottom-[9%]">
        <div className="svc-bob h-3 w-3 rounded-full bg-[#48090e]" style={{ animationDelay: '-2.5s' }} />
      </div>
    </div>
  );
}

export default function ServicesHero() {
  const reduced = useReducedMotion();
  const sectionRef = useRef<HTMLElement>(null);

  useEffect(() => {
    const section = sectionRef.current;
    if (!section || reduced) return;

    // Entrance
    const ctx = gsap.context(() => {
      gsap.from('.svc-card-outer', {
        opacity: 0,
        yPercent: 18,
        scale: 0.82,
        duration: 1,
        ease: 'power4.out',
        stagger: 0.09,
        delay: 0.1,
      });
      gsap.from('.svc-hero-text > *', {
        opacity: 0,
        y: 28,
        duration: 0.9,
        ease: 'power3.out',
        stagger: 0.1,
      });
    }, section);

    // Mouse parallax (mouse devices only)
    let cleanup = () => {};
    if (window.matchMedia('(pointer: fine)').matches) {
      const els = Array.from(section.querySelectorAll<HTMLElement>('[data-depth]'));
      const movers = els.map((el) => ({
        depth: parseFloat(el.dataset.depth ?? '0'),
        x: gsap.quickTo(el, 'x', { duration: 0.9, ease: 'power3.out' }),
        y: gsap.quickTo(el, 'y', { duration: 0.9, ease: 'power3.out' }),
      }));

      const onMove = (e: MouseEvent) => {
        const r = section.getBoundingClientRect();
        const nx = (e.clientX - r.left) / r.width - 0.5;
        const ny = (e.clientY - r.top) / r.height - 0.5;
        movers.forEach((m) => {
          m.x(nx * m.depth * 70);
          m.y(ny * m.depth * 70);
        });
      };
      const onLeave = () =>
        movers.forEach((m) => {
          m.x(0);
          m.y(0);
        });

      section.addEventListener('mousemove', onMove);
      section.addEventListener('mouseleave', onLeave);
      cleanup = () => {
        section.removeEventListener('mousemove', onMove);
        section.removeEventListener('mouseleave', onLeave);
        gsap.set(els, { clearProps: 'x,y' });
      };
    }

    return () => {
      ctx.revert();
      cleanup();
    };
  }, [reduced]);

  const scrollToDisciplines = () => {
    const target = document.getElementById('disciplines');
    if (!target) return;
    target.scrollIntoView({ behavior: reduced ? 'auto' : 'smooth', block: 'start' });
  };

  return (
    <section
      ref={sectionRef}
      className="relative overflow-hidden bg-[#f5f7f6] pb-20 pt-32 text-[#101515] md:pb-28 md:pt-40"
    >
      <div className="svc-grid-bg pointer-events-none absolute inset-0" aria-hidden="true" />
      <MotionObjects />

      <div className="wrap relative z-10 grid gap-16 lg:grid-cols-12 lg:items-center">
        <div className="svc-hero-text lg:col-span-5">
          <span className="eyebrow block tracking-[0.16em]">What we build</span>

          <h1 className="mt-6 font-sans text-[clamp(40px,5.6vw,84px)] font-medium leading-[1.02] tracking-[-0.06em]">
            Six disciplines. One way of thinking.
          </h1>

          <p className="mt-7 max-w-[44ch] text-[16px] leading-[1.65] text-black/60 md:text-[17px]">
            Product, identity, digital, marketing, motion and photography. Six disciplines that
            share one way of working: think first, then build.
          </p>

          <div className="mt-9 flex flex-wrap items-center gap-4">
            <Link
              to="/quote"
              className="inline-flex items-center gap-2 rounded-full bg-[var(--duck)] px-6 py-4 text-[11px] font-semibold tracking-[0.12em] text-white transition-all duration-300 hover:-translate-y-0.5 hover:bg-[var(--duck-dark)]"
            >
              GET A QUOTE <ArrowUpRight size={14} aria-hidden="true" />
            </Link>
            <button
              type="button"
              onClick={scrollToDisciplines}
              className="inline-flex cursor-pointer items-center gap-2 px-2 py-4 text-[13px] font-medium text-black/65 transition-colors hover:text-[var(--duck)]"
            >
              Explore the disciplines <ArrowDown size={15} aria-hidden="true" />
            </button>
          </div>
        </div>

        <div className="lg:col-span-7">
          <ul className="grid grid-cols-2 gap-5 sm:grid-cols-3 md:gap-7">
            {domains.map((domain, index) => {
              const route = DOMAIN_ROUTES[domain.id] ?? '/';
              const offset =
                index % 3 === 1 ? 'sm:-mt-9' : index % 3 === 2 ? 'sm:mt-7' : '';
              const floatStyle = {
                '--dur': `${5.2 + (index % 3) * 0.9}s`,
                '--delay': `${-index * 0.8}s`,
              } as CSSProperties;
              const tiltStyle = { '--rot': `${CARD_ROTATIONS[index] ?? 0}deg` } as CSSProperties;

              return (
                <li
                  key={domain.id}
                  data-depth={(0.6 + (index % 3) * 0.35).toFixed(2)}
                  className={`svc-card-outer ${index % 2 === 1 ? 'mt-6 sm:mt-0' : ''} ${offset}`}
                >
                  <div className="svc-float" style={floatStyle}>
                    <Link
                      to={route}
                      aria-label={`${domain.title}: view the discipline`}
                      className="svc-card group block"
                    >
                      <div
                        className="svc-card-inner relative rounded-[1.4rem] bg-white p-2"
                        style={tiltStyle}
                      >
                        <div className="relative aspect-[3/4] overflow-hidden rounded-[1.05rem] bg-[#dfe6e6]">
                          <img
                            src={domain.imageTeaser}
                            alt={domain.alt}
                            loading={index < 3 ? 'eager' : 'lazy'}
                            draggable={false}
                            className="h-full w-full object-cover"
                          />
                          <div className="absolute inset-x-0 bottom-0 h-1/2 bg-gradient-to-t from-black/70 to-transparent" />
                          <span className="absolute left-3 top-3 rounded-full bg-white/90 px-2.5 py-1 text-[10px] font-semibold tracking-[0.1em] text-[#101515]">
                            {domain.number} / {domain.category}
                          </span>
                          <div className="absolute inset-x-3 bottom-3 flex items-end justify-between gap-2 text-white">
                            <span className="font-sans text-[15px] font-semibold leading-tight tracking-[-0.02em] md:text-[17px]">
                              {domain.title}
                            </span>
                            <span className="flex h-8 w-8 shrink-0 items-center justify-center rounded-full bg-white/20 backdrop-blur transition-colors group-hover:bg-white group-hover:text-[var(--duck)]">
                              <ArrowUpRight size={15} aria-hidden="true" />
                            </span>
                          </div>
                        </div>
                      </div>
                    </Link>
                  </div>
                </li>
              );
            })}
          </ul>
        </div>
      </div>
    </section>
  );
}
