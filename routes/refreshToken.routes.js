const express = require('express');
const router = express.Router();
const auth = require('../middleware/auth.middleware');

const RefreshTokenController = require('../controllers/refreshToken.controller');
const refreshTokenController = new RefreshTokenController();

router.post('/', refreshTokenController.createToken);//auth
//refreshtoken저장??...현재 토큰을 user계층에서?? 저장 로직 짬

// router.get("/accesstoken", userController.accessToken)
// router.get('/login/success', userController.loginSuccess)

module.exports = router;
