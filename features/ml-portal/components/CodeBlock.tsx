import React from 'react';
import { Copy, Check } from 'lucide-react';

interface CodeBlockProps {
    title?: string;
    code: string;
    language?: string;
    showLineNumbers?: boolean;
}

const CodeBlock: React.FC<CodeBlockProps> = ({
    title,
    code,
    language = 'python',
    showLineNumbers = false
}) => {
    const [copied, setCopied] = React.useState(false);

    const handleCopy = async () => {
        try {
            await navigator.clipboard.writeText(code);
            setCopied(true);
            setTimeout(() => setCopied(false), 2000);
        } catch (err) {
            console.error('Failed to copy:', err);
        }
    };

    // Simple syntax highlighting for Python
    const highlightCode = (code: string): string => {
        const keywords = ['import', 'from', 'def', 'class', 'return', 'if', 'else', 'elif', 'for', 'while', 'in', 'not', 'and', 'or', 'True', 'False', 'None', 'with', 'as', 'try', 'except', 'finally', 'raise', 'pass', 'break', 'continue', 'lambda', 'yield', 'async', 'await'];
        const builtins = ['print', 'len', 'range', 'str', 'int', 'float', 'list', 'dict', 'set', 'tuple', 'bool', 'type', 'isinstance', 'enumerate', 'zip', 'map', 'filter', 'sorted', 'sum', 'min', 'max', 'abs', 'round', 'open'];

        let highlighted = code
            .replace(/&/g, '&amp;')
            .replace(/</g, '&lt;')
            .replace(/>/g, '&gt;')
            .replace(/(["'])((?:\\.|(?!\1)[^\\])*)\1/g, '<span class="text-emerald-400">$1$2$1</span>')
            .replace(/(#.*)$/gm, '<span class="text-gray-500 italic">$1</span>')
            .replace(/\b(\d+\.?\d*)\b/g, '<span class="text-amber-400">$1</span>')
            .replace(/(@\w+)/g, '<span class="text-fuchsia-400">$1</span>');

        keywords.forEach(kw => {
            const regex = new RegExp(`\\b(${kw})\\b`, 'g');
            highlighted = highlighted.replace(regex, '<span class="text-purple-400 font-medium">$1</span>');
        });

        builtins.forEach(fn => {
            const regex = new RegExp(`\\b(${fn})\\(`, 'g');
            highlighted = highlighted.replace(regex, '<span class="text-cyan-400">$1</span>(');
        });

        highlighted = highlighted.replace(/\b(def)\s+(\w+)/g, '<span class="text-purple-400 font-medium">$1</span> <span class="text-blue-400">$2</span>');
        highlighted = highlighted.replace(/\b(class)\s+(\w+)/g, '<span class="text-purple-400 font-medium">$1</span> <span class="text-yellow-400">$2</span>');

        return highlighted;
    };

    const lines = code.split('\n');

    return (
        <div className="rounded-xl overflow-hidden bg-[#1e2530] border border-gray-700/50">
            {title && (
                <div className="flex items-center justify-between px-4 py-3 bg-[#1a1f2e] border-b border-gray-700/50">
                    <span className="text-gray-300 text-sm font-medium">{title}</span>
                    <div className="flex items-center gap-2">
                        <span className="px-2 py-0.5 text-xs font-medium bg-purple-500/20 text-purple-400 rounded">
                            {language}
                        </span>
                        <button
                            onClick={handleCopy}
                            className="p-1.5 rounded-md hover:bg-gray-700/50 text-gray-400 hover:text-gray-200 transition-colors"
                            title="Copy code"
                        >
                            {copied ? (
                                <Check className="w-4 h-4 text-green-400" />
                            ) : (
                                <Copy className="w-4 h-4" />
                            )}
                        </button>
                    </div>
                </div>
            )}

            <div className="relative">
                {!title && (
                    <button
                        onClick={handleCopy}
                        className="absolute top-3 right-3 p-1.5 rounded-md bg-gray-700/50 hover:bg-gray-600/50 text-gray-400 hover:text-gray-200 transition-colors z-10"
                        title="Copy code"
                    >
                        {copied ? (
                            <Check className="w-4 h-4 text-green-400" />
                        ) : (
                            <Copy className="w-4 h-4" />
                        )}
                    </button>
                )}

                <pre className="p-4 overflow-x-auto text-sm leading-relaxed">
                    <code className="font-mono">
                        {lines.map((line, idx) => (
                            <div key={idx} className="flex">
                                {showLineNumbers && (
                                    <span className="select-none text-gray-600 text-right pr-4 min-w-[2.5rem]">
                                        {idx + 1}
                                    </span>
                                )}
                                <span
                                    dangerouslySetInnerHTML={{ __html: highlightCode(line) || '&nbsp;' }}
                                />
                            </div>
                        ))}
                    </code>
                </pre>
            </div>
        </div>
    );
};

export default CodeBlock;
