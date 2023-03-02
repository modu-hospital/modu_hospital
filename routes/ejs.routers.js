const express = require('express');
const router = express.Router();

router.get('/', (req, res) => {
    res.render('index.ejs', { components: 'main' });
});

// router.get('/admin/users', (req, res) => {
//     res.render('admin.ejs');
// });

router.get('/hospital/map', (req, res) => {
    res.render('map.ejs', { components: 'map' });
});

//원장님의 공간
router.get('/hospital/office', (req, res) => {
    res.render('hospital.ejs', { components: 'hospital' });
});

module.exports = router;
