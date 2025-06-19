
import React, { useState } from 'react';
import { Save, RotateCcw, Palette } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';

interface ColorSettings {
  primary: string;
  secondary: string;
  light: string;
  dark: string;
}

const defaultColors: ColorSettings = {
  primary: '#E54460',
  secondary: '#242729',
  light: '#F8E7EA',
  dark: '#1A1C1E'
};

export const ColorManager: React.FC = () => {
  const [colors, setColors] = useState<ColorSettings>(defaultColors);
  const [previewMode, setPreviewMode] = useState(false);

  const handleColorChange = (colorKey: keyof ColorSettings, value: string) => {
    setColors({ ...colors, [colorKey]: value });
  };

  const handleReset = () => {
    setColors(defaultColors);
  };

  const handleSave = () => {
    // Burada normalde Tailwind config'ini güncelleyecek API çağrısı yapılacak
    console.log('Saving colors:', colors);
    alert('Renkler kaydedildi! Değişikliklerin görünmesi için sayfayı yenileyin.');
  };

  const applyPreview = () => {
    if (previewMode) {
      // Reset to default
      document.documentElement.style.removeProperty('--brand-primary');
      document.documentElement.style.removeProperty('--brand-secondary');
      document.documentElement.style.removeProperty('--brand-light');
      document.documentElement.style.removeProperty('--brand-dark');
    } else {
      // Apply preview colors
      document.documentElement.style.setProperty('--brand-primary', colors.primary);
      document.documentElement.style.setProperty('--brand-secondary', colors.secondary);
      document.documentElement.style.setProperty('--brand-light', colors.light);
      document.documentElement.style.setProperty('--brand-dark', colors.dark);
    }
    setPreviewMode(!previewMode);
  };

  const colorItems = [
    { key: 'primary' as keyof ColorSettings, label: 'Ana Renk (Primary)', description: 'Butonlar, vurgular için kullanılır' },
    { key: 'secondary' as keyof ColorSettings, label: 'İkincil Renk (Secondary)', description: 'Arka plan ve kartlar için kullanılır' },
    { key: 'light' as keyof ColorSettings, label: 'Açık Renk (Light)', description: 'Yazılar ve kenarlıklar için kullanılır' },
    { key: 'dark' as keyof ColorSettings, label: 'Koyu Renk (Dark)', description: 'Koyu arka planlar için kullanılır' }
  ];

  return (
    <div className="p-6">
      <div className="flex items-center justify-between mb-6">
        <div className="flex items-center space-x-3">
          <Palette className="text-brand-primary" size={24} />
          <h2 className="text-2xl font-bold text-brand-light">Renk Yönetimi</h2>
        </div>
        <div className="flex space-x-2">
          <Button
            onClick={applyPreview}
            variant="outline"
            className="border-brand-primary/30 text-brand-primary hover:bg-brand-primary/10"
          >
            {previewMode ? 'Önizlemeyi Kapat' : 'Önizleme'}
          </Button>
          <Button
            onClick={handleReset}
            variant="outline"
            className="border-brand-light/20 text-brand-light hover:bg-brand-light/10"
          >
            <RotateCcw size={16} className="mr-2" />
            Sıfırla
          </Button>
          <Button
            onClick={handleSave}
            className="bg-gradient-to-r from-brand-primary to-brand-primary/80 hover:from-brand-primary/90 hover:to-brand-primary/70"
          >
            <Save size={16} className="mr-2" />
            Kaydet
          </Button>
        </div>
      </div>

      {previewMode && (
        <div className="mb-6 p-4 bg-yellow-500/20 border border-yellow-500/30 rounded-lg">
          <p className="text-yellow-200 text-sm font-medium">
            ⚠️ Önizleme modu aktif. Değişiklikleri görmek için sayfayı gezin. Kalıcı hale getirmek için "Kaydet" butonuna basın.
          </p>
        </div>
      )}

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {colorItems.map((item) => (
          <Card key={item.key} className="border-brand-light/20 bg-gradient-to-br from-brand-secondary/80 to-brand-dark/80 backdrop-blur-sm">
            <CardHeader>
              <CardTitle className="text-brand-light text-lg">{item.label}</CardTitle>
              <p className="text-brand-light/60 text-sm">{item.description}</p>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="flex items-center space-x-4">
                <div
                  className="w-16 h-16 rounded-lg border-2 border-brand-light/20 shadow-lg"
                  style={{ backgroundColor: colors[item.key] }}
                />
                <div className="flex-1">
                  <label className="block text-sm font-medium text-brand-light/80 mb-2">
                    Hex Kodu
                  </label>
                  <Input
                    type="text"
                    value={colors[item.key]}
                    onChange={(e) => handleColorChange(item.key, e.target.value)}
                    placeholder="#000000"
                    className="bg-brand-light/10 border-brand-light/20 text-brand-light font-mono"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-brand-light/80 mb-2">
                    Renk Seçici
                  </label>
                  <input
                    type="color"
                    value={colors[item.key]}
                    onChange={(e) => handleColorChange(item.key, e.target.value)}
                    className="w-12 h-10 rounded border-2 border-brand-light/20 cursor-pointer"
                  />
                </div>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>

      {/* Color Palette Preview */}
      <Card className="mt-8 border-brand-light/20 bg-gradient-to-br from-brand-secondary/80 to-brand-dark/80 backdrop-blur-sm">
        <CardHeader>
          <CardTitle className="text-brand-light">Renk Paleti Önizlemesi</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            {colorItems.map((item) => (
              <div key={item.key} className="text-center">
                <div
                  className="w-full h-20 rounded-lg shadow-lg mb-2"
                  style={{ backgroundColor: colors[item.key] }}
                />
                <p className="text-sm font-medium text-brand-light">{item.label}</p>
                <p className="text-xs text-brand-light/60 font-mono">{colors[item.key]}</p>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>
    </div>
  );
};
