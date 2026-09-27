import { ArrowUpRight } from 'lucide-react';

export default function Work() {
  return (
    <section id="work">
      <div className="wrap">
        <div className="sec-head reveal in">
          <span className="sec-num">02</span>
          <h2 className="sec-title lm">
            <span style={{ '--d': 1 }}>
              Selected <i>work</i>
            </span>
          </h2>
          <span className="sec-line"></span>
          <span className="sec-note">three projects, each with receipts — repos below</span>
        </div>

        <div className="board reveal in">
          <span className="tape tape--tl"></span>
          <span className="board-tag">everything here ran, not just demoed</span>

          {/* 01 · EcoPackAI */}
          <article className="art-row reveal in">
            <span className="art-num">01</span>
            <div className="artifact" style={{ '--tilt': '1.6deg' }}>
              <figure className="sticker sticker--land">
                <span className="p-stamp">INFOSYS SPRINGBOARD</span>
                <img
                  src="https://picsum.photos/seed/ecopack-yn/800/500.jpg"
                  alt="EcoPackAI analytics dashboard"
                  loading="lazy"
                />
                <figcaption>97% accuracy — and 22% off the material bill in simulation.</figcaption>
              </figure>
            </div>
            <div className="art-info">
              <h3>EcoPackAI</h3>
              <span className="p-sub">Full-Stack ML Platform · Dec 2025 — Feb 2026</span>
              <p className="p-desc">
                Built at Infosys Springboard: a full-stack platform (Flask, PostgreSQL, REST APIs) that recommends sustainable packaging from product dimensions and category. Predictive models estimate carbon footprint and cost efficiency — recommendations cut simulated material cost by 22%, consolidated into an analytics dashboard with modular, scalability-first backend services.
              </p>
              <ul className="p-stack">
                <li>FLASK</li>
                <li>POSTGRESQL</li>
                <li>REST APIS</li>
                <li>SCIKIT-LEARN</li>
                <li>PANDAS</li>
              </ul>
              <div className="p-links">
                <a
                  className="p-link"
                  href="https://github.com/yourname/ecopackai"
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  REPO <ArrowUpRight size={14} />
                </a>
              </div>
            </div>
          </article>

          {/* 02 · RAG Chatbot */}
          <article className="art-row reveal in">
            <span className="art-num">02</span>
            <div className="artifact" style={{ '--tilt': '-1.4deg' }}>
              <div className="ticket">
                <div className="tk-body">
                  <span className="tk-year">2025</span>
                  <div className="tk-head">
                    <span className="stamp-sq tk-seal">R</span>
                    <span className="tk-admit">ADMIT 1</span>
                  </div>
                  <p className="tk-line">your ticket to <b>cited answers</b></p>
                  <p className="tk-word">RAG Chatbot</p>
                  <div className="tk-rows">
                    <span>BM25 + VECTOR</span>
                    <span>CROSS-ENCODER RERANK</span>
                    <span>HALLUCINATION-GUARDED</span>
                  </div>
                </div>
                <div className="tk-stub">
                  <span className="barcode" aria-hidden="true"></span>
                  <span className="tk-seat">ROW RAG · SEAT №1</span>
                </div>
              </div>
            </div>
            <div className="art-info">
              <h3>RAG Chatbot</h3>
              <span className="p-sub">AI Chatbot Application (RAG System) · 2025</span>
              <p className="p-desc">
                A production-grade chatbot REST API (Python, FastAPI, ChromaDB) combining BM25 keyword search with semantic vector search and cross-encoder reranking. Citation enforcement and hallucination guards keep answers honest; a 50–200 question evaluation dataset with automated CI/CD testing keeps them that way on every commit.
              </p>
              <ul className="p-stack">
                <li>PYTHON</li>
                <li>FASTAPI</li>
                <li>CHROMADB</li>
                <li>LANGCHAIN</li>
                <li>CI/CD</li>
              </ul>
              <div className="p-links">
                <a
                  className="p-link"
                  href="https://github.com/yourname/rag-chatbot"
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  REPO <ArrowUpRight size={14} />
                </a>
              </div>
            </div>
          </article>

          {/* 03 · Resume Parser */}
          <article className="art-row reveal in">
            <span className="art-num">03</span>
            <div className="artifact" style={{ '--tilt': '-1.6deg' }}>
              <div className="tag">
                <svg className="tag-string doodle doodle--chalk" viewBox="0 0 70 44" aria-hidden="true">
                  <path pathLength="1" d="M62 8 C 40 2, 16 6, 8 30" />
                </svg>
                <span className="tag-hole" aria-hidden="true"></span>
                <div className="tag-care">
                  <span className="care-ic">
                    <svg viewBox="0 0 24 24" fill="none">
                      <path pathLength="1" d="M4 10 h16 v10 h-16 z" />
                      <path pathLength="1" d="M8 7 v-4 m0 0 l-2 2 m2 -2 l2 2" />
                      <path pathLength="1" d="M16 7 v-4 m0 0 l-2 2 m2 -2 l2 2" />
                    </svg>
                    <span>EXTRACT</span>
                  </span>
                  <span className="care-ic">
                    <svg viewBox="0 0 24 24" fill="none">
                      <path pathLength="1" d="M12 4 c4 5 6 7 6 10 a6 6 0 0 1 -12 0 c0 -3 2 -5 6 -10 z" />
                      <path pathLength="1" d="M5 5 L19 19" />
                    </svg>
                    <span>NO TEARS</span>
                  </span>
                  <span className="care-ic">
                    <svg viewBox="0 0 24 24" fill="none">
                      <path pathLength="1" d="M12 3 v18 M5 7 l14 10 M19 7 L5 17" />
                    </svg>
                    <span>STRUCTURED</span>
                  </span>
                  <span className="care-ic">
                    <svg viewBox="0 0 24 24" fill="none">
                      <path pathLength="1" d="M12 20 C 5 14 4 9 7 7 c2 -1.5 4 0 5 2 c1 -2 3 -3.5 5 -2 c3 2 2 7 -5 13 z" />
                    </svg>
                    <span>WITH CARE</span>
                  </span>
                </div>
                <p className="tag-hand">
                  parses resumes <b>with care</b> — 85%+ extraction accuracy, 30% fewer processing errors, and 40% less manual job-search grind.
                </p>
                <p className="tag-meta">SPACY · NLTK · PANDAS · TAG №0003 · 2025</p>
              </div>
            </div>
            <div className="art-info">
              <h3>Resume Parser</h3>
              <span className="p-sub">Automated Data Processing &amp; Analysis Tool · 2025</span>
              <p className="p-desc">
                A Python NLP pipeline (spaCy, NLTK, Pandas) that pulls structured information — skills, experience, education — out of unformatted resumes at 85%+ accuracy with 30% fewer processing errors. Then it closes the loop: extracted profiles are matched against listings scraped from multiple job platforms, cutting manual job-search effort by 40%.
              </p>
              <ul className="p-stack">
                <li>PYTHON</li>
                <li>SPACY</li>
                <li>NLTK</li>
                <li>PANDAS</li>
                <li>WEB SCRAPING</li>
              </ul>
              <div className="p-links">
                <a
                  className="p-link"
                  href="https://github.com/yourname/resume-parser"
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  REPO <ArrowUpRight size={14} />
                </a>
              </div>
            </div>
          </article>
        </div>
      </div>
    </section>
  );
}
