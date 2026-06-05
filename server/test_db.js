require('dotenv').config();
const mysql = require('mysql2/promise');

async function test() {
  console.log('Testing connection with dotenv...');
  console.log('DB_USER:', process.env.DB_USER);
  console.log('DB_PASSWORD length:', process.env.DB_PASSWORD ? process.env.DB_PASSWORD.length : 0);
  
  try {
    const conn = await mysql.createConnection({
      host: 'localhost',
      user: 'root',
      password: process.env.DB_PASSWORD,
      database: 'brewhaus'
    });
    console.log('✅ Success with dotenv password');
    await conn.end();
  } catch (err) {
    console.error('❌ Failed with dotenv password:', err.message);
    
    console.log('Testing with hardcoded password...');
    try {
      const conn2 = await mysql.createConnection({
        host: 'localhost',
        user: 'root',
        password: 'AFaq12@#',
        database: 'brewhaus'
      });
      console.log('✅ Success with hardcoded password');
      await conn2.end();
    } catch (err2) {
      console.error('❌ Failed with hardcoded password too:', err2.message);
    }
  }
}

test();
