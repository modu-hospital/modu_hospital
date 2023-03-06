const express = require('express');

const router = express.Router();

const hospitalRouter = require('./hospital.routes');
const adminRouter = require('./admin.routes');
const userRouter = require('./user.routes');
const refreshTokenRouter = require('./refreshToken.routes')

router.use('/users', userRouter);
router.use('/hospitals', hospitalRouter);
router.use('/admin', adminRouter);
router.use('/refreshToken', refreshTokenRouter);


module.exports = router;
