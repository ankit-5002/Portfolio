import React, { useEffect, useState, useRef } from 'react';
import { ArrowUpRight } from 'lucide-react';
import card1Bg from '../assets/card1.png';
import card2Bg from '../assets/card2.png';

export default function FeaturedProjectsStack() {
  const [progress, setProgress] = useState(0);
  const containerRef = useRef(null);

  useEffect(() => {
    const handleScroll = () => {
      if (!containerRef.current) return;
      const rect = containerRef.current.getBoundingClientRect();
      const windowH = window.innerHeight;

      // Calculate progress from 0 to 1 over the sticky duration
      const p = Math.min(1, Math.max(0, -rect.top / (rect.height - windowH)));
      setProgress(p);
    };

    window.addEventListener('scroll', handleScroll);
    handleScroll(); // init
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const titleMove = Math.min(1, Math.max(0, progress / 0.20));

  const projects = [
    {
      id: 1,
      title: "EcoPack AI",
      tags: ["FULL-STACK", "MACHINE LEARNING", "SUSTAINABILITY"],
      desc: "Built at Infosys. A full-stack platform that recommends sustainable packaging, cutting material costs by 22% in simulation.",
      img: "https://images.unsplash.com/photo-1618005182384-a83a8bd57fbe?q=80&w=800&auto=format&fit=crop",
      p: Math.min(1, progress / 0.26),
      nextP: Math.min(1, Math.max(0, (progress - 0.26) / 0.27)),
      bgImg: card1Bg,
      rot: 4,
      dx: 2,
      dy: 2
    },
    {
      id: 2,
      title: "RAG Engine",
      tags: ["REST API", "VECTOR SEARCH", "AI"],
      desc: "Cited Vector Search REST API. Connects complex document databases into an interactive and reliable question-answering system.",
      img: "https://images.unsplash.com/photo-1555066931-4365d14bab8c?q=80&w=800&auto=format&fit=crop",
      p: Math.min(1, Math.max(0, (progress - 0.26) / 0.27)),
      nextP: Math.min(1, Math.max(0, (progress - 0.53) / 0.27)),
      bgImg: card2Bg,
      rot: -3,
      dx: -2,
      dy: 0
    },
    {
      id: 3,
      title: "NLP Resume Parser",
      tags: ["DATA PIPELINE", "NLP", "AUTOMATION"],
      desc: "Unstructured Data Pipeline. Automatically extracts, classifies, and standardizes resume data into structured formats.",
      img: "https://images.unsplash.com/photo-1551288049-bebda4e38f71?q=80&w=800&auto=format&fit=crop",
      p: Math.min(1, Math.max(0, (progress - 0.53) / 0.27)),
      nextP: 0,
      bgImg: card1Bg,
      rot: 2,
      dx: 1,
      dy: -2
    }
  ];

  return (
    <section
      id="featured-projects-stack"
      ref={containerRef}
      style={{
        position: 'relative',
        height: '400vh',
        backgroundColor: '#EBE4D4', // Fill the corners with cream
      }}
    >
      <div style={{
        position: 'absolute',
        top: 0,
        left: 0,
        right: 0,
        bottom: 0,
        backgroundColor: '#240605',
        borderTopLeftRadius: '60px',
        borderTopRightRadius: '60px',
      }}>
        {/* Container to restrict sticky viewport from reaching the very bottom */}
        <div style={{
          position: 'absolute',
          top: 0,
          left: 0,
          right: 0,
          bottom: '20vh'
        }}>
          <div
            className="fp-sticky-viewport"
        style={{
          position: 'sticky',
          top: 0,
          height: '100vh',
          width: '100vw',
          overflow: 'hidden',
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          justifyContent: 'center',
        }}
      >
        <div style={{
          opacity: 1 - titleMove,
          textAlign: 'center',
          zIndex: 5,
          willChange: 'opacity',
          display: 'flex',
          flexDirection: 'column',
        }}>
          <div style={{ position: 'relative', display: 'inline-block', textAlign: 'center' }}>
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
              FEATURED<br />PROJECTS.
            </h1>
            <p style={{
              position: 'absolute',
              right: '0',
              top: '100%',
              transform: 'translateY(10px)',
              fontFamily: 'var(--body)',
              fontSize: 'clamp(0.7rem, 1.2vw, 0.9rem)',
              margin: 0,
              color: '#EBE4D4',
              textTransform: 'uppercase',
              letterSpacing: '1px',
              fontWeight: 500,
              textAlign: 'left',
            }}>
              CRAFTED WITH INTENTION,<br />AND CODE.
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
                width: proj.id === 2 ? 'min(93vw, 1050px)' : 'min(90vw, 1000px)',
                aspectRatio: proj.id === 2 ? '1.50 / 1' : '1.45 / 1',
                transform: `translate(calc(-50% + ${proj.dx}vw), calc(-48% + ${proj.dy}vh)) translateY(${translateY}vh) rotate(${proj.rot}deg)`,
                backgroundImage: `url(${proj.bgImg})`,
                backgroundSize: '100% 100%',
                backgroundRepeat: 'no-repeat',
                backgroundPosition: 'center',
                willChange: 'transform',
                zIndex: 10 + i,
              }}
            >
              
              {/* Tags overlay */}
              <div style={{ 
                position: 'absolute',
                top: '12%',
                left: proj.id === 2 ? 'auto' : '10%',
                right: proj.id === 2 ? '10%' : 'auto',
                display: 'flex', 
                flexWrap: 'wrap',
                gap: '8px', 
                fontFamily: 'var(--body)', 
                fontSize: 'clamp(0.6rem, 1vw, 0.75rem)', 
                color: '#2A1A12', 
                fontWeight: 600, 
                letterSpacing: '1px' 
              }}>
                {proj.tags.map((tag, idx) => (
                  <span 
                    key={idx}
                    style={{
                      padding: '4px 12px',
                      borderRadius: '20px',
                      border: '1px solid rgba(42, 26, 18, 0.4)',
                      backgroundColor: 'rgba(255, 255, 255, 0.3)',
                      backdropFilter: 'blur(2px)'
                    }}
                  >
                    {tag}
                  </span>
                ))}
              </div>

              {/* Title overlay */}
              <h3 style={{
                position: 'absolute',
                bottom: '12%',
                left: proj.id === 2 ? 'auto' : '12%',
                right: proj.id === 2 ? '12%' : 'auto',
                textAlign: proj.id === 2 ? 'right' : 'left',
                width: '40%',
                fontFamily: "'Penelope', var(--disp), serif",
                fontSize: 'clamp(2rem, 5vw, 4.5rem)',
                color: '#2A1A12',
                margin: 0,
                fontWeight: 'normal',
                lineHeight: 0.9,
                textTransform: 'uppercase',
              }}>
                {proj.title}
              </h3>

              {/* Project Image overlay */}
              <div style={{ 
                position: 'absolute',
                top: '10%',
                right: proj.id === 2 ? 'auto' : '12%',
                left: proj.id === 2 ? '12%' : 'auto',
                width: '38%',
                height: '62%',
                overflow: 'hidden',
                borderRadius: '4px' // slight rounding if needed
              }}>
                <img
                  src={proj.img}
                  alt={proj.title}
                  style={{
                    width: '100%',
                    height: '100%',
                    objectFit: 'cover',
                    filter: 'contrast(1.1) brightness(0.95)'
                  }}
                />
              </div>
              
              {/* Description overlay */}
              <p style={{
                position: 'absolute',
                top: '75%',
                right: proj.id === 2 ? 'auto' : '12%',
                left: proj.id === 2 ? '12%' : 'auto',
                width: '38%',
                fontFamily: 'var(--body)',
                color: '#2A1A12',
                fontSize: 'clamp(0.7rem, 1.2vw, 0.95rem)',
                lineHeight: 1.5,
                margin: 0,
                fontWeight: 500,
              }}>
                {proj.desc}
              </p>
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
            transition: 'opacity 0.4s ease, transform 0.4s ease',
          }}
        >
          <span>more projects</span>
          <div className="mp-icon-circle">
            <ArrowUpRight size={16} />
          </div>
        </a>
      </div>
      </div>
      </div>
    </section>
  );
}
