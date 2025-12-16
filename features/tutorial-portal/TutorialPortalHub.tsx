import React from 'react';
import { Link } from 'react-router-dom';
import {
    Brain, BarChart3, Sparkles, ArrowRight, BookOpen,
    Briefcase, Microscope, Server, PieChart, Truck, Layout, Coffee
} from 'lucide-react';

// Portal card data - Add new portals here
const portals = [
    {
        id: 'ml-portal',
        title: 'Machine Learning',
        description: 'Master ML from data cleaning to deep learning with interactive visualizations and production-ready code.',
        icon: Brain,
        gradient: 'from-cyan-500 to-blue-500',
        bgGradient: 'from-cyan-500/10 to-blue-500/10',
        borderColor: 'border-cyan-500/30',
        topics: 13,
        features: ['13 Topics', 'Pipeline Visualizer', 'Code Examples']
    },
    {
        id: 'da-portal',
        title: 'Data Analytics',
        description: 'A comprehensive learning path from data fundamentals to advanced analytics. Master the skills employers demand.',
        icon: BarChart3,
        gradient: 'from-emerald-500 to-teal-500',
        bgGradient: 'from-emerald-500/10 to-teal-500/10',
        borderColor: 'border-emerald-500/30',
        topics: 9,
        features: ['9 Topics', 'Python Libraries', 'Statistics']
    },
    {
        id: 'ba-portal',
        title: 'Business Analyst',
        description: 'Master SQL for business analysis. Query databases, extract insights, and generate reports that drive business decisions.',
        icon: Briefcase,
        gradient: 'from-blue-500 to-indigo-500',
        bgGradient: 'from-blue-500/10 to-indigo-500/10',
        borderColor: 'border-blue-500/30',
        topics: 12,
        features: ['12 Topics', 'SQL Queries', 'Real-World Cases']
    },
    {
        id: 'ds-portal',
        title: 'Data Scientist',
        description: 'Learn data science from fundamentals to advanced ML. Build models, analyze data, and extract actionable insights.',
        icon: Microscope,
        gradient: 'from-purple-500 to-pink-500',
        bgGradient: 'from-purple-500/10 to-pink-500/10',
        borderColor: 'border-purple-500/30',
        topics: 9,
        features: ['9 Topics', 'ML Models', 'Python Code']
    },
    {
        id: 'de-portal',
        title: 'Data Engineering',
        description: 'Build robust data infrastructure. Design pipelines, manage warehouses, and ensure data quality at scale.',
        icon: Server,
        gradient: 'from-orange-500 to-red-500',
        bgGradient: 'from-orange-500/10 to-red-500/10',
        borderColor: 'border-orange-500/30',
        topics: 9,
        features: ['9 Topics', 'ETL Pipelines', 'Big Data Tools']
    },
    {
        id: 'bi-portal',
        title: 'Business Intelligence',
        description: 'Transform data into insights. Build dashboards, create reports, and support data-driven decision making.',
        icon: PieChart,
        gradient: 'from-rose-500 to-purple-500',
        bgGradient: 'from-rose-500/10 to-purple-500/10',
        borderColor: 'border-rose-500/30',
        topics: 11,
        features: ['11 Topics', 'BI Tools', 'DAX & SQL']
    },
    {
        id: 'sca-portal',
        title: 'Supply Chain Analyst',
        description: 'Master supply chain analysis. Optimize logistics, forecast demand, and manage inventory for business efficiency.',
        icon: Truck,
        gradient: 'from-teal-500 to-cyan-500',
        bgGradient: 'from-teal-500/10 to-cyan-500/10',
        borderColor: 'border-teal-500/30',
        topics: 9,
        features: ['9 Topics', 'Data Analysis', 'Risk Management']
    },
    {
        id: 'fe-portal',
        title: 'Frontend Developer',
        description: 'Build beautiful, responsive web applications. Master HTML, CSS, JavaScript, and modern frameworks like React.',
        icon: Layout,
        gradient: 'from-pink-500 to-rose-500',
        bgGradient: 'from-pink-500/10 to-rose-500/10',
        borderColor: 'border-pink-500/30',
        topics: 9,
        features: ['9 Topics', 'React/Vue', 'Responsive Design']
    },
    {
        id: 'java-portal',
        title: 'Java Full Stack',
        description: 'Build enterprise Java applications. Master Spring Boot, Hibernate, REST APIs, and full stack development.',
        icon: Coffee,
        gradient: 'from-red-500 to-orange-500',
        bgGradient: 'from-red-500/10 to-orange-500/10',
        borderColor: 'border-red-500/30',
        topics: 11,
        features: ['11 Topics', 'Spring Boot', 'REST APIs']
    }
];

const TutorialPortalHub: React.FC = () => {
    return (
        <div className="min-h-screen bg-[#0a0d12]">
            {/* Header */}
            <header className="sticky top-0 z-30 bg-[#0a0d12]/95 backdrop-blur-lg border-b border-gray-800/50">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                    <div className="flex items-center justify-between py-4">
                        <Link
                            to="/"
                            className="flex items-center gap-2 text-gray-400 hover:text-gray-200 transition-colors"
                        >
                            <span className="text-sm">← Back to Home</span>
                        </Link>
                        <div className="hidden lg:block w-48 h-1.5 rounded-full bg-gradient-to-r from-cyan-500 via-emerald-500 to-purple-500" />
                        <div className="w-24" />
                    </div>
                </div>
            </header>

            {/* Hero Section */}
            <div className="text-center py-16 px-4">
                <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-gradient-to-r from-purple-500/20 to-pink-500/20 border border-purple-500/30 mb-8">
                    <BookOpen className="w-4 h-4 text-purple-400" />
                    <span className="text-sm font-medium text-purple-400">LEARNING HUB</span>
                </div>

                <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold mb-6">
                    <span className="text-gray-100">Web </span>
                    <span className="bg-gradient-to-r from-cyan-400 via-emerald-400 to-purple-400 bg-clip-text text-transparent">
                        Tutorial Portal
                    </span>
                </h1>

                <p className="text-gray-400 text-lg md:text-xl max-w-2xl mx-auto mb-12">
                    Your one-stop learning destination. Choose a topic below and start your journey
                    towards mastering in-demand tech skills.
                </p>

                {/* Stats */}
                <div className="flex flex-wrap justify-center gap-8 mb-12">
                    <div className="text-center">
                        <div className="text-3xl font-bold text-cyan-400">{portals.length}</div>
                        <div className="text-sm text-gray-500">Portals</div>
                    </div>
                    <div className="text-center">
                        <div className="text-3xl font-bold text-emerald-400">
                            {portals.reduce((sum, p) => sum + p.topics, 0)}+
                        </div>
                        <div className="text-sm text-gray-500">Topics</div>
                    </div>
                    <div className="text-center">
                        <div className="text-3xl font-bold text-purple-400">100%</div>
                        <div className="text-sm text-gray-500">Free</div>
                    </div>
                </div>
            </div>

            {/* Portal Cards */}
            <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 pb-16">
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                    {portals.map((portal) => {
                        const IconComponent = portal.icon;

                        return (
                            <Link
                                key={portal.id}
                                to={`/${portal.id}`}
                                className={`
                  group relative rounded-2xl overflow-hidden
                  bg-gradient-to-br ${portal.bgGradient}
                  border ${portal.borderColor}
                  hover:scale-[1.02] transition-all duration-300
                  hover:shadow-lg hover:shadow-black/20
                `}
                            >
                                {/* Card content */}
                                <div className="p-6">
                                    {/* Icon */}
                                    <div className={`
                    w-14 h-14 rounded-xl flex items-center justify-center mb-4
                    bg-gradient-to-br ${portal.gradient} text-white
                  `}>
                                        <IconComponent className="w-7 h-7" />
                                    </div>

                                    {/* Title */}
                                    <h3 className="text-xl font-bold text-gray-100 mb-2">{portal.title}</h3>

                                    {/* Description */}
                                    <p className="text-gray-400 text-sm leading-relaxed mb-4">
                                        {portal.description}
                                    </p>

                                    {/* Features */}
                                    <div className="flex flex-wrap gap-2 mb-4">
                                        {portal.features.map((feature, idx) => (
                                            <span
                                                key={idx}
                                                className="px-2 py-1 text-xs rounded-full bg-gray-800/50 text-gray-400"
                                            >
                                                {feature}
                                            </span>
                                        ))}
                                    </div>

                                    {/* CTA */}
                                    <div className="flex items-center gap-2 text-sm font-medium text-gray-300 group-hover:text-white transition-colors">
                                        <span>Start Learning</span>
                                        <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
                                    </div>
                                </div>

                                {/* Hover glow effect */}
                                <div className={`
                  absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity
                  bg-gradient-to-br ${portal.gradient} mix-blend-overlay pointer-events-none
                `} style={{ opacity: 0.05 }} />
                            </Link>
                        );
                    })}

                    {/* Coming Soon Card */}
                    <div className="rounded-2xl overflow-hidden bg-gray-800/20 border border-gray-700/50 border-dashed p-6 flex flex-col items-center justify-center text-center min-h-[280px]">
                        <div className="w-14 h-14 rounded-xl flex items-center justify-center mb-4 bg-gray-800/50 text-gray-500">
                            <Sparkles className="w-7 h-7" />
                        </div>
                        <h3 className="text-lg font-semibold text-gray-500 mb-2">More Coming Soon</h3>
                        <p className="text-gray-600 text-sm">
                            Python, SQL, Cloud, and more tutorials are on the way!
                        </p>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default TutorialPortalHub;
