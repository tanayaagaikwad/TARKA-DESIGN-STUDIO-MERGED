import { useEffect, useRef, useState, type CSSProperties } from 'react';
import { Link } from 'react-router-dom';
import { ArrowUpRight } from 'lucide-react';
import gsap from 'gsap';
import { domains } from '@/data/domains';
import { useReducedMotion } from '@/hooks/useReducedMotion';
import { DOMAIN_ROUTES, FRAME_PRESETS } from './servicesShared';

export default function ServicesExplorer() {
  const reduced = useReducedMotion();
  const [active, setActive] = useState(0);
  const stageRef = useRef<HTMLDivElement>(null);
  const frameRef = useRef<HTMLDivElement>(null);

  // Scene change: reveal the main image, pop in the accents, glide the frame
  useEffect(() => {
    const stage = stageRef.current;
    const frame = frameRef.current;
    if (!stage || !frame || reduced) return;

    const preset = FRAME_PRESETS[active] ?? FRAME_PRESETS[0];
    gsap.to(frame, {
      left: `${preset.l}%`,
      top: `${preset.t}%`,
      width: `${preset.w}%`,
      height: `${preset.h}%`,
      duration: 0.9,
      ease: 'power3.inOut',
      overwrite: true,
    });

    const scene = `[data-scene="${active}"]`;
    const ctx = gsap.context(() => {
      gsap.fromTo(
        `${scene} [data-main]`,
        { clipPath: 'inset(0% 100% 0% 0%)' },
        { clipPath: 'inset(0% 0% 0% 0%)', duration: 0.9, ease: 'power4.out', clearProps: 'clipPath' }
      );
      gsap.fromTo(
        `${scene} [data-main-img]`,
        { scale: 1.18 },
        { scale: 1, duration: 1.2, ease: 'power3.out', clearProps: 'transform' }
      );
      gsap.fromTo(
        `${scene} [data-accent]`,
        { opacity: 0, y: 44, rotation: (i: number) => (i % 2 === 0 ? -7 : 7) },
        { opacity: 1, y: 0, rotation: 0, duration: 0.85, ease: 'power3.out', stagger: 0.12, delay: 0.15 }
      );
      gsap.fromTo(
        `${scene} [data-info]`,
        { opacity: 0, y: 24 },
        { opacity: 1, y: 0, duration: 0.7, ease: 'power3.out', delay: 0.35 }
      );
    }, stage);

    return () => ctx.revert();
  }, [active, reduced]);

  const initialFrame = FRAME_PRESETS[0];

  return (
    <section
      id="disciplines"
      aria-label="Explore the disciplines"
      className="relative overflow-hidden bg-[var(--paper)] py-24 text-[#101515] md:py-32"
    >
      <div className="wrap grid gap-14 lg:grid-cols-12 lg:items-center">
        {/* Discipline list */}
        <div className="lg:col-span-5">
          <span className="eyebrow block tracking-[0.16em]">Our domains</span>
          <h2 className="mt-6 max-w-[14ch] font-sans text-[clamp(30px,4vw,54px)] font-medium leading-[1.08] tracking-[-0.055em]">
            Pick a discipline and take a look.
          </h2>

          <ul className="mt-10 flex flex-col">
            {domains.map((domain, index) => {
              const isActive = active === index;
              return (
                <li key={domain.id} className="border-b border-black/[0.07] first:border-t">
                  <button
                    type="button"
                    onMouseEnter={() => setActive(index)}
                    onFocus={() => setActive(index)}
                    onClick={() => setActive(index)}
                    aria-controls="svc-stage"
                    aria-current={isActive ? 'true' : undefined}
                    className={`svc-item flex w-full cursor-pointer items-baseline gap-5 py-4 text-left md:py-5 ${
                      isActive
                        ? 'translate-x-3 text-[var(--duck)]'
                        : 'text-black/30 hover:text-black/60'
                    }`}
                  >
                    <span className="w-6 text-[12px] font-semibold tracking-[0.08em] text-[var(--duck)]">
                      {domain.number}
                    </span>
                    <span className="font-sans text-[clamp(24px,3.2vw,44px)] font-medium leading-[1.1] tracking-[-0.045em]">
                      {domain.title}
                    </span>
                  </button>
                </li>
              );
            })}
          </ul>
        </div>

        {/* Stage */}
        <div className="relative lg:col-span-7">
          {/* Motion objects around the stage */}
          <div className="pointer-events-none absolute inset-0" aria-hidden="true">
            <svg
              className="svc-spin absolute -right-10 -top-12"
              width="220"
              height="220"
              viewBox="0 0 220 220"
              fill="none"
            >
              <circle cx="110" cy="110" r="104" stroke="#0a5c6e" strokeOpacity="0.35" strokeWidth="2" strokeDasharray="2 10" strokeLinecap="round" />
            </svg>
            <svg
              className="svc-spin-rev absolute -left-4 bottom-10"
              width="24"
              height="24"
              viewBox="0 0 26 26"
              stroke="#0a5c6e"
              strokeOpacity="0.7"
              strokeWidth="2.4"
            >
              <path d="M13 2v22M2 13h22" />
            </svg>
            <div className="svc-bob absolute -bottom-4 right-[22%] h-4 w-4 rounded-full bg-[#0a5c6e]" />
          </div>

          <div
            id="svc-stage"
            ref={stageRef}
            aria-live="polite"
            className="relative mx-auto aspect-[6/5] w-full max-w-[760px]"
          >
            {domains.map((domain, index) => {
              const isActive = active === index;
              const route = DOMAIN_ROUTES[domain.id] ?? '/';
              const floatA = { '--dur': '6.5s', '--delay': '-1s' } as CSSProperties;
              const floatB = { '--dur': '5.4s', '--delay': '-3s' } as CSSProperties;

              return (
                <div
                  key={domain.id}
                  data-scene={index}
                  aria-hidden={!isActive}
                  className={`absolute inset-0 transition-opacity duration-500 ${
                    isActive ? 'opacity-100' : 'pointer-events-none opacity-0'
                  }`}
                >
                  {/* Main image */}
                  <div
                    data-main
                    className="absolute left-0 top-0 h-[80%] w-[72%] overflow-hidden rounded-[1.6rem] bg-[#dfe6e6] shadow-[0_28px_60px_rgba(8,40,50,0.18)]"
                  >
                    <img
                      data-main-img
                      src={domain.imageLarge}
                      alt={domain.alt}
                      loading={index === 0 ? 'eager' : 'lazy'}
                      draggable={false}
                      className="h-full w-full object-cover"
                    />
                  </div>

                  {/* Floating accents */}
                  <div data-accent className="absolute right-0 top-[22%] w-[40%]">
                    <div className="svc-float" style={floatA}>
                      <div className="aspect-[4/3] overflow-hidden rounded-[1.1rem] border-[6px] border-white bg-[#dfe6e6] shadow-[0_22px_46px_rgba(8,40,50,0.2)]">
                        <img
                          src={domain.imageTeaser}
                          alt=""
                          loading="lazy"
                          draggable={false}
                          className="h-full w-full scale-150 object-cover object-[70%_30%]"
                        />
                      </div>
                    </div>
                  </div>

                  <div data-accent className="absolute right-[10%] top-0 w-[22%]">
                    <div className="svc-float" style={floatB}>
                      <div className="aspect-square overflow-hidden rounded-[1rem] border-[5px] border-white bg-[#dfe6e6] shadow-[0_18px_38px_rgba(8,40,50,0.18)]">
                        <img
                          src={domain.imageTeaser}
                          alt=""
                          loading="lazy"
                          draggable={false}
                          className="h-full w-full scale-[1.8] object-cover object-[25%_70%]"
                        />
                      </div>
                    </div>
                  </div>

                  {/* Caption card */}
                  <div
                    data-info
                    className="absolute bottom-0 left-[3%] z-20 w-[min(400px,78%)] rounded-[1.3rem] border border-black/[0.06] bg-white p-5 shadow-[0_20px_50px_rgba(0,0,0,0.1)] md:p-6"
                  >
                    <p className="text-[11px] font-semibold tracking-[0.14em] text-[var(--duck)]">
                      {domain.number} / {domain.category}
                    </p>
                    <p className="mt-2 text-[14.5px] leading-[1.6] text-black/65">
                      {domain.description}
                    </p>
                    <Link
                      to={route}
                      tabIndex={isActive ? 0 : -1}
                      className="group mt-4 inline-flex items-center gap-2 text-[13px] font-semibold text-[var(--duck)]"
                    >
                      Explore {domain.title}
                      <span className="flex h-7 w-7 items-center justify-center rounded-full border border-[var(--duck)]/30 transition-colors group-hover:bg-[var(--duck)] group-hover:text-white">
                        <ArrowUpRight size={14} aria-hidden="true" />
                      </span>
                    </Link>
                  </div>
                </div>
              );
            })}

            {/* Viewfinder frame that glides between framings */}
            <div
              ref={frameRef}
              aria-hidden="true"
              className="svc-frame pointer-events-none absolute z-10 rounded-[2px]"
              style={{
                left: `${initialFrame.l}%`,
                top: `${initialFrame.t}%`,
                width: `${initialFrame.w}%`,
                height: `${initialFrame.h}%`,
              }}
            />
          </div>
        </div>
      </div>
    </section>
  );
}
