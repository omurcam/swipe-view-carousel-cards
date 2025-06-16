
import React from 'react';

interface CategorySelectorProps {
  categories: string[];
  activeCategory: string;
  onCategoryChange: (category: string) => void;
}

export const CategorySelector: React.FC<CategorySelectorProps> = ({
  categories,
  activeCategory,
  onCategoryChange
}) => {
  return (
    <div className="w-full overflow-x-auto pb-3 scrollbar-hide">
      <div className="flex space-x-3 px-2 min-w-max">
        {categories.map((category) => (
          <button
            key={category}
            onClick={() => onCategoryChange(category)}
            className={`relative px-6 py-3 rounded-2xl text-sm font-semibold whitespace-nowrap transition-all duration-300 transform hover:scale-105 ${
              activeCategory === category
                ? 'bg-gradient-to-r from-orange-500 to-rose-500 text-white shadow-lg shadow-orange-500/25'
                : 'backdrop-blur-sm bg-white/10 text-white/80 hover:bg-white/20 border border-white/20'
            }`}
          >
            {activeCategory === category && (
              <div className="absolute inset-0 bg-gradient-to-r from-orange-400 to-rose-400 rounded-2xl blur opacity-50 -z-10"></div>
            )}
            <span className="relative z-10">{category}</span>
          </button>
        ))}
      </div>
    </div>
  );
};
