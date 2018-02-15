const express = require('express');
const router = express.Router();
const middleware = require('../middleware');

// Require controller
const author_controller = require('../controllers/authorController');

router.get('/', middleware.isLoggedIn, author_controller.author_index);

router.get('/new', middleware.isLoggedIn, author_controller.author_new);

router.post('/', middleware.isLoggedIn, author_controller.author_save);

router.get('/:id/show', middleware.isLoggedIn, author_controller.author_show);

router.get('/:id/edit', middleware.isLoggedIn, author_controller.author_edit);

router.put('/:id', middleware.isLoggedIn, author_controller.author_update);

router.delete('/:id', middleware.isLoggedIn, author_controller.author_delete);

module.exports = router;
