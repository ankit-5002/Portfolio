import { useEffect, useRef, useState } from 'react';
import profileFrameImg from '../assets/Profile_Frame.png';
import card3Img from '../assets/card5.png';
import headshotImg from '../assets/picture1.png';
import { MapPin, Download, ArrowUpRight, Info } from 'lucide-react';


export default function About() {
  const aboutRef = useRef(null);
  const [progress, setProgress] = useState(0);

  useEffect(() => {
    const handleScroll = () => {
      if (!aboutRef.current) return;
      const rect = aboutRef.current.getBoundingClientRect();
      const windowH = window.innerHeight;
      const p = Math.min(1, Math.max(0, -rect.top / (rect.height - windowH)));
      setProgress(p);
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    handleScroll();
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const titleOpacity = 1 - Math.min(1, Math.max(0, progress / 0.50));
  const polaroidAnim = Math.min(1, Math.max(0, progress / 0.35));
  const cardAnim = Math.min(1, Math.max(0, (progress - 0.25) / 0.35));

  return (
    <section id="about" ref={aboutRef} style={{ height: '200vh', position: 'relative', backgroundColor: '#240605' }}>
      <div style={{ position: 'sticky', top: 0, height: '100vh', width: '100vw', overflow: 'hidden', display: 'flex', flexDirection: 'column', justifyContent: 'center' }}>
        
        {/* Animated Title */}
        <div style={{ 
          position: 'absolute', 
          top: '50%',
          left: '50%',
          transform: `translate(-50%, -50%)`,
          opacity: titleOpacity,
          pointerEvents: titleOpacity < 0.1 ? 'none' : 'auto',
          zIndex: 5,
          willChange: 'opacity'
        }}>
          <div style={{ position: 'relative', display: 'inline-block', textAlign: 'left' }}>
            <h1 style={{ fontFamily: "'Penelope', var(--disp), serif", fontSize: 'clamp(4rem, 9vw, 7rem)', lineHeight: 0.85, margin: 0, fontWeight: 'normal', textTransform: 'uppercase', letterSpacing: '2px', color: '#EBE4D4', whiteSpace: 'nowrap' }}>
              ABOUT ME.
            </h1>
            <p style={{ position: 'absolute', right: '0', top: '100%', transform: 'translateY(10px)', fontFamily: 'var(--body)', fontSize: 'clamp(0.7rem, 1.2vw, 0.9rem)', margin: 0, color: '#EBE4D4', textTransform: 'uppercase', letterSpacing: '1px', fontWeight: 500, textAlign: 'left', whiteSpace: 'nowrap' }}>
              FULL-STACK MACHINE LEARNING ENGINEER
            </p>
          </div>
        </div>



        {/* Fading Content */}
        <div className="wrap" style={{ 
          pointerEvents: cardAnim > 0.5 ? 'auto' : 'none',
          paddingTop: '60px' // reduced offset so the heading overlaps the card
        }}>
          <div className="about-redesign-wrap" style={{ position: 'relative' }}>
          {/* LEFT COLUMN: Card (formerly right column) */}
          <div className="about-right-col card-theme" style={{
            opacity: 1,
            transform: `translateY(${1000 - cardAnim * 1000}px) rotate(-2deg)`,
            willChange: 'opacity, transform',
            marginTop: '120px',
            backgroundImage: `url(${card3Img})`,
            backgroundSize: '100% 100%',
            backgroundRepeat: 'no-repeat',
            backgroundPosition: 'center',
            padding: '80px 80px 60px 80px', 
            color: '#240605',
            zIndex: 1,
            position: 'relative',
            display: 'flex',
            flexDirection: 'column',
            justifyContent: 'space-between'
          }}>

            {/* Red Bar Accent Quote Box */}
            <div className="about-quote-box" style={{ marginBottom: '10px' }}>
              <p>
                I like ML best when it stops being a notebook and starts being a <em className="wavy-underline">system</em> — served over an API, checked by evals, trusted by people.
              </p>
            </div>

            {/* Compact Paragraph 2: Education & Infosys Internship Highlights */}
            <div className="about-bio-text" style={{ marginBottom: '10px' }}>
              <p>
                I'm a B.Tech CSE graduate from <span className="highlight-pill" style={{backgroundColor: 'rgba(36, 6, 5, 0.1)', color: '#240605'}}>Centurion University</span> (CGPA 9.37/10). Recently completed my ML Internship at <span className="highlight-badge-white" style={{backgroundColor: '#8B0000', color: '#EBE4D4', borderColor: '#8B0000'}}>Infosys Springboard</span>, where I built <strong>EcoPackAI</strong> end-to-end — a full-stack ML platform that recommends sustainable packaging and predicts carbon footprint and cost.
              </p>
              <p style={{ marginTop: '10px' }}>
                On my own time I've built a production-grade RAG chatbot with enforced citations, and an NLP resume parser. I'm drawn to evaluation datasets, CI checks, and data cleaning — because that's where actual quality lives.
              </p>
            </div>

            {/* Compact Metadata List Box */}
            <div className="about-meta-box">
              <div className="about-meta-row">
                <span className="about-meta-label">BASED IN</span>
                <span className="about-meta-val loc-item" style={{ display: 'inline-flex', alignItems: 'center', gap: '5px' }}>
                  <MapPin size={13} className="loc-pin" /> <strong>BENGALURU, INDIA</strong> — OPEN TO RELOCATE
                </span>
              </div>
              <div className="about-meta-row">
                <span className="about-meta-label">FOCUS</span>
                <span className="about-meta-val focus-tags">
                  <span className="meta-tag">FULL-STACK ML</span>
                  <span className="meta-tag">NLP</span>
                  <span className="meta-tag">RAG</span>
                  <span className="meta-tag">LLM EVALS</span>
                </span>
              </div>
              <div className="about-meta-row">
                <span className="about-meta-label">EXPERIENCE</span>
                <span className="about-meta-val">
                  <strong>EX-ML INTERN @ INFOSYS SPRINGBOARD</strong>
                </span>
              </div>
              <div className="about-meta-row">
                <span className="about-meta-label">QUALIFICATION</span>
                <span className="about-meta-val">
                  <strong>B.TECH CSE '26 — CGPA 9.37/10</strong>
                </span>
              </div>
              <div className="about-meta-row">
                <span className="about-meta-label">STATUS</span>
                <span className="about-meta-val">
                  <span className="status-pill" style={{ color: '#0F5132', background: 'rgba(15, 81, 50, 0.1)', borderColor: 'rgba(15, 81, 50, 0.2)' }}>
                    <span className="green-blink" style={{ background: '#0F5132' }}></span> OPEN TO GRAD ROLES &amp; INTERVIEWS
                  </span>
                </span>
              </div>
            </div>

            <div className="about-actions" style={{ 
              display: 'flex', 
              gap: '15px', 
              marginTop: '15px',
              flexWrap: 'wrap'
            }}>
              <a href="/resume.pdf" download className="more-projects-pill" style={{
                position: 'relative',
                bottom: 'auto',
                right: 'auto',
                zIndex: 10,
                textDecoration: 'none',
                backgroundColor: 'transparent',
                color: '#240605',
                border: '1px solid rgba(36, 6, 5, 0.4)',
                boxShadow: 'none'
              }}>
                <span style={{ fontSize: '11px', fontWeight: '600', letterSpacing: '1px', textTransform: 'uppercase' }}>DOWNLOAD RESUME</span>
                <div className="mp-icon-circle" style={{ backgroundColor: 'transparent', color: '#240605', boxShadow: 'none' }}>
                  <Download size={14} />
                </div>
              </a>
              <a href="#contact" className="lets-talk-btn" style={{
                display: 'inline-flex',
                alignItems: 'center',
                gap: '8px',
                padding: '10px 24px',
                backgroundColor: 'transparent',
                color: '#240605',
                border: '1px solid rgba(36, 6, 5, 0.4)',
                borderRadius: '50px',
                textDecoration: 'none',
                fontFamily: 'Inter, sans-serif',
                fontWeight: '600',
                fontSize: '11px',
                letterSpacing: '1px',
                transition: 'all 0.3s cubic-bezier(0.25, 0.8, 0.25, 1)'
              }}>
                LET'S TALK <ArrowUpRight size={14} className="lets-talk-icon" style={{ transition: 'transform 0.3s ease' }} />
              </a>
            </div>

            {/* Expandable Journey Button */}
            <a href="/about" className="journey-info-btn">
              <Info size={16} style={{ flexShrink: 0 }} />
              <span className="journey-text">THE FULL STORY</span>
            </a>
          </div>

          {/* RIGHT COLUMN: Custom Image Frame */}
          <div className="about-polaroid-stage" style={{
            opacity: 1,
            transform: `translateY(${1000 - polaroidAnim * 1000}px) rotate(6deg)`,
            willChange: 'opacity, transform',
            zIndex: 2,
            position: 'absolute',
            right: '-20px',
            top: '0px',
            width: '340px',
            filter: 'drop-shadow(0 20px 30px rgba(0,0,0,0.5))'
          }}>
            <div className="custom-image-frame-container" style={{ position: 'relative', width: '100%', padding: 0 }}>
              {/* The Headshot placed underneath the frame cutout */}
              <img 
                src={headshotImg} 
                alt="Ankit Kumar Headshot" 
                style={{ 
                  position: 'absolute',
                  top: '12%',
                  left: '10%',
                  width: '80%',
                  height: '70%',
                  objectFit: 'cover',
                  zIndex: 1
                }} 
              />
              {/* The Transparent Polaroid Frame */}
              <img src={profileFrameImg} alt="Frame" className="custom-frame-overlay" style={{ position: 'relative', zIndex: 2, width: '100%', height: 'auto', pointerEvents: 'none' }} />
              <div className="frame-text-overlay" style={{ zIndex: 3, bottom: '8%', color: '#240605' }}>
                ANKIT KUMAR
              </div>
            </div>
          </div>
          
          {/* Floating Subnote */}
          <div className="polaroid-subnote" style={{ 
            position: 'absolute', 
            bottom: '30px', 
            right: '-60px', 
            color: '#FFFFFF',
            textShadow: '0 2px 4px rgba(0,0,0,0.4)',
            transform: `rotate(-3deg) translateY(${50 - polaroidAnim * 50}px)`,
            opacity: polaroidAnim,
            willChange: 'opacity, transform'
          }}>
            <div>student by title, <span className="wavy-underline">builder by habit</span></div>
            <div style={{ marginTop: '12px' }}><span style={{ borderBottom: '2px solid #E63946', paddingBottom: '2px', fontFamily: 'Inter, sans-serif', fontWeight: 'bold' }}>5x</span> hackathon wins...</div>
          </div>
          </div>
        </div>



      </div>
    </section>
  );
}
