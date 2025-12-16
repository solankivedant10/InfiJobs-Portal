import React from 'react';
import {
    Database, Sparkles, Wrench, Scissors, Cpu, CheckCircle, Rocket, Circle, Target, Info
} from 'lucide-react';
import type { LucideIcon } from 'lucide-react';
import { pipelineStages } from '../../../data/mlTutorialData';

const iconMap: Record<string, LucideIcon> = {
    Database, Sparkles, Wrench, Scissors, Cpu, CheckCircle, Rocket, Circle, Target, Info
};

interface InfoBox {
    title: string;
    icon: string;
    items: string[];
}

interface PipelineVisualizerProps {
    infoBoxes?: InfoBox[];
}

const PipelineVisualizer: React.FC<PipelineVisualizerProps> = ({ infoBoxes }) => {
    // Color coding for items
    const colorClasses = [
        'text-cyan-400',
        'text-emerald-400',
        'text-rose-400',
        'text-amber-400',
        'text-purple-400'
    ];

    return (
        <div className="space-y-8">
            {/* Pipeline label */}
            <div className="flex items-center gap-2 text-gray-400 text-sm">
                <span>ML Pipeline (Production)</span>
            </div>

            {/* Pipeline stages */}
            <div className="relative">
                {/* Connection line */}
                <div className="absolute top-1/2 left-0 right-0 h-0.5 bg-gradient-to-r from-blue-500 via-teal-500 to-purple-500 -translate-y-1/2 hidden md:block" />

                {/* Stages */}
                <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-7 gap-4 relative">
                    {pipelineStages.map((stage) => {
                        const IconComponent = iconMap[stage.icon] || Circle;

                        return (
                            <div
                                key={stage.id}
                                className="flex flex-col items-center group"
                            >
                                {/* Icon container */}
                                <div
                                    className={`
                    relative w-16 h-16 rounded-2xl flex items-center justify-center
                    ${stage.color} text-white
                    transform transition-all duration-300 group-hover:scale-110 group-hover:shadow-lg
                    z-10
                  `}
                                >
                                    <IconComponent className="w-7 h-7" />
                                </div>

                                {/* Label */}
                                <span className="mt-3 text-xs text-gray-400 text-center leading-tight">
                                    {stage.label}
                                </span>
                            </div>
                        );
                    })}
                </div>
            </div>

            {/* Info boxes */}
            {infoBoxes && infoBoxes.length > 0 && (
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mt-8">
                    {infoBoxes.map((box, idx) => {
                        const BoxIcon = iconMap[box.icon] || Info;

                        return (
                            <div
                                key={idx}
                                className="p-5 rounded-xl bg-gray-800/30 border border-gray-700/50"
                            >
                                <div className="flex items-center gap-2 mb-4">
                                    <BoxIcon className="w-5 h-5 text-gray-400" />
                                    <h4 className="font-semibold text-gray-200">{box.title}</h4>
                                </div>
                                <ul className="space-y-2">
                                    {box.items.map((item, itemIdx) => {
                                        // Check if item has a category prefix (e.g., "Regression – Predict numbers")
                                        const hasCategory = item.includes(' – ');

                                        if (hasCategory) {
                                            const [category, description] = item.split(' – ');
                                            return (
                                                <li key={itemIdx} className="text-sm flex gap-2">
                                                    <span className={`font-medium ${colorClasses[itemIdx % colorClasses.length]}`}>
                                                        {category}
                                                    </span>
                                                    <span className="text-gray-500">– {description}</span>
                                                </li>
                                            );
                                        }

                                        return (
                                            <li key={itemIdx} className="text-sm text-gray-400 flex items-start gap-2">
                                                <span className="text-gray-600 mt-1">•</span>
                                                {item}
                                            </li>
                                        );
                                    })}
                                </ul>
                            </div>
                        );
                    })}
                </div>
            )}
        </div>
    );
};

export default PipelineVisualizer;
