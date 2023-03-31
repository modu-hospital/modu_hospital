const express = require('express');
const router = express.Router();
const auth = require('../middleware/auth.middleware');

const UserController = require('../controllers/user.controller');
const userController = new UserController();

//마이페이지 사용자 프로필 불러오기
router.get('/mypage/userdata', auth, userController.getUserProfile);

//마이페이지 승인된 예약 불러오기
router.get('/mypage/approved', auth, userController.getApprovedReservation);

//마이페이지 미승인 예약 불러오기
router.get('/mypage/waiting', auth, userController.getWaitingReservation);

//마이페이지 진료 완료된 예약 불러오기
router.get('/mypage/doneorreviewed', auth, userController.getDoneOrReviewedReservation);

//마이페이지 취소된 예약 불러오기
router.get('/mypage/canceled', auth, userController.getCanceledReservation);

//마이페이지 프로필 수정
router.patch('/mypage/editprofile', auth, userController.editUserProfile);

//마이페이지 예약 취소
router.patch('/mypage/cancel/:id', auth, userController.cancelReservation);

//마이페이지 리뷰 작성
router.post('/mypage/review/:id', auth, userController.createReview);

//마이페이지 리뷰 불러오기
router.get('/mypage/review/:id', userController.getMyReview);

router.post('/signup/partner', userController.partnerSignup);
router.post('/signup/customer', userController.customerSignup);
router.post('/login', userController.login);
router.post('/logout', userController.logout);

// router.get('/email/certification/send', userController.sendEmailForCertification)

//auth는 로그인 한 이후 이용 가능한 서비스에 추가하기

//비밀번호 재설정 페이지 진입시 메일을 요청한 적 있는지 확인하는 api
router.get('/resetpassword/:token', userController.findResetCase);

//비밀번호 수정
router.patch('/mypage/editpassword', userController.editUserPassword);

//비밀번호 재설정 메일 요청
router.get('/email/resetpassword/send', userController.sendEmailForResetPassword);

//비밀번호 재설정
router.patch('/resetpassword', userController.resetPassword);

//예약페이지 본인 선택시 정보 조회
router.get('/reservation', auth, userController.getSelfInfo);

//예약하기
router.post('/reservation/:hospitalId/:doctorId', auth, userController.reservaionInput);
router.patch('/reservation/editAddress', auth, userController.editAddress);

module.exports = router;
