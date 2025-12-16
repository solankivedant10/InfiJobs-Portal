import React from 'react';
import {
    BarChart2, Zap, Filter, Star,
    Briefcase, TrendingUp, Server, Database, PieChart, GitBranch,
    FileSearch, DollarSign, Calculator, LineChart, Layers,
    FlaskConical, Calendar, BarChart, Home, ShieldAlert, Users, UserCheck,
    Microscope, Package, Eye, Clock, Truck, Activity, MessageSquare, Cpu,
    Target, HelpCircle, Container, Globe, Cloud
} from 'lucide-react';
import type { LucideIcon } from 'lucide-react';

// Icon mapping for dynamic icon rendering
const iconMap: Record<string, LucideIcon> = {
    BarChart2, Zap, Filter, Star,
    Briefcase, TrendingUp, Server, Database, PieChart, GitBranch,
    FileSearch, DollarSign, Calculator, LineChart, Layers,
    FlaskConical, Calendar, BarChart, Home, ShieldAlert, Users, UserCheck,
    Microscope, Package, Eye, Clock, Truck, Activity, MessageSquare, Cpu,
    Target, HelpCircle, Container, Globe, Cloud
};

interface Benefit {
    icon: string;
    iconColor: string;
    title: string;
    subtitle: string;
}

interface BenefitCardProps {
    benefits: Benefit[];
}

const BenefitCard: React.FC<BenefitCardProps> = ({ benefits }) => {
    return (
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            {benefits.map((benefit, idx) => {
                const IconComponent = iconMap[benefit.icon] || Star;

                return (
                    <div
                        key={idx}
                        className="flex flex-col items-center p-6 rounded-xl bg-gradient-to-b from-gray-800/50 to-gray-900/50 border border-gray-700/50 hover:border-gray-600/50 transition-all hover:transform hover:scale-[1.02]"
                    >
                        <div className={`w-12 h-12 rounded-xl flex items-center justify-center bg-gray-800/80 mb-3 ${benefit.iconColor}`}>
                            <IconComponent className="w-6 h-6" />
                        </div>
                        <h4 className="text-gray-100 font-semibold text-center">{benefit.title}</h4>
                        <p className="text-gray-500 text-sm text-center mt-1">{benefit.subtitle}</p>
                    </div>
                );
            })}
        </div>
    );
};

export default BenefitCard;
