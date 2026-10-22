import { useEffect } from 'react';
import Work from '../components/Work';
import SideQuests from '../components/SideQuests';
import Ticker from '../components/Ticker';
import Footer from '../components/Footer';

export default function WorkPage({ onNavigate }) {
  useEffect(() => {
    window.scrollTo(0, 0);
    const prevBg = document.body.style.backgroundColor;
    document.body.style.backgroundColor = '#240605';
    return () => {
      document.body.style.backgroundColor = prevBg;
    };
  }, []);

  return (
    <div className="subpage-wrapper work-page-wrapper">
      <main className="subpage-main">
        <Work />
        <Ticker />
        <SideQuests />
      </main>
      <Footer />
    </div>
  );
}
