
-- Admin kullanıcıları için categories tablosuna yazma izni ver
CREATE POLICY "Allow admin insert on categories" ON categories
  FOR INSERT WITH CHECK (true);

CREATE POLICY "Allow admin update on categories" ON categories
  FOR UPDATE USING (true);

CREATE POLICY "Allow admin delete on categories" ON categories
  FOR DELETE USING (true);

-- Admin kullanıcıları için menu_items tablosuna yazma izni ver
CREATE POLICY "Allow admin insert on menu_items" ON menu_items
  FOR INSERT WITH CHECK (true);

CREATE POLICY "Allow admin update on menu_items" ON menu_items
  FOR UPDATE USING (true);

CREATE POLICY "Allow admin delete on menu_items" ON menu_items
  FOR DELETE USING (true);
