import { ArrowUp } from 'lucide-react';

export default function Footer() {
  const handleScrollTop = () => {
    const reducedMotion = matchMedia('(prefers-reduced-motion: reduce)').matches;
    window.scrollTo({
      top: 0,
      behavior: reducedMotion ? 'auto' : 'smooth',
    });
  };

  return (
    <footer>
      <div className="wrap foot-in">
        <span>© 2026 YOUR NAME</span>
        <span className="foot-hand">
          everything you ship, <b>ship it with care.</b>
        </span>
        <button id="top-btn" onClick={handleScrollTop}>
          BACK TO TOP <ArrowUp size={16} />
        </button>
      </div>
    </footer>
  );
}
