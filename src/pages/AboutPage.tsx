import DirectorsBoard from '@/components/about/DirectorsBoard';
import { useDocumentTitle } from '@/hooks/useDocumentTitle';

export default function AboutPage() {
  useDocumentTitle('About Us');
  return (
    <main className="about-page">
      <section className="about-hero">
        <p> TARKA DESIGN STUDIO / ABOUT US </p>
        <h1>
          We turn thoughts
          <br />
          into something real.
        </h1>
      </section>

      <DirectorsBoard />
    </main>
  );
}
