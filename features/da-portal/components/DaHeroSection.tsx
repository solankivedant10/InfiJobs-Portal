import React from 'react';
import { Link } from 'react-router-dom';
import { BarChart3, ArrowDown, BookOpen, Code, Database } from 'lucide-react';

const DaHeroSection: React.FC = () => {
    return (
        <div className="text-center py-12 px-4">
            {/* Badge */}
            <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-gradient-to-r from-emerald-500/20 to-teal-500/20 border border-emerald-500/30 mb-8">
                <BarChart3 className="w-4 h-4 text-emerald-400" />
                <span className="text-sm font-medium text-emerald-400">COMPLETE CURRICULUM</span>
            </div>

            {/* Main heading */}
            <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold mb-6">
                <span className="text-gray-100">Data Analytics </span>
                <span className="bg-gradient-to-r from-emerald-400 to-teal-400 bg-clip-text text-transparent">
                    Tutorial
                </span>
            </h1>

            {/* Subtitle */}
            <p className="text-gray-400 text-lg md:text-xl max-w-2xl mx-auto mb-8">
                A comprehensive learning path covering everything from data fundamentals to advanced
                analytics techniques. Master the skills employers demand.
            </p>

            {/* Feature badges */}
            <div className="flex flex-wrap justify-center gap-4 mb-10">
                <div className="flex items-center gap-2 px-4 py-2 rounded-full bg-gray-800/50 border border-gray-700/50">
                    <BookOpen className="w-4 h-4 text-emerald-400" />
                    <span className="text-sm text-gray-300">9 Topics</span>
                </div>
                <div className="flex items-center gap-2 px-4 py-2 rounded-full bg-gray-800/50 border border-gray-700/50">
                    <Code className="w-4 h-4 text-cyan-400" />
                    <span className="text-sm text-gray-300">Python Examples</span>
                </div>
                <div className="flex items-center gap-2 px-4 py-2 rounded-full bg-gray-800/50 border border-gray-700/50">
                    <Database className="w-4 h-4 text-amber-400" />
                    <span className="text-sm text-gray-300">Real Datasets</span>
                </div>
            </div>

            {/* CTA button */}
            <Link
                to="/da-portal/tools-skills"
                className="inline-flex items-center gap-2 text-emerald-400 hover:text-emerald-300 transition-colors group"
            >
                <span className="font-medium">Start Learning</span>
                <ArrowDown className="w-4 h-4 transform group-hover:translate-y-1 transition-transform" />
            </Link>
        </div>
    );
};

export default DaHeroSection;
