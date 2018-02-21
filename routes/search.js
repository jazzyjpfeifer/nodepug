const express = require('express');
const router = express.Router();

// Require controller
const search_controller = require('../controllers/searchController');

router.post('/', search_controller.search);

router.get('/archives/:year', search_controller.search_year);

router.get('/category/:category', search_controller.search_category);

module.exports = router;