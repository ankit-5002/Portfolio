import { useEffect } from 'react';
import Journey from '../components/Journey';
import Footer from '../components/Footer';

export default function JourneyPage({ onNavigate }) {
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  return (
    <div className="subpage-wrapper">
      <header className="subpage-nav">
        <button onClick={() => onNavigate('/')} className="subpage-back-btn">
          ← Back to Home
        </button>
      </header>
      <main className="subpage-main">
        <Journey />
      </main>
      <Footer />
    </div>
  );
}
