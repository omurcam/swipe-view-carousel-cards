import React from 'react';

interface MenuCardProps {
  name: string;
  price: string;
  image: string;
  cardWidth?: number;
  cardHeight?: number;
}

export const MenuCard: React.FC<MenuCardProps> = ({
  name,
  price,
  image,
  cardWidth = 280,
  cardHeight = 320
}) => {
  return (
    <div 
      className="relative overflow-hidden rounded-2xl border border-white/10 shadow-2xl bg-gradient-to-br from-slate-900/50 to-purple-900/50 backdrop-blur-sm transform transition-all duration-300 hover:scale-105"
      style={{ width: cardWidth, height: cardHeight }}
    >
      {/* Image */}
      <div className="relative h-3/5 overflow-hidden">
        <img
          src={image}
          alt={name}
          className="w-full h-full object-cover transform transition-transform duration-500 hover:scale-110"
          draggable={false}
          loading="lazy"
        />
        {/* Strong gradient overlay for better text readability */}
        <div className="absolute inset-0 bg-gradient-to-t from-black/95 via-black/50 to-transparent" />
      </div>
      
      {/* Content with enhanced background */}
      <div className="absolute bottom-0 left-0 right-0 p-4">
        {/* Glass morphism background */}
        <div className="absolute inset-0 bg-gradient-to-t from-black/95 via-black/80 to-transparent backdrop-blur-md rounded-b-2xl" />
        
        {/* Text content */}
        <div className="relative z-10">
          <h3 className="text-base sm:text-lg font-bold mb-1 sm:mb-2 text-white text-readable leading-tight line-clamp-2">
            {name}
          </h3>
          <div className="flex items-center justify-between">
            <p className="text-xs sm:text-sm font-semibold text-orange-300 text-shadow-lg">
              {price}
            </p>
            <div className="w-6 h-6 sm:w-8 sm:h-8 bg-gradient-to-r from-orange-400 to-rose-400 rounded-full flex items-center justify-center shadow-lg">
              <span className="text-white text-xs sm:text-sm">₺</span>
            </div>
          </div>
        </div>
      </div>
      
      {/* Decorative gradient border */}
      <div className="absolute inset-0 rounded-2xl bg-gradient-to-br from-orange-400/20 via-transparent to-rose-400/20 pointer-events-none" />
    </div>
  );
}; 