require('dotenv').config();
const mysql = require('mysql2/promise');

async function fix() {
  const db = await mysql.createConnection({
    host: process.env.DB_HOST,
    user: process.env.DB_USER,
    password: process.env.DB_PASSWORD,
    database: process.env.DB_NAME
  });

  try {
    const url = 'https://images.unsplash.com/photo-1558326567-98ae2405596b?w=800&q=80';
    await db.query(
      `UPDATE item_images i
       JOIN menu_items m ON i.item_id = m.id
       SET i.image_url = ?
       WHERE m.name = 'Birthday Cake Pop'`,
      [url]
    );
    console.log(`Updated Birthday Cake Pop`);
  } catch(e) {
    console.error(e);
  } finally {
    db.end();
  }
}

fix();
