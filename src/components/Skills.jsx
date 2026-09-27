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
  
  // Phase 1: Box expansion (0% to 20%)
  const anim = Math.min(1, progress / 0.20); 
  
  // Phase 2: Title fades out smoothly (20% to 40%)
  const titleFadeOut = Math.min(1, Math.max(0, (progress - 0.20) / 0.20));
  
  // Phase 3-5: Project cards slide up
  // Card 1 starts exactly at 20% (simultaneously with the title fading out)
  const p1Progress = Math.min(1, Math.max(0, (progress - 0.20) / 0.25));
  const p2Progress = Math.min(1, Math.max(0, (progress - 0.45) / 0.25));
  const p3Progress = Math.min(1, Math.max(0, (progress - 0.70) / 0.25));

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

  const projects = [
    {
      id: 1,
      title: "EcoPackAI",
      sub: "Sustainable ML Packaging Engine",
      img: "https://images.unsplash.com/photo-1618005182384-a83a8bd57fbe?q=80&w=800&auto=format&fit=crop",
      p: p1Progress,
      nextP: p2Progress
    },
    {
      id: 2,
      title: "RAG Engine",
      sub: "Cited Vector Search REST API",
      img: "https://images.unsplash.com/photo-1555066931-4365d14bab8c?q=80&w=800&auto=format&fit=crop",
      p: p2Progress,
      nextP: p3Progress
    },
    {
      id: 3,
      title: "NLP Resume Parser",
      sub: "Unstructured Data Pipeline",
      img: "https://images.unsplash.com/photo-1551288049-bebda4e38f71?q=80&w=800&auto=format&fit=crop",
      p: p3Progress,
      nextP: 0 // last card doesn't get scaled down
    }
  ];

  return (
    <section 
      id="skills" 
      ref={containerRef}
      style={{
        position: 'relative',
        height: '600vh', // Extended to accommodate the 3 stacked cards
        backgroundColor: 'var(--bg)',
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
            width: `calc(${anim} * 100vw)`,
            height: `calc(${anim} * 100vh)`,
            transform: 'translate(-50%, -50%)',
            backgroundColor: 'var(--bg)', 
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
          {/* Inner Title of Hero Card (Fades out as projects slide in) */}
          <div 
            style={{
              position: 'absolute',
              top: '50%',
              left: '50%',
              opacity: Math.max(0, Math.min(1, anim * 1.5)) * (1 - titleFadeOut), 
              transform: `translate(-50%, -50%) scale(${0.5 + anim * 0.5})`, 
              color: '#EFEBE4',
              textAlign: 'center',
              willChange: 'opacity, transform',
              display: 'flex',
              flexDirection: 'column',
              alignItems: 'center',
              gap: '16px',
              minWidth: '80vw' 
            }}
          >
            <div style={{ position: 'relative', display: 'inline-block', textAlign: 'left' }}>
              <h1 style={{ 
                fontFamily: "'Penelope', var(--disp), serif", 
                fontSize: 'clamp(4rem, 9vw, 7rem)', 
                lineHeight: 0.85,
                margin: 0,
                fontWeight: 'normal',
                textTransform: 'uppercase',
                letterSpacing: '2px',
                color: '#EBE4D4'
              }}>
                FEATURED<br/>PROJECTS.
              </h1>
              <p style={{ 
                position: 'absolute',
                right: '0',
                top: '100%',
                transform: 'translateY(10px)',
                fontFamily: 'var(--body)', 
                fontSize: 'clamp(0.7rem, 1.2vw, 0.9rem)', 
                margin: 0, 
                color: '#A09D98',
                textTransform: 'uppercase',
                letterSpacing: '1px',
                fontWeight: 500,
                textAlign: 'left',
              }}>
                CRAFTED WITH INTENTION,<br/>AND CODE.
              </p>
            </div>
          </div>

          {/* Stacking Project Cards */}
          {projects.map((proj, i) => {
            // Translate Y from 100vh down, to 0. 
            const translateY = (1 - proj.p) * 100;
            
            return (
              <div 
                key={proj.id}
                style={{
                  position: 'absolute',
                  top: '50%',
                  left: '50%',
                  width: 'min(90vw, 1000px)',
                  height: 'min(70vh, 600px)',
                  transform: `translate(-50%, -50%) translateY(${translateY}vh)`,
                  backgroundColor: '#2A2A2A',
                  borderRadius: '16px',
                  overflow: 'hidden',
                  boxShadow: '0 -20px 50px rgba(0,0,0,0.5)',
                  display: 'flex',
                  flexDirection: 'column',
                  willChange: 'transform',
                  zIndex: 10 + i
                }}
              >
                <img 
                  src={proj.img} 
                  alt={proj.title} 
                  style={{
                    width: '100%',
                    height: '100%',
                    objectFit: 'cover',
                    opacity: 0.8
                  }}
                />
                {/* Text Overlay for Project */}
                <div style={{
                  position: 'absolute',
                  bottom: '0',
                  left: '0',
                  width: '100%',
                  padding: '40px',
                  background: 'linear-gradient(to top, rgba(0,0,0,0.9), transparent)'
                }}>
                  <h3 style={{
                    fontFamily: "'Penelope', var(--disp), serif",
                    fontSize: 'clamp(2rem, 4vw, 3rem)',
                    color: '#EBE4D4',
                    margin: '0 0 10px 0',
                    fontWeight: 'normal',
                    textTransform: 'uppercase'
                  }}>
                    {proj.title}
                  </h3>
                  <p style={{
                    fontFamily: 'var(--body)',
                    color: '#A09D98',
                    fontSize: '1.1rem',
                    margin: 0,
                    textTransform: 'uppercase',
                    letterSpacing: '2px'
                  }}>
                    {proj.sub}
                  </p>
                </div>
              </div>
            );
          })}
          
          {/* Persistent "More Projects" Button in Bottom Right */}
          <a 
            href="/work" 
            className="more-projects-pill" 
            style={{ 
              position: 'absolute', 
              bottom: '80px', 
              right: '80px', 
              zIndex: 100,
              opacity: p1Progress > 0 ? 1 : 0,
              transform: `translateY(${p1Progress > 0 ? '0' : '20px'})`,
              transition: 'opacity 0.4s ease, transform 0.4s ease',
              pointerEvents: p1Progress > 0 ? 'auto' : 'none'
            }}
          >
            <span>more projects</span>
            <div className="mp-icon-circle">
              <ArrowUpRight size={16} />
            </div>
          </a>
        </div>

      </div>
    </section>
  );
}
