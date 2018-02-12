const express = require('express');
const router = express.Router();

// Require controller
const role_controller = require('../controllers/roleController');

router.get('/', role_controller.role_index);


module.exports = router;