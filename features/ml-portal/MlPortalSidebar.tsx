import React from 'react';
import { NavLink } from 'react-router-dom';
import {
    Brain, ChevronLeft, ChevronRight, FileText, Layers, Sparkles, Wrench,
    Scissors, TrendingUp, Target, Circle, Minimize2, Clock, Network,
    HelpCircle, Rocket
} from 'lucide-react';
import type { LucideIcon } from 'lucide-react';
import { mlTutorialData } from '../../data/mlTutorialData';

const iconMap: Record<string, LucideIcon> = {
    Brain, FileText, Layers, Sparkles, Wrench, Scissors,
    TrendingUp, Target, Circle, Minimize2, Clock, Network,
    HelpCircle, Rocket
};

interface MlPortalSidebarProps {
    isCollapsed: boolean;
    onToggleCollapse: () => void;
}

const MlPortalSidebar: React.FC<MlPortalSidebarProps> = ({ isCollapsed, onToggleCollapse }) => {
    return (
        <aside
            className={`
        fixed left-0 top-0 h-screen bg-[#0f1419] border-r border-gray-800/50
        flex flex-col z-40 transition-all duration-300
        ${isCollapsed ? 'w-16' : 'w-56'}
      `}
        >
            {/* Header */}
            <div className="p-4 border-b border-gray-800/50 flex items-center justify-between">
                <div className={`flex items-center gap-3 ${isCollapsed ? 'justify-center w-full' : ''}`}>
                    <div className="w-8 h-8 rounded-lg bg-cyan-500/20 flex items-center justify-center flex-shrink-0">
                        <Brain className="w-5 h-5 text-cyan-400" />
                    </div>
                    {!isCollapsed && (
                        <span className="font-semibold text-gray-100">ML Portal</span>
                    )}
                </div>

                {!isCollapsed && (
                    <button
                        onClick={onToggleCollapse}
                        className="p-1.5 rounded-md hover:bg-gray-800/50 text-gray-400 hover:text-gray-200 transition-colors"
                        title="Collapse sidebar"
                    >
                        <ChevronLeft className="w-4 h-4" />
                    </button>
                )}
            </div>

            {/* Collapsed expand button */}
            {isCollapsed && (
                <button
                    onClick={onToggleCollapse}
                    className="p-2 mx-auto mt-2 rounded-md hover:bg-gray-800/50 text-gray-400 hover:text-gray-200 transition-colors"
                    title="Expand sidebar"
                >
                    <ChevronRight className="w-4 h-4" />
                </button>
            )}

            {/* Navigation links */}
            <nav className="flex-1 overflow-y-auto py-4 px-2 space-y-1 custom-scrollbar">
                {mlTutorialData.map((topic) => {
                    const IconComponent = iconMap[topic.icon] || FileText;

                    return (
                        <NavLink
                            key={topic.id}
                            to={`/ml-portal/${topic.id}`}
                            className={({ isActive }) => `
                flex items-center gap-3 px-3 py-2.5 rounded-lg transition-all duration-200
                ${isActive
                                    ? 'bg-cyan-500/20 text-cyan-400'
                                    : 'text-gray-400 hover:bg-gray-800/50 hover:text-gray-200'
                                }
                ${isCollapsed ? 'justify-center' : ''}
              `}
                            title={isCollapsed ? topic.title : undefined}
                        >
                            <IconComponent className="w-4 h-4 flex-shrink-0" />
                            {!isCollapsed && (
                                <span className="text-sm truncate">{topic.title.replace(' (Most Important!)', '').replace(' (PCA)', '')}</span>
                            )}
                        </NavLink>
                    );
                })}
            </nav>

            {/* Footer */}
            {!isCollapsed && (
                <div className="p-4 border-t border-gray-800/50">
                    <p className="text-xs text-gray-500 text-center">Learn ML step by step</p>
                </div>
            )}
        </aside>
    );
};

export default MlPortalSidebar;
