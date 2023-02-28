const express = require('express');
const router = express.Router();

const hospitalRouter = require('./hospital.routes');
const userRouter = require("./user.route")

router.use("/users", userRouter)
router.use('/hospital', [hospitalRouter]);

module.exports = router;