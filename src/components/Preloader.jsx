import { useState, useEffect } from 'react';

const LABELS = [
  'sharpening <i>pencils</i>…',
  'ruling the <i>pages</i>…',
  'docking <i>the GPU seal</i>…',
  'ink is <i>drying</i>…',
];

export default function Preloader({ onComplete }) {
  const [count, setCount] = useState('000');
  const [labelIndex, setLabelIndex] = useState(0);
  const [isDone, setIsDone] = useState(false);

  useEffect(() => {
    const reducedMotion = matchMedia('(prefers-reduced-motion: reduce)').matches;
    const duration = reducedMotion ? 150 : 1150;
    const startTime = performance.now();

    const labelInterval = setInterval(() => {
      setLabelIndex(prev => (prev + 1) % LABELS.length);
    }, 260);

    let animationFrame;
    const tick = now => {
      const p = Math.min(1, (now - startTime) / duration);
      const e = 1 - Math.pow(1 - p, 3);
      setCount(String(Math.round(e * 100)).padStart(3, '0'));

      if (p < 1) {
        animationFrame = requestAnimationFrame(tick);
      } else {
        clearInterval(labelInterval);
        setIsDone(true);
        document.body.classList.remove('locked');
        if (onComplete) onComplete();
      }
    };

    animationFrame = requestAnimationFrame(tick);

    return () => {
      clearInterval(labelInterval);
      cancelAnimationFrame(animationFrame);
    };
  }, [onComplete]);

  if (isDone) return null;

  return (
    <div id="preloader" className={isDone ? 'done' : ''}>
      <div className="pre-in">
        <span id="pre-count">{count}</span>
        <span
          className="pre-label"
          id="pre-label"
          dangerouslySetInnerHTML={{ __html: LABELS[labelIndex] }}
        />
      </div>
    </div>
  );
}
