const express = require('express');
const router = express.Router({mergeParams: true});
const middleware = require('../middleware');

// Require controller
const post_detail_controller = require('../controllers/post_detailController');

router.get('/new', middleware.isLoggedIn, post_detail_controller.post_detail_new);

router.post('/', middleware.isLoggedIn, post_detail_controller.post_detail_save);

router.get('/:id/edit', middleware.isLoggedIn, post_detail_controller.post_detail_edit);

router.put('/:id', middleware.isLoggedIn, post_detail_controller.post_detail_update);

router.delete('/:id', middleware.isLoggedIn, post_detail_controller.post_detail_delete);

module.exports = router;

