export default function Beliefs() {
  return (
    <section className="beliefs" aria-label="Beliefs">
      <div className="wrap reveal in">
        <p className="beliefs-kicker">
          in handwriting, so you know i mean it
          <svg viewBox="0 0 40 40" className="doodle doodle--accent" fill="none">
            <path pathLength="1" d="M6 8 C 18 12, 26 20, 29 32" />
            <path pathLength="1" d="M22 29 l7 4 l3 -8" />
          </svg>
        </p>
        <div className="beliefs-row">
          <div className="note note--ruled" style={{ '--r': '-2deg', '--d': 1 }}>
            <p>evals before vibes.</p>
            <span className="note-sub">I BUILT A 50–200 Q EVAL SET. NO EVAL, NO MERGE</span>
          </div>
          <div className="note note--ruled" style={{ '--r': '1.6deg', '--d': 2 }}>
            <p>if it isn't cited, it didn't happen.</p>
            <span className="note-sub">RAG WITH RECEIPTS</span>
          </div>
          <div className="note note--plain" style={{ '--r': '-1.2deg', '--d': 3 }}>
            <span className="tape tape--dark"></span>
            <p>boring tech, exciting results.</p>
            <span className="note-sub">FLASK + POSTGRES WON'T IMPRESS YOU. THE 97% WILL.</span>
          </div>
          <div className="note note--red" style={{ '--r': '2deg', '--d': 4 }}>
            <span className="tape tape--dark"></span>
            <p>care is a feature too.</p>
            <span className="note-sub">THIS SITE — ONE FILE, BY HAND</span>
          </div>
        </div>
      </div>
    </section>
  );
}
