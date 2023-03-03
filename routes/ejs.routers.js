const express = require('express');
const router = express.Router();

// 메인페이지
router.get('/', (req, res) => {
    res.render('index.ejs');
});

// 서비스관리자 페이지
router.get('/admin', (req, res) => {
    res.render('admin.ejs');
});

router.get('/hospital/map', (req, res) => {
    res.render('map.ejs', { components: 'map' });
});

module.exports = router;
