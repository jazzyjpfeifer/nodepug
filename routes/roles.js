const express = require('express');
const router = express.Router();
const middleware = require('../middleware');


const role_controller = require('../controllers/roleController');

router.get('/', middleware.isLoggedIn, role_controller.role_index);

router.get('/new', middleware.isLoggedIn, role_controller.role_new);

router.post('/', middleware.isLoggedIn, role_controller.role_save);

router.get('/:id/show', middleware.isLoggedIn, role_controller.role_show);

router.get('/:id/edit', middleware.isLoggedIn, role_controller.role_edit);

router.put('/:id', middleware.isLoggedIn, role_controller.role_update);

router.delete('/:id', middleware.isLoggedIn, role_controller.role_delete);

module.exports = router;