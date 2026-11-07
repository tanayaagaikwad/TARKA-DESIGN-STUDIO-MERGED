import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";

// Utilities
import ScrollToTop from "./components/ScrollToTop";

// Layouts
import MainLayout from "./layouts/MainLayout";

// Tanaya's Marketing & Editorial Pages
import HomePage from "./pages/HomePage";
import AboutPage from "./pages/AboutPage";
import FounderPage from "./pages/FounderPage";
import TeamPage from "./pages/TeamPage";
import ClientsPage from "./pages/ClientsPage";
import WorkPage from "./pages/WorkPage";
import WorkProjectPage from "./pages/WorkProjectPage";
import BlogPage from "./pages/BlogPage";
import BlogPostPage from "./pages/BlogPostPage";
import ServicesPage from "./pages/ServicesPage";
import VideoGenerationPage from "./pages/services/VideoGenerationPage";
import VideographyPage from "./pages/services/VideographyPage";
import WebDevelopmentPage from "./pages/services/WebDevelopmentPage";
import InquiryPage from "./pages/InquiryPage";

// Pranali's Domain Pages & Quotation Builder
import DomainPage from "./pages/DomainPage";
import QuotePage from "./pages/QuotePage";

import "./App.css";

function App() {
  return (
    <BrowserRouter>
      <ScrollToTop />
      <Routes>
        {/* Tanaya's Pages with Marketing Navbar, Footer, CustomCursor, ScrollProgress & PageTransition */}
        <Route element={<MainLayout />}>
          <Route path="/" element={<HomePage />} />
          <Route path="/about" element={<AboutPage />} />
          <Route path="/founder" element={<FounderPage />} />
          <Route path="/team" element={<TeamPage />} />
          <Route path="/clients" element={<ClientsPage />} />
          <Route path="/work" element={<WorkPage />} />
          <Route path="/work/:project" element={<WorkProjectPage />} />
          <Route path="/blog" element={<BlogPage />} />
          <Route path="/blog/:slug" element={<BlogPostPage />} />
          <Route path="/services" element={<ServicesPage />} />
          <Route path="/services/video-generation" element={<VideoGenerationPage />} />
          <Route path="/services/videography" element={<VideographyPage />} />
          <Route path="/services/web-development" element={<WebDevelopmentPage />} />
          <Route path="/inquiry" element={<InquiryPage />} />
          <Route path="/contact" element={<Navigate to="/inquiry" replace />} />
        </Route>

        {/* Pranali's Domain Pages with DomainNavigation & DomainFooter */}
        <Route
          path="/product"
          element={<DomainPage domainId="product-design" />}
        />
        <Route
          path="/identity"
          element={<DomainPage domainId="graphic-design" />}
        />
        <Route
          path="/digital"
          element={<DomainPage domainId="uiux-web" />}
        />
        <Route
          path="/reach"
          element={<DomainPage domainId="marketing" />}
        />
        <Route
          path="/video"
          element={<DomainPage domainId="video-generation" />}
        />
        <Route
          path="/photography"
          element={<DomainPage domainId="photography" />}
        />

        {/* Pranali's Quotation Builder & PDF Generator */}
        <Route path="/quote" element={<QuotePage />} />

        {/* Fallback route */}
        <Route path="*" element={<Navigate to="/" replace />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
