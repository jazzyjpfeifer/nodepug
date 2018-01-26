const express = require('express');
const router = express.Router();

// Require controller
const category_controller = require('../controllers/categoryController');

router.get('/', category_controller.category_index);

router.get('/new', category_controller.category_new);

router.post('/', category_controller.category_save);

router.get('/:id/edit', category_controller.category_edit);

router.put('/:id', category_controller.category_update);

router.delete('/:id', category_controller.category_delete);

module.exports = router;
