import React from 'react';
import {
    User, Briefcase, TrendingUp, Server, Database, PieChart, GitBranch,
    FileSearch, DollarSign, Calculator, LineChart, Layers,
    FlaskConical, Calendar, BarChart, Home, ShieldAlert, Users, UserCheck,
    Microscope, Package, Eye, Clock, Truck, Activity, MessageSquare, Cpu,
    Target, Container, Globe, Cloud, BarChart2
} from 'lucide-react';
import type { LucideIcon } from 'lucide-react';

const iconMap: Record<string, LucideIcon> = {
    User, Briefcase, TrendingUp, Server, Database, PieChart, GitBranch,
    FileSearch, DollarSign, Calculator, LineChart, Layers,
    FlaskConical, Calendar, BarChart, Home, ShieldAlert, Users, UserCheck,
    Microscope, Package, Eye, Clock, Truck, Activity, MessageSquare, Cpu,
    Target, Container, Globe, Cloud, BarChart2
};

interface RoleScenario {
    role: string;
    icon: string;
    scenario: string;
    benefit: string;
}

interface RoleScenarioCardProps {
    scenarios: RoleScenario[];
}

const RoleScenarioCard: React.FC<RoleScenarioCardProps> = ({ scenarios }) => {
    // Assign different border colors based on index
    const borderColors = [
        'border-l-cyan-500',
        'border-l-emerald-500',
        'border-l-purple-500',
        'border-l-amber-500',
        'border-l-rose-500',
        'border-l-blue-500'
    ];

    const iconBgs = [
        'bg-cyan-500/20 text-cyan-400',
        'bg-emerald-500/20 text-emerald-400',
        'bg-purple-500/20 text-purple-400',
        'bg-amber-500/20 text-amber-400',
        'bg-rose-500/20 text-rose-400',
        'bg-blue-500/20 text-blue-400'
    ];

    return (
        <div className="space-y-4">
            <h3 className="text-lg font-semibold text-gray-200 flex items-center gap-2">
                <span className="w-1.5 h-1.5 rounded-full bg-cyan-400" />
                Real-World Applications by Role
            </h3>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                {scenarios.map((scenario, idx) => {
                    const IconComponent = iconMap[scenario.icon] || User;

                    return (
                        <div
                            key={idx}
                            className={`
                p-4 rounded-lg bg-gray-800/30 border border-gray-700/50
                border-l-4 ${borderColors[idx % borderColors.length]}
                hover:bg-gray-800/50 transition-colors
              `}
                        >
                            {/* Role header */}
                            <div className="flex items-center gap-3 mb-3">
                                <div className={`w-9 h-9 rounded-lg flex items-center justify-center ${iconBgs[idx % iconBgs.length]}`}>
                                    <IconComponent className="w-4 h-4" />
                                </div>
                                <span className="font-medium text-gray-200 text-sm">{scenario.role}</span>
                            </div>

                            {/* Scenario */}
                            <h4 className="text-gray-100 font-semibold mb-2">{scenario.scenario}</h4>

                            {/* Benefit */}
                            <p className="text-gray-400 text-sm leading-relaxed">{scenario.benefit}</p>
                        </div>
                    );
                })}
            </div>
        </div>
    );
};

export default RoleScenarioCard;
