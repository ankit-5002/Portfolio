import { useState, useEffect } from 'react';
import { Menu, Home } from 'lucide-react';
import faceIcon from '../assets/face_icon.png';

export default function Navbar({ onOpenMenu, onNavigate }) {
  const [scrolled, setScrolled] = useState(false);

  const [theme, setTheme] = useState('dark');

  useEffect(() => {
    let ticking = false;

    const handleScroll = () => {
      if (!ticking) {
        window.requestAnimationFrame(() => {
          setScrolled(window.scrollY > 150);

          // Determine theme based on background color under the navbar
          const elements = document.elementsFromPoint(window.innerWidth / 2, 58);
          let bg = '';
          if (elements) {
            for (let el of elements) {
              if (el.tagName === 'NAV' || el.closest('.nav-pill-wrapper')) continue;
              const style = window.getComputedStyle(el);
              if (style.backgroundColor && style.backgroundColor !== 'rgba(0, 0, 0, 0)' && style.backgroundColor !== 'transparent') {
                bg = style.backgroundColor;
                break;
              }
            }
          }

          if (!bg) {
            bg = window.getComputedStyle(document.body).backgroundColor;
          }

          const match = bg.match(/\d+/g);
          if (match && match.length >= 3) {
            const r = parseInt(match[0]);
            const g = parseInt(match[1]);
            const b = parseInt(match[2]);
            const brightness = (r * 299 + g * 587 + b * 114) / 1000;
            // If background is bright (> 125), we need a dark navbar.
            // If background is dark (< 125), we need a light navbar.
            setTheme(brightness > 125 ? 'dark' : 'light');
          }

          ticking = false;
        });
        ticking = true;
      }
    };
    window.addEventListener('scroll', handleScroll, { passive: true });
    handleScroll();
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <>
      {/* Floating Pill Nav */}
      <div className="nav-pill-wrapper" style={{
        position: 'fixed',
        top: '30px',
        left: '50%',
        transform: `translate(-50%, ${scrolled ? '0' : '-100px'}) scale(${scrolled ? 1 : 0.9})`,
        opacity: scrolled ? 1 : 0,
        transition: 'transform 0.5s cubic-bezier(0.16, 1, 0.3, 1), opacity 0.5s',
        zIndex: 100,
        display: 'flex',
        alignItems: 'center',
        pointerEvents: scrolled ? 'auto' : 'none'
      }}>
        <div style={{
          display: 'flex',
          alignItems: 'center',
          backgroundColor: theme === 'dark' ? 'rgba(36, 6, 5, 0.85)' : 'rgba(235, 228, 212, 0.85)',
          backdropFilter: 'blur(12px)',
          WebkitBackdropFilter: 'blur(12px)',
          border: theme === 'dark' ? '1px solid rgba(235, 228, 212, 0.3)' : '1px solid rgba(36, 6, 5, 0.3)',
          borderRadius: '50px',
          padding: '4px 24px 4px 6px',
          height: '46px',
          gap: '16px',
          boxShadow: '0 10px 30px rgba(0,0,0,0.3), 0 0 0 1px rgba(0,0,0,0.5)',
          transition: 'background-color 0.6s ease-in-out, border-color 0.6s ease-in-out'
        }}>
          {/* Face Icon */}
          <div 
            onClick={() => {
              if (window.location.pathname !== '/' && onNavigate) {
                onNavigate('/');
              }
              window.scrollTo({top: 0, behavior: 'smooth'});
            }}
            style={{
              width: '34px',
              height: '34px',
              cursor: 'pointer',
              flexShrink: 0
            }}
          >
            <img src={faceIcon} alt="Home" style={{ width: '100%', height: '100%', objectFit: 'contain', filter: theme === 'light' ? 'invert(1)' : 'none', transition: 'filter 0.6s ease-in-out' }} />
          </div>

          {/* Links */}
          <div style={{ display: 'flex', gap: '20px' }}>
            <button className={`nav-pill-btn ${theme}`} onClick={() => onNavigate && onNavigate('/work')}>Work</button>
            <button className={`nav-pill-btn ${theme}`} onClick={() => onNavigate && onNavigate('/about')}>About</button>
            <button className={`nav-pill-btn ${theme}`} onClick={() => onNavigate && onNavigate('/atelier')}>Atelier</button>
            <button className={`nav-pill-btn ${theme}`} onClick={() => {
              const contactSec = document.getElementById('contact');
              if (contactSec) contactSec.scrollIntoView({ behavior: 'smooth' });
              else if (onNavigate) onNavigate('/');
            }}>Connect</button>
          </div>
        </div>
      </div>

      {/* Default mobile menu button (only visible when NOT scrolled) */}
      <div className="mobile-header-btn" style={{
        opacity: scrolled ? 0 : 1,
        transition: 'opacity 0.3s',
        pointerEvents: scrolled ? 'none' : 'auto'
      }}>
        <button 
          className="mobile-menu-trigger" 
          onClick={onOpenMenu} 
          aria-label="Open navigation menu"
        >
          <Menu size={22} />
        </button>
      </div>
    </>
  );
}

