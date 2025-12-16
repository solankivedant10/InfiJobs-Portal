import React from 'react';

const Footer: React.FC = () => {
    return (
        <footer
            className="
        relative z-20 text-center py-6
        bg-black/40 backdrop-blur-xl
        border-t border-white/10
        shadow-[0_0_18px_rgba(59,130,246,0.25)]
      "
        >
            <p className="tracking-wide text-sm text-gray-400">
                <a
                    href="https://infijobs.pro/"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="hover:text-blue-300 transition-colors duration-300"
                >
                    © 2025 InfiJobs · All rights reserved. Built with love by Vedant.
                </a>
            </p>

            {/* Soft top fade */}
            <div className="pointer-events-none absolute inset-x-0 top-0 h-6 bg-gradient-to-b from-black/50 to-transparent" />
        </footer>
    );
};

export default Footer;
