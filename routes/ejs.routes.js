const express = require('express');
const router = express.Router();
const CreateError = require('../lib/errors');

// 메인페이지
router.get('/', (req, res) => {
    res.render('index.ejs', { components: 'main' });
});

//유저 메인페이지
router.get('/users', (req, res) => {
    res.render('index.ejs', { components: 'user' });
});

// 서비스관리자 페이지
router.get('/admin', (req, res) => {
    res.render('index.ejs', { components: 'admin' });
});

// 예약페이지
router.get('/users/reservation', (req, res) => {
    res.render('index.ejs', { components: 'reservation' });
});
// 마이페이지
router.get('/users/mypage', (req, res) => {
    res.render('index.ejs', { components: 'mypage' });
});
//비밀번호 찾기 (이메일 발송) 페이지
router.get('/findmypassword', (req, res) => {
    res.render('index.ejs', { components: 'findmypassword' });
});

// 비밀번호 재설정 페이지
router.get('/users/resetpassword/:params', (req, res) => {
    res.render('index.ejs', { components: 'resetpassword' });
});

router.get('/map/hospitals', (req, res) => {
    res.render('map.ejs', { components: 'map' });
});

//원장님의 공간
router.get('/hospital', (req, res) => {
    res.render('index.ejs', { components: 'hospital' });
});

//병원정보 등록 페이지
router.get('/register', (req, res) => {
    res.render('index.ejs', { components: 'hospitalRegister' });
});

//병원정보 수정 페이지
router.get('/edit', (req, res) => {
    res.render('index.ejs', { components: 'hospitalEdit' });
});

//의사정보 등록 페이지
router.get('/doctorRegister', (req, res) => {
    res.render('index.ejs', { components: 'doctorRegister' });
});

//의사한명 페이지
router.get('/doctorEdit', (req, res) => {
    const doctorId = req.query.doctorId;
    res.render('index.ejs', { components: 'doctorEdit' });
});

//병원상세페이지
router.get('/:hospitalId', (req, res) => {
    const id = req.query.id;
    res.render('index.ejs', { components: 'hospitaldetail' });
});

//의사 시간 추가
router.get('/doctorTime', (req, res) => {
    const doctorId = req.query.doctorId;
    res.render('index.ejs', { components: 'doctorTime' });
});

//page expired
router.get('/errors/expired', (req, res) => {
    res.status(403).render('expired');
});

//로그인
router.get('/login', (req, res) => {
    res.render('index.ejs', { components: 'login' });
});

//회원가입
router.get('/signup', (req, res) => {
    res.render('index.ejs', { components: 'signup' });
});

module.exports = router;
