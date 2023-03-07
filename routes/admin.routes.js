const express = require('express');
const userController = require('../controllers/user.controller.js');
const UserController = new userController();
const router = express.Router();

router.get('/', UserController.getUserInfo);

router.get('/:role', UserController.getRoleUser);

// router.patch('/:userId', UserController.roleUpdate);
// router.delete('/customer/:userId', UserController.partnerDelete);
router.delete('/:userId', UserController.defalutDelete);
// router.delete('/partner/:userId', UserController.partnerDelete);

module.exports = router;
