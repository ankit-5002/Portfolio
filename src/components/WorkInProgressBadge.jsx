import React from 'react';

export default function WorkInProgressBadge() {
  return (
    <div style={{
      position: 'fixed',
      top: 0,
      right: '60px',
      zIndex: 9999,
      display: 'flex',
      flexDirection: 'column',
      alignItems: 'center',
      pointerEvents: 'none',
      transformOrigin: 'top center',
      animation: 'badgeSwing 6s ease-in-out infinite'
    }}>
      {/* Nail */}
      <div style={{
        width: '10px',
        height: '10px',
        backgroundColor: '#111',
        borderRadius: '50%',
        boxShadow: '0 2px 4px rgba(0,0,0,0.5), inset 0 1px 2px rgba(255,255,255,0.3)',
        marginTop: '8px',
        position: 'relative',
        zIndex: 2
      }} />

      {/* Strings (SVG) */}
      <svg width="60" height="30" style={{ marginTop: '-5px', zIndex: 1 }}>
        <line x1="30" y1="0" x2="15" y2="30" stroke="#5a7479" strokeWidth="2.5" />
        <line x1="30" y1="0" x2="45" y2="30" stroke="#5a7479" strokeWidth="2.5" />
      </svg>

      {/* Board */}
      <div style={{
        backgroundColor: '#EBE4D4',
        padding: '12px 16px',
        borderRadius: '3px',
        boxShadow: '0 12px 30px rgba(0,0,0,0.5)',
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        border: '3px solid #A81C1C',
        marginTop: '-2px',
        transform: 'rotate(-1deg)'
      }}>
        <div style={{
          fontFamily: "'Bangers', cursive",
          fontSize: '2.6rem',
          color: '#A81C1C',
          letterSpacing: '2px',
          textTransform: 'uppercase',
          lineHeight: 0.9,
          transform: 'rotate(-1deg)'
        }}>
          WORK
        </div>

        <div style={{ display: 'flex', alignItems: 'flex-end', gap: '6px', marginTop: '4px' }}>
          <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', marginBottom: '6px' }}>
            {/* Swirl SVG */}
            <svg width="24" height="10" viewBox="0 0 30 12" style={{ transform: 'rotate(-5deg)' }}>
              <path d="M3,9 C3,1 9,1 12,5 C15,10 20,10 23,6 C26,2 29,4 29,9" fill="none" stroke="#A81C1C" strokeWidth="2.5" strokeLinecap="round" />
            </svg>
            <span style={{
              fontFamily: "'Bangers', cursive",
              fontSize: '0.9rem',
              color: '#A81C1C',
              marginTop: '-2px',
              transform: 'rotate(-2deg)'
            }}>
              IN
            </span>
          </div>

          <span style={{
            fontFamily: "'Yatra One', system-ui, sans-serif",
            fontSize: '2.4rem',
            color: '#A81C1C',
            fontWeight: 'bold',
            lineHeight: 0.8,
            transform: 'rotate(1deg)'
          }}>
            प्रोग्रेस
          </span>
        </div>

        <div style={{
          marginTop: '12px',
          fontFamily: 'var(--body)',
          fontSize: '0.55rem',
          color: '#A81C1C',
          fontWeight: 'bold',
          letterSpacing: '1.5px',
          textTransform: 'uppercase',
          opacity: 0.9,
          borderTop: '1.5px dashed rgba(168, 28, 28, 0.4)',
          paddingTop: '6px'
        }}>
          Website under renovation
        </div>
      </div>

      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Bangers&family=Yatra+One&display=swap');
        @keyframes badgeSwing {
          0% { transform: rotate(1.5deg); }
          50% { transform: rotate(-1.5deg); }
          100% { transform: rotate(1.5deg); }
        }
      `}</style>
    </div>
  );
}
