import React, { PropsWithChildren } from 'react';

// --- Button Component ---
interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
    variant?: 'primary' | 'secondary' | 'danger' | 'success' | 'ghost' | 'outline';
    isLoading?: boolean;
    size?: 'sm' | 'md' | 'lg';
}

export const Button: React.FC<ButtonProps> = ({
    children,
    variant = 'primary',
    isLoading,
    className = '',
    disabled,
    size = 'md',
    ...props
}) => {
    // Base layout
    const baseStyles = "rounded-xl font-semibold transition-all duration-200 flex items-center justify-center gap-2 disabled:opacity-50 disabled:cursor-not-allowed active:scale-95 focus:outline-none focus:ring-2 focus:ring-offset-2 dark:focus:ring-offset-gray-900";

    // Sizes
    const sizes = {
        sm: "px-3 py-1.5 text-sm",
        md: "px-6 py-3 text-base",
        lg: "px-8 py-4 text-lg"
    };

    // Variants (Updated for Dark/Space Theme)
    const variants = {
        primary: "bg-blue-600 text-white hover:bg-blue-500 shadow-lg shadow-blue-500/30 border border-transparent",
        secondary: "bg-gray-700 text-white hover:bg-gray-600 border border-gray-600",
        danger: "bg-red-600 text-white hover:bg-red-500 shadow-lg shadow-red-500/30",
        success: "bg-emerald-600 text-white hover:bg-emerald-500 shadow-lg shadow-emerald-500/30",
        ghost: "bg-transparent text-gray-400 hover:text-white hover:bg-white/5",
        outline: "bg-transparent border-2 border-gray-600 text-gray-300 hover:border-blue-500 hover:text-blue-400"
    };

    return (
        <button
            className={`${baseStyles} ${sizes[size]} ${variants[variant]} ${className}`}
            disabled={disabled || isLoading}
            {...props}
        >
            {isLoading && (
                <svg className="animate-spin -ml-1 mr-2 h-4 w-4 text-current" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                    <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                    <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                </svg>
            )}
            {children}
        </button>
    );
};

// --- Card Component ---
export const Card: React.FC<PropsWithChildren<{ className?: string }>> = ({ children, className = '' }) => {
    return (
        <div className={`
      bg-white/5 dark:bg-gray-800/50 
      backdrop-blur-xl 
      border border-white/10 dark:border-gray-700 
      shadow-xl rounded-2xl 
      p-6 md:p-8 
      ${className}
    `}>
            {children}
        </div>
    );
};

// --- Input Styling Helper ---
export const inputClasses = `
  w-full px-4 py-3 rounded-xl 
  bg-gray-50 dark:bg-gray-900/50 
  border border-gray-200 dark:border-gray-700 
  text-gray-900 dark:text-white 
  placeholder-gray-400 
  focus:border-blue-500 focus:ring-2 focus:ring-blue-500/20 
  outline-none transition-all
`;
