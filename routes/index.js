const express = require('express');
const router = express.Router();
const hospitalRouter = require('./hospital.routes');

const userRouter = require('./user.routes');

router.use('/users', userRouter);
router.use('/hospitals', hospitalRouter);
const adminRouter = require('./admin.routes');
router.use('/admin', adminRouter);

module.exports = router;
