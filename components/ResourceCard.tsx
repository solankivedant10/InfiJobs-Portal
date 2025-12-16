import React, { memo } from 'react';
import { useAuth } from '../context/AuthContext';

interface ResourceCardProps {
  id: string;
  role: string;
  title: string;
  children: React.ReactNode;
  footer?: React.ReactNode;
  // Optional style overrides
  className?: string;
  borderColor?: string;
  shadowColor?: string;
  titleColor?: string;
}

const ResourceCard: React.FC<ResourceCardProps> = ({
  id,
  role,
  title,
  children,
  footer,
  className = '',
  borderColor = 'border-gray-700',
  shadowColor = 'hover:shadow-purple-500/20',
  titleColor = 'text-purple-300'
}) => {
  const { isBookmarked, toggleBookmark } = useAuth();
  const bookmarked = isBookmarked(id);

  const handleBookmark = (e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();
    toggleBookmark(id);
  };

  return (
    <article
      data-id={id}
      data-role={role} // e.g., "ba all"
      className={`
        card group relative reveal-on-scroll 
        flex flex-col h-full w-full
        bg-gray-800/50 backdrop-blur-sm rounded-xl shadow-lg 
        border ${borderColor} hover:border-opacity-100 
        ${shadowColor} 
        transform hover:-translate-y-1 transition-all duration-300 ease-in-out 
        p-6
        ${className}
      `}
    >
      <button
        onClick={handleBookmark}
        className="absolute top-4 right-4 z-20 p-1 rounded-full hover:bg-white/5 transition-all focus:outline-none"
        aria-label={bookmarked ? "Remove bookmark" : "Save for later"}
      >
        <i
          className={`
            text-xl transition-colors duration-300
            ${bookmarked ? 'fa-solid fa-bookmark text-blue-500' : 'fa-regular fa-bookmark text-gray-400 hover:text-blue-400'}
          `}
        />
      </button>

      <h3 className={`text-xl font-bold mb-3 pr-8 leading-tight ${titleColor}`}>
        {title}
      </h3>

      <div className="flex-grow mb-4 text-gray-400 text-sm leading-relaxed">
        {children}
      </div>

      {footer && (
        <div className="mt-auto w-full">
          {footer}
        </div>
      )}
    </article>
  );
};

export default memo(ResourceCard);