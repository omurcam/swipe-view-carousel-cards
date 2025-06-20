
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
    <div className="min-h-screen bg-gradient-to-br from-brand-secondary via-brand-dark to-brand-secondary relative overflow-hidden">
      {/* Animated background elements */}
      <div className="absolute inset-0 overflow-hidden">
        <div className="absolute -top-40 -right-40 w-80 h-80 bg-brand-primary/10 rounded-full blur-3xl animate-pulse"></div>
        <div className="absolute -bottom-40 -left-40 w-80 h-80 bg-brand-primary/10 rounded-full blur-3xl animate-pulse" style={{ animationDelay: '2s' }}></div>
      </div>

      {/* Header */}
      <div className="relative backdrop-blur-lg bg-brand-light/5 border-b border-brand-light/10">
        <div className="px-4 py-6">
          <div className="text-center">
            <img 
              src="/studyoulogo.png" 
              alt="StudyOu Kafe" 
              className="h-16 mx-auto filter drop-shadow-xl"
            />
          </div>
        </div>
      </div>

      {/* Hero Section */}
      <div className="relative px-4 pt-12 pb-8">
        <div className="max-w-4xl mx-auto text-center">
          <h1 className="text-5xl md:text-6xl font-bold text-brand-light mb-4 tracking-tight">
            <span className="bg-gradient-to-r from-brand-light via-brand-primary to-brand-light bg-clip-text text-transparent animate-gradient">
              Menümüz
            </span>
          </h1>
          <p className="text-brand-light/60 text-lg mb-12 max-w-2xl mx-auto">
            Her damak tadına uygun, özenle hazırlanmış lezzetlerimizi keşfedin
          </p>
        </div>

        {/* Categories - Creative Layout */}
        <div className="max-w-6xl mx-auto">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {categories.map((category, index) => {
              const gradients = [
                'from-purple-600/20 to-pink-600/20',
                'from-blue-600/20 to-cyan-600/20', 
                'from-green-600/20 to-teal-600/20',
                'from-orange-600/20 to-red-600/20',
                'from-indigo-600/20 to-purple-600/20',
                'from-pink-600/20 to-rose-600/20',
                'from-teal-600/20 to-green-600/20',
                'from-amber-600/20 to-orange-600/20'
              ];
              
              const patterns = [
                '💫', '✨', '🌟', '⭐', '🌈', '🎯', '🎨', '🎪'
              ];

              // Kategori görsel URL'sini al (database'den veya fallback)
              const getBackgroundImage = (category: any) => {
                return category.image_url || 'https://images.unsplash.com/photo-1495474472287-4d71bcdd2085?q=80&w=1000';
              };
              
              return (
                                  <Link
                    key={category.id}
                    to={`/kategori/${category.slug}`}
                    className={`group relative h-48 rounded-2xl overflow-hidden transform transition-all duration-700 hover:-translate-y-2 hover:shadow-2xl`}
                    style={{
                      animation: `floatIn ${0.8 + index * 0.1}s ease-out forwards`,
                      opacity: 0
                    }}
                  >
                    {/* Background image with overlay */}
                    <div 
                      className="absolute inset-0 bg-cover bg-center transition-transform duration-700 group-hover:scale-110"
                      style={{
                        backgroundImage: `url(${getBackgroundImage(category)})`,
                      }}
                    >
                      {/* Image overlay for better text readability */}
                      <div className="absolute inset-0 bg-brand-dark/60 group-hover:bg-brand-dark/50 transition-colors duration-300"></div>
                    </div>
                    
                    {/* Dynamic gradient overlay */}
                    <div className={`absolute inset-0 bg-gradient-to-br ${gradients[index % gradients.length]} opacity-40 group-hover:opacity-60 transition-opacity duration-300`}></div>
                    
                    {/* Animated pattern overlay */}
                    <div className="absolute inset-0 flex items-center justify-center opacity-5 group-hover:opacity-10 transition-opacity duration-500">
                      <span className="text-8xl transform rotate-12 group-hover:rotate-45 transition-transform duration-700">
                        {patterns[index % patterns.length]}
                      </span>
                    </div>
                  
                  {/* Glass morphism card */}
                  <div className="absolute inset-0 bg-gradient-to-t from-brand-dark/90 via-brand-dark/50 to-transparent backdrop-blur-sm">
                    <div className="h-full flex flex-col justify-end p-6">
                      {/* Category name with animation */}
                      <h3 className="text-2xl font-bold text-brand-light mb-2 transform group-hover:scale-110 transition-transform duration-300 origin-left">
                        {category.name}
                      </h3>
                      
                      {/* Interactive elements */}
                      <div className="flex items-center justify-between">
                        <div className="flex items-center space-x-2">
                          <div className="w-2 h-2 bg-brand-primary rounded-full animate-pulse"></div>
                          <span className="text-brand-light/70 text-sm">Keşfet</span>
                        </div>
                        
                        {/* Animated arrow */}
                        <div className="relative overflow-hidden">
                          <svg className="w-6 h-6 text-brand-primary transform transition-all duration-300 group-hover:translate-x-8" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 7l5 5m0 0l-5 5m5-5H6" />
                          </svg>
                          <svg className="w-6 h-6 text-brand-primary absolute top-0 -left-8 transform transition-all duration-300 group-hover:translate-x-8" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 7l5 5m0 0l-5 5m5-5H6" />
                          </svg>
                        </div>
                      </div>
                    </div>
                  </div>
                  
                  {/* Hover glow effect */}
                  <div className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-500">
                    <div className="absolute inset-0 bg-gradient-to-t from-brand-primary/20 to-transparent"></div>
                  </div>
                </Link>
              );
            })}
          </div>
        </div>

        {/* Interactive bottom section */}
        <div className="mt-16 text-center pb-8">
          <div className="inline-flex items-center space-x-2 text-brand-light/60">
            <div className="w-8 h-[1px] bg-brand-light/20"></div>
            <span className="text-sm">Lezzet yolculuğunuza başlayın</span>
            <div className="w-8 h-[1px] bg-brand-light/20"></div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Navigation;
