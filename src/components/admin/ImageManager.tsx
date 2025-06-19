
import React, { useState } from 'react';
import { Upload, Trash2, Copy, ExternalLink, Search } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';

interface ImageItem {
  id: string;
  url: string;
  name: string;
  category: string;
  size?: string;
}

// Mock image data
const initialImages: ImageItem[] = [
  {
    id: '1',
    url: 'https://images.unsplash.com/photo-1495474472287-4d71bcdd2085',
    name: 'Türk Kahvesi',
    category: 'Kahveler',
    size: '640x428'
  },
  {
    id: '2',
    url: 'https://images.unsplash.com/photo-1514432324607-a09d9b4aefdd',
    name: 'Vanilya Latte',
    category: 'Kahveler',
    size: '640x960'
  },
  {
    id: '3',
    url: 'https://images.unsplash.com/photo-1461023058943-07fcbe16d735',
    name: 'Signature Blend',
    category: 'Kahveler',
    size: '640x427'
  },
  {
    id: '4',
    url: 'https://images.unsplash.com/photo-1571934811356-5cc061b6821f',
    name: 'Sıcak Çikolata',
    category: 'Sıcaklar',
    size: '640x960'
  },
  {
    id: '5',
    url: 'https://images.unsplash.com/photo-1544145945-f90425340c7e',
    name: 'Limonata',
    category: 'Soğuklar',
    size: '640x960'
  }
];

const categories = ['Tümü', 'Kahveler', 'Sıcaklar', 'Soğuklar', 'Tatlılar', 'Yiyecekler'];

export const ImageManager: React.FC = () => {
  const [images, setImages] = useState<ImageItem[]>(initialImages);
  const [selectedCategory, setSelectedCategory] = useState('Tümü');
  const [searchTerm, setSearchTerm] = useState('');
  const [newImageUrl, setNewImageUrl] = useState('');
  const [newImageName, setNewImageName] = useState('');
  const [newImageCategory, setNewImageCategory] = useState('Kahveler');

  const filteredImages = images.filter(image => {
    const matchesCategory = selectedCategory === 'Tümü' || image.category === selectedCategory;
    const matchesSearch = image.name.toLowerCase().includes(searchTerm.toLowerCase());
    return matchesCategory && matchesSearch;
  });

  const handleAddImage = () => {
    if (newImageUrl && newImageName) {
      const newImage: ImageItem = {
        id: Date.now().toString(),
        url: newImageUrl,
        name: newImageName,
        category: newImageCategory
      };
      setImages([...images, newImage]);
      setNewImageUrl('');
      setNewImageName('');
    }
  };

  const handleDeleteImage = (id: string) => {
    setImages(images.filter(img => img.id !== id));
  };

  const handleCopyUrl = (url: string) => {
    navigator.clipboard.writeText(url);
    alert('URL kopyalandı!');
  };

  return (
    <div className="p-6">
      <div className="flex items-center justify-between mb-6">
        <h2 className="text-2xl font-bold text-brand-light">Görsel Yönetimi</h2>
        <div className="flex items-center space-x-2">
          <span className="text-brand-light/60 text-sm">
            {filteredImages.length} görsel
          </span>
        </div>
      </div>

      {/* Add New Image Form */}
      <Card className="mb-6 border-brand-primary/30 bg-gradient-to-r from-brand-primary/10 to-transparent">
        <CardHeader>
          <CardTitle className="text-brand-light">Yeni Görsel Ekle</CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <div>
              <label className="block text-sm font-medium text-brand-light/80 mb-2">
                Görsel URL
              </label>
              <Input
                value={newImageUrl}
                onChange={(e) => setNewImageUrl(e.target.value)}
                placeholder="https://images.unsplash.com/..."
                className="bg-brand-light/10 border-brand-light/20 text-brand-light"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-brand-light/80 mb-2">
                Görsel Adı
              </label>
              <Input
                value={newImageName}
                onChange={(e) => setNewImageName(e.target.value)}
                placeholder="Görsel adı"
                className="bg-brand-light/10 border-brand-light/20 text-brand-light"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-brand-light/80 mb-2">
                Kategori
              </label>
              <select
                value={newImageCategory}
                onChange={(e) => setNewImageCategory(e.target.value)}
                className="w-full p-2 rounded-md bg-brand-light/10 border border-brand-light/20 text-brand-light"
              >
                {categories.filter(cat => cat !== 'Tümü').map((cat) => (
                  <option key={cat} value={cat} className="bg-brand-dark text-brand-light">
                    {cat}
                  </option>
                ))}
              </select>
            </div>
          </div>
          <Button
            onClick={handleAddImage}
            className="bg-gradient-to-r from-brand-primary to-brand-primary/80 hover:from-brand-primary/90 hover:to-brand-primary/70"
          >
            <Upload size={16} className="mr-2" />
            Görsel Ekle
          </Button>
        </CardContent>
      </Card>

      {/* Search and Filter */}
      <div className="flex flex-col sm:flex-row gap-4 mb-6">
        <div className="flex-1">
          <div className="relative">
            <Search size={18} className="absolute left-3 top-1/2 transform -translate-y-1/2 text-brand-light/50" />
            <Input
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              placeholder="Görsel ara..."
              className="bg-brand-light/10 border-brand-light/20 text-brand-light pl-10"
            />
          </div>
        </div>
        <div className="flex flex-wrap gap-2">
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

      {/* Images Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
        {filteredImages.map((image) => (
          <Card key={image.id} className="border-brand-light/20 bg-gradient-to-br from-brand-secondary/80 to-brand-dark/80 backdrop-blur-sm overflow-hidden group">
            <div className="aspect-square relative overflow-hidden">
              <img
                src={image.url}
                alt={image.name}
                className="w-full h-full object-cover transition-transform duration-300 group-hover:scale-110"
              />
              <div className="absolute inset-0 bg-black/50 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-center justify-center">
                <div className="flex space-x-2">
                  <Button
                    onClick={() => handleCopyUrl(image.url)}
                    size="sm"
                    className="bg-white/20 hover:bg-white/30 text-white border-white/20"
                  >
                    <Copy size={14} />
                  </Button>
                  <Button
                    onClick={() => window.open(image.url, '_blank')}
                    size="sm"
                    className="bg-white/20 hover:bg-white/30 text-white border-white/20"
                  >
                    <ExternalLink size={14} />
                  </Button>
                  <Button
                    onClick={() => handleDeleteImage(image.id)}
                    size="sm"
                    className="bg-red-500/70 hover:bg-red-600 text-white"
                  >
                    <Trash2 size={14} />
                  </Button>
                </div>
              </div>
            </div>
            <CardContent className="p-3">
              <h3 className="font-medium text-brand-light text-sm truncate">{image.name}</h3>
              <div className="flex items-center justify-between mt-2">
                <span className="text-xs text-brand-primary font-medium">{image.category}</span>
                {image.size && (
                  <span className="text-xs text-brand-light/50">{image.size}</span>
                )}
              </div>
            </CardContent>
          </Card>
        ))}
      </div>

      {filteredImages.length === 0 && (
        <div className="text-center py-12">
          <div className="text-brand-light/50 text-lg">Görsel bulunamadı</div>
          <p className="text-brand-light/30 text-sm mt-2">
            Arama kriterlerinizi değiştirin veya yeni görsel ekleyin
          </p>
        </div>
      )}
    </div>
  );
};
