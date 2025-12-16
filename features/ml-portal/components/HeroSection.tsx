import React from 'react';
import { Link } from 'react-router-dom';
import { Sparkles, ArrowDown } from 'lucide-react';

const HeroSection: React.FC = () => {
    return (
        <div className="text-center py-12 px-4">
            {/* Badge */}
            <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-gradient-to-r from-emerald-500/20 to-cyan-500/20 border border-emerald-500/30 mb-8">
                <Sparkles className="w-4 h-4 text-emerald-400" />
                <span className="text-sm font-medium text-emerald-400">Complete ML Learning Guide</span>
            </div>

            {/* Main heading */}
            <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold mb-6">
                <span className="text-gray-100">Master </span>
                <span className="bg-gradient-to-r from-cyan-400 to-emerald-400 bg-clip-text text-transparent">
                    Machine Learning
                </span>
            </h1>

            {/* Subtitle */}
            <p className="text-gray-400 text-lg md:text-xl max-w-2xl mx-auto mb-8">
                From data cleaning to deep learning — understand every concept with
                interactive visualizations, real examples, and production-ready code.
            </p>

            {/* Feature badges */}
            <div className="flex flex-wrap justify-center gap-4 mb-10">
                <div className="flex items-center gap-2 px-4 py-2 rounded-full bg-gray-800/50 border border-gray-700/50">
                    <span className="w-2 h-2 rounded-full bg-cyan-400" />
                    <span className="text-sm text-gray-300">13 Topics</span>
                </div>
                <div className="flex items-center gap-2 px-4 py-2 rounded-full bg-gray-800/50 border border-gray-700/50">
                    <span className="w-2 h-2 rounded-full bg-emerald-400" />
                    <span className="text-sm text-gray-300">Interactive Charts</span>
                </div>
                <div className="flex items-center gap-2 px-4 py-2 rounded-full bg-gray-800/50 border border-gray-700/50">
                    <span className="w-2 h-2 rounded-full bg-amber-400" />
                    <span className="text-sm text-gray-300">Code Examples</span>
                </div>
            </div>

            {/* CTA button */}
            <Link
                to="/ml-portal/what-is-ml"
                className="inline-flex items-center gap-2 text-cyan-400 hover:text-cyan-300 transition-colors group"
            >
                <span className="font-medium">Start Learning</span>
                <ArrowDown className="w-4 h-4 transform group-hover:translate-y-1 transition-transform" />
            </Link>
        </div>
    );
};

export default HeroSection;
