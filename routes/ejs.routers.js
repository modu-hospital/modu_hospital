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

router.get('/map/hospital', (req, res) => {
    res.render('map.ejs', { compnents: 'map' });
});

//원장님의 공간
router.get('/hospital', (req, res) => {
    res.render('index.ejs', { components: 'hospital' });
});

module.exports = router;
