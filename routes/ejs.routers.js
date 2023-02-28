const express = require('express');
const router = express.Router();

router.get('/', (req, res) => {
    res.render('index.ejs');
});

// router.get('/admin/users', (req, res) => {
//     res.render('admin.ejs');
// });

module.exports = router;
