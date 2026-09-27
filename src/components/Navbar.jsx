import { Menu } from 'lucide-react';

export default function Navbar({ onOpenMenu }) {
  return (
    <div className="mobile-header-btn">
      <button 
        className="mobile-menu-trigger" 
        onClick={onOpenMenu} 
        aria-label="Open navigation menu"
      >
        <Menu size={22} />
      </button>
    </div>
  );
}
