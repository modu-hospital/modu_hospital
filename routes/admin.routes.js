const express = require('express');
const userController = require('../controllers/user.controller.js');
const UserController = new userController();
const router = express.Router();

router.get('/admin', UserController.getUserInfo);

// const users = [
//     {
//         userId: 1,
//         name: 'mei',
//     },
// ];

// router.get('/admin', (req, res) => {
//     const params = req.params;
//     console.log('params', params);

//     res.status(200).json({ users });
// });

module.exports = router;
