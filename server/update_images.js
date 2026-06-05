require('dotenv').config();
const mysql = require('mysql2/promise');

const updates = {
  'Blueberry Muffin': 'https://images.unsplash.com/photo-1590454378770-55cb8bf973e8?w=800&q=80',
  'Earl Grey Tea': 'https://images.unsplash.com/photo-1576092768241-dec231879fc3?w=800&q=80',
  'Butter Croissant': 'https://images.unsplash.com/photo-1549903072-7e6e0bedb7fb?w=800&q=80',
  'Chai Tea Latte': 'https://images.unsplash.com/photo-1582239401730-058e0a30b7aa?w=800&q=80',
  'Banana Walnut Bread': 'https://images.unsplash.com/photo-1560965377-628d0111aeb2?w=800&q=80',
  'Iced Caramel Macchiato': 'https://images.unsplash.com/photo-1557006021-b85faa2bc5e2?w=800&q=80'
};

async function fix() {
  const db = await mysql.createConnection({
    host: process.env.DB_HOST,
    user: process.env.DB_USER,
    password: process.env.DB_PASSWORD,
    database: process.env.DB_NAME
  });

  try {
    for (const [name, url] of Object.entries(updates)) {
      await db.query(
        `UPDATE item_images i
         JOIN menu_items m ON i.item_id = m.id
         SET i.image_url = ?
         WHERE m.name = ?`,
        [url, name]
      );
      console.log(`Updated ${name}`);
    }
  } catch(e) {
    console.error(e);
  } finally {
    db.end();
  }
}

fix();
