import React, { useEffect, useRef, ReactNode, useState } from 'react';
import { createPortal } from 'react-dom';

type ModalSize = 'sm' | 'md' | 'lg' | 'xl' | '2xl';

interface ModalProps {
    isOpen: boolean;
    onClose: () => void;
    title?: string;
    children: ReactNode;
    maxWidth?: ModalSize;
    showCloseButton?: boolean;
}

const maxWidthClasses: Record<ModalSize, string> = {
    sm: 'max-w-sm',
    md: 'max-w-md',
    lg: 'max-w-lg',
    xl: 'max-w-xl',
    '2xl': 'max-w-2xl',
};

const Modal: React.FC<ModalProps> = ({
    isOpen,
    onClose,
    title,
    children,
    maxWidth = '2xl',
    showCloseButton = true
}) => {
    const modalRef = useRef<HTMLDivElement>(null);
    const [isVisible, setIsVisible] = useState(isOpen);

    // Handle mount/unmount with animation
    useEffect(() => {
        if (isOpen) setIsVisible(true);
        else {
            const timeout = setTimeout(() => setIsVisible(false), 250); // matches animation duration
            return () => clearTimeout(timeout);
        }
    }, [isOpen]);

    // Scroll Lock + Escape Key
    useEffect(() => {
        const handleEscape = (e: KeyboardEvent) => {
            if (e.key === 'Escape') onClose();
        };

        if (isOpen) {
            document.body.style.overflow = 'hidden';
            document.addEventListener('keydown', handleEscape);
        }

        return () => {
            document.body.style.overflow = 'unset';
            document.removeEventListener('keydown', handleEscape);
        };
    }, [isOpen, onClose]);

    // Focus first element
    useEffect(() => {
        if (isOpen && modalRef.current) {
            const focusable = modalRef.current.querySelectorAll<HTMLElement>(
                'button, [href], input, select, textarea, [tabindex]:not([tabindex="-1"])'
            );
            if (focusable.length > 0) focusable[0].focus();
        }
    }, [isOpen]);

    if (!isVisible) return null;

    return createPortal(
        <div
            className={`
                fixed inset-0 z-[9999] flex items-center justify-center p-4
                transition-opacity duration-300
                ${isOpen ? 'opacity-100' : 'opacity-0'}
            `}
            role="dialog"
            aria-modal="true"
            aria-labelledby={title ? "modal-title" : undefined}
        >
            {/* Backdrop */}
            <div
                className={`
                    absolute inset-0 bg-black/70 backdrop-blur-sm 
                    transition-opacity duration-300
                    ${isOpen ? 'opacity-100' : 'opacity-0'}
                `}
                onClick={onClose}
                aria-hidden="true"
            />

            {/* Modal Box */}
            <div
                ref={modalRef}
                onClick={(e) => e.stopPropagation()}
                className={`
                    relative w-full ${maxWidthClasses[maxWidth]} 
                    bg-gray-800 rounded-lg shadow-2xl p-6 border border-gray-700
                    max-h-[90vh] overflow-y-auto custom-scrollbar

                    transform transition-all duration-300

                    ${isOpen
                        ? 'opacity-100 scale-100 translate-y-0'
                        : 'opacity-0 scale-95 translate-y-4'
                    }
                `}
            >
                {(title || showCloseButton) && (
                    <div className="flex justify-between items-start mb-4 border-b border-gray-700 pb-3">
                        {title && (
                            <h3 id="modal-title" className="text-xl font-bold text-white">
                                {title}
                            </h3>
                        )}
                        {showCloseButton && (
                            <button
                                onClick={onClose}
                                className="text-gray-400 hover:text-white hover:bg-gray-700 rounded-lg p-1 transition-colors"
                                aria-label="Close modal"
                            >
                                <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                                </svg>
                            </button>
                        )}
                    </div>
                )}

                <div className="text-gray-100">
                    {children}
                </div>
            </div>
        </div>,
        document.body
    );
};

export default Modal;
