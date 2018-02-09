const express = require('express');
const router = express.Router();

// Require controller
const search_controller = require('../controllers/searchController');

router.post('/', search_controller.search);


module.exports = router;