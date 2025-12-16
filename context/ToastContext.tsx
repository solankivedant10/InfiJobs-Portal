/**
 * Toast Context - Global Toast Notification System
 * 
 * Provides toast notifications for success, error, info, and warning messages.
 */

import React, { createContext, useContext, useState, useCallback, ReactNode } from 'react';
import { CheckCircle, XCircle, Info, AlertTriangle, X } from 'lucide-react';

// =============================================================================
// TYPES
// =============================================================================

type ToastType = 'success' | 'error' | 'info' | 'warning';

interface Toast {
    id: string;
    type: ToastType;
    message: string;
    duration?: number;
}

interface ToastContextType {
    showToast: (message: string, type?: ToastType, duration?: number) => void;
    success: (message: string, duration?: number) => void;
    error: (message: string, duration?: number) => void;
    info: (message: string, duration?: number) => void;
    warning: (message: string, duration?: number) => void;
}

const ToastContext = createContext<ToastContextType | undefined>(undefined);

// =============================================================================
// TOAST PROVIDER
// =============================================================================

export const ToastProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
    const [toasts, setToasts] = useState<Toast[]>([]);

    const removeToast = useCallback((id: string) => {
        setToasts(prev => prev.filter(toast => toast.id !== id));
    }, []);

    const showToast = useCallback((message: string, type: ToastType = 'info', duration: number = 3000) => {
        const id = `toast-${Date.now()}-${Math.random()}`;
        const newToast: Toast = { id, type, message, duration };

        setToasts(prev => [...prev, newToast]);

        // Auto-remove after duration
        if (duration > 0) {
            setTimeout(() => removeToast(id), duration);
        }
    }, [removeToast]);

    const success = useCallback((message: string, duration?: number) => {
        showToast(message, 'success', duration);
    }, [showToast]);

    const error = useCallback((message: string, duration?: number) => {
        showToast(message, 'error', duration);
    }, [showToast]);

    const info = useCallback((message: string, duration?: number) => {
        showToast(message, 'info', duration);
    }, [showToast]);

    const warning = useCallback((message: string, duration?: number) => {
        showToast(message, 'warning', duration);
    }, [showToast]);

    return (
        <ToastContext.Provider value={{ showToast, success, error, info, warning }}>
            {children}
            <ToastContainer toasts={toasts} onRemove={removeToast} />
        </ToastContext.Provider>
    );
};

// =============================================================================
// TOAST CONTAINER
// =============================================================================

const ToastContainer: React.FC<{ toasts: Toast[]; onRemove: (id: string) => void }> = ({ toasts, onRemove }) => {
    return (
        <div className="fixed bottom-4 right-4 z-[9999] flex flex-col gap-2 max-w-md">
            {toasts.map(toast => (
                <ToastItem key={toast.id} toast={toast} onRemove={onRemove} />
            ))}
        </div>
    );
};

// =============================================================================
// TOAST ITEM
// =============================================================================

const ToastItem: React.FC<{ toast: Toast; onRemove: (id: string) => void }> = ({ toast, onRemove }) => {
    const getToastStyles = () => {
        switch (toast.type) {
            case 'success':
                return {
                    bg: 'bg-green-500/90',
                    border: 'border-green-400',
                    icon: <CheckCircle size={20} />,
                };
            case 'error':
                return {
                    bg: 'bg-red-500/90',
                    border: 'border-red-400',
                    icon: <XCircle size={20} />,
                };
            case 'warning':
                return {
                    bg: 'bg-yellow-500/90',
                    border: 'border-yellow-400',
                    icon: <AlertTriangle size={20} />,
                };
            case 'info':
            default:
                return {
                    bg: 'bg-blue-500/90',
                    border: 'border-blue-400',
                    icon: <Info size={20} />,
                };
        }
    };

    const styles = getToastStyles();

    return (
        <div
            className={`${styles.bg} ${styles.border} border backdrop-blur-sm text-white px-4 py-3 rounded-lg shadow-lg flex items-center gap-3 min-w-[300px] animate-in slide-in-from-right-5 fade-in duration-300`}
        >
            <div className="flex-shrink-0">{styles.icon}</div>
            <p className="flex-1 text-sm font-medium">{toast.message}</p>
            <button
                onClick={() => onRemove(toast.id)}
                className="flex-shrink-0 hover:bg-white/20 rounded p-1 transition-colors"
            >
                <X size={16} />
            </button>
        </div>
    );
};

// =============================================================================
// HOOK
// =============================================================================

export const useToast = (): ToastContextType => {
    const context = useContext(ToastContext);
    if (!context) {
        throw new Error('useToast must be used within a ToastProvider');
    }
    return context;
};
