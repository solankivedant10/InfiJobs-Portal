import React from 'react';

interface SectionProps {
  id: string;
  title: string;
  description: React.ReactNode;
  children: React.ReactNode;
  'aria-label': string;
  isFilterable?: boolean;
  className?: string;
}

const Section: React.FC<SectionProps> = ({ id, title, description, children, 'aria-label': ariaLabel, isFilterable, className }) => {
  return (
    <section 
      id={id} 
      aria-label={ariaLabel}
      data-filter-section={isFilterable ? "true" : undefined}
      className={className || ''}
    >
      <div className="text-center mb-12 reveal-on-scroll">
        <h2 className="text-3xl md:text-4xl font-bold text-white tracking-tight">{title}</h2>
        <div className="mt-4 text-lg text-gray-400 max-w-3xl mx-auto">
          {description}
        </div>
      </div>
      {children}
    </section>
  );
};

export default Section;