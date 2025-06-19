
import React from 'react';
import { Link } from 'react-router-dom';

// Kategoriler - mevcut verilerle uyumlu
const categories = [
  { id: '1', name: 'Klasikler', slug: 'klasikler', display_order: 1 },
  { id: '2', name: 'Aromalı Kahveler', slug: 'aromali-kahveler', display_order: 2 },
  { id: '3', name: "Special's", slug: 'specials', display_order: 3 },
  { id: '4', name: 'Soğuk İçecekler', slug: 'soguk-icecekler', display_order: 4 },
  { id: '5', name: 'Sıcak İçecekler', slug: 'sicak-icecekler', display_order: 5 },
  { id: '6', name: 'Milkshake & Frozen', slug: 'milkshake-frozen', display_order: 6 },
  { id: '7', name: 'Yiyecekler', slug: 'yiyecekler', display_order: 7 },
  { id: '8', name: 'Tatlılar', slug: 'tatlilar', display_order: 8 }
];

const Navigation: React.FC = () => {
  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 via-purple-900 to-slate-900">
      {/* Header */}
      <div className="backdrop-blur-lg bg-white/10 border-b border-white/20 shadow-xl">
        <div className="px-4 py-6">
          <div className="text-center">
            <h1 className="text-3xl md:text-4xl font-bold bg-gradient-to-r from-orange-400 to-rose-400 bg-clip-text text-transparent mb-2 animate-pulse">
              ☕ StudyOu Kafe
            </h1>
            <p className="text-white/80 text-sm font-medium">
              Menü kategorilerimizi keşfedin
            </p>
          </div>
        </div>
      </div>

      {/* Kategoriler Grid */}
      <div className="px-4 py-8">
        <div className="max-w-4xl mx-auto">
          <div className="text-center mb-8">
            <h2 className="text-2xl md:text-3xl font-bold text-white mb-4">
              Menü Kategorileri
            </h2>
            <p className="text-white/70 text-sm">
              Bir kategori seçerek o kategorideki ürünleri görüntüleyebilirsiniz
            </p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4">
            {categories.map((category, index) => (
              <Link
                key={category.id}
                to={`/kategori/${category.slug}`}
                className="group relative overflow-hidden rounded-2xl border border-white/10 shadow-2xl bg-gradient-to-br from-slate-900/50 to-purple-900/50 backdrop-blur-sm transform transition-all duration-300 hover:scale-105 hover:shadow-xl"
                style={{
                  animationDelay: `${index * 0.1}s`
                }}
              >
                {/* Gradient Background */}
                <div className="absolute inset-0 bg-gradient-to-br from-orange-400/20 via-transparent to-rose-400/20 opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                
                {/* Content */}
                <div className="relative p-6 text-center min-h-[140px] flex flex-col justify-center">
                  <div className="mb-3">
                    {/* Icon based on category */}
                    <div className="w-12 h-12 mx-auto bg-gradient-to-r from-orange-400 to-rose-400 rounded-full flex items-center justify-center text-white text-xl font-bold group-hover:scale-110 transition-transform duration-300">
                      {getCategoryIcon(category.slug)}
                    </div>
                  </div>
                  
                  <h3 className="text-lg font-bold text-white mb-2 group-hover:text-orange-300 transition-colors duration-300">
                    {category.name}
                  </h3>
                  
                  <div className="text-xs text-white/60 font-medium">
                    Kategoriye Git →
                  </div>
                </div>

                {/* Hover effect border */}
                <div className="absolute inset-0 rounded-2xl bg-gradient-to-br from-orange-400/0 via-transparent to-rose-400/0 group-hover:from-orange-400/30 group-hover:to-rose-400/30 pointer-events-none transition-all duration-300" />
              </Link>
            ))}
          </div>
        </div>
      </div>

      {/* Footer Info */}
      <div className="text-center mt-12 pb-8">
        <div className="backdrop-blur-lg bg-white/10 rounded-2xl p-6 shadow-xl border border-white/20 max-w-md mx-auto">
          <div className="flex items-center justify-center mb-3">
            <div className="w-8 h-8 bg-gradient-to-r from-orange-400 to-rose-400 rounded-full flex items-center justify-center animate-spin-slow">
              <span className="text-white text-lg">📱</span>
            </div>
          </div>
          <p className="text-white/90 text-sm font-medium leading-relaxed">
            Her kategoride özel olarak seçilmiş lezzetli ürünlerimizi keşfedin
          </p>
        </div>
      </div>
    </div>
  );
};

// Kategori ikonları
const getCategoryIcon = (slug: string): string => {
  const icons: { [key: string]: string } = {
    'klasikler': '☕',
    'aromali-kahveler': '🌟',
    'specials': '✨',
    'soguk-icecekler': '🧊',
    'sicak-icecekler': '🔥',
    'milkshake-frozen': '🥤',
    'yiyecekler': '🍽️',
    'tatlilar': '🍰'
  };
  return icons[slug] || '📱';
};

export default Navigation;
