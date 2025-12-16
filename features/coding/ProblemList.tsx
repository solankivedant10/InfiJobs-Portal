import React from 'react';
import { useCoding } from '../../context/CodingContext';

const ProblemList: React.FC = () => {
  const { currentProblem, problems, selectProblem, generateAIQuestion, isRunning } = useCoding();

  return (
    <div className="h-full flex flex-col bg-gray-800/30 backdrop-blur-md border border-gray-700 rounded-xl overflow-hidden shadow-lg">
      {/* Header */}
      <div className="p-4 border-b border-gray-700 bg-gray-800/80 flex justify-between items-center">
        <div>
          <h2 className="text-sm font-bold text-white uppercase tracking-wider">Challenges</h2>
          <p className="text-[10px] text-gray-400">Select or generate a problem</p>
        </div>
        <button
          onClick={generateAIQuestion}
          disabled={isRunning}
          className="text-xs bg-purple-600 hover:bg-purple-500 text-white px-3 py-1.5 rounded-lg transition-all flex items-center gap-1 shadow-lg shadow-purple-900/20 disabled:opacity-50 disabled:cursor-not-allowed"
          title="Generate a new question using AI"
        >
          <i className={`fa-solid fa-sparkles ${isRunning ? 'animate-spin' : ''}`}></i>
          New
        </button>
      </div>

      {/* List */}
      <div className="flex-grow overflow-y-auto p-3 space-y-2 custom-scrollbar">
        {problems.map((problem) => {
          const isActive = currentProblem.id === problem.id;

          // Dynamic Badge Color
          const difficultyColor =
            problem.difficulty === 'Easy' ? 'bg-emerald-500/10 text-emerald-400 border-emerald-500/20' :
              problem.difficulty === 'Medium' ? 'bg-yellow-500/10 text-yellow-400 border-yellow-500/20' :
                'bg-red-500/10 text-red-400 border-red-500/20';

          return (
            <button
              key={problem.id}
              onClick={() => selectProblem(problem.id)}
              className={`
                w-full text-left p-3 rounded-lg border transition-all duration-200 group relative overflow-hidden
                ${isActive
                  ? 'bg-blue-600/20 border-blue-500/50 shadow-lg shadow-blue-900/20'
                  : 'bg-gray-800/40 border-transparent hover:bg-gray-700/60 hover:border-gray-600'
                }
              `}
            >
              {/* Active Indicator Line */}
              {isActive && <div className="absolute left-0 top-0 bottom-0 w-1 bg-blue-500"></div>}

              <div className="flex justify-between items-start mb-1 pl-2">
                <span className={`font-semibold text-sm truncate pr-2 ${isActive ? 'text-white' : 'text-gray-300 group-hover:text-white'}`}>
                  {problem.title}
                </span>
                {isActive && <i className="fa-solid fa-chevron-right text-[10px] text-blue-400 mt-1"></i>}
              </div>

              <div className="pl-2 flex items-center gap-2">
                <span className={`text-[10px] px-2 py-0.5 rounded border ${difficultyColor}`}>
                  {problem.difficulty}
                </span>
                {problem.id.startsWith('ai-') && (
                  <span className="text-[10px] text-purple-400 flex items-center gap-1">
                    <i className="fa-solid fa-robot"></i> AI
                  </span>
                )}
              </div>
            </button>
          );
        })}
      </div>
    </div>
  );
};

export default ProblemList;