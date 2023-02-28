const express = require('express');
const router = express.Router();

const UserController = require('../controllers/user.controller');
const userController = new UserController();
router.get('/mypage/:userId', userController.getUserProfile);

module.exports = router;
