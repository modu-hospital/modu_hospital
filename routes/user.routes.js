const express = require('express');
const router = express.Router();

const UserController = require('../controllers/user.controller');
const userController = new UserController();



router.get('/mypage/:userId', userController.getUserProfile);

router.patch('/mypage/editprofile/:userId', userController.editUserProfile)

router.patch('/mypage/cancel/:id', userController.cancelReservation)

router.post('/mypage/review/:id', userController.createReview)

module.exports = router;
