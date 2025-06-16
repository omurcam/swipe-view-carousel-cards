import React from 'react';
import { Category } from '@/lib/supabase';

interface CategorySelectorProps {
  categories: Category[];
  activeCategory: string;
  onCategoryChange: (categoryId: string) => void;
}

export const CategorySelector: React.FC<CategorySelectorProps> = ({
  categories,
  activeCategory,
  onCategoryChange
}) => {
  return (
    <div className="w-full overflow-x-auto pb-2 scrollbar-hide">
      <div className="flex space-x-2 px-1 min-w-max sm:justify-center">
        {categories.map((category) => (
          <button
            key={category.id}
            onClick={() => onCategoryChange(category.id)}
            className={`relative px-3 sm:px-4 py-2 sm:py-2.5 rounded-lg sm:rounded-xl text-xs sm:text-sm font-medium whitespace-nowrap transition-all duration-300 transform hover:scale-105 active:scale-95 ${
              activeCategory === category.id
                ? 'bg-gradient-to-r from-orange-500 to-rose-500 text-white shadow-lg shadow-orange-500/25 scale-105'
                : 'backdrop-blur-sm bg-white/10 text-white/80 hover:bg-white/20 border border-white/20'
            }`}
          >
            {activeCategory === category.id && (
              <div className="absolute inset-0 bg-gradient-to-r from-orange-400 to-rose-400 rounded-lg sm:rounded-xl blur opacity-50 -z-10 animate-pulse"></div>
            )}
            <span className="relative z-10">{category.name}</span>
          </button>
        ))}
      </div>
    </div>
  );
};
