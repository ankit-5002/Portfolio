import { useState, useRef, useEffect } from 'react';
import { Copy, Globe } from 'lucide-react';

const CHARS = '#/\\{}[]=+*_%?!01';
const EMAIL = 'hello@yourname.dev';

export default function Contact({ onShowToast }) {
  const [displayText, setDisplayText] = useState(EMAIL.toUpperCase());
  const scrambleRef = useRef(null);

  const scrambleText = (newText, boost = 0) => {
    const old = displayText;
    const len = Math.max(old.length, newText.length);
    const queue = [];
    for (let i = 0; i < len; i++) {
      const start = Math.floor(Math.random() * 24);
      queue.push({
        from: old[i] || '',
        to: newText[i] || '',
        start,
        end: start + 14 + boost,
        char: '',
      });
    }

    let frame = 0;
    if (scrambleRef.current) cancelAnimationFrame(scrambleRef.current);

    const step = () => {
      let done = 0;
      let out = '';
      for (const q of queue) {
        if (frame >= q.end) {
          done++;
          out += q.to;
        } else if (frame >= q.start) {
          if (!q.char || Math.random() < 0.28) {
            q.char = CHARS[(Math.random() * CHARS.length) | 0];
          }
          out += q.char;
        } else {
          out += q.from;
        }
      }
      setDisplayText(out);
      if (done < queue.length) {
        frame++;
        scrambleRef.current = requestAnimationFrame(step);
      }
    };
    step();
  };

  useEffect(() => {
    scrambleText(EMAIL.toUpperCase(), 4);
    return () => {
      if (scrambleRef.current) cancelAnimationFrame(scrambleRef.current);
    };
  }, []);

  const handleCopyEmail = async () => {
    try {
      await navigator.clipboard.writeText(EMAIL);
    } catch {
      const ta = document.createElement('textarea');
      ta.value = EMAIL;
      document.body.appendChild(ta);
      ta.select();
      document.execCommand('copy');
      ta.remove();
    }
    onShowToast('copied to clipboard!');
  };

  const handleChaiClick = () => {
    onShowToast('chai refilled — focus restored');
  };

  const handleChaiKeyDown = e => {
    if (e.key === 'Enter' || e.key === ' ') {
      e.preventDefault();
      onShowToast('chai refilled — focus restored');
    }
  };

  return (
    <section id="contact">
      <div className="wrap">
        <div className="sec-head reveal in">
          <span className="sec-num">06</span>
          <h2 className="sec-title lm">
            <span style={{ '--d': 1 }}>
              Say <i>hello</i>
            </span>
          </h2>
          <span className="sec-line"></span>
          <span className="sec-note">avg. response &lt; 24h</span>
        </div>

        <div className="c-grid reveal in">
          <div className="paper-card">
            <span className="tape tape--dark"></span>
            <p className="lf-title">What I'm looking for</p>
            <ul className="lf-list">
              <li>
                <span className="lf-box">
                  <svg viewBox="0 0 24 24">
                    <path pathLength="1" d="M4 12.5 l5 5.5 L20 6" />
                  </svg>
                </span>
                2026 grad roles &amp; internships (ML / LLM)
              </li>
              <li>
                <span className="lf-box">
                  <svg viewBox="0 0 24 24">
                    <path pathLength="1" d="M4 12.5 l5 5.5 L20 6" />
                  </svg>
                </span>
                teams with real code review &amp; real evals
              </li>
              <li>
                <span className="lf-box">
                  <svg viewBox="0 0 24 24">
                    <path pathLength="1" d="M4 12.5 l5 5.5 L20 6" />
                  </svg>
                </span>
                problems that need receipts, not demos
              </li>
              <li className="off">
                <span className="lf-box"></span>
                "AI-powered" with nothing to evaluate
              </li>
            </ul>
            <a className="btn-hand btn-hand--paper mag" href={`mailto:${EMAIL}`}>
              let's chat!
            </a>
            <p className="lf-foot">CHECKED = YES · UNCHECKED = PLEASE NO</p>
          </div>

          <div className="c-right">
            <div className="cat-frame">
              <pre aria-hidden="true">{`    /\\_/\\
   ( o.o )    ~ z z z
    > ^ <`}</pre>
              <p className="cat-cap">a local model — small, friendly, zero hallucinations</p>
            </div>

            <div className="c-row">
              <a
                className="c-email"
                id="email-link"
                href={`mailto:${EMAIL}`}
                onMouseEnter={() => scrambleText(EMAIL.toUpperCase(), 0)}
              >
                {displayText}
              </a>
              <button
                className="icon-btn mag"
                id="copy-email"
                aria-label="Copy email address"
                onClick={handleCopyEmail}
              >
                <Copy size={18} />
              </button>
              <span className="c-note">USUALLY REPLIES WITHIN 24 HOURS</span>
            </div>

            <div className="socials">
              <a
                className="soc"
                href="https://github.com/yourname"
                target="_blank"
                rel="noopener noreferrer"
              >
                <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M15 22v-4a4.8 4.8 0 0 0-1-3.5c3 0 6-2 6-5.5.08-1.25-.27-2.48-1-3.5.28-1.15.28-2.35 0-3.5 0 0-1 0-3 1.5-2.64-.5-5.36-.5-8 0C6 2 5 2 5 2c-.3 1.15-.3 2.35 0 3.5A5.403 5.403 0 0 0 4 9c0 3.5 3 5.5 6 5.5-.39.49-.68 1.05-.85 1.65-.17.6-.22 1.23-.15 1.85v4"></path><path d="M9 18c-4.51 2-5-2-7-2"></path></svg> GITHUB
              </a>
              <a
                className="soc"
                href="https://linkedin.com/in/yourname"
                target="_blank"
                rel="noopener noreferrer"
              >
                <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M16 8a6 6 0 0 1 6 6v7h-4v-7a2 2 0 0 0-2-2 2 2 0 0 0-2 2v7h-4v-7a6 6 0 0 1 6-6z"></path><rect x="2" y="9" width="4" height="12"></rect><circle cx="4" cy="4" r="2"></circle></svg> LINKEDIN
              </a>
              <a
                className="soc"
                href="https://yourname.dev"
                target="_blank"
                rel="noopener noreferrer"
              >
                <Globe size={16} /> WEBSITE
              </a>
            </div>

            <p className="c-hand-note">
              <svg
                id="doodle-coffee"
                viewBox="0 0 64 64"
                className="doodle doodle--chalk"
                style={{ width: '44px', height: '44px', pointerEvents: 'auto', cursor: 'pointer' }}
                role="button"
                aria-label="Refill chai"
                tabIndex={0}
                onClick={handleChaiClick}
                onKeyDown={handleChaiKeyDown}
              >
                <path pathLength="1" d="M14 30 h28 v12 a12 12 0 0 1 -12 12 h-4 a12 12 0 0 1 -12 -12 z" />
                <path pathLength="1" d="M42 33 a7 7 0 0 1 0 13" />
                <path pathLength="1" d="M23 8 c -3 4 3 6 0 10" />
                <path pathLength="1" d="M33 6 c -3 4 3 6 0 10" />
              </svg>
              <span>runs on chai &amp; gradient descent. click the cup, it refills.</span>
            </p>
          </div>
        </div>
      </div>
    </section>
  );
}
