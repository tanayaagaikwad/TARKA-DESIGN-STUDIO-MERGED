import Hero from '@/components/Hero';
import SelectedPartners from '@/components/SelectedPartners';
import { Link } from 'react-router-dom';
import { ArrowRight, ArrowUpRight } from 'lucide-react';
import Reveal from '@/components/Reveal';
import DrawingBoardAnimation from '@/components/DrawingBoardAnimation';
import { useDocumentTitle } from '@/hooks/useDocumentTitle';

export default function HomePage() {
  useDocumentTitle('Tarka — Design that thinks before it looks', true);
  return (
    <>
      <Hero />

      {/* SELECTED PARTNERS */}
      <SelectedPartners />

      {/* SERVICES SECTION */}
      <section className="bg-[#f5f7f6] text-[#101515] py-24 md:py-32">
        <Reveal className="wrap mb-14 md:mb-20">
          <span className="eyebrow block tracking-[0.16em]">
            OUR DOMAINS
          </span>

          <h2 className="mt-6 max-w-2xl font-sans font-medium text-[clamp(32px,4.5vw,58px)] leading-[1.08] tracking-[-0.055em]">
            Services built around ideas.
          </h2>
        </Reveal>

        <div className="wrap">
          {[
            { name: 'PRODUCT DESIGN', route: '/product' },
            { name: 'GRAPHIC DESIGN', route: '/identity' },
            { name: 'UI/UX AND WEB DEVELOPMENT', route: '/digital' },
            { name: 'MARKETING', route: '/reach' },
            { name: 'VIDEO GENERATION', route: '/video' },
            { name: 'PHOTOGRAPHY', route: '/photography' },
          ].map((service, index) => (
            <Reveal key={service.name} delay={index * 70}>
              <Link
                to={service.route}
                className="group relative flex items-center gap-4 border-t border-black/10 py-7 md:py-9 transition-transform duration-500 hover:-translate-y-1 block cursor-pointer"
              >
                <span className="w-8 shrink-0 font-sans text-xs font-medium tracking-wider text-[var(--duck)]/70">
                  {String(index + 1).padStart(2, '0')}
                </span>

                <h3 className="min-w-0 flex-1 font-sans font-semibold text-[clamp(19px,2.4vw,31px)] leading-tight tracking-[-0.035em] text-[#171c1c] transition-colors duration-300 group-hover:text-[var(--duck)]">
                  {service.name}
                </h3>

                <ArrowUpRight
                  size={21}
                  strokeWidth={1.5}
                  className="shrink-0 text-[var(--duck)] transition-transform duration-300 group-hover:translate-x-1 group-hover:-translate-y-1"
                />

                <span className="absolute bottom-0 left-0 h-px w-0 bg-[var(--duck)] transition-all duration-500 group-hover:w-full" />
              </Link>
            </Reveal>
          ))}

          <div className="border-t border-black/10" />
        </div>
      </section>

      {/* ABOUT TARKA SECTION */}
      <section className="py-24 md:py-32 relative wrap bg-[var(--paper)] text-[var(--ink)] mt-[-1px]">
        <div className="grid grid-cols-1 md:grid-cols-[1fr_0.8fr] gap-12 md:gap-20 items-center mb-32">

          {/* ABOUT TEXT */}
          <Reveal className="about-copy">
            <span className="eyebrow mb-8 block tracking-widest">
              ABOUT TARKA
            </span>

            <h2 className="about-heading font-sans font-medium text-[clamp(34px,4.5vw,62px)] leading-[1.08] tracking-[-0.065em]">
              <span className="about-word">
                A thought isn't much
              </span>
              <br />
              <span className="about-highlight">
                until someone makes
              </span>
              <br />
              <span className="about-highlight">
                it real.
              </span>
            </h2>

            <p className="about-description mt-8 max-w-[48ch] font-sans text-[15px] leading-[1.8] text-[var(--muted)]">
              Tarka is a design and technology studio that thinks through
              products, interfaces, brands, digital experiences and visual
              media — before it draws a single pixel. We bridge the gap
              between creative ambition and technological execution.
            </p>

            <div className="mt-12">
              <Link
                to="/about"
                className="about-link inline-flex items-center gap-3 font-sans text-[13px] font-semibold tracking-widest uppercase text-[var(--ink)] hover:text-[var(--duck)]"
              >
                MORE ABOUT US
                <ArrowRight size={17} />
              </Link>
            </div>
          </Reveal>

          {/* ABOUT ANIMATION */}
          <Reveal
            delay={180}
            className="about-visual relative hidden md:flex aspect-[4/5] max-h-[530px] items-center justify-center overflow-hidden rounded-tl-[120px] rounded-br-[120px] bg-[#080d0e] shadow-2xl"
          >
            <div className="about-visual-glow absolute inset-0" />

            <div className="about-orbit about-orbit-outer">
              <span className="about-orbit-dot" />
            </div>

            <div className="about-orbit about-orbit-inner">
              <span className="about-orbit-dot" />
            </div>

            <div className="about-core relative z-10 flex h-32 w-32 items-center justify-center rounded-full border border-white/20">
              <div className="about-core-lines flex w-16 flex-col gap-3">
                <span />
                <span />
                <span className="mx-auto w-2/3" />
              </div>
            </div>

            <span className="absolute bottom-8 left-8 font-sans text-[10px] tracking-[0.22em] text-white/35">
              IDEAS INTO REALITY / TARKA
            </span>
          </Reveal>

        </div>
      </section>

      {/* THE WORLD BOARD — IN-HOUSE PUBLICATION */}
      <section className="world-board bg-[#f5f7f6] text-[#101515] py-24 md:py-32 overflow-hidden">

        {/* EDITORIAL HEADER */}
        <Reveal className="wrap mb-12 md:mb-16">
          <div className="flex items-center justify-between mb-7">
            <span className="eyebrow tracking-[0.18em] text-[var(--duck)]">
              TARKA / JOURNAL
            </span>
            <span className="text-[10px] tracking-[0.16em] text-black/40">
              INSIGHTS · IDEAS · EXPERIMENTS
            </span>
          </div>

          <h2 className="font-sans font-semibold text-[clamp(36px,5vw,64px)] leading-[1.05] tracking-[-0.065em]">
            The Word Board
          </h2>

          <div className="mt-5 h-[2px] w-full bg-black/10 relative overflow-hidden">
            <span className="absolute inset-y-0 left-0 w-24 bg-[var(--duck)]" />
          </div>

          <div className="mt-7 flex items-center gap-3">
            <span className="h-4 w-[2px] bg-[var(--duck)]" />
            <span className="font-sans text-[11px] font-semibold tracking-[0.19em] text-[var(--duck)]">
              IN-HOUSE BLOG SECTION
            </span>
          </div>

          <div className="mt-5 flex flex-col md:flex-row md:items-end justify-between gap-6">
            <p className="max-w-[48ch] font-sans text-[14px] md:text-[15px] leading-[1.8] text-black/55">
              Ideas, perspectives and experiments shaping the world of design
              and technology.
            </p>

            <Link
              to="/blog"
              className="group inline-flex items-center gap-3 pb-2 border-b border-black/20 font-sans text-[11px] font-semibold tracking-[0.15em] hover:text-[var(--duck)] hover:border-[var(--duck)] transition-colors"
            >
              EXPLORE THE JOURNAL
              <ArrowUpRight
                size={16}
                className="transition-transform duration-300 group-hover:translate-x-1 group-hover:-translate-y-1"
              />
            </Link>
          </div>
        </Reveal>

        {/* ARTICLE PRESENTATION */}
        <div className="wrap grid grid-cols-1 lg:grid-cols-[1.12fr_0.88fr] gap-5 md:gap-7">

          {/* FEATURED ARTICLE */}
          <Reveal delay={100} className="h-full">
            <Link
              to="/blog/prototype-before-present"
              className="world-card group flex flex-col h-full bg-white overflow-hidden rounded-[1.6rem] md:rounded-[2rem] border border-black/[0.05] transition-all duration-500 hover:-translate-y-1 hover:shadow-[0_25px_65px_rgba(0,0,0,0.09)]"
            >
              <div className="world-card-art relative aspect-[16/9] overflow-hidden bg-[#092c35]">
                <DrawingBoardAnimation />

                <span className="absolute top-6 left-6 z-10 rounded-full border border-white/25 bg-black/20 backdrop-blur-md px-4 py-2 font-sans text-[9px] font-semibold tracking-[0.18em] text-white">
                  FEATURED THOUGHT
                </span>
              </div>

              <div className="p-7 md:p-9 lg:p-11 flex flex-col flex-grow">
                <div className="flex flex-wrap items-center gap-3 mb-6 font-sans text-[10px] font-semibold tracking-[0.13em] text-[var(--duck)]">
                  <span>DESIGN SYSTEMS</span>
                  <span className="h-1 w-1 rounded-full bg-current" />
                  <span className="text-black/40">MAR 14, 2024</span>
                </div>

                <h3 className="font-sans font-semibold text-[clamp(25px,3vw,39px)] leading-[1.15] tracking-[-0.05em] text-[#151a19] group-hover:text-[var(--duck)] transition-colors duration-300">
                  The architecture of modern digital experiences.
                </h3>

                <p className="mt-5 max-w-[52ch] font-sans text-[14px] leading-[1.8] text-black/55">
                  Why design systems are no longer just UI kits, but structural
                  languages that define how organizations build and scale products.
                </p>

                <div className="mt-auto pt-9 flex items-center justify-between border-t border-black/[0.07] mt-10">
                  <span className="font-sans text-[10px] font-semibold tracking-[0.17em] text-black/45 group-hover:text-[var(--duck)] transition-colors">
                    READ FEATURED ARTICLE
                  </span>

                  <span className="flex h-11 w-11 items-center justify-center rounded-full border border-black/10 transition-all duration-300 group-hover:bg-[var(--duck)] group-hover:text-white group-hover:border-transparent group-hover:rotate-45">
                    <ArrowUpRight size={19} />
                  </span>
                </div>
              </div>
            </Link>
          </Reveal>

          {/* SECONDARY ARTICLES */}
          <div className="flex flex-col gap-5 md:gap-7">

            <Reveal delay={180} className="flex-1">
              <Link
                to="/blog/ai-video-utility"
                className="world-card group flex flex-col h-full min-h-[280px] bg-white p-7 md:p-9 rounded-[1.6rem] md:rounded-[2rem] border border-black/[0.05] transition-all duration-500 hover:-translate-y-1 hover:shadow-[0_20px_55px_rgba(0,0,0,0.08)]"
              >
                <div className="flex items-center gap-3 font-sans text-[10px] font-semibold tracking-[0.13em] text-[var(--duck)] mb-7">
                  <span>ENGINEERING</span>
                  <span className="h-1 w-1 rounded-full bg-current" />
                  <span className="text-black/40">FEB 28, 2024</span>
                </div>

                <h3 className="font-sans font-semibold text-[clamp(23px,2.5vw,33px)] leading-[1.17] tracking-[-0.045em] text-[#151a19] group-hover:text-[var(--duck)] transition-colors">
                  Complex animations mapped to human perception.
                </h3>

                <div className="mt-auto pt-7 flex justify-between items-center border-t border-black/[0.07] mt-10">
                  <span className="font-sans text-[10px] font-semibold tracking-[0.16em] text-black/40">
                    5 MIN READ
                  </span>
                  <span className="flex h-10 w-10 items-center justify-center rounded-full border border-black/10 group-hover:bg-[var(--duck)] group-hover:text-white group-hover:border-transparent transition-all">
                    <ArrowUpRight size={18} />
                  </span>
                </div>
              </Link>
            </Reveal>

            <Reveal delay={260} className="flex-1">
              <Link
                to="/blog/interface-nobody-asked-for"
                className="world-card group flex flex-col h-full min-h-[280px] bg-white p-7 md:p-9 rounded-[1.6rem] md:rounded-[2rem] border border-black/[0.05] transition-all duration-500 hover:-translate-y-1 hover:shadow-[0_20px_55px_rgba(0,0,0,0.08)]"
              >
                <div className="flex items-center gap-3 font-sans text-[10px] font-semibold tracking-[0.13em] text-[var(--duck)] mb-7">
                  <span>BRAND IDENTITY</span>
                  <span className="h-1 w-1 rounded-full bg-current" />
                  <span className="text-black/40">FEB 02, 2024</span>
                </div>

                <h3 className="font-sans font-semibold text-[clamp(23px,2.5vw,33px)] leading-[1.17] tracking-[-0.045em] text-[#151a19] group-hover:text-[var(--duck)] transition-colors">
                  Typography as the silent voice of the interface.
                </h3>

                <div className="mt-auto pt-7 flex justify-between items-center border-t border-black/[0.07] mt-10">
                  <span className="font-sans text-[10px] font-semibold tracking-[0.16em] text-black/40">
                    4 MIN READ
                  </span>
                  <span className="flex h-10 w-10 items-center justify-center rounded-full border border-black/10 group-hover:bg-[var(--duck)] group-hover:text-white group-hover:border-transparent transition-all">
                    <ArrowUpRight size={18} />
                  </span>
                </div>
              </Link>
            </Reveal>

          </div>
        </div>
      </section>

      {/* FINALE CTA */}
      <section className="bg-[var(--ink)] text-white text-center py-32 px-6 overflow-hidden relative">
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,rgba(10,92,110,0.15)_0%,transparent_60%)] mix-blend-screen pointer-events-none" />

        <Reveal className="wrap relative z-10">
          <p className="font-serif text-[clamp(32px,6vw,72px)] mb-4">
            YOU THINK. <br />
            <span className="text-[var(--duck)] italic">WE BUILD.</span>
          </p>

          <p className="text-[16px] text-[var(--muted-on-ink)] mb-12 max-w-[60ch] mx-auto opacity-80">
            You&apos;ve seen how we think. If you&apos;ve got something worth building, that&apos;s all we need to start. Let&apos;s map the logic and craft the experience.
          </p>

          <div className="flex justify-center gap-4 flex-wrap">
            <Link
              to="/quote"
              className="group inline-flex items-center gap-4 text-[13px] font-bold tracking-widest bg-[var(--duck)] px-8 py-5 rounded-full hover:bg-white hover:text-black transition-all duration-400"
            >
              GET A QUOTE
              <span className="w-2 h-2 rounded-full bg-white group-hover:bg-[var(--duck)]" />
            </Link>

            <a
              href="mailto:studio@tarkadesign.com"
              className="inline-flex items-center gap-2 text-[13px] font-bold tracking-widest px-8 py-5 rounded-full border border-white/20 hover:bg-white/5 transition-all"
            >
              CONTACT STUDIO
            </a>
          </div>
        </Reveal>
      </section>
    </>
  );
}
