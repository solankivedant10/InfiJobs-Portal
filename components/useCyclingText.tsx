
import { useState, useEffect } from 'react';

export const useCyclingText = (itemCount: number, interval: number = 8000, fadeDuration: number = 500) => {
  const [index, setIndex] = useState(0);
  const [isFading, setIsFading] = useState(false);

  useEffect(() => {
    if (itemCount <= 1) return;

    const timer = setInterval(() => {
      setIsFading(true);
      setTimeout(() => {
        setIndex(prevIndex => (prevIndex + 1) % itemCount);
        setIsFading(false);
      }, fadeDuration);
    }, interval);

    return () => clearInterval(timer);
  }, [itemCount, interval, fadeDuration]);

  return { index, isFading };
};
