
import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { ArrowLeft, Settings, Coffee, Grid, Palette, Image } from 'lucide-react';
import { CategoryManager } from '@/components/admin/CategoryManager';
import { MenuItemManager } from '@/components/admin/MenuItemManager';
import { ColorManager } from '@/components/admin/ColorManager';
import { ImageManager } from '@/components/admin/ImageManager';

type AdminTab = 'categories' | 'menu-items' | 'colors' | 'images';

const AdminPanel: React.FC = () => {
  const [activeTab, setActiveTab] = useState<AdminTab>('categories');

  const tabs = [
    { id: 'categories' as AdminTab, label: 'Kategoriler', icon: Grid },
    { id: 'menu-items' as AdminTab, label: 'Menü Ürünleri', icon: Coffee },
    { id: 'colors' as AdminTab, label: 'Renkler', icon: Palette },
    { id: 'images' as AdminTab, label: 'Görseller', icon: Image },
  ];

  const renderContent = () => {
    switch (activeTab) {
      case 'categories':
        return <CategoryManager />;
      case 'menu-items':
        return <MenuItemManager />;
      case 'colors':
        return <ColorManager />;
      case 'images':
        return <ImageManager />;
      default:
        return <CategoryManager />;
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-brand-secondary via-brand-dark to-brand-secondary">
      {/* Header */}
      <div className="backdrop-blur-lg bg-brand-light/10 border-b border-brand-light/20 shadow-xl sticky top-0 z-50">
        <div className="px-4 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-4">
              <Link
                to="/"
                className="flex items-center space-x-2 text-brand-light hover:text-brand-primary transition-colors"
              >
                <ArrowLeft size={20} />
                <span className="text-sm font-medium">Ana Sayfa</span>
              </Link>
              <div className="w-px h-6 bg-brand-light/20" />
              <div className="flex items-center space-x-2">
                <Settings className="text-brand-primary" size={24} />
                <h1 className="text-xl md:text-2xl font-bold text-brand-light">
                  Admin Paneli
                </h1>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Navigation Tabs */}
      <div className="px-4 py-6">
        <div className="max-w-6xl mx-auto">
          <div className="flex flex-wrap gap-2 mb-8">
            {tabs.map((tab) => {
              const Icon = tab.icon;
              return (
                <button
                  key={tab.id}
                  onClick={() => setActiveTab(tab.id)}
                  className={`flex items-center space-x-2 px-4 py-3 rounded-xl font-medium transition-all duration-300 ${
                    activeTab === tab.id
                      ? 'bg-gradient-to-r from-brand-primary to-brand-primary/80 text-white shadow-lg'
                      : 'backdrop-blur-sm bg-brand-light/10 text-brand-light/80 hover:bg-brand-light/20 border border-brand-light/20'
                  }`}
                >
                  <Icon size={18} />
                  <span className="text-sm">{tab.label}</span>
                </button>
              );
            })}
          </div>

          {/* Content */}
          <div className="backdrop-blur-lg bg-brand-light/5 rounded-2xl border border-brand-light/20 shadow-xl">
            {renderContent()}
          </div>
        </div>
      </div>
    </div>
  );
};

export default AdminPanel;
