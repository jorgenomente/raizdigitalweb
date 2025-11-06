import { HTMLAttributes, forwardRef, useEffect } from 'react';
import { X } from 'lucide-react';
import { RaizButton } from './RaizButton';

interface RaizModalProps extends HTMLAttributes<HTMLDivElement> {
  isOpen: boolean;
  onClose: () => void;
  title?: string;
}

export const RaizModal = forwardRef<HTMLDivElement, RaizModalProps>(
  ({ isOpen, onClose, title, children, className = '', ...props }, ref) => {
    useEffect(() => {
      if (isOpen) {
        document.body.style.overflow = 'hidden';
      } else {
        document.body.style.overflow = 'unset';
      }
      return () => {
        document.body.style.overflow = 'unset';
      };
    }, [isOpen]);

    if (!isOpen) return null;

    return (
      <div className="fixed inset-0 z-50 flex items-center justify-center">
        {/* Overlay */}
        <div 
          className="absolute inset-0 bg-black/70 backdrop-blur-sm"
          onClick={onClose}
        ></div>
        
        {/* Modal */}
        <div
          ref={ref}
          className={`
            relative
            bg-[var(--deep-blue)]
            border border-[var(--neural-cyan)]
            glow-cyan
            rounded-xl
            max-w-lg w-full mx-4
            max-h-[90vh]
            overflow-auto
            ${className}
          `}
          {...props}
        >
          {/* Header */}
          <div className="flex items-center justify-between p-6 border-b border-[var(--neural-cyan)]/30">
            <h3 className="text-[var(--neural-cyan)]">{title}</h3>
            <button
              onClick={onClose}
              className="text-[var(--silver-gray)] hover:text-[var(--neural-cyan)] transition-colors"
            >
              <X size={24} />
            </button>
          </div>
          
          {/* Content */}
          <div className="p-6">
            {children}
          </div>
        </div>
      </div>
    );
  }
);

RaizModal.displayName = 'RaizModal';
