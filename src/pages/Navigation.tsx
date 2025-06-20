
import React from 'react';
import { Link } from 'react-router-dom';
import { useCategories } from '@/hooks/useSupabase';

const Navigation: React.FC = () => {
  const { data: categories = [], isLoading, error } = useCategories();

  if (isLoading) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-brand-secondary via-brand-dark to-brand-secondary flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-16 w-16 border-b-2 border-brand-primary mx-auto mb-4"></div>
          <p className="text-brand-light">Kategoriler yükleniyor...</p>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-brand-secondary via-brand-dark to-brand-secondary flex items-center justify-center">
        <div className="text-center">
          <h1 className="text-2xl font-bold text-brand-light mb-4">Hata</h1>
          <p className="text-brand-light/80">Kategoriler yüklenirken bir hata oluştu.</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-brand-secondary via-brand-dark to-brand-secondary">
      {/* Header */}
      <div className="backdrop-blur-lg bg-brand-light/10 border-b border-brand-light/20 shadow-xl">
        <div className="px-4 py-6">
          <div className="text-center">
            <img 
              src="/studyoulogo.png" 
              alt="StudyOu Kafe" 
              className="h-16 mx-auto"
            />
          </div>
        </div>
      </div>

      {/* Kategoriler Grid */}
      <div className="px-4 py-8">
        <div className="max-w-4xl mx-auto">
          <div className="text-center mb-8">
            <h2 className="text-2xl md:text-3xl font-bold text-brand-light mb-4">
              Menü Kategorileri
            </h2>
            <p className="text-brand-light/70 text-sm">
              Bir kategori seçerek o kategorideki ürünleri görüntüleyebilirsiniz
            </p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4">
            {categories.map((category, index) => (
              <Link
                key={category.id}
                to={`/kategori/${category.slug}`}
                className="group relative overflow-hidden rounded-2xl border border-brand-light/20 shadow-2xl bg-gradient-to-br from-brand-secondary/80 to-brand-dark/80 backdrop-blur-sm transform transition-all duration-300 hover:scale-105 hover:shadow-xl"
                style={{
                  animationDelay: `${index * 0.1}s`
                }}
              >
                {/* Gradient Background */}
                <div className="absolute inset-0 bg-gradient-to-br from-brand-primary/20 via-transparent to-brand-primary/30 opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                
                {/* Content */}
                <div className="relative p-6 text-center min-h-[140px] flex flex-col justify-center">
                  <div className="mb-3">
                    {/* Icon based on category */}
                    <div className="w-12 h-12 mx-auto bg-gradient-to-r from-brand-primary to-brand-primary/80 rounded-full flex items-center justify-center text-white text-xl font-bold group-hover:scale-110 transition-transform duration-300">
                      {getCategoryIcon(category.slug)}
                    </div>
                  </div>
                  
                  <h3 className="text-lg font-bold text-brand-light mb-2 group-hover:text-brand-primary/90 transition-colors duration-300">
                    {category.name}
                  </h3>
                  
                  <div className="text-xs text-brand-light/60 font-medium">
                    Kategoriye Git →
                  </div>
                </div>

                {/* Hover effect border */}
                <div className="absolute inset-0 rounded-2xl bg-gradient-to-br from-brand-primary/0 via-transparent to-brand-primary/0 group-hover:from-brand-primary/30 group-hover:to-brand-primary/20 pointer-events-none transition-all duration-300" />
              </Link>
            ))}
          </div>
        </div>
      </div>

      {/* Footer Info */}
      <div className="text-center mt-12 pb-8">
        <div className="backdrop-blur-lg bg-brand-light/10 rounded-2xl p-6 shadow-xl border border-brand-light/20 max-w-md mx-auto">
          <div className="flex items-center justify-center mb-3">
            <div className="w-8 h-8 bg-gradient-to-r from-brand-primary to-brand-primary/80 rounded-full flex items-center justify-center animate-spin-slow">
              <span className="text-white text-lg">📱</span>
            </div>
          </div>
          <p className="text-brand-light/90 text-sm font-medium leading-relaxed">
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
