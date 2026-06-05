const express = require('express');
const router = express.Router();
const { getCategories, getMenuItems, getMenuItemBySlug } = require('../controllers/menuController');

router.get('/categories', getCategories);
router.get('/items', getMenuItems);
router.get('/items/:slug', getMenuItemBySlug);

module.exports = router;
