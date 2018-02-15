const express = require('express');
const router = express.Router();
const middleware = require('../middleware');

// Require controller
const content_types_controller = require('../controllers/content_typeController');

router.get('/', middleware.isLoggedIn, content_types_controller.content_types_index);

router.get('/new', middleware.isLoggedIn, content_types_controller.content_types_new);

router.post('/', middleware.isLoggedIn, content_types_controller.content_types_save);

router.get('/:id/edit', middleware.isLoggedIn, content_types_controller.content_types_edit);

router.put('/:id', middleware.isLoggedIn, content_types_controller.content_types_update);

router.delete('/:id', middleware.isLoggedIn, content_types_controller.content_types_delete);

module.exports = router;

