const express = require('express');
const router = express.Router();

// Require controller
const content_types_controller = require('../controllers/content_typeController');

router.get('/', content_types_controller.content_types_index);

router.get('/new', content_types_controller.content_types_new);

router.post('/', content_types_controller.content_types_save);

router.get('/:id/edit', content_types_controller.content_types_edit);

router.put('/:id', content_types_controller.content_types_update);

router.delete('/:id', content_types_controller.content_types_delete);

module.exports = router;

