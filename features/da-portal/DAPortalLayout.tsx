import React, { useState } from 'react';
import { Outlet, Link } from 'react-router-dom';
import { Home, Menu } from 'lucide-react';
import DaPortalSidebar from './DaPortalSidebar';

const DAPortalLayout: React.FC = () => {
    const [isSidebarCollapsed, setIsSidebarCollapsed] = useState(false);
    const [isMobileSidebarOpen, setIsMobileSidebarOpen] = useState(false);

    return (
        <div className="min-h-screen bg-[#0a0d12]">
            {/* Desktop Sidebar */}
            <div className="hidden md:block">
                <DaPortalSidebar
                    isCollapsed={isSidebarCollapsed}
                    onToggleCollapse={() => setIsSidebarCollapsed(!isSidebarCollapsed)}
                />
            </div>

            {/* Mobile sidebar overlay */}
            {isMobileSidebarOpen && (
                <div
                    className="fixed inset-0 bg-black/50 z-40 md:hidden"
                    onClick={() => setIsMobileSidebarOpen(false)}
                />
            )}

            {/* Mobile sidebar */}
            <div className={`
        fixed left-0 top-0 h-screen z-50 md:hidden transform transition-transform duration-300
        ${isMobileSidebarOpen ? 'translate-x-0' : '-translate-x-full'}
      `}>
                <DaPortalSidebar
                    isCollapsed={false}
                    onToggleCollapse={() => setIsMobileSidebarOpen(false)}
                />
            </div>

            {/* Main content area */}
            <div
                className={`
          transition-all duration-300
          ${isSidebarCollapsed ? 'md:ml-16' : 'md:ml-56'}
        `}
            >
                {/* Top bar for mobile */}
                <header className="sticky top-0 z-30 md:hidden bg-[#0f1419]/95 backdrop-blur-lg border-b border-gray-800/50">
                    <div className="flex items-center justify-between px-4 py-3">
                        <button
                            onClick={() => setIsMobileSidebarOpen(true)}
                            className="p-2 rounded-lg hover:bg-gray-800/50 text-gray-400"
                        >
                            <Menu className="w-5 h-5" />
                        </button>

                        <span className="font-semibold text-gray-100">DA Portal</span>

                        <Link
                            to="/"
                            className="p-2 rounded-lg hover:bg-gray-800/50 text-gray-400"
                        >
                            <Home className="w-5 h-5" />
                        </Link>
                    </div>
                </header>

                {/* Desktop top bar */}
                <header className="hidden md:block sticky top-0 z-30 bg-[#0a0d12]/95 backdrop-blur-lg border-b border-gray-800/50">
                    <div className="flex items-center justify-between px-6 py-3">
                        <div className="flex items-center gap-4">
                            <Link
                                to="/"
                                className="flex items-center gap-2 text-gray-400 hover:text-gray-200 transition-colors"
                            >
                                <Home className="w-4 h-4" />
                                <span className="text-sm">Back to Home</span>
                            </Link>
                        </div>

                        {/* Emerald gradient bar (decorative) */}
                        <div className="hidden lg:block w-48 h-1.5 rounded-full bg-gradient-to-r from-emerald-500 to-teal-500" />

                        <div className="w-24" />
                    </div>
                </header>

                {/* Page content */}
                <main className="min-h-[calc(100vh-60px)]">
                    <Outlet />
                </main>
            </div>
        </div>
    );
};

export default DAPortalLayout;
