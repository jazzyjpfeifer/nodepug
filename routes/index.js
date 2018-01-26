const express = require('express');
const router = express.Router();

// Require controller
const main_controller = require('../controllers/mainController');


router.get('/', main_controller.index);

router.get('/admin', main_controller.admin);



module.exports = router;