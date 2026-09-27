import { useEffect, useRef, useState } from 'react';
import profileFrameImg from '../assets/Profile_Frame.png';
import { MapPin } from 'lucide-react';

function StatCounter({ target, dec = 0, pad = 0, suffix = '' }) {
  const [value, setValue] = useState('0');
  const domRef = useRef(null);
  const hasRun = useRef(false);

  useEffect(() => {
    const el = domRef.current;
    if (!el) return;

    const reducedMotion = matchMedia('(prefers-reduced-motion: reduce)').matches;
    const formatValue = val => {
      if (pad) return String(Math.round(val)).padStart(pad, '0');
      return val.toFixed(dec);
    };

    const observer = new IntersectionObserver(
      entries => {
        entries.forEach(entry => {
          if (!entry.isIntersecting || hasRun.current) return;
          hasRun.current = true;

          if (reducedMotion) {
            setValue(formatValue(target));
            return;
          }

          const startTime = performance.now();
          const duration = 1600;

          const animate = now => {
            const p = Math.min(1, (now - startTime) / duration);
            const e = p === 1 ? 1 : 1 - Math.pow(2, -10 * p);
            setValue(formatValue(target * e));

            if (p < 1) {
              requestAnimationFrame(animate);
            } else {
              setValue(formatValue(target));
            }
          };

          requestAnimationFrame(animate);
          observer.unobserve(entry.target);
        });
      },
      { threshold: 0.15 }
    );

    observer.observe(el);
    return () => observer.disconnect();
  }, [target, dec, pad]);

  return (
    <span ref={domRef}>
      {value}
      {suffix}
    </span>
  );
}

export default function About() {
  const statsContainerRef = useRef(null);
  const [scrollProgress, setScrollProgress] = useState(0);

  useEffect(() => {
    const handleScroll = () => {
      if (!statsContainerRef.current) return;
      const rect = statsContainerRef.current.getBoundingClientRect();
      const windowHeight = window.innerHeight;

      const triggerTop = windowHeight * 0.50;
      const stackEndTop = 180;
      const rawStackProgress = (triggerTop - rect.top) / (triggerTop - stackEndTop);
      const clampedStackProgress = Math.max(0, Math.min(1, rawStackProgress));
      setScrollProgress(clampedStackProgress);
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    handleScroll();
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const cardsData = [
    {
      id: 1,
      target: 9.37,
      dec: 2,
      label: 'CGPA / 10 — B.Tech CSE',
      sectionTitle: 'About & Core CS',
      className: 'stat--c1',
      color: '#FFFFFF',
      rot: -5.5,
      targetX: 480,
      targetY: -12,
    },
    {
      id: 2,
      target: 2,
      pad: 2,
      label: 'Production-grade ML & RAG systems',
      sectionTitle: 'Technical Skills',
      className: 'stat--c2',
      color: '#211D18',
      rot: 4.2,
      targetX: 160,
      targetY: -4,
    },
    {
      id: 3,
      target: 50,
      suffix: 'K+',
      label: 'Unstructured resume tokens parsed',
      sectionTitle: 'System Intelligence',
      className: 'stat--c3',
      color: '#211D18',
      rot: -3.6,
      targetX: -160,
      targetY: 4,
    },
    {
      id: 4,
      target: 5,
      suffix: '×',
      label: 'Hackathon wins',
      sectionTitle: 'Featured Projects',
      className: 'stat--c4',
      color: '#211D18',
      rot: 6.2,
      targetX: -480,
      targetY: 12,
    },
  ];

  return (
    <section id="about">
      <div className="wrap">
        {/* 2-Column Main Layout: Stamp Photo on LEFT, Bio & Meta on RIGHT */}
        <div className="about-redesign-wrap reveal in">
          {/* LEFT COLUMN: Custom Image Frame */}
          <div className="about-polaroid-stage">
            <div className="custom-image-frame-container">
              <img src={profileFrameImg} alt="Frame" className="custom-frame-overlay" />
              <div className="frame-text-overlay">
                ANKIT KUMAR
              </div>
            </div>

            <div className="polaroid-subnote">
              student by title, <span className="wavy-underline">builder by habit</span>
            </div>
          </div>

          {/* RIGHT COLUMN: Quote Box + Compact Bio Text + Highlight Badges + Meta List */}
          <div className="about-right-col">
            {/* Centered Title Header directly above the text column */}
            <div className="about-hero-header">
              <div className="about-header-title">
                <span className="about-brush-stroke"></span>
                <span className="about-header-text">about me</span>
              </div>

              <div className="about-subtitle-mono">
                FULL-STACK ML ENGINEER &amp; SYSTEM BUILDER
              </div>
            </div>

            {/* Red Bar Accent Quote Box */}
            <div className="about-quote-box">
              <p>
                I like ML best when it stops being a notebook and starts being a <em className="wavy-underline">system</em> — served over an API, checked by evals, trusted by people.
              </p>
            </div>

            {/* Compact Paragraph 2: Education & Infosys Internship Highlights */}
            <div className="about-bio-text">
              <p>
                I'm a B.Tech CSE graduate from <span className="highlight-pill">Centurion University</span> (CGPA 9.37/10). Recently completed my ML Internship at <span className="highlight-badge-white">Infosys Springboard</span>, where I built <strong>EcoPackAI</strong> end-to-end — a full-stack ML platform that recommends sustainable packaging and predicts carbon footprint and cost.
              </p>
              <p style={{ marginTop: '10px' }}>
                On my own time I've built a production-grade RAG chatbot with enforced citations, and an NLP resume parser. I'm drawn to evaluation datasets, CI checks, and data cleaning — because that's where actual quality lives.
              </p>
            </div>

            {/* Compact Metadata List Box */}
            <div className="about-meta-box">
              <div className="about-meta-row">
                <span className="about-meta-label">BASED IN</span>
                <span className="about-meta-val loc-item">
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
                <span className="about-meta-label">EDUCATION</span>
                <span className="about-meta-val">
                  <strong>B.TECH CSE '26 — CGPA 9.37/10</strong>
                </span>
              </div>
              <div className="about-meta-row">
                <span className="about-meta-label">STATUS</span>
                <span className="about-meta-val">
                  <span className="status-pill">
                    <span className="green-blink"></span> OPEN TO GRAD ROLES &amp; INTERVIEWS
                  </span>
                </span>
              </div>
            </div>
          </div>
        </div>

        {/* Scroll Interactive Shrink & Downward Slide Metric Cards Container */}
        <div className="stats-scroll-stage" ref={statsContainerRef}>
          <div className="stats-stack-wrapper">
            {cardsData.map((card, idx) => {
              const baseShrink = 0.42;
              const scale = 1 - scrollProgress * baseShrink;
              const tx = scrollProgress * card.targetX;
              const ty = scrollProgress * card.targetY;
              const rot = scrollProgress * card.rot;

              return (
                <div
                  key={card.id}
                  className={`stat-stacked-card ${card.className}`}
                  style={{
                    zIndex: idx + 1,
                    transform: `translate3d(${tx}px, ${ty}px, 0) rotate(${rot}deg) scale(${scale})`,
                    boxShadow: scrollProgress > 0.05
                      ? `0 ${10 + idx * 4}px ${24 + idx * 6}px -8px rgba(0,0,0,0.7), 0 2px 6px rgba(0,0,0,0.4)`
                      : 'none'
                  }}
                >
                  <div className="notebook-lines-pattern"></div>

                  <div style={{ position: 'relative', width: '100%', height: '100%', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                    <div style={{ textAlign: 'center' }}>
                      <span className="stat-num" style={{ color: card.color }}>
                        <StatCounter
                          target={card.target}
                          dec={card.dec}
                          pad={card.pad}
                          suffix={card.suffix}
                        />
                      </span>
                      <span className="stat-label" style={{ color: card.color, opacity: 0.9 }}>
                        {card.label}
                      </span>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </div>
    </section>
  );
}
