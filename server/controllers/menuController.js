const db = require('../config/db');

const getCategories = async (req, res, next) => {
  try {
    const [categories] = await db.query(
      'SELECT id, name, slug, description, image_url, sort_order FROM categories WHERE is_active = 1 ORDER BY sort_order ASC'
    );
    res.status(200).json({ success: true, data: categories });
  } catch (error) {
    next(error);
  }
};

const getMenuItems = async (req, res, next) => {
  try {
    const { category } = req.query;
    
    let query = `
      SELECT m.id, m.name, m.slug, m.description, m.price, m.compare_price, 
             m.is_featured, m.is_available, m.calories, m.avg_rating, m.review_count,
             c.name as category_name, c.slug as category_slug,
             (SELECT image_url FROM item_images i WHERE i.item_id = m.id AND i.is_primary = 1 LIMIT 1) as primary_image
      FROM menu_items m
      JOIN categories c ON m.category_id = c.id
      WHERE m.is_active = 1
    `;
    const queryParams = [];

    if (category) {
      query += ` AND c.slug = ?`;
      queryParams.push(category);
    }

    query += ` ORDER BY m.sort_order ASC, m.id DESC`;

    const [items] = await db.query(query, queryParams);
    
    res.status(200).json({ success: true, count: items.length, data: items });
  } catch (error) {
    next(error);
  }
};

const getMenuItemBySlug = async (req, res, next) => {
  try {
    const { slug } = req.params;

    // 1. Get base item
    const [items] = await db.query(`
      SELECT m.*, c.name as category_name, c.slug as category_slug
      FROM menu_items m
      JOIN categories c ON m.category_id = c.id
      WHERE m.slug = ? AND m.is_active = 1
    `, [slug]);

    if (!items.length) {
      return res.status(404).json({ success: false, message: 'Menu item not found' });
    }
    const item = items[0];

    // 2. Get images
    const [images] = await db.query(
      'SELECT id, image_url, alt_text, is_primary FROM item_images WHERE item_id = ? ORDER BY sort_order ASC',
      [item.id]
    );

    // 3. Get variants
    const [variants] = await db.query(
      'SELECT id, variant_type, variant_value, price_delta, is_default FROM item_variants WHERE item_id = ?',
      [item.id]
    );

    item.images = images;
    item.variants = variants;

    res.status(200).json({ success: true, data: item });
  } catch (error) {
    next(error);
  }
};

module.exports = { getCategories, getMenuItems, getMenuItemBySlug };
