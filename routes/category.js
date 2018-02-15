const express = require('express');
const router = express.Router();
const middleware = require('../middleware');

// Require controller
const category_controller = require('../controllers/categoryController');

router.get('/', middleware.isLoggedIn, category_controller.category_index);

router.get('/new', middleware.isLoggedIn, category_controller.category_new);

router.post('/', middleware.isLoggedIn, category_controller.category_save);

router.get('/:id/edit', middleware.isLoggedIn, category_controller.category_edit);

router.put('/:id', middleware.isLoggedIn, category_controller.category_update);

router.delete('/:id', middleware.isLoggedIn, category_controller.category_delete);

module.exports = router;
