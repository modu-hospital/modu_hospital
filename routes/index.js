const express = require('express');
const router = express.Router();

const hospitalRouter = require('./hospital.routes');

router.use('/hospital', [hospitalRouter]);

module.exports = router;