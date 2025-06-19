
import React from 'react';
import { useParams, Link } from 'react-router-dom';
import { ArrowLeft } from 'lucide-react';
import { MenuSwiper } from '@/components/ui/menu-swiper';

// Mevcut menü verileri
const menuData = {
  'klasikler': [
    { name: 'Espresso', price: 'Orta: 80₺, Büyük: 95₺', image: 'https://images.unsplash.com/photo-1495474472287-4d71bcdd2085?fm=webp&w=400&h=600&fit=crop&q=80' },
    { name: 'Double Espresso', price: '100₺', image: 'https://images.unsplash.com/photo-1509042239860-f550ce710b93?fm=webp&w=400&h=600&fit=crop&q=80' },
    { name: 'Americano', price: 'Orta: 140₺, Büyük: 155₺', image: 'https://images.unsplash.com/photo-1447933601403-0c6688de566e?fm=webp&w=400&h=600&fit=crop&q=80' },
    { name: 'Filtre Kahve', price: 'Orta: 135₺, Büyük: 150₺', image: 'https://images.unsplash.com/photo-1497636577773-f1231844b336?fm=webp&w=400&h=600&fit=crop&q=80' },
    { name: 'Sütlü Filtre Kahve', price: 'Orta: 140₺, Büyük: 155₺', image: 'https://images.unsplash.com/photo-1559056199-641a0ac8b55e?fm=webp&w=400&h=600&fit=crop&q=80' },
    { name: 'Caffe Latte', price: 'Orta: 150₺, Büyük: 165₺', image: 'https://images.unsplash.com/photo-1514432324607-a09d9b4aefdd?fm=webp&w=400&h=600&fit=crop&q=80' },
    { name: 'Flat White', price: 'Orta: 150₺, Büyük: 165₺', image: 'https://images.unsplash.com/photo-1572442388796-11668a67e53d?fm=webp&w=400&h=600&fit=crop&q=80' },
    { name: 'Cortado', price: 'Orta: 150₺, Büyük: 165₺', image: 'https://images.unsplash.com/photo-1545665225-b23b99e4d45e?fm=webp&w=400&h=600&fit=crop&q=80' },
    { name: 'Türk Kahvesi', price: '80₺', image: 'https://images.unsplash.com/photo-1578985545062-69928b1d9587?fm=webp&w=400&h=600&fit=crop&q=80' },
    { name: 'Double Türk Kahvesi', price: '100₺', image: 'https://images.unsplash.com/photo-1571115764595-644a1f56a55c?fm=webp&w=400&h=600&fit=crop&q=80' }
  ],
  'aromali-kahveler': [
    { name: 'White Mocha', price: 'Orta: 160₺, Büyük: 175₺', image: 'https://images.unsplash.com/photo-1461023058943-07fcbe16d735?fm=webp&w=400&h=600&fit=crop&q=80' },
    { name: 'Chocolate Mocha', price: 'Orta: 160₺, Büyük: 175₺', image: 'https://images.unsplash.com/photo-1578662996442-48f60103fc96?fm=webp&w=400&h=600&fit=crop&q=80' },
    { name: 'Caramel Macchiato', price: 'Orta: 165₺, Büyük: 180₺', image: 'https://images.unsplash.com/photo-1570968915860-54d5c301fa9f?fm=webp&w=400&h=600&fit=crop&q=80' },
    { name: 'Salted Caramel Latte', price: 'Orta: 165₺, Büyük: 180₺', image: 'https://images.unsplash.com/photo-1541167760496-1628856ab772?fm=webp&w=400&h=600&fit=crop&q=80' },
    { name: 'Toffee Nut Latte', price: 'Orta: 165₺, Büyük: 180₺', image: 'https://images.unsplash.com/photo-1544787219-7f47ccb76574?fm=webp&w=400&h=600&fit=crop&q=80' },
    { name: 'Pumpkin Spice Latte', price: 'Orta: 160₺, Büyük: 175₺', image: 'https://images.unsplash.com/photo-1572490122747-3968b75cc699?fm=webp&w=400&h=600&fit=crop&q=80' },
    { name: 'Vanilla Latte', price: 'Orta: 160₺, Büyük: 175₺', image: 'https://images.unsplash.com/photo-1461023058943-07fcbe16d735?fm=webp&w=400&h=600&fit=crop&q=80' },
    { name: 'Caramel Latte', price: 'Orta: 160₺, Büyük: 175₺', image: 'https://images.unsplash.com/photo-1578662996442-48f60103fc96?fm=webp&w=400&h=600&fit=crop&q=80' },
    { name: 'Cookie Latte', price: 'Orta: 160₺, Büyük: 175₺', image: 'https://images.unsplash.com/photo-1570968915860-54d5c301fa9f?fm=webp&w=400&h=600&fit=crop&q=80' },
    { name: 'Irish Latte', price: 'Orta: 160₺, Büyük: 175₺', image: 'https://images.unsplash.com/photo-1541167760496-1628856ab772?fm=webp&w=400&h=600&fit=crop&q=80' },
    { name: 'Coconut Latte', price: 'Orta: 160₺, Büyük: 175₺', image: 'https://images.unsplash.com/photo-1544787219-7f47ccb76574?fm=webp&w=400&h=600&fit=crop&q=80' }
  ],
  'specials': [
    { name: 'Ying Yang Mocha', price: 'Orta: 180₺, Büyük: 200₺', image: 'https://images.unsplash.com/photo-1461023058943-07fcbe16d735?fm=webp&w=400&h=600&fit=crop&q=80' },
    { name: 'Cheesecake Latte', price: 'Orta: 180₺, Büyük: 200₺', image: 'https://images.unsplash.com/photo-1578662996442-48f60103fc96?fm=webp&w=400&h=600&fit=crop&q=80' },
    { name: 'Rosberry White Mocha', price: 'Orta: 180₺, Büyük: 200₺', image: 'https://images.unsplash.com/photo-1570968915860-54d5c301fa9f?fm=webp&w=400&h=600&fit=crop&q=80' },
    { name: 'Mocha Menta', price: 'Orta: 180₺, Büyük: 200₺', image: 'https://images.unsplash.com/photo-1541167760496-1628856ab772?fm=webp&w=400&h=600&fit=crop&q=80' },
    { name: 'Lotus Latte', price: 'Orta: 180₺, Büyük: 200₺', image: 'https://images.unsplash.com/photo-1544787219-7f47ccb76574?fm=webp&w=400&h=600&fit=crop&q=80' },
    { name: 'Cookie Mocha', price: 'Orta: 180₺, Büyük: 200₺', image: 'https://images.unsplash.com/photo-1572490122747-3968b75cc699?fm=webp&w=400&h=600&fit=crop&q=80' },
    { name: 'Cookie Nut Latte', price: 'Orta: 180₺, Büyük: 200₺', image: 'https://images.unsplash.com/photo-1461023058943-07fcbe16d735?fm=webp&w=400&h=600&fit=crop&q=80' },
    { name: 'White Nut Mocha', price: 'Orta: 180₺, Büyük: 200₺', image: 'https://images.unsplash.com/photo-1578662996442-48f60103fc96?fm=webp&w=400&h=600&fit=crop&q=80' }
  ],
  'soguk-icecekler': [
    { name: 'Ice Americano', price: '150₺', image: 'https://images.unsplash.com/photo-1517701604599-bb29b565090c?fm=webp&w=400&h=600&fit=crop&q=80' },
    { name: 'Ice Filtre Kahve', price: '130₺', image: 'https://images.unsplash.com/photo-1461023058943-07fcbe16d735?fm=webp&w=400&h=600&fit=crop&q=80' },
    { name: 'Ice Latte', price: '150₺', image: 'https://images.unsplash.com/photo-1578662996442-48f60103fc96?fm=webp&w=400&h=600&fit=crop&q=80' },
    { name: 'Ice Vanilla Latte', price: '180₺', image: 'https://images.unsplash.com/photo-1572442388796-11668a67e53d?fm=webp&w=400&h=600&fit=crop&q=80' },
    { name: 'Ice Caramel Latte', price: '180₺', image: 'https://images.unsplash.com/photo-1570968915860-54d5c301fa9f?fm=webp&w=400&h=600&fit=crop&q=80' },
    { name: 'Frappe', price: '180₺', image: 'https://images.unsplash.com/photo-1541167760496-1628856ab772?fm=webp&w=400&h=600&fit=crop&q=80' },
    { name: 'Freddo Cappucino', price: '150₺', image: 'https://images.unsplash.com/photo-1544787219-7f47ccb76574?fm=webp&w=400&h=600&fit=crop&q=80' },
    { name: 'Soğuk Çikolata', price: '140₺', image: 'https://images.unsplash.com/photo-1571091718767-18b5b1457add?fm=webp&w=400&h=600&fit=crop&q=80' },
    { name: 'Ice Tea', price: '120₺', image: 'https://images.unsplash.com/photo-1556679343-c7306c1976bc?fm=webp&w=400&h=600&fit=crop&q=80' },
    { name: 'Smoothie', price: '160₺', image: 'https://images.unsplash.com/photo-1505252585461-04db1eb84625?fm=webp&w=400&h=600&fit=crop&q=80' },
    { name: 'Klasik Limonata', price: '120₺', image: 'https://images.unsplash.com/photo-1621263764928-df1444c5e859?fm=webp&w=400&h=600&fit=crop&q=80' },
    { name: 'Nane Limonata', price: '130₺', image: 'https://images.unsplash.com/photo-1571091655789-405eb7a3a3a8?fm=webp&w=400&h=600&fit=crop&q=80' }
  ],
  'sicak-icecekler': [
    { name: 'Sıcak Çikolata', price: 'Orta: 140₺, Büyük: 155₺', image: 'https://images.unsplash.com/photo-1542990253-0b8be2f7f1b4?fm=webp&w=400&h=600&fit=crop&q=80' },
    { name: 'White Çikolata', price: 'Orta: 140₺, Büyük: 155₺', image: 'https://images.unsplash.com/photo-1571091718767-18b5b1457add?fm=webp&w=400&h=600&fit=crop&q=80' },
    { name: 'Chai Tea Latte', price: 'Orta: 140₺, Büyük: 155₺', image: 'https://images.unsplash.com/photo-1544787219-7f47ccb76574?fm=webp&w=400&h=600&fit=crop&q=80' },
    { name: 'Salep', price: 'Orta: 120₺, Büyük: 135₺', image: 'https://images.unsplash.com/photo-1572490122747-3968b75cc699?fm=webp&w=400&h=600&fit=crop&q=80' },
    { name: 'Earl Grey', price: '100₺', image: 'https://images.unsplash.com/photo-1544787219-7f47ccb76574?fm=webp&w=400&h=600&fit=crop&q=80' },
    { name: 'English Breakfast', price: '100₺', image: 'https://images.unsplash.com/photo-1572490122747-3968b75cc699?fm=webp&w=400&h=600&fit=crop&q=80' },
    { name: 'Green Tea', price: '100₺', image: 'https://images.unsplash.com/photo-1556679343-c7306c1976bc?fm=webp&w=400&h=600&fit=crop&q=80' },
    { name: 'Chamomile', price: '100₺', image: 'https://images.unsplash.com/photo-1571091655789-405eb7a3a3a8?fm=webp&w=400&h=600&fit=crop&q=80' }
  ],
  'milkshake-frozen': [
    { name: 'Caramel Vanilla Milkshake', price: '190₺', image: 'https://images.unsplash.com/photo-1572490122747-3968b75cc699?fm=webp&w=400&h=600&fit=crop&q=80' },
    { name: 'Vanilla Milkshake', price: '170₺', image: 'https://images.unsplash.com/photo-1544145945-f90425340c7e?fm=webp&w=400&h=600&fit=crop&q=80' },
    { name: 'Chocolate Milkshake', price: '190₺', image: 'https://images.unsplash.com/photo-1571091718767-18b5b1457add?fm=webp&w=400&h=600&fit=crop&q=80' },
    { name: 'Strawberry Milkshake', price: '190₺', image: 'https://images.unsplash.com/photo-1506502725962-101f87887d5b?fm=webp&w=400&h=600&fit=crop&q=80' },
    { name: 'Frozen Latte', price: '180₺', image: 'https://images.unsplash.com/photo-1571091718767-18b5b1457add?fm=webp&w=400&h=600&fit=crop&q=80' },
    { name: 'Frozen Mocha', price: '190₺', image: 'https://images.unsplash.com/photo-1578662996442-48f60103fc96?fm=webp&w=400&h=600&fit=crop&q=80' },
    { name: 'Frozen Caramel', price: '190₺', image: 'https://images.unsplash.com/photo-1570968915860-54d5c301fa9f?fm=webp&w=400&h=600&fit=crop&q=80' }
  ],
  'yiyecekler': [
    { name: 'Cheddar Jambon Sandwich', price: '200₺', image: 'https://images.unsplash.com/photo-1546069901-ba9599a7e63c?fm=webp&w=400&h=600&fit=crop&q=80' },
    { name: 'Ayvalık Tostu', price: '300₺', image: 'https://images.unsplash.com/photo-1555939594-58d7cb561ad1?fm=webp&w=400&h=600&fit=crop&q=80' },
    { name: 'Hamburger', price: '300₺', image: 'https://images.unsplash.com/photo-1567620905732-2d1ec7ab7445?fm=webp&w=400&h=600&fit=crop&q=80' },
    { name: 'Double Burger', price: '450₺', image: 'https://images.unsplash.com/photo-1568901346375-23c9450c58cd?fm=webp&w=400&h=600&fit=crop&q=80' },
    { name: 'Tavuk Burger', price: '250₺', image: 'https://images.unsplash.com/photo-1550547660-d9450f859349?fm=webp&w=400&h=600&fit=crop&q=80' },
    { name: 'Patates Kızartması', price: '100₺', image: 'https://images.unsplash.com/photo-1586190848861-99aa4a171e90?fm=webp&w=400&h=600&fit=crop&q=80' }
  ],
  'tatlilar': [
    { name: 'Lotus Cheesecake', price: '200₺', image: 'https://images.unsplash.com/photo-1567206563064-6f60f40a2b57?fm=webp&w=400&h=600&fit=crop&q=80' },
    { name: 'Bademli Cheesecake', price: '200₺', image: 'https://images.unsplash.com/photo-1571115764595-644a1f56a55c?fm=webp&w=400&h=600&fit=crop&q=80' },
    { name: 'San Sebastian', price: '200₺', image: 'https://images.unsplash.com/photo-1578985545062-69928b1d9587?fm=webp&w=400&h=600&fit=crop&q=80' },
    { name: 'Chocolate Bomb', price: '240₺', image: 'https://images.unsplash.com/photo-1606313564200-e75d5e30476c?fm=webp&w=400&h=600&fit=crop&q=80' },
    { name: 'Çikolatalı Cookie', price: '100₺', image: 'https://images.unsplash.com/photo-1499636136210-6f4ee915583e?fm=webp&w=400&h=600&fit=crop&q=80' },
    { name: 'Waffle', price: '220₺', image: 'https://images.unsplash.com/photo-1562376552-0d160a2f238d?fm=webp&w=400&h=600&fit=crop&q=80' }
  ]
};

// Kategori isimleri
const categoryNames: { [key: string]: string } = {
  'klasikler': 'Klasikler',
  'aromali-kahveler': 'Aromalı Kahveler',
  'specials': "Special's",
  'soguk-icecekler': 'Soğuk İçecekler',
  'sicak-icecekler': 'Sıcak İçecekler',
  'milkshake-frozen': 'Milkshake & Frozen',
  'yiyecekler': 'Yiyecekler',
  'tatlilar': 'Tatlılar'
};

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

  if (!categorySlug || !menuData[categorySlug as keyof typeof menuData]) {
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

  const categoryData = menuData[categorySlug as keyof typeof menuData];
  const categoryName = categoryNames[categorySlug] || categorySlug;

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
