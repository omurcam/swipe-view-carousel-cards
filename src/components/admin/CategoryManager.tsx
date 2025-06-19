
import React, { useState } from 'react';
import { Plus, Edit, Trash2, Save, X, Loader2 } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { useCategories, Category } from '@/hooks/useAdminData';
import { useToast } from '@/hooks/use-toast';

export const CategoryManager: React.FC = () => {
  const { categories, loading, createCategory, updateCategory, deleteCategory } = useCategories();
  const { toast } = useToast();
  const [editingId, setEditingId] = useState<string | null>(null);
  const [showAddForm, setShowAddForm] = useState(false);
  const [formData, setFormData] = useState<Partial<Category>>({});
  const [saving, setSaving] = useState(false);

  const handleEdit = (category: Category) => {
    setEditingId(category.id);
    setFormData(category);
  };

  const handleSave = async () => {
    if (!formData.name?.trim()) {
      toast({
        title: "Hata",
        description: "Kategori adı gereklidir",
        variant: "destructive"
      });
      return;
    }

    setSaving(true);
    try {
      if (editingId) {
        await updateCategory(editingId, formData);
        toast({
          title: "Başarılı",
          description: "Kategori güncellendi"
        });
        setEditingId(null);
      } else {
        const newCategory = {
          name: formData.name,
          display_order: formData.display_order || categories.length + 1,
          is_active: formData.is_active ?? true
        };
        await createCategory(newCategory);
        toast({
          title: "Başarılı",
          description: "Kategori eklendi"
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
    if (!window.confirm('Bu kategoriyi silmek istediğinizden emin misiniz?')) {
      return;
    }

    try {
      await deleteCategory(id);
      toast({
        title: "Başarılı",
        description: "Kategori silindi"
      });
    } catch (error) {
      toast({
        title: "Hata",
        description: "Kategori silinirken hata oluştu",
        variant: "destructive"
      });
    }
  };

  const handleCancel = () => {
    setEditingId(null);
    setShowAddForm(false);
    setFormData({});
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
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
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
                  Sıralama
                </label>
                <Input
                  type="number"
                  value={formData.display_order || ''}
                  onChange={(e) => setFormData({ ...formData, display_order: Number(e.target.value) })}
                  placeholder="1"
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
                    type="number"
                    value={formData.display_order || ''}
                    onChange={(e) => setFormData({ ...formData, display_order: Number(e.target.value) })}
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
                  <div className="mb-4">
                    <h3 className="font-semibold text-brand-light">{category.name}</h3>
                    <div className="flex items-center justify-between mt-2">
                      <span className="text-xs text-brand-light/50">Sıra: {category.display_order}</span>
                      <span className={`text-xs px-2 py-1 rounded ${category.is_active ? 'bg-green-500/20 text-green-400' : 'bg-red-500/20 text-red-400'}`}>
                        {category.is_active ? 'Aktif' : 'Pasif'}
                      </span>
                    </div>
                  </div>
                  <div className="flex justify-end space-x-1">
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
                </>
              )}
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  );
};
