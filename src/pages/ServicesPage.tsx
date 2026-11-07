import { Link } from 'react-router-dom';
import { ArrowUpRight } from 'lucide-react';
import Reveal from '@/components/Reveal';
import ServicesHero from '@/components/services/ServicesHero';
import ServicesExplorer from '@/components/services/ServicesExplorer';
import { useDocumentTitle } from '@/hooks/useDocumentTitle';
import './ServicesPage.css';

// The three practices that have their own detail pages
const DEEP_DIVES = [
  {
    name: 'Web development',
    desc: 'Sites and stores built in code from day one, so what ships matches what was designed.',
    href: '/services/web-development',
  },
  {
    name: 'Videography',
    desc: 'Shot film: product, brand and campaign video produced by the studio, on location or on set.',
    href: '/services/videography',
  },
  {
    name: 'AI video generation',
    desc: 'Brand-accurate motion generated from existing visual assets, with a human editing pass on every cut.',
    href: '/services/video-generation',
  },
];

export default function ServicesPage() {
  useDocumentTitle('Services');

  return (
    <>
      <ServicesHero />
      <ServicesExplorer />

      <section className="bg-[#f5f7f6] py-24 text-[#101515] md:py-28">
        <div className="wrap">
          <Reveal>
            <span className="eyebrow block tracking-[0.16em]">In detail</span>
            <h2 className="mt-6 max-w-[18ch] font-sans text-[clamp(30px,4vw,54px)] font-medium leading-[1.08] tracking-[-0.055em]">
              Three practices, explained.
            </h2>
          </Reveal>

          <div className="mt-12 grid gap-5 md:grid-cols-3">
            {DEEP_DIVES.map((item, index) => (
              <Reveal key={item.href} delay={index * 90}>
                <Link
                  to={item.href}
                  className="group flex h-full min-h-[240px] flex-col rounded-[1.6rem] border border-black/[0.06] bg-white p-7 transition-all duration-500 hover:-translate-y-1 hover:shadow-[0_20px_55px_rgba(0,0,0,0.08)] md:rounded-[2rem] md:p-8"
                >
                  <h3 className="font-sans text-[clamp(22px,2.2vw,30px)] font-semibold leading-[1.15] tracking-[-0.045em] transition-colors group-hover:text-[var(--duck)]">
                    {item.name}
                  </h3>
                  <p className="mt-4 text-[15px] leading-[1.6] text-black/55">{item.desc}</p>
                  <span className="ml-auto mt-auto flex h-11 w-11 items-center justify-center rounded-full border border-black/10 transition-all duration-300 group-hover:border-transparent group-hover:bg-[var(--duck)] group-hover:text-white">
                    <ArrowUpRight size={19} aria-hidden="true" />
                  </span>
                </Link>
              </Reveal>
            ))}
          </div>
        </div>
      </section>
    </>
  );
}
