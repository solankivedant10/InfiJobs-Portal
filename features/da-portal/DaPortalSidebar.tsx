import React from 'react';
import { NavLink } from 'react-router-dom';
import {
    BarChart3, ChevronLeft, ChevronRight, Wrench, Library, Database,
    FileInput, Filter, Search, Calculator, Clock
} from 'lucide-react';
import type { LucideIcon } from 'lucide-react';
import { dataAnalyticsTutorialData } from '../../data/dataAnalyticsTutorialData';

const iconMap: Record<string, LucideIcon> = {
    Wrench, Library, Database, FileInput, Filter, Search, BarChart3, Calculator, Clock
};

interface DaPortalSidebarProps {
    isCollapsed: boolean;
    onToggleCollapse: () => void;
}

const DaPortalSidebar: React.FC<DaPortalSidebarProps> = ({ isCollapsed, onToggleCollapse }) => {
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
                    <div className="w-8 h-8 rounded-lg bg-emerald-500/20 flex items-center justify-center flex-shrink-0">
                        <BarChart3 className="w-5 h-5 text-emerald-400" />
                    </div>
                    {!isCollapsed && (
                        <span className="font-semibold text-gray-100">DA Portal</span>
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
                {dataAnalyticsTutorialData.map((topic) => {
                    const IconComponent = iconMap[topic.icon] || BarChart3;

                    return (
                        <NavLink
                            key={topic.id}
                            to={`/da-portal/${topic.id}`}
                            className={({ isActive }) => `
                flex items-center gap-3 px-3 py-2.5 rounded-lg transition-all duration-200
                ${isActive
                                    ? 'bg-emerald-500/20 text-emerald-400'
                                    : 'text-gray-400 hover:bg-gray-800/50 hover:text-gray-200'
                                }
                ${isCollapsed ? 'justify-center' : ''}
              `}
                            title={isCollapsed ? topic.title : undefined}
                        >
                            <IconComponent className="w-4 h-4 flex-shrink-0" />
                            {!isCollapsed && (
                                <span className="text-sm truncate">{topic.title}</span>
                            )}
                        </NavLink>
                    );
                })}
            </nav>

            {/* Footer */}
            {!isCollapsed && (
                <div className="p-4 border-t border-gray-800/50">
                    <p className="text-xs text-gray-500 text-center">Master Data Analytics</p>
                </div>
            )}
        </aside>
    );
};

export default DaPortalSidebar;
