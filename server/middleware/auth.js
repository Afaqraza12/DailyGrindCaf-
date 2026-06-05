const jwt = require('jsonwebtoken');
const db  = require('../config/db');

const protect = async (req, res, next) => {
  try {
    const authHeader = req.headers.authorization;
    if (!authHeader || !authHeader.startsWith('Bearer ')) {
      return res.status(401).json({ success: false, message: 'No token provided' });
    }

    const token = authHeader.split(' ')[1];
    const decoded = jwt.verify(token, process.env.JWT_SECRET);

    const [rows] = await db.query('SELECT id, name, email, role, avatar_url, is_active FROM users WHERE id = ?', [decoded.id]);
    if (!rows.length || !rows[0].is_active) {
      return res.status(401).json({ success: false, message: 'User not found or inactive' });
    }

    req.user = rows[0];
    next();
  } catch (err) {
    return res.status(401).json({ success: false, message: 'Invalid or expired token' });
  }
};

const adminOnly = (req, res, next) => {
  if (req.user?.role !== 'admin') {
    return res.status(403).json({ success: false, message: 'Admin access required' });
  }
  next();
};

const optionalAuth = async (req, res, next) => {
  try {
    const authHeader = req.headers.authorization;
    if (authHeader?.startsWith('Bearer ')) {
      const token = authHeader.split(' ')[1];
      const decoded = jwt.verify(token, process.env.JWT_SECRET);
      const [rows] = await db.query('SELECT id, name, email, role, avatar_url FROM users WHERE id = ?', [decoded.id]);
      if (rows.length) req.user = rows[0];
    }
  } catch (_) { /* ignore */ }
  next();
};

module.exports = { protect, adminOnly, optionalAuth };
