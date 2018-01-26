const express = require('express');
const router = express.Router();

// Require controller
const post_controller = require('../controllers/postController');

router.get('/', post_controller.post_list);

router.get('/new', post_controller.post_new);

router.post('/', post_controller.post_save);

router.get('/:id/edit', post_controller.post_edit);

router.put('/:id', post_controller.post_update);

router.get('/:id/show', post_controller.post_show);

router.delete('/:id', post_controller.post_delete);

module.exports = router;

