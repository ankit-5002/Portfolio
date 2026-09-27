import { useEffect } from 'react';
import Work from '../components/Work';
import SideQuests from '../components/SideQuests';
import Footer from '../components/Footer';

export default function WorkPage({ onNavigate }) {
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
        <Work />
        <SideQuests />
      </main>
      <Footer />
    </div>
  );
}
