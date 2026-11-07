import { useEffect } from 'react';
import { Outlet } from 'react-router-dom';
import Navbar from '../components/Navbar';
import Footer from '../components/Footer';
import CustomCursor from '../components/CustomCursor';
import Loader from '../components/Loader';
import ScrollProgress from '../components/ScrollProgress';
import PageTransition from '../components/PageTransition';

export default function MainLayout() {
  useEffect(() => {
    document.body.classList.add('tarka-marketing-body');
    return () => {
      document.body.classList.remove('tarka-marketing-body');
    };
  }, []);

  return (
    <div className="tarka-marketing-theme flex flex-col min-h-screen">
      <CustomCursor />
      <Loader />
      <ScrollProgress />
      <Navbar />
      <main className="flex-grow flex flex-col">
        <PageTransition>
          <Outlet />
        </PageTransition>
      </main>
      <Footer />
    </div>
  );
}
