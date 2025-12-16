import React from 'react';
import { useParams, useLocation } from 'react-router-dom';
import {
    Wrench, Library, Database, FileInput, Filter, Search, BarChart3, Calculator, Clock, BookOpen
} from 'lucide-react';
import type { LucideIcon } from 'lucide-react';
import { dataAnalyticsTutorialData } from '../../data/dataAnalyticsTutorialData';
import DaHeroSection from './components/DaHeroSection';
import DaTopicCards from './components/DaTopicCards';
import CodeBlock from '../ml-portal/components/CodeBlock';

const iconMap: Record<string, LucideIcon> = {
    Wrench, Library, Database, FileInput, Filter, Search, BarChart3, Calculator, Clock
};

const DaTopicView: React.FC = () => {
    const { topicId } = useParams<{ topicId: string }>();
    const location = useLocation();

    // Check if we're on the index route (no topicId)
    const isIndexRoute = location.pathname === '/da-portal' || location.pathname === '/da-portal/';

    // If on index route, show hero section and topic cards
    if (isIndexRoute) {
        return (
            <div className="space-y-8">
                <DaHeroSection />
                <DaTopicCards />
            </div>
        );
    }

    // Find the topic by ID
    const topic = dataAnalyticsTutorialData.find(t => t.id === topicId);

    if (!topic) {
        return (
            <div className="flex items-center justify-center h-64">
                <div className="text-center">
                    <h2 className="text-xl font-semibold text-gray-300 mb-2">Topic Not Found</h2>
                    <p className="text-gray-500">The requested topic could not be found.</p>
                </div>
            </div>
        );
    }

    const IconComponent = iconMap[topic.icon] || BarChart3;

    return (
        <div className="px-4 md:px-8 py-8 max-w-4xl mx-auto">
            {/* Topic Card */}
            <div className="relative rounded-2xl overflow-hidden">
                {/* Gradient border effect */}
                <div className="absolute inset-0 bg-gradient-to-br from-emerald-500/20 via-teal-500/20 to-cyan-500/20 rounded-2xl" />

                {/* Inner card */}
                <div className="relative m-[1px] bg-[#1a1f2e] rounded-2xl p-6">
                    {/* Header */}
                    <div className="flex items-center gap-4 mb-6">
                        <div className={`w-12 h-12 rounded-xl flex items-center justify-center ${topic.iconBg}`}>
                            <IconComponent className="w-6 h-6" />
                        </div>
                        <h2 className="text-2xl font-bold text-gray-100">{topic.title}</h2>
                    </div>

                    {/* Description */}
                    <p className="text-gray-300 leading-relaxed mb-8">
                        {topic.description}
                    </p>

                    {/* Subtopics */}
                    <div className="mb-8">
                        <h3 className="text-lg font-semibold text-gray-200 flex items-center gap-2 mb-4">
                            <BookOpen className="w-5 h-5 text-emerald-400" />
                            Topics Covered
                        </h3>
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                            {topic.subtopics.map((sub, idx) => (
                                <div
                                    key={idx}
                                    className="p-4 rounded-lg bg-gray-800/30 border border-gray-700/50 hover:bg-gray-800/50 transition-colors"
                                >
                                    <h4 className="font-medium text-gray-200 mb-1">{sub.title}</h4>
                                    {sub.description && (
                                        <p className="text-sm text-gray-500">{sub.description}</p>
                                    )}
                                </div>
                            ))}
                        </div>
                    </div>

                    {/* Code Example */}
                    {topic.codeExample && (
                        <div>
                            <h3 className="text-lg font-semibold text-gray-200 flex items-center gap-2 mb-4">
                                <span className="w-5 h-5 flex items-center justify-center text-cyan-400">{'</>'}</span>
                                Code Example
                            </h3>
                            <CodeBlock
                                title={topic.codeExample.title}
                                code={topic.codeExample.code}
                                language={topic.codeExample.language}
                            />
                        </div>
                    )}
                </div>
            </div>
        </div>
    );
};

export default DaTopicView;
