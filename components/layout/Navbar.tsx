import React from 'react';
import { useTheme } from '../../shared/hooks';
import { Link, useLocation, useNavigate } from 'react-router-dom';

interface NavbarProps {
    onOpenProfile?: () => void;
}

const navLinks = [
    { href: '/#learning', label: 'Learning Sections', color: 'cyan' },
    { href: '/tutorials', label: 'Tutorial Portal', isRoute: true, color: 'purple' },
    { href: '/#interactive-tools', label: 'Interactive Tools', color: 'amber' },
    { href: '/#platforms', label: 'Platforms', color: 'blue' },
    { href: '/#community', label: 'Community', color: 'blue' },
    { href: '/#screening-questions', label: 'Screening Questions', color: 'amber' },
    { href: '/#projects', label: 'Projects', color: 'purple' },
    { href: '/#certifications', label: 'Certifications', color: 'blue' },
    { href: '/#blog-news', label: 'Blog', color: 'blue' },
    { href: '/#contact', label: 'Contact', color: 'blue' },
    { href: '/practice', label: 'Practice Lab', isRoute: true, color: 'purple' },
];

const Navbar: React.FC<NavbarProps> = ({ onOpenProfile }) => {
    const [theme, toggleTheme] = useTheme();
    const location = useLocation();
    const navigate = useNavigate();

    const handleNavClick = (
        e: React.MouseEvent<HTMLAnchorElement>,
        link: { href: string; isRoute?: boolean }
    ) => {
        if (link.isRoute) return;

        e.preventDefault();
        const targetId = link.href.replace('/#', '');

        const scrollToElement = () => {
            const el = document.getElementById(targetId);
            if (el) el.scrollIntoView({ behavior: 'smooth' });
        };

        if (location.pathname !== '/') {
            navigate('/');
            // Small delay to allow the Home page to mount
            setTimeout(scrollToElement, 100);
        } else {
            scrollToElement();
        }
    };

    return (
        <header className="sticky top-0 z-50 bg-black/50 backdrop-blur-xl border-b border-white/10 shadow-lg">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                <div className="flex justify-between items-center py-4">

                    {/* Logo */}
                    <Link to="/" aria-label="InfiJobs Home" className="flex-shrink-0">
                        <img
                            src="/assets/logo.gif"
                            alt="InfiJobs Logo"
                            className="h-10 w-10 md:h-12 md:w-12 rounded-full ring-2 ring-blue-400/40 shadow-lg"
                        />
                    </Link>

                    {/* Desktop Navigation */}
                    <nav className="hidden lg:flex items-center space-x-1">
                        {navLinks.map((link) => {
                            const isActive = link.isRoute
                                ? location.pathname === link.href
                                : location.hash === link.href.replace('/', '');

                            // Dynamic hover colors using Tailwind's arbitrary values group
                            const hoverColorClass =
                                link.color === 'cyan' ? 'hover:text-cyan-400' :
                                    link.color === 'amber' ? 'hover:text-amber-400' :
                                        link.color === 'purple' ? 'hover:text-purple-400' :
                                            link.color === 'emerald' ? 'hover:text-emerald-400' :
                                                'hover:text-blue-400';

                            return (
                                <Link
                                    key={link.href}
                                    to={link.href}
                                    onClick={(e) => handleNavClick(e, link)}
                                    className={`
                                        px-3 py-2 text-sm font-medium rounded-md transition-all duration-300
                                        hover:bg-white/5 hover:scale-105
                                        ${isActive ? 'text-blue-400 font-bold bg-white/5' : 'text-gray-300'}
                                        ${hoverColorClass}
                                    `}
                                >
                                    {link.label}
                                </Link>
                            );
                        })}
                    </nav>

                    {/* Right Side Buttons */}
                    <div className="flex items-center space-x-4">
                        <button
                            onClick={() => onOpenProfile?.()}
                            className="flex items-center space-x-2 text-gray-200 hover:text-blue-400 transition-colors group"
                        >
                            <div className="w-8 h-8 rounded-full bg-gradient-to-tr from-blue-500 to-purple-500 p-[2px] shadow-lg group-hover:shadow-blue-500/50 transition-shadow">
                                <div className="w-full h-full rounded-full bg-gray-900 flex items-center justify-center">
                                    <i className="fa-solid fa-user text-xs"></i>
                                </div>
                            </div>
                            <span className="hidden md:inline text-sm font-medium">My Profile</span>
                        </button>

                        <button
                            onClick={toggleTheme}
                            className="p-2 rounded-full hover:bg-white/10 transition-colors"
                            aria-label="Toggle Theme"
                        >
                            {theme === 'light' ? '🌙' : '☀️'}
                        </button>
                    </div>
                </div>
            </div>
        </header>
    );
};

export default Navbar;