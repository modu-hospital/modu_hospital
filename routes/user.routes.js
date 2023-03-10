const express = require('express');
const router = express.Router();
const auth = require('../middleware/auth.middleware');

const UserController = require('../controllers/user.controller');
const userController = new UserController();

router.get('/mypage/userData/:userId', userController.getUserProfile);

router.get('/mypage/approved', userController.getApprovedReservation);

router.get('/mypage/waiting', userController.getWaitingReservation);

router.get('/mypage/doneorreviewed', userController.getDoneOrReviewedReservation);

router.patch('/mypage/editprofile/:userId', userController.editUserProfile);

router.patch('/mypage/cancel/:id', userController.cancelReservation);

router.post('/mypage/review/:id', userController.createReview);

router.post('/signup/partner', userController.partnerSignup);
router.post('/signup/customer', userController.customerSignup);
router.post('/login', auth, userController.login); //auth
router.post('/logout', userController.logout);


module.exports = router;
