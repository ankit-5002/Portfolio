import { useState, useEffect } from 'react';
import { Download } from 'lucide-react';

export default function Navbar({ onNavigate }) {
  const [isVisible, setIsVisible] = useState(true);
  const [scrolled, setScrolled] = useState(false);
  const currentPath = typeof window !== 'undefined' ? window.location.pathname : '/';

  useEffect(() => {
    let lastScroll = 0;
    let accumulatedDown = 0;
    let accumulatedUp = 0;
    let ticking = false;

    const handleScroll = () => {
      if (!ticking) {
        window.requestAnimationFrame(() => {
          const current = Math.max(0, window.scrollY);

          if (current <= 50) {
            setIsVisible(true);
            setScrolled(false);
            accumulatedDown = 0;
            accumulatedUp = 0;
          } else {
            setScrolled(true);
            const delta = current - lastScroll;

            if (delta > 0) {
              // Scrolling down
              accumulatedUp = 0;
              accumulatedDown += delta;
              if (accumulatedDown > 18) {
                setIsVisible(false);
              }
            } else if (delta < 0) {
              // Scrolling up
              accumulatedDown = 0;
              accumulatedUp += Math.abs(delta);
              if (accumulatedUp > 14) {
                setIsVisible(true);
              }
            }
          }

          lastScroll = current;
          ticking = false;
        });
        ticking = true;
      }
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const handleBrandClick = () => {
    if (window.location.pathname !== '/' && onNavigate) {
      onNavigate('/');
    }
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const handleConnectClick = (e) => {
    e.preventDefault();
    const contactSec = document.getElementById('contact');
    if (contactSec) {
      contactSec.scrollIntoView({ behavior: 'smooth' });
    } else if (onNavigate) {
      onNavigate('/');
      setTimeout(() => {
        const el = document.getElementById('contact');
        if (el) el.scrollIntoView({ behavior: 'smooth' });
      }, 150);
    }
  };

  return (
    <header className={`nav-pill-wrapper ${!isVisible ? 'nav-hidden' : ''} ${scrolled ? 'is-scrolled' : ''}`}>
      <div className="nav-island-container">
        {/* Main Glassmorphic Capsule */}
        <nav className="nav-vantara-capsule" aria-label="Main navigation">
          {/* Left Nav Options: Work, About */}
          <div className="nav-side-links nav-side-left">
            <button 
              className={`nav-vantara-link ${currentPath === '/work' ? 'active' : ''}`}
              onClick={() => onNavigate && onNavigate('/work')}
            >
              Work
            </button>
            <button 
              className={`nav-vantara-link ${currentPath === '/about' ? 'active' : ''}`}
              onClick={() => onNavigate && onNavigate('/about')}
            >
              About
            </button>
          </div>

          {/* Center Brand: ANKIT. with subtext Portfolio */}
          <div 
            className="nav-vantara-brand" 
            onClick={handleBrandClick}
            role="button"
            tabIndex={0}
            onKeyDown={(e) => e.key === 'Enter' && handleBrandClick()}
            title="Home"
          >
            <div className="nav-brand-main">
              <span className="nav-brand-text">ANKIT</span>
              <span className="nav-brand-dot">.</span>
            </div>
            <div className="nav-brand-sub">Portfolio</div>
          </div>

          {/* Right Nav Options: Atelier, Connect */}
          <div className="nav-side-links nav-side-right">
            <button 
              className={`nav-vantara-link ${currentPath === '/atelier' ? 'active' : ''}`}
              onClick={() => onNavigate && onNavigate('/atelier')}
            >
              Atelier
            </button>
            <button 
              className="nav-vantara-link"
              onClick={handleConnectClick}
            >
              Connect
            </button>
          </div>
        </nav>

        {/* Separate Resume Pill outside the navbar */}
        <a 
          href="/resume.pdf"
          download="Ankit_Kumar_Resume.pdf"
          className="nav-resume-separate-pill"
          aria-label="Download Resume"
        >
          <span>Resume</span>
          <Download size={14} className="nav-resume-icon" />
        </a>
      </div>
    </header>
  );
}
