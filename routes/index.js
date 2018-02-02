const express = require('express');
const router = express.Router();

// Require controller
const main_controller = require('../controllers/mainController');


router.get('/', main_controller.index);

router.get('/admin', main_controller.admin);

router.get('/upload', main_controller.upload);

router.post('/upload', main_controller.process);



module.exports = router;