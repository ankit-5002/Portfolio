import React, { useEffect, useState, useRef } from 'react';
import { ArrowUpRight } from 'lucide-react';

export default function Skills() {
  const [progress, setProgress] = useState(0);
  const [exitProgress, setExitProgress] = useState(0);
  const containerRef = useRef(null);

  useEffect(() => {
    const handleScroll = () => {
      if (!containerRef.current) return;
      const rect = containerRef.current.getBoundingClientRect();
      const windowH = window.innerHeight;
      
      // Calculate progress from 0 to 1 over the 600vh sticky duration
      const p = Math.min(1, Math.max(0, -rect.top / (rect.height - windowH)));
      setProgress(p);

      // exitProgress goes from 0 to 1 as the bottom of the section leaves the viewport
      const exitP = Math.max(0, Math.min(1, 1 - (rect.bottom / windowH)));
      setExitProgress(exitP);
    };

    window.addEventListener('scroll', handleScroll);
    handleScroll(); // init
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // --- Animation Phasing ---
  // Phase 1: Box expansion (0% to 50%)
  const anim = Math.min(1, progress / 0.50); 
  
  // Phase 2: Work Experience block slides up (30% to 100%)
  const p1Progress = Math.min(1, Math.max(0, (progress - 0.30) / 0.70));
  
  // Phase 3: Title fades out as work experience slides in (30% to 60%)
  const titleMove = Math.min(1, Math.max(0, (progress - 0.30) / 0.30));

  // SKILLS heading: moves up and fades out (happens during Phase 1)
  const headingOpacity = Math.max(0, 1 - anim * 4); 
  const headingScale = 1 + anim * 0.3;
  const headingMoveY = -anim * 60; // moves up in vh

  const peripheralCards = [
    { 
      id: 1, 
      category: 'Languages', 
      type: 'paper',
      items: ['Python', 'JavaScript', 'TypeScript', 'C++', 'Java'], 
      w: 260, h: 180, x: 2, y: -34, dx: 0, dy: -80, rot: 2 
    },
    { 
      id: 2, 
      category: 'AI / ML', 
      type: 'notepad',
      items: ['PyTorch', 'TensorFlow', 'LLMs', 'NLP', 'Computer Vision'], 
      w: 300, h: 220, x: 32, y: -2, dx: 100, dy: 0, rot: -2 
    },
    { 
      id: 3, 
      category: 'Software Dev', 
      type: 'notepad',
      items: ['React.js', 'FastAPI', 'Node.js', 'PostgreSQL', 'MongoDB'], 
      w: 240, h: 280, x: -24, y: 18, dx: -100, dy: 40, rot: 4 
    },
    { 
      id: 4, 
      category: 'Cloud & Tools', 
      type: 'paper',
      items: ['AWS', 'Docker', 'Kubernetes', 'CI/CD', 'Git'], 
      w: 220, h: 220, x: -34, y: -26, dx: -80, dy: -80, rot: -10 
    }
  ];



  return (
    <section 
      id="skills" 
      ref={containerRef}
      style={{
        position: 'relative',
        height: '300vh', 
        backgroundColor: '#240605',
      }}
    >
      <div 
        className="skills-sticky-viewport"
        style={{
          position: 'sticky',
          top: 0,
          height: '100vh',
          width: '100vw',
          overflow: 'hidden',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center'
        }}
      >
        
        {/* SKILLS Heading */}
        <h2 style={{
          position: 'absolute',
          top: 'calc(50% - 60px)', 
          left: '50%',
          fontFamily: "'Penelope', var(--disp), serif",
          color: '#EBE4D4',
          fontSize: 'clamp(3rem, 6vw, 5.5rem)',
          margin: 0,
          letterSpacing: '2px',
          lineHeight: 1,
          fontWeight: 'normal',
          transform: `translate(-50%, -50%) translateY(calc(-${anim * 60}vh)) scale(${headingScale})`,
          opacity: headingOpacity, 
          willChange: 'transform, opacity',
          zIndex: 10,
          pointerEvents: 'none'
        }}>
          SKILLS
        </h2>
        
        {/* 'my abilities' Subtext Container */}
        <div style={{ 
          position: 'absolute',
          top: '50%',
          left: '50%',
          transform: 'translate(-50%, -50%)',
          display: 'flex', 
          width: '100vw', 
          alignItems: 'center', 
          zIndex: 10,
          pointerEvents: 'none',
          whiteSpace: 'nowrap',
          opacity: Math.max(0, 1 - anim * 1.5), 
          willChange: 'opacity'
        }}>
          {/* Left Half (contains 'my') */}
          <div style={{
            flex: 1,
            display: 'flex',
            justifyContent: 'flex-end',
            paddingRight: `calc(${anim} * 50vw + 12px)`, 
            willChange: 'padding'
          }}>
            <span style={{
              fontFamily: "'Penelope', var(--disp), serif",
              color: '#EFEBE4',
              fontSize: 'clamp(1.2rem, 2.5vw, 2rem)',
              letterSpacing: '4px',
              textTransform: 'lowercase',
              fontWeight: 'normal'
            }}>
              my
            </span>
          </div>
          
          {/* Right Half (contains 'abilities') */}
          <div style={{
            flex: 1,
            display: 'flex',
            justifyContent: 'flex-start',
            paddingLeft: `calc(${anim} * 50vw + 12px)`, 
            willChange: 'padding'
          }}>
            <span style={{
              fontFamily: "'Penelope', var(--disp), serif",
              color: '#EFEBE4',
              fontSize: 'clamp(1.2rem, 2.5vw, 2rem)',
              letterSpacing: '4px',
              textTransform: 'lowercase',
              fontWeight: 'normal'
            }}>
              abilities
            </span>
          </div>
        </div>

        {/* Peripheral Skill Cards */}
        {peripheralCards.map((card) => {
          const currX = card.x + (card.dx * anim);
          const currY = card.y + (card.dy * anim);
          const scale = 1 - (anim * 0.4);
          const opacity = Math.max(0, 1 - anim * 1.5); 

          return (
            <div
              key={card.id}
              style={{
                position: 'absolute',
                top: '50%',
                left: '50%',
                transform: `translate(-50%, -50%) translate(${currX}vw, ${currY}vh) rotate(${card.rot}deg) scale(${scale})`,
                opacity: opacity,
                width: `${card.w}px`,
                height: `${card.h}px`,
                backgroundColor: '#F6F3EB',
                boxShadow: '0 10px 30px rgba(0,0,0,0.5), inset 0 0 20px rgba(0,0,0,0.05)',
                display: 'flex',
                flexDirection: 'column',
                padding: card.type === 'notepad' ? '30px 24px 20px' : '24px',
                zIndex: 5,
                clipPath: card.type === 'notepad' 
                  ? 'polygon(1% 1%, 99% 0, 100% 98%, 0 100%)' 
                  : 'polygon(2% 0, 98% 2%, 100% 98%, 0 100%)',
                willChange: 'transform, opacity'
              }}
            >
              {card.type === 'notepad' && (
                <div style={{
                  position: 'absolute', top: 0, left: 0, width: '100%', height: '18px', display: 'flex', justifyContent: 'space-evenly', alignItems: 'flex-start', paddingTop: '6px'
                }}>
                  {[...Array(7)].map((_, i) => (
                    <div key={i} style={{ width: '14px', height: '14px', backgroundColor: 'var(--bg)', borderRadius: '2px', opacity: 0.9 }} />
                  ))}
                </div>
              )}

              <h3 style={{ 
                fontFamily: "'Penelope', var(--disp), serif", 
                fontSize: '28px', 
                fontWeight: 'normal', 
                color: '#711A1A', 
                margin: card.type === 'notepad' ? '10px 0 16px 0' : '0 0 16px 0', 
                textTransform: 'lowercase', 
                letterSpacing: '1px',
                borderBottom: '2px solid #711A1A',
                display: 'inline-block',
                alignSelf: 'flex-start'
              }}>
                {card.category}
              </h3>
              <div style={{ 
                display: 'flex', 
                flexDirection: card.type === 'notepad' ? 'column' : 'row',
                flexWrap: card.type === 'notepad' ? 'nowrap' : 'wrap', 
                gap: card.type === 'notepad' ? '12px' : '10px', 
                justifyContent: 'flex-start' 
              }}>
                {card.items.map(item => (
                  <span key={item} style={{ 
                    fontFamily: 'var(--body)', 
                    fontSize: '12px', 
                    color: '#711A1A',
                    backgroundColor: card.type === 'notepad' ? 'transparent' : 'rgba(113, 26, 26, 0.08)',
                    padding: card.type === 'notepad' ? '0' : '6px 12px',
                    borderRadius: card.type === 'notepad' ? '0' : '4px',
                    fontWeight: 500,
                    letterSpacing: '0.5px'
                  }}>
                    {item}
                  </span>
                ))}
              </div>
            </div>
          );
        })}

        {/* Central Hero Expanding Mask */}
        <div
          style={{
            position: 'absolute',
            top: '50%',
            left: '50%',
            width: `calc(${anim} * 110vw)`,
            height: `calc(${anim} * 110vh)`,
            transform: 'translate(-50%, -50%)',
            backgroundColor: '#EBE4D4',
            border: `4px solid rgba(235, 228, 212, ${Math.max(0, 1 - anim * 1.5)})`, 
            borderRadius: `calc(12px * (1 - ${anim}))`, 
            zIndex: 8,
            overflow: 'hidden',
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
            justifyContent: 'center',
            boxShadow: '0 20px 50px rgba(0,0,0,0.8)',
            willChange: 'width, height, border-radius'
          }}
        >
          {/* Inner Title of Hero Card (Moves to top left as experiences slide in) */}
          <div 
            style={{
              position: 'absolute',
              top: '50%',
              left: '50%',
              opacity: Math.max(0, Math.min(1, anim * 1.5)) * (1 - titleMove), 
              transform: `translate(-50%, -50%) scale(${0.5 + anim * 0.5})`, 
              color: '#EFEBE4',
              willChange: 'opacity, transform',
              display: 'flex',
              flexDirection: 'column',
              alignItems: 'center',
              gap: '16px'
            }}
          >
            <div style={{ position: 'relative', display: 'inline-block', textAlign: 'center' }}>
              <h1 style={{ 
                fontFamily: "'Penelope', var(--disp), serif", 
                fontSize: 'clamp(4rem, 9vw, 7rem)', 
                lineHeight: 0.85,
                margin: 0,
                fontWeight: 'normal',
                textTransform: 'uppercase',
                letterSpacing: '2px',
                color: '#240605'
              }}>
                WORK<br/>EXPERIENCE.
              </h1>
              <p style={{ 
                position: 'absolute',
                right: '0',
                top: '100%',
                transform: 'translateY(10px)',
                fontFamily: 'var(--body)', 
                fontSize: 'clamp(0.7rem, 1.2vw, 0.9rem)', 
                margin: 0, 
                color: '#240605',
                textTransform: 'uppercase',
                letterSpacing: '1px',
                fontWeight: 500,
                textAlign: 'left',
              }}>
                THE JOURNEY SO FAR.
              </p>
            </div>
          </div>

          {/* Work Experience Placeholder */}
          <div style={{
            position: 'absolute',
            top: '50%',
            left: '50%',
            transform: `translate(-50%, ${100 - p1Progress * 150}%)`,
            opacity: p1Progress > 0 ? 1 : 0,
            width: '80%',
            maxWidth: '800px',
            backgroundColor: '#2A0B02',
            padding: '40px',
            borderRadius: '16px',
            color: '#EBE4D4',
            boxShadow: '0 20px 50px rgba(0,0,0,0.5)'
          }}>
            <h2 style={{ fontFamily: "'Penelope', var(--disp), serif", margin: '0 0 10px', fontSize: '2.5rem', fontWeight: 'normal' }}>Company Name</h2>
            <p style={{ fontFamily: 'var(--body)', margin: '0 0 20px', opacity: 0.8, letterSpacing: '1px' }}>SOFTWARE ENGINEER • 2022 - PRESENT</p>
            <p style={{ fontFamily: 'var(--body)', lineHeight: 1.6 }}>Here you can implement your new work experience animation! This block slides up as you scroll, replacing the stacked cards that were moved to the next section.</p>
          </div>
        </div>
      </div>

      {/* 
        Safari/Mobile 100vh bug fix:
        When the sticky viewport reaches the bottom of the section on mobile, 
        100vh might be smaller than the visual viewport, exposing the dark red 
        section background. This cream block covers the bottom edge to ensure 
        a seamless transition to the next section.
      */}
      <div style={{
        position: 'absolute',
        bottom: 0,
        left: 0,
        width: '100%',
        height: '20vh',
        backgroundColor: '#EBE4D4',
        zIndex: 0,
        pointerEvents: 'none'
      }} />
    </section>
  );
}
