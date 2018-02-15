const express = require('express');
const router = express.Router();
const middleware = require('../middleware');

// Require controller
const post_controller = require('../controllers/postController');

router.get('/', middleware.isLoggedIn, post_controller.post_list);

router.get('/new', middleware.isLoggedIn, post_controller.post_new);

router.post('/', middleware.isLoggedIn, post_controller.post_save);

router.get('/:id/edit', middleware.isLoggedIn, post_controller.post_edit);

router.put('/:id', middleware.isLoggedIn, post_controller.post_update);

router.get('/:id/show', middleware.isLoggedIn, post_controller.post_show);

router.delete('/:id', middleware.isLoggedIn, post_controller.post_delete);

module.exports = router;

