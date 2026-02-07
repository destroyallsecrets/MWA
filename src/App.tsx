import React from 'react';
import { BrowserRouter as Router, Routes, Route, Link, useLocation } from 'react-router-dom';
import { AnimatePresence } from 'framer-motion';
import Home from './pages/Home';
import DesignSystem from './pages/DesignSystem';
import Contact from './pages/Contact';
import ProjectDetail from './pages/ProjectDetail';
import Archive from './pages/Archive';
import ReportViewer from './pages/ReportViewer';
import { siteConfig } from './config/site';
import { SmoothScroll } from './components/SmoothScroll';
import { Experience3D } from './components/Experience3D';
import { ErrorBoundary } from './components/ErrorBoundary';
import { PageTransition } from './components/PageTransition';

const AnimatedRoutes = () => {
  const location = useLocation();

  return (
    <AnimatePresence mode="wait">
      <Routes location={location} key={location.pathname}>
        <Route path="/" element={<PageTransition><Home /></PageTransition>} />
        <Route path="/design-system" element={<PageTransition><DesignSystem /></PageTransition>} />
        <Route path="/contact" element={<PageTransition><Contact /></PageTransition>} />
        <Route path="/archive" element={<PageTransition><Archive /></PageTransition>} />
        <Route path="/report/v1-arch-rev" element={<PageTransition><ReportViewer /></PageTransition>} />
        <Route path="/project/:projectId" element={<PageTransition><ProjectDetail /></PageTransition>} />
      </Routes>
    </AnimatePresence>
  );
};

const App: React.FC = () => {
  return (
    <Router>
      <SmoothScroll>
        <div className="min-h-screen bg-primary text-white font-sans relative">

          {/* LAYER 0: 3D VOID (Fixed) */}
          <ErrorBoundary>
            <Experience3D />
          </ErrorBoundary>

          {/* LAYER 1: FILM GRAIN (Fixed, Pointer-None) */}
          <div className="noise-overlay" style={{ zIndex: 20 }} />

          {/* LAYER 2: NAVIGATION (Fixed, Mix-Blend) */}
          <nav className="fixed top-0 left-0 w-full p-6 flex justify-between items-center z-50 pointer-events-none">
             <Link to="/" className="font-bold tracking-tighter text-xl pointer-events-auto cursor-pointer hover:text-accent transition-colors text-white mix-blend-difference">
               {siteConfig.shortName}
             </Link>
             <div className="hidden md:flex gap-8 text-xs font-bold tracking-widest pointer-events-auto mix-blend-difference">
                <Link to="/" className="hover:text-accent transition-colors text-white uppercase">Work</Link>
                <Link to="/archive" className="hover:text-accent transition-colors text-white uppercase">Archive</Link>
                <Link to="/design-system" className="hover:text-accent transition-colors text-white uppercase">System</Link>
                <Link to="/contact" className="hover:text-accent transition-colors text-white uppercase">Contact</Link>
             </div>
          </nav>

          {/* LAYER 3: CONTENT (Relative, In-Flow) */}
          <main className="relative z-30 w-full min-h-screen">
            <ErrorBoundary>
              <AnimatedRoutes />
            </ErrorBoundary>
          </main>

        </div>
      </SmoothScroll>
    </Router>
  );
};

export default App;