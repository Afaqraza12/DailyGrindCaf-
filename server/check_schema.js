require('dotenv').config();
const mysql = require('mysql2/promise');

async function check() {
  const db = await mysql.createConnection({
    host: process.env.DB_HOST,
    user: process.env.DB_USER,
    password: process.env.DB_PASSWORD,
    database: process.env.DB_NAME
  });

  const [categories] = await db.query('SELECT * FROM categories');
  console.log("Categories:", categories);
  
  const [items] = await db.query('SELECT count(*) as c FROM menu_items');
  console.log("Item count:", items[0].c);

  await db.end();
}

check().catch(console.error);
