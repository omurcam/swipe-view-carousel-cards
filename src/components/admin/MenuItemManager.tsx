
import React, { useState } from 'react';
import { Plus, Edit, Trash2, Save, X, Upload } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';

interface MenuItem {
  id: string;
  name: string;
  description: string;
  price: number;
  image: string;
  category: string;
}

// Mock data
const initialMenuItems: MenuItem[] = [
  {
    id: '1',
    name: 'Türk Kahvesi',
    description: 'Geleneksel Türk kahvesi',
    price: 25,
    image: 'https://images.unsplash.com/photo-1495474472287-4d71bcdd2085',
    category: 'Klasikler'
  },
  {
    id: '2',
    name: 'Vanilya Latte',
    description: 'Vanilya aromalı latte',
    price: 35,
    image: 'https://images.unsplash.com/photo-1514432324607-a09d9b4aefdd',
    category: 'Aromalı Kahveler'
  },
  {
    id: '3',
    name: 'Signature Blend',
    description: 'Özel karışım kahve',
    price: 45,
    image: 'https://images.unsplash.com/photo-1461023058943-07fcbe16d735',
    category: "Special's"
  }
];

const categories = ['Klasikler', 'Aromalı Kahveler', "Special's", 'Soğuk İçecekler', 'Sıcak İçecekler', 'Milkshake & Frozen', 'Yiyecekler', 'Tatlılar'];

export const MenuItemManager: React.FC = () => {
  const [menuItems, setMenuItems] = useState<MenuItem[]>(initialMenuItems);
  const [editingId, setEditingId] = useState<string | null>(null);
  const [showAddForm, setShowAddForm] = useState(false);
  const [formData, setFormData] = useState<Partial<MenuItem>>({});
  const [selectedCategory, setSelectedCategory] = useState<string>('');

  const filteredItems = selectedCategory 
    ? menuItems.filter(item => item.category === selectedCategory)
    : menuItems;

  const handleEdit = (item: MenuItem) => {
    setEditingId(item.id);
    setFormData(item);
  };

  const handleSave = () => {
    if (editingId) {
      setMenuItems(menuItems.map(item => 
        item.id === editingId ? { ...item, ...formData } as MenuItem : item
      ));
      setEditingId(null);
    } else {
      const newItem: MenuItem = {
        id: Date.now().toString(),
        name: formData.name || '',
        description: formData.description || '',
        price: formData.price || 0,
        image: formData.image || 'https://images.unsplash.com/photo-1495474472287-4d71bcdd2085',
        category: formData.category || categories[0]
      };
      setMenuItems([...menuItems, newItem]);
      setShowAddForm(false);
    }
    setFormData({});
  };

  const handleDelete = (id: string) => {
    setMenuItems(menuItems.filter(item => item.id !== id));
  };

  const handleCancel = () => {
    setEditingId(null);
    setShowAddForm(false);
    setFormData({});
  };

  return (
    <div className="p-6">
      <div className="flex items-center justify-between mb-6">
        <h2 className="text-2xl font-bold text-brand-light">Menü Ürün Yönetimi</h2>
        <Button
          onClick={() => setShowAddForm(true)}
          className="bg-gradient-to-r from-brand-primary to-brand-primary/80 hover:from-brand-primary/90 hover:to-brand-primary/70"
        >
          <Plus size={16} className="mr-2" />
          Yeni Ürün
        </Button>
      </div>

      {/* Category Filter */}
      <div className="mb-6">
        <div className="flex flex-wrap gap-2">
          <Button
            onClick={() => setSelectedCategory('')}
            variant={selectedCategory === '' ? 'default' : 'outline'}
            size="sm"
            className={selectedCategory === '' ? 'bg-brand-primary' : 'border-brand-light/20 text-brand-light hover:bg-brand-light/10'}
          >
            Tümü
          </Button>
          {categories.map((category) => (
            <Button
              key={category}
              onClick={() => setSelectedCategory(category)}
              variant={selectedCategory === category ? 'default' : 'outline'}
              size="sm"
              className={selectedCategory === category ? 'bg-brand-primary' : 'border-brand-light/20 text-brand-light hover:bg-brand-light/10'}
            >
              {category}
            </Button>
          ))}
        </div>
      </div>

      {/* Add Form */}
      {showAddForm && (
        <Card className="mb-6 border-brand-primary/30 bg-gradient-to-r from-brand-primary/10 to-transparent">
          <CardHeader>
            <CardTitle className="text-brand-light">Yeni Ürün Ekle</CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-medium text-brand-light/80 mb-2">
                  Ürün Adı
                </label>
                <Input
                  value={formData.name || ''}
                  onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                  placeholder="Ürün adı"
                  className="bg-brand-light/10 border-brand-light/20 text-brand-light"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-brand-light/80 mb-2">
                  Fiyat (₺)
                </label>
                <Input
                  type="number"
                  value={formData.price || ''}
                  onChange={(e) => setFormData({ ...formData, price: Number(e.target.value) })}
                  placeholder="0"
                  className="bg-brand-light/10 border-brand-light/20 text-brand-light"
                />
              </div>
            </div>
            <div>
              <label className="block text-sm font-medium text-brand-light/80 mb-2">
                Açıklama
              </label>
              <Textarea
                value={formData.description || ''}
                onChange={(e) => setFormData({ ...formData, description: e.target.value })}
                placeholder="Ürün açıklaması"
                className="bg-brand-light/10 border-brand-light/20 text-brand-light"
                rows={3}
              />
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-medium text-brand-light/80 mb-2">
                  Kategori
                </label>
                <select
                  value={formData.category || ''}
                  onChange={(e) => setFormData({ ...formData, category: e.target.value })}
                  className="w-full p-2 rounded-md bg-brand-light/10 border border-brand-light/20 text-brand-light"
                >
                  {categories.map((cat) => (
                    <option key={cat} value={cat} className="bg-brand-dark text-brand-light">
                      {cat}
                    </option>
                  ))}
                </select>
              </div>
              <div>
                <label className="block text-sm font-medium text-brand-light/80 mb-2">
                  Görsel URL
                </label>
                <Input
                  value={formData.image || ''}
                  onChange={(e) => setFormData({ ...formData, image: e.target.value })}
                  placeholder="https://..."
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

      {/* Menu Items Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {filteredItems.map((item) => (
          <Card key={item.id} className="border-brand-light/20 bg-gradient-to-br from-brand-secondary/80 to-brand-dark/80 backdrop-blur-sm overflow-hidden">
            <div className="aspect-video relative overflow-hidden">
              <img
                src={item.image}
                alt={item.name}
                className="w-full h-full object-cover"
              />
              <div className="absolute top-2 right-2 bg-brand-primary text-white px-2 py-1 rounded-lg text-sm font-semibold">
                {item.price}₺
              </div>
            </div>
            <CardContent className="p-4">
              {editingId === item.id ? (
                <div className="space-y-3">
                  <Input
                    value={formData.name || ''}
                    onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                    className="bg-brand-light/10 border-brand-light/20 text-brand-light"
                  />
                  <Textarea
                    value={formData.description || ''}
                    onChange={(e) => setFormData({ ...formData, description: e.target.value })}
                    className="bg-brand-light/10 border-brand-light/20 text-brand-light"
                    rows={2}
                  />
                  <Input
                    type="number"
                    value={formData.price || ''}
                    onChange={(e) => setFormData({ ...formData, price: Number(e.target.value) })}
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
                  <div className="mb-3">
                    <h3 className="font-semibold text-brand-light text-lg mb-1">{item.name}</h3>
                    <p className="text-sm text-brand-light/70 line-clamp-2">{item.description}</p>
                    <div className="flex items-center justify-between mt-2">
                      <span className="text-xs text-brand-primary font-medium">{item.category}</span>
                    </div>
                  </div>
                  <div className="flex justify-end space-x-1">
                    <Button
                      onClick={() => handleEdit(item)}
                      size="sm"
                      variant="outline"
                      className="border-brand-primary/30 text-brand-primary hover:bg-brand-primary/10"
                    >
                      <Edit size={14} />
                    </Button>
                    <Button
                      onClick={() => handleDelete(item.id)}
                      size="sm"
                      variant="outline"
                      className="border-red-500/30 text-red-400 hover:bg-red-500/10"
                    >
                      <Trash2 size={14} />
                    </Button>
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
