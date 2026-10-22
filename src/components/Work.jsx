import { ArrowRight, ArrowUpRight } from './LucideIcons';
import ecopackImg from '../assets/Ecopack__project.webp';
import ragImg from '../assets/Rag_Project.webp';
import nlpImg from '../assets/nlp_project.webp';

export default function Work() {
  const projects = [
    {
      id: '01',
      title: 'EcoPackAI',
      badgeDark: 'Production ML',
      badgeYear: '2026',
      sub: 'Full-Stack ML Platform · Dec 2025 — Feb 2026',
      desc: 'Full-stack ML platform recommending sustainable packaging with 97% model accuracy, cutting simulated material costs by 22%.',
      stack: ['FLASK', 'POSTGRESQL', 'REST APIS', 'SCIKIT-LEARN', 'PANDAS'],
      img: ecopackImg,
      imgAlt: 'EcoPackAI analytics dashboard',
      sourceCode: 'https://github.com/ankit-5002/Eco-Pack_AI',
      caseStudy: 'https://github.com/ankit-5002/Eco-Pack_AI#readme',
    },
    {
      id: '02',
      title: 'Multimodal RAG Application',
      badgeDark: 'Live Demo',
      badgeYear: '2025',
      sub: 'AI Chatbot Application (RAG System) · 2025',
      desc: 'Hybrid BM25 and vector search chatbot with cross-encoder reranking, citation enforcement, and automated CI/CD evaluation.',
      stack: ['PYTHON', 'FASTAPI', 'CHROMADB', 'LANGCHAIN', 'CI/CD'],
      img: ragImg,
      imgAlt: 'Multimodal RAG Application interface',
      sourceCode: 'https://github.com/ankit-5002/Production-Grade-RAG-System-',
      caseStudy: 'https://retrieva-p4db.onrender.com/',
    },
    {
      id: '03',
      title: 'Resume Parser',
      badgeDark: 'Open Source',
      badgeYear: '2025',
      sub: 'Automated Data Processing & Analysis Tool · 2025',
      desc: 'Automated NLP parsing pipeline extracting skills and experience with 85%+ accuracy, reducing manual job-search effort by 40%.',
      stack: ['PYTHON', 'SPACY', 'NLTK', 'PANDAS', 'WEB SCRAPING'],
      img: nlpImg,
      imgAlt: 'Resume Parser data processing platform',
      sourceCode: 'https://github.com/ankit-5002/Automated-Resume-Parser-',
      caseStudy: 'https://github.com/ankit-5002/Automated-Resume-Parser-#readme',
    }
  ];

  return (
    <section id="work">
      <div className="wrap">
        <div className="sec-head reveal in">
          <h2 className="sec-title lm">
            <span style={{ '--d': 1 }}>
              Selected <i>work</i>
            </span>
          </h2>
          <span className="sec-line"></span>
        </div>

        <div className="showcase-grid reveal in">
          {projects.map((p) => (
            <article key={p.id} className="showcase-card">
              {/* Top media / banner area with overlay badges */}
              <div className="showcase-banner">
                <img
                  src={p.img}
                  alt={p.imgAlt}
                  loading="lazy"
                  className="showcase-banner-img"
                />
                <div className="showcase-banner-overlay" aria-hidden="true"></div>

                {/* Top-left dark pill badge */}
                {p.badgeDark && (
                  <span className="showcase-badge-dark">
                    <span className="badge-pulse-dot" aria-hidden="true"></span>
                    {p.badgeDark}
                  </span>
                )}

                {/* Top-right year badge */}
                {p.badgeYear && (
                  <span className="showcase-badge-year">
                    {p.badgeYear}
                  </span>
                )}
              </div>

              {/* Card body */}
              <div className="showcase-body">
                <h3 className="showcase-title">{p.title}</h3>
                <span className="showcase-sub">{p.sub}</span>
                <p className="showcase-desc">{p.desc}</p>

                {/* Separating line between description and tech stack */}
                <div className="showcase-divider" aria-hidden="true"></div>

                <ul className="showcase-stack">
                  {p.stack.map((tech, i) => (
                    <li key={i}>{tech}</li>
                  ))}
                </ul>

                {/* Footer Action Row */}
                <div className="showcase-footer">
                  <div className="showcase-links-group">
                    <a
                      href={p.sourceCode}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="showcase-link-item"
                    >
                      <span>Source code</span>
                      <ArrowUpRight size={12} />
                    </a>
                    <span className="showcase-link-dot" aria-hidden="true">·</span>
                    <a
                      href={p.caseStudy}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="showcase-link-item"
                    >
                      <span>Case study</span>
                      <ArrowUpRight size={12} />
                    </a>
                  </div>

                  <a
                    href={p.caseStudy}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="showcase-action-btn"
                    aria-label={`Open ${p.title} case study`}
                  >
                    <ArrowRight size={14} />
                  </a>
                </div>
              </div>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}
