const pool = require('../config/db');

// @desc    Get all reviews
// @route   GET /api/reviews
// @access  Public
exports.getReviews = async (req, res, next) => {
  try {
    const [rows] = await pool.query('SELECT * FROM testimonials ORDER BY created_at DESC');
    
    res.status(200).json({
      success: true,
      count: rows.length,
      data: rows
    });
  } catch (error) {
    console.error("Error fetching reviews:", error);
    next(error);
  }
};
