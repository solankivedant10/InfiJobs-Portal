/**
 * SeedButton Component
 * 
 * Debug utility button to seed the Supabase database with initial data.
 * Should be removed or hidden in production.
 */

import { useState } from 'react';
import { seedDatabase } from '../../utils/seedDatabase';

export const SeedButton = () => {
    const [loading, setLoading] = useState(false);
    const [result, setResult] = useState<{
        success: boolean;
        message: string;
        details?: Record<string, boolean>;
    } | null>(null);

    const handleSeed = async () => {
        setLoading(true);
        setResult(null);

        try {
            const seedResult = await seedDatabase();
            setResult(seedResult);
        } catch (error: any) {
            setResult({
                success: false,
                message: `Error: ${error.message}`
            });
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="fixed bottom-4 right-4 z-50 bg-white dark:bg-gray-800 p-4 rounded-lg shadow-lg border-2 border-purple-500 max-w-md">
            <div className="flex items-center gap-2 mb-3">
                <span className="text-2xl">🌱</span>
                <h3 className="font-bold text-lg">Database Seeding</h3>
            </div>

            <p className="text-sm text-gray-600 dark:text-gray-400 mb-4">
                Click to populate Supabase with ML tutorials, quizzes, and learning resources.
            </p>

            <button
                onClick={handleSeed}
                disabled={loading}
                className={`w-full px-4 py-2 rounded-lg font-medium transition-colors ${loading
                        ? 'bg-gray-400 cursor-not-allowed'
                        : 'bg-purple-600 hover:bg-purple-700 text-white'
                    }`}
            >
                {loading ? (
                    <span className="flex items-center justify-center gap-2">
                        <svg className="animate-spin h-5 w-5" viewBox="0 0 24 24">
                            <circle
                                className="opacity-25"
                                cx="12"
                                cy="12"
                                r="10"
                                stroke="currentColor"
                                strokeWidth="4"
                                fill="none"
                            />
                            <path
                                className="opacity-75"
                                fill="currentColor"
                                d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
                            />
                        </svg>
                        Seeding...
                    </span>
                ) : (
                    '🚀 Seed Database'
                )}
            </button>

            {result && (
                <div
                    className={`mt-4 p-3 rounded-lg ${result.success
                            ? 'bg-green-100 dark:bg-green-900 text-green-800 dark:text-green-200'
                            : 'bg-red-100 dark:bg-red-900 text-red-800 dark:text-red-200'
                        }`}
                >
                    <p className="font-medium flex items-center gap-2">
                        {result.success ? '✅' : '❌'} {result.message}
                    </p>

                    {result.details && (
                        <div className="mt-2 text-sm">
                            <p className="font-medium mb-1">Details:</p>
                            <ul className="space-y-1">
                                {Object.entries(result.details).map(([key, success]) => (
                                    <li key={key} className="flex items-center gap-2">
                                        <span>{success ? '✓' : '✗'}</span>
                                        <span className="capitalize">{key.replace(/([A-Z])/g, ' $1').trim()}</span>
                                    </li>
                                ))}
                            </ul>
                        </div>
                    )}
                </div>
            )}

            <p className="text-xs text-gray-500 mt-3">
                ⚠️ Debug component - Remove in production
            </p>
        </div>
    );
};
