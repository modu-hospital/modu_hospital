const express = require('express');
const router = express.Router();
const auth = require('../middleware/auth.middleware');

const RefreshTokenController = require('../controllers/refreshToken.controller');
const refreshTokenController = new RefreshTokenController();

router.get("/refreshtoken", refreshTokenController.createToken) 
//refreshtoken저장 API

// router.get("/accesstoken", userController.accessToken)
// router.get('/login/success', userController.loginSuccess)

module.exports = router;
