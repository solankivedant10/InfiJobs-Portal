import React, { useMemo } from 'react';

// Defined outside component to keep reference stable
const filters = [
  { label: 'Show All', value: 'all' },
  { label: 'Business Analyst', value: 'ba' },
  { label: 'Financial Analyst', value: 'fa' },
  { label: 'Data Analyst', value: 'da' },
  { label: 'Data Scientist', value: 'ds' },
  { label: 'Data Engineering', value: 'de' },
  { label: 'Business Intelligence', value: 'bi' },
  { label: 'Java Full Stack Developer', value: 'jf' },
  { label: 'Frontend Developer', value: 'fd' },
  { label: 'Supply Chain Analyst', value: 'sc' },
] as const;

interface FilterBarProps {
  activeFilter: string;
  onFilterChange: (filter: string) => void;
}

const FilterBar: React.FC<FilterBarProps> = ({ activeFilter, onFilterChange }) => {

  // Calculate the heading text purely based on props (Reactive way)
  const headingText = useMemo(() => {
    if (activeFilter === 'all') return 'Showing All Materials';

    const currentFilter = filters.find(f => f.value === activeFilter);
    return currentFilter
      ? `Showing materials for: ${currentFilter.label}`
      : 'Showing Selected Materials';
  }, [activeFilter]);

  return (
    <div className="relative z-20">
      <div className="flex justify-center items-center flex-wrap gap-3 my-8 px-4">
        {filters.map(filter => (
          <button
            key={filter.value}
            // data-filter kept for legacy compatibility if other scripts use it
            data-filter={filter.value}
            onClick={() => onFilterChange(filter.value)}
            className={`
              py-2 px-4 rounded-lg text-sm font-semibold 
              transition-all duration-300 transform hover:scale-105 active:scale-95
              border border-transparent
              ${activeFilter === filter.value
                ? 'bg-blue-600 text-white shadow-lg shadow-blue-500/30'
                : 'bg-gray-800/60 text-gray-400 hover:bg-gray-700 hover:text-white hover:border-gray-600'
              }
            `}
          >
            {filter.label}
          </button>
        ))}
      </div>

      <h2 id="filter-heading" className="text-2xl font-bold text-center text-gray-200 mb-8 -mt-2 animate-fade-in">
        {headingText}
      </h2>
    </div>
  );
};

export default FilterBar;