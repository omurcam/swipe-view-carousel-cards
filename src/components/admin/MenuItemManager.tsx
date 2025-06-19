
import React, { useState } from 'react';
import { Plus, Edit, Trash2, Save, X, Loader2 } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { useMenuItems, useCategories, MenuItem } from '@/hooks/useAdminData';
import { useToast } from '@/hooks/use-toast';

export const MenuItemManager: React.FC = () => {
  const { menuItems, loading, createMenuItem, updateMenuItem, deleteMenuItem } = useMenuItems();
  const { categories } = useCategories();
  const { toast } = useToast();
  const [editingId, setEditingId] = useState<string | null>(null);
  const [showAddForm, setShowAddForm] = useState(false);
  const [formData, setFormData] = useState<Partial<MenuItem>>({});
  const [selectedCategory, setSelectedCategory] = useState<string>('');
  const [saving, setSaving] = useState(false);

  const filteredItems = selectedCategory 
    ? menuItems.filter(item => item.category_id === selectedCategory)
    : menuItems;

  const handleEdit = (item: MenuItem) => {
    setEditingId(item.id);
    setFormData(item);
  };

  const handleSave = async () => {
    if (!formData.name?.trim()) {
      toast({
        title: "Hata",
        description: "Ürün adı gereklidir",
        variant: "destructive"
      });
      return;
    }

    setSaving(true);
    try {
      if (editingId) {
        await updateMenuItem(editingId, formData);
        toast({
          title: "Başarılı",
          description: "Ürün güncellendi"
        });
        setEditingId(null);
      } else {
        const newItem = {
          name: formData.name,
          description: formData.description || null,
          price: formData.price || null,
          image_url: formData.image_url || null,
          category_id: formData.category_id || null,
          display_order: formData.display_order || menuItems.length + 1,
          is_active: formData.is_active ?? true
        };
        await createMenuItem(newItem);
        toast({
          title: "Başarılı",
          description: "Ürün eklendi"
        });
        setShowAddForm(false);
      }
      setFormData({});
    } catch (error) {
      toast({
        title: "Hata",
        description: "İşlem başarısız oldu",
        variant: "destructive"
      });
    } finally {
      setSaving(false);
    }
  };

  const handleDelete = async (id: string) => {
    if (!window.confirm('Bu ürünü silmek istediğinizden emin misiniz?')) {
      return;
    }

    try {
      await deleteMenuItem(id);
      toast({
        title: "Başarılı",
        description: "Ürün silindi"
      });
    } catch (error) {
      toast({
        title: "Hata",
        description: "Ürün silinirken hata oluştu",
        variant: "destructive"
      });
    }
  };

  const handleCancel = () => {
    setEditingId(null);
    setShowAddForm(false);
    setFormData({});
  };

  const getCategoryName = (categoryId: string | null) => {
    if (!categoryId) return 'Kategori yok';
    const category = categories.find(cat => cat.id === categoryId);
    return category?.name || 'Bilinmeyen kategori';
  };

  if (loading) {
    return (
      <div className="flex items-center justify-center h-64">
        <Loader2 className="w-8 h-8 animate-spin text-brand-primary" />
      </div>
    );
  }

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
            Tümü ({menuItems.length})
          </Button>
          {categories.map((category) => {
            const count = menuItems.filter(item => item.category_id === category.id).length;
            return (
              <Button
                key={category.id}
                onClick={() => setSelectedCategory(category.id)}
                variant={selectedCategory === category.id ? 'default' : 'outline'}
                size="sm"
                className={selectedCategory === category.id ? 'bg-brand-primary' : 'border-brand-light/20 text-brand-light hover:bg-brand-light/10'}
              >
                {category.name} ({count})
              </Button>
            );
          })}
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
                  value={formData.category_id || ''}
                  onChange={(e) => setFormData({ ...formData, category_id: e.target.value })}
                  className="w-full p-2 rounded-md bg-brand-light/10 border border-brand-light/20 text-brand-light"
                >
                  <option value="">Kategori seçin</option>
                  {categories.map((cat) => (
                    <option key={cat.id} value={cat.id} className="bg-brand-dark text-brand-light">
                      {cat.name}
                    </option>
                  ))}
                </select>
              </div>
              <div>
                <label className="block text-sm font-medium text-brand-light/80 mb-2">
                  Görsel URL
                </label>
                <Input
                  value={formData.image_url || ''}
                  onChange={(e) => setFormData({ ...formData, image_url: e.target.value })}
                  placeholder="https://..."
                  className="bg-brand-light/10 border-brand-light/20 text-brand-light"
                />
              </div>
            </div>
            <div className="flex space-x-2">
              <Button 
                onClick={handleSave} 
                className="bg-green-600 hover:bg-green-700"
                disabled={saving}
              >
                {saving ? <Loader2 size={16} className="mr-2 animate-spin" /> : <Save size={16} className="mr-2" />}
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
            {item.image_url && (
              <div className="aspect-video relative overflow-hidden">
                <img
                  src={item.image_url}
                  alt={item.name}
                  className="w-full h-full object-cover"
                />
                {item.price && (
                  <div className="absolute top-2 right-2 bg-brand-primary text-white px-2 py-1 rounded-lg text-sm font-semibold">
                    {item.price}₺
                  </div>
                )}
              </div>
            )}
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
                    <Button 
                      onClick={handleSave} 
                      size="sm" 
                      className="bg-green-600 hover:bg-green-700"
                      disabled={saving}
                    >
                      {saving ? <Loader2 size={14} className="animate-spin" /> : <Save size={14} />}
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
                    {item.description && (
                      <p className="text-sm text-brand-light/70 line-clamp-2">{item.description}</p>
                    )}
                    <div className="flex items-center justify-between mt-2">
                      <span className="text-xs text-brand-primary font-medium">{getCategoryName(item.category_id)}</span>
                      {item.price && (
                        <span className="text-sm font-bold text-brand-light">{item.price}₺</span>
                      )}
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

      {filteredItems.length === 0 && (
        <div className="text-center py-12">
          <div className="text-brand-light/50 text-lg">Ürün bulunamadı</div>
          <p className="text-brand-light/30 text-sm mt-2">
            {selectedCategory ? 'Bu kategoride ürün bulunmuyor' : 'Henüz ürün eklenmemiş'}
          </p>
        </div>
      )}
    </div>
  );
};
