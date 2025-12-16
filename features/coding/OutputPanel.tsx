import React from 'react';
import { useCoding } from '../../context/CodingContext';
import ReactMarkdown from 'react-markdown';

const OutputPanel: React.FC = () => {
  const { output, evaluation, isRunning, runCode, error } = useCoding();

  return (
    <div className="flex flex-col h-full bg-gray-800/30 backdrop-blur-md border border-gray-700 rounded-xl overflow-hidden shadow-lg">
      {/* Header */}
      <div className="flex items-center justify-between p-3 bg-gray-800/80 border-b border-gray-700">
        <span className="text-sm font-bold text-gray-300 flex items-center gap-2">
          <i className="fa-solid fa-terminal text-blue-400"></i> AI Judge
        </span>
        <button
          onClick={runCode}
          disabled={isRunning}
          className={`flex items-center space-x-2 px-4 py-1.5 rounded-lg font-semibold text-xs uppercase tracking-wider transition-all ${isRunning
              ? 'bg-gray-700 text-gray-500 cursor-not-allowed'
              : 'bg-gradient-to-r from-green-600 to-green-500 text-white shadow-lg shadow-green-900/30 hover:scale-105 active:scale-95'
            }`}
        >
          {isRunning ? (
            <>
              <i className="fa-solid fa-circle-notch fa-spin"></i>
              <span>Running...</span>
            </>
          ) : (
            <>
              <i className="fa-solid fa-play"></i>
              <span>Run Code</span>
            </>
          )}
        </button>
      </div>

      {/* Content Area */}
      <div className="flex-grow p-4 font-mono text-sm overflow-y-auto custom-scrollbar bg-black/40">

        {/* 1. Empty State */}
        {!output && !evaluation && !isRunning && !error && (
          <div className="h-full flex flex-col items-center justify-center text-gray-500/50">
            <i className="fa-solid fa-code text-4xl mb-3 opacity-30"></i>
            <p>Write your code and hit Run</p>
          </div>
        )}

        {/* 2. Error State */}
        {error && (
          <div className="p-4 bg-red-500/10 border border-red-500/30 rounded-lg text-red-200 animate-pulse">
            <strong className="block mb-2 text-red-400"><i className="fa-solid fa-bug"></i> Error</strong>
            {error}
          </div>
        )}

        {/* 3. Basic Logs (Before Evaluation) */}
        {output && !evaluation && (
          <div className="text-blue-300 animate-pulse flex items-center gap-2">
            <i className="fa-solid fa-microchip"></i>
            <pre className="whitespace-pre-wrap font-sans">{output}</pre>
          </div>
        )}

        {/* 4. AI Evaluation Result */}
        {evaluation && (
          <div className="space-y-6 animate-in fade-in slide-in-from-bottom-4 duration-500">

            {/* Score Card */}
            <div className={`p-4 rounded-xl border ${evaluation.passed ? 'bg-green-500/10 border-green-500/30' : 'bg-red-500/10 border-red-500/30'}`}>
              <div className="flex items-center justify-between mb-3">
                <h3 className={`text-lg font-bold ${evaluation.passed ? 'text-green-400' : 'text-red-400'}`}>
                  {evaluation.passed ? 'Passed' : 'Needs Improvement'}
                </h3>
                <div className="text-right">
                  <span className="text-3xl font-bold text-white">{evaluation.score}</span>
                  <span className="text-sm text-gray-400">/100</span>
                </div>
              </div>
              {/* Score Bar */}
              <div className="w-full bg-gray-700 rounded-full h-2">
                <div
                  className={`h-2 rounded-full transition-all duration-1000 ${evaluation.passed ? 'bg-green-500' : 'bg-red-500'}`}
                  style={{ width: `${evaluation.score}%` }}
                ></div>
              </div>
            </div>

            {/* Feedback - Markdown Rendered */}
            <div className="prose prose-invert prose-sm max-w-none">
              <h4 className="text-blue-400 font-bold text-xs uppercase tracking-widest border-b border-gray-700 pb-2 mb-3">
                AI Feedback
              </h4>
              {/* FIXED: Wrapped ReactMarkdown in a div to apply styles */}
              <div className="text-gray-300 leading-relaxed">
                <ReactMarkdown>
                  {evaluation.feedback}
                </ReactMarkdown>
              </div>
            </div>

            {/* Optimization (if applicable) */}
            {evaluation.optimizedCode && evaluation.score < 100 && (
              <div className="mt-4">
                <h4 className="text-yellow-400 font-bold text-xs uppercase tracking-widest border-b border-gray-700 pb-2 mb-3">
                  Suggested Optimization
                </h4>
                <div className="bg-gray-900 p-4 rounded-lg border border-gray-700/50 overflow-x-auto shadow-inner">
                  <pre className="text-green-300/90 text-xs">
                    <code>{evaluation.optimizedCode}</code>
                  </pre>
                </div>
                <p className="text-xs text-gray-500 mt-2 italic border-l-2 border-gray-600 pl-3">
                  {evaluation.explanation}
                </p>
              </div>
            )}
          </div>
        )}
      </div>
    </div>
  );
};

export default OutputPanel;