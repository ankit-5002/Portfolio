import React, { useEffect, useState, useRef } from 'react';
import { ArrowUpRight } from 'lucide-react';
import card1Bg from '../assets/card1.png';
import card2Bg from '../assets/card2.png';
import project1Img from '../assets/Rag_Project.png';
import project2Img from '../assets/Ecopack__project.png';
import project3Img from '../assets/nlp_project.png';

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
      tags: ["PYTHON", "FLASK", "REACT", "POSTGRESQL", "ML"],
      desc: "A full-stack ML-driven platform recommending sustainable packaging based on dimensions and category, achieving 97% accuracy.",
      category: "SUSTAINABLE ENGINEERING",
      code: "EP-01",
      subDesc: "Developed predictive models for carbon footprint and cost efficiency; resulting recommendations reduced simulated material cost by 22%.",
      stats: [
        { label: "ARCHITECTURE", value: "Full-Stack ML Platform" },
        { label: "STACK", value: "PostgreSQL • REST APIs" },
        { label: "MODEL ACCURACY", value: "97% Achievement" },
        { label: "COST REDUCTION", value: "22% Simulated" }
      ],
      caption: "EcoPack AI simulation interface predicting optimal sustainable packaging layouts.",
      repoLink: "https://github.com/ankit-5002/Eco-Pack_AI",
      caseStudyLink: "javascript:void(0)",
      img: project2Img,
      p: Math.min(1, progress / 0.26),
      nextP: Math.min(1, Math.max(0, (progress - 0.26) / 0.27)),
      bgImg: card1Bg,
      rot: 4,
      dx: 2,
      dy: 2
    },
    {
      id: 2,
      title: "Multimodal RAG\u00A0App.",
      tags: ["PYTHON", "FASTAPI", "CHROMADB", "LANGCHAIN"],
      desc: "Multimodal RAG chatbot combining BM25 keyword search with semantic vector search and cross-encoder reranking.",
      category: "VECTOR INTELLIGENCE",
      code: "RE-09",
      subDesc: "Applied prompt engineering, citation enforcement and hallucination checks to keep responses grounded in retrieved sources and improve information relevance.",
      stats: [
        { label: "ARCHITECTURE", value: "Hybrid Sparse-Dense" },
        { label: "STACK", value: "FastAPI • ChromaDB • LangChain" },
        { label: "EVALUATION", value: "Automated CI/CD Testing" },
        { label: "RELIABILITY", value: "Citation-backed Answers" }
      ],
      caption: "Retrieva developer documentation explorer & verification interface.",
      repoLink: "https://github.com/ankit-5002/Production-Grade-RAG-System-",
      caseStudyLink: "javascript:void(0)",
      demoLink: "https://retrieva-p4db.onrender.com/",
      img: project1Img,
      p: Math.min(1, Math.max(0, (progress - 0.26) / 0.27)),
      nextP: Math.min(1, Math.max(0, (progress - 0.53) / 0.27)),
      bgImg: card2Bg,
      rot: -3,
      dx: -2,
      dy: 0
    },
    {
      id: 3,
      title: "NLP Resume\u00A0Parser",
      tags: ["PYTHON", "SPACY", "NLTK", "PANDAS"],
      desc: "NLP data-processing pipeline parsing unstructured resumes to extract key entities like skills and education.",
      category: "DATA ENGINEERING",
      code: "NP-04",
      subDesc: "Engineered rule-based and statistical text-cleaning algorithms to normalize complex documents, reducing downstream errors by 30%.",
      stats: [
        { label: "ARCHITECTURE", value: "NLP Pipeline" },
        { label: "STACK", value: "Python • spaCy • Pandas" },
        { label: "ACCURACY", value: "85%+ Extraction Accuracy" },
        { label: "IMPACT", value: "40% Less Manual Effort" }
      ],
      caption: "Unstructured data pipeline dashboard for automated resume parsing.",
      repoLink: "https://github.com/ankit-5002/Automated-Resume-Parser-",
      caseStudyLink: "javascript:void(0)",
      img: project3Img,
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
              
              {/* Card Safe Area */}
              <div style={{ position: 'absolute', top: '13%', bottom: '13%', left: '12%', right: '12%', display: 'flex', flexDirection: 'column' }}>
                
                {/* Header Section */}
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', paddingBottom: '1.5%', borderBottom: '1px solid rgba(42,26,18,0.15)', marginBottom: '3%' }}>
                  <div style={{ fontFamily: 'var(--mono)', fontSize: '0.55rem', fontWeight: 600, color: '#2A1A12', textTransform: 'uppercase', display: 'flex', alignItems: 'center', gap: '8px', letterSpacing: '1px' }}>
                    <div style={{ width: '6px', height: '6px', borderRadius: '50%', backgroundColor: '#8B5CF6' }}></div>
                    ARCHIVE NO. 0{proj.id + 3} &nbsp;|&nbsp; CATEGORY: {proj.category}
                  </div>
                  <div style={{ display: 'flex', gap: '8px' }}>
                    {proj.tags.map((tag, idx) => (
                      <span key={idx} style={{ padding: '3px 10px', borderRadius: '20px', border: '1px solid rgba(42, 26, 18, 0.4)', backgroundColor: 'transparent', fontFamily: 'var(--mono)', fontSize: '0.55rem', fontWeight: 600, color: '#2A1A12', letterSpacing: '0.5px' }}>
                        {tag}
                      </span>
                    ))}
                  </div>
                </div>

                {/* Main Content Area */}
                <div style={{ flex: 1, display: 'flex', gap: '5%', minHeight: 0 }}>
                  
                  {/* Left Column (Image) */}
                  <div style={{ flex: 1.1, display: 'flex', flexDirection: 'column', order: proj.id === 2 ? 1 : 2, justifyContent: 'center' }}>
                    <div style={{ flex: 1, position: 'relative', width: '100%', minHeight: 0, display: 'flex', alignItems: 'center', justifyContent: proj.id === 2 ? 'flex-end' : 'flex-start' }}>
                      <img src={proj.img} alt={proj.title} style={{ maxWidth: '100%', maxHeight: '100%', objectFit: 'contain', borderRadius: '16px', border: '1px solid rgba(42,26,18,0.2)' }} />
                    </div>
                    {proj.caption && (
                      <div style={{ fontFamily: 'var(--mono)', fontSize: '0.65rem', fontStyle: 'italic', marginTop: '3%', color: 'rgba(42,26,18,0.7)' }}>
                        {proj.caption}
                      </div>
                    )}
                  </div>

                  {/* Right Column (Text) */}
                  <div style={{ flex: 1, display: 'flex', flexDirection: 'column', order: proj.id === 2 ? 2 : 1, justifyContent: 'center' }}>
                    <div style={{ fontFamily: 'var(--mono)', fontSize: '0.55rem', color: '#2A1A12', fontWeight: 600, textTransform: 'uppercase', letterSpacing: '2px', marginBottom: '1%' }}>
                      PROJECT CODE // {proj.code}
                    </div>
                    
                    <h3 style={{ fontFamily: "'Penelope', var(--disp), serif", fontSize: 'clamp(2rem, 3.5vw, 4.5rem)', color: '#2A1A12', margin: 0, fontWeight: 900, lineHeight: 0.9, textTransform: 'uppercase' }}>
                      {proj.title.split(' ').map((t, idx) => <div key={idx}>{t}</div>)}
                    </h3>
                    
                    <div style={{ width: '40px', height: '2px', backgroundColor: '#2A1A12', margin: '3% 0' }}></div>
                    
                    <p style={{ fontFamily: 'var(--body)', fontSize: 'clamp(0.85rem, 1vw, 1rem)', color: '#2A1A12', margin: 0, fontWeight: 500, lineHeight: 1.5 }}>
                      {proj.desc}
                    </p>
                    
                    <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '10px 8px', margin: '3% 0', borderTop: '1px solid rgba(42,26,18,0.15)', borderBottom: '1px solid rgba(42,26,18,0.15)', padding: '3% 0' }}>
                      {proj.stats.map((stat, idx) => (
                        <div key={idx} style={{ display: 'flex', flexDirection: 'column', gap: '4px', fontFamily: 'var(--mono)', fontSize: '0.55rem' }}>
                          <span style={{ color: 'rgba(42,26,18,0.6)' }}>{stat.label}</span>
                          <strong style={{ color: '#2A1A12', fontWeight: 700 }}>{stat.value}</strong>
                        </div>
                      ))}
                    </div>
                    
                    <div style={{ display: 'flex', gap: '15px', alignItems: 'center', marginTop: '2%' }}>
                      {[ {l: 'SOURCE CODE', u: proj.repoLink}, {l: 'CASE STUDY', u: proj.caseStudyLink}, {l: 'LIVE DEMO', u: proj.demoLink} ]
                        .filter(link => link.u)
                        .map((link, idx, arr) => (
                          <React.Fragment key={idx}>
                            <a href={link.u} target={link.u === "javascript:void(0)" ? "_self" : "_blank"} rel="noopener noreferrer" className="feature-link" style={{ display: 'flex', alignItems: 'center', gap: '4px', fontFamily: 'var(--mono)', fontSize: '0.85rem', fontWeight: 800, textTransform: 'uppercase', color: '#2A1A12', textDecoration: 'none', paddingBottom: '3px', cursor: link.u === "javascript:void(0)" ? 'default' : 'pointer' }}>
                              {link.l} <ArrowUpRight size={15} style={{ transform: 'translateY(-1px)' }}/>
                            </a>
                            {idx < arr.length - 1 && (
                              <span style={{ color: 'rgba(42,26,18,0.4)', fontWeight: 800 }}>|</span>
                            )}
                          </React.Fragment>
                      ))}
                    </div>
                  </div>
                </div>
                
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
