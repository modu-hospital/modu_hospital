const express = require('express');
const router = express.Router();

const HospitalController = require('../controllers/hospital.controller');
const hospitalController = new HospitalController();

//예약관리 조회
router.get('/reservation', hospitalController.findAllReservation);

//예약관리 예약날짜 수정
router.patch('/reservation/date/:id', hospitalController.editReservation);

//예약관리 승인하기 수정
router.patch('/reservation/status/:id', hospitalController.approvedReservation);

//예약관리 승인대기 목록 가져오기
router.get('/reservation/status/:doctorId', hospitalController.getWaitedReservation);

//리뷰 조회
router.get('/reviews', hospitalController.getAllreviews);

//병원 정보 등록
router.post('/register', hospitalController.registerHospital);

//병원 정보 수정
router.patch('/register/edit', hospitalController.registerEditHospital);

router.get('/around', hospitalController.findNearHospital);

module.exports = router;
