import { useState, useEffect, useCallback } from 'react';

type Theme = 'light' | 'dark';

export const useTheme = (): [Theme, () => void] => {
  // Lazy initialization: Check storage BEFORE the first render
  const [theme, setTheme] = useState<Theme>(() => {
    if (typeof window !== 'undefined') {
      const stored = localStorage.getItem('theme') as Theme | null;
      return stored || 'dark';
    }
    return 'dark';
  });

  useEffect(() => {
    const root = document.documentElement;
    root.setAttribute('data-theme', theme);
    localStorage.setItem('theme', theme);
  }, [theme]);

  const toggleTheme = useCallback(() => {
    setTheme((prev) => (prev === 'light' ? 'dark' : 'light'));
  }, []);

  return [theme, toggleTheme];
};