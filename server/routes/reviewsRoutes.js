const express = require('express');
const router = express.Router();
const { getReviews } = require('../controllers/reviewsController');

router.route('/')
  .get(getReviews);

module.exports = router;
