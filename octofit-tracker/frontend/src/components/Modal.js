import React, { useEffect } from 'react';

export default function Modal({ title, show, onClose, children, footer }) {
  useEffect(() => {
    const handler = (e) => { if(e.key === 'Escape') onClose && onClose(); };
    if(show) window.addEventListener('keydown', handler);
    return () => window.removeEventListener('keydown', handler);
  }, [show, onClose]);
  if(!show) return null;
  return (
    <div className="modal fade show" style={{display:'block'}} role="dialog" aria-modal="true">
      <div className="modal-dialog modal-dialog-centered">
        <div className="modal-content">
          <div className="modal-header">
            <h5 className="modal-title">{title}</h5>
            <button type="button" className="btn-close btn-close-white" onClick={onClose} aria-label="Close"></button>
          </div>
          <div className="modal-body">
            {children}
          </div>
          {footer && <div className="modal-footer">{footer}</div>}
        </div>
      </div>
      <div className="modal-backdrop fade show" onClick={onClose} />
    </div>
  );
}
