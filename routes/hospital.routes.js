const express = require('express');
const router = express.Router();
const auth = require('../middleware/auth.middleware');

// upload
const multer = require('multer');
const upload = multer({ dest: 'uploads/' });

const HospitalController = require('../controllers/hospital.controller');
const hospitalController = new HospitalController();

//예약관리 조회
router.get('/reservation', auth, hospitalController.findAllReservation);

//예약관리 승인하기 수정
router.patch('/reservation/status/:id', hospitalController.approvedReservation);

//예약관리 승인대기 목록 가져오기
router.get('/reservation/status', hospitalController.getWaitedReservation);

//예약관리 승인완료 목록 가져오기
router.get('/reservation/approved', auth, hospitalController.getapprovedReservation);

//리뷰 조회
router.get('/reviews', auth, hospitalController.getAllreviews);

//우리병원 정보 등록(주소api를 호출하여 위도 경도 정보를 가져오기)
router.post(
    '/location',
    auth,
    hospitalController.findHospitalLocation,
    hospitalController.registerHospital
);

//병원 정보 수정
router.put(
    '/register/edit',
    auth,
    hospitalController.findHospitalLocation,
    hospitalController.registerEditHospital
);

//병원 이미지 업로드
router.post(
    '/register/image',
    upload.array('images', 5),
    auth,
    hospitalController.registerImagehospital
);

//우리 병원 정보 조회
router.get('/information', auth, hospitalController.findOneHospital);

//우리 병원 의사 등록
router.post('/register/doctor', upload.single('image'), auth, hospitalController.registerdoctor);

//우리 병원 의사 수정
router.put('/edit/doctor/:doctorId', upload.single('image'), hospitalController.editdoctor);

//우리 병원 의사 정보 불러오기
router.get('/information/doctor', auth, hospitalController.findAllDoctor);

//의사 한명 정보 불러오기
router.get('/information/doctor/:doctorId', hospitalController.findOneDoctor);

//의사 일하는 시간 넣기
router.post('/register/doctor/workingtime', hospitalController.createWorkingTime);

router.post('/around', hospitalController.findNearHospital);
router.post('/around/info', hospitalController.findNearHospitalsInfo);
router.get('/info/:id', hospitalController.searchHospitalInfo);

//병원 상세 조회
router.get('/detail/:id', auth, hospitalController.getOneHospital);

module.exports = router;
