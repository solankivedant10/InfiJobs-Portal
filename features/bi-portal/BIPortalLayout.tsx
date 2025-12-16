import React, { useState } from 'react';
import { Outlet, Link, NavLink, useParams, useLocation } from 'react-router-dom';
import { Home, Menu, ChevronLeft, ChevronRight, PieChart } from 'lucide-react';
import type { LucideIcon } from 'lucide-react';
import {
    Layers, Database, Search, Pickaxe, Target, Workflow, Users, GitMerge, AppWindow, LayoutDashboard
} from 'lucide-react';
import { businessIntelligenceTutorialData } from '../../data/businessIntelligenceTutorialData';
import CodeBlock from '../ml-portal/components/CodeBlock';

const iconMap: Record<string, LucideIcon> = {
    PieChart, Layers, Database, Search, Pickaxe, Target, Workflow, Users, GitMerge, AppWindow, LayoutDashboard
};

const BiSidebar: React.FC<{ isCollapsed: boolean; onToggle: () => void }> = ({ isCollapsed, onToggle }) => (
    <aside className={`fixed left-0 top-0 h-screen bg-[#0f1419] border-r border-gray-800/50 flex flex-col z-40 transition-all duration-300 ${isCollapsed ? 'w-16' : 'w-56'}`}>
        <div className="p-4 border-b border-gray-800/50 flex items-center justify-between">
            <div className={`flex items-center gap-3 ${isCollapsed ? 'justify-center w-full' : ''}`}>
                <div className="w-8 h-8 rounded-lg bg-rose-500/20 flex items-center justify-center flex-shrink-0">
                    <PieChart className="w-5 h-5 text-rose-400" />
                </div>
                {!isCollapsed && <span className="font-semibold text-gray-100">BI Portal</span>}
            </div>
            {!isCollapsed && (
                <button onClick={onToggle} className="p-1.5 rounded-md hover:bg-gray-800/50 text-gray-400">
                    <ChevronLeft className="w-4 h-4" />
                </button>
            )}
        </div>
        {isCollapsed && (
            <button onClick={onToggle} className="p-2 mx-auto mt-2 rounded-md hover:bg-gray-800/50 text-gray-400">
                <ChevronRight className="w-4 h-4" />
            </button>
        )}
        <nav className="flex-1 overflow-y-auto py-4 px-2 space-y-1">
            {businessIntelligenceTutorialData.map((topic) => {
                const Icon = iconMap[topic.icon] || PieChart;
                return (
                    <NavLink
                        key={topic.id}
                        to={`/bi-portal/${topic.id}`}
                        className={({ isActive }) => `flex items-center gap-3 px-3 py-2.5 rounded-lg transition-all ${isActive ? 'bg-rose-500/20 text-rose-400' : 'text-gray-400 hover:bg-gray-800/50'} ${isCollapsed ? 'justify-center' : ''}`}
                        title={isCollapsed ? topic.title : undefined}
                    >
                        <Icon className="w-4 h-4 flex-shrink-0" />
                        {!isCollapsed && <span className="text-sm truncate">{topic.title}</span>}
                    </NavLink>
                );
            })}
        </nav>
    </aside>
);

const BiTopicView: React.FC = () => {
    const { topicId } = useParams<{ topicId: string }>();
    const location = useLocation();
    const isIndex = location.pathname === '/bi-portal' || location.pathname === '/bi-portal/';

    if (isIndex) {
        return (
            <div className="text-center py-12 px-4">
                <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-gradient-to-r from-rose-500/20 to-purple-500/20 border border-rose-500/30 mb-8">
                    <PieChart className="w-4 h-4 text-rose-400" />
                    <span className="text-sm font-medium text-rose-400">DATA-DRIVEN DECISIONS</span>
                </div>
                <h1 className="text-4xl md:text-5xl font-bold mb-6">
                    <span className="text-gray-100">Business Intelligence </span>
                    <span className="bg-gradient-to-r from-rose-400 to-purple-400 bg-clip-text text-transparent">Tutorial</span>
                </h1>
                <p className="text-gray-400 text-lg max-w-2xl mx-auto mb-8">
                    Transform data into insights. Build dashboards, create reports, and support data-driven decision making.
                </p>
                <Link to="/bi-portal/what-is-bi" className="inline-flex items-center gap-2 text-rose-400 hover:text-rose-300">
                    <span>Start Learning</span>
                </Link>
            </div>
        );
    }

    const topic = businessIntelligenceTutorialData.find(t => t.id === topicId);
    if (!topic) return <div className="text-center py-12 text-gray-400">Topic not found</div>;

    const Icon = iconMap[topic.icon] || PieChart;

    return (
        <div className="px-4 md:px-8 py-8 max-w-4xl mx-auto">
            <div className="relative rounded-2xl overflow-hidden">
                <div className="absolute inset-0 bg-gradient-to-br from-rose-500/20 via-purple-500/20 to-indigo-500/20 rounded-2xl" />
                <div className="relative m-[1px] bg-[#1a1f2e] rounded-2xl p-6">
                    <div className="flex items-center gap-4 mb-6">
                        <div className={`w-12 h-12 rounded-xl flex items-center justify-center ${topic.iconBg}`}>
                            <Icon className="w-6 h-6" />
                        </div>
                        <h2 className="text-2xl font-bold text-gray-100">{topic.title}</h2>
                    </div>
                    <p className="text-gray-300 leading-relaxed mb-8">{topic.description}</p>
                    <div className="mb-8">
                        <h3 className="text-lg font-semibold text-gray-200 mb-4">Topics Covered</h3>
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                            {topic.subtopics.map((sub, idx) => (
                                <div key={idx} className="p-4 rounded-lg bg-gray-800/30 border border-gray-700/50">
                                    <h4 className="font-medium text-gray-200">{sub.title}</h4>
                                    {sub.description && <p className="text-sm text-gray-500">{sub.description}</p>}
                                </div>
                            ))}
                        </div>
                    </div>
                    {topic.codeExample && (
                        <CodeBlock title={topic.codeExample.title} code={topic.codeExample.code} language={topic.codeExample.language} />
                    )}
                </div>
            </div>
        </div>
    );
};

const BIPortalLayout: React.FC = () => {
    const [collapsed, setCollapsed] = useState(false);
    const [mobileOpen, setMobileOpen] = useState(false);

    return (
        <div className="min-h-screen bg-[#0a0d12]">
            <div className="hidden md:block"><BiSidebar isCollapsed={collapsed} onToggle={() => setCollapsed(!collapsed)} /></div>
            {mobileOpen && <div className="fixed inset-0 bg-black/50 z-40 md:hidden" onClick={() => setMobileOpen(false)} />}
            <div className={`fixed left-0 top-0 h-screen z-50 md:hidden transform transition-transform ${mobileOpen ? 'translate-x-0' : '-translate-x-full'}`}>
                <BiSidebar isCollapsed={false} onToggle={() => setMobileOpen(false)} />
            </div>
            <div className={`transition-all duration-300 ${collapsed ? 'md:ml-16' : 'md:ml-56'}`}>
                <header className="sticky top-0 z-30 md:hidden bg-[#0f1419]/95 backdrop-blur-lg border-b border-gray-800/50">
                    <div className="flex items-center justify-between px-4 py-3">
                        <button onClick={() => setMobileOpen(true)} className="p-2 rounded-lg hover:bg-gray-800/50 text-gray-400"><Menu className="w-5 h-5" /></button>
                        <span className="font-semibold text-gray-100">BI Portal</span>
                        <Link to="/" className="p-2 rounded-lg hover:bg-gray-800/50 text-gray-400"><Home className="w-5 h-5" /></Link>
                    </div>
                </header>
                <header className="hidden md:block sticky top-0 z-30 bg-[#0a0d12]/95 backdrop-blur-lg border-b border-gray-800/50">
                    <div className="flex items-center justify-between px-6 py-3">
                        <Link to="/" className="flex items-center gap-2 text-gray-400 hover:text-gray-200"><Home className="w-4 h-4" /><span className="text-sm">Back to Home</span></Link>
                        <div className="hidden lg:block w-48 h-1.5 rounded-full bg-gradient-to-r from-rose-500 to-purple-500" />
                        <div className="w-24" />
                    </div>
                </header>
                <main className="min-h-[calc(100vh-60px)]"><Outlet /></main>
            </div>
        </div>
    );
};

export { BIPortalLayout, BiTopicView };
export default BIPortalLayout;
