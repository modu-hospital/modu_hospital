const express = require('express');
const router = express.Router();
const hospitalRouter = require("./hospital.route")

router.use("/hospitals", hospitalRouter)

module.exports = router;