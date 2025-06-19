
import React, { useState } from 'react';
import { Plus, Edit, Trash2, Save, X } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';

interface Category {
  id: string;
  name: string;
  slug: string;
  display_order: number;
  icon: string;
}

// Mock data - bu veriler normalde Supabase'den gelecek
const initialCategories: Category[] = [
  { id: '1', name: 'Klasikler', slug: 'klasikler', display_order: 1, icon: '☕' },
  { id: '2', name: 'Aromalı Kahveler', slug: 'aromali-kahveler', display_order: 2, icon: '🌟' },
  { id: '3', name: "Special's", slug: 'specials', display_order: 3, icon: '✨' },
  { id: '4', name: 'Soğuk İçecekler', slug: 'soguk-icecekler', display_order: 4, icon: '🧊' },
  { id: '5', name: 'Sıcak İçecekler', slug: 'sicak-icecekler', display_order: 5, icon: '🔥' },
  { id: '6', name: 'Milkshake & Frozen', slug: 'milkshake-frozen', display_order: 6, icon: '🥤' },
  { id: '7', name: 'Yiyecekler', slug: 'yiyecekler', display_order: 7, icon: '🍽️' },
  { id: '8', name: 'Tatlılar', slug: 'tatlilar', display_order: 8, icon: '🍰' }
];

export const CategoryManager: React.FC = () => {
  const [categories, setCategories] = useState<Category[]>(initialCategories);
  const [editingId, setEditingId] = useState<string | null>(null);
  const [showAddForm, setShowAddForm] = useState(false);
  const [formData, setFormData] = useState<Partial<Category>>({});

  const handleEdit = (category: Category) => {
    setEditingId(category.id);
    setFormData(category);
  };

  const handleSave = () => {
    if (editingId) {
      setCategories(categories.map(cat => 
        cat.id === editingId ? { ...cat, ...formData } as Category : cat
      ));
      setEditingId(null);
    } else {
      // Add new category
      const newCategory: Category = {
        id: Date.now().toString(),
        name: formData.name || '',
        slug: formData.slug || formData.name?.toLowerCase().replace(/\s+/g, '-') || '',
        display_order: categories.length + 1,
        icon: formData.icon || '📱'
      };
      setCategories([...categories, newCategory]);
      setShowAddForm(false);
    }
    setFormData({});
  };

  const handleDelete = (id: string) => {
    setCategories(categories.filter(cat => cat.id !== id));
  };

  const handleCancel = () => {
    setEditingId(null);
    setShowAddForm(false);
    setFormData({});
  };

  return (
    <div className="p-6">
      <div className="flex items-center justify-between mb-6">
        <h2 className="text-2xl font-bold text-brand-light">Kategori Yönetimi</h2>
        <Button
          onClick={() => setShowAddForm(true)}
          className="bg-gradient-to-r from-brand-primary to-brand-primary/80 hover:from-brand-primary/90 hover:to-brand-primary/70"
        >
          <Plus size={16} className="mr-2" />
          Yeni Kategori
        </Button>
      </div>

      {/* Add Form */}
      {showAddForm && (
        <Card className="mb-6 border-brand-primary/30 bg-gradient-to-r from-brand-primary/10 to-transparent">
          <CardHeader>
            <CardTitle className="text-brand-light">Yeni Kategori Ekle</CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              <div>
                <label className="block text-sm font-medium text-brand-light/80 mb-2">
                  Kategori Adı
                </label>
                <Input
                  value={formData.name || ''}
                  onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                  placeholder="Kategori adı"
                  className="bg-brand-light/10 border-brand-light/20 text-brand-light"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-brand-light/80 mb-2">
                  URL Slug
                </label>
                <Input
                  value={formData.slug || ''}
                  onChange={(e) => setFormData({ ...formData, slug: e.target.value })}
                  placeholder="url-slug"
                  className="bg-brand-light/10 border-brand-light/20 text-brand-light"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-brand-light/80 mb-2">
                  İkon
                </label>
                <Input
                  value={formData.icon || ''}
                  onChange={(e) => setFormData({ ...formData, icon: e.target.value })}
                  placeholder="🍕"
                  className="bg-brand-light/10 border-brand-light/20 text-brand-light"
                />
              </div>
            </div>
            <div className="flex space-x-2">
              <Button onClick={handleSave} className="bg-green-600 hover:bg-green-700">
                <Save size={16} className="mr-2" />
                Kaydet
              </Button>
              <Button onClick={handleCancel} variant="outline" className="border-brand-light/20 text-brand-light hover:bg-brand-light/10">
                <X size={16} className="mr-2" />
                İptal
              </Button>
            </div>
          </CardContent>
        </Card>
      )}

      {/* Categories Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {categories.map((category) => (
          <Card key={category.id} className="border-brand-light/20 bg-gradient-to-br from-brand-secondary/80 to-brand-dark/80 backdrop-blur-sm">
            <CardContent className="p-4">
              {editingId === category.id ? (
                <div className="space-y-3">
                  <Input
                    value={formData.name || ''}
                    onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                    className="bg-brand-light/10 border-brand-light/20 text-brand-light"
                  />
                  <Input
                    value={formData.slug || ''}
                    onChange={(e) => setFormData({ ...formData, slug: e.target.value })}
                    className="bg-brand-light/10 border-brand-light/20 text-brand-light"
                  />
                  <Input
                    value={formData.icon || ''}
                    onChange={(e) => setFormData({ ...formData, icon: e.target.value })}
                    className="bg-brand-light/10 border-brand-light/20 text-brand-light"
                  />
                  <div className="flex space-x-2">
                    <Button onClick={handleSave} size="sm" className="bg-green-600 hover:bg-green-700">
                      <Save size={14} />
                    </Button>
                    <Button onClick={handleCancel} size="sm" variant="outline" className="border-brand-light/20 text-brand-light">
                      <X size={14} />
                    </Button>
                  </div>
                </div>
              ) : (
                <>
                  <div className="flex items-center space-x-3 mb-4">
                    <div className="text-2xl">{category.icon}</div>
                    <div>
                      <h3 className="font-semibold text-brand-light">{category.name}</h3>
                      <p className="text-sm text-brand-light/60">/{category.slug}</p>
                    </div>
                  </div>
                  <div className="flex justify-between items-center">
                    <span className="text-xs text-brand-light/50">Sıra: {category.display_order}</span>
                    <div className="flex space-x-1">
                      <Button
                        onClick={() => handleEdit(category)}
                        size="sm"
                        variant="outline"
                        className="border-brand-primary/30 text-brand-primary hover:bg-brand-primary/10"
                      >
                        <Edit size={14} />
                      </Button>
                      <Button
                        onClick={() => handleDelete(category.id)}
                        size="sm"
                        variant="outline"
                        className="border-red-500/30 text-red-400 hover:bg-red-500/10"
                      >
                        <Trash2 size={14} />
                      </Button>
                    </div>
                  </div>
                </>
              )}
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  );
};
