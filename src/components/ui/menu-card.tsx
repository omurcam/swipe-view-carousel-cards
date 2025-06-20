
import React, { memo } from 'react';

interface SizePrices {
  small?: number | null;
  medium?: number | null;
  large?: number | null;
}

interface MenuCardProps {
  name: string;
  price?: string;
  sizePrices?: SizePrices;
  image: string;
  cardWidth?: number;
  cardHeight?: number;
}

export const MenuCard: React.FC<MenuCardProps> = memo(({
  name,
  price,
  sizePrices,
  image,
  cardWidth = 280,
  cardHeight = 320
}) => {
  // Size labels map
  const sizeLabels = {
    small: 'Küçük',
    medium: 'Orta', 
    large: 'Büyük'
  };

  // Get available sizes and prices
  const availableSizes = sizePrices ? 
    Object.entries(sizePrices)
      .filter(([_, price]) => price !== null && price !== undefined)
      .map(([size, price]) => ({ size: size as keyof SizePrices, price: price as number }))
    : [];
  return (
    <div 
      className="relative overflow-hidden rounded-2xl border border-brand-light/10 shadow-2xl bg-gradient-to-br from-brand-secondary/80 to-brand-dark/80 backdrop-blur-sm transform transition-transform duration-200 hover:scale-105"
      style={{ 
        width: cardWidth, 
        height: cardHeight,
        willChange: 'transform', // Optimize for animations
        backfaceVisibility: 'hidden' // Improve rendering performance
      }}
    >
      {/* Image */}
      <div className="relative h-2/3 overflow-hidden">
        <img
          src={image}
          alt={name}
          className="w-full h-full object-cover transform transition-transform duration-300 hover:scale-110"
          draggable={false}
          loading="lazy"
          decoding="async" // Improve image loading performance
          style={{
            willChange: 'transform',
            backfaceVisibility: 'hidden'
          }}
        />
        {/* Strong gradient overlay for better text readability */}
        <div className="absolute inset-0 bg-gradient-to-t from-brand-dark/95 via-brand-secondary/50 to-transparent" />
      </div>
      
      {/* Content with enhanced background */}
      <div className="absolute bottom-0 left-0 right-0 p-5 sm:p-6">
        {/* Glass morphism background */}
        <div className="absolute inset-0 bg-gradient-to-t from-brand-dark/95 via-brand-secondary/80 to-transparent backdrop-blur-md rounded-b-2xl" />
        
        {/* Text content */}
        <div className="relative z-10">
          <h3 className="text-lg sm:text-xl md:text-2xl font-bold mb-2 sm:mb-3 text-brand-light text-readable leading-tight line-clamp-2">
            {name}
          </h3>
          
          {/* Price options */}
          {availableSizes.length > 0 ? (
            <div className="space-y-1.5">
              {availableSizes.map(({ size, price }) => (
                <div key={size} className="flex items-center justify-between">
                  <div className="flex items-center space-x-2">
                    <span className="text-xs sm:text-sm font-medium text-brand-light/80">
                      {sizeLabels[size]}
                    </span>
                    <div className="w-1 h-1 bg-brand-primary/60 rounded-full"></div>
                  </div>
                  <span className="text-sm sm:text-base font-bold text-brand-primary text-shadow-lg">
                    {price} TL
                  </span>
                </div>
              ))}
            </div>
          ) : price ? (
            <div className="flex items-center justify-between">
              <p className="text-sm sm:text-base md:text-lg font-bold text-brand-primary text-shadow-lg">
                {price}
              </p>
              <div className="w-8 h-8 sm:w-10 sm:h-10 bg-gradient-to-r from-brand-primary to-brand-primary/80 rounded-full flex items-center justify-center shadow-lg">
                <span className="text-white text-sm sm:text-base font-bold">₺</span>
              </div>
            </div>
          ) : (
            <p className="text-sm text-brand-light/60">Fiyat Bilgisi Yok</p>
          )}
        </div>
      </div>
      
      {/* Decorative gradient border */}
      <div className="absolute inset-0 rounded-2xl bg-gradient-to-br from-brand-primary/0 via-transparent to-brand-primary/0 pointer-events-none transition-all duration-300" />
    </div>
  );
}); 
