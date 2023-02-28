const express = require("express")
const router = express.Router()
const HospitalController = require("../controllers/hospital.controller")
const hospitalController = new HospitalController()

router.get("/around", hospitalController.findNearHospital)

module.exports = router