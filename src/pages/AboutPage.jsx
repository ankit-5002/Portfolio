import { useEffect } from 'react';
import AboutDetails from '../components/AboutDetails';
import Footer from '../components/Footer';

export default function AboutPage({ onNavigate }) {
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
        <AboutDetails />
      </main>
      <Footer />
    </div>
  );
}
