-- Add size_prices column to menu_items table
ALTER TABLE menu_items ADD COLUMN size_prices JSONB;

-- Update existing items to use the new structure
-- Convert existing price to medium size
UPDATE menu_items 
SET size_prices = jsonb_build_object(
  'medium', price
)
WHERE price IS NOT NULL;

-- Set default size structure for items without price
UPDATE menu_items 
SET size_prices = jsonb_build_object(
  'medium', null
)
WHERE price IS NULL; 