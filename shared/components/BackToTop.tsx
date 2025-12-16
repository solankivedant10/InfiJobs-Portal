import React, { useEffect, useState } from 'react';

const BackToTop: React.FC = () => {
    const [isVisible, setIsVisible] = useState(false);

    useEffect(() => {
        let ticking = false;

        const handleScroll = () => {
            if (!ticking) {
                window.requestAnimationFrame(() => {
                    if (window.scrollY > 400) {
                        setIsVisible(true);
                    } else {
                        setIsVisible(false);
                    }
                    ticking = false;
                });
                ticking = true;
            }
        };

        window.addEventListener('scroll', handleScroll, { passive: true });
        return () => window.removeEventListener('scroll', handleScroll);
    }, []);

    const scrollToTop = (e: React.MouseEvent) => {
        e.preventDefault();
        window.scrollTo({
            top: 0,
            behavior: 'smooth'
        });
    };

    return (
        <button
            onClick={scrollToTop}
            className={`
        fixed bottom-6 right-6 z-40 p-3 
        bg-blue-600 hover:bg-blue-500 text-white 
        rounded-full shadow-lg shadow-blue-600/30
        transition-all duration-300 transform 
        focus:outline-none focus:ring-2 focus:ring-blue-400 focus:ring-offset-2 focus:ring-offset-gray-900
        ${isVisible
                    ? 'opacity-100 translate-y-0 pointer-events-auto scale-100'
                    : 'opacity-0 translate-y-4 pointer-events-none scale-90'
                }
      `}
            aria-label="Back to top"
        >
            <svg
                xmlns="http://www.w3.org/2000/svg"
                className="h-6 w-6 animate-bounce-slow"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
            >
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2.5" d="M5 15l7-7 7 7" />
            </svg>
        </button>
    );
};

export default BackToTop;
