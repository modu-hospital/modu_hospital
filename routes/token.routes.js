const express = require('express');
const router = express.Router();
const auth = require('../middleware/auth.middleware');

const TokenController = require('../controllers/token.controller');
const tokenController = new TokenController();

router.post('/:userId', tokenController.newAccessToken); //auth
//refreshtoken저장??...현재 토큰을 user계층에서?? 저장 로직 짬
//auth를 거쳐야하는지 엑세스 토큰이 만료 되면 실행해야되서?..거쳐야되나
//프론트 로그인에서 api 연결 해줄 때 localhost:3000/api/token/:userId
//로 해야되는데 userId값을 어디서 불러올지 생각

module.exports = router;
