import React, { useRef } from 'react';
import { useCoding } from '../../context/CodingContext';

const CodeEditor: React.FC = () => {
  const { userCode, updateCode } = useCoding();
  const textareaRef = useRef<HTMLTextAreaElement>(null);
  const lineNumbersRef = useRef<HTMLDivElement>(null);

  const handleChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    updateCode(e.target.value);
  };

  // Handle Tab Key to insert spaces instead of changing focus
  const handleKeyDown = (e: React.KeyboardEvent<HTMLTextAreaElement>) => {
    if (e.key === 'Tab') {
      e.preventDefault();
      const start = e.currentTarget.selectionStart;
      const end = e.currentTarget.selectionEnd;
      const value = e.currentTarget.value;

      // Insert 2 spaces
      const newValue = value.substring(0, start) + "  " + value.substring(end);
      updateCode(newValue);

      // Move cursor forward
      setTimeout(() => {
        if (textareaRef.current) {
          textareaRef.current.selectionStart = textareaRef.current.selectionEnd = start + 2;
        }
      }, 0);
    }
  };

  // Sync scroll between line numbers and text area
  const handleScroll = () => {
    if (textareaRef.current && lineNumbersRef.current) {
      lineNumbersRef.current.scrollTop = textareaRef.current.scrollTop;
    }
  };

  const lines = userCode.split('\n').length;
  const lineNumbers = Array.from({ length: lines }, (_, i) => i + 1).join('\n');

  return (
    <div className="flex flex-col h-full bg-[#1e1e1e] rounded-xl border border-gray-700 overflow-hidden shadow-2xl">
      {/* Mac-style Header */}
      <div className="flex items-center justify-between px-4 py-2 bg-[#252526] border-b border-black/50">
        <div className="flex items-center space-x-2">
          <div className="w-3 h-3 rounded-full bg-red-500/80 hover:bg-red-500 transition-colors"></div>
          <div className="w-3 h-3 rounded-full bg-yellow-500/80 hover:bg-yellow-500 transition-colors"></div>
          <div className="w-3 h-3 rounded-full bg-green-500/80 hover:bg-green-500 transition-colors"></div>
        </div>
        <span className="text-xs font-mono text-gray-400 flex items-center gap-2">
          <i className="fa-brands fa-js text-yellow-400"></i> solution.js
        </span>
      </div>

      <div className="relative flex-grow flex overflow-hidden">
        {/* Line Numbers */}
        <div
          ref={lineNumbersRef}
          className="bg-[#1e1e1e] text-gray-600 text-right pr-3 pl-4 py-4 font-mono text-sm select-none leading-6 overflow-hidden w-12"
        >
          <pre>{lineNumbers}</pre>
        </div>

        {/* Editor Area */}
        <textarea
          ref={textareaRef}
          value={userCode}
          onChange={handleChange}
          onKeyDown={handleKeyDown}
          onScroll={handleScroll}
          spellCheck="false"
          className="flex-grow bg-[#1e1e1e] text-gray-300 font-mono text-sm p-4 pl-2 outline-none resize-none leading-6 w-full custom-scrollbar"
        />
      </div>
    </div>
  );
};

export default CodeEditor;