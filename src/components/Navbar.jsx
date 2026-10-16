import { useState, useEffect, useRef } from 'react';
import { Download, Menu } from 'lucide-react';
import faceIcon from '../assets/face_icon.png';

export default function Navbar({ onOpenMenu, onNavigate }) {
  const [isVisible, setIsVisible] = useState(true);
  const [scrolled, setScrolled] = useState(false);
  const lastScrollY = useRef(0);
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
      <nav className="nav-pill-capsule" aria-label="Main navigation">
        {/* Left Side: Face Logo + Brand Name */}
        <div 
          className="nav-brand-side"
          onClick={handleBrandClick}
          role="button"
          tabIndex={0}
          onKeyDown={(e) => e.key === 'Enter' && handleBrandClick()}
          title="Ankit Kumar — Home"
        >
          <img src={faceIcon} alt="Ankit Logo" className="nav-face-icon" />
          <span className="nav-brand-title">Ankit Kumar</span>
        </div>

        {/* Right Side: Navigation Links & Resume Action Button */}
        <div className="nav-links-cluster">
          <button 
            className={`nav-text-link ${currentPath === '/work' ? 'active' : ''}`}
            onClick={() => onNavigate && onNavigate('/work')}
          >
            Work
          </button>
          <button 
            className={`nav-text-link ${currentPath === '/about' ? 'active' : ''}`}
            onClick={() => onNavigate && onNavigate('/about')}
          >
            About
          </button>
          <button 
            className={`nav-text-link ${currentPath === '/atelier' ? 'active' : ''}`}
            onClick={() => onNavigate && onNavigate('/atelier')}
          >
            Atelier
          </button>
          <button 
            className="nav-text-link"
            onClick={handleConnectClick}
          >
            Connect
          </button>

          <a 
            href="/resume.pdf"
            download="Ankit_Kumar_Resume.pdf"
            className="nav-talk-pill-btn"
            aria-label="Download Resume"
          >
            <span>Resume</span>
            <Download size={14} className="nav-talk-arrow" />
          </a>
        </div>

        {/* Mobile Controls Tray */}
        <div className="nav-mobile-tray">
          <a 
            href="/resume.pdf"
            download="Ankit_Kumar_Resume.pdf"
            className="nav-talk-pill-btn mobile-compact"
            aria-label="Download Resume"
          >
            <span>Resume</span>
            <Download size={13} className="nav-talk-arrow" />
          </a>
          <button 
            className="nav-mobile-hamburger" 
            onClick={onOpenMenu}
            aria-label="Open navigation menu"
          >
            <Menu size={18} />
          </button>
        </div>
      </nav>
    </header>
  );
}


