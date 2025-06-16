
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
    <div className="min-h-screen bg-gradient-to-br from-orange-50 to-red-50">
      {/* Header */}
      <div className="bg-white shadow-sm sticky top-0 z-50">
        <div className="px-4 py-4">
          <h1 className="text-2xl font-bold text-gray-800 text-center mb-4">
            Restoran Menümüz
          </h1>
          <CategorySelector
            categories={categories}
            activeCategory={activeCategory}
            onCategoryChange={setActiveCategory}
          />
        </div>
      </div>

      {/* Content */}
      <div className="px-4 py-6">
        <div className="text-center mb-6">
          <h2 className="text-xl font-semibold text-gray-700 mb-2">
            {activeCategory}
          </h2>
          <p className="text-gray-500 text-sm">
            Kaydırarak diğer ürünleri görün
          </p>
        </div>

        {/* Image Swiper */}
        <div className="flex justify-center">
          <ImageSwiper
            images={categoryImages[activeCategory as keyof typeof categoryImages]}
            cardWidth={280}
            cardHeight={320}
            className="mx-auto"
          />
        </div>

        {/* Instructions */}
        <div className="text-center mt-8 px-4">
          <div className="bg-white rounded-lg p-4 shadow-sm">
            <p className="text-gray-600 text-sm">
              📱 Kartları sağa veya sola kaydırarak diğer yemekleri keşfedin
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};
