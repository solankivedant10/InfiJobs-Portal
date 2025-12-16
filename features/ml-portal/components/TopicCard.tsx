import React from 'react';
import {
    Brain, FileText, Layers, Sparkles, Wrench, Scissors,
    TrendingUp, Target, Circle, Minimize2, Clock, Network,
    HelpCircle, Rocket
} from 'lucide-react';
import type { LucideIcon } from 'lucide-react';

const iconMap: Record<string, LucideIcon> = {
    Brain, FileText, Layers, Sparkles, Wrench, Scissors,
    TrendingUp, Target, Circle, Minimize2, Clock, Network,
    HelpCircle, Rocket
};

interface TopicCardProps {
    icon: string;
    iconBg: string;
    title: string;
    children: React.ReactNode;
}

const TopicCard: React.FC<TopicCardProps> = ({ icon, iconBg, title, children }) => {
    const IconComponent = iconMap[icon] || FileText;

    return (
        <div className="relative rounded-2xl overflow-hidden">
            {/* Gradient border effect */}
            <div className="absolute inset-0 bg-gradient-to-br from-purple-500/20 via-pink-500/20 to-cyan-500/20 rounded-2xl" />

            {/* Inner card */}
            <div className="relative m-[1px] bg-[#1a1f2e] rounded-2xl p-6">
                {/* Header */}
                <div className="flex items-center gap-4 mb-6">
                    <div className={`w-12 h-12 rounded-xl flex items-center justify-center ${iconBg}`}>
                        <IconComponent className="w-6 h-6" />
                    </div>
                    <h2 className="text-2xl font-bold text-gray-100">{title}</h2>
                </div>

                {/* Content */}
                <div className="space-y-6">
                    {children}
                </div>
            </div>
        </div>
    );
};

export default TopicCard;
