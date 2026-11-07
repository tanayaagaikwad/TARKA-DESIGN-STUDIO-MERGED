# TARKA DESIGN STUDIO

A unified TARKA Design Studio website combining a custom homepage with immersive animations, creative service pages, interactive domain experiences, and an automated PDF quotation builder.

Built with **React 19**, **Vite**, **TypeScript**, **Tailwind CSS 4**, **GSAP**, and **React Router 7**.

---

## Architecture & Layouts

The application utilizes a route-aware dual-layout pattern:

1. **`MainLayout` (Marketing & Editorial Pages):**
   - Light theme with Space Grotesk typography
   - Sticky navigation with brand logo, interactive drawer menu, and quick CTA
   - 11,000 particle canvas hero animation
   - GSAP page transition effects, custom cursor, and scroll progress indicator
   - Routes:
     - `/` — Homepage (Hero, Selected Partners, Our Domains, About TARKA, The World Board, Finale CTA)
     - `/about` — About Us & interactive Directors Board
     - `/founder` — Founder logic & studio philosophy
     - `/team` — Studio team showcase
     - `/clients` — Selected client engagements
     - `/work` — Project gallery
     - `/work/:project` — Dynamic case study
     - `/blog` — The World Board publications
     - `/blog/:slug` — Dynamic article view
     - `/services` — Disciplines overview with interactive accordion
     - `/services/video-generation` — AI Video Generation showcase
     - `/services/videography` — Cinematic production showcase
     - `/services/web-development` — Digital engineering stack
     - `/inquiry` — 4-step client project inquiry form
     - `/contact` — Direct redirect to `/inquiry`

2. **Standalone Domain Experiences & Quotation Builder:**
   - Dark theme (`var(--tarka-black)`) with domain-specific animations
   - Dedicated `DomainNavigation` and `DomainFooter`
   - Routes:
     - `/product` — Product Design
     - `/identity` — Graphic & Identity Design (Standalone showcase)
     - `/digital` — UI/UX & Web Design
     - `/reach` — Marketing (Attention Tunnel)
     - `/video` — Video Generation Services
     - `/photography` — Photography showcase
     - `/quote` — Interactive Quotation Builder with live price calculation and jsPDF export

---

## Development & Build

```bash
# Install dependencies
npm install

# Start local development server
npm run dev

# Run Oxlint
npm run lint

# Compile TypeScript & build production bundle
npm run build

# Preview production build locally
npm run preview
```
