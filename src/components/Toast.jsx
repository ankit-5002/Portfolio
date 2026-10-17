import { Check } from './LucideIcons';

export default function Toast({ message, visible }) {
  return (
    <div id="toast" className={visible ? 'show' : ''} role="status">
      <Check size={16} />
      <span id="toast-msg">{message}</span>
    </div>
  );
}
