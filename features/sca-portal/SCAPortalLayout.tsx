import React, { useState } from 'react';
import { Outlet, Link, NavLink, useParams, useLocation } from 'react-router-dom';
import { Home, Menu, ChevronLeft, ChevronRight, Truck } from 'lucide-react';
import type { LucideIcon } from 'lucide-react';
import {
    Database, TrendingUp, Package, Settings, Handshake, MapPin, Shield, Award
} from 'lucide-react';
import { supplyChainTutorialData } from '../../data/supplyChainTutorialData';
import CodeBlock from '../ml-portal/components/CodeBlock';

const iconMap: Record<string, LucideIcon> = {
    Truck, Database, TrendingUp, Package, Settings, Handshake, MapPin, Shield, Award
};

const ScaSidebar: React.FC<{ isCollapsed: boolean; onToggle: () => void }> = ({ isCollapsed, onToggle }) => (
    <aside className={`fixed left-0 top-0 h-screen bg-[#0f1419] border-r border-gray-800/50 flex flex-col z-40 transition-all duration-300 ${isCollapsed ? 'w-16' : 'w-56'}`}>
        <div className="p-4 border-b border-gray-800/50 flex items-center justify-between">
            <div className={`flex items-center gap-3 ${isCollapsed ? 'justify-center w-full' : ''}`}>
                <div className="w-8 h-8 rounded-lg bg-teal-500/20 flex items-center justify-center flex-shrink-0">
                    <Truck className="w-5 h-5 text-teal-400" />
                </div>
                {!isCollapsed && <span className="font-semibold text-gray-100">SCA Portal</span>}
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
            {supplyChainTutorialData.map((topic) => {
                const Icon = iconMap[topic.icon] || Truck;
                return (
                    <NavLink
                        key={topic.id}
                        to={`/sca-portal/${topic.id}`}
                        className={({ isActive }) => `flex items-center gap-3 px-3 py-2.5 rounded-lg transition-all ${isActive ? 'bg-teal-500/20 text-teal-400' : 'text-gray-400 hover:bg-gray-800/50'} ${isCollapsed ? 'justify-center' : ''}`}
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

const ScaTopicView: React.FC = () => {
    const { topicId } = useParams<{ topicId: string }>();
    const location = useLocation();
    const isIndex = location.pathname === '/sca-portal' || location.pathname === '/sca-portal/';

    if (isIndex) {
        return (
            <div className="text-center py-12 px-4">
                <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-gradient-to-r from-teal-500/20 to-cyan-500/20 border border-teal-500/30 mb-8">
                    <Truck className="w-4 h-4 text-teal-400" />
                    <span className="text-sm font-medium text-teal-400">SUPPLY CHAIN MANAGEMENT</span>
                </div>
                <h1 className="text-4xl md:text-5xl font-bold mb-6">
                    <span className="text-gray-100">Supply Chain Analyst </span>
                    <span className="bg-gradient-to-r from-teal-400 to-cyan-400 bg-clip-text text-transparent">Tutorial</span>
                </h1>
                <p className="text-gray-400 text-lg max-w-2xl mx-auto mb-8">
                    Master supply chain analysis from data collection to risk management. Optimize logistics and drive business efficiency.
                </p>
                <Link to="/sca-portal/intro-supply-chain" className="inline-flex items-center gap-2 text-teal-400 hover:text-teal-300">
                    <span>Start Learning</span>
                </Link>
            </div>
        );
    }

    const topic = supplyChainTutorialData.find(t => t.id === topicId);
    if (!topic) return <div className="text-center py-12 text-gray-400">Topic not found</div>;

    const Icon = iconMap[topic.icon] || Truck;

    return (
        <div className="px-4 md:px-8 py-8 max-w-4xl mx-auto">
            <div className="relative rounded-2xl overflow-hidden">
                <div className="absolute inset-0 bg-gradient-to-br from-teal-500/20 via-cyan-500/20 to-blue-500/20 rounded-2xl" />
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

const SCAPortalLayout: React.FC = () => {
    const [collapsed, setCollapsed] = useState(false);
    const [mobileOpen, setMobileOpen] = useState(false);

    return (
        <div className="min-h-screen bg-[#0a0d12]">
            <div className="hidden md:block"><ScaSidebar isCollapsed={collapsed} onToggle={() => setCollapsed(!collapsed)} /></div>
            {mobileOpen && <div className="fixed inset-0 bg-black/50 z-40 md:hidden" onClick={() => setMobileOpen(false)} />}
            <div className={`fixed left-0 top-0 h-screen z-50 md:hidden transform transition-transform ${mobileOpen ? 'translate-x-0' : '-translate-x-full'}`}>
                <ScaSidebar isCollapsed={false} onToggle={() => setMobileOpen(false)} />
            </div>
            <div className={`transition-all duration-300 ${collapsed ? 'md:ml-16' : 'md:ml-56'}`}>
                <header className="sticky top-0 z-30 md:hidden bg-[#0f1419]/95 backdrop-blur-lg border-b border-gray-800/50">
                    <div className="flex items-center justify-between px-4 py-3">
                        <button onClick={() => setMobileOpen(true)} className="p-2 rounded-lg hover:bg-gray-800/50 text-gray-400"><Menu className="w-5 h-5" /></button>
                        <span className="font-semibold text-gray-100">SCA Portal</span>
                        <Link to="/" className="p-2 rounded-lg hover:bg-gray-800/50 text-gray-400"><Home className="w-5 h-5" /></Link>
                    </div>
                </header>
                <header className="hidden md:block sticky top-0 z-30 bg-[#0a0d12]/95 backdrop-blur-lg border-b border-gray-800/50">
                    <div className="flex items-center justify-between px-6 py-3">
                        <Link to="/" className="flex items-center gap-2 text-gray-400 hover:text-gray-200"><Home className="w-4 h-4" /><span className="text-sm">Back to Home</span></Link>
                        <div className="hidden lg:block w-48 h-1.5 rounded-full bg-gradient-to-r from-teal-500 to-cyan-500" />
                        <div className="w-24" />
                    </div>
                </header>
                <main className="min-h-[calc(100vh-60px)]"><Outlet /></main>
            </div>
        </div>
    );
};

export { SCAPortalLayout, ScaTopicView };
export default SCAPortalLayout;
