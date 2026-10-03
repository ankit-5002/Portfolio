import { useState, useEffect, useRef } from 'react';
import heroImg from '../assets/hero.png';
import aboutIcon from '../assets/about_icon.png';
import workIcon from '../assets/work_icon.png';
import journeyIcon from '../assets/journey_icon.png';
import atelierIcon from '../assets/atelier_icon.png';
import connectIcon from '../assets/connect_icon.png';
import linkedinIcon from '../assets/linkedin_icon.png';
import githubIcon from '../assets/github_icon.png';
import mailIcon from '../assets/mail_icon.png';
import faceIcon from '../assets/face_icon.png';

const WORDS = ['maintainable', 'scalable', 'intelligent', 'deployed'];

const NAV_ITEMS = [
  { id: 'work', label: 'work', href: '/work', path: '/work', icon: workIcon },
  { id: 'about', label: 'about', href: '/about', path: '/about', icon: aboutIcon },
  { id: 'atelier', label: 'atelier', href: '/atelier', path: '/atelier', icon: atelierIcon },
  { id: 'connect', label: 'connect', href: '#contact', icon: connectIcon },
];

export default function Hero({ onNavigate }) {
  const [wordIndex, setWordIndex] = useState(0);
  const [isChanging, setIsChanging] = useState(false);
  const [currentTime, setCurrentTime] = useState('');

  const [hoveredNav, setHoveredNav] = useState(null);
  const [floatingPos, setFloatingPos] = useState(null);

  const heroRef = useRef(null);
  const bottomPageRef = useRef(null);
  const note1Ref = useRef(null);
  const note2Ref = useRef(null);
  const note3Ref = useRef(null);

  const navContainerRef = useRef(null);
  const navItemRefs = useRef({});

  const handleNavClick = (e, item) => {
    if (item.path && onNavigate) {
      e.preventDefault();
      onNavigate(item.path);
    }
  };

  useEffect(() => {
    if (hoveredNav && navItemRefs.current[hoveredNav] && navContainerRef.current) {
      const containerRect = navContainerRef.current.getBoundingClientRect();
      const itemRect = navItemRefs.current[hoveredNav].getBoundingClientRect();
      setFloatingPos({
        left: itemRect.left - containerRect.left + itemRect.width / 2,
        width: itemRect.width,
      });
    }
  }, [hoveredNav]);

  useEffect(() => {
    // Dynamic word cycler
    const reducedMotion = matchMedia('(prefers-reduced-motion: reduce)').matches;
    let wordInterval;
    if (!reducedMotion) {
      wordInterval = setInterval(() => {
        setIsChanging(true);
        setTimeout(() => {
          setWordIndex(prev => (prev + 1) % WORDS.length);
          setIsChanging(false);
        }, 280);
      }, 2000);
    }

    // Live clock
    const updateClock = () => {
      const now = new Date().toLocaleTimeString('en-GB', { hour12: false });
      setCurrentTime(now);
    };
    updateClock();
    const clockInterval = setInterval(updateClock, 1000);

    // Scroll listener for card fan-out (split) animation
    let animFrame;
    const handleScroll = () => {
      if (!bottomPageRef.current) return;
      const rect = bottomPageRef.current.getBoundingClientRect();
      const windowH = window.innerHeight;

      // Progress goes from 0 when beliefs section enters bottom of viewport up to 1 when near center
      const start = windowH * 0.95;
      const end = windowH * 0.35;
      let progress = (start - rect.top) / (start - end);
      progress = Math.max(0, Math.min(1, progress));

      // Ease out cubic
      const p = 1 - Math.pow(1 - progress, 3);

      if (note1Ref.current && note2Ref.current && note3Ref.current) {
        // Initial stacked position: centered on top of each other
        // Note 1 (ruled - top left in spread layout): moves from center (x: +150px, y: +60px, rot: 2deg) -> (x: 0, y: 0, rot: -4deg)
        const n1X = (1 - p) * 160;
        const n1Y = (1 - p) * 70;
        const n1Rot = (1 - p) * 2 + p * -4;

        // Note 2 (grid - top right in spread layout): moves from center (x: -160px, y: +90px, rot: 2deg) -> (x: 0, y: 0, rot: 8deg)
        const n2X = (1 - p) * -160;
        const n2Y = (1 - p) * 95;
        const n2Rot = (1 - p) * 2 + p * 8;

        // Note 3 (plain - bottom center in spread layout): stays centered, moves from (y: -140px, rot: 2deg) -> (y: 0, rot: -1deg)
        const n3Y = (1 - p) * -150;
        const n3Rot = (1 - p) * 2 + p * -1;

        note1Ref.current.style.transform = `translate(${n1X}px, ${n1Y}px) rotate(${n1Rot}deg)`;
        note2Ref.current.style.transform = `translate(${n2X}px, ${n2Y}px) rotate(${n2Rot}deg)`;
        note3Ref.current.style.transform = `translate(${n3Y}px) rotate(${n3Rot}deg)`;
      }
    };

    const onScroll = () => {
      if (animFrame) cancelAnimationFrame(animFrame);
      animFrame = requestAnimationFrame(handleScroll);
    };

    window.addEventListener('scroll', onScroll, { passive: true });
    handleScroll();

    return () => {
      if (wordInterval) clearInterval(wordInterval);
      clearInterval(clockInterval);
      window.removeEventListener('scroll', onScroll);
      if (animFrame) cancelAnimationFrame(animFrame);
    };
  }, []);

  return (
    <section id="hero" className="in" ref={heroRef}>
      <div className="wrap">
        {/* Navigation options placed right above the top border of the notebook cover */}
        <div className="hero-inline-nav" onMouseLeave={() => setHoveredNav(null)}>
          <img src={faceIcon} alt="" className="nav-lead-face" aria-hidden="true" />
          <nav className="nav-links" ref={navContainerRef}>
            {/* Sliding floating badge */}
            <div 
              className={`nav-floating-badge ${hoveredNav ? 'active' : ''} ${hoveredNav === 'connect' ? 'is-connect' : ''}`}
              style={floatingPos ? { left: `${floatingPos.left}px` } : {}}
            >
              {hoveredNav === 'connect' ? (
                <div className="connect-stack-wrapper">
                  <img src={faceIcon} alt="" className="connect-face-icon" aria-hidden="true" />
                  <div className="connect-social-column">
                    <a href="https://linkedin.com/in/ankitkumar" target="_blank" rel="noopener noreferrer" className="social-icon-btn" data-label="LinkedIn">
                      <img src={linkedinIcon} alt="LinkedIn" className="stack-icon stack-in" />
                      <span className="social-tooltip">LinkedIn</span>
                    </a>
                    <a href="mailto:contact@ankit.dev" className="social-icon-btn" data-label="Email">
                      <img src={mailIcon} alt="Email" className="stack-icon stack-x" />
                      <span className="social-tooltip">Email</span>
                    </a>
                    <a href="https://github.com/ankitkumar" target="_blank" rel="noopener noreferrer" className="social-icon-btn" data-label="GitHub">
                      <img src={githubIcon} alt="GitHub" className="stack-icon stack-gh" />
                      <span className="social-tooltip">GitHub</span>
                    </a>
                  </div>
                </div>
              ) : (
                <img 
                  src={NAV_ITEMS.find(item => item.id === hoveredNav)?.icon || aboutIcon} 
                  alt="" 
                  className="floating-icon-img" 
                  aria-hidden="true" 
                />
              )}
            </div>

            {NAV_ITEMS.map((item) => (
              <a 
                key={item.id}
                ref={(el) => (navItemRefs.current[item.id] = el)}
                className={`nav-link ${hoveredNav === item.id ? 'is-hovered' : ''}`} 
                href={item.href}
                onClick={(e) => handleNavClick(e, item)}
                onMouseEnter={() => setHoveredNav(item.id)}
              >
                {item.label}
                <svg className="circ" viewBox="0 0 100 40" preserveAspectRatio="none" aria-hidden="true">
                  <path d="M 6,22 C 4,8 24,4 50,4 C 80,4 96,10 96,20 C 96,32 72,36 46,36 C 18,36 4,28 6,18 C 8,8 32,5 62,5 C 84,5 98,9 98,16" pathLength="1" />
                </svg>
              </a>
            ))}
          </nav>
        </div>

        <div className="nb-cover">
          <span className="ribbon--tail" aria-hidden="true"></span>
          <div className="notebook">
            {/* Top half page of notebook — FLAT, NO ANIMATION */}
            <div className="nb-grid">
              <div className="nb-left">
                <p className="sig">
                  ANKIT KUMAR
                  <svg viewBox="0 0 150 24" className="doodle doodle--p-acc" aria-hidden="true">
                    <path pathLength="1" d="M4 15 C 45 5, 105 5, 146 13" />
                  </svg>
                </p>
                <p className="nb-role">AI/ML ENGINEER &amp; SOFTWARE ENGINEER</p>

                <h1 className="nb-state">
                  Designed to<br />
                  <span className="hero-phrase">
                    <span className="hero-static">be </span>
                    <span
                      className={`nb-hand ${isChanging ? 'is-changing' : ''}`}
                      id="hero-word"
                      aria-live="polite"
                      aria-atomic="true"
                    >
                      {WORDS[wordIndex]}
                    </span>
                  </span>
                </h1>

                <p className="nb-loc">India <b>·</b> GMT +5:30</p>

                <div className="nb-meta">
                  <span>INDIA · OPEN TO RELOCATE</span>
                  <span>LOCAL <b id="nb-clock">{currentTime || '--:--:--'}</b></span>
                  <span>
                    <span className="blink"></span>OPEN TO 2026 ROLES
                  </span>
                </div>
              </div>

              <div className="nb-right">
                <div className="frame-red" id="fig">
                  <div className="hero-scene hero-scene--img">
                    <img src={heroImg} alt="Hero illustration" className="hero-png-img" />
                  </div>
                </div>
              </div>
            </div>

            {/* Bottom half page — OPENS / LIFTS IN 3D AS YOU SCROLL */}
            <div className="nb-page-next" id="beliefs" ref={bottomPageRef}>
              <p className="nb-page-kicker">3 things i strongly believe in</p>
              <div className="nb-belief-stack">
                <div className="nb-note nb-note--ruled" ref={note1Ref}>
                  Tirelessly<br />refactoring<br /><b>endpoints.</b>
                </div>
                <div className="nb-note nb-note--grid" ref={note2Ref}>
                  Minimizing<br />model<br /><b>latency.</b>
                </div>
                <div className="nb-note nb-note--plain" ref={note3Ref}>
                  Engineering for<br /><b>scale, precision &amp; craft.</b>
                </div>
              </div>
            </div>

            {/* linocut-style flowers */}
            <svg className="nb-flowers doodle doodle--p-acc" viewBox="0 0 120 110" aria-hidden="true">
              <path pathLength="1" d="M28 104 q-4 -26 6 -44" />
              <circle pathLength="1" cx="36" cy="52" r="6" />
              <circle pathLength="1" cx="26" cy="46" r="5" />
              <circle pathLength="1" cx="46" cy="46" r="5" />
              <circle pathLength="1" cx="30" cy="60" r="5" />
              <circle pathLength="1" cx="42" cy="60" r="5" />
              <path pathLength="1" d="M64 106 q10 -22 4 -40" />
              <circle pathLength="1" cx="66" cy="58" r="5" />
              <circle pathLength="1" cx="57" cy="53" r="4" />
              <circle pathLength="1" cx="75" cy="53" r="4" />
              <circle pathLength="1" cx="60" cy="66" r="4" />
              <circle pathLength="1" cx="72" cy="66" r="4" />
              <path pathLength="1" d="M92 106 q2 -18 -4 -30" />
              <circle pathLength="1" cx="88" cy="72" r="4.5" />
            </svg>

            <div className="nb-foot">
              <a className="nb-believe" href="#beliefs">four things i strongly believe in</a>
              <span className="nb-stamp">NO FRAMEWORKS · ONE FILE · SHIPPED WITH CARE</span>
            </div>
          </div>
        </div>

        {/* chalk doodles */}
        <svg className="float-doodle doodle doodle--chalk d-jice" viewBox="0 0 64 72" aria-hidden="true">
          <path pathLength="1" d="M10 18 h44 v34 h-44 z" />
          <path pathLength="1" d="M10 27 h44 M17 22 h2 M23 22 h2 M29 22 h2" />
          <path pathLength="1" d="M18 37 l7 6 l10 -10 M18 48 h21" />
        </svg>
        <svg className="float-doodle doodle doodle--chalk d-ramen" viewBox="0 0 76 56" aria-hidden="true">
          <circle pathLength="1" cx="38" cy="28" r="19" />
          <circle pathLength="1" cx="28" cy="25" r="3" />
          <circle pathLength="1" cx="48" cy="25" r="3" />
          <path pathLength="1" d="M28 35 q10 8 20 0 M38 9 V3 M33 5 h10 M19 13 l-6 -6 M57 13 l6 -6" />
          <path pathLength="1" d="M9 48 C20 40 25 39 32 43 M44 43 C51 39 57 40 67 48" />
        </svg>
        <svg className="float-doodle doodle doodle--chalk d-god" viewBox="0 0 60 52" aria-hidden="true">
          <path pathLength="1" d="M10 17 h40 v27 h-40 z" />
          <path pathLength="1" d="M10 17 l8 -8 l8 8 l8 -8 l8 8 l8 -8" />
          <circle pathLength="1" cx="22" cy="29" r="3" />
          <circle pathLength="1" cx="38" cy="29" r="3" />
          <path pathLength="1" d="M22 38 h16 M15 50 h30" />
        </svg>
      </div>
    </section>
  );
}
