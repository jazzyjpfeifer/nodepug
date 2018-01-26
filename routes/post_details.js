const express = require('express');
const router = express.Router();

// Require controller
const post_detail_controller = require('../controllers/post_detailController');

//router.get('/', post_detail_controller.post_detail_index);


router.get('/new', post_detail_controller.post_detail_new);

router.post('/', post_detail_controller.post_detail_save);

/*
router.get('/:id/edit', post_controller.post_edit);

router.put('/:id', post_controller.post_update);

router.get('/:id/show', post_controller.post_show);

router.delete('/:id', post_controller.post_delete);
*/

module.exports = router;

