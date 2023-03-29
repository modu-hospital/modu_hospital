const express = require('express');
const router = express.Router();
const auth = require('../middleware/auth.middleware');

const TokenController = require('../controllers/token.controller');
const tokenController = new TokenController();

router.get('/', tokenController.newAccessToken); //auth

module.exports = router;
