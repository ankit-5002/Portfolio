import React from 'react';

export default function ProjectsShowcase() {
  return (
    <section id="projects-showcase" className="projects-showcase-sec">
      <div className="wrap">

        <div className="projects-canvas-stage reveal in">
          {/* Top-Left Card */}
          <div className="p-card p-card--top-left">
            <div className="p-card-frame">
              <img
                src="https://images.unsplash.com/photo-1618005182384-a83a8bd57fbe?q=80&w=800&auto=format&fit=crop"
                alt="EcoPackAI Sustainable Dashboard UI"
                loading="lazy"
              />
              <div className="p-card-overlay">
                <span className="p-card-title">EcoPackAI</span>
                <span className="p-card-sub">Sustainable ML Packaging Engine</span>
              </div>
            </div>
          </div>

          {/* Top-Right Card (Vertical Portrait) */}
          <div className="p-card p-card--top-right">
            <div className="p-card-frame">
              <img
                src="https://images.unsplash.com/photo-1551650975-87deedd944c3?q=80&w=800&auto=format&fit=crop"
                alt="Mobile AI Assist & Track UI"
                loading="lazy"
              />
              <div className="p-card-overlay">
                <span className="p-card-title">AI Mobility</span>
                <span className="p-card-sub">GPS &amp; Telemetry Streamer</span>
              </div>
            </div>
          </div>


          {/* Bottom-Left Card */}
          <div className="p-card p-card--bottom-left">
            <div className="p-card-frame">
              <img
                src="https://images.unsplash.com/photo-1555066931-4365d14bab8c?q=80&w=800&auto=format&fit=crop"
                alt="Production RAG Citation Engine UI"
                loading="lazy"
              />
              <div className="p-card-overlay">
                <span className="p-card-title">RAG Engine</span>
                <span className="p-card-sub">Cited Vector Search REST API</span>
              </div>
            </div>
          </div>

          {/* Bottom-Right Card */}
          <div className="p-card p-card--bottom-right">
            <div className="p-card-frame">
              <img
                src="https://images.unsplash.com/photo-1551288049-bebda4e38f71?q=80&w=800&auto=format&fit=crop"
                alt="NLP Resume Parser & Matching Analytics UI"
                loading="lazy"
              />
              <div className="p-card-overlay">
                <span className="p-card-title">NLP Resume Parser</span>
                <span className="p-card-sub">Unstructured Data Pipeline</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
