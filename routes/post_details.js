const express = require('express');
const router = express.Router({mergeParams: true});

// Require controller
const post_detail_controller = require('../controllers/post_detailController');

router.get('/new', post_detail_controller.post_detail_new);

router.post('/', post_detail_controller.post_detail_save);

router.get('/:id/edit', post_detail_controller.post_detail_edit);

router.put('/:id', post_detail_controller.post_detail_update);
/*
router.get('/:id/show', post_detail_controller.post_show);

router.delete('/:id', post_detail_controller.post_delete);
*/

module.exports = router;

