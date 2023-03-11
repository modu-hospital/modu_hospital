const express = require('express');
const router = express.Router();
const auth = require('../middleware/auth.middleware');

const TokenController = require('../controllers/token.controller');
const tokenController = new TokenController();

router.post('/', tokenController.newAccessToken); //auth
//refreshtoken저장??...현재 토큰을 user계층에서?? 저장 로직 짬

module.exports = router;
