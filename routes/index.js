const express = require('express');


const router = express.Router();

const hospitalRouter = require('./hospital.routes');
const userRouter = require("./user.routes")
const adminRouter = require('./admin.routes');

router.use('/users', userRouter);
router.use('/hospital', hospitalRouter);
router.use('/admin', adminRouter);

module.exports = router;
