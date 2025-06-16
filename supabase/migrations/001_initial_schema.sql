-- Enable RLS (Row Level Security)
ALTER DATABASE postgres SET "app.jwt_secret" TO 'your-jwt-secret';

-- Create categories table
CREATE TABLE IF NOT EXISTS categories (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  name VARCHAR(100) NOT NULL UNIQUE,
  display_order INTEGER DEFAULT 0,
  is_active BOOLEAN DEFAULT true,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Create menu_items table
CREATE TABLE IF NOT EXISTS menu_items (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  category_id UUID REFERENCES categories(id) ON DELETE CASCADE,
  name VARCHAR(200) NOT NULL,
  description TEXT,
  price DECIMAL(10,2),
  image_url TEXT,
  display_order INTEGER DEFAULT 0,
  is_active BOOLEAN DEFAULT true,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Create indexes for better performance
CREATE INDEX IF NOT EXISTS idx_categories_display_order ON categories(display_order);
CREATE INDEX IF NOT EXISTS idx_categories_is_active ON categories(is_active);
CREATE INDEX IF NOT EXISTS idx_menu_items_category_id ON menu_items(category_id);
CREATE INDEX IF NOT EXISTS idx_menu_items_display_order ON menu_items(display_order);
CREATE INDEX IF NOT EXISTS idx_menu_items_is_active ON menu_items(is_active);

-- Enable RLS on tables
ALTER TABLE categories ENABLE ROW LEVEL SECURITY;
ALTER TABLE menu_items ENABLE ROW LEVEL SECURITY;

-- Create policies for public read access
CREATE POLICY "Allow public read access on categories" ON categories
  FOR SELECT USING (true);

CREATE POLICY "Allow public read access on menu_items" ON menu_items
  FOR SELECT USING (true);

-- Insert initial categories
INSERT INTO categories (name, display_order) VALUES
  ('Klasikler', 1),
  ('Aromalı Kahveler', 2),
  ('Special''s', 3),
  ('Soğuk Kahveler', 4),
  ('Kahvesiz Sıcaklar', 5),
  ('Soğuk Kahvesizler', 6),
  ('Limonatalar', 7),
  ('Bubble Tea', 8),
  ('Artisan Çaylar', 9),
  ('Frozen', 10),
  ('Milkshake', 11),
  ('Yiyecekler', 12),
  ('Tatlılar', 13)
ON CONFLICT (name) DO NOTHING;

-- Insert sample menu items for each category
INSERT INTO menu_items (category_id, name, description, price, image_url, display_order) 
SELECT 
  c.id,
  CASE c.name
    WHEN 'Klasikler' THEN 'Türk Kahvesi'
    WHEN 'Aromalı Kahveler' THEN 'Vanilya Latte'
    WHEN 'Special''s' THEN 'Signature Blend'
    WHEN 'Soğuk Kahveler' THEN 'Iced Americano'
    WHEN 'Kahvesiz Sıcaklar' THEN 'Sıcak Çikolata'
    WHEN 'Soğuk Kahvesizler' THEN 'Limonata'
    WHEN 'Limonatalar' THEN 'Klasik Limonata'
    WHEN 'Bubble Tea' THEN 'Taro Bubble Tea'
    WHEN 'Artisan Çaylar' THEN 'Earl Grey'
    WHEN 'Frozen' THEN 'Frozen Latte'
    WHEN 'Milkshake' THEN 'Çikolata Milkshake'
    WHEN 'Yiyecekler' THEN 'Croissant'
    WHEN 'Tatlılar' THEN 'Cheesecake'
  END,
  CASE c.name
    WHEN 'Klasikler' THEN 'Geleneksel Türk kahvesi'
    WHEN 'Aromalı Kahveler' THEN 'Vanilya aromalı latte'
    WHEN 'Special''s' THEN 'Özel karışım kahve'
    WHEN 'Soğuk Kahveler' THEN 'Buzlu americano'
    WHEN 'Kahvesiz Sıcaklar' THEN 'Kremalı sıcak çikolata'
    WHEN 'Soğuk Kahvesizler' THEN 'Taze limonata'
    WHEN 'Limonatalar' THEN 'Taze sıkılmış limon'
    WHEN 'Bubble Tea' THEN 'Taro aromalı bubble tea'
    WHEN 'Artisan Çaylar' THEN 'Premium Earl Grey çayı'
    WHEN 'Frozen' THEN 'Buzlu latte'
    WHEN 'Milkshake' THEN 'Çikolata milkshake'
    WHEN 'Yiyecekler' THEN 'Tereyağlı croissant'
    WHEN 'Tatlılar' THEN 'New York cheesecake'
  END,
  CASE c.name
    WHEN 'Klasikler' THEN 25.00
    WHEN 'Aromalı Kahveler' THEN 35.00
    WHEN 'Special''s' THEN 45.00
    WHEN 'Soğuk Kahveler' THEN 30.00
    WHEN 'Kahvesiz Sıcaklar' THEN 28.00
    WHEN 'Soğuk Kahvesizler' THEN 22.00
    WHEN 'Limonatalar' THEN 20.00
    WHEN 'Bubble Tea' THEN 32.00
    WHEN 'Artisan Çaylar' THEN 18.00
    WHEN 'Frozen' THEN 38.00
    WHEN 'Milkshake' THEN 35.00
    WHEN 'Yiyecekler' THEN 15.00
    WHEN 'Tatlılar' THEN 40.00
  END,
  CASE c.name
    WHEN 'Klasikler' THEN 'https://images.unsplash.com/photo-1495474472287-4d71bcdd2085'
    WHEN 'Aromalı Kahveler' THEN 'https://images.unsplash.com/photo-1514432324607-a09d9b4aefdd'
    WHEN 'Special''s' THEN 'https://images.unsplash.com/photo-1461023058943-07fcbe16d735'
    WHEN 'Soğuk Kahveler' THEN 'https://images.unsplash.com/photo-1461023058943-07fcbe16d735'
    WHEN 'Kahvesiz Sıcaklar' THEN 'https://images.unsplash.com/photo-1571934811356-5cc061b6821f'
    WHEN 'Soğuk Kahvesizler' THEN 'https://images.unsplash.com/photo-1544145945-f90425340c7e'
    WHEN 'Limonatalar' THEN 'https://images.unsplash.com/photo-1621263764928-df1444c5e859'
    WHEN 'Bubble Tea' THEN 'https://images.unsplash.com/photo-1578662996442-48f60103fc96'
    WHEN 'Artisan Çaylar' THEN 'https://images.unsplash.com/photo-1597318181409-cf64e4940c78'
    WHEN 'Frozen' THEN 'https://images.unsplash.com/photo-1567206563064-6f60f40a2b57'
    WHEN 'Milkshake' THEN 'https://images.unsplash.com/photo-1572490122747-3968b75cc699'
    WHEN 'Yiyecekler' THEN 'https://images.unsplash.com/photo-1546069901-ba9599a7e63c'
    WHEN 'Tatlılar' THEN 'https://images.unsplash.com/photo-1567206563064-6f60f40a2b57'
  END,
  1
FROM categories c
WHERE NOT EXISTS (
  SELECT 1 FROM menu_items mi WHERE mi.category_id = c.id
); 