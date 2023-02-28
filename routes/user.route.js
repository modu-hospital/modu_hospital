const express = require('express');
const router = express.Router();
const auth = require('../middleware/auth.middleware');

const UserController = require('../controllers/user.controller');
const userController = new UserController();

router.post('/signup', userController.signup);
router.post('/login', userController.login);
router.post('/logout', userController.logout);
router.get('/accesstoken', userController.accessToken);
router.get('/refreshtoken', userController.refreshToken);
router.get('/login/success', userController.loginSuccess);

module.exports = router;
