import React, { useEffect } from 'react';
import { createPortal } from 'react-dom';

interface ModalProps {
  isOpen: boolean;
  onClose: () => void;
  children: React.ReactNode;
  className?: string;
}

const Modal: React.FC<ModalProps> = ({ isOpen, onClose, children, className = '' }) => {
  useEffect(() => {
    if (isOpen) {
      const handleKeyDown = (e: KeyboardEvent) => {
        if (e.key === 'Escape') {
          onClose();
        }
      };
      document.addEventListener('keydown', handleKeyDown);
      return () => {
        document.removeEventListener('keydown', handleKeyDown);
      };
    }
  }, [isOpen, onClose]);

  if (!isOpen) return null;

  return createPortal(
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-50">
      <div
        className={`relative w-full max-w-lg max-h-[90vh] overflow-y-auto ${className}`}
        role="dialog"
        aria-modal="true"
        onClick={e => {
          if (e.target === e.currentTarget) onClose();
        }}
      >
        <div className="relative bg-white rounded-lg shadow-lg">
          {/* Close button */}
          <button
            className="absolute top-3 right-3 text-gray-500 hover:text-gray-700"
            onClick={onClose}
            aria-label="Close modal"
          >
            ×
          </button>
          <div className="p-6">{children}</div>
        </div>
      </div>
    </div>,
    document.body
  );
};

export default Modal;