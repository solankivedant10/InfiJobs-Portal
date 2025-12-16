import React from 'react';
import { Link } from 'react-router-dom';
import {
    Wrench, Library, Database, FileInput, Filter, Search, BarChart3, Calculator, Clock, ExternalLink
} from 'lucide-react';
import type { LucideIcon } from 'lucide-react';
import { dataAnalyticsTutorialData } from '../../../data/dataAnalyticsTutorialData';

const iconMap: Record<string, LucideIcon> = {
    Wrench, Library, Database, FileInput, Filter, Search, BarChart3, Calculator, Clock
};

const accentColors: Record<string, string> = {
    emerald: 'border-t-emerald-500 hover:border-emerald-400',
    cyan: 'border-t-cyan-500 hover:border-cyan-400',
    purple: 'border-t-purple-500 hover:border-purple-400',
    orange: 'border-t-orange-500 hover:border-orange-400',
    rose: 'border-t-rose-500 hover:border-rose-400',
    indigo: 'border-t-indigo-500 hover:border-indigo-400',
    blue: 'border-t-blue-500 hover:border-blue-400',
    amber: 'border-t-amber-500 hover:border-amber-400',
    violet: 'border-t-violet-500 hover:border-violet-400'
};

const DaTopicCards: React.FC = () => {
    return (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 px-4 md:px-8 py-8 max-w-7xl mx-auto">
            {dataAnalyticsTutorialData.map((topic) => {
                const IconComponent = iconMap[topic.icon] || BarChart3;
                const borderColor = accentColors[topic.accentColor] || accentColors.emerald;

                return (
                    <div
                        key={topic.id}
                        className={`
              bg-[#1a1f2e] rounded-xl border border-gray-700/50 border-t-4 ${borderColor}
              hover:bg-[#1e2538] transition-all duration-300 group
            `}
                    >
                        {/* Header */}
                        <div className="p-5 pb-3">
                            <div className="flex items-center gap-3 mb-3">
                                <div className={`w-10 h-10 rounded-lg flex items-center justify-center ${topic.iconBg}`}>
                                    <IconComponent className="w-5 h-5" />
                                </div>
                                <h3 className="font-semibold text-gray-100 text-lg leading-tight">
                                    {topic.title}
                                </h3>
                            </div>
                            <p className="text-gray-400 text-sm leading-relaxed">
                                {topic.description}
                            </p>
                        </div>

                        {/* Subtopics */}
                        <div className="px-5 pb-3">
                            <ul className="space-y-1.5">
                                {topic.subtopics.slice(0, 5).map((sub, idx) => (
                                    <li key={idx} className="text-sm text-gray-500 flex items-start gap-2">
                                        <span className="text-gray-600 mt-0.5">›</span>
                                        <span className="truncate">{sub.title}</span>
                                    </li>
                                ))}
                                {topic.subtopics.length > 5 && (
                                    <li className="text-sm text-gray-600 pl-4">
                                        +{topic.subtopics.length - 5} more...
                                    </li>
                                )}
                            </ul>
                        </div>

                        {/* Footer */}
                        <div className="p-5 pt-3 border-t border-gray-700/30">
                            <Link
                                to={`/da-portal/${topic.id}`}
                                className="inline-flex items-center gap-2 text-sm font-medium text-emerald-400 hover:text-emerald-300 transition-colors group-hover:gap-3"
                            >
                                Start Learning
                                <ExternalLink className="w-4 h-4" />
                            </Link>
                        </div>
                    </div>
                );
            })}
        </div>
    );
};

export default DaTopicCards;
