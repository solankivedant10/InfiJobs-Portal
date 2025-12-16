
import React from 'react';
import { CodingProvider, useCoding } from '../context/CodingContext';
import CodeEditor from '../features/coding/CodeEditor';
import ProblemList from '../features/coding/ProblemList';
import OutputPanel from '../features/coding/OutputPanel';
import Header from '../components/Header';

const CodingPageContent: React.FC = () => {
  const { currentProblem } = useCoding();

  return (
    <div className="relative min-h-screen flex flex-col bg-gray-900 text-white overflow-hidden">
      <Header />
      
      <main className="flex-grow p-4 pt-6 h-[calc(100vh-64px)]">
        <div className="max-w-[1600px] mx-auto h-full grid grid-cols-12 gap-4">
          
          {/* Left: Problem List & Details (3 cols) */}
          <div className="col-span-12 lg:col-span-3 flex flex-col gap-4 h-full overflow-hidden">
             <ProblemList />
             <div className="flex-grow bg-gray-800/30 backdrop-blur-md border border-gray-700 rounded-xl p-4 overflow-y-auto custom-scrollbar">
                <div className="flex justify-between items-start mb-2">
                  <h2 className="text-xl font-bold text-white">{currentProblem.title}</h2>
                  <span className={`text-xs px-2 py-0.5 rounded border ${
                    currentProblem.difficulty === 'Easy' ? 'bg-green-500/20 text-green-400 border-green-500/30' :
                    currentProblem.difficulty === 'Medium' ? 'bg-yellow-500/20 text-yellow-400 border-yellow-500/30' :
                    'bg-red-500/20 text-red-400 border-red-500/30'
                  }`}>
                    {currentProblem.difficulty}
                  </span>
                </div>
                <p className="text-gray-400 text-sm whitespace-pre-wrap leading-relaxed">
                  {currentProblem.description}
                </p>
             </div>
          </div>

          {/* Center: Code Editor (6 cols) */}
          <div className="col-span-12 lg:col-span-6 h-full">
            <CodeEditor />
          </div>

          {/* Right: Output (3 cols) */}
          <div className="col-span-12 lg:col-span-3 h-full">
            <OutputPanel />
          </div>

        </div>
      </main>
    </div>
  );
};

const CodingPage: React.FC = () => {
  return (
    <CodingProvider>
      <CodingPageContent />
    </CodingProvider>
  );
};

export default CodingPage;
