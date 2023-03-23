const express = require('express');
const router = express.Router();
const auth = require('../middleware/auth.middleware');

const UserController = require('../controllers/user.controller');
const userController = new UserController();

router.get('/mypage/userdata', auth, userController.getUserProfile);

router.get('/mypage/approved', auth, userController.getApprovedReservation);

router.get('/mypage/waiting', auth, userController.getWaitingReservation);

router.get('/mypage/doneorreviewed', auth, userController.getDoneOrReviewedReservation);

router.get('/mypage/canceled', auth, userController.getCanceledReservation);

router.patch('/mypage/editprofile', auth, userController.editUserProfile);

router.patch('/mypage/cancel/:id', auth, userController.cancelReservation);

router.post('/mypage/review/:id', auth, userController.createReview);

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

router.post('/reservation/:hospitalId/:doctorId', auth, userController.reservaionInput);

module.exports = router;
