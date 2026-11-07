import { useEffect, useRef, type CSSProperties } from 'react';
import gsap from 'gsap';
import Reveal from '@/components/Reveal';
import { PARTNERS, type Partner } from '@/data/partners';
import { useReducedMotion } from '@/hooks/useReducedMotion';

// Repeat so each track is comfortably wider than the screen
const repeat = (items: Partner[], times: number): Partner[] =>
  Array.from({ length: times }, () => items).flat();

const ROW_1_ITEMS: Partner[] = repeat(PARTNERS, 3);
const ROW_2_ITEMS: Partner[] = repeat([...PARTNERS].reverse(), 3);

// Percent of the duplicated track per second (50% = one full loop)
const BASE_SPEED = [1.9, 1.5];
const DIRECTION = [-1, 1]; // row 1 moves left, row 2 moves right

interface SelectedPartnersProps {
  className?: string;
}

export default function SelectedPartners({ className = '' }: SelectedPartnersProps) {
  const reduced = useReducedMotion();
  const sectionRef = useRef<HTMLElement>(null);
  const trackRefs = useRef<(HTMLDivElement | null)[]>([]);
  const hovered = useRef<boolean[]>([false, false]);

  // Motion: constant drift, extra speed and a slight skew while the page is scrolling
  useEffect(() => {
    if (reduced) return;
    const tracks = trackRefs.current.filter(Boolean) as HTMLDivElement[];
    if (tracks.length === 0) return;

    const pos = [-25, -25]; // xPercent, kept inside (-50, 0]
    const speedNow = [BASE_SPEED[0], BASE_SPEED[1]];
    let lastY = window.scrollY;
    let boost = 0;
    const skewTo = tracks.map((t) =>
      gsap.quickTo(t, 'skewX', { duration: 0.5, ease: 'power3.out' })
    );

    const tick = (_time: number, deltaMs: number) => {
      const dt = Math.min(deltaMs, 64) / 1000;
      const y = window.scrollY;
      const velocity = (y - lastY) / Math.max(dt, 0.001); // px/s
      lastY = y;
      boost += (Math.min(Math.abs(velocity) / 900, 3) - boost) * 0.08;

      tracks.forEach((track, i) => {
        const target = hovered.current[i] ? 0 : BASE_SPEED[i] * (1 + boost * 2.5);
        speedNow[i] += (target - speedNow[i]) * 0.07; // ease to a stop on hover
        pos[i] += DIRECTION[i] * speedNow[i] * dt;
        if (pos[i] <= -50) pos[i] += 50;
        if (pos[i] > 0) pos[i] -= 50;
        gsap.set(track, { xPercent: pos[i] });
        skewTo[i](
          hovered.current[i] ? 0 : Math.max(Math.min(DIRECTION[i] * boost * -3, 6), -6)
        );
      });
    };

    gsap.ticker.add(tick);
    return () => {
      gsap.ticker.remove(tick);
      tracks.forEach((t) => gsap.set(t, { clearProps: 'transform' }));
    };
  }, [reduced]);

  // One-time entrance when the section scrolls into view
  useEffect(() => {
    if (reduced) return;
    const section = sectionRef.current;
    if (!section) return;
    const logos = section.querySelectorAll('.partner-marquee-float');
    gsap.set(logos, { opacity: 0, scale: 0.7 });
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (!entry.isIntersecting) return;
        gsap.to(logos, {
          opacity: 1,
          scale: 1,
          duration: 0.8,
          ease: 'back.out(1.6)',
          stagger: { each: 0.04, from: 'start' },
          clearProps: 'scale',
        });
        observer.disconnect();
      },
      { threshold: 0.2 }
    );
    observer.observe(section);
    return () => {
      observer.disconnect();
      gsap.set(logos, { clearProps: 'opacity,scale' });
    };
  }, [reduced]);

  const renderTrackGroup = (items: Partner[], rowIndex: number, isDuplicate = false) => (
    <div
      className="flex items-center shrink-0 gap-14 sm:gap-20 md:gap-24 lg:gap-32 pr-14 sm:pr-20 md:pr-24 lg:pr-32"
      aria-hidden={isDuplicate ? true : undefined}
    >
      {items.map((partner, index) => {
        const altText = partner.name || partner.logo.split('/').pop() || 'Partner logo';
        const floatStyle = {
          '--float-dur': `${4.2 + ((index + rowIndex) % 4) * 0.7}s`,
          '--float-delay': `${-((index * 0.9 + rowIndex * 0.6) % 5)}s`,
        } as CSSProperties;
        return (
          <div
            key={`${isDuplicate ? 'dup' : 'orig'}-${partner.name}-${index}`}
            className="partner-marquee-float shrink-0"
            style={floatStyle}
          >
            <img
              src={partner.logo}
              alt={isDuplicate ? '' : altText}
              loading="lazy"
              draggable={false}
              className="partner-marquee-logo"
            />
          </div>
        );
      })}
    </div>
  );

  const rows = [ROW_1_ITEMS, ROW_2_ITEMS];

  return (
    <section
      ref={sectionRef}
      aria-label="Selected partners"
      className={`py-20 md:py-28 overflow-hidden bg-[var(--tarka-white)] text-[var(--tarka-black)] border-b border-[var(--line)] relative z-10 font-sans ${className}`}
    >
      <Reveal className="wrap mb-10 md:mb-14">
        <span className="font-sans text-[11.5px] font-semibold tracking-wider text-[var(--duck)] !normal-case pl-2 border-l border-[var(--duck)] block">
          Selected partners
        </span>
      </Reveal>

      <div className="partner-marquee-viewport flex flex-col gap-2 md:gap-6">
        {rows.map((items, rowIndex) => (
          <div
            key={rowIndex}
            className="partner-marquee-row"
            tabIndex={0}
            aria-label={
              rowIndex === 0 ? 'Partner logos scrolling left' : 'Partner logos scrolling right'
            }
            onMouseEnter={() => (hovered.current[rowIndex] = true)}
            onMouseLeave={() => (hovered.current[rowIndex] = false)}
            onFocus={() => (hovered.current[rowIndex] = true)}
            onBlur={() => (hovered.current[rowIndex] = false)}
          >
            <div
              className="partner-marquee-track"
              ref={(el) => {
                trackRefs.current[rowIndex] = el;
              }}
            >
              {renderTrackGroup(items, rowIndex, false)}
              {renderTrackGroup(items, rowIndex, true)}
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}
