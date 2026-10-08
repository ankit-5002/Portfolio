import { useState, useEffect, useRef } from 'react';
import heroNameImg from '../assets/I’m Ankit Kumar.png';

const CARES_ABOUT = ['design.', 'accessibility.', 'performance.', 'humans.'];

export default function Hero({ onNavigate }) {
  const [hoveredNav, setHoveredNav] = useState(null);
  const [wordIndex, setWordIndex] = useState(0);
  const [isChanging, setIsChanging] = useState(false);

  const [wordWidth, setWordWidth] = useState(0);
  const measureRef = useRef(null);

  useEffect(() => {
    const reducedMotion = matchMedia('(prefers-reduced-motion: reduce)').matches;
    let wordInterval;
    if (!reducedMotion) {
      wordInterval = setInterval(() => {
        setIsChanging(true);
        setTimeout(() => {
          setWordIndex(prev => (prev + 1) % CARES_ABOUT.length);
          setIsChanging(false);
        }, 280);
      }, 2500);
    }
    return () => clearInterval(wordInterval);
  }, []);

  useEffect(() => {
    if (measureRef.current) {
      setWordWidth(measureRef.current.offsetWidth);
    }
  }, [wordIndex, isChanging]);

  return (
    <section 
      id="hero" 
      style={{
        minHeight: '100vh',
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: '#EBE4D4', // Theme cream background
        color: '#240605',
        position: 'relative',
        padding: '0 2rem'
      }}
    >
      
      {/* Main Typography Centered */}
      <div style={{ textAlign: 'center', marginTop: '12vh' }}>
        <img 
          src={heroNameImg} 
          alt="I'm Ankit Kumar" 
          style={{
            width: '80vw',
            maxWidth: '900px',
            height: 'auto',
            maxHeight: '50vh',
            objectFit: 'contain'
          }} 
        />
        
        <p style={{
          fontFamily: "var(--disp), serif",
          fontSize: 'clamp(1.5rem, 3vw, 28px)',
          fontWeight: 500,
          lineHeight: '41px',
          margin: '0.25rem 0 0 0',
          color: '#240605'
        }}>
          an engineer who cares about{' '}
          <span style={{ 
            display: 'inline-block', 
            width: wordWidth ? `${wordWidth}px` : 'auto', 
            transition: 'width 0.28s cubic-bezier(0.4, 0, 0.2, 1)', 
            whiteSpace: 'nowrap',
            verticalAlign: 'bottom',
            overflow: 'hidden'
          }}>
            <strong
              ref={measureRef}
              style={{
                display: 'inline-block',
                opacity: isChanging ? 0 : 1,
                transition: 'opacity 0.28s ease, transform 0.28s ease',
                transform: !isChanging ? 'translateY(0)' : 'translateY(4px)',
                fontWeight: 700
              }}
            >
              {CARES_ABOUT[wordIndex]}
            </strong>
          </span>
        </p>
      </div>

      {/* Scroll indicator */}
      <div style={{
        position: 'absolute',
        bottom: '2rem',
        left: '50%',
        transform: 'translateX(-50%)',
        display: 'flex',
        alignItems: 'center',
        gap: '0.5rem',
        fontFamily: 'var(--body), sans-serif',
        fontSize: '1rem',
        color: '#888888',
        animation: 'bounce 2s infinite'
      }}>
        <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
          <line x1="12" y1="5" x2="12" y2="19"></line>
          <polyline points="19 12 12 19 5 12"></polyline>
        </svg>
        <span>scroll to explore</span>
      </div>

      <style>{`
        @keyframes bounce {
          0%, 20%, 50%, 80%, 100% { transform: translate(-50%, 0); }
          40% { transform: translate(-50%, -10px); }
          60% { transform: translate(-50%, -5px); }
        }
      `}</style>
    </section>
  );
}
