import { GoogleGenAI } from "@google/genai";
import { CodingQuestion, EvaluationResult, QuizConfig, UserStats } from "./types";

// Access the key through Vite environment only (do not rely on process.env at runtime)
const API_KEY = import.meta.env.VITE_API_KEY;

const getAI = () => {
  if (!API_KEY) {
    console.error("API Key is missing. Make sure VITE_API_KEY is in .env.local");
    throw new Error("Missing VITE_API_KEY");
  }
  return new GoogleGenAI({ apiKey: API_KEY });
};

// 1. Generate a Coding Question
export const generateQuestion = async (config: QuizConfig): Promise<CodingQuestion> => {
  const ai = getAI();
  const prompt = `Create a unique coding interview question.
    Topic: ${config.topic}
    Difficulty: ${config.difficulty}
    Language: ${config.language}

    OUTPUT JSON ONLY:
    {
      "title": "Title",
      "description": "Problem statement",
      "difficulty": "Easy|Medium|Hard",
      "topic": "Topic",
      "starterCode": "function solution() {}",
      "testCases": ["Input: a, Output: b"],
      "hints": ["Hint 1"]
    }`;

  try {
    const response = await ai.models.generateContent({
      model: "gemini-2.0-flash",
      contents: prompt,
      config: {
        responseMimeType: "application/json",
      },
    });

    // FIX: Access text as a property, not a function
    const text = response.text;

    if (!text) throw new Error("No response from AI");
    return JSON.parse(text) as CodingQuestion;
  } catch (error) {
    console.error("Error generating question:", error);
    // Fallback mock data if AI fails (prevents app crash)
    return {
      title: "Error Generating Question",
      description: "Coding Question Feature Coming soon!",
      difficulty: "Easy" as any,
      topic: "Error",
      starterCode: "// Error",
      testCases: [],
      hints: []
    };
  }
};

// 2. Evaluate the User's Answer
export const evaluateSubmission = async (
  question: CodingQuestion,
  userCode: string
): Promise<EvaluationResult> => {
  const ai = getAI();
  const prompt = `You are a senior technical interviewer. Evaluate this code.
    
    PROBLEM: ${question.title}
    DESCRIPTION: ${question.description}
    EXPECTED BEHAVIOR: ${question.testCases.join('\n')}
    
    CANDIDATE CODE:
    ${userCode}
    
    OUTPUT JSON ONLY:
    {
      "passed": boolean,
      "score": number (0-100),
      "feedback": "Short feedback.",
      "optimizedCode": "Better code (optional)",
      "explanation": "Why optimized is better (optional)"
    }
  `;

  try {
    const response = await ai.models.generateContent({
      model: "gemini-2.0-flash",
      contents: prompt,
      config: {
        responseMimeType: "application/json",
      },
    });

    // FIX: Access text as a property, not a function
    const text = response.text;

    if (!text) throw new Error("No evaluation received");
    return JSON.parse(text) as EvaluationResult;
  } catch (error) {
    console.error("Error evaluating submission:", error);
    return {
      passed: false,
      score: 0,
      feedback: "Error connecting to AI. Please check your API Key.",
      optimizedCode: "",
      explanation: ""
    };
  }
};

// 3. Generate Insights
export const generateInsights = async (stats: UserStats): Promise<string> => {
  const ai = getAI();

  const historySummary = stats.history.slice(0, 20).map(h =>
    `- ${h.difficulty} ${h.topic}: Score ${h.score} (${h.passed ? 'Passed' : 'Failed'})`
  ).join('\n');

  const prompt = `Analyze this student's coding interview progress:
  Total Attempts: ${stats.totalAttempts}
  Passed: ${stats.passedCount}
  Average Score: ${stats.averageScore}
  History:
  ${historySummary}
  
  Provide 3 concrete tips to improve. Format as Markdown.`;

  try {
    const response = await ai.models.generateContent({
      model: "gemini-2.0-flash",
      contents: prompt,
    });
    // FIX: Access text as a property
    return response.text || "Keep practicing to generate more insights!";
  } catch (e) {
    return "Could not generate insights at this time.";
  }
};

export const generateSpeech = async (_text: string): Promise<string | null> => {
  return null; // Placeholder as configured previously
};