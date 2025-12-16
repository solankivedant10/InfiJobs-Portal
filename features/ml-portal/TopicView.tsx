import React from 'react';
import { useParams, useLocation } from 'react-router-dom';
import { mlTutorialData } from '../../data/mlTutorialData';

// Components
import TopicCard from './components/TopicCard';
import AlertBox from './components/AlertBox';
import DataTable from './components/DataTable';
import CodeBlock from './components/CodeBlock';
import BenefitCard from './components/BenefitCard';
import PipelineVisualizer from './components/PipelineVisualizer';
import RoleScenarioCard from './components/RoleScenarioCard';
import ExamplesList from './components/ExamplesList';
import HeroSection from './components/HeroSection';

const TopicView: React.FC = () => {
    const { topicId } = useParams<{ topicId: string }>();
    const location = useLocation();

    // Check if we're on the index route (no topicId)
    const isIndexRoute = location.pathname === '/ml-portal' || location.pathname === '/ml-portal/';

    // If on index route, show hero section
    if (isIndexRoute) {
        // Also find and show the first topic (What is ML?)
        const firstTopic = mlTutorialData[0];

        return (
            <div className="space-y-8">
                <HeroSection />

                {/* Show intro card for "What is ML?" */}
                <div className="px-4 md:px-8 max-w-4xl mx-auto">
                    <TopicCard
                        icon={firstTopic.icon}
                        iconBg={firstTopic.iconBg}
                        title={firstTopic.title}
                    >
                        <p className="text-gray-300 leading-relaxed">
                            {highlightText(firstTopic.description, firstTopic.highlightWords || [])}
                        </p>
                    </TopicCard>
                </div>
            </div>
        );
    }

    // Find the topic by ID
    const topic = mlTutorialData.find(t => t.id === topicId);

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

    return (
        <div className="px-4 md:px-8 py-8 max-w-4xl mx-auto">
            <TopicCard
                icon={topic.icon}
                iconBg={topic.iconBg}
                title={topic.title}
            >
                {/* Description */}
                <p className="text-gray-300 leading-relaxed">
                    {highlightText(topic.description, topic.highlightWords || [])}
                </p>

                {/* Alert */}
                {topic.alert && (
                    <AlertBox
                        type={topic.alert.type}
                        message={topic.alert.message}
                        highlightWords={topic.highlightWords}
                    />
                )}

                {/* Pipeline Visualizer */}
                {topic.pipeline && (
                    <PipelineVisualizer infoBoxes={topic.infoBoxes} />
                )}

                {/* Data Table */}
                {topic.table && (
                    <DataTable
                        title={topic.table.title}
                        headers={topic.table.headers}
                        rows={topic.table.rows}
                        highlightFirstColumn
                    />
                )}

                {/* Code Example */}
                {topic.codeExample && (
                    <CodeBlock
                        title={topic.codeExample.title}
                        code={topic.codeExample.code}
                        language={topic.codeExample.language}
                    />
                )}

                {/* Benefits */}
                {topic.benefits && topic.benefits.length > 0 && (
                    <BenefitCard benefits={topic.benefits} />
                )}

                {/* Examples */}
                {topic.examples && topic.examples.length > 0 && (
                    <ExamplesList examples={topic.examples} />
                )}

                {/* Role Scenarios */}
                {topic.roleScenarios && topic.roleScenarios.length > 0 && (
                    <RoleScenarioCard scenarios={topic.roleScenarios} />
                )}
            </TopicCard>
        </div>
    );
};

// Helper function to highlight specific words
function highlightText(text: string, words: string[]): React.ReactNode {
    if (words.length === 0) return text;

    // Sort by length (longest first) to avoid partial matches
    const sortedWords = [...words].sort((a, b) => b.length - a.length);

    // Create regex pattern
    const pattern = sortedWords.map(w => w.replace(/[.*+?^${}()|[\]\\]/g, '\\$&')).join('|');
    const regex = new RegExp(`(${pattern})`, 'gi');

    const parts = text.split(regex);

    return parts.map((part, idx) => {
        const isHighlight = sortedWords.some(w => w.toLowerCase() === part.toLowerCase());
        if (isHighlight) {
            return (
                <span key={idx} className="text-cyan-400 font-semibold">
                    {part}
                </span>
            );
        }
        return part;
    });
}

export default TopicView;
