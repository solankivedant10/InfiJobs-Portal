import React, { useState, useEffect } from 'react';
import { getQuizData } from '../../services/contentService'; // Import the service from File 2
import { Quiz } from '../../data/mockData'; // Import types
import Modal from '../common/Modal'; // Keep the UI wrapper from File 1

interface QuizModalProps {
    isOpen: boolean;
    quizId: string;
    onClose: () => void;
}

const QuizModal: React.FC<QuizModalProps> = ({ isOpen, quizId, onClose }) => {
    // State
    const [step, setStep] = useState<'start' | 'question' | 'result'>('start');
    const [currentQuestion, setCurrentQuestion] = useState(0);
    const [score, setScore] = useState(0);
    const [selectedOption, setSelectedOption] = useState<number | null>(null);

    // Async State (From File 2)
    const [quiz, setQuiz] = useState<Quiz | null>(null);
    const [loading, setLoading] = useState(false);

    // Fetch Data Effect (From File 2)
    useEffect(() => {
        if (isOpen && quizId) {
            setLoading(true);
            setStep('start');
            setCurrentQuestion(0);
            setScore(0);
            setSelectedOption(null);

            getQuizData(quizId)
                .then(data => setQuiz(data))
                .catch(err => console.error("Failed to load quiz:", err))
                .finally(() => setLoading(false));
        }
    }, [isOpen, quizId]);

    // Handle close / reset
    const handleClose = () => {
        setQuiz(null);
        onClose();
    };

    // Logic Handlers
    const handleAnswer = (index: number) => {
        if (selectedOption !== null || !quiz) return;
        setSelectedOption(index);
        if (index === quiz.questions[currentQuestion].a) {
            setScore(prev => prev + 1);
        }
    };

    const handleNext = () => {
        if (!quiz) return;
        if (currentQuestion < quiz.questions.length - 1) {
            setCurrentQuestion(prev => prev + 1);
            setSelectedOption(null);
        } else {
            setStep('result');
        }
    };

    // Helper for Option Styling (From File 1 - Better styling)
    const getOptionClass = (idx: number, correctIdx: number) => {
        const baseClass = "w-full p-4 rounded-lg border-2 text-left transition-all duration-200 font-medium flex items-center";

        if (selectedOption === null) {
            return `${baseClass} bg-gray-700/50 border-gray-600 text-gray-200 hover:border-blue-500 hover:bg-gray-700`;
        }

        if (idx === correctIdx) {
            return `${baseClass} bg-green-600/20 border-green-500 text-green-100 shadow-[0_0_15px_rgba(34,197,94,0.3)]`;
        }

        if (selectedOption === idx && idx !== correctIdx) {
            return `${baseClass} bg-red-600/20 border-red-500 text-red-100`;
        }

        return `${baseClass} bg-gray-800 border-gray-700 text-gray-500 opacity-50 cursor-not-allowed`;
    };

    // Loading State
    if (loading) {
        return (
            <Modal isOpen={isOpen} onClose={handleClose} title="Loading..." maxWidth="2xl">
                <div className="flex justify-center items-center h-64">
                    <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-blue-500"></div>
                </div>
            </Modal>
        );
    }

    if (!quiz) return null;

    return (
        <Modal
            isOpen={isOpen}
            onClose={handleClose}
            title={step === 'result' ? 'Quiz Results' : quiz.title}
            maxWidth="2xl"
        >
            {/* START SCREEN */}
            {step === 'start' && (
                <div className="text-center py-8 animate-in fade-in slide-in-from-bottom-4 duration-300">
                    <div className="w-20 h-20 bg-blue-500/20 rounded-full flex items-center justify-center mx-auto mb-6">
                        <i className="fa-solid fa-graduation-cap text-3xl text-blue-400"></i>
                    </div>
                    <p className="text-gray-300 mb-8 text-lg leading-relaxed max-w-lg mx-auto">
                        {quiz.description}
                    </p>
                    <button
                        onClick={() => setStep('question')}
                        className="w-full max-w-sm bg-blue-600 hover:bg-blue-500 text-white font-bold py-3 px-6 rounded-xl shadow-lg shadow-blue-500/25 transition-all transform hover:scale-[1.02]"
                    >
                        Start Quiz
                    </button>
                </div>
            )}

            {/* QUESTION SCREEN */}
            {step === 'question' && (
                <div className="animate-in fade-in duration-300">
                    <div className="w-full bg-gray-700 h-2 rounded-full mb-6 overflow-hidden">
                        <div
                            className="bg-blue-500 h-full transition-all duration-500 ease-out"
                            style={{ width: `${((currentQuestion + 1) / quiz.questions.length) * 100}%` }}
                        />
                    </div>

                    <div className="mb-6">
                        <span className="text-xs font-bold tracking-wider text-blue-400 uppercase mb-1 block">
                            Question {currentQuestion + 1} of {quiz.questions.length}
                        </span>
                        <h3 className="text-xl md:text-2xl font-semibold text-white leading-snug">
                            {quiz.questions[currentQuestion].q}
                        </h3>
                    </div>

                    <div className="space-y-3 mb-8">
                        {quiz.questions[currentQuestion].o.map((option, idx) => (
                            <button
                                key={idx}
                                className={getOptionClass(idx, quiz.questions[currentQuestion].a)}
                                onClick={() => handleAnswer(idx)}
                                disabled={selectedOption !== null}
                            >
                                <span className="w-8 h-8 flex-shrink-0 flex items-center justify-center rounded-full bg-black/20 text-sm mr-3 font-bold">
                                    {String.fromCharCode(65 + idx)}
                                </span>
                                <span>{option}</span>
                            </button>
                        ))}
                    </div>

                    {selectedOption !== null && (
                        <div className="animate-in fade-in slide-in-from-bottom-2">
                            <button
                                onClick={handleNext}
                                className="w-full bg-blue-600 hover:bg-blue-500 text-white font-bold py-3.5 rounded-xl shadow-lg shadow-blue-500/25 transition-all flex items-center justify-center gap-2"
                            >
                                <span>{currentQuestion < quiz.questions.length - 1 ? 'Next Question' : 'View Results'}</span>
                                <i className="fa-solid fa-arrow-right"></i>
                            </button>
                        </div>
                    )}
                </div>
            )}

            {/* RESULTS SCREEN */}
            {step === 'result' && (
                <div className="text-center py-6 animate-in fade-in zoom-in-95 duration-300">
                    <div className="mb-6 relative inline-block">
                        <svg className="w-32 h-32 transform -rotate-90">
                            <circle cx="64" cy="64" r="60" stroke="currentColor" strokeWidth="8" fill="transparent" className="text-gray-700" />
                            <circle
                                cx="64" cy="64" r="60" stroke="currentColor" strokeWidth="8" fill="transparent"
                                strokeDasharray={377}
                                strokeDashoffset={377 - (377 * score) / quiz.questions.length}
                                className="text-blue-500 transition-all duration-1000 ease-out"
                            />
                        </svg>
                        <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2">
                            <span className="text-4xl font-bold text-white">{Math.round((score / quiz.questions.length) * 100)}%</span>
                        </div>
                    </div>

                    <p className="text-gray-300 mb-8 text-lg">
                        You scored <strong className="text-white">{score}</strong> out of <strong className="text-white">{quiz.questions.length}</strong>
                    </p>

                    <div className="flex gap-4">
                        <button onClick={handleClose} className="flex-1 px-6 py-3 rounded-xl border border-gray-600 text-gray-300 hover:bg-gray-700 hover:text-white transition-all font-semibold">
                            Close
                        </button>
                        <button
                            onClick={() => {
                                setStep('start');
                                setScore(0);
                                setCurrentQuestion(0);
                                setSelectedOption(null);
                            }}
                            className="flex-1 px-6 py-3 rounded-xl bg-blue-600 hover:bg-blue-500 text-white shadow-lg shadow-blue-500/25 transition-all font-semibold"
                        >
                            Try Again
                        </button>
                    </div>
                </div>
            )}
        </Modal>
    );
};

export default QuizModal;