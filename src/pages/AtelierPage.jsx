import { useEffect } from 'react';
import Footer from '../components/Footer';

export default function AtelierPage({ onNavigate }) {
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
        <div className="wrap">
          <div className="sec-head reveal in" style={{ marginTop: '40px' }}>
            <span className="sec-num">04</span>
            <h2 className="sec-title lm">
              <span style={{ '--d': 1 }}>
                <i>Atelier</i>
              </span>
            </h2>
            <span className="sec-line"></span>
            <span className="sec-note">experimental space — under construction</span>
          </div>
        </div>
      </main>
      <Footer />
    </div>
  );
}
