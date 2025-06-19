import React from 'react';
import { useParams, Link } from 'react-router-dom';
import { ArrowLeft } from 'lucide-react';
import { MenuSwiper } from '@/components/ui/menu-swiper';
import { tempCategories, menuData } from '@/data/menu-data';

const CategoryPage: React.FC = () => {
  const { categorySlug } = useParams<{ categorySlug: string }>();
  const [isMobile, setIsMobile] = React.useState<boolean>(false);

  // Check if mobile on mount and resize
  React.useEffect(() => {
    const checkMobile = () => {
      setIsMobile(window.innerWidth < 640);
    };
    
    checkMobile();
    window.addEventListener('resize', checkMobile);
    
    return () => window.removeEventListener('resize', checkMobile);
  }, []);

  const category = tempCategories.find(c => c.slug === categorySlug);

  if (!categorySlug || !category) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-brand-secondary via-brand-dark to-brand-secondary flex items-center justify-center">
        <div className="text-center">
          <h1 className="text-2xl font-bold text-brand-light mb-4">Kategori Bulunamadı</h1>
          <Link 
            to="/" 
            className="text-brand-primary hover:text-brand-primary/80 underline"
          >
            Ana sayfaya dön
          </Link>
        </div>
      </div>
    );
  }

  const categoryData = menuData[category.id as keyof typeof menuData] || [];
  const categoryName = category.name;

  return (
    <div className="min-h-screen bg-gradient-to-br from-brand-secondary via-brand-dark to-brand-secondary">
      {/* Header with back button */}
      <div className="backdrop-blur-lg bg-brand-light/10 border-b border-brand-light/20 sticky top-0 z-50 shadow-xl">
        <div className="px-3 sm:px-4 py-3 sm:py-4">
          <div className="flex items-center mb-3">
            <Link 
              to="/" 
              className="flex items-center space-x-2 text-brand-light/80 hover:text-brand-light transition-colors duration-200 mr-4"
            >
              <ArrowLeft className="w-5 h-5" />
              <span className="text-sm font-medium">Geri</span>
            </Link>
          </div>
          
          <div className="text-center">
            <h1 className="text-xl sm:text-2xl md:text-3xl font-bold bg-gradient-to-r from-brand-primary to-brand-primary/80 bg-clip-text text-transparent mb-1 animate-pulse">
              ☕ StudyOu Kafe
            </h1>
            <p className="text-brand-light/80 text-xs sm:text-sm font-medium">
              {categoryName} kategorisi
            </p>
          </div>
        </div>
      </div>

      {/* Content */}
      <div className="px-3 sm:px-6 py-6 sm:py-8">
        <div className="text-center mb-6 sm:mb-8">
          <div className="inline-block">
            <h2 className="text-xl sm:text-2xl md:text-3xl font-bold text-brand-light mb-2 sm:mb-3 relative animate-fade-in">
              {categoryName}
              <div className="absolute -bottom-1 left-0 right-0 h-0.5 bg-gradient-to-r from-brand-primary to-brand-primary/80 rounded-full animate-width"></div>
            </h2>
          </div>
          <p className="text-brand-light/70 text-xs sm:text-sm font-medium mt-2">
            <span className="inline-block animate-bounce">👆</span> Kartları kaydırarak diğer ürünleri görün
          </p>
        </div>

        {/* Menu Swiper */}
        <div className="flex justify-center">
          <div className="relative w-full max-w-md sm:max-w-lg md:max-w-xl lg:max-w-2xl">
            <div className="absolute inset-0 bg-gradient-to-r from-brand-primary/20 to-brand-primary/30 rounded-2xl sm:rounded-3xl blur-xl animate-pulse-slow"></div>
            <div className="relative backdrop-blur-sm bg-brand-light/5 rounded-2xl sm:rounded-3xl p-4 sm:p-6 border border-brand-light/10 shadow-2xl">
              <MenuSwiper
                items={categoryData}
                cardWidth={isMobile ? 300 : 350}
                cardHeight={isMobile ? 360 : 420}
                className="mx-auto"
              />
            </div>
          </div>
        </div>

        {/* Instructions */}
        <div className="text-center mt-8 sm:mt-10 px-2 sm:px-4">
          <div className="backdrop-blur-lg bg-brand-light/10 rounded-xl sm:rounded-2xl p-4 sm:p-6 shadow-xl border border-brand-light/20 max-w-xs sm:max-w-md mx-auto transform hover:scale-105 transition-transform duration-300">
            <div className="flex items-center justify-center mb-2 sm:mb-3">
              <div className="w-6 h-6 sm:w-8 sm:h-8 bg-gradient-to-r from-brand-primary to-brand-primary/80 rounded-full flex items-center justify-center animate-spin-slow">
                <span className="text-white text-sm sm:text-lg">📱</span>
              </div>
            </div>
            <p className="text-brand-light/90 text-xs sm:text-sm font-medium leading-relaxed">
              Kartları <span className="text-brand-primary font-semibold animate-pulse">sağa</span> veya <span className="text-brand-primary/80 font-semibold animate-pulse">sola</span> kaydırarak diğer ürünleri keşfedin
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CategoryPage;
