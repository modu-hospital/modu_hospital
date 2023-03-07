const express = require('express');
const router = express.Router();

// 메인페이지
router.get('/', (req, res) => {
    res.render('index.ejs', { components: 'main' });
});

// 서비스관리자 페이지
router.get('/admin', (req, res) => {
    res.render('admin.ejs');
});

router.get('/users/mypage/:userId', (req, res) => {
    res.render('mypage.ejs');
});

router.get('/map/hospitals', (req, res) => {
    res.render('map.ejs', { compnents: 'map' });
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

module.exports = router;
