import React, { useState } from 'react';
import { useCategories, useMenuItemsWithCategory, useCreateCategory, useUpdateCategory, useCreateMenuItem, useUpdateMenuItem } from '@/hooks/useSupabase';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { toast } from 'sonner';

const AdminPage = () => {
  const { data: categories = [], isLoading: categoriesLoading, refetch: refetchCategories } = useCategories();
  const { data: menuItems = [], isLoading: menuItemsLoading, refetch: refetchMenuItems } = useMenuItemsWithCategory();
  
  const createCategory = useCreateCategory();
  const updateCategory = useUpdateCategory();
  const createMenuItem = useCreateMenuItem();
  const updateMenuItem = useUpdateMenuItem();

  const [newCategory, setNewCategory] = useState({ name: '', slug: '' });
  const [newMenuItem, setNewMenuItem] = useState({
    name: '',
    description: '',
    price: '',
    image_url: '',
    category_id: ''
  });

  const handleCreateCategory = async () => {
    if (!newCategory.name || !newCategory.slug) {
      toast.error('Kategori adı ve slug gerekli');
      return;
    }

    try {
      await createCategory.mutateAsync({
        name: newCategory.name,
        slug: newCategory.slug,
        display_order: categories.length + 1,
        is_active: true
      });
      setNewCategory({ name: '', slug: '' });
      toast.success('Kategori başarıyla oluşturuldu');
    } catch (error) {
      toast.error('Kategori oluşturulurken hata oluştu');
      console.error(error);
    }
  };

  const handleUpdateCategory = async (categoryId: string, updates: any) => {
    try {
      await updateCategory.mutateAsync({ id: categoryId, ...updates });
      toast.success('Kategori güncellendi');
    } catch (error) {
      toast.error('Kategori güncellenirken hata oluştu');
      console.error(error);
    }
  };

  const handleCreateMenuItem = async () => {
    if (!newMenuItem.name || !newMenuItem.category_id) {
      toast.error('Ürün adı ve kategori gerekli');
      return;
    }

    try {
      await createMenuItem.mutateAsync({
        name: newMenuItem.name,
        description: newMenuItem.description || undefined,
        price: newMenuItem.price ? parseFloat(newMenuItem.price) : undefined,
        image_url: newMenuItem.image_url || undefined,
        category_id: newMenuItem.category_id,
        display_order: 1,
        is_active: true
      });
      setNewMenuItem({ name: '', description: '', price: '', image_url: '', category_id: '' });
      toast.success('Ürün başarıyla oluşturuldu');
    } catch (error) {
      toast.error('Ürün oluşturulurken hata oluştu');
      console.error(error);
    }
  };

  const handleUpdateMenuItem = async (itemId: string, updates: any) => {
    try {
      await updateMenuItem.mutateAsync({ id: itemId, ...updates });
      toast.success('Ürün güncellendi');
    } catch (error) {
      toast.error('Ürün güncellenirken hata oluştu');
      console.error(error);
    }
  };

  if (categoriesLoading || menuItemsLoading) {
    return (
      <div className="container mx-auto p-4">
        <div className="text-center">
          <div className="animate-spin rounded-full h-16 w-16 border-b-2 border-brand-primary mx-auto mb-4"></div>
          <p>Yükleniyor...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="container mx-auto p-4 space-y-6">
      <h1 className="text-3xl font-bold mb-4">Admin Panel</h1>
      
      {/* Categories Section */}
      <Card>
        <CardHeader>
          <CardTitle>Kategoriler</CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          {/* Add new category */}
          <div className="border p-4 rounded-lg bg-gray-50">
            <h3 className="font-semibold mb-2">Yeni Kategori Ekle</h3>
            <div className="grid grid-cols-2 gap-2 mb-2">
              <Input
                placeholder="Kategori adı"
                value={newCategory.name}
                onChange={(e) => setNewCategory(prev => ({ ...prev, name: e.target.value }))}
              />
              <Input
                placeholder="Slug (URL için)"
                value={newCategory.slug}
                onChange={(e) => setNewCategory(prev => ({ ...prev, slug: e.target.value }))}
              />
            </div>
            <Button onClick={handleCreateCategory} disabled={createCategory.isPending}>
              {createCategory.isPending ? 'Oluşturuluyor...' : 'Kategori Ekle'}
            </Button>
          </div>

          {/* Existing categories */}
          {categories.map((category) => (
            <div key={category.id} className="grid grid-cols-3 gap-2 items-center border p-2 rounded">
              <Input
                value={category.name}
                onChange={(e) => handleUpdateCategory(category.id, { name: e.target.value })}
              />
              <Input
                value={category.slug}
                onChange={(e) => handleUpdateCategory(category.id, { slug: e.target.value })}
              />
              <div className="text-sm text-gray-500">
                ID: {category.id.slice(0, 8)}...
              </div>
            </div>
          ))}
        </CardContent>
      </Card>

      {/* Menu Items Section */}
      <Card>
        <CardHeader>
          <CardTitle>Menü Ürünleri</CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          {/* Add new menu item */}
          <div className="border p-4 rounded-lg bg-gray-50">
            <h3 className="font-semibold mb-2">Yeni Ürün Ekle</h3>
            <div className="grid grid-cols-2 gap-2 mb-2">
              <Input
                placeholder="Ürün adı"
                value={newMenuItem.name}
                onChange={(e) => setNewMenuItem(prev => ({ ...prev, name: e.target.value }))}
              />
              <select
                className="px-3 py-2 border rounded-md"
                value={newMenuItem.category_id}
                onChange={(e) => setNewMenuItem(prev => ({ ...prev, category_id: e.target.value }))}
              >
                <option value="">Kategori seçin</option>
                {categories.map(cat => (
                  <option key={cat.id} value={cat.id}>{cat.name}</option>
                ))}
              </select>
            </div>
            <div className="grid grid-cols-2 gap-2 mb-2">
              <Input
                placeholder="Fiyat"
                type="number"
                step="0.01"
                value={newMenuItem.price}
                onChange={(e) => setNewMenuItem(prev => ({ ...prev, price: e.target.value }))}
              />
              <Input
                placeholder="Resim URL"
                value={newMenuItem.image_url}
                onChange={(e) => setNewMenuItem(prev => ({ ...prev, image_url: e.target.value }))}
              />
            </div>
            <Textarea
              placeholder="Açıklama"
              value={newMenuItem.description}
              onChange={(e) => setNewMenuItem(prev => ({ ...prev, description: e.target.value }))}
              className="mb-2"
            />
            <Button onClick={handleCreateMenuItem} disabled={createMenuItem.isPending}>
              {createMenuItem.isPending ? 'Oluşturuluyor...' : 'Ürün Ekle'}
            </Button>
          </div>

          {/* Existing menu items */}
          <div className="space-y-2">
            {categories.map(category => {
              const categoryItems = menuItems.filter((item: any) => item.category_id === category.id);
              if (categoryItems.length === 0) return null;

              return (
                <div key={category.id}>
                  <h3 className="font-semibold text-lg mb-2">{category.name}</h3>
                  {categoryItems.map((item: any) => (
                    <div key={item.id} className="grid grid-cols-4 gap-2 items-center border p-2 rounded">
                      <Input
                        value={item.name}
                        onChange={(e) => handleUpdateMenuItem(item.id, { name: e.target.value })}
                      />
                      <Input
                        type="number"
                        step="0.01"
                        value={item.price || ''}
                        onChange={(e) => handleUpdateMenuItem(item.id, { price: parseFloat(e.target.value) || null })}
                      />
                      <Input
                        value={item.image_url || ''}
                        onChange={(e) => handleUpdateMenuItem(item.id, { image_url: e.target.value })}
                      />
                      <div className="text-sm text-gray-500">
                        ID: {item.id.slice(0, 8)}...
                      </div>
                    </div>
                  ))}
                </div>
              );
            })}
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default AdminPage;
