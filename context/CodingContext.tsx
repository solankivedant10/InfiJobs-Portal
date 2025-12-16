import React, { createContext, useContext, useState, useMemo, ReactNode } from 'react';
import { CodingProblem, codingProblems } from '../services/codingData';
import { evaluateSubmission, generateQuestion } from '../services/geminiService';
import { EvaluationResult, CodingQuestion } from '../services/types';

// Extended state to include AI feedback
interface CodingContextType {
  currentProblem: CodingProblem;
  problems: CodingProblem[]; // All problems (hardcoded + AI-generated)
  userCode: string;
  output: string | null;
  evaluation: EvaluationResult | null; // AI Result
  isRunning: boolean;
  error: string | null;
  selectProblem: (problemId: string) => void;
  updateCode: (code: string) => void;
  runCode: () => Promise<void>;
  generateAIQuestion: () => Promise<void>; // Bonus feature
}

const CodingContext = createContext<CodingContextType | undefined>(undefined);

export const CodingProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  const [currentProblem, setCurrentProblem] = useState<CodingProblem>(codingProblems[0]);
  const [aiProblems, setAiProblems] = useState<CodingProblem[]>([]);
  const [userCode, setUserCode] = useState(codingProblems[0].starterCode);
  const [output, setOutput] = useState<string | null>(null);
  const [evaluation, setEvaluation] = useState<EvaluationResult | null>(null);
  const [isRunning, setIsRunning] = useState(false);
  const [error, setError] = useState<string | null>(null);

  // Derive all problems (hardcoded + AI-generated)
  const allProblems = useMemo(() => [...codingProblems, ...aiProblems], [aiProblems]);

  const selectProblem = (problemId: string) => {
    const problem = allProblems.find(p => p.id === problemId);
    if (problem) {
      setCurrentProblem(problem);
      setUserCode(problem.starterCode);
      setOutput(null);
      setEvaluation(null);
      setError(null);
    }
  };

  const updateCode = (code: string) => {
    setUserCode(code);
  };

  // 🧠 The Brain: Runs code via Gemini AI
  const runCode = async () => {
    if (!userCode.trim()) return;

    setIsRunning(true);
    setOutput("Compiling and evaluating with AI...");
    setEvaluation(null);
    setError(null);

    try {
      // Adapter: Convert local "CodingProblem" to the format "CodingQuestion" expects
      // This ensures our hardcoded data works with the AI service types
      const aiQuestionFormat: CodingQuestion = {
        title: currentProblem.title,
        description: currentProblem.description,
        difficulty: currentProblem.difficulty as any,
        topic: "Algorithms", // Default context
        starterCode: currentProblem.starterCode,
        testCases: currentProblem.testCases.map(tc => `Input: ${tc.input} -> Output: ${tc.expected}`),
        hints: []
      };

      // 🚀 Call Gemini Service
      const result = await evaluateSubmission(aiQuestionFormat, userCode);

      // Update State with AI Feedback
      setEvaluation(result);

      // Pretty print the console output based on success
      if (result.passed) {
        setOutput(`✅ Tests Passed!\nScore: ${result.score}/100\n\n${result.feedback}`);
      } else {
        setOutput(`❌ Tests Failed.\nScore: ${result.score}/100\n\n${result.feedback}`);
      }

    } catch (err) {
      console.error("AI Evaluation Failed:", err);
      setError("Failed to connect to the AI judge. Please check your API Key or internet connection.");
      setOutput("Error: Could not evaluate code.");
    } finally {
      setIsRunning(false);
    }
  };

  // Bonus: Generate a new random question from AI
  const generateAIQuestion = async () => {
    setIsRunning(true);
    try {
      const newQ = await generateQuestion({
        topic: "Data Structures",
        difficulty: "Medium" as any,
        language: "JavaScript"
      });

      // Convert back to local format
      const newProblem: CodingProblem = {
        id: `ai-${Date.now()}`,
        title: newQ.title,
        difficulty: newQ.difficulty as any,
        description: newQ.description,
        starterCode: newQ.starterCode,
        testCases: newQ.testCases.map((tc, i) => ({ input: `Case ${i + 1}`, expected: tc })),
        solution: ""
      };

      // Add to state instead of mutating global array
      setAiProblems(prev => [...prev, newProblem]);
      setCurrentProblem(newProblem);
      setUserCode(newProblem.starterCode);
      setOutput(null);
      setEvaluation(null);
      setError(null);
    } catch (e) {
      setError("Failed to generate question.");
    } finally {
      setIsRunning(false);
    }
  };

  return (
    <CodingContext.Provider value={{
      currentProblem,
      problems: allProblems,
      userCode,
      output,
      evaluation,
      isRunning,
      error,
      selectProblem,
      updateCode,
      runCode,
      generateAIQuestion
    }}>
      {children}
    </CodingContext.Provider>
  );
};

export const useCoding = () => {
  const context = useContext(CodingContext);
  if (context === undefined) {
    throw new Error('useCoding must be used within a CodingProvider');
  }
  return context;
};