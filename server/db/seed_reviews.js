require('dotenv').config({ path: require('path').resolve(__dirname, '../.env') });
const mysql = require('mysql2/promise');

const reviewsData = [
  {
    id: 1,
    text: "The Kinetic Chill practically rewired my brain for peak focus. Incredible quality and the delivery speed was unmatched.",
    handle: "// alex_k",
    rating: 5
  },
  {
    id: 2,
    text: "Pristine beans. You can taste the high-altitude sourcing in every pour-over. This isn't just coffee, it's an optimization tool.",
    handle: "// builder_node",
    rating: 5
  },
  {
    id: 3,
    text: "Flawless logistics. Ordered from the studio and it arrived exactly on time. The iced white mocha is absolute perfection.",
    handle: "// sarah_v",
    rating: 5
  },
  {
    id: 4,
    text: "Sleek, fast, and exactly what I needed for my late-night coding sessions. Will order again.",
    handle: "// dev_09",
    rating: 4
  },
  {
    id: 5,
    text: "The packaging alone is a work of art. The brew? Even better.",
    handle: "// aes_tht",
    rating: 5
  },
  {
    id: 6,
    text: "Elite quality. It's rare to find a cafe that understands both aesthetics and taste perfectly.",
    handle: "// sys_admin",
    rating: 5
  }
];

async function seedReviews() {
  try {
    const db = await mysql.createConnection({
      host: process.env.DB_HOST || 'localhost',
      user: process.env.DB_USER || 'root',
      password: process.env.DB_PASSWORD || '',
      database: process.env.DB_NAME || 'brewhaus'
    });

    console.log("✅ Connected to MySQL database");

    // Create table
    await db.query(`
      CREATE TABLE IF NOT EXISTS testimonials (
        id INT AUTO_INCREMENT PRIMARY KEY,
        text TEXT NOT NULL,
        handle VARCHAR(255) NOT NULL,
        rating INT DEFAULT 5,
        created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
      )
    `);
    console.log("✅ 'testimonials' table created or already exists");

    // Insert data using INSERT IGNORE to prevent duplicate/constraint issues
    for (const review of reviewsData) {
      await db.query(
        'INSERT IGNORE INTO testimonials (id, text, handle, rating) VALUES (?, ?, ?, ?)',
        [review.id, review.text, review.handle, review.rating]
      );
    }
    
    console.log(`✅ Successfully inserted ${reviewsData.length} reviews`);

    await db.end();
    process.exit(0);
  } catch (error) {
    console.error("❌ Seeding failed:", error);
    process.exit(1);
  }
}

seedReviews();
