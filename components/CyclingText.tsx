import React from 'react';
import { useCyclingText } from './useCyclingText';

interface CyclingTextProps {
  messages: string[];
  interval?: number;
  className?: string;
}

const CyclingText: React.FC<CyclingTextProps> = ({ messages, interval = 8000, className }) => {
  const { index, isFading } = useCyclingText(messages.length, interval);

  if (!messages || messages.length === 0) {
    return null;
  }

  return (
    <p className={`transition-opacity duration-500 ease-in-out ${isFading ? 'opacity-0' : 'opacity-100'} ${className}`}>
      {messages[index]}
    </p>
  );
};

export default CyclingText;