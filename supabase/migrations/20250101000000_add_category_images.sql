-- Add image_url column to categories table
ALTER TABLE categories ADD COLUMN image_url TEXT;

-- Update existing categories with default images
UPDATE categories SET image_url = 'https://images.unsplash.com/photo-1447933601403-0c6688de566e?q=80&w=1000' WHERE slug = 'klasikler';
UPDATE categories SET image_url = 'https://images.unsplash.com/photo-1442512595331-e89e73853f31?q=80&w=1000' WHERE slug = 'aromali-kahveler';
UPDATE categories SET image_url = 'https://images.unsplash.com/photo-1509042239860-f550ce710b93?q=80&w=1000' WHERE slug = 'specials';
UPDATE categories SET image_url = 'https://images.unsplash.com/photo-1544145945-f90425340c7e?q=80&w=1000' WHERE slug = 'soguk-icecekler';
UPDATE categories SET image_url = 'https://images.unsplash.com/photo-1571091718767-18b5b1457add?q=80&w=1000' WHERE slug = 'sicak-icecekler';
UPDATE categories SET image_url = 'https://images.unsplash.com/photo-1572490122747-3968b75cc699?q=80&w=1000' WHERE slug = 'milkshake-frozen';
UPDATE categories SET image_url = 'https://images.unsplash.com/photo-1565299624946-b28f40a0ca4b?q=80&w=1000' WHERE slug = 'yiyecekler';
UPDATE categories SET image_url = 'https://images.unsplash.com/photo-1551024506-0bccd828d307?q=80&w=1000' WHERE slug = 'tatlilar'; 