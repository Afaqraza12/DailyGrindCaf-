require('dotenv').config();
const mysql = require('mysql2/promise');

const items = [
  // HOT COFFEE (cat: 1)
  { cat: 1, name: 'Flat White', price: 4.25, img: 'https://images.unsplash.com/photo-1572442388796-11668a67e53d?w=800&q=80', desc: 'Smooth ristretto shots of espresso get the perfect amount of steamed whole milk to create a not-too-strong, not-too-creamy, just-right flavor.' },
  { cat: 1, name: 'Caramel Macchiato', price: 4.95, img: 'https://images.unsplash.com/photo-1485808191679-5f86510681a2?w=800&q=80', desc: 'Freshly steamed milk with vanilla-flavored syrup marked with espresso and topped with a caramel drizzle for an oh-so-sweet finish.' },
  { cat: 1, name: 'Caffè Mocha', price: 4.75, img: 'https://images.unsplash.com/photo-1534040385115-33dcb3acba5b?w=800&q=80', desc: 'Our rich, full-bodied espresso combined with bittersweet mocha sauce and steamed milk, then topped with sweetened whipped cream.' },
  { cat: 1, name: 'Cortado', price: 3.95, img: 'https://images.unsplash.com/photo-1514432324607-a09d9b4aefdd?w=800&q=80', desc: 'Perfectly balanced, equal parts espresso and steamed milk, delivering a smooth and strong flavor profile.' },
  { cat: 1, name: 'Blonde Roast', price: 2.95, img: 'https://images.unsplash.com/photo-1559525839-b184a4d698c7?w=800&q=80', desc: 'Lightly roasted coffee that\'s soft, mellow and flavorful. Easy-drinking on its own and delicious with milk, sugar or flavored with vanilla.' },
  { cat: 1, name: 'Espresso Shot', price: 2.75, img: 'https://images.unsplash.com/photo-1510591509098-f4fdc6d0ff04?w=800&q=80', desc: 'Our smooth signature Espresso Roast with rich flavor and caramelly sweetness is at the very heart of everything we do.' },
  
  // COLD COFFEE (cat: 2)
  { cat: 2, name: 'Nitro Cold Brew', price: 5.25, img: 'https://images.unsplash.com/photo-1517701604599-bb29b565090c?w=800&q=80', desc: 'Our small-batch cold brew—slow-steeped for a super-smooth taste—gets even better. We infuse it with nitrogen to create a sweet flavor without sugar.' },
  { cat: 2, name: 'Iced Caramel Macchiato', price: 5.25, img: 'https://images.unsplash.com/photo-1461023058943-07cb1ce8db12?w=800&q=80', desc: 'We combine our rich, full-bodied espresso with vanilla-flavored syrup, milk and ice, then top it off with a caramel drizzle.' },
  { cat: 2, name: 'Brown Sugar Oatmilk Espresso', price: 5.45, img: 'https://images.unsplash.com/photo-1558024920-b41e1887dc32?w=800&q=80', desc: 'Espresso, brown sugar and cinnamon shaken together and topped with oatmilk and ice for a cool lift to power you through your day.' },
  { cat: 2, name: 'Vanilla Sweet Cream Cold Brew', price: 4.95, img: 'https://images.unsplash.com/photo-1497935586351-b67a49e012bf?w=800&q=80', desc: 'Our slow-steeped custom blend of cold brew coffee accented with vanilla and topped with a delicate float of house-made vanilla sweet cream.' },
  { cat: 2, name: 'Iced White Mocha', price: 5.25, img: 'https://images.unsplash.com/photo-1553163147-622ab57be1c7?w=800&q=80', desc: 'Our signature espresso meets white chocolate sauce, milk and ice, and then is finished off with sweetened whipped cream.' },
  { cat: 2, name: 'NOLA Craft Iced Coffee', price: 4.85, img: 'https://images.unsplash.com/photo-1499961024600-ad094db305cc?w=800&q=80', desc: 'New Orleans-style iced coffee, cold-brewed with roasted chicory, sweetened with organic cane sugar, and cut with whole milk.' },

  // TEAS (cat: 3)
  { cat: 3, name: 'Matcha Green Tea Latte', price: 4.95, img: 'https://images.unsplash.com/photo-1536514498073-50e69d39c6cf?w=800&q=80', desc: 'Smooth and creamy matcha sweetened just right and served with steamed milk. This favorite will transport your senses to pure green delight.' },
  { cat: 3, name: 'Chai Tea Latte', price: 4.75, img: 'https://images.unsplash.com/photo-1576092762791-dd9e2220afa1?w=800&q=80', desc: 'Black tea infused with cinnamon, clove and other warming spices is combined with steamed milk and topped with foam for the perfect balance of sweet and spicy.' },
  { cat: 3, name: 'Iced Peach Green Tea', price: 3.95, img: 'https://images.unsplash.com/photo-1556679343-c7306c1976bc?w=800&q=80', desc: 'Green tea is blended with peach-flavored juice and lemonade, then shaken with ice for a refreshing lift.' },
  { cat: 3, name: 'Earl Grey Tea', price: 3.25, img: 'https://images.unsplash.com/photo-1563822249548-9a72b6353cad?w=800&q=80', desc: 'We take a strong black tea base and add the essence of bergamot, a citrus fruit with subtle lemon and floral lavender notes.' },
  { cat: 3, name: 'Passion Tango Tea', price: 3.45, img: 'https://images.unsplash.com/photo-1513558161293-cdaf765ed2fd?w=800&q=80', desc: 'A vibrant, caffeine-free herbal tea with hibiscus, lemongrass and apple, hand-shaken with ice.' },

  // PASTRIES (cat: 4)
  { cat: 4, name: 'Butter Croissant', price: 3.25, img: 'https://images.unsplash.com/photo-1555507036-ab1f40ce88f4?w=800&q=80', desc: 'Classic pastry made with 100% butter to create a golden, crunchy top and soft, flaky layers inside.' },
  { cat: 4, name: 'Chocolate Croissant', price: 3.75, img: 'https://images.unsplash.com/photo-1608198093002-ad4e005484ec?w=800&q=80', desc: 'Two generous pieces of chocolate wrapped in a butter croissant dough, baked to a golden finish.' },
  { cat: 4, name: 'Blueberry Muffin', price: 3.45, img: 'https://images.unsplash.com/photo-1605118742880-e8f0ebba27ce?w=800&q=80', desc: 'A delicious muffin dotted throughout with sweet, juicy blueberries and a hint of lemon.' },
  { cat: 4, name: 'Banana Walnut Bread', price: 3.45, img: 'https://images.unsplash.com/photo-1596568359542-a89aa0dfa1de?w=800&q=80', desc: 'Classic banana bread made with ripe bananas and toasted walnuts for a comforting, sweet treat.' },
  { cat: 4, name: 'Birthday Cake Pop', price: 2.75, img: 'https://images.unsplash.com/photo-1587314168485-3236d6710814?w=800&q=80', desc: 'Vanilla cake shaped into a mini sphere, dipped in pink chocolaty icing and finished with white sprinkles.' }
];

async function seed() {
  const db = await mysql.createConnection({
    host: process.env.DB_HOST,
    user: process.env.DB_USER,
    password: process.env.DB_PASSWORD,
    database: process.env.DB_NAME
  });

  try {
    console.log('Clearing old items...');
    await db.query('SET FOREIGN_KEY_CHECKS = 0');
    await db.query('TRUNCATE TABLE item_images');
    await db.query('TRUNCATE TABLE menu_items');
    await db.query('SET FOREIGN_KEY_CHECKS = 1');

    console.log('Inserting 22 famous coffee items...');
    
    for (const item of items) {
      const slug = item.name.toLowerCase().replace(/ /g, '-').replace(/[^a-z0-9-]/g, '');
      
      const [result] = await db.query(
        'INSERT INTO menu_items (category_id, name, slug, description, price, is_active, sort_order) VALUES (?, ?, ?, ?, ?, 1, 0)',
        [item.cat, item.name, slug, item.desc, item.price]
      );
      
      const itemId = result.insertId;
      
      await db.query(
        'INSERT INTO item_images (item_id, image_url, is_primary) VALUES (?, ?, 1)',
        [itemId, item.img]
      );
    }

    console.log('Successfully seeded database!');
  } catch (error) {
    console.error('Error seeding:', error);
  } finally {
    await db.end();
  }
}

seed();
