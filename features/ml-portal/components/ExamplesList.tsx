import React from 'react';

interface Example {
    icon: string;
    text: string;
}

interface ExamplesListProps {
    examples: Example[];
}

const ExamplesList: React.FC<ExamplesListProps> = ({ examples }) => {
    return (
        <div className="space-y-3">
            <h3 className="text-lg font-semibold text-gray-200">Examples</h3>
            <ul className="space-y-2">
                {examples.map((example, idx) => (
                    <li key={idx} className="flex items-center gap-3 text-gray-400">
                        <span className="text-lg">{example.icon}</span>
                        <span>{example.text}</span>
                    </li>
                ))}
            </ul>
        </div>
    );
};

export default ExamplesList;
