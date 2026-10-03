import { useEffect } from 'react';
import { X } from 'lucide-react';

const MENU_LINKS = [
  { href: '#about', num: '01', text: 'about' },
  { href: '/work', path: '/work', num: '02', text: 'work' },
  { href: '/about', path: '/about', num: '03', text: 'about' },
  { href: '/atelier', path: '/atelier', num: '04', text: 'atelier' },
  { href: '#quests', num: '05', text: 'side quests' },
  { href: '#contact', num: '06', text: 'say hello' },
];

export default function MobileMenu({ isOpen, onClose, onNavigate }) {
  useEffect(() => {
    if (isOpen) {
      document.body.classList.add('locked');
    } else {
      document.body.classList.remove('locked');
    }
    return () => {
      document.body.classList.remove('locked');
    };
  }, [isOpen]);

  const handleLinkClick = (e, link) => {
    onClose();
    if (link.path && onNavigate) {
      e.preventDefault();
      onNavigate(link.path);
    }
  };

  return (
    <div id="menu" className={isOpen ? 'open' : ''}>
      <div className="wrap menu-head">
        <span className="seal">YN</span>
        <button
          className="menu-close"
          id="menu-close"
          aria-label="Close menu"
          onClick={onClose}
        >
          <X size={20} />
        </button>
      </div>
      <nav className="wrap menu-links">
        {MENU_LINKS.map((link, idx) => (
          <a
            key={link.href}
            href={link.href}
            style={{ '--d': idx + 1 }}
            onClick={(e) => handleLinkClick(e, link)}
          >
            <span>{link.num}</span>
            {link.text}
          </a>
        ))}
      </nav>
      <div className="wrap menu-foot">
        <span>hello@yourname.dev</span>
        <span>india — open to relocate</span>
      </div>
    </div>
  );
}
