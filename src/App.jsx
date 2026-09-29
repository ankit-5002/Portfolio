import { useState, useEffect, useRef } from 'react';
import BackgroundElements from './components/BackgroundElements';
import Preloader from './components/Preloader';
import CustomCursor from './components/CustomCursor';
import Navbar from './components/Navbar';
import MobileMenu from './components/MobileMenu';
import Hero from './components/Hero';
import About from './components/About';
import ProjectsShowcase from './components/ProjectsShowcase';
import Skills from './components/Skills';
import CuttingMatBoard from './components/CuttingMatBoard';
import FeaturedProjectsStack from './components/FeaturedProjectsStack';


import Contact from './components/Contact';
import Footer from './components/Footer';
import Toast from './components/Toast';

import WorkPage from './pages/WorkPage';
import JourneyPage from './pages/JourneyPage';
import AtelierPage from './pages/AtelierPage';

import './index.css';


const clamp = (v, a, b) => Math.max(a, Math.min(b, v));

export default function App() {
  const [currentPath, setCurrentPath] = useState(window.location.pathname);
  const [menuOpen, setMenuOpen] = useState(false);
  const [toastMsg, setToastMsg] = useState('');
  const [toastVisible, setToastVisible] = useState(false);
  const toastTimerRef = useRef(null);
  const progressBarRef = useRef(null);

  const navigate = (path) => {
    window.history.pushState({}, '', path);
    setCurrentPath(path);
    window.scrollTo(0, 0);
  };

  useEffect(() => {
    const handlePopState = () => {
      setCurrentPath(window.location.pathname);
    };
    window.addEventListener('popstate', handlePopState);
    return () => window.removeEventListener('popstate', handlePopState);
  }, []);

  const showToast = msg => {
    setToastMsg(msg);
    setToastVisible(true);
    if (toastTimerRef.current) clearTimeout(toastTimerRef.current);
    toastTimerRef.current = setTimeout(() => {
      setToastVisible(false);
    }, 2400);
  };

  useEffect(() => {
    // Scroll progress bar
    const handleScroll = () => {
      const y = window.scrollY;
      const h = document.documentElement;
      const maxScroll = h.scrollHeight - window.innerHeight;
      const progress = maxScroll > 0 ? clamp(y / maxScroll, 0, 1) : 0;
      if (progressBarRef.current) {
        progressBarRef.current.style.transform = `scaleX(${progress})`;
      }
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    handleScroll();

    // Magnetic buttons hook for fine pointer
    const isFinePointer = matchMedia('(hover:hover) and (pointer:fine)').matches;
    const handleMagMove = e => {
      const el = e.currentTarget;
      const r = el.getBoundingClientRect();
      el.style.transform = `translate(${(e.clientX - r.left - r.width / 2) * 0.22}px, ${(e.clientY - r.top - r.height / 2) * 0.32
        }px)`;
    };

    const handleMagLeave = e => {
      e.currentTarget.style.transform = '';
    };

    let magElements = [];
    if (isFinePointer) {
      magElements = [...document.querySelectorAll('.mag')];
      magElements.forEach(el => {
        el.addEventListener('mousemove', handleMagMove);
        el.addEventListener('mouseleave', handleMagLeave);
      });
    }

    return () => {
      window.removeEventListener('scroll', handleScroll);
      if (toastTimerRef.current) clearTimeout(toastTimerRef.current);
      if (isFinePointer) {
        magElements.forEach(el => {
          el.removeEventListener('mousemove', handleMagMove);
          el.removeEventListener('mouseleave', handleMagLeave);
        });
      }
    };
  }, []);

  const renderContent = () => {
    if (currentPath === '/work') {
      return <WorkPage onNavigate={navigate} />;
    }
    if (currentPath === '/journey') {
      return <JourneyPage onNavigate={navigate} />;
    }
    if (currentPath === '/atelier') {
      return <AtelierPage onNavigate={navigate} />;
    }

    return (
      <>
        <main id="top">
          <Hero onNavigate={navigate} />
          <About />
          <Skills />
          <FeaturedProjectsStack />
          <CuttingMatBoard />


          <Contact onShowToast={showToast} />
        </main>
        <Footer />
      </>
    );
  };

  return (
    <>
      <BackgroundElements />
      <Preloader />
      <CustomCursor />
      <div id="progress" ref={progressBarRef}></div>

      <Navbar onOpenMenu={() => setMenuOpen(true)} />
      <MobileMenu isOpen={menuOpen} onClose={() => setMenuOpen(false)} onNavigate={navigate} />

      {renderContent()}

      <Toast message={toastMsg} visible={toastVisible} />
    </>
  );
}
