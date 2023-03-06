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
router.get('/reservation/status', hospitalController.getWaitedReservation);

//예약관리 승인완료 목록 가져오기
router.get('/reservation/approved', hospitalController.getapprovedReservation);

//리뷰 조회
router.get('/reviews', hospitalController.getAllreviews);

//병원 정보 등록
// router.post('/register', hospitalController.registerHospital);

//병원 정보 수정
router.patch('/register/edit', hospitalController.registerEditHospital);

//우리 병원 정보 조회
router.get('/information', hospitalController.findOneHospital);

//주소api를 호출하여 위도 경도 정보를 가져오기
// router.post('/location', hospitalController.findHospitalLocation);

router.post(
    '/location',
    hospitalController.findHospitalLocation,
    hospitalController.registerHospital
);

router.post('/around', hospitalController.findNearHospital);
router.post('/around/info', hospitalController.findNearHospitalsInfo);
router.get('/info/:id', hospitalController.searchHospitalInfo);

module.exports = router;
