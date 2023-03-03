const express = require('express');
const router = express.Router();

const CategoryController = require('../controllers/category.controller');
const categoryController = new CategoryController();

router.post('/search', categoryController.findHospitalsThatFitsDepartment);

module.exports = router;
