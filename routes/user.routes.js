const express = require('express');
const router = express.Router();
const auth = require('../middleware/auth.middleware');

const UserController = require('../controllers/user.controller');
const userController = new UserController();

router.get('/mypage/userdata', userController.getUserProfile);

router.get('/mypage/approved', userController.getApprovedReservation);

router.get('/mypage/waiting', userController.getWaitingReservation);

router.get('/mypage/doneorreviewed', userController.getDoneOrReviewedReservation);

router.get('/mypage/canceled', userController.getCanceledReservation);

router.patch('/mypage/editprofile', userController.editUserProfile);

router.patch('/mypage/cancel/:id', userController.cancelReservation);

router.post('/mypage/review/:id', userController.createReview);

router.post('/signup/partner', userController.partnerSignup);
router.post('/signup/customer', userController.customerSignup);
router.post('/login', userController.login);
router.post('/logout', userController.logout);

// router.get('/email/certification/send', userController.sendEmailForCertification)

//auth는 로그인 한 이후 이용 가능한 서비스에 추가하기

router.patch('/resetpassword', userController.resetPassword);

router.get('/resetpassword/:token', userController.findResetCase);

router.patch('/mypage/editpassword', userController.editUserPassword);

router.get('/email/resetpassword/send', userController.sendEmailForResetPassword);

router.patch('/resetpassword', userController.resetPassword);

router.patch('/mypage/editpassword', userController.editUserPassword);

module.exports = router;
