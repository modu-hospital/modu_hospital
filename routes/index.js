const express = require('express');
const router = express.Router();
const hospitalRouter = require('./hospital.route');

const userRouter = require('./user.route');

router.use('/users', userRouter);
router.use('/hospitals', hospitalRouter);

module.exports = router;
