const express = require('express');
const userController = require('../controllers/user.controller.js');
const UserController = new userController();
const router = express.Router();

router.get('/', UserController.getUserInfo);

router.get('/:role', UserController.getRoleUser);

router.delete('/:userId', UserController.defalutDelete);

module.exports = router;
