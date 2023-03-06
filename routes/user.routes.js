const express = require('express');
const router = express.Router();
const auth = require('../middleware/auth.middleware');

const UserController = require('../controllers/user.controller');
const userController = new UserController();

router.get('/mypage/:userId', userController.getUserProfile);

router.patch('/mypage/editprofile/:userId', userController.editUserProfile);

router.patch('/mypage/cancel/:id', userController.cancelReservation);

router.post('/mypage/review/:id', userController.createReview);

router.post('/signup/partner', userController.partnerSignup);
router.post('/signup/customer', userController.customerSignup);
router.post('/login', userController.login);
router.post('/logout', userController.logout);
// router.get("/refreshtoken", userController.refreshToken) refreshtoken저장 API

// router.get("/accesstoken", userController.accessToken)
// router.get('/login/success', userController.loginSuccess)

module.exports = router;
