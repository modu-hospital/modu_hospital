const express = require('express');
const router = express.Router();
const auth = require('../middleware/auth.middleware');

const WorkingtimeController = require('../controllers/workingtime.controller');
const workingtimeController = new WorkingtimeController();

router.get('/reservationdate/:hospitalId', auth, workingtimeController.diagnosisReservation);

module.exports = router;
