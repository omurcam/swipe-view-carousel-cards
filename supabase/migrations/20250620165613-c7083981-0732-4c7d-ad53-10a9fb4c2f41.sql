
-- Create categories table
CREATE TABLE IF NOT EXISTS categories (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  name VARCHAR(100) NOT NULL UNIQUE,
  slug VARCHAR(100) NOT NULL UNIQUE,
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
CREATE INDEX IF NOT EXISTS idx_categories_slug ON categories(slug);
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

-- Insert initial categories with slugs
INSERT INTO categories (name, slug, display_order) VALUES
  ('Klasikler', 'klasikler', 1),
  ('Aromalı Kahveler', 'aromali-kahveler', 2),
  ('Special''s', 'specials', 3),
  ('Soğuk İçecekler', 'soguk-icecekler', 4),
  ('Sıcak İçecekler', 'sicak-icecekler', 5),
  ('Milkshake & Frozen', 'milkshake-frozen', 6),
  ('Yiyecekler', 'yiyecekler', 7),
  ('Tatlılar', 'tatlilar', 8)
ON CONFLICT (name) DO NOTHING;

-- Insert sample menu items for each category
INSERT INTO menu_items (category_id, name, description, price, image_url, display_order) 
SELECT 
  c.id,
  CASE c.slug
    WHEN 'klasikler' THEN 'Türk Kahvesi'
    WHEN 'aromali-kahveler' THEN 'Vanilya Latte'
    WHEN 'specials' THEN 'Signature Blend'
    WHEN 'soguk-icecekler' THEN 'Iced Americano'
    WHEN 'sicak-icecekler' THEN 'Sıcak Çikolata'
    WHEN 'milkshake-frozen' THEN 'Çikolata Milkshake'
    WHEN 'yiyecekler' THEN 'Croissant'
    WHEN 'tatlilar' THEN 'Cheesecake'
  END,
  CASE c.slug
    WHEN 'klasikler' THEN 'Geleneksel Türk kahvesi'
    WHEN 'aromali-kahveler' THEN 'Vanilya aromalı latte'
    WHEN 'specials' THEN 'Özel karışım kahve'
    WHEN 'soguk-icecekler' THEN 'Buzlu americano'
    WHEN 'sicak-icecekler' THEN 'Kremalı sıcak çikolata'
    WHEN 'milkshake-frozen' THEN 'Çikolata milkshake'
    WHEN 'yiyecekler' THEN 'Tereyağlı croissant'
    WHEN 'tatlilar' THEN 'New York cheesecake'
  END,
  CASE c.slug
    WHEN 'klasikler' THEN 25.00
    WHEN 'aromali-kahveler' THEN 35.00
    WHEN 'specials' THEN 45.00
    WHEN 'soguk-icecekler' THEN 30.00
    WHEN 'sicak-icecekler' THEN 28.00
    WHEN 'milkshake-frozen' THEN 35.00
    WHEN 'yiyecekler' THEN 15.00
    WHEN 'tatlilar' THEN 40.00
  END,
  CASE c.slug
    WHEN 'klasikler' THEN 'https://images.unsplash.com/photo-1495474472287-4d71bcdd2085'
    WHEN 'aromali-kahveler' THEN 'https://images.unsplash.com/photo-1514432324607-a09d9b4aefdd'
    WHEN 'specials' THEN 'https://images.unsplash.com/photo-1461023058943-07fcbe16d735'
    WHEN 'soguk-icecekler' THEN 'https://images.unsplash.com/photo-1544145945-f90425340c7e'
    WHEN 'sicak-icecekler' THEN 'https://images.unsplash.com/photo-1571934811356-5cc061b6821f'
    WHEN 'milkshake-frozen' THEN 'https://images.unsplash.com/photo-1572490122747-3968b75cc699'
    WHEN 'yiyecekler' THEN 'https://images.unsplash.com/photo-1546069901-ba9599a7e63c'
    WHEN 'tatlilar' THEN 'https://images.unsplash.com/photo-1567206563064-6f60f40a2b57'
  END,
  1
FROM categories c
WHERE NOT EXISTS (
  SELECT 1 FROM menu_items mi WHERE mi.category_id = c.id
);
