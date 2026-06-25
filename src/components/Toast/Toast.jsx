import { useEffect } from 'react';

const ICONS = {
  success: 'bi-check-circle-fill',
  warning: 'bi-exclamation-triangle-fill',
};

export default function Toast({ message, type, onClose }) {
  useEffect(() => {
    if (message) {
      const timer = setTimeout(onClose, 3000);
      return () => clearTimeout(timer);
    }
  }, [message, onClose]);

  if (!message) return null;

  return (
    <div className={`toast-custom toast-${type} slide-up`}>
      <i className={`bi ${ICONS[type] || ICONS.success} me-1`} />
      <span>{message}</span>
      <button className="btn-close btn-close-white btn-sm" onClick={onClose} />
    </div>
  );
}
