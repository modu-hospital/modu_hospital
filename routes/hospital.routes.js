const express = require('express');
const router = express.Router();

const HospitalController = require('../controllers/hospital.controller');
const hospitalController = new HospitalController();

//예약관리 조회
router.get('/reservation', hospitalController.findAllReservation);

//예약관리 수정
router.put('/reservation/:id', hospitalController.editReservation);

//예약관리 삭제
router.delete('/reservation/:id');

//예약관리 승인대기 목록 조회
router.put('/reservation/status');

//리뷰 조회
router.get('/reviews');

//병원 정보 등록
router.post('/register');

//병원 정보 수정
router.put('/:id');

module.exports = router;
