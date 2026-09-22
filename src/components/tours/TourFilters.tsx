import { useState } from 'react';
import { motion } from 'framer-motion';

interface TourFiltersProps {
  activeCategory: string;
  setActiveCategory: (category: string) => void;
  setSearchQuery: (query: string) => void;
}

export const TourFilters: React.FC<TourFiltersProps> = ({
  activeCategory,
  setActiveCategory,
  setSearchQuery,
}) => {
  const [query, setQuery] = useState('');

  const categories = [
    { id: 'all', label: 'All Tours' },
    { id: 'adventure', label: 'Adventure' },
    { id: 'relaxation', label: 'Relaxation' },
    { id: 'cultural', label: 'Cultural' },
    { id: 'wildlife', label: 'Wildlife' },
  ];

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    setSearchQuery(query);
  };

  return (
    <div className="mb-10">
      <div className="bg-dark-700 rounded-lg p-6">
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-6">
          {/* Search bar */}
          <form onSubmit={handleSearch} className="w-full md:w-auto">
            <div className="relative">
              <input
                type="text"
                placeholder="Search tours..."
                className="w-full md:w-80 bg-dark-800 border border-dark-600 rounded-tl-[50px] rounded-tr-[0.5rem] rounded-bl-[0.5rem] rounded-br-[50px] py-2 px-4 text-white focus:outline-none focus:ring-2 focus:ring-primary-500"
                value={query}
                onChange={(e) => setQuery(e.target.value)}
              />
              <button
                type="submit"
                className="absolute right-2 top-1/2 transform -translate-y-1/2 bg-primary-600 hover:bg-primary-700 text-white px-3 py-1 rounded-tl-[50px] rounded-tr-[0.5rem] rounded-bl-[0.5rem] rounded-br-[50px] text-sm transition-colors duration-300"
              >
                Search
              </button>
            </div>
          </form>

          {/* Category filters */}
          <div className="flex flex-wrap gap-2">
            {categories.map((category) => (
              <button
                key={category.id}
                className={`px-4 py-2 rounded-full text-sm transition-colors duration-300 ${
                  activeCategory === category.id
                    ? 'bg-primary-600 text-white'
                    : 'bg-dark-800 text-gray-300 hover:bg-dark-600'
                }`}
                onClick={() => setActiveCategory(category.id)}
              >
                {category.label}
              </button>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};