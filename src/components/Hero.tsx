import { useEffect, useRef } from "react";
import gsap from "gsap";
import { MagneticLink } from "./MagneticButton";

const keywords = [
  "PRODUCT",
  "BRAND",
  "EXPERIENCE",
  "WEBSITE",
  "APP",
  "DIGITAL EXPERIENCE",
];

type Particle = {
  x: number;
  y: number;
  homeX: number;
  homeY: number;
  driftX: number;
  driftY: number;
  phase: number;
  size: number;
  alpha: number;
  color: string;
};

const LOGO_SRC = "/tarka-logo.png";
const PARTICLE_COUNT = 11000;
const PARTICLE_PALETTE = ["#65bfc8", "#406e73", "#226d84", "#14696f", "#192d59"];

export default function Hero() {
  const container = useRef<HTMLElement>(null);
  const keywordsRef = useRef<HTMLSpanElement>(null);
  const canvasRef = useRef<HTMLCanvasElement>(null);

  // Intro and service-word transitions.
  useEffect(() => {
    const root = container.current;
    if (!root || !keywordsRef.current) return;

    const ctx = gsap.context(() => {
      const reducedMotion = window.matchMedia(
        "(prefers-reduced-motion: reduce)",
      ).matches;
      const tagline = root.querySelector(".hero-tagline");
      const sub = root.querySelector(".hero-sub-text");
      const ctas = root.querySelectorAll(".hero-cta");
      const scrollCue = root.querySelector(".hero-cue");
      const items = gsap.utils.toArray<HTMLElement>(
        root.querySelectorAll(".keyword-item"),
      );

      if (reducedMotion) {
        const animated = [tagline, sub, scrollCue].filter(Boolean);
        if (ctas.length) animated.push(...Array.from(ctas));
        if (animated.length) {
          gsap.set(animated, {
            opacity: 1,
            clearProps: "filter,transform",
          });
        }
        if (items.length) {
          gsap.set(items, {
            position: "absolute",
            left: 0,
            top: 0,
            width: "100%",
            opacity: 0,
          });
          gsap.set(items[0], { opacity: 1 });
        }
        return;
      }

      const intro = gsap.timeline();
      if (tagline) {
        intro.fromTo(
          tagline,
          { y: 18, opacity: 0, filter: "blur(8px)" },
          {
            y: 0,
            opacity: 1,
            filter: "blur(0px)",
            duration: 0.9,
            ease: "power3.out",
            delay: 0.25,
          },
        );
      }
      if (sub) {
        intro.fromTo(
          sub,
          { y: 12, opacity: 0 },
          { y: 0, opacity: 1, duration: 0.7, ease: "power2.out" },
          "-=0.45",
        );
      }
      if (ctas.length) {
        intro.fromTo(
          ctas,
          { y: 10, opacity: 0 },
          { y: 0, opacity: 1, duration: 0.6, stagger: 0.1, ease: "power2.out" },
          "-=0.35",
        );
      }
      if (scrollCue) {
        intro.fromTo(
          scrollCue,
          { opacity: 0 },
          { opacity: 0.65, duration: 0.8 },
          "-=0.2",
        );
      }

      if (items.length) {
        gsap.set(items, {
          y: 10,
          opacity: 0,
          filter: "blur(5px)",
          position: "absolute",
          left: 0,
          top: 0,
          width: "100%",
        });
        gsap.set(items[0], { y: 0, opacity: 1, filter: "blur(0px)" });

        const cycle = gsap.timeline({ repeat: -1, delay: 1.5 });
        items.forEach((item, index) => {
          const next = items[(index + 1) % items.length];
          cycle
            .to({}, { duration: 1.8 })
            .to(item, {
              y: -10,
              opacity: 0,
              filter: "blur(5px)",
              duration: 0.35,
              ease: "power2.in",
            })
            .set(next, { y: 10, opacity: 0, filter: "blur(5px)" })
            .to(next, {
              y: 0,
              opacity: 1,
              filter: "blur(0px)",
              duration: 0.42,
              ease: "power3.out",
            });
        });
      }
    }, root);

    return () => ctx.revert();
  }, []);

  // Particle field: idle particles float; on hover they form the actual logo.
  useEffect(() => {
    const canvas = canvasRef.current;
    const root = container.current;
    const context = canvas?.getContext("2d", { alpha: true });
    if (!canvas || !root || !context) return;

    const reducedMotion = window.matchMedia(
      "(prefers-reduced-motion: reduce)",
    ).matches;
    const coarsePointer = window.matchMedia(
      "(hover: none), (pointer: coarse)",
    ).matches;

    let width = 0;
    let height = 0;
    let dpr = 1;
    let frame = 0;
    let particles: Particle[] = [];
    let forming = false;
    let formationStartedAt = 0;
    let imageReady = false;
    let disposed = false;
    let imageAspect = 1;
    let touchTimer: number | undefined;

    const image = new Image();
    image.src = LOGO_SRC;

    const random = (min: number, max: number) =>
      min + Math.random() * (max - min);

    const makeParticles = (targets: Array<{ x: number; y: number }>) => {
      particles = targets.map((target, index) => ({
        x: random(width * 0.12, width * 0.88),
        y: random(height * 0.08, height * 0.92),
        homeX: target.x,
        homeY: target.y,
        driftX: random(-1, 1),
        driftY: random(-1, 1),
        phase: random(0, Math.PI * 2) + index * 0.001,
        size: random(0.65, 1.9),
        alpha: random(0.58, 1),
        color: PARTICLE_PALETTE[Math.floor(random(0, PARTICLE_PALETTE.length))],
      }));
    };

    const sampleLogo = () => {
      const sampleCanvas = document.createElement("canvas");
      const sampleContext = sampleCanvas.getContext("2d", {
        willReadFrequently: true,
      });
      if (!sampleContext) return;

      const maxSampleWidth = 420;
      const scale = Math.min(1, maxSampleWidth / image.naturalWidth);
      const sampleWidth = Math.max(1, Math.round(image.naturalWidth * scale));
      const sampleHeight = Math.max(
        1,
        Math.round(image.naturalHeight * scale),
      );
      sampleCanvas.width = sampleWidth;
      sampleCanvas.height = sampleHeight;
      sampleContext.drawImage(image, 0, 0, sampleWidth, sampleHeight);

      let pixels: Uint8ClampedArray;
      try {
        pixels = sampleContext.getImageData(
          0,
          0,
          sampleWidth,
          sampleHeight,
        ).data;
      } catch {
        return;
      }

      const points: Array<{ x: number; y: number }> = [];
      const step = Math.max(1, Math.floor(Math.sqrt(
        (sampleWidth * sampleHeight) / PARTICLE_COUNT,
      )));
      for (let y = 0; y < sampleHeight; y += step) {
        for (let x = 0; x < sampleWidth; x += step) {
          const offset = (y * sampleWidth + x) * 4;
          const alpha = pixels[offset + 3];
          const brightness =
            (pixels[offset] + pixels[offset + 1] + pixels[offset + 2]) / 3;
          if (alpha > 70 && (brightness < 238 || alpha < 245)) {
            points.push({ x: x / sampleWidth, y: y / sampleHeight });
          }
        }
      }

      if (!points.length) return;
      imageAspect = sampleWidth / sampleHeight;

      const visualWidth = Math.min(width * (width < 640 ? 0.94 : 0.72), 780);
      const visualHeight = visualWidth / imageAspect;
      const centerX = width * (width < 640 ? 0.69 : 0.69);
      const centerY = height * (width < 640 ? 0.39 : 0.43);
      const left = centerX - visualWidth / 2;
      const top = centerY - visualHeight / 2;

      const targets = points.slice(0, PARTICLE_COUNT).map((point) => ({
        x: left + point.x * visualWidth,
        y: top + point.y * visualHeight,
      }));
      makeParticles(targets);
    };

    const resize = () => {
      const bounds = canvas.getBoundingClientRect();
      width = Math.max(1, bounds.width);
      height = Math.max(1, bounds.height);
      dpr = Math.min(window.devicePixelRatio || 1, 2);
      canvas.width = Math.round(width * dpr);
      canvas.height = Math.round(height * dpr);
      context.setTransform(dpr, 0, 0, dpr, 0, 0);
      if (imageReady) sampleLogo();
    };

    const startFormation = () => {
      if (reducedMotion) return;
      if (!forming) {
        forming = true;
        formationStartedAt = performance.now();
      }
    };

    const releaseFormation = () => {
      forming = false;
    };

    const onPointerEnter = () => startFormation();
    const onPointerLeave = () => releaseFormation();
    const onPointerDown = () => {
      if (coarsePointer) {
        if (forming) releaseFormation();
        else startFormation();
      }
    };

    image.onload = () => {
      if (disposed) return;
      imageReady = true;
      resize();
    };
    image.onerror = () => {
      imageReady = true;
      const fallbackTargets = Array.from({ length: PARTICLE_COUNT }, () => ({
        x: random(width * 0.35, width * 0.9),
        y: random(height * 0.12, height * 0.82),
      }));
      makeParticles(fallbackTargets);
    };

    const render = (time: number) => {
      if (disposed) return;
      context.clearRect(0, 0, width, height);

      const elapsed = time / 1000;
      const haloX = width * (width < 640 ? 0.69 : 0.69);
      const haloY = height * (width < 640 ? 0.39 : 0.43);
      const halo = context.createRadialGradient(haloX, haloY, 4, haloX, haloY, Math.min(width, height) * 0.42);
      halo.addColorStop(0, "rgba(34, 109, 132, 0.19)");
      halo.addColorStop(0.48, "rgba(20, 105, 111, 0.075)");
      halo.addColorStop(1, "rgba(25, 153, 174, 0)");
      context.fillStyle = halo;
      context.fillRect(0, 0, width, height);
      const progress = forming
        ? Math.min(1, (time - formationStartedAt) / 3000)
        : 0;
      const eased = progress * progress * (3 - 2 * progress);

      for (const particle of particles) {
        const floatX = Math.sin(elapsed * 0.65 + particle.phase) * 11;
        const floatY = Math.cos(elapsed * 0.8 + particle.phase * 1.3) * 10;
        const scatterX = particle.homeX + particle.driftX * 48 + floatX * 1.2;
        const scatterY = particle.homeY + particle.driftY * 48 + floatY * 1.2;
        const targetX = forming ? particle.homeX : scatterX;
        const targetY = forming ? particle.homeY : scatterY;
        const blend = forming ? eased : 0.035;

        particle.x += (targetX - particle.x) * blend;
        particle.y += (targetY - particle.y) * blend;

        const shimmer = 0.48 + (Math.sin(elapsed * 4.2 + particle.phase) + 1) * 0.26;
        const alpha = Math.min(1, particle.alpha * shimmer * (forming ? 1 : 0.94));
        context.beginPath();
        context.shadowColor = particle.color;
        context.shadowBlur = forming ? 7 : 4;
        context.fillStyle = particle.color;

        context.arc(
          particle.x,
          particle.y,
          particle.size * (forming ? 1 : 0.92),
          0,
          Math.PI * 2,
        );
        context.fill();
        context.shadowBlur = 0;

        if (particle.size > 1.25 || particle.phase % 5 < 0.7) {
          context.beginPath();
          context.fillStyle = `rgba(180, 245, 247, ${Math.min(1, alpha * 0.72)})`;
          context.arc(
            particle.x - 1.2,
            particle.y - 1.2,
            particle.size * 1.8,
            0,
            Math.PI * 2,
          );
          context.fill();
        }

        if (particle.phase % 17 < 0.22) {
          const sparkle = 0.35 + (Math.sin(elapsed * 5 + particle.phase) + 1) * 0.3;
          const radius = particle.size * 3.2;
          context.strokeStyle = `rgba(190, 245, 250, ${sparkle})`;
          context.lineWidth = 0.7;
          context.beginPath();
          context.moveTo(particle.x - radius, particle.y);
          context.lineTo(particle.x + radius, particle.y);
          context.moveTo(particle.x, particle.y - radius);
          context.lineTo(particle.x, particle.y + radius);
          context.stroke();
        }
      }

      if (forming && progress >= 1) {
        for (const particle of particles) {
          particle.x += (particle.homeX - particle.x) * 0.18;
          particle.y += (particle.homeY - particle.y) * 0.18;
        }
      }

      frame = window.requestAnimationFrame(render);
    };

    resize();
    if (coarsePointer && !reducedMotion) {
      touchTimer = window.setTimeout(startFormation, 1600);
      frame = window.requestAnimationFrame(render);
      canvas.addEventListener("pointerdown", onPointerDown);
      canvas.addEventListener("pointerleave", onPointerLeave);
    } else {
      frame = window.requestAnimationFrame(render);
      canvas.addEventListener("pointerenter", onPointerEnter);
      canvas.addEventListener("pointerleave", onPointerLeave);
    }

    window.addEventListener("resize", resize);

    return () => {
      disposed = true;
      if (touchTimer !== undefined) window.clearTimeout(touchTimer);
      window.cancelAnimationFrame(frame);
      window.removeEventListener("resize", resize);
      canvas.removeEventListener("pointerenter", onPointerEnter);
      canvas.removeEventListener("pointerleave", onPointerLeave);
      canvas.removeEventListener("pointerdown", onPointerDown);
    };
  }, []);

  return (
    <section
      ref={container}
      className="tarka-hero relative isolate min-h-[100svh] overflow-hidden border-b border-black/10 px-[var(--gutter)] pb-16 pt-[110px] text-[#101515]"
    >
      <div
        aria-hidden="true"
        className="pointer-events-none absolute inset-0 z-0"
        style={{
          background:
            "radial-gradient(circle at 72% 38%, rgba(10,92,110,.10), transparent 38%), linear-gradient(120deg, #f7f9f8 0%, #f3f7f6 100%)",
        }}
      />

      <canvas
        ref={canvasRef}
        aria-label="Floating duck-blue particles that assemble into the Tarka logo when hovered"
        role="img"
        className="absolute right-0 top-0 z-[1] h-full w-[78%] cursor-pointer touch-manipulation sm:w-[72%]"
      />

      <div className="pointer-events-none absolute inset-0 z-[2] bg-[linear-gradient(90deg,#f7f9f8_0%,rgba(247,249,248,.94)_25%,rgba(247,249,248,.34)_58%,rgba(247,249,248,0)_100%)]" />
      <div className="pointer-events-none absolute inset-0 z-[2] bg-[linear-gradient(180deg,rgba(247,249,248,.12)_0%,transparent_58%,rgba(247,249,248,.72)_100%)]" />

      <div className="absolute bottom-[clamp(76px,11vh,118px)] left-[var(--gutter)] z-10 w-[calc(100%-2*var(--gutter))] max-w-[900px]">
        <h1 className="hero-tagline text-[clamp(3rem,8.3vw,7.7rem)] font-semibold leading-[0.94] tracking-[-0.075em] opacity-0">
          <span className="hero-fixed-line block">YOU THINK, WE BUILD.</span>
          <span
            ref={keywordsRef}
            className="hero-keyword-window relative mt-2 block min-h-[1.08em] text-[clamp(2.8rem,7.2vw,6.7rem)] text-[var(--duck)]"
          >
            {keywords.map((word) => (
              <span key={word} className="keyword-item whitespace-nowrap">
                {word}
              </span>
            ))}
          </span>
        </h1>

        <p className="hero-sub-text mt-7 max-w-[560px] text-base leading-relaxed text-black/60 opacity-0 sm:text-lg">
          Tarka takes an idea and turns it into something real. The product,
          the interface, the brand, or the film that carries it.
        </p>

        <div className="mt-7 flex flex-wrap items-center gap-3">
          <div className="hero-cta opacity-0">
            <MagneticLink href="/services" variant="primary">
              EXPLORE SERVICES
            </MagneticLink>
          </div>
          <div className="hero-cta opacity-0">
            <MagneticLink href="/quote" variant="secondary">
              START A PROJECT
            </MagneticLink>
          </div>
        </div>
      </div>

      <div className="hero-cue absolute bottom-7 right-[var(--gutter)] z-10 flex items-center gap-3 text-[10px] font-semibold uppercase tracking-[0.18em] opacity-0">
        <span>Hover the particles</span>
        <span className="h-px w-8 origin-left animate-pulse bg-[var(--duck)]" />
      </div>
    </section>
  );
}
