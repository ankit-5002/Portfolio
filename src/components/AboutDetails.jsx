import { useEffect, useRef, useState } from 'react';

const clamp = (v, a, b) => Math.max(a, Math.min(b, v));

export default function AboutDetails() {
  const listRef = useRef(null);
  const fillRef = useRef(null);

  useEffect(() => {
    const handleScroll = () => {
      if (!listRef.current || !fillRef.current) return;
      const r = listRef.current.getBoundingClientRect();
      const progress = clamp((window.innerHeight * 0.72 - r.top) / r.height, 0, 1);
      fillRef.current.style.transform = `scaleY(${progress})`;
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    handleScroll();

    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <section id="xp">
      <div className="wrap">
        <div className="sec-head reveal in">
          <span className="sec-num">03</span>
          <h2 className="sec-title lm">
            <span style={{ '--d': 1 }}>About</span>
          </h2>
          <span className="sec-line"></span>
          <span className="sec-note">so far — more ink coming</span>
        </div>

        <div className="xp-list" id="xp-list" ref={listRef}>
          <div className="xp-track"></div>
          <div className="xp-fill" id="xp-fill" ref={fillRef}></div>

          <div className="xp reveal in">
            <span className="xp-years">DEC 2025 — FEB 2026</span>
            <div>
              <h3 className="xp-role">
                ML Intern{' '}
                <span className="here-note">
                  <svg viewBox="0 0 26 14" className="doodle doodle--accent" fill="none">
                    <path pathLength="1" d="M25 7 H3" />
                    <path pathLength="1" d="M9 1 L2 7 l7 6" />
                  </svg>
                  you are here
                </span>
              </h3>
              <span className="xp-co">
                <span className="circled">
                  Infosys Springboard
                  <svg viewBox="0 0 120 60" preserveAspectRatio="none" aria-hidden="true">
                    <ellipse cx="60" cy="30" rx="56" ry="24" pathLength="100" />
                  </svg>
                </span>
              </span>
              <p className="xp-desc">
                Built EcoPackAI end-to-end — a full-stack ML platform (Flask, PostgreSQL, REST APIs) recommending sustainable packaging from product dimensions and category, at 97% model accuracy. Developed predictive models for carbon footprint and cost efficiency; recommendations cut simulated material cost by 22%, with insights surfaced in an analytics dashboard and modular backend services designed for scalability.
              </p>
            </div>
          </div>

          <div className="xp reveal in">
            <span className="xp-years">2022 — 2026</span>
            <div>
              <h3 className="xp-role">B.Tech, Computer Science &amp; Engineering</h3>
              <span className="xp-co">Centurion University of Technology &amp; Management, Odisha</span>
              <p className="xp-desc">
                CGPA 9.37/10. Spending the degree turning coursework into shipped things — a citation-enforced RAG chatbot, an NLP resume parser, an internship-built ML platform, and two hackathon wins along the way. The degree is the foundation; the repos are the proof.
              </p>
            </div>
          </div>

          <div className="xp reveal in">
            <span className="xp-years">2019 — 2021</span>
            <div>
              <h3 className="xp-role">Senior Secondary (Class XII) — CBSE</h3>
              <span className="xp-co">DAV Public School, Jamshedpur, Jharkhand</span>
              <p className="xp-desc">
                Where the curiosity got formal — first lines of code, first "why is this O(n²)", first all-nighter that was actually worth it.
              </p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
