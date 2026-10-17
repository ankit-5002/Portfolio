import { ArrowUp } from './LucideIcons';

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
        <span>© 2026 Ankit</span>
        <button id="top-btn" onClick={handleScrollTop} aria-label="Scroll back to top of page">
          BACK TO TOP <ArrowUp size={16} aria-hidden="true" />
        </button>
      </div>
    </footer>
  );
}
