
import React from 'react';
import { useParams, Link } from 'react-router-dom';
import { ArrowLeft } from 'lucide-react';
import { Swiper, SwiperSlide } from 'swiper/react';
import { Navigation, Pagination, Autoplay } from 'swiper/modules';
import { useCategories, useMenuItems } from '@/hooks/useAdminData';
import { Loader2 } from 'lucide-react';

import 'swiper/css';
import 'swiper/css/navigation';
import 'swiper/css/pagination';

const CategoryPage = () => {
  const { categorySlug } = useParams();
  const { categories, loading: categoriesLoading } = useCategories();
  const { menuItems, loading: menuItemsLoading } = useMenuItems();

  const loading = categoriesLoading || menuItemsLoading;

  if (loading) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-[#242729] via-[#1A1C1E] to-[#242729] flex items-center justify-center">
        <Loader2 className="w-8 h-8 animate-spin text-[#E54460]" />
      </div>
    );
  }

  const category = categories.find(cat => cat.id === categorySlug);
  
  if (!category) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-[#242729] via-[#1A1C1E] to-[#242729] flex items-center justify-center">
        <div className="text-center">
          <h1 className="text-2xl font-bold text-white mb-4">Kategori bulunamadı</h1>
          <Link to="/" className="text-[#E54460] hover:underline">
            Ana sayfaya dön
          </Link>
        </div>
      </div>
    );
  }

  const categoryItems = menuItems.filter(item => 
    item.category_id === category.id && item.is_active
  );

  return (
    <div className="min-h-screen bg-gradient-to-br from-[#242729] via-[#1A1C1E] to-[#242729]">
      {/* Header */}
      <div className="backdrop-blur-lg bg-white/10 border-b border-white/20 shadow-xl sticky top-0 z-50">
        <div className="container mx-auto px-4 py-4">
          <div className="flex items-center space-x-4">
            <Link
              to="/"
              className="flex items-center space-x-2 text-white hover:text-[#E54460] transition-colors"
            >
              <ArrowLeft size={20} />
              <span className="text-sm font-medium">Kategoriler</span>
            </Link>
            <div className="w-px h-6 bg-white/20" />
            <h1 className="text-xl md:text-2xl font-bold text-white">
              {category.name}
            </h1>
          </div>
        </div>
      </div>

      {/* Content */}
      <div className="container mx-auto px-4 py-8">
        {categoryItems.length > 0 ? (
          <Swiper
            modules={[Navigation, Pagination, Autoplay]}
            spaceBetween={20}
            slidesPerView={1}
            navigation
            pagination={{ clickable: true }}
            autoplay={{ delay: 5000, disableOnInteraction: false }}
            breakpoints={{
              640: { slidesPerView: 1 },
              768: { slidesPerView: 2 },
              1024: { slidesPerView: 3 },
            }}
            className="menu-swiper"
          >
            {categoryItems.map((item) => (
              <SwiperSlide key={item.id}>
                <div className="bg-gradient-to-br from-white/10 to-white/5 backdrop-blur-lg border border-white/20 rounded-2xl overflow-hidden shadow-xl transition-all duration-300 hover:scale-105 hover:border-[#E54460]/50">
                  {item.image_url && (
                    <div className="aspect-video overflow-hidden">
                      <img
                        src={item.image_url}
                        alt={item.name}
                        className="w-full h-full object-cover transition-transform duration-300 hover:scale-110"
                      />
                    </div>
                  )}
                  <div className="p-6">
                    <div className="flex items-start justify-between mb-3">
                      <h3 className="text-xl font-bold text-white">{item.name}</h3>
                      {item.price && (
                        <span className="bg-[#E54460] text-white px-3 py-1 rounded-full text-sm font-semibold">
                          {item.price}₺
                        </span>
                      )}
                    </div>
                    {item.description && (
                      <p className="text-white/70 text-sm leading-relaxed">
                        {item.description}
                      </p>
                    )}
                  </div>
                </div>
              </SwiperSlide>
            ))}
          </Swiper>
        ) : (
          <div className="text-center py-12">
            <div className="text-white/50 text-lg">Bu kategoride ürün bulunmuyor</div>
            <p className="text-white/30 text-sm mt-2">
              Admin panelinden ürün ekleyebilirsiniz
            </p>
          </div>
        )}
      </div>

      <style jsx global>{`
        .menu-swiper .swiper-button-next,
        .menu-swiper .swiper-button-prev {
          color: #E54460;
          background: rgba(255, 255, 255, 0.1);
          backdrop-filter: blur(10px);
          border-radius: 50%;
          width: 44px;
          height: 44px;
          margin-top: -22px;
        }
        
        .menu-swiper .swiper-button-next:after,
        .menu-swiper .swiper-button-prev:after {
          font-size: 18px;
          font-weight: bold;
        }
        
        .menu-swiper .swiper-pagination-bullet {
          background: rgba(255, 255, 255, 0.3);
          opacity: 1;
        }
        
        .menu-swiper .swiper-pagination-bullet-active {
          background: #E54460;
        }
      `}</style>
    </div>
  );
};

export default CategoryPage;
