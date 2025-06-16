
import React, { useState } from 'react';
import { CategorySelector } from './CategorySelector';
import { ImageSwiper } from '@/components/ui/image-swiper';

const categories = [
  'Ana Yemekler',
  'Başlangıçlar', 
  'Salatalar',
  'Çorbalar',
  'Pizza',
  'Burger',
  'Tatlılar',
  'İçecekler'
];

// Placeholder resimler - kullanıcı kendi resimlerini yükleyecek
const categoryImages = {
  'Ana Yemekler': 'https://images.unsplash.com/photo-1546069901-ba9599a7e63c,https://images.unsplash.com/photo-1555939594-58d7cb561ad1,https://images.unsplash.com/photo-1567620905732-2d1ec7ab7445',
  'Başlangıçlar': 'https://images.unsplash.com/photo-1541014741259-de529411b96a,https://images.unsplash.com/photo-1599487488170-d11ec9c172f0,https://images.unsplash.com/photo-1562967916-eb82221dfb92',
  'Salatalar': 'https://images.unsplash.com/photo-1512621776951-a57141f2eefd,https://images.unsplash.com/photo-1540420773420-3366772f4999,https://images.unsplash.com/photo-1547496502-affa22d38842',
  'Çorbalar': 'https://images.unsplash.com/photo-1547592166-23ac45744acd,https://images.unsplash.com/photo-1569718212165-3a8278d5f624,https://images.unsplash.com/photo-1603105037880-880cd4edfb0d',
  'Pizza': 'https://images.unsplash.com/photo-1513104890138-7c749659a591,https://images.unsplash.com/photo-1520201163981-8cc95007dd2a,https://images.unsplash.com/photo-1571997478779-2adcbbe9ab2f',
  'Burger': 'https://images.unsplash.com/photo-1568901346375-23c9450c58cd,https://images.unsplash.com/photo-1550547660-d9450f859349,https://images.unsplash.com/photo-1586190848861-99aa4a171e90',
  'Tatlılar': 'https://images.unsplash.com/photo-1567206563064-6f60f40a2b57,https://images.unsplash.com/photo-1571115764595-644a1f56a55c,https://images.unsplash.com/photo-1578985545062-69928b1d9587',
  'İçecekler': 'https://images.unsplash.com/photo-1544145945-f90425340c7e,https://images.unsplash.com/photo-1571091718767-18b5b1457add,https://images.unsplash.com/photo-1506502725962-101f87887d5b'
};

export const RestaurantMenu: React.FC = () => {
  const [activeCategory, setActiveCategory] = useState(categories[0]);

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 via-purple-900 to-slate-900">
      {/* Header with glass effect */}
      <div className="backdrop-blur-lg bg-white/10 border-b border-white/20 sticky top-0 z-50 shadow-xl">
        <div className="px-6 py-6">
          <div className="text-center mb-6">
            <h1 className="text-3xl font-bold bg-gradient-to-r from-orange-400 to-rose-400 bg-clip-text text-transparent mb-2">
              ✨ Restoran Menümüz
            </h1>
            <p className="text-white/80 text-sm font-medium">
              Lezzetli yemeklerimizi keşfedin
            </p>
          </div>
          <CategorySelector
            categories={categories}
            activeCategory={activeCategory}
            onCategoryChange={setActiveCategory}
          />
        </div>
      </div>

      {/* Content */}
      <div className="px-6 py-8">
        <div className="text-center mb-8">
          <div className="inline-block">
            <h2 className="text-2xl font-bold text-white mb-3 relative">
              {activeCategory}
              <div className="absolute -bottom-1 left-0 right-0 h-0.5 bg-gradient-to-r from-orange-400 to-rose-400 rounded-full"></div>
            </h2>
          </div>
          <p className="text-white/70 text-sm font-medium">
            👆 Kartları kaydırarak diğer ürünleri görün
          </p>
        </div>

        {/* Image Swiper with enhanced container */}
        <div className="flex justify-center">
          <div className="relative">
            <div className="absolute inset-0 bg-gradient-to-r from-orange-400/20 to-rose-400/20 rounded-3xl blur-xl"></div>
            <div className="relative backdrop-blur-sm bg-white/5 rounded-3xl p-6 border border-white/10">
              <ImageSwiper
                images={categoryImages[activeCategory as keyof typeof categoryImages]}
                cardWidth={280}
                cardHeight={320}
                className="mx-auto"
              />
            </div>
          </div>
        </div>

        {/* Enhanced Instructions */}
        <div className="text-center mt-10 px-4">
          <div className="backdrop-blur-lg bg-white/10 rounded-2xl p-6 shadow-xl border border-white/20 max-w-md mx-auto">
            <div className="flex items-center justify-center mb-3">
              <div className="w-8 h-8 bg-gradient-to-r from-orange-400 to-rose-400 rounded-full flex items-center justify-center">
                <span className="text-white text-lg">📱</span>
              </div>
            </div>
            <p className="text-white/90 text-sm font-medium leading-relaxed">
              Kartları <span className="text-orange-400 font-semibold">sağa</span> veya <span className="text-rose-400 font-semibold">sola</span> kaydırarak diğer yemekleri keşfedin
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};
