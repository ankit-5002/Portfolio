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
                Built EcoPackAI, a full-stack ML-driven platform that recommends sustainable packaging based on product dimensions and category, achieving 97% model accuracy. Developed predictive models for carbon footprint and cost efficiency; resulting recommendations reduced simulated material cost by 22%. Used PostgreSQL and REST APIs to support structured application data and backend services, with a focus on reliable data processing and scalable system design. Consolidated model insights into an analytics dashboard so packaging recommendations and their cost and sustainability impact could be reviewed in one place.
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
                  href="https://github.com/ankit-5002/Eco-Pack_AI"
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
              <h3>Multimodal RAG Application</h3>
              <span className="p-sub">AI Chatbot Application (RAG System) · 2025</span>
              <p className="p-desc">
                Designed and built a multimodal RAG chatbot using Python and FastAPI, combining BM25 keyword search with semantic vector search and cross-encoder reranking so the LLM receives the most relevant context and returns accurate, citation-backed answers. Applied prompt engineering, citation enforcement and hallucination checks to keep responses grounded in retrieved sources and improve information relevance and reliability through systematic evaluation. Created an evaluation dataset of 30-50 questions and set up automated CI/CD testing to monitor response quality, making the RAG pipeline measurable and repeatable to improve.
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
                  href="https://github.com/ankit-5002/Production-Grade-RAG-System-"
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  REPO <ArrowUpRight size={14} />
                </a>
                <a
                  className="p-link"
                  href="https://retrieva-p4db.onrender.com/"
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  LIVE DEMO <ArrowUpRight size={14} />
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
                Built a NLP based data-processing pipeline to parse unstructured resumes and extract key entities such as skills, work experience, and education, achieving over 85% extraction accuracy. Engineered rule-based and statistical text-cleaning algorithms to normalize complex multi-format documents, reducing downstream data-processing errors by 30%, enabling structured data processing for data-driven recommendations and user decision-making. Implemented a skill-matching engine that paired parsed candidate profiles with web-scraped job listings, cutting manual job-search effort by 40% for end users.
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
                  href="https://github.com/ankit-5002/Automated-Resume-Parser-"
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
