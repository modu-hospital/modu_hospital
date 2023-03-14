const express = require('express');

const router = express.Router();

const hospitalRouter = require('./hospital.routes');
const adminRouter = require('./admin.routes');
const userRouter = require('./user.routes');
const categoryRouter = require('./category.routes');
const tokenRouter = require('./token.routes');

router.use('/users', userRouter);
router.use('/hospitals', hospitalRouter);
router.use('/admin', adminRouter);
router.use('/categories', categoryRouter);
router.use('/token', tokenRouter);

module.exports = router;


