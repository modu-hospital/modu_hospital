const express = require('express');
const router = express.Router();
const auth = require('../middleware/auth.middleware');

const TokenController = require('../controllers/token.controller');
const tokenController = new TokenController();

router.post('/:userId', tokenController.newAccessToken); //auth
//refreshtoken저장??...현재 토큰을 user계층에서?? 저장 로직 짬
//auth를 거쳐야하는지 엑세스 토큰이 만료 되면 실행해야되서?..거쳐야되나

module.exports = router;
