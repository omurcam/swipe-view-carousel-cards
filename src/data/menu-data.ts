export const tempCategories = [
  { id: '1', name: 'Klasikler', slug: 'klasikler', display_order: 1, is_active: true, created_at: '', updated_at: '' },
  { id: '2', name: 'Aromalı Kahveler', slug: 'aromali-kahveler', display_order: 2, is_active: true, created_at: '', updated_at: '' },
  { id: '3', name: 'Special\'s', slug: 'specials', display_order: 3, is_active: true, created_at: '', updated_at: '' },
  { id: '4', name: 'Soğuk İçecekler', slug: 'soguk-icecekler', display_order: 4, is_active: true, created_at: '', updated_at: '' },
  { id: '5', name: 'Sıcak İçecekler', slug: 'sicak-icecekler', display_order: 5, is_active: true, created_at: '', updated_at: '' },
  { id: '6', name: 'Milkshake & Frozen', slug: 'milkshake-frozen', display_order: 6, is_active: true, created_at: '', updated_at: '' },
  { id: '7', name: 'Yiyecekler', slug: 'yiyecekler', display_order: 7, is_active: true, created_at: '', updated_at: '' },
  { id: '8', name: 'Tatlılar', slug: 'tatlilar', display_order: 8, is_active: true, created_at: '', updated_at: '' }
];

// Gerçek menü verileri
export const menuData = {
  '1': [ // Klasikler
    { name: 'Espresso', price: 'Orta: 80₺, Büyük: 95₺', image: 'mo.png' },
    { name: 'Double Espresso', price: '100₺', image: 'https://images.unsplash.com/photo-1509042239860-f550ce710b93?fm=webp&w=400&h=600&fit=crop&q=80' },
    { name: 'Americano', price: 'Orta: 140₺, Büyük: 155₺', image: 'https://images.unsplash.com/photo-1447933601403-0c6688de566e?fm=webp&w=400&h=600&fit=crop&q=80' },
    { name: 'Filtre Kahve', price: 'Orta: 135₺, Büyük: 150₺', image: 'https://images.unsplash.com/photo-1497636577773-f1231844b336?fm=webp&w=400&h=600&fit=crop&q=80' },
    { name: 'Sütlü Filtre Kahve', price: 'Orta: 140₺, Büyük: 155₺', image: 'https://images.unsplash.com/photo-1559056199-641a0ac8b55e?fm=webp&w=400&h=600&fit=crop&q=80' },
    { name: 'Caffe Latte', price: 'Orta: 150₺, Büyük: 165₺', image: 'https://images.unsplash.com/photo-1514432324607-a09d9b4aefdd?fm=webp&w=400&h=600&fit=crop&q=80' },
    { name: 'Flat White', price: 'Orta: 150₺, Büyük: 165₺', image: 'https://images.unsplash.com/photo-1572442388796-11668a67e53d?fm=webp&w=400&h=600&fit=crop&q=80' },
    { name: 'Cortado', price: 'Orta: 150₺, Büyük: 165₺', image: 'https://images.unsplash.com/photo-1545665225-b23b99e4d45e?fm=webp&w=400&h=600&fit=crop&q=80' },
    { name: 'Türk Kahvesi', price: '80₺', image: 'https://images.unsplash.com/photo-1578985545062-69928b1d9587?fm=webp&w=400&h=600&fit=crop&q=80' },
    { name: 'Double Türk Kahvesi', price: '100₺', image: 'https://images.unsplash.com/photo-1571115764595-644a1f56a55c?fm=webp&w=400&h=600&fit=crop&q=80' }
  ],
  '2': [ // Aromalı Kahveler
    { name: 'White Mocha', price: 'Orta: 160₺, Büyük: 175₺', image: 'https://images.unsplash.com/photo-1461023058943-07fcbe16d735?fm=webp&w=400&h=600&fit=crop&q=80' },
    { name: 'Chocolate Mocha', price: 'Orta: 160₺, Büyük: 175₺', image: 'https://images.unsplash.com/photo-1578662996442-48f60103fc96?fm=webp&w=400&h=600&fit=crop&q=80' },
    { name: 'Caramel Macchiato', price: 'Orta: 165₺, Büyük: 180₺', image: 'https://images.unsplash.com/photo-1570968915860-54d5c301fa9f?fm=webp&w=400&h=600&fit=crop&q=80' },
    { name: 'Salted Caramel Latte', price: 'Orta: 165₺, Büyük: 180₺', image: 'https://images.unsplash.com/photo-1541167760496-1628856ab772?fm=webp&w=400&h=600&fit=crop&q=80' },
    { name: 'Toffee Nut Latte', price: 'Orta: 165₺, Büyük: 180₺', image: 'https://images.unsplash.com/photo-1544787219-7f47ccb76574?fm=webp&w=400&h=600&fit=crop&q=80' },
    { name: 'Pumpkin Spice Latte', price: 'Orta: 160₺, Büyük: 175₺', image: 'https://images.unsplash.com/photo-1572490122747-3968b75cc699?fm=webp&w=400&h=600&fit=crop&q=80' },
    { name: 'Vanilla Latte', price: 'Orta: 160₺, Büyük: 175₺', image: 'https://images.unsplash.com/photo-1461023058943-07fcbe16d735?fm=webp&w=400&h=600&fit=crop&q=80' },
    { name: 'Caramel Latte', price: 'Orta: 160₺, Büyük: 175₺', image: 'https://images.unsplash.com/photo-1578662996442-48f60103fc96?fm=webp&w=400&h=600&fit=crop&q=80' },
    { name: 'Cookie Latte', price: 'Orta: 160₺, Büyük: 175₺', image: 'https://images.unsplash.com/photo-1570968915860-54d5c301fa9f?fm=webp&w=400&h=600&fit=crop&q=80' },
    { name: 'Irish Latte', price: 'Orta: 160₺, Büyük: 175₺', image: 'https://images.unsplash.com/photo-1541167760496-1628856ab772?fm=webp&w=400&h=600&fit=crop&q=80' },
    { name: 'Coconut Latte', price: 'Orta: 160₺, Büyük: 175₺', image: 'https://images.unsplash.com/photo-1544787219-7f47ccb76574?fm=webp&w=400&h=600&fit=crop&q=80' }
  ],
  '3': [ // Special's
    { name: 'Ying Yang Mocha', price: 'Orta: 180₺, Büyük: 200₺', image: 'https://images.unsplash.com/photo-1461023058943-07fcbe16d735?fm=webp&w=400&h=600&fit=crop&q=80' },
    { name: 'Cheesecake Latte', price: 'Orta: 180₺, Büyük: 200₺', image: 'https://images.unsplash.com/photo-1578662996442-48f60103fc96?fm=webp&w=400&h=600&fit=crop&q=80' },
    { name: 'Rosberry White Mocha', price: 'Orta: 180₺, Büyük: 200₺', image: 'https://images.unsplash.com/photo-1570968915860-54d5c301fa9f?fm=webp&w=400&h=600&fit=crop&q=80' },
    { name: 'Mocha Menta', price: 'Orta: 180₺, Büyük: 200₺', image: 'https://images.unsplash.com/photo-1541167760496-1628856ab772?fm=webp&w=400&h=600&fit=crop&q=80' },
    { name: 'Lotus Latte', price: 'Orta: 180₺, Büyük: 200₺', image: 'https://images.unsplash.com/photo-1544787219-7f47ccb76574?fm=webp&w=400&h=600&fit=crop&q=80' },
    { name: 'Cookie Mocha', price: 'Orta: 180₺, Büyük: 200₺', image: 'https://images.unsplash.com/photo-1572490122747-3968b75cc699?fm=webp&w=400&h=600&fit=crop&q=80' },
    { name: 'Cookie Nut Latte', price: 'Orta: 180₺, Büyük: 200₺', image: 'https://images.unsplash.com/photo-1461023058943-07fcbe16d735?fm=webp&w=400&h=600&fit=crop&q=80' },
    { name: 'White Nut Mocha', price: 'Orta: 180₺, Büyük: 200₺', image: 'https://images.unsplash.com/photo-1578662996442-48f60103fc96?fm=webp&w=400&h=600&fit=crop&q=80' }
  ],
  '4': [ // Soğuk İçecekler
    { name: 'Ice Americano', price: '150₺', image: 'https://images.unsplash.com/photo-1517701604599-bb29b565090c?fm=webp&w=400&h=600&fit=crop&q=80' },
    { name: 'Ice Filtre Kahve', price: '130₺', image: 'https://images.unsplash.com/photo-1461023058943-07fcbe16d735?fm=webp&w=400&h=600&fit=crop&q=80' },
    { name: 'Ice Latte', price: '150₺', image: 'https://images.unsplash.com/photo-1578662996442-48f60103fc96?fm=webp&w=400&h=600&fit=crop&q=80' },
    { name: 'Ice Vanilla Latte', price: '180₺', image: 'https://images.unsplash.com/photo-1572442388796-11668a67e53d?fm=webp&w=400&h=600&fit=crop&q=80' },
    { name: 'Ice Caramel Latte', price: '180₺', image: 'https://images.unsplash.com/photo-1570968915860-54d5c301fa9f?fm=webp&w=400&h=600&fit=crop&q=80' },
    { name: 'Frappe', price: '180₺', image: 'https://images.unsplash.com/photo-1541167760496-1628856ab772?fm=webp&w=400&h=600&fit=crop&q=80' },
    { name: 'Freddo Cappucino', price: '150₺', image: 'https://images.unsplash.com/photo-1544787219-7f47ccb76574?fm=webp&w=400&h=600&fit=crop&q=80' },
    { name: 'Soğuk Çikolata', price: '140₺', image: 'https://images.unsplash.com/photo-1571091718767-18b5b1457add?fm=webp&w=400&h=600&fit=crop&q=80' },
    { name: 'Ice Tea', price: '120₺', image: 'https://images.unsplash.com/photo-1556679343-c7306c1976bc?fm=webp&w=400&h=600&fit=crop&q=80' },
    { name: 'Smoothie', price: '160₺', image: 'https://images.unsplash.com/photo-1505252585461-04db1eb84625?fm=webp&w=400&h=600&fit=crop&q=80' },
    { name: 'Klasik Limonata', price: '120₺', image: 'https://images.unsplash.com/photo-1621263764928-df1444c5e859?fm=webp&w=400&h=600&fit=crop&q=80' },
    { name: 'Nane Limonata', price: '130₺', image: 'https://images.unsplash.com/photo-1571091655789-405eb7a3a3a8?fm=webp&w=400&h=600&fit=crop&q=80' },
    { name: 'Çilek Limonata', price: '140₺', image: 'https://images.unsplash.com/photo-1544145945-f90425340c7e?fm=webp&w=400&h=600&fit=crop&q=80' },
    { name: 'Mango Limonata', price: '140₺', image: 'https://images.unsplash.com/photo-1506502725962-101f87887d5b?fm=webp&w=400&h=600&fit=crop&q=80' },
    { name: 'Taro Bubble Tea', price: '180₺', image: 'https://images.unsplash.com/photo-1571091655789-405eb7a3a3a8?fm=webp&w=400&h=600&fit=crop&q=80' },
    { name: 'Matcha Bubble Tea', price: '180₺', image: 'https://images.unsplash.com/photo-1544145945-f90425340c7e?fm=webp&w=400&h=600&fit=crop&q=80' },
    { name: 'Strawberry Bubble Tea', price: '180₺', image: 'https://images.unsplash.com/photo-1506502725962-101f87887d5b?fm=webp&w=400&h=600&fit=crop&q=80' },
    { name: 'Classic Bubble Tea', price: '170₺', image: 'https://images.unsplash.com/photo-1571091718767-18b5b1457add?fm=webp&w=400&h=600&fit=crop&q=80' }
  ],
  '5': [ // Sıcak İçecekler
    { name: 'Sıcak Çikolata', price: 'Orta: 140₺, Büyük: 155₺', image: 'https://images.unsplash.com/photo-1542990253-0b8be2f7f1b4?fm=webp&w=400&h=600&fit=crop&q=80' },
    { name: 'White Çikolata', price: 'Orta: 140₺, Büyük: 155₺', image: 'https://images.unsplash.com/photo-1571091718767-18b5b1457add?fm=webp&w=400&h=600&fit=crop&q=80' },
    { name: 'Chai Tea Latte', price: 'Orta: 140₺, Büyük: 155₺', image: 'https://images.unsplash.com/photo-1544787219-7f47ccb76574?fm=webp&w=400&h=600&fit=crop&q=80' },
    { name: 'Salep', price: 'Orta: 120₺, Büyük: 135₺', image: 'https://images.unsplash.com/photo-1572490122747-3968b75cc699?fm=webp&w=400&h=600&fit=crop&q=80' },
    { name: 'Earl Grey', price: '100₺', image: 'https://images.unsplash.com/photo-1544787219-7f47ccb76574?fm=webp&w=400&h=600&fit=crop&q=80' },
    { name: 'English Breakfast', price: '100₺', image: 'https://images.unsplash.com/photo-1572490122747-3968b75cc699?fm=webp&w=400&h=600&fit=crop&q=80' },
    { name: 'Green Tea', price: '100₺', image: 'https://images.unsplash.com/photo-1556679343-c7306c1976bc?fm=webp&w=400&h=600&fit=crop&q=80' },
    { name: 'Chamomile', price: '100₺', image: 'https://images.unsplash.com/photo-1571091655789-405eb7a3a3a8?fm=webp&w=400&h=600&fit=crop&q=80' }
  ],
  '6': [ // Milkshake & Frozen
    { name: 'Caramel Vanilla Milkshake', price: '190₺', image: 'https://images.unsplash.com/photo-1572490122747-3968b75cc699?fm=webp&w=400&h=600&fit=crop&q=80' },
    { name: 'Vanilla Milkshake', price: '170₺', image: 'https://images.unsplash.com/photo-1544145945-f90425340c7e?fm=webp&w=400&h=600&fit=crop&q=80' },
    { name: 'Chocolate Milkshake', price: '190₺', image: 'https://images.unsplash.com/photo-1571091718767-18b5b1457add?fm=webp&w=400&h=600&fit=crop&q=80' },
    { name: 'Strawberry Milkshake', price: '190₺', image: 'https://images.unsplash.com/photo-1506502725962-101f87887d5b?fm=webp&w=400&h=600&fit=crop&q=80' },
    { name: 'Frozen Latte', price: '180₺', image: 'https://images.unsplash.com/photo-1571091718767-18b5b1457add?fm=webp&w=400&h=600&fit=crop&q=80' },
    { name: 'Frozen Mocha', price: '190₺', image: 'https://images.unsplash.com/photo-1578662996442-48f60103fc96?fm=webp&w=400&h=600&fit=crop&q=80' },
    { name: 'Frozen Caramel', price: '190₺', image: 'https://images.unsplash.com/photo-1570968915860-54d5c301fa9f?fm=webp&w=400&h=600&fit=crop&q=80' }
  ],
  '7': [ // Yiyecekler
    { name: 'Cheddar Jambon Sandwich', price: '200₺', image: 'https://images.unsplash.com/photo-1546069901-ba9599a7e63c?fm=webp&w=400&h=600&fit=crop&q=80' },
    { name: 'Ayvalık Tostu', price: '300₺', image: 'https://images.unsplash.com/photo-1555939594-58d7cb561ad1?fm=webp&w=400&h=600&fit=crop&q=80' },
    { name: 'Hamburger', price: '300₺', image: 'https://images.unsplash.com/photo-1567620905732-2d1ec7ab7445?fm=webp&w=400&h=600&fit=crop&q=80' },
    { name: 'Double Burger', price: '450₺', image: 'https://images.unsplash.com/photo-1568901346375-23c9450c58cd?fm=webp&w=400&h=600&fit=crop&q=80' },
    { name: 'Tavuk Burger', price: '250₺', image: 'https://images.unsplash.com/photo-1550547660-d9450f859349?fm=webp&w=400&h=600&fit=crop&q=80' },
    { name: 'Patates Kızartması', price: '100₺', image: 'https://images.unsplash.com/photo-1586190848861-99aa4a171e90?fm=webp&w=400&h=600&fit=crop&q=80' }
  ],
  '8': [ // Tatlılar
    { name: 'Lotus Cheesecake', price: '200₺', image: 'https://images.unsplash.com/photo-1567206563064-6f60f40a2b57?fm=webp&w=400&h=600&fit=crop&q=80' },
    { name: 'Bademli Cheesecake', price: '200₺', image: 'https://images.unsplash.com/photo-1571115764595-644a1f56a55c?fm=webp&w=400&h=600&fit=crop&q=80' },
    { name: 'San Sebastian', price: '200₺', image: 'https://images.unsplash.com/photo-1578985545062-69928b1d9587?fm=webp&w=400&h=600&fit=crop&q=80' },
    { name: 'Chocolate Bomb', price: '240₺', image: 'https://images.unsplash.com/photo-1606313564200-e75d5e30476c?fm=webp&w=400&h=600&fit=crop&q=80' },
    { name: 'Çikolatalı Cookie', price: '100₺', image: 'https://images.unsplash.com/photo-1499636136210-6f4ee915583e?fm=webp&w=400&h=600&fit=crop&q=80' },
    { name: 'Waffle', price: '220₺', image: 'https://images.unsplash.com/photo-1562376552-0d160a2f238d?fm=webp&w=400&h=600&fit=crop&q=80' }
  ]
}; 
