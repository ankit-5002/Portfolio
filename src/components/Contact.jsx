import { useState, useRef, useEffect } from 'react';
import { Copy, Globe, Volume2, VolumeX, Music } from 'lucide-react';

const CHARS = '#/\\{}[]=+*_%?!01';
const EMAIL = 'kr.ankit5002@gmail.com';

export default function Contact({ onShowToast }) {
  const [displayText, setDisplayText] = useState(EMAIL.toUpperCase());
  const [checkedItems, setCheckedItems] = useState([false, false, false]);
  const [customMsg, setCustomMsg] = useState("");
  const [customName, setCustomName] = useState("");
  const [customEmail, setCustomEmail] = useState("");
  const [showCustomForm, setShowCustomForm] = useState(false);
  const [animState, setAnimState] = useState(''); // '' | 'flip-out' | 'flip-in-start'
  const [isMuted, setIsMuted] = useState(true);
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

  const handleToggleForm = (show) => {
    if (show === showCustomForm) return;
    setAnimState('flip-out');

    setTimeout(() => {
      setShowCustomForm(show);
      setAnimState('flip-in-start');

      requestAnimationFrame(() => {
        requestAnimationFrame(() => {
          setAnimState('');
        });
      });
    }, 350);
  };

  return (
    <section id="contact" style={{ position: 'relative' }}>
      <svg
        viewBox="0 0 1440 120"
        preserveAspectRatio="none"
        style={{
          position: 'absolute',
          top: 0,
          left: 0,
          width: '100%',
          height: 'clamp(45px, 6vw, 85px)',
          fill: '#EBE4D4'
        }}
      >
        <path d="M0,0 L 450,0 Q 470,0 480,20 L 530,90 Q 540,110 560,110 L 880,110 Q 900,110 910,90 L 960,20 Q 970,0 990,0 L 1440,0 Z" />
      </svg>
      <div className="sec-head reveal in" style={{
        position: 'absolute',
        top: 'clamp(0px, 0.5vw, 8px)',
        left: '50%',
        transform: 'translateX(-50%)',
        zIndex: 10,
        margin: 0,
        width: 'max-content'
      }}>
        <h2 className="sec-title lm" style={{
          color: '#240605',
          fontFamily: "'Penelope', var(--disp), serif",
          textTransform: 'lowercase',
          fontSize: 'clamp(3.2rem, 6.5vw, 4.8rem)'
        }}>
          <span style={{ '--d': 1 }}>
            say hello
          </span>
        </h2>
      </div>

      <div className="wrap" style={{ position: 'relative', zIndex: 1 }}>

        <div className="c-grid reveal in">
          <div className={`paper-card ${animState === 'flip-out' ? 'note-flip-out' : ''} ${animState === 'flip-in-start' ? 'note-flip-in-start' : ''}`}>
            <span className="tape tape--dark"></span>
            {!showCustomForm ? (
              <>
                <div
                  className="lf-title"
                  style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', gap: '12px' }}
                >
                  What I look for
                  <button
                    onClick={() => handleToggleForm(true)}
                    className="btn-hand btn-hand--paper mag"
                    style={{
                      width: 'auto',
                      whiteSpace: 'nowrap',
                      margin: 0
                    }}
                  >
                    custom message
                  </button>
                </div>
                <div style={{ display: 'grid', gridTemplateColumns: '1.8fr 1fr', gap: '24px', marginTop: '24px' }}>
                  <div>
                    <ul className="lf-list" style={{ marginTop: 0 }}>
                      {[
                        "2026 grad roles & internships (AI / ML)",
                        "team for building real-world AI systems",
                        "meaningful and impactful projects"
                      ].map((text, idx) => (
                        <li
                          key={idx}
                          className={checkedItems[idx] ? '' : 'off'}
                          onClick={() => {
                            const newChecked = [...checkedItems];
                            newChecked[idx] = !newChecked[idx];
                            setCheckedItems(newChecked);
                          }}
                          style={{ cursor: 'pointer', userSelect: 'none' }}
                        >
                          <span className="lf-box">
                            {checkedItems[idx] && (
                              <svg viewBox="0 0 24 24">
                                <path pathLength="1" d="M4 12.5 l5 5.5 L20 6" />
                              </svg>
                            )}
                          </span>
                          <span className="lf-text">{text}</span>
                        </li>
                      ))}
                    </ul>
                    <a className="btn-hand btn-hand--paper mag" href={`mailto:${EMAIL}`}>
                      let's chat!
                    </a>
                    <p className="lf-foot">CHECKED = YES · UNCHECKED = PLEASE NO</p>
                  </div>
                  <div style={{
                    border: '6px solid var(--accent-ink)',
                    borderRadius: '16px',
                    filter: 'url(#squiggle)',
                    aspectRatio: '1 / 1.1',
                    width: '100%',
                    alignSelf: 'center'
                  }}></div>
                </div>
              </>
            ) : (
              <>
                <div
                  className="lf-title"
                  style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', gap: '12px' }}
                >
                  Your custom message
                  <button
                    onClick={() => handleToggleForm(false)}
                    className="btn-hand btn-hand--paper mag"
                    style={{
                      width: 'auto',
                      whiteSpace: 'nowrap',
                      margin: 0
                    }}
                  >
                    back
                  </button>
                </div>
                <div style={{
                  display: 'flex',
                  flexDirection: 'column',
                  gap: '16px',
                  marginTop: '12px',
                  marginBottom: '16px',
                  position: 'relative',
                  paddingLeft: '32px'
                }}>
                  {/* Notebook margin line */}
                  <div style={{
                    position: 'absolute',
                    left: '12px',
                    top: '-10px',
                    bottom: '-10px',
                    width: '2px',
                    backgroundColor: 'rgba(233, 93, 53, 0.3)'
                  }} />
                  <input
                    type="text"
                    className="lf-input"
                    value={customName}
                    onChange={(e) => setCustomName(e.target.value)}
                    placeholder="Name"
                  />
                  <input
                    type="text"
                    className="lf-input"
                    value={customEmail}
                    onChange={(e) => setCustomEmail(e.target.value)}
                    placeholder="Reach me at..."
                    autoComplete="off"
                    data-lpignore="true"
                    data-form-type="other"
                  />
                  <textarea
                    className="lf-input"
                    style={{ minHeight: '96px', resize: 'none' }}
                    value={customMsg}
                    onChange={(e) => setCustomMsg(e.target.value)}
                    placeholder="Message..."
                  />
                </div>
                <a
                  className="btn-hand btn-hand--paper mag"
                  href={`mailto:${EMAIL}?subject=Hello from Portfolio&body=${encodeURIComponent(`Name: ${customName}\nEmail: ${customEmail}\n\nMessage:\n${customMsg}`)}`}
                >
                  send message
                </a>
              </>
            )}
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
                href="https://github.com/ankit-5002"
                target="_blank"
                rel="noopener noreferrer"
              >
                <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M15 22v-4a4.8 4.8 0 0 0-1-3.5c3 0 6-2 6-5.5.08-1.25-.27-2.48-1-3.5.28-1.15.28-2.35 0-3.5 0 0-1 0-3 1.5-2.64-.5-5.36-.5-8 0C6 2 5 2 5 2c-.3 1.15-.3 2.35 0 3.5A5.403 5.403 0 0 0 4 9c0 3.5 3 5.5 6 5.5-.39.49-.68 1.05-.85 1.65-.17.6-.22 1.23-.15 1.85v4"></path><path d="M9 18c-4.51 2-5-2-7-2"></path></svg> GITHUB
              </a>
              <a
                className="soc"
                href="https://www.linkedin.com/in/ankit-kumar5002/"
                target="_blank"
                rel="noopener noreferrer"
              >
                <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M16 8a6 6 0 0 1 6 6v7h-4v-7a2 2 0 0 0-2-2 2 2 0 0 0-2 2v7h-4v-7a6 6 0 0 1 6-6z"></path><rect x="2" y="9" width="4" height="12"></rect><circle cx="4" cy="4" r="2"></circle></svg> LINKEDIN
              </a>
              <a
                className="soc"
                href="https://ankit.antideploy.com"
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
              <span style={{ color: '#EBE4D4' }}>runs on chai &amp; gradient descent. click the cup, it refills.</span>
            </p>
          </div>
        </div>

        <div style={{ marginTop: '220px', display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '20px' }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: '12px', fontSize: '20px', color: 'var(--paper)', opacity: 0.9 }}>
              <Music size={18} color="var(--paper)" />
              <div
                style={{
                  overflow: 'hidden',
                  whiteSpace: 'nowrap',
                  width: '420px',
                  maskImage: 'linear-gradient(to right, transparent, black 5%, black 95%, transparent)',
                  WebkitMaskImage: 'linear-gradient(to right, transparent, black 5%, black 95%, transparent)'
                }}
              >
                <div
                  style={{
                    display: 'inline-block',
                    animation: 'scrollText 20s linear infinite',
                    animationPlayState: isMuted ? 'paused' : 'running',
                    fontFamily: "'Gochi Hand', 'Patrick Hand', cursive",
                    fontSize: '22px',
                    letterSpacing: '0.5px'
                  }}
                >
                  Country roads, take me home. To the place I belong, West Virginia, mountain mama, take me home, country roads... &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
                  Country roads, take me home. To the place I belong, West Virginia, mountain mama, take me home, country roads... &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
                </div>
              </div>
              <Music size={18} color="var(--paper)" />
            </div>

            <button
              onClick={() => setIsMuted(!isMuted)}
              style={{
                background: 'none',
                border: 'none',
                color: 'var(--paper)',
                cursor: 'pointer',
                opacity: 0.8,
                transition: 'opacity 0.2s',
                display: 'flex',
                alignItems: 'center',
                padding: 0
              }}
              onMouseEnter={(e) => e.currentTarget.style.opacity = '1'}
              onMouseLeave={(e) => e.currentTarget.style.opacity = '0.8'}
              aria-label={isMuted ? "Unmute song" : "Mute song"}
            >
              {isMuted ? <VolumeX size={18} /> : <Volume2 size={18} />}
            </button>
          </div>

          <div
            style={{
              fontFamily: 'var(--hand)',
              fontSize: '64px',
              fontWeight: 'normal',
              color: '#EBE4D4',
              marginTop: '50px',
              transform: 'rotate(-4deg)',
              letterSpacing: '1px',
              userSelect: 'none'
            }}
          >
            Ankit <span style={{ fontSize: '32px', fontWeight: 'bold', verticalAlign: 'middle', display: 'inline-block', transform: 'rotate(90deg) translate(-2px, 8px)' }}>:)</span>
          </div>
        </div>

      </div>
    </section>
  );
}
