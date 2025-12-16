import React from 'react';
import { AlertCircle, Info } from 'lucide-react';

interface AlertBoxProps {
    type: 'warning' | 'info';
    message: string;
    highlightWords?: string[];
}

const AlertBox: React.FC<AlertBoxProps> = ({ type, message, highlightWords = [] }) => {
    const isWarning = type === 'warning';

    // Highlight specific words in the message
    let displayMessage = message;
    highlightWords.forEach(word => {
        const regex = new RegExp(`(${word})`, 'gi');
        displayMessage = displayMessage.replace(regex, `<span class="text-cyan-400 font-semibold">$1</span>`);
    });

    return (
        <div
            className={`
        flex items-start gap-3 p-4 rounded-lg border
        ${isWarning
                    ? 'bg-orange-500/10 border-orange-500/30'
                    : 'bg-blue-500/10 border-blue-500/30'
                }
      `}
        >
            <div className={`flex-shrink-0 mt-0.5 ${isWarning ? 'text-orange-400' : 'text-blue-400'}`}>
                {isWarning ? (
                    <AlertCircle className="w-5 h-5" />
                ) : (
                    <Info className="w-5 h-5" />
                )}
            </div>
            <p
                className={`text-sm ${isWarning ? 'text-orange-200' : 'text-blue-200'}`}
                dangerouslySetInnerHTML={{ __html: displayMessage }}
            />
        </div>
    );
};

export default AlertBox;
