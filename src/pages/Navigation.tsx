
import React from 'react';
import { Link } from 'react-router-dom';
import { useCategories } from '@/hooks/useAdminData';
import { Loader2 } from 'lucide-react';

const Navigation = () => {
  const { categories, loading } = useCategories();

  if (loading) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-[#242729] via-[#1A1C1E] to-[#242729] flex items-center justify-center">
        <Loader2 className="w-8 h-8 animate-spin text-[#E54460]" />
      </div>
    );
  }

  const activeCategories = categories.filter(cat => cat.is_active);

  return (
    <div className="min-h-screen bg-gradient-to-br from-[#242729] via-[#1A1C1E] to-[#242729]">
      {/* Header */}
      <div className="text-center py-8 px-4">
        <h1 className="text-4xl md:text-6xl font-bold text-white mb-4">
          Coffee <span className="text-[#E54460]">Menu</span>
        </h1>
        <p className="text-white/70 text-lg">Kategorileri keşfedin</p>
      </div>

      {/* Categories Grid */}
      <div className="container mx-auto px-4 pb-8">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 max-w-6xl mx-auto">
          {activeCategories.map((category) => (
            <Link
              key={category.id}
              to={`/kategori/${category.id}`}
              className="group"
            >
              <div className="bg-gradient-to-br from-white/10 to-white/5 backdrop-blur-lg border border-white/20 rounded-2xl p-8 transition-all duration-300 group-hover:scale-105 group-hover:border-[#E54460]/50 group-hover:shadow-xl group-hover:shadow-[#E54460]/20">
                <div className="text-center">
                  <div className="text-4xl mb-4">
                    {category.name.includes('Kahve') ? '☕' : 
                     category.name.includes('Soğuk') ? '🧊' : 
                     category.name.includes('Sıcak') ? '🔥' : 
                     category.name.includes('Milkshake') ? '🥤' : 
                     category.name.includes('Yiyecek') ? '🍽️' : 
                     category.name.includes('Tatlı') ? '🍰' : '✨'}
                  </div>
                  <h2 className="text-xl font-bold text-white mb-2 group-hover:text-[#E54460] transition-colors">
                    {category.name}
                  </h2>
                  <div className="w-12 h-0.5 bg-[#E54460] mx-auto opacity-0 group-hover:opacity-100 transition-opacity"></div>
                </div>
              </div>
            </Link>
          ))}
        </div>

        {activeCategories.length === 0 && (
          <div className="text-center py-12">
            <div className="text-white/50 text-lg">Henüz kategori bulunmuyor</div>
            <p className="text-white/30 text-sm mt-2">
              Admin panelinden kategori ekleyebilirsiniz
            </p>
          </div>
        )}
      </div>

      {/* Admin Link */}
      <div className="fixed bottom-4 right-4">
        <Link
          to="/admin"
          className="bg-[#E54460] hover:bg-[#E54460]/80 text-white p-3 rounded-full shadow-lg transition-all duration-300 hover:scale-110"
        >
          ⚙️
        </Link>
      </div>
    </div>
  );
};

export default Navigation;
