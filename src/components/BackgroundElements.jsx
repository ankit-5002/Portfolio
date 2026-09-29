import { useEffect } from 'react';

const STAMPS = [
  // 0: bird/stamp
  <svg key="s0" viewBox="0 0 24 24" width="20" height="20" stroke="currentColor" fill="none" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round"><path d="M12 21a9 9 0 1 0 0-18 9 9 0 0 0 0 18z" /><path d="M9 10h.01M15 10h.01M9.5 15a3.5 3.5 0 0 0 5 0" /></svg>,
  // 1: flower linocut
  <svg key="s1" viewBox="0 0 24 24" width="20" height="20" stroke="currentColor" fill="none" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round"><path d="M12 15a3 3 0 1 0 0-6 3 3 0 0 0 0 6z" /><path d="M12 4a2 2 0 0 0-2 2v1a2 2 0 1 0 4 0V6a2 2 0 0 0-2-2zM12 17v1a2 2 0 1 0 4 0v-1a2 2 0 0 0-4 0zM4 12a2 2 0 0 0 2-2H5a2 2 0 1 0 0 4h1a2 2 0 0 0-2-2zM17 12a2 2 0 0 0 2 2h1a2 2 0 1 0 0-4h-1a2 2 0 0 0-2 2z" /></svg>,
  // 2: window/cursor linocut
  <svg key="s2" viewBox="0 0 24 24" width="20" height="20" stroke="currentColor" fill="none" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round"><rect x="3" y="4" width="18" height="16" rx="2" /><path d="M3 9h18M8 6h.01M11 6h.01M14 6h.01M12 13l4 4m-4 0l4-4" /></svg>,
  // 3: potted plant
  <svg key="s3" viewBox="0 0 24 24" width="20" height="20" stroke="currentColor" fill="none" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round"><path d="M7 15l1.5 6h7L17 15" /><path d="M12 15V8M12 10a4 4 0 0 0-4-4M12 12a4 4 0 0 1 4-4" /></svg>,
  // 4: owl / bird
  <svg key="s4" viewBox="0 0 24 24" width="20" height="20" stroke="currentColor" fill="none" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round"><path d="M12 2C8 2 5 5 5 9c0 6 3 11 7 13 4-2 7-7 7-13 0-4-3-7-7-7z" /><circle cx="9" cy="9" r="2" /><circle cx="15" cy="9" r="2" /><path d="M12 11l-1 2h2z" /></svg>,
  // 5: ramen / bowl
  <svg key="s5" viewBox="0 0 24 24" width="20" height="20" stroke="currentColor" fill="none" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round"><path d="M4 11a8 8 0 0 0 16 0H4z" /><path d="M6 11V6M10 11V6M14 11V6M18 11V6M4 6l16-2" /></svg>,
];

export default function BackgroundElements() {
  const leftRail = Array.from({ length: 12 }, (_, i) => ({
    key: `l-${i}`,
    stamp: STAMPS[i % STAMPS.length],
  }));

  const rightRail = Array.from({ length: 12 }, (_, i) => ({
    key: `r-${i}`,
    stamp: STAMPS[(i + 3) % STAMPS.length],
  }));

  return (
    <>
      {/* Hand-drawn SVG engine */}
      <svg width="0" height="0" style={{ position: 'absolute' }} aria-hidden="true">
        <defs>
          <filter id="squiggle" x="-20%" y="-20%" width="140%" height="140%">
            <feTurbulence type="fractalNoise" baseFrequency="0.045" numOctaves="3" seed="7" result="n" />
            <feDisplacementMap in="SourceGraphic" in2="n" scale="2.6" />
          </filter>
        </defs>
      </svg>

      <div id="grain"></div>
      <div className="stamp-rail" id="rail-l" aria-hidden="true">
        {leftRail.map(item => (
          <span key={item.key} className="stamp-sq stamp-red">
            {item.stamp}
          </span>
        ))}
      </div>
      <div className="stamp-rail" id="rail-r" aria-hidden="true">
        {rightRail.map(item => (
          <span key={item.key} className="stamp-sq stamp-red">
            {item.stamp}
          </span>
        ))}
      </div>
    </>
  );
}
