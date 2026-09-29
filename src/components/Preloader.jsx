import { useState, useEffect } from 'react';

export default function Preloader({ onComplete }) {
  const [progress, setProgress] = useState(0);
  const [isDone, setIsDone] = useState(false);

  useEffect(() => {
    const reducedMotion = matchMedia('(prefers-reduced-motion: reduce)').matches;
    const duration = reducedMotion ? 150 : 1500; // slightly longer for smoother line animation
    const startTime = performance.now();

    let animationFrame;
    const tick = now => {
      const p = Math.min(1, (now - startTime) / duration);
      // Easing: easeInOutQuart
      const e = p < 0.5 ? 8 * p * p * p * p : 1 - Math.pow(-2 * p + 2, 4) / 2;
      setProgress(Math.round(e * 100));

      if (p < 1) {
        animationFrame = requestAnimationFrame(tick);
      } else {
        setTimeout(() => {
          setIsDone(true);
          document.body.classList.remove('locked');
          if (onComplete) onComplete();
        }, 200); // Small pause at 100%
      }
    };

    animationFrame = requestAnimationFrame(tick);

    return () => {
      cancelAnimationFrame(animationFrame);
    };
  }, [onComplete]);

  if (isDone) return null;

  return (
    <div id="preloader" className={isDone ? 'done' : ''}>
      <div className="pre-content">
        
        {/* Progress Line */}
        <div className="pre-line-wrapper">
          <div className="pre-line" style={{ width: `${progress}%` }}></div>
          <span className="pre-percent" style={{ left: `${progress}%` }}>
            {progress}%
          </span>
        </div>

        {/* Text Area */}
        <div className="pre-text-area">
          <h1 className="pre-title">The Portfolio</h1>
          <h2 className="pre-sub">ANKIT KUMAR</h2>
        </div>

      </div>
    </div>
  );
}
