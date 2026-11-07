import { Link } from 'react-router-dom';
import { ArrowUpRight, Mail } from 'lucide-react';
import Reveal from '@/components/Reveal';
import { tarkaContact } from '@/data/services';

const ACTIONS = [
  {
    to: '/quote',
    title: 'Get a quote',
    text: 'Choose your services, see the estimate update as you go, and download it as a PDF.',
    primary: true,
  },
  {
    to: '/inquiry',
    title: 'Send an inquiry',
    text: 'Tell us about your project in four short steps. A member of the studio replies within 24 hours.',
    primary: false,
  },
];

export default function FinaleCTA() {
  return (
    <section
      aria-labelledby="finale-heading"
      className="relative bg-[var(--paper)] text-[#101515] py-24 md:py-32 border-t border-black/[0.06]"
    >
      <div className="wrap">
        <Reveal className="grid gap-10 lg:grid-cols-12 lg:items-end">
          <div className="lg:col-span-7">
            <span className="eyebrow block tracking-[0.16em]">Start a project</span>

            <h2
              id="finale-heading"
              className="mt-6 font-sans font-medium text-[clamp(44px,7vw,104px)] leading-[0.98] tracking-[-0.06em]"
            >
              You think.
              <br />
              <span className="text-[var(--duck)]">We build.</span>
            </h2>
          </div>

          <div className="lg:col-span-5 lg:pb-3">
            <p className="max-w-[46ch] text-[16px] md:text-[17px] leading-[1.65] text-black/60">
              You&apos;ve seen how we think. If you have something worth building, tell us about it.
              We&apos;ll map the logic and craft the experience.
            </p>

            <a
              href={`mailto:${tarkaContact.email}`}
              className="footer-link mt-7 inline-flex items-center gap-3 text-[14px] font-medium text-[#101515] hover:text-[var(--duck)] transition-colors"
            >
              <Mail size={16} strokeWidth={1.8} aria-hidden="true" />
              {tarkaContact.email}
            </a>
          </div>
        </Reveal>

        <div className="mt-14 md:mt-20 grid gap-5 md:grid-cols-2">
          {ACTIONS.map((action, index) => (
            <Reveal key={action.to} delay={index * 90}>
              <Link
                to={action.to}
                className={`group flex h-full min-h-[240px] flex-col rounded-[1.6rem] md:rounded-[2rem] p-7 md:p-10 transition-all duration-500 hover:-translate-y-1 ${
                  action.primary
                    ? 'bg-[var(--duck)] text-white hover:bg-[var(--duck-dark)] hover:shadow-[0_24px_60px_rgba(10,92,110,0.28)]'
                    : 'bg-white text-[#101515] border border-black/[0.08] hover:border-[var(--duck)]/40 hover:shadow-[0_20px_55px_rgba(0,0,0,0.08)]'
                }`}
              >
                <h3 className="font-sans font-semibold text-[clamp(24px,2.6vw,36px)] leading-[1.12] tracking-[-0.045em]">
                  {action.title}
                </h3>

                <p
                  className={`mt-4 max-w-[42ch] text-[15px] leading-[1.6] ${
                    action.primary ? 'text-white/75' : 'text-black/55'
                  }`}
                >
                  {action.text}
                </p>

                <span
                  className={`mt-auto ml-auto flex h-12 w-12 items-center justify-center rounded-full border transition-all duration-300 ${
                    action.primary
                      ? 'border-white/30 group-hover:bg-white group-hover:text-[var(--duck)]'
                      : 'border-black/10 group-hover:bg-[var(--duck)] group-hover:text-white group-hover:border-transparent'
                  }`}
                >
                  <ArrowUpRight size={20} aria-hidden="true" />
                </span>
              </Link>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}
